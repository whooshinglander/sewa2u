import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Renew Agreement Rumah Sewa Malaysia — PDF from RM30',
  description: 'Renew your tenancy agreement in Malaysia easily. Generate an updated residential or condo renewal contract in minutes. General-compliant.',
  keywords: 'tenancy renewal Malaysia, renew tenancy agreement Malaysia, residential rental renewal, extend tenancy agreement, tenancy renewal agreement Malaysia, tenancy renewal letter Malaysia, renew lease Malaysia',
  alternates: { canonical: 'https://sewa2u.com/tenancy-renewal' },
  openGraph: {
    title: 'Renew Agreement Rumah Sewa Malaysia — PDF from RM30',
    description: 'Renew your tenancy agreement in Malaysia easily. Generate an updated residential or condo renewal contract in minutes.',
    url: 'https://sewa2u.com/tenancy-renewal',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'How do I renew a tenancy agreement in Malaysia?',
    a: "To renew a tenancy in Malaysia: (1) Give notice of intention to renew before the expiry date — typically 2 months before, as required by most agreements. (2) Agree on the new rental rate and term with the other party. (3) Sign a new tenancy agreement or a renewal addendum. (4) Stamp the renewed agreement with LHDN within 14 days. Sewa2u's renewal generator creates a fresh, fully stamped-ready agreement pre-filled for renewals.",
  },
  {
    q: 'Do I need to sign a new tenancy agreement to renew?',
    a: "Yes — for certainty and legal protection, a new tenancy agreement is strongly recommended. A simple letter of intent to renew is not a binding agreement on its own. A new agreement sets out the updated rent, new dates, and any changed terms clearly, and can be stamped with LHDN.",
  },
  {
    q: 'How much notice do I need to give to renew a tenancy in Malaysia?',
    a: "Most Malaysia tenancy agreements require the tenant to give 2 months' written notice of intention to renew before the lease expiry. Check your existing agreement for the exact notice period — some specify 1 month. If your agreement includes an option to renew clause, the notice period and conditions stated there take precedence.",
  },
  {
    q: 'Can the landlord increase rent upon renewal?',
    a: "Yes. Unless your existing agreement includes a fixed renewal rent or a cap on rent increases, the landlord may propose a new rental rate for the renewal term. Malaysia has no rent control legislation — rent on renewal is entirely subject to negotiation between landlord and tenant. Market rate comparisons from PropertyGuru or 99.co can inform negotiations.",
  },
  {
    q: 'Do I need to pay stamp duty again on a tenancy renewal?',
    a: "Yes — stamp duty applies to each tenancy agreement, including renewals. The rate is the same: RM1 per RM250 of annual rent for leases of 1 year or less, or 0.4% of average annual rent for leases of 1–3 years. Pay to LHDN within 14 days of signing the renewal agreement.",
  },
  {
    q: 'What happens if the tenancy expires without renewal?',
    a: "If neither party terminates and the tenant continues to occupy and pay rent after expiry, a periodic tenancy (usually month-to-month) is created by implication. This carries risk — either party can terminate with short notice, and the original fixed-term protections no longer apply. A signed renewal agreement avoids this ambiguity.",
  },
  {
    q: 'Do I need to re-submit for property approval on renewal?',
    a: "If you are subletting an residential property, you must update your property subletting record when you renew. property approval for subletting is granted for up to 3 years at a time and must be renewed if the subletting continues beyond the approved period. Check your property approval letter for the approved end date.",
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Renew Tenancy Agreement Malaysia — residential & Condo Guide 2026',
  description: 'How to renew a tenancy agreement in Malaysia — notice periods, stamp duty, property approval, rent negotiation, and renewal checklist.',
  url: 'https://sewa2u.com/tenancy-renewal',
  publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
}

const renewalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Malaysia tenancy renewal agreement generator',
  serviceType: 'Tenancy renewal agreement generation',
  provider: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
  areaServed: { '@type': 'Country', name: 'Malaysia' },
  audience: { '@type': 'Audience', audienceType: 'Malaysia landlords and tenants renewing existing leases' },
  offers: {
    '@type': 'Offer',
    name: 'Tenancy renewal agreement PDF',
    description: '2-minute renewal flow — updated dates and rent, LHDN stamp duty ready.',
    price: '30',
    priceCurrency: 'MYR',
    availability: 'https://schema.org/InStock',
    url: 'https://sewa2u.com/renew',
  },
}

