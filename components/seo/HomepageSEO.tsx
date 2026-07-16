import Link from 'next/link'
import EmailCapture from '@/components/ui/EmailCapture'

// Server component . Fully SSR, crawlable by Google
export default function HomepageSEO() {
  return (
    <section className="bg-navy-50 border-t border-navy-100 mt-8 py-14 px-4">
      <div className="max-w-3xl mx-auto">

        {/* About */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-navy-800 mb-4 font-display">
            Malaysia Tenancy Agreement Generator
          </h2>
          <p className="text-navy-500 leading-relaxed mb-4">
            Sewa2u generates Malaysia residential tenancy agreements. Whether you are a landlord renting out a residential property, a private condominium, or a room, our guided form produces a legally structured tenancy agreement in under 5 minutes. Preview before purchase, download from RM30.
          </p>
          <p className="text-navy-500 leading-relaxed">
            Unlike a blank template you fill in manually, the generator builds the agreement around your specific property, parties, and terms. It prompts you for the relevant details and including the appropriate clauses based on your inputs. For standard residential tenancies in Malaysia, most landlords and tenants handle this without a lawyer.
          </p>
        </div>

        {/* Key features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-5 font-display">What&apos;s Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Residential & Private Property', desc: 'Covers residential property subletting, private condo, landed property, and room rentals. Property-specific clauses auto-included.' },
              { title: 'Diplomatic Clause', desc: 'Standard for expatriate tenants. Allows early termination on repatriation or job transfer.' },
              { title: 'Custom Clauses', desc: 'Aircon servicing, pet policy, minor repair threshold, no-smoking, CCTV, and more.' },
              { title: 'Stamp Duty Ready', desc: 'Generated agreements are structured for LHDN stamping within 14 days of signing.' },
              { title: 'Inventory List', desc: 'Add furniture and fittings with condition notes, attached as a schedule to the agreement.' },
              { title: 'Tenancy Renewal', desc: 'Dedicated renewal flow for existing tenants. Generate a fresh renewal agreement quickly.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-navy-100 p-5 shadow-sm hover:border-brand-200 transition-colors">
                <h3 className="font-semibold text-navy-800 mb-1 text-sm font-display">{f.title}</h3>
                <p className="text-sm text-navy-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick facts */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-5 font-display">Malaysia Tenancy Agreement: Quick Reference</h2>
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm divide-y divide-navy-50 text-sm">
            {[
              { label: 'Stamp duty', value: 'RM1 per RM250 of annual rent. Pay to LHDN within 14 days of signing' },
              { label: 'Security deposit', value: "1 month's rent (1-year lease) · 2 months' rent (2-year lease)" },
              { label: 'Notice period', value: '1–2 months written notice (check your agreement)' },
              { label: 'Property subletting approval', value: 'Required for whole-flat subletting. Room rental does not require property approval.' },
              { label: 'Minimum tenancy (Residential)', value: '6 months for whole-flat subletting' },
              { label: 'Diplomatic clause', value: "Allows early exit on repatriation. Activate after month 12 with 2 months' notice" },
              { label: 'Lawyer required?', value: 'No, for standard Malaysia residential tenancies' },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 px-5 py-3">
                <span className="font-semibold text-navy-700 w-48 shrink-0">{row.label}</span>
                <span className="text-navy-500">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email capture */}
        <EmailCapture />

        {/* Internal links */}
        <div>
          <h2 className="text-xl font-bold text-navy-800 mb-5 font-display">Malaysia Tenancy Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tenancy-agreement', label: 'Tenancy Agreement Malaysia', desc: 'Full guide: stamp duty, deposits, property rules, diplomatic clause.' },
              { href: '/tenancy-agreement', label: 'Residential Tenancy Agreement', desc: 'Residential property subletting rules, occupancy caps, and property-specific clauses.' },
              { href: '/room-rental-agreement', label: 'Room Rental Agreement Malaysia', desc: 'Room rental terms, shared facilities, house rules.' },
              { href: '/tenancy-renewal', label: 'Tenancy Renewal Malaysia', desc: 'How to renew a tenancy agreement in Malaysia. Checklist and FAQ.' },
              { href: '/tenancy-agreement-template', label: 'Tenancy Agreement Template', desc: 'Why a guided generator beats a blank Word template.' },
              { href: '/tenancy-agreement-template', label: 'Tenancy Agreement Template Malaysia', desc: 'There is no single official template — what a proper Malaysia tenancy agreement needs.' },
              { href: '/faq', label: 'Tenancy Agreement FAQ', desc: 'All common questions: stamp duty, deposits, diplomatic clause, and more.' },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="bg-white rounded-xl border border-navy-100 shadow-sm p-4 hover:border-brand-300 transition-colors">
                <p className="font-semibold text-navy-800 text-sm font-display">{l.label}</p>
                <p className="text-xs text-navy-400 mt-0.5">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
