'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

type ExtensionData = {
  landlordName: string
  landlordNric: string
  tenantName: string
  tenantNric: string
  propertyAddress: string
  originalDate: string
  currentExpiryDate: string
  newExpiryDate: string
  rentChanged: boolean
  newMonthlyRent: number | ''
  rentPaymentDay: number | ''
  depositChanged: boolean
  newSecurityDeposit: number | ''
  diplomaticClauseApplies: boolean
  diplomaticNoticeMonths: number | ''
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const p = (v: string | number | '', fallback: string) =>
  (!v && v !== 0) ? `[${fallback}]` : String(v)

function ordinal(n: number): string {
  const s = ['TH', 'ST', 'ND', 'RD']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

function fmtDateFormal(d: string): string {
  if (!d) return '[DATE]'
  const dt = new Date(d + 'T00:00:00')
  const day = dt.getDate()
  const month = dt.toLocaleDateString('en-MY', { month: 'long' }).toUpperCase()
  const year = dt.getFullYear()
  return `${ordinal(day)} ${month} ${year}`
}

function monthsBetween(from: string, to: string): number {
  if (!from || !to) return 0
  const a = new Date(from + 'T00:00:00')
  const b = new Date(to + 'T00:00:00')
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

const ONES = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
  'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN']
const TENS = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY']

function numToWords(n: number): string {
  if (n === 0) return 'ZERO'
  if (n < 0) return 'MINUS ' + numToWords(-n)
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '')
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' HUNDRED' + (n % 100 ? ' AND ' + numToWords(n % 100) : '')
  if (n < 10000) return ONES[Math.floor(n / 1000)] + ' THOUSAND' + (n % 1000 ? ' ' + numToWords(n % 1000) : '')
  if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' THOUSAND' + (n % 1000 ? ' ' + numToWords(n % 1000) : '')
  return n.toLocaleString('en-MY')
}

function amountWords(n: number | ''): string {
  if (n === '' || n === 0) return '[AMOUNT IN WORDS]'
  const words = numToWords(Number(n))
  const cents = Math.round((Number(n) % 1) * 100)
  return words + ' ONLY'
}

const SHOW_CLAUSES = 3 // show first 3, lock the rest

// ─── Component ──────────────────────────────────────────────────────────────

export default function RenewPreviewPage() {
  const router = useRouter()
  const [data, setData] = useState<ExtensionData | null>(null)
  const [showFull, setShowFull] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadErr, setDownloadErr] = useState('')

  const handleDownload = async () => {
    if (!data) return
    setDownloading(true)
    setDownloadErr('')
    try {
      const res = await fetch('/api/generate-renewal-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: data }),
      })
      if (!res.ok) throw new Error('PDF generation failed.')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const address = (data.propertyAddress || 'tenancy').replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40)
      a.download = `SG-Tenancy-Renewal-Agreement-${address}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setDownloadErr(err instanceof Error ? err.message : 'Download failed. Try again.')
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('sewa2u_extension')
      if (raw) setData(JSON.parse(raw))
    } catch { /* ignore */ }
    const params = new URLSearchParams(window.location.search)
    if (params.get('full') === '1') setShowFull(true)
  }, [])

  if (!data) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <p className="text-navy-500 mb-4">No extension data found.</p>
            <button onClick={() => router.push('/renew')}
              className="px-6 py-2.5 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-[background-color]">
              Back to Form
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const extensionMonths = monthsBetween(data.currentExpiryDate, data.newExpiryDate)
  const monthsWords = extensionMonths > 0 ? numToWords(extensionMonths) : '[MONTHS IN WORDS]'
  const startDate = fmtDateFormal(data.currentExpiryDate)
  const originalTADate = fmtDateFormal(data.originalDate)
  const paymentDay = data.rentPaymentDay || 1
  const rent = data.rentChanged && data.newMonthlyRent ? Number(data.newMonthlyRent) : null
  const deposit = data.depositChanged && data.newSecurityDeposit ? Number(data.newSecurityDeposit) : null
  const dipNotice = data.diplomaticNoticeMonths || 1

  // Numbered clauses (matches ERA format)
  const clauses: { title?: string; content: React.ReactNode }[] = [
    {
      content: (
        <p>
          The Tenant hereby requests and the Landlord grants an extension of the Tenancy for a term of{' '}
          <strong>{extensionMonths > 0 ? `${monthsWords} (${extensionMonths})` : '[X]'} months</strong>{' '}
          (&ldquo;Term&rdquo;) with effect from <strong>{startDate}</strong> and expiring on{' '}
          <strong>{fmtDateFormal(data.newExpiryDate)}</strong>.
        </p>
      ),
    },
    {
      content: rent ? (
        <p>
          The monthly rent, inclusive of maintenance and service charge shall be Malaysia Dollars{' '}
          <strong>{amountWords(rent)} (RM{rent.toLocaleString('en-MY')}/-)</strong>, and payable in advance
          on the <strong>{ordinal(Number(paymentDay))}</strong> day of each month for the duration of the Term.
        </p>
      ) : (
        <p>
          The monthly rent shall remain unchanged as per the original Agreement, payable in advance on the{' '}
          <strong>{ordinal(Number(paymentDay))}</strong> day of each month for the duration of the Term.
        </p>
      ),
    },
    {
      content: (
        <div className="space-y-2">
          <p>
            The security deposit for this extension shall be{' '}
            {deposit
              ? <><strong>{amountWords(deposit)} (RM{deposit.toLocaleString('en-MY')}/-)</strong>.</>
              : <span>unchanged as per the original Agreement.</span>
            }
          </p>
          {deposit && (
            <div className="ml-4 space-y-1">
              <p>a. In the event that the security deposit is increased from the previous deposit, the Tenant shall top-up the excess deposit to the Landlord upon the commencement of this extension.</p>
              <p>b. In the event that the security deposit is decreased from the previous deposit, the Landlord shall refund the difference to the Tenant upon the commencement of this extension.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      content: (
        <p>
          The Tenant shall have an Option to renew the lease for a further term by serving two (2) months&apos; written
          notice prior to the expiry of this Term at a rent to be mutually agreed between the parties but otherwise
          containing the like conditions, covenants and stipulations as are herein contained with the exception of
          this option for renewal.
        </p>
      ),
    },
    {
      content: data.diplomaticClauseApplies ? (
        <p>
          The Tenant may exercise the &ldquo;Diplomatic Clause&rdquo; by serving{' '}
          <strong>{numToWords(Number(dipNotice))} ({dipNotice}) month{Number(dipNotice) !== 1 ? 's' : ''}&apos;</strong>{' '}
          notice at any time during the extension of this tenancy.
        </p>
      ) : (
        <p>
          For avoidance of doubt, the &ldquo;Diplomatic Clause&rdquo; in the Tenancy Agreement shall <strong>not</strong> apply
          for the duration of this extension.
        </p>
      ),
    },
    {
      content: (
        <p>
          It is further agreed that all other terms and conditions contained in the Agreement shall remain in force
          for the entire duration of the Term. In the event of any conflict(s) between the terms of this extension
          and the Agreement, the terms and conditions of this extension shall prevail.
        </p>
      ),
    },
    {
      content: (
        <p>
          This Agreement shall be governed and construed in accordance with the laws of Malaysia and the
          jurisdiction of the Malaysia courts.
        </p>
      ),
    },
  ]

  const visibleClauses = showFull ? clauses : clauses.slice(0, SHOW_CLAUSES)
  const lockedClauses = showFull ? [] : clauses.slice(SHOW_CLAUSES)

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="mb-4">
          <p className="text-sm text-navy-500 font-medium mb-0.5">Your Renewal Preview</p>
          <h2 className="text-xl font-bold text-navy-800">{data.propertyAddress || 'Tenancy Renewal'}</h2>
        </div>



        <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Watermark */}
          {!showFull && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
              {[15, 45, 75].map(top => (
                <div key={top} className="absolute left-[-20%] right-[-20%] text-center"
                  style={{ top: `${top}%`, transform: 'rotate(-30deg)', color: 'rgba(239,68,68,0.08)',
                    fontSize: '2.5rem', fontWeight: 800, letterSpacing: '0.1em', whiteSpace: 'nowrap', userSelect: 'none' }}>
                  DRAFT — NOT FOR LEGAL USE
                </div>
              ))}
            </div>
          )}

          {/* Document body */}
          <div className="relative z-0 p-8 sm:p-14"
            style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', userSelect: 'none', WebkitUserSelect: 'none' }}>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide mb-1">
                Tenancy Renewal Agreement
              </h1>
            </div>

            {/* Intro paragraph */}
            <p className="text-sm text-navy-700 leading-relaxed mb-6">
              This Tenancy Renewal Agreement is made pursuant to the Tenancy Agreement (the &ldquo;Agreement&rdquo;) dated{' '}
              <strong>{originalTADate}</strong> entered into between
            </p>

            {/* BETWEEN — Landlord */}
            <p className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">Between</p>
            <div className="ml-4 mb-4 space-y-1 text-sm text-navy-800">
              <p><span className="font-semibold">NAME:</span>&nbsp;&nbsp;{p(data.landlordName, 'LANDLORD NAME')}</p>
              <p><span className="font-semibold">NRIC / FIN No:</span>&nbsp;&nbsp;{p(data.landlordNric, 'SXXXXXXXA')}</p>
            </div>
            <p className="text-sm text-navy-700 italic ml-4 mb-6">
              (hereinafter called &ldquo;<strong>the Landlord</strong>&rdquo;) of the one part
            </p>

            {/* AND — Tenant */}
            <p className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">And</p>
            <div className="ml-4 mb-4 space-y-1 text-sm text-navy-800">
              <p><span className="font-semibold">NAME:</span>&nbsp;&nbsp;{p(data.tenantName, 'TENANT NAME')}</p>
              <p><span className="font-semibold">NRIC / FIN / Passport No:</span>&nbsp;&nbsp;{p(data.tenantNric, 'SXXXXXXXA')}</p>
            </div>
            <p className="text-sm text-navy-700 italic ml-4 mb-6">
              (hereinafter called &ldquo;<strong>the Tenant</strong>&rdquo;) of the other part
            </p>

            {/* Property */}
            <p className="text-sm text-navy-700 leading-relaxed mb-8">
              for the lease of the premises known as{' '}
              <strong>{p(data.propertyAddress, 'PROPERTY ADDRESS')}</strong>{' '}
              (&ldquo;Premises&rdquo;).
            </p>

            <p className="text-sm font-semibold text-navy-800 mb-4">The Parties hereby agree as follows:</p>

            {/* Visible clauses */}
            <div className="space-y-5 text-sm text-navy-700 leading-relaxed">
              {visibleClauses.map((clause, i) => (
                <div key={i} className="flex gap-3">
                  <span className="font-semibold text-navy-800 flex-shrink-0 w-4">{i + 1}.</span>
                  <div className="flex-1">{clause.content}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Locked clauses + signature — blurred paywall */}
          {lockedClauses.length > 0 && (
            <div className="relative">
              <div className="px-8 sm:px-14 pb-8 pointer-events-none"
                style={{ filter: 'blur(4px)', userSelect: 'none', fontFamily: '"Times New Roman", Times, Georgia, serif' }} aria-hidden="true">
                <div className="space-y-5 text-sm text-navy-700 leading-relaxed">
                  {lockedClauses.map((clause, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="font-semibold text-navy-800 flex-shrink-0 w-4">{SHOW_CLAUSES + i + 1}.</span>
                      <div className="flex-1">{clause.content}</div>
                    </div>
                  ))}
                </div>

                {/* Signature block preview */}
                <div className="border-t border-slate-300 pt-8 mt-4">
                  <p className="text-sm text-navy-700 mb-8">
                    IN WITNESS WHEREOF the parties hereto have hereunto set their hands the day and year first above written.
                  </p>
                  <div className="grid grid-cols-1 gap-16">
                    <div className="space-y-0 text-sm">
                      <p className="font-bold text-navy-900 mb-4">Landlord</p>
                      <p className="font-semibold text-navy-700 mb-16">Signature</p>
                      <div className="border-b border-slate-800 w-full mb-2" />
                      <p className="text-navy-800 mb-16">{data.landlordName || '[LANDLORD NAME]'}</p>
                      <p className="font-bold text-navy-900 uppercase tracking-wide mb-4">In the Presence of (Witness)</p>
                      <div className="grid grid-cols-2 gap-8 mb-4">
                        <div><p className="font-semibold text-navy-700 mb-8">Name</p><div className="border-b border-slate-800 w-full mb-1" /><p className="text-xs text-navy-400">Full name as per NRIC</p></div>
                        <div><p className="font-semibold text-navy-700 mb-8">NRIC No.</p><div className="border-b border-slate-800 w-full mb-1" /><p className="text-xs text-navy-400">Identity number</p></div>
                      </div>
                      <p className="font-semibold text-navy-700 mb-8">Date</p>
                      <div className="border-b border-slate-800 w-1/3" />
                    </div>
                    <div className="space-y-0 text-sm">
                      <p className="font-bold text-navy-900 mb-4">Tenant</p>
                      <p className="font-semibold text-navy-700 mb-16">Signature</p>
                      <div className="border-b border-slate-800 w-full mb-2" />
                      <p className="text-navy-800 mb-16">{data.tenantName || '[TENANT NAME]'}</p>
                      <p className="font-bold text-navy-900 uppercase tracking-wide mb-4">In the Presence of (Witness)</p>
                      <div className="grid grid-cols-2 gap-8 mb-4">
                        <div><p className="font-semibold text-navy-700 mb-8">Name</p><div className="border-b border-slate-800 w-full mb-1" /><p className="text-xs text-navy-400">Full name as per NRIC</p></div>
                        <div><p className="font-semibold text-navy-700 mb-8">NRIC No.</p><div className="border-b border-slate-800 w-full mb-1" /><p className="text-xs text-navy-400">Identity number</p></div>
                      </div>
                      <p className="font-semibold text-navy-700 mb-8">Date</p>
                      <div className="border-b border-slate-800 w-1/3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Paywall overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/90 to-transparent">
                <div className="text-center px-6 py-8 max-w-sm">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-navy-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold text-navy-800 mb-1">
                    {lockedClauses.length} more clause{lockedClauses.length !== 1 ? 's' : ''} + signature block
                  </p>
                  <p className="text-sm text-navy-500">Download the full PDF to get a complete, ready-to-sign Tenancy Renewal Agreement.</p>
                </div>
              </div>
            </div>
          )}

          {/* Full mode: show all + signature */}
          {showFull && (
            <div className="px-8 sm:px-14 pb-12 text-sm text-navy-700"
              style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
              <div className="border-t border-slate-300 pt-8 mt-4">
                <p className="text-sm text-navy-700 mb-8">
                  IN WITNESS WHEREOF the parties hereto have hereunto set their hands the day and year first above written.
                </p>
                <div className="grid grid-cols-1 gap-16">
                  <div className="space-y-0 text-sm">
                    <p className="font-bold text-navy-900 mb-4">Landlord</p>
                    <p className="font-semibold text-navy-700 mb-16">Signature</p>
                    <div className="border-b border-slate-800 w-full mb-2" />
                    <p className="text-navy-800 mb-16">{data.landlordName || '[LANDLORD NAME]'}</p>
                    <p className="font-bold text-navy-900 uppercase tracking-wide mb-4">In the Presence of (Witness)</p>
                    <div className="grid grid-cols-2 gap-8 mb-4">
                      <div>
                        <p className="font-semibold text-navy-700 mb-8">Name</p>
                        <div className="border-b border-slate-800 w-full mb-1" />
                        <p className="text-xs text-navy-400">Full name as per NRIC</p>
                      </div>
                      <div>
                        <p className="font-semibold text-navy-700 mb-8">NRIC No.</p>
                        <div className="border-b border-slate-800 w-full mb-1" />
                        <p className="text-xs text-navy-400">Identity number</p>
                      </div>
                    </div>
                    <p className="font-semibold text-navy-700 mb-8">Date</p>
                    <div className="border-b border-slate-800 w-1/3" />
                  </div>
                  <div className="space-y-0 text-sm">
                    <p className="font-bold text-navy-900 mb-4">Tenant</p>
                    <p className="font-semibold text-navy-700 mb-16">Signature</p>
                    <div className="border-b border-slate-800 w-full mb-2" />
                    <p className="text-navy-800 mb-16">{data.tenantName || '[TENANT NAME]'}</p>
                    <p className="font-bold text-navy-900 uppercase tracking-wide mb-4">In the Presence of (Witness)</p>
                    <div className="grid grid-cols-2 gap-8 mb-4">
                      <div>
                        <p className="font-semibold text-navy-700 mb-8">Name</p>
                        <div className="border-b border-slate-800 w-full mb-1" />
                        <p className="text-xs text-navy-400">Full name as per NRIC</p>
                      </div>
                      <div>
                        <p className="font-semibold text-navy-700 mb-8">NRIC No.</p>
                        <div className="border-b border-slate-800 w-full mb-1" />
                        <p className="text-xs text-navy-400">Identity number</p>
                      </div>
                    </div>
                    <p className="font-semibold text-navy-700 mb-8">Date</p>
                    <div className="border-b border-slate-800 w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ERA-style disclaimer footer ── */}
          <div className="mx-8 sm:mx-14 mb-8 border border-slate-700 px-4 py-3"
            style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
            <p className="text-xs text-navy-800 italic leading-snug">
              <strong>Important!</strong> This is a general document which may not be appropriate for use in all cases. When in doubt, please seek legal advice.{' '}
              <strong>Sewa2u.com</strong> disclaims any liability whatsoever arising from the use of this document (including any amendment(s) to this document).
            </p>
          </div>
        </div>

        <p className="text-xs text-navy-400 text-center mt-4">Not legal advice. Generated for reference only.</p>
      </main>

      {/* Sticky bottom action bar — full mode: download button */}
      {showFull && (
        <div className="sticky bottom-0 z-30 bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => router.push('/renew')}
                className="btn-secondary text-sm"
                style={{ touchAction: 'manipulation' }}>
                ← Edit details
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm"
                style={{ touchAction: 'manipulation' }}>
                {downloading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating PDF…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
            {downloadErr && <p className="text-xs text-red-500 mt-2 text-center">{downloadErr}</p>}
          </div>
        </div>
      )}

      {/* Sticky bottom action bar — preview mode */}
      {!showFull && (
        <div className="sticky bottom-0 z-30 bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <p className="text-xs text-navy-500 text-center mb-3">
              ⚠️ Watermarked preview. Download the official PDF to use as a legal document.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => router.push('/renew')}
                className="btn-secondary text-sm"
                style={{ touchAction: 'manipulation' }}>
                ← Edit details
              </button>
              <button
                onClick={() => {
                  sessionStorage.setItem('sewa2u_tier', 'renewal')
                  router.push('/checkout?type=renewal')
                }}
                className="flex-1 sm:max-w-[60%] flex items-center justify-between px-5 py-3 bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors"
                style={{ touchAction: 'manipulation' }}>
                <div className="text-left">
                  <p className="text-sm font-semibold">Renewal PDF</p>
                  <p className="text-xs text-navy-400">One-page extension agreement</p>
                </div>
                <span className="text-lg font-bold ml-4">RM30</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