const STEPS = [
  { step: '1', title: 'Start the renewal form', desc: 'Go to the Renewal section on Sewa2u — pre-configured for renewal agreements.' },
  { step: '2', title: 'Enter updated details', desc: 'New start/end dates, updated rent amount, and any changed terms.' },
  { step: '3', title: 'Confirm parties', desc: 'Same landlord and tenant — just confirm names and NRIC/passport numbers are current.' },
  { step: '4', title: 'Review and preview', desc: 'Preview the full renewal agreement before paying.' },
  { step: '5', title: 'Download PDF', desc: 'Download the print-ready renewal agreement from RM30. Both parties sign and stamp.' },
]

export default function TenancyRenewalPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(renewalServiceSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">Tenancy Renewal</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Renew Tenancy Agreement Malaysia<br className="hidden sm:block" /> — Residential &amp; Condo
          </h1>
          <p className="text-navy-500 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Renewing your Malaysia tenancy? Generate a fresh renewal agreement in minutes — updated dates, new rent, same legal structure. Preview before purchase, download from <strong className="text-navy-700">RM30</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors text-base">
              Generate Renewal Agreement →
            </Link>
            <Link href="/" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-base">
              New Tenancy Agreement
            </Link>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '🔄', label: 'Renewal-ready form' },
              { icon: '👁️', label: 'Preview included' },
              { icon: '⚡', label: 'Under 3 minutes' },
              { icon: '📄', label: 'PDF from RM30' },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-xs font-semibold text-navy-700">{b.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-6 text-center">How to Renew a Tenancy Agreement in Malaysia</h2>
          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center shrink-0">{s.step}</div>
                <div>
                  <p className="font-semibold text-navy-800 text-sm">{s.title}</p>
                  <p className="text-sm text-navy-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-6">Tenancy Renewal Checklist — Malaysia</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {[
              { label: 'Notice to renew', value: "Give written notice at least 2 months before lease expiry (check your TA)" },
              { label: 'Agree new rent', value: 'Negotiate updated monthly rent — Malaysia has no rent control' },
              { label: 'Sign new agreement', value: 'Sign a fresh tenancy agreement or a renewal addendum' },
              { label: 'Stamp with LHDN', value: 'Pay stamp duty within 14 days of signing' },
              { label: 'property subletting', value: 'Update property subletting record if applicable' },
              { label: 'Inventory check', value: 'Update inventory list if furnishings changed' },
              { label: 'Security deposit', value: 'Top up deposit if rent increased and deposit needs adjusting' },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 px-5 py-3 text-sm items-start">
                <span className="text-brand-500 shrink-0 mt-0.5">✓</span>
                <span className="font-semibold text-navy-700 w-44 shrink-0">{row.label}</span>
                <span className="text-navy-500">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-xl font-bold text-navy-800 mb-6">Tenancy Renewal Malaysia — FAQs</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <h3 className="font-semibold text-navy-800 text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-lg font-bold text-navy-800 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tenancy-agreement', label: 'Malaysia Tenancy Agreement Guide', desc: 'New tenancy agreements — stamp duty, deposits, property rules.' },
              { href: '/tenancy-agreement', label: 'Residential Tenancy Agreement', desc: 'Residential property-specific clauses and renewal requirements.' },
              { href: '/tenancy-agreement-template', label: 'Tenancy Agreement Template', desc: 'Why a generator beats a blank template.' },
              { href: '/faq', label: 'Tenancy Agreement FAQ', desc: 'All common questions answered.' },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-brand-300 transition-colors">
                <p className="font-semibold text-navy-800 text-sm">{l.label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{l.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="bg-brand-600 rounded-2xl px-8 py-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Generate your tenancy renewal agreement now</h2>
            <p className="text-blue-100 mb-6 text-sm">No account. Under 3 minutes.</p>
            <Link href="/renew" className="inline-block bg-white text-brand-600 px-7 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-colors">
              Start Renewal →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
