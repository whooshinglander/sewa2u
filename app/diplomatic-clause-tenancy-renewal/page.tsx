import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Diplomatic Clause in Malaysia Tenancy Renewals — Keep, Drop, or Modify | Sewa2u',
  description: 'What the diplomatic clause actually says, who qualifies (EP/S Pass/WP), the standard 12+2 structure, and how to think about it on renewal. Plain English for landlords and tenants.',
  keywords: 'diplomatic clause Malaysia, diplomatic clause tenancy renewal, early termination tenancy expat Malaysia, 12 month diplomatic clause, diplomatic clause expat tenant',
  alternates: { canonical: 'https://sewa2u.com/diplomatic-clause-tenancy-renewal' },
  openGraph: {
    title: 'Diplomatic Clause in Malaysia Tenancy Renewals — Keep, Drop, or Modify',
    description: 'How the diplomatic clause works in Malaysia tenancies, who qualifies, and what to do with it on renewal.',
    url: 'https://sewa2u.com/diplomatic-clause-tenancy-renewal',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'What is a diplomatic clause in a Malaysia tenancy?',
    a: "It's an early termination clause that lets a foreign tenant break the lease without paying out the remaining rent if their work pass is cancelled or not renewed, or if their employer transfers them out of Malaysia. The standard structure activates after 12 months of the tenancy, with 2 months of written notice plus proof from the employer. Outside that scenario, the tenant is still bound by the full term.",
  },
  {
    q: 'Who qualifies for a diplomatic clause?',
    a: "Foreign tenants whose right to live in Malaysia depends on a work pass — Employment Pass (EP), S Pass, or Work Permit holders, plus their dependents on a DP. The logic of the clause is that they can be forced to leave Malaysia through no fault of their own (retrenchment, transfer, pass not renewed by MOM). Malaysiaans, PRs, and Long-Term Visit Pass holders generally don't qualify because they don't face that risk.",
  },
  {
    q: 'Why is it always "12 months minimum + 2 months notice"?',
    a: "It's market convention, not law. Twelve months protects the landlord's vacancy and re-letting costs for the first year, which is when most agent commissions and fit-out costs get amortised. Two months of notice gives the landlord enough runway to find a replacement tenant. Some leases extend it to 14+2 or 12+3 — both are negotiable, especially if the rent is below market or the unit is in a slower-letting area.",
  },
  {
    q: 'Can a Malaysiaan tenant ask for a diplomatic clause?',
    a: "They can ask, but the basis is weak. The whole point of the clause is to protect against forced departure tied to a work pass. A Malaysiaan isn't going to lose their right to be in the country. If a Malaysiaan tenant wants similar flexibility, what they're really asking for is an early termination clause — different name, different negotiation, usually requires the tenant to pay a penalty (1-2 months rent) or cover the agent's re-letting fee. Calling it a diplomatic clause when the tenant is local is just confusing.",
  },
  {
    q: 'Is a diplomatic clause required by law?',
    a: "No. Malaysia has no statute requiring diplomatic clauses in residential leases. It's purely a contractual term that became standard for expat tenancies because the market expects it. A landlord can refuse to include one, and a tenant can refuse to sign without one. Whoever has more leverage wins that negotiation. In a soft rental market, tenants get it. In a hot market, landlords push back.",
  },
  {
    q: 'What proof does a tenant need to invoke the diplomatic clause?',
    a: "Usually a termination letter from the employer, a transfer letter, or a copy of the cancelled work pass / IPA rejection. Some leases also accept a notice of non-renewal from MOM. The clause should specify what counts as acceptable proof, and the tenant has to give written notice with that documentation attached. Without proper proof, the landlord can refuse to release them and treat it as a normal early termination (forfeit deposit, claim rent for unfilled period).",
  },
  {
    q: 'Can the landlord charge higher rent in exchange for keeping the diplomatic clause on renewal?',
    a: "Yes, and this is fairly common. A diplomatic clause is real downside risk for the landlord — they can lose 6-8 months of rent if the tenant invokes it after month 12. To price that in, some landlords add $50-200/month to the renewal rent if the clause stays, or offer a discount of similar size if the tenant agrees to drop it. There's no rule about how much, just whatever the two parties accept.",
  },
  {
    q: 'How does the diplomatic clause interact with the standard 2-month notice period?',
    a: "The 2-month notice in a diplomatic clause is the diplomatic clause's own notice — it only triggers if the qualifying event has happened (pass cancelled, transfer, etc.). It is not the same as the regular end-of-lease notice (also commonly 2 months) for not renewing. They run on separate logic. A tenant invoking the diplomatic clause at, say, month 14 gives 2 months notice and walks at month 16 with deposit returned. A tenant who just wants to leave without a qualifying event has no right to invoke the clause and is bound by the full term.",
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
  headline: 'Diplomatic Clause in Malaysia Tenancy Renewals — Keep, Drop, or Modify',
  description: 'How the diplomatic clause works in Malaysia residential tenancies, who qualifies, and how to handle it on renewal.',
  url: 'https://sewa2u.com/diplomatic-clause-tenancy-renewal',
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
    { '@type': 'ListItem', position: 3, name: 'Diplomatic Clause' },
  ],
}

export default function DiplomaticClauseRenewalPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Diplomatic Clause
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Diplomatic Clause on Renewal — Keep It, Drop It, or Charge for It
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            The diplomatic clause is the early-termination escape hatch that lets a foreign tenant break a Malaysia lease if their work pass is cancelled or they're transferred out. It's standard in expat tenancies, but it's not free for the landlord. On renewal, it's worth deciding whether it stays in, comes out, or stays in at a higher rent.
          </p>
          <p className="text-navy-500 text-sm">
            For the broader renewal walkthrough, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">general renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">What it actually says</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Wording varies, but a typical diplomatic clause in a Malaysia tenancy reads something like:
          </p>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
            <p className="text-navy-700 text-sm leading-relaxed italic">
              "Provided that the Tenant has occupied the Premises for a continuous period of not less than twelve (12) months from the commencement date, and the Tenant or his/her spouse is required by their employer to leave Malaysia, or the Tenant's Employment Pass / S Pass / Work Permit is not renewed or is cancelled by the Ministry of Manpower for reasons not attributable to the Tenant, the Tenant may terminate this tenancy by giving the Landlord not less than two (2) months written notice in advance, supported by documentary proof. The security deposit shall be refunded in full less any deductions for damage or unpaid rent."
            </p>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            In plain English: after 12 months, if you lose your work pass or get transferred out through no fault of your own, you can give 2 months notice with proof and walk away with your deposit. Outside that scenario, the lease runs its full term.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Who qualifies</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The diplomatic clause exists because foreign workers can be forced out of Malaysia by something outside their control. It's tied to immigration status, not nationality.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Employment Pass (EP) holders.</strong> The most common case. EP renewal is at MOM's discretion, and a non-renewal would force the holder to leave within 30 days.</li>
              <li><strong className="text-navy-800">S Pass holders.</strong> Same logic as EP. Pass tied to a specific employer; cancellation means the right to stay ends.</li>
              <li><strong className="text-navy-800">Work Permit (WP) holders.</strong> Less common as residential tenants, but the clause applies the same way if the WP is cancelled.</li>
              <li><strong className="text-navy-800">Dependent Pass (DP) holders.</strong> If the spouse on the main pass loses theirs, the DP gets cancelled too. A trailing spouse can invoke the clause based on the main holder's situation.</li>
              <li><strong className="text-navy-800">Malaysiaans and PRs.</strong> Don't qualify. They can't be forced out of Malaysia, so the underlying rationale doesn't apply. If they want flexibility, that's an early termination clause, not a diplomatic clause.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">On renewal — keep, drop, or modify?</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The renewal is the natural moment to revisit the clause. By month 12, you have data you didn't have at signing — the tenant's job stability, how long they've been with the employer, whether they're showing signs of long-term roots in Malaysia.
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Keep it as-is</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Default for most expat tenancies. If the tenant is on EP and only 12-18 months into a new job, the risk profile hasn't really changed. Carrying the same clause forward is the path of least resistance and keeps the tenant happy.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Drop it</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Reasonable when the tenant has clearly settled — multi-year stay, kids in local school, applying for PR. Some tenants drop it voluntarily to negotiate a better rent, since they no longer feel they need the escape hatch. From the landlord's view, dropping the clause removes a real risk and is worth a small rent concession.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Modify it</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Common middle path. Examples: extend the activation point from 12 months to 14 or 18 months on the renewal term, lengthen notice from 2 months to 3, or carve out resignation (so it only triggers on involuntary departures, not the tenant choosing to leave). Each tweak shifts risk back to the tenant.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Keep it but reprice</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Add $50-200/month to the renewal rent in exchange for the clause staying. This is honest pricing of the risk, and most tenants understand it once it's framed plainly. Document the rent split clearly so the tenant knows the trade-off they're agreeing to.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">What it costs the landlord</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            A live diplomatic clause is a real financial risk that doesn't show up until it's invoked. Run the numbers on a typical case:
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <p className="text-navy-700 text-sm font-semibold mb-3">Worked example — $4,500/month condo, 2-year renewal</p>
            <ul className="space-y-2 text-navy-600 text-sm">
              <li>Tenant invokes diplomatic clause at month 14 (2 months into renewal)</li>
              <li>Lease ends at month 16 instead of running to month 24 → 8 months of rent lost from this lease</li>
              <li>Re-letting cost: half-month agent commission ($2,250) plus 3 weeks vacancy ($3,375) = $5,625</li>
              <li>Replacement rent may be lower if market softened → potential additional $200-500/month gap</li>
              <li>Total downside in a bad scenario: easily $8,000-12,000</li>
            </ul>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            That's why the $50-200/month rent uplift for keeping the clause active isn't arbitrary. At $100/month over 24 months, that's $2,400 of extra rent priced in against a low-probability but high-cost event. It's insurance pricing, basically.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed">
            For tenants, the calculation is the opposite — the clause is worth more than the rent uplift if there's any meaningful chance of a transfer or pass non-renewal. Most expats keep paying for it through year 2 and 3 of their stay.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate your renewal with the right clause</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Renewal flow includes diplomatic clause options — keep, drop, modify, or reprice. Pre-filled from your previous tenancy, ready for LHDN stamping. Preview before purchase, RM30 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM30
              </Link>
              <Link href="/foreign-tenant-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Foreign tenant renewal guide
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-link to sanyathai */}
        <section className="max-w-3xl mx-auto px-4 pb-4">
          <div className="border-t border-slate-200 pt-6">
            <p className="text-xs text-navy-400 leading-relaxed">
              Renting in Thailand? See{' '}
              <Link href="https://sanyathai.com/diplomatic-clause-thailand" className="text-brand-600 hover:text-brand-700 underline">
                diplomatic clause in Thailand leases
              </Link>
              {' '}— early exit rights for expats under Thai law.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Frequently asked questions</h2>
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
