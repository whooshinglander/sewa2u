import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Tenancy Agreement Sample Malaysia — Extension & PDF',
  description: 'Generate a Malaysia tenancy agreement in 5 minutes — residential, condo, landed or room rental. General-compliant, preview before purchase, clean PDF from RM30. No sign-up.',
  keywords: 'tenancy agreement Malaysia pdf, tenancy agreement Malaysia, Malaysia tenancy agreement pdf, rental agreement Malaysia pdf, Malaysia rental agreement, Tenancy agreement, residential rental agreement, lease agreement Malaysia, tenancy contract Malaysia',
  alternates: { canonical: 'https://sewa2u.com/tenancy-agreement' },
  openGraph: {
    title: 'Tenancy Agreement Sample Malaysia — Extension & PDF',
    description: 'Generate a Malaysia tenancy agreement PDF online. residential, condo, landed, room rental — General-compliant. Preview before purchase, download from RM30.',
    url: 'https://sewa2u.com/tenancy-agreement',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'What must a tenancy agreement in Malaysia include?',
    a: "A Malaysia tenancy agreement must include: full names and NRIC/FIN/passport numbers of landlord and tenant, full address of the property, tenancy start and end dates, monthly rent amount, security deposit (typically 1–2 months), notice period for termination, and each party's responsibilities for repairs and utilities. A diplomatic clause is strongly recommended for expatriate tenants.",
  },
  {
    q: 'Is a tenancy agreement legally binding in Malaysia?',
    a: 'Yes. A signed tenancy agreement is legally binding in Malaysia under contract law. The agreement should be stamped with LHDN within 14 days of signing to be admissible as evidence in court. Unstamped agreements can still be enforced but attract late stamping penalties.',
  },
  {
    q: 'How much is stamp duty for a tenancy agreement in Malaysia?',
    a: 'Stamp duty is calculated on total rent: RM1 per RM250 of annual rent for leases of 1 year or less; 0.4% of average annual rent for leases of 1–3 years. Example: a 1-year lease at MYR 3,000/month = MYR 3,000 × 12 × 0.4% = MYR 144. Payable to LHDN within 14 days of signing — typically borne by the tenant.',
  },
  {
    q: 'What is the standard security deposit for a Malaysia tenancy?',
    a: "Standard security deposit is 1 month's rent for a 1-year tenancy and 2 months' rent for a 2-year tenancy. Refunded within 14–21 days after the tenancy ends, minus deductions for unpaid rent or damage beyond fair wear and tear.",
  },
  {
    q: 'What is a diplomatic clause in a Malaysia tenancy agreement?',
    a: "A diplomatic clause allows a tenant to terminate early if required to leave Malaysia permanently due to job transfer, repatriation, or redundancy. Typically activated after the first 12 months, with 2 months' written notice. Standard for expatriate tenants in Malaysia.",
  },
  {
    q: 'Can I use a tenancy agreement generator in Malaysia?',
    a: 'Yes. There is no legal requirement to use a lawyer or specific government template for residential tenancies. The Council for Estate Agencies (General) provides a reference template, but using a generator like Sewa2u ensures all clauses are correctly filled in for your property and parties.',
  },
  {
    q: 'What is the difference between a tenancy agreement and a lease in Malaysia?',
    a: '"Tenancy agreement" and "lease" are used interchangeably for residential properties. Technically a lease is for longer terms (3+ years) and conveys a property interest, while a tenancy is shorter-term. For residential rentals of 1–2 years, a tenancy agreement is standard.',
  },
  {
    q: 'How do I terminate a tenancy agreement in Malaysia?',
    a: "Give written notice per the notice period in the agreement (typically 1–2 months). Early termination without a diplomatic clause may result in forfeiture of deposit or liability for remaining rent. Document the property's condition at handover and agree on any deductions in writing.",
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
  headline: 'Tenancy Agreement Malaysia — Complete Guide 2026',
  description: 'Everything landlords and tenants in Malaysia need to know about tenancy agreements — stamp duty, deposits, property rules, diplomatic clause, and how to generate one online.',
  url: 'https://sewa2u.com/tenancy-agreement',
  publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
}

const STEPS = [
  { step: '1', title: 'Select property type', desc: 'Residential property, private condo/landed, or room rental — each has specific clauses.' },
  { step: '2', title: 'Enter property details', desc: 'Address, unit number, postal code, and handover condition.' },
  { step: '3', title: 'Fill in both parties', desc: 'Landlord and tenant names, NRIC/FIN/passport numbers, contact details.' },
  { step: '4', title: 'Set rental terms', desc: 'Start/end dates, monthly rent, security deposit, and payment details.' },
  { step: '5', title: 'Add custom clauses', desc: 'Diplomatic clause, aircon servicing, pet policy, minor repair threshold, and more.' },
  { step: '6', title: 'Preview & download', desc: 'Preview the full agreement. Download clean PDF from RM30.' },
]

export default function TenancyAgreementMalaysiaPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">Malaysia Tenancy Agreement</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Tenancy Agreement Malaysia PDF<br className="hidden sm:block" /> — Free Generator
          </h1>
          <p className="text-navy-500 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Create a legally structured tenancy agreement for any Malaysia residential property — residential propertys, private condos, or room rentals. Preview before purchase. Download a clean, print-ready <strong className="text-navy-700">PDF from RM30</strong>. No lawyer required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors text-base">
              Generate Agreement →
            </Link>
            <Link href="/tenancy-agreement-template" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-base">
              View Template Info
            </Link>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '🇸🇬', label: 'Malaysia-specific' },
              { icon: '👁️', label: 'Preview included' },
              { icon: '⚡', label: 'Under 5 minutes' },
              { icon: '📄', label: 'PDF from RM30' },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-xs font-semibold text-navy-700">{b.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-8">
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-brand-800 text-sm mb-1">Get your tenancy agreement as a clean PDF</p>
              <p className="text-brand-700 text-xs leading-relaxed">
                Fill in the form, preview the full tenancy agreement Malaysia PDF, then download a print-ready PDF from RM30. No sign-up required. Works on mobile and desktop.
              </p>
            </div>
            <Link href="/" className="flex-shrink-0 inline-block bg-brand-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-700 transition-colors">
              Generate PDF →
            </Link>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-6 text-center">How to Create a Malaysia Tenancy Agreement</h2>
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
          <h2 className="text-xl font-bold text-navy-800 mb-6">Malaysia Tenancy Agreement — Key Facts</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {[
              { label: 'Stamp duty', value: 'RM1 per RM250 of annual rent — paid to LHDN within 14 days' },
              { label: 'Security deposit', value: "1 month's rent (1-year lease) · 2 months' (2-year lease)" },
              { label: 'Standard notice', value: '1–2 months written notice' },
              { label: 'Diplomatic clause', value: 'Standard for expat tenants — allows early exit on repatriation' },
              { label: 'property subletting', value: 'Requires property approval + MOP completion (whole flat)' },
              { label: 'Minimum tenancy (residential)', value: '6 months for whole-flat subletting' },
              { label: 'Lawyer required?', value: 'No — for standard residential tenancies' },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 px-5 py-3 text-sm">
                <span className="font-semibold text-navy-700 w-48 shrink-0">{row.label}</span>
                <span className="text-navy-500">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-navy-800 mb-5 text-center">What Type of Property Are You Renting?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/tenancy-agreement" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-semibold text-navy-800 mb-1 group-hover:text-brand-600">Residential Flat</h3>
              <p className="text-sm text-navy-500">Whole flat or room — includes property subletting clauses and occupancy rules.</p>
              <p className="text-xs text-brand-600 font-medium mt-3">Residential Tenancy Guide →</p>
            </Link>
            <Link href="/" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-semibold text-navy-800 mb-1 group-hover:text-brand-600">Private Property</h3>
              <p className="text-sm text-navy-500">Condo, apartment, or landed — full private residential tenancy agreement.</p>
              <p className="text-xs text-brand-600 font-medium mt-3">Generate Now →</p>
            </Link>
            <Link href="/room-rental-agreement" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">🛏️</div>
              <h3 className="font-semibold text-navy-800 mb-1 group-hover:text-brand-600">Room Rental</h3>
              <p className="text-sm text-navy-500">Common room, master, or en-suite — includes house rules and shared facilities.</p>
              <p className="text-xs text-brand-600 font-medium mt-3">Room Rental Guide →</p>
            </Link>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-xl font-bold text-navy-800 mb-6">Tenancy Agreement Malaysia — FAQs</h2>
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
          <h2 className="text-lg font-bold text-navy-800 mb-4">More Malaysia Tenancy Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tenancy-agreement', label: 'Residential Tenancy Agreement Guide', desc: 'property-specific clauses, approval requirements, and occupancy rules.' },
              { href: '/room-rental-agreement', label: 'Room Rental Agreement Guide', desc: 'Room rentals, shared facilities, and residential room rules.' },
              { href: '/tenancy-agreement-template', label: 'Tenancy Agreement Template', desc: 'Why a generator beats a blank template.' },
              { href: '/tenancy-renewal', label: 'Tenancy Renewal Malaysia', desc: 'How to renew a tenancy agreement in Malaysia.' },
              { href: '/faq', label: 'Tenancy Agreement FAQ', desc: 'Stamp duty, deposits, diplomatic clause, and more.' },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-brand-300 transition-colors">
                <p className="font-semibold text-navy-800 text-sm">{l.label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{l.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Rental Agreement Malaysia section — targets "rental agreement Malaysia" keyword */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Rental Agreement Malaysia</h2>
          <p className="text-navy-600 mb-4 leading-relaxed">
            A <strong>rental agreement in Malaysia</strong> is the same as a tenancy agreement — the terms are used interchangeably. Whether you call it a rental agreement, lease agreement, or tenancy agreement, it is the legally binding contract between a landlord and tenant setting out the terms of occupation of a residential property.
          </p>
          <p className="text-navy-600 mb-4 leading-relaxed">
            In Malaysia, residential rental agreements are governed by the Contracts Act 1950. Key requirements include proper stamp duty payment to LHDN within 14 days of signing, a clear tenancy agreement outlining the rights and obligations of both parties, and compliance with any applicable strata or housing authority regulations for the specific property type.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { title: 'Residential Rental Agreement', desc: 'Covers whole flat and room rentals. Must comply with property subletting rules and citizen occupancy requirements.' },
              { title: 'Private Condo Rental Agreement', desc: 'More flexible than residential. No approval required. Typically includes air-con servicing, management fee, and maintenance clauses.' },
              { title: 'Landed Property Rental Agreement', desc: 'Covers detached, semi-detached, and terrace houses. Usually longer tenancies with higher deposits.' },
              { title: 'Room Rental Agreement', desc: 'For single room rentals within residential or private property. Shorter minimum periods and simpler terms.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-navy-800 text-sm mb-1">{item.title}</p>
                <p className="text-xs text-navy-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="bg-brand-600 rounded-2xl px-8 py-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Generate your tenancy agreement now</h2>
            <p className="text-blue-100 mb-6 text-sm">No account. No lawyer needed. Under 5 minutes.</p>
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
