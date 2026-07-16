'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ContractPreview from '@/components/preview/ContractPreview'
import PreviewActions from '@/components/preview/PreviewActions'
import { generateContract, ContractDocument } from '@/lib/contract/generateContract'
import { TenancyFormData } from '@/lib/types'

export default function PreviewPage() {
  const router = useRouter()
  const [doc, setDoc] = useState<ContractDocument | null>(null)
  const [hasCustomClauses, setHasCustomClauses] = useState(false)
  const [error, setError] = useState(false)
  const [pdfTriggered, setPdfTriggered] = useState(false)
  const [pdfDownloading, setPdfDownloading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('full') === '1') setPdfTriggered(true)
  }, [])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('sewa2u_form') || localStorage.getItem('sewa2u_form')
      if (!raw) { setError(true); return }
      const formData: TenancyFormData = JSON.parse(raw)
      const generated = generateContract(formData)
      setDoc(generated)

      const hasCustom = formData.diplomaticClause ||
        formData.customClauses.length > 0 ||
        !!formData.freeTextClause?.trim()
      setHasCustomClauses(hasCustom)
    } catch {
      setError(true)
    }
  }, [])

  // ?full=1 → trigger PDF download once form data is loaded
  useEffect(() => {
    if (!pdfTriggered || !doc) return

    const raw = sessionStorage.getItem('sewa2u_form') || localStorage.getItem('sewa2u_form')
    if (!raw) return

    setPdfDownloading(true)
    fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData: JSON.parse(raw) }),
    })
      .then(res => {
        if (!res.ok) throw new Error('PDF generation failed')
        return res.blob()
      })
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'SG-Tenancy-Agreement.pdf'
        a.click()
        URL.revokeObjectURL(url)
      })
      .catch(() => {
        // fall through to normal preview on failure
      })
      .finally(() => {
        setPdfDownloading(false)
      })
  }, [pdfTriggered, doc])

  const handleEdit = (step?: number) => {
    if (step) {
      sessionStorage.setItem('sewa2u_step', String(step))
      localStorage.setItem('sewa2u_step', String(step))
    }
    router.push('/')
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-navy-800 mb-2">No contract data found</h2>
            <p className="text-navy-500 mb-6 text-sm">Please fill in the form first.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2.5 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-navy-500">
            <div className="text-3xl mb-3 animate-pulse">📄</div>
            <p className="text-sm">Generating your contract…</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] flex flex-col pb-32">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Top info bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-navy-800">Your Contract Preview</h2>
            <p className="text-sm text-navy-500">{doc.meta.address}</p>
          </div>
          <div className="flex items-center gap-2">
            {pdfDownloading && (
              <div className="flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-lg px-3 py-2">
                <span className="text-brand-500 text-sm animate-spin">⏳</span>
                <p className="text-xs text-brand-700 font-medium">Generating PDF…</p>
              </div>
            )}
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <span className="text-amber-500 text-sm">🔒</span>
              <p className="text-xs text-amber-700 font-medium">Watermarked Preview</p>
            </div>
          </div>
        </div>

        <ContractPreview doc={doc} hasCustomClauses={hasCustomClauses} showFull={false} />
      </main>
      <Footer />
      <PreviewActions hasCustomClauses={hasCustomClauses} onEdit={handleEdit} />
    </div>
  )
}
