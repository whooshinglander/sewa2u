import { ContractDocument } from '@/lib/contract/generateContract'
import WatermarkOverlay from './WatermarkOverlay'

type Props = {
  doc: ContractDocument
  hasCustomClauses: boolean
  showFull?: boolean
}

// Skip these sections — they're rendered in the formal BETWEEN header instead
const HEADER_SECTION_TITLES = ['1. Parties', '2. Property']
const VISIBLE_SECTIONS = 7 // Show first 7 body clauses, lock the rest

function ordinalDay(dateStr: string): string {
  if (!dateStr) return '___'
  const d = new Date(dateStr + 'T00:00:00').getDate()
  const s = ['th','st','nd','rd']
  const v = d % 100
  return d + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

function fmtMonth(dateStr: string): string {
  if (!dateStr) return '___'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-MY', { month: 'long' })
}

function fmtYear(dateStr: string): string {
  if (!dateStr) return '___'
  return String(new Date(dateStr + 'T00:00:00').getFullYear())
}

function fmtDateFull(dateStr: string): string {
  if (!dateStr) return '[DATE]'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
}

const LEGAL_FONT: React.CSSProperties = {
  fontFamily: '"Times New Roman", Times, Georgia, serif',
  userSelect: 'none',
  WebkitUserSelect: 'none',
}

export default function ContractPreview({ doc, hasCustomClauses, showFull = false }: Props) {
  const { meta } = doc

  // Separate header sections from body clauses
  const bodySections = doc.sections.filter(s =>
    !HEADER_SECTION_TITLES.includes(s.title) &&
    (showFull ? true : !s.isCustom)
  )
  const visibleSections = showFull ? bodySections : bodySections.slice(0, VISIBLE_SECTIONS)
  const lockedSections = showFull ? [] : bodySections.slice(VISIBLE_SECTIONS)

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {!showFull && <WatermarkOverlay />}

      {/* ── Document body ── */}
      <div className="relative z-0 p-8 sm:p-14" style={LEGAL_FONT}>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
            Tenancy Agreement
          </h1>
          <p className="text-sm text-navy-600 mt-1">({meta.propertyType})</p>
        </div>

        {/* THIS AGREEMENT made on... */}
        <p className="text-sm text-navy-800 leading-relaxed mb-6">
          <strong>THIS AGREEMENT</strong> made on the{' '}
          <span className="underline underline-offset-2">&nbsp;{ordinalDay(meta.commencementDate)}&nbsp;</span>{' '}
          day of{' '}
          <span className="underline underline-offset-2">&nbsp;{fmtMonth(meta.commencementDate)}&nbsp;</span>{' '}
          {fmtYear(meta.commencementDate)}
        </p>

        {/* BETWEEN — Landlord */}
        <p className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">Between</p>

        <div className="ml-4 mb-4 space-y-1 text-sm text-navy-800">
          <p><span className="font-semibold">NAME:</span>&nbsp;&nbsp;{meta.landlordName}</p>
          <p><span className="font-semibold">NRIC / FIN No:</span>&nbsp;&nbsp;{meta.landlordNric}</p>
          <p><span className="font-semibold">ADDRESS:</span>&nbsp;&nbsp;{meta.landlordAddress}</p>
        </div>
        <p className="text-sm text-navy-700 italic ml-4 mb-6">
          (hereinafter called &ldquo;<strong>the Landlord</strong>&rdquo; which expression shall where the context so
          admits include the person entitled for the time being to the reversion immediately expectant on the term
          hereby created) of the one part
        </p>

        {/* AND — Tenant */}
        <p className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">And</p>

        <div className="ml-4 mb-4 space-y-1 text-sm text-navy-800">
          <p><span className="font-semibold">NAME:</span>&nbsp;&nbsp;{meta.tenantName}</p>
          <p><span className="font-semibold">NRIC / FIN / Passport No:</span>&nbsp;&nbsp;{meta.tenantNric}</p>
        </div>
        <p className="text-sm text-navy-700 italic ml-4 mb-8">
          (hereinafter called &ldquo;<strong>the Tenant</strong>&rdquo; which expression shall where the context so
          admits include the Tenant&apos;s successors and assigns) of the other part.
        </p>

        {/* Agreed */}
        <p className="text-sm font-bold text-navy-800 mb-6 uppercase tracking-wider">
          Now It Is Hereby Agreed As Follows:
        </p>

        {/* ── Clause 1 — Property & Premises (from meta) ── */}
        <div className="mb-5 text-sm text-navy-800 leading-relaxed">
          <p className="font-semibold mb-1">1.</p>
          <div className="ml-5 space-y-3">
            <p>
              <span className="font-semibold">(a)</span>&nbsp; The Landlord agrees to let and the Tenant agrees to
              take all that property known as <span className="font-semibold">{meta.address}</span>{' '}
              (hereinafter called the &ldquo;<strong>Said Premises</strong>&rdquo;) together with the furniture,
              fixtures, and fittings therein belonging to the Landlord as specified in the Inventory List annexed
              hereto TO HOLD unto the Tenant from <span className="font-semibold">{fmtDateFull(meta.commencementDate)}</span>{' '}
              to <span className="font-semibold">{fmtDateFull(meta.expiryDate)}</span>, at the monthly rent of{' '}
              <span className="font-semibold">{meta.monthlyRent}</span>.
            </p>
          </div>
        </div>

        {/* ── Visible body sections (from clause 2 onwards) ── */}
        <div className="space-y-5 text-sm text-navy-800 leading-relaxed">
          {visibleSections.map((section, i) => {
            // Strip leading "N. " from title
            const titleText = section.title.replace(/^[\d]+[A-Z]?\.\s*/, '').replace(/^Schedule\s+\S+\.\s*/, '')
            const clauseNum = i + 2

            return (
              <div key={i}>
                <p className="font-semibold mb-1">{clauseNum}.&nbsp;<span className="normal-case">{titleText}</span></p>
                <div className="ml-5 text-navy-700 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Full view signature block ── */}
      {showFull && (
        <div className="px-8 sm:px-14 pb-14" style={LEGAL_FONT}>
          <div className="border-t border-slate-300 pt-8 mt-4">
            <p className="text-sm text-navy-700 mb-8">
              IN WITNESS WHEREOF the parties hereto have hereunto set their hands the day and year first above written.
            </p>
            <div className="grid grid-cols-1 gap-16">
                <div className="space-y-0 text-sm">
                  <p className="font-bold text-navy-900 mb-4">Landlord</p>
                  <p className="font-semibold text-navy-700 mb-16">Signature</p>
                  <div className="border-b border-slate-800 w-full mb-2" />
                  <p className="text-navy-800 mb-16">{meta.landlordName}</p>
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
                  <p className="text-navy-800 mb-16">{meta.tenantName}</p>
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

      {/* ── Locked sections + paywall ── */}
      {lockedSections.length > 0 && (
        <div className="relative">
          <div
            className="px-8 sm:px-14 pb-8 space-y-5 select-none pointer-events-none text-sm text-navy-800 leading-relaxed"
            style={{ ...LEGAL_FONT, filter: 'blur(4px)' }}
            aria-hidden="true"
          >
            {lockedSections.slice(0, 4).map((section, i) => {
              const titleText = section.title.replace(/^[\d]+[A-Z]?\.\s*/, '').replace(/^Schedule\s+\S+\.\s*/, '')
              const clauseNum = VISIBLE_SECTIONS + i + 2
              return (
                <div key={i}>
                  <p className="font-semibold mb-1">{clauseNum}.&nbsp;{titleText}</p>
                  <div className="ml-5 whitespace-pre-line">{section.content}</div>
                </div>
              )
            })}
            {/* Signature preview */}
            <div className="mt-10 pt-6 border-t border-slate-300">
              <p className="mb-6 text-sm">IN WITNESS WHEREOF the parties hereto have set their hands...</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="border-b border-slate-800 h-10 mb-2" />
                  <p className="text-xs">Signed by the Landlord — {meta.landlordName}</p>
                </div>
                <div>
                  <div className="border-b border-slate-800 h-10 mb-2" />
                  <p className="text-xs">Signed by the Tenant — {meta.tenantName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Paywall overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/90 to-transparent">
            <div className="text-center px-6 py-8 max-w-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-navy-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-navy-800 mb-1">
                {lockedSections.length} more clause{lockedSections.length !== 1 ? 's' : ''} + signature block
              </p>
              <p className="text-sm text-navy-500 mb-1">
                Download the full PDF to get a complete, ready-to-sign agreement.
              </p>
              {hasCustomClauses && (
                <p className="text-xs text-brand-600 font-medium mt-2">
                  + Your custom clauses included in the RM55 PDF
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── ERA-style disclaimer footer ── */}
      <div className="mx-8 sm:mx-14 mb-8 border border-slate-700 px-4 py-3" style={LEGAL_FONT}>
        <p className="text-xs text-navy-800 italic leading-snug">
          <strong>Important!</strong> This is a general document which may not be appropriate for use in all cases. When in doubt, please seek legal advice.{' '}
          <strong>Sewa2u.com</strong> disclaims any liability whatsoever arising from the use of this document (including any amendment(s) to this document).
        </p>
      </div>
    </div>
  )
}
