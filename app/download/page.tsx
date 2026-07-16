'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

type VerifyResult = {
  valid: boolean
  tier?: string
  address?: string
  price?: string
  error?: string
}

type Status = 'verifying' | 'ready' | 'downloading' | 'error'

function EmailToSelf({ token }: { token: string | null }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  const send = async () => {
    if (!email.includes('@')) { setErr('Enter a valid email.'); return }
    setSending(true); setErr('')
    try {
      const raw = sessionStorage.getItem('sewa2u_form') || localStorage.getItem('sewa2u_form')
      if (!raw) throw new Error('No form data')
      const res = await fetch('/api/send-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: JSON.parse(raw), sessionId: token, tier: 'standard', email }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch { setErr('Failed to send. Try again.') }
    finally { setSending(false) }
  }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-xl text-sm font-medium text-navy-600 hover:bg-slate-50 transition-colors mt-3">
      ✉️ Email PDF to myself
    </button>
  )

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-3 text-left">
      <p className="text-xs font-semibold text-navy-700 mb-2">Email the PDF to yourself</p>
      {sent ? (
        <p className="text-sm text-green-700 font-medium">✓ Sent! Check your inbox.</p>
      ) : (
        <>
          <div className="flex gap-2">
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr('') }}
              placeholder="your@email.com"
              className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
              disabled={sending}
              onKeyDown={e => e.key === 'Enter' && send()} />
            <button onClick={send} disabled={sending}
              className="px-4 py-2 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors whitespace-nowrap">
              {sending ? 'Sending…' : 'Send'}
            </button>
            <button onClick={() => setOpen(false)} className="px-3 py-2 text-navy-400 hover:text-navy-600 text-sm">✕</button>
          </div>
          {err && <p className="text-xs text-red-500 mt-1.5">{err}</p>}
        </>
      )}
    </div>
  )
}

function DownloadContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<Status>('verifying')
  const [info, setInfo] = useState<VerifyResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setError('No download token provided. Check your email for the correct link.')
      setStatus('error')
      return
    }

    fetch(`/api/download-verify?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then((data: VerifyResult) => {
        if (data.valid) {
          setInfo(data)
          setStatus('ready')
        } else {
          setError(data.error || 'Invalid or expired download link.')
          setStatus('error')
        }
      })
      .catch(() => {
        setError('Could not verify download link. Please try again.')
        setStatus('error')
      })
  }, [token])

  const handleDownload = async () => {
    if (!token) return
    setStatus('downloading')

    try {
      const res = await fetch(`/api/download?token=${encodeURIComponent(token)}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Download failed' }))
        throw new Error(data.error || 'Download failed')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'SG-Tenancy-Agreement.pdf'
      a.click()
      URL.revokeObjectURL(url)
      setStatus('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed.')
      setStatus('error')
    }
  }

  if (status === 'verifying') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🔗</div>
          <p className="text-navy-600 font-medium">Verifying download link…</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-navy-800 mb-2">Download unavailable</h2>
          <p className="text-navy-500 text-sm mb-6">{error}</p>
          <p className="text-xs text-navy-400 mb-4">
            Need help? Email <a href="mailto:whooshinglander@gmail.com" className="underline hover:text-navy-600">whooshinglander@gmail.com</a>
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Create New Agreement
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-navy-800 mb-2">Download Your Agreement</h1>

        {info && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between items-center text-sm">
              <span className="text-navy-500">Property</span>
              <span className="text-navy-800 font-medium">{info.address}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-navy-500">Type</span>
              <span className="text-navy-800 font-medium capitalize">{info.tier} PDF</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-navy-500">Paid</span>
              <span className="text-green-700 font-medium">{info.price}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={status === 'downloading'}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base shadow-sm"
        >
          {status === 'downloading' ? (
            <>
              <svg className="w-5 h-5 animate-spin" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating PDF…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </>
          )}
        </button>

        {/* Email to self */}
        <EmailToSelf token={token} />

        <p className="text-xs text-navy-400 mt-4">
          This link works anytime — bookmark it for safekeeping.
          <br />Questions? <a href="mailto:whooshinglander@gmail.com" className="underline hover:text-navy-600">whooshinglander@gmail.com</a>
        </p>
      </div>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <p className="text-navy-500 text-sm animate-pulse">Loading…</p>
        </div>
      }>
        <DownloadContent />
      </Suspense>
      <Footer />
    </div>
  )
}
