import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Malaysia Tenancy Agreement Template — Free PDF Download',
  description: 'Download a Malaysia tenancy agreement template. Covers residential, condo, room rental. General-compliant, editable Word/PDF format.',
  keywords: 'tenancy agreement template Malaysia download, Malaysia tenancy agreement template, rental agreement template Malaysia, free tenancy agreement template Malaysia, Tenancy agreement template, tenancy agreement Malaysia download, residential tenancy agreement template',
  alternates: { canonical: 'https://sewa2u.com/tenancy-agreement-template' },
  openGraph: {
    title: 'Malaysia Tenancy Agreement Template — Free PDF Download',
    description: 'Download a free Malaysia tenancy agreement template. Covers residential, condo, room rental. General-compliant, editable format.',
    url: 'https://sewa2u.com/tenancy-agreement-template',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'Where can I get a tenancy agreement template in Malaysia?',
    a: "The Council for Estate Agencies (General) provides a basic residential tenancy agreement template as a PDF. Sewa2u goes further — instead of a blank template you fill in manually, our guided form generates a fully customised agreement based on your specific property, parties, and terms. Preview before purchase before you pay.",
  },
  {
    q: 'Is the Tenancy agreement template mandatory in Malaysia?',
    a: "No. The General template is a guide, not a legal requirement. Landlords and tenants in Malaysia are free to use any written agreement they both accept, provided it covers the essential terms. Using a purpose-built generator ensures nothing important is missed.",
  },
  {
    q: 'What is the difference between residential and private property tenancy agreements?',
    a: "Residential tenancies have additional restrictions: whole-flat subletting requires property approval, occupancy caps apply (max 6 or 9 persons depending on flat type), and only Malaysia Citizens can own residential properties. Private property agreements have fewer restrictions but the same legal requirements apply — stamp duty to LHDN, written agreement, and standard clauses for deposits and termination.",
  },
  {
    q: 'How do I fill in a Malaysia tenancy agreement template?',
    a: "A complete tenancy agreement needs: full address of the property, full legal names and NRIC/passport numbers of both landlord and tenant, tenancy start and end dates, monthly rental amount, security deposit (1–2 months), notice period, any diplomatic clause, and an inventory list if the unit is furnished. Using a generator ensures all mandatory fields are included.",
  },
  {
    q: 'Do I need a lawyer for a tenancy agreement in Malaysia?',
    a: "Not required for standard residential tenancies. A well-structured tenancy agreement from a reliable generator is legally sufficient for most residential and private residential lettings in Malaysia. Consider engaging a lawyer only for complex commercial leases, high-value properties, or if there are non-standard arrangements.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const comparison = [
  { feature: 'Customised to your property', template: false, generator: true },
  { feature: 'Guided step-by-step form', template: false, generator: true },
  { feature: 'property-specific clauses', template: false, generator: true },
  { feature: 'Diplomatic clause auto-included', template: false, generator: true },
  { feature: 'Free to use', template: true, generator: true },
  { feature: 'Printable PDF output', template: true, generator: true },
  { feature: 'You choose which clauses to include', template: true, generator: false },
  { feature: 'Manual data entry into blanks', template: true, generator: false },
]

