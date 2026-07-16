'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

type Status = 'verifying' | 'ready' | 'downloading' | 'error'

function EmailToSelf({ token }: { token: string | null }) {
  const [open, setOpen] = useState(true)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  const send = async () => {
    if (!email.includes('@')) { setErr('Enter a valid email.'); return }
    setSending(true); setErr('')
    try {
      const raw = sessionStorage.getItem('sewa2u_form') || localStorage.getItem('sewa2u_form')
      let res: Response
      if (raw) {
        res = await fetch('/api/send-receipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData: JSON.parse(raw), sessionId: token, tier: 'standard', email }),
        })
      } else if (token) {
        // Fallback: read form data from Stripe metadata (works across devices/browsers)
        res = await fetch('/api/resend-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        })
      } else {
        throw new Error('No form data available')
      }
      if (!res.ok) throw new Error()
      setSent(true)
    } catch { setErr('Failed to send. Try again.') }
    finally { setSending(false) }
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-left">
      <p className="text-sm font-semibold text-navy-700 mb-1">✉️ Email the PDF to yourself</p>
      <p className="text-xs text-navy-500 mb-3">Enter your email and we'll send the PDF right away.</p>
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

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<Status>('verifying')
  const [tier, setTier] = useState<'standard' | 'custom' | 'renewal'>('standard')
  const [error, setError] = useState<string | null>(null)


  const sessionId = searchParams.get('session_id')
  const tierParam = searchParams.get('tier') as 'standard' | 'custom' | null

  useEffect(() => {
    if (!sessionId) { router.replace('/'); return }

    fetch(`/api/verify-payment?session_id=${sessionId}&tier=${tierParam || 'standard'}`)
      .then(r => r.json())
      .then(data => {
        if (data.paid) {
          const t = (data.tier || 'standard') as 'standard' | 'custom' | 'renewal'
          setTier(t)
          setStatus('ready')
          // Mark this session as paid — back-navigation to /checkout will short-circuit
          // here instead of creating a second checkout-session. (Stripe idempotency-key
          // would also catch it, but this prevents the round-trip.)
          try { sessionStorage.setItem('sewa2u_paid_session_id', sessionId) } catch {}
          // GA4 purchase event
          const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
          if (typeof window !== 'undefined' && gtag) {
            const value = data.amount_total ? data.amount_total / 100 : 30
            gtag('event', 'purchase', {
              transaction_id: sessionId,
              currency: data.currency?.toUpperCase() || 'MYR',
              value,
              items: [{ item_id: t, item_name: `sewa2u ${t} agreement`, price: value, quantity: 1 }],
            })
          }
        } else {
          setError('Payment not confirmed. If you were charged, please contact us.')
          setStatus('error')
        }
      })
      .catch(() => {
        setError('Could not verify payment. Please try again or contact support.')
        setStatus('error')
      })
  }, [sessionId, tierParam, router])

  const handleDownload = async () => {
    const isRenewal = tier === 'renewal'
    const storageKey = isRenewal ? 'sewa2u_extension' : 'sewa2u_form'
    const raw = sessionStorage.getItem(storageKey) || (isRenewal ? null : localStorage.getItem('sewa2u_form'))

    // If no local form data (e.g. mobile browser cleared sessionStorage across redirect),
    // fall through to permanent download link which reads from Stripe metadata
    if (!raw && sessionId && !isRenewal) {
      window.location.href = `/download?token=${sessionId}`
      return
    }

    setStatus('downloading')
    try {
      if (!raw) throw new Error('Form data not found. Please use the permanent download link or contact support.')
      const formData = JSON.parse(raw)
      const apiEndpoint = isRenewal ? '/api/generate-renewal-pdf' : '/api/generate-pdf'
      const defaultFilename = isRenewal ? 'SG-Tenancy-Renewal-Agreement.pdf' : 'SG-Tenancy-Agreement.pdf'

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      })

      if (!res.ok) throw new Error('PDF generation failed. Please try again.')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = defaultFilename
      a.click()
      URL.revokeObjectURL(url)

      sessionStorage.removeItem('sewa2u_tier')
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
          <div className="text-4xl mb-4 animate-pulse">✅</div>
          <p className="text-navy-600 font-medium">Verifying payment…</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-navy-800 mb-2">Something went wrong</h2>
          <p className="text-navy-500 text-sm mb-6">{error}</p>
          {sessionId && (
            <a
              href={`/download?token=${sessionId}`}
              className="inline-block px-6 py-2.5 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors mb-4"
            >
              Try Permanent Download Link →
            </a>
          )}
          <p className="text-xs text-navy-400 mb-4">
            Need help? Email <a href="mailto:whooshinglander@gmail.com" className="underline">whooshinglander@gmail.com</a>
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  const price = tier === 'custom' ? 'RM55' : 'RM30'

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md w-full">
        {/* Success icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-navy-800 mb-2">Payment confirmed!</h1>
        <p className="text-navy-500 text-sm mb-2">
          {tier === 'custom' ? 'Custom PDF' : 'Standard PDF'} — MYR {price}
        </p>

        <p className="text-navy-400 text-xs mb-6">
          Your contract is ready. Click below to download your PDF.
        </p>

        {/* Instant download button */}
        <button
          onClick={handleDownload}
          disabled={status === 'downloading'}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base shadow-sm mb-4"
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
        <EmailToSelf token={sessionId} />

        {/* Permanent download link */}
        {sessionId && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-navy-500 mb-2 font-medium">🔗 Permanent download link (bookmark this):</p>
            <a
              href={`/download?token=${sessionId}`}
              className="text-xs text-brand-600 hover:text-brand-700 underline break-all"
            >
              sewa2u.com/download?token={sessionId}
            </a>
          </div>
        )}

        <p className="text-xs text-navy-400">
          Questions? <a href="mailto:whooshinglander@gmail.com" className="underline hover:text-navy-600">whooshinglander@gmail.com</a>
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <p className="text-navy-500 text-sm animate-pulse">Loading…</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}
