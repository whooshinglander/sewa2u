import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Tenancy Renewal vs New Agreement — Which Do You Actually Need? | Sewa2u',
  description: "If you're keeping the same property and same tenant, you renew. If anything material changes, you might want a fresh new agreement. Here's how to tell.",
  keywords: 'tenancy renewal vs new agreement, renewal addendum Malaysia, lease renewal vs new lease, when to sign new tenancy',
  alternates: { canonical: 'https://sewa2u.com/tenancy-renewal-vs-new-agreement' },
  openGraph: {
    title: 'Tenancy Renewal vs New Agreement — Which Do You Need',
    description: 'Same property, same tenant = renewal. Material changes = fresh agreement. Here\'s the test.',
    url: 'https://sewa2u.com/tenancy-renewal-vs-new-agreement',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'When should I sign a renewal addendum vs a fresh new agreement?',
    a: "Use a renewal addendum if you're only changing the dates and rent. Use a fresh new agreement if you're changing anything material — security deposit amount, who pays utilities, adding or removing occupants, switching from furnished to unfurnished, dropping the diplomatic clause, changing the notice period. Most landlords skip the addendum and just issue a fresh agreement because the document trail is cleaner.",
  },
  {
    q: "If I sign a renewal, is the original tenancy 'still in force'?",
    a: "If you sign a renewal addendum, the original agreement is the base document and the addendum modifies the bits that changed. If you sign a fresh new tenancy for the same property and parties, the original is fully replaced from the new start date. Either way, the original is still important historically — it sets the precedent for things like deposit amount, condition of the unit, and any clauses that carry over.",
  },
  {
    q: 'Stamp duty — does it differ between renewal addendum and fresh agreement?',
    a: "No. Both are stampable documents. The rate is RM1 per RM250 of annual rent for 1-year leases, or 0.4% of average annual rent for 1–3 year leases. If you stamp a renewal addendum, LHDN stamps based on the rent and term in the addendum. If you stamp a fresh new tenancy, LHDN stamps based on the new tenancy's rent and term. Either way you pay the same.",
  },
  {
    q: "My existing agreement has a 'right to renew' clause. Do I still sign anything?",
    a: "Yes. A right-to-renew clause means the tenant can require you to renew at agreed terms — but the renewal itself is a separate signed and stamped document. The clause sets the terms; the renewal agreement implements them. Even with a right-to-renew clause, both sides sign a renewal addendum or fresh tenancy and stamp it within 14 days.",
  },
  {
    q: 'I want to change the rent significantly on renewal. Renewal or new?',
    a: "A rent change alone is fine in a renewal — the renewal exists precisely to capture rent updates. If the rent change is the only material change, a renewal addendum or fresh agreement both work. The fresh agreement gives you a cleaner one-document record going forward.",
  },
  {
    q: "I'm switching the unit's status from 'furnished' to 'unfurnished'. What now?",
    a: "That's a material change and the inventory list will be different. Strongly prefer a fresh new agreement so the inventory section is clean. A renewal addendum that says 'now unfurnished, see new schedule' works but is messier and a fresh tenancy is the safer call.",
  },
  {
    q: "If we already exceeded the original tenancy end date and I'm just continuing month-to-month, am I in renewal territory?",
    a: "You're in periodic-tenancy territory by default — month-to-month, terminable on short notice, and the original fixed-term protections have lapsed. Best practice is to immediately sign a backdated renewal (or fresh agreement) so you're back inside a fixed term. LHDN still wants stamp duty on the renewed term within 14 days of signing.",
  },
  {
    q: 'Can the renewal cover a different property?',
    a: "No. A renewal is for the same property. If you're moving to a different unit (same building or otherwise), that's a new tenancy by definition, not a renewal. The agreement should describe the new property and you start over with stamp duty, deposit, and property approval (if applicable) for the new address.",
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
  headline: 'Tenancy Renewal vs New Agreement — Which Do You Actually Need',
  description: 'Test for whether you sign a renewal addendum, a fresh new tenancy, or just let the original lapse to periodic.',
  url: 'https://sewa2u.com/tenancy-renewal-vs-new-agreement',
  publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
  datePublished: '2026-05-04',
  dateModified: '2026-05-04',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sewa2u.com/' },
    { '@type': 'ListItem', position: 2, name: 'Tenancy Renewal Malaysia', item: 'https://sewa2u.com/tenancy-renewal' },
    { '@type': 'ListItem', position: 3, name: 'Renewal vs New Agreement' },
  ],
}

export default function RenewalVsNewPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Tenancy Renewal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Renewal addendum, fresh new tenancy, or just let it lapse?
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            If you're keeping the same flat and the same tenant, you sign a renewal. The only real question is whether to bolt a short addendum onto the existing agreement, or write a fresh new tenancy from scratch. There's also the option of doing nothing — letting the original lapse and the tenancy continue month-to-month. Each path has consequences.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">The three paths</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Path 1 — Renewal addendum (lightest)</p>
              <p className="text-navy-600 text-sm leading-relaxed mb-2">
                A short document attached to the original tenancy. Says: same property, same parties, new dates, new rent (if changed). The original tenancy is the base; the addendum modifies it.
              </p>
              <p className="text-navy-500 text-xs"><strong>Use when:</strong> only the dates and rent change. Nothing else.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Path 2 — Fresh new tenancy (most common)</p>
              <p className="text-navy-600 text-sm leading-relaxed mb-2">
                A complete new tenancy agreement covering the renewal term. Replaces the original from the new start date. Your record-keeping is one clean document instead of two.
              </p>
              <p className="text-navy-500 text-xs"><strong>Use when:</strong> anything material changes — deposit, utilities split, occupants, furnishing status, special clauses. Or just by default for the cleaner paper trail.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Path 3 — Do nothing, let it go periodic (riskiest)</p>
              <p className="text-navy-600 text-sm leading-relaxed mb-2">
                The original tenancy expires. The tenant keeps paying rent, you keep accepting it. Malaysia law treats this as a periodic tenancy — month-to-month, terminable by either side with short notice (often as little as 1 month, sometimes less).
              </p>
              <p className="text-navy-500 text-xs"><strong>Use when:</strong> never, intentionally. The original fixed-term protections lapse, you can be terminated quickly, and any deposit dispute becomes ambiguous.</p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Quick test</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-navy-700 text-sm mb-4">Run through these. If you tick more than the dates-and-rent line, lean toward a fresh new tenancy.</p>
            <ul className="space-y-2 text-navy-600 text-sm">
              <li>☐ Only the start date, end date, and rent are changing</li>
              <li>☐ Security deposit amount changes</li>
              <li>☐ Furnishing status changes (going from furnished to unfurnished or vice versa)</li>
              <li>☐ Adding or removing tenants or occupants</li>
              <li>☐ Utilities arrangement changes</li>
              <li>☐ Diplomatic clause is being added or removed</li>
              <li>☐ Notice period is changing</li>
              <li>☐ Custom clauses (CCTV, pet policy, smoking) are being added or removed</li>
            </ul>
            <p className="text-navy-500 text-xs mt-4">If only the first ticks: addendum is fine. If two or more tick: fresh new tenancy.</p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate the right one</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Our renewal flow generates a fresh new tenancy by default — pre-filled from your previous agreement. Cleaner paperwork, LHDN-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM30
              </Link>
              <Link href="/" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                New tenancy (different property)
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">FAQ</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 group" open={i === 0}>
                <summary className="font-semibold text-navy-800 cursor-pointer text-sm group-open:mb-2">
                  {f.q}
                </summary>
                <p className="text-navy-500 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