export default function TenancyTemplatePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">Free Template</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Malaysia Tenancy Agreement Template
          </h1>
          <p className="text-navy-500 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Skip the blank template. Generate a fully customised Malaysia tenancy agreement in minutes — preview before purchase, download from <strong className="text-navy-700">RM30</strong>.
          </p>
          <Link href="/" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors text-base">
            Generate Tenancy Agreement →
          </Link>
        </section>

        {/* What a tenancy agreement template includes */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-4">What Does a Malaysia Tenancy Agreement Template Include?</h2>
          <div className="prose prose-slate prose-sm max-w-none text-navy-600 space-y-3 mb-6">
            <p>
              A comprehensive tenancy agreement template in Malaysia covers all the essential terms both landlord and tenant need. Whether you use the General template or generate one with Sewa2u, the agreement should include:
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 mb-6">
            {[
              { label: 'Parties', value: 'Full legal names and NRIC/FIN/passport numbers of landlord and tenant' },
              { label: 'Property address', value: 'Full address including unit number and postal code' },
              { label: 'Rent amount', value: 'Monthly rent, payment date, and accepted payment methods' },
              { label: 'Security deposit', value: "1 month's rent (1-year lease) or 2 months' rent (2-year lease)" },
              { label: 'Tenancy duration', value: 'Start date, end date, and any option to renew' },
              { label: 'Diplomatic clause', value: 'Early termination rights for expat tenants on repatriation or job loss' },
              { label: 'Notice period', value: 'Typically 1–2 months written notice for termination' },
              { label: 'Maintenance', value: "Each party's responsibilities for repairs and upkeep" },
              { label: 'Inventory list', value: 'List of furnishings and fittings included with the property' },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 px-5 py-3 text-sm items-start">
                <span className="font-semibold text-navy-700 w-44 shrink-0">{row.label}</span>
                <span className="text-navy-500">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Residential vs Condo vs Room Rental */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-5 text-center">Residential vs Condo vs Room Rental Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/tenancy-agreement" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-semibold text-navy-800 mb-1 group-hover:text-brand-600">Residential Flat</h3>
              <p className="text-sm text-navy-500">Requires property subletting approval, occupancy caps (6–9 persons), minimum 6-month tenancy. Additional clauses for compliance.</p>
              <p className="text-xs text-brand-600 font-medium mt-3">Residential Tenancy Agreement →</p>
            </Link>
            <Link href="/" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-semibold text-navy-800 mb-1 group-hover:text-brand-600">Private Condo / Landed</h3>
              <p className="text-sm text-navy-500">No property approval needed. Includes air-con servicing, condo management fees, and maintenance clauses. More flexibility on terms.</p>
              <p className="text-xs text-brand-600 font-medium mt-3">Generate Now →</p>
            </Link>
            <Link href="/room-rental-agreement" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">🛏️</div>
              <h3 className="font-semibold text-navy-800 mb-1 group-hover:text-brand-600">Room Rental</h3>
              <p className="text-sm text-navy-500">For single rooms in residential or private property. Includes house rules, shared facilities, and shorter minimum periods.</p>
              <p className="text-xs text-brand-600 font-medium mt-3">Room Rental Agreement →</p>
            </Link>
          </div>
        </section>

        {/* Comparison table */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-5 text-center">Template vs Generator</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-navy-500 uppercase tracking-wide">
              <div className="px-5 py-3">Feature</div>
              <div className="px-3 py-3 text-center text-navy-400">Blank Template</div>
              <div className="px-3 py-3 text-center text-brand-600">Sewa2u Generator</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                <div className="px-5 py-3 text-sm text-navy-700">{row.feature}</div>
                <div className="px-3 py-3 text-center text-lg">{row.template ? '✅' : '❌'}</div>
                <div className="px-3 py-3 text-center text-lg">{row.generator ? '✅' : '❌'}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-xl font-bold text-navy-800 mb-6">Malaysia Tenancy Agreement Template — FAQs</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <h3 className="font-semibold text-navy-800 text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Resources */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-lg font-bold text-navy-800 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tenancy-agreement', label: 'Residential Tenancy Agreement', desc: 'property-specific clauses, subletting approval, and occupancy rules.' },
              { href: '/room-rental-agreement', label: 'Room Rental Agreement', desc: 'Room rentals in residential or private property — house rules included.' },
              { href: '/tenancy-renewal', label: 'Tenancy Renewal Malaysia', desc: 'Renew an existing tenancy agreement quickly.' },
              { href: '/tenancy-agreement', label: 'Tenancy Agreement Guide', desc: 'Complete guide to Malaysia tenancy agreements.' },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-brand-300 transition-colors">
                <p className="font-semibold text-navy-800 text-sm">{l.label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{l.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="bg-brand-600 rounded-2xl px-8 py-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Generate a better tenancy agreement</h2>
            <p className="text-blue-100 mb-6 text-sm">Customised to your property. No account needed.</p>
            <Link href="/" className="inline-block bg-white text-brand-600 px-7 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-colors">
              Start Now →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
