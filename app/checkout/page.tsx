'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'

const REQUIRED_FIELDS: { key: string; label: string }[] = [
  { key: 'propertyAddress', label: 'Property address' },
  { key: 'landlordName', label: 'Landlord name' },
  { key: 'tenantName', label: 'Tenant name' },
  { key: 'commencementDate', label: 'Commencement date' },
  { key: 'monthlyRent', label: 'Monthly rent' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const isRenewal = params.get('type') === 'renewal'

    const tier = isRenewal ? 'renewal' : (sessionStorage.getItem('sewa2u_tier') as 'standard' | 'custom' | null)
    const rawForm = isRenewal
      ? sessionStorage.getItem('sewa2u_extension')
      : (sessionStorage.getItem('sewa2u_form') || localStorage.getItem('sewa2u_form'))

    if (!tier || !rawForm) {
      router.replace(isRenewal ? '/renew' : '/preview')
      return
    }

    let formData = null
    try {
      formData = JSON.parse(rawForm)
    } catch {
      router.replace(isRenewal ? '/renew' : '/preview')
      return
    }

    // Browser-side dup-payment guard: if this session already produced a paid Stripe
    // session, send the user to /success with the existing session_id instead of
    // creating a new checkout. Survives back-navigation from success page.
    const existingPaidId = sessionStorage.getItem('sewa2u_paid_session_id')
    if (existingPaidId) {
      window.location.href = `/success?session_id=${encodeURIComponent(existingPaidId)}&tier=${tier}`
      return
    }

    // Block checkout when the user came via "see sample" — they have dummy data, not a real contract.
    if (sessionStorage.getItem('sewa2u_is_sample') === 'true' && !isRenewal) {
      setError('This is a sample contract. Go back, fill in your real details, then come back to pay.')
      return
    }

    // Client-side required-fields check (server always re-validates).
    // Skip flags control preview only — never bypass payment validation.
    if (!isRenewal) {
      const missing = REQUIRED_FIELDS
        .filter(f => {
          const v = formData?.[f.key]
          return v === undefined || v === null || (typeof v === 'string' && v.trim() === '')
        })
        .map(f => f.label)
      if (missing.length) {
        setMissingFields(missing)
        setError('Please fill in the required fields before paying.')
        return
      }
    }

    // Show "taking longer than usual" message after 5s
    const slowTimer = setTimeout(() => setSlow(true), 5000)

    const customerEmail =
      formData?.receiptEmail || formData?.tenantEmail || formData?.email || ''

    // Create Stripe checkout session — now includes formData for permanent storage
    fetch('/api/checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier, formData, customerEmail }),
    })
      .then(async r => {
        const data = await r.json()
        return { ok: r.ok, data }
      })
      .then(({ ok, data }) => {
        clearTimeout(slowTimer)
        if (ok && data.url) {
          window.location.href = data.url
        } else if (data.missing && Array.isArray(data.missing)) {
          // Server-side validation rejected: show specific fields
          setMissingFields(
            data.missing.map((k: string) =>
              REQUIRED_FIELDS.find(f => f.key === k)?.label || k,
            ),
          )
          setError('Please fill in the required fields before paying.')
        } else {
          setError(data.error || 'Failed to start checkout. Please try again.')
        }
      })
      .catch(() => {
        clearTimeout(slowTimer)
        setError('Network error. Please try again.')
      })

    return () => clearTimeout(slowTimer)
  }, [router])

  if (error) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-navy-800 mb-2">
              {missingFields.length ? 'Required fields missing' : 'Something went wrong'}
            </h2>
            <p className="text-navy-500 text-sm mb-4">{error}</p>
            {missingFields.length > 0 && (
              <ul className="text-left bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-900">
                {missingFields.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
            >
              ← Go Back to Form
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4 animate-pulse">💳</div>
          <p className="text-navy-600 font-medium">Redirecting to secure checkout…</p>
          <p className="text-navy-400 text-sm mt-2">
            Secure payment via Stripe. You will not be charged until you confirm on the next page.
          </p>
          <p className="text-navy-400 text-xs mt-4" aria-live="polite">
            {slow && (
              <>
                Taking longer than usual… Please wait or{' '}
                <button onClick={() => router.back()} className="underline hover:text-navy-600">go back</button>
                {' '}and try again.
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  )
}
