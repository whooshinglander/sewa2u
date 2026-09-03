import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Renew or Find a New Tenant? The Malaysia Landlord Math | Sewa2u',
  description: "Vacancy weeks, agent commission, condition risk. The dollar math behind renewing vs finding a new tenant in Malaysia, with residential and condo worked examples.",
  keywords: 'landlord renew or find new tenant, tenant retention vs new tenant Malaysia, vacancy cost rental Malaysia, landlord renewal economics',
  alternates: { canonical: 'https://sewa2u.com/landlord-renewal-vs-find-new-tenant' },
  openGraph: {
    title: 'Renew or Find a New Tenant? The Malaysia Landlord Math',
    description: 'The dollar math behind renewing vs finding a new tenant. residential and condo worked examples.',
    url: 'https://sewa2u.com/landlord-renewal-vs-find-new-tenant',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'How long does it actually take to find a new tenant in Malaysia?',
    a: "Two to four weeks is the realistic range for a properly priced unit in a normal market. residential propertys in mature estates and condos near MRT stations sit at the shorter end. Older walk-ups, units with awkward layouts, or anything priced 5%+ above the LHDN SRX median tend to drag past a month. Budget 3 weeks of vacancy as the planning baseline. If your unit is luxury (above $8,000/month) or in a slow segment, plan for 6 to 8 weeks.",
  },
  {
    q: 'What does the agent commission split look like for new vs renewal?',
    a: "Industry norm: full one-month commission split between landlord agent and tenant agent for a new tenancy (so the landlord typically pays half a month if there are co-broke agents on both sides, or one full month if a single agent represents both ends). For a renewal, the convention is half a month, paid by the landlord. Some agents waive the renewal commission entirely if the original deal was theirs and the tenant didn't move. Always confirm in writing before the renewal is signed.",
  },
  {
    q: "What rent increase do I need to break even on switching tenants?",
    a: "Take your vacancy cost plus commission, divide by 12. For a RM3,000 residential with 3 weeks vacancy (RM2,250) plus half-month commission (RM1,500), that's RM3,750 total, or RM312/month. So the new tenant has to pay RM312 more per month just to match what you'd earn renewing the existing tenant at the same rent. That's a 10.4% rent increase, before accounting for risk. If the market rent has moved up by less than that, renewal wins on math alone.",
  },
  {
    q: "IMM (Immigration) implications when changing tenants",
    a: "If your current tenant is a foreign worker, you have no IMM filing duty as the landlord. The tenant's employer handles work pass administration. What does change: you should refresh the new tenant's pass details (EP/S Pass/WP number, expiry) in the new tenancy, and re-check the FIN expiry against the lease end date. If you rent to a non-pass-holder foreigner illegally, IMM penalties fall on you. Verify pass validity at every change of tenant, not just at the start of the original lease.",
  },
  {
    q: "Deposit dispute risk: is a new tenant riskier?",
    a: "Yes, mildly. With a returning tenant you already know how they treat the unit and you've handled their handover behaviour once. A new tenant is unknown — you'll discover their cleaning standards, willingness to fix small damage, and dispute style only at the end of their lease. The Small Claims Tribunal sees more new-tenant deposit disputes than renewal-tenant disputes simply because new tenancies are where the unfamiliarity sits. Not a reason to refuse new tenants, but factor a small risk premium into the math.",
  },
  {
    q: "If the current tenant has trashed the unit, is finding new still worth it at lower rent?",
    a: "Sometimes yes. If the unit's condition has deteriorated badly and the tenant won't fund repairs from their deposit (or the damage exceeds the deposit), keeping them at the same rent locks in further wear. Letting them out, repainting, fixing fittings, and re-letting at even 5% lower can be net positive over a 2-year horizon because you reset the baseline condition. Run the numbers: cost of refurb + vacancy + commission vs. expected continued damage from the same tenant. If refurb cost recovers in 18 months of clean tenancy, switch.",
  },
  {
    q: "Tax implications of vacancy in Malaysia",
    a: "Rental income is taxed only when received, so vacancy weeks pay no income tax. But LHDN still assesses property tax based on Annual Value (AV) regardless of whether the unit is rented. AV is set by LHDN and doesn't drop because your unit is empty for a few weeks. So vacancy means lost rent without any tax shield. Mortgage interest, maintenance, and property tax during the vacant period remain deductible against rental income for the year, but only up to the rental income earned. Long vacancies erode the deductibility cap.",
  },
  {
    q: "When does the current tenant deserve a discount on renewal?",
    a: "Long tenure (3+ years), perfect payment history, no complaints from neighbours, and they handle small fixes themselves. That tenant is worth 5 to 10% below market rate to keep, because the alternative is vacancy plus commission plus the unknown risk of someone worse. The math: a RM3,000/mo residential tenant who's been there 4 years with zero hassle is probably worth holding at RM2,800 rather than chasing RM3,200 with a new face. Good tenants are an asset. Price them accordingly.",
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
  headline: 'Renew or Find a New Tenant? The Malaysia Landlord Math',
  description: 'The dollar math behind renewing vs finding a new tenant in Malaysia. Vacancy cost, agent commission split, deposit risk, condition reset, tax implications.',
  url: 'https://sewa2u.com/landlord-renewal-vs-find-new-tenant',
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
    { '@type': 'ListItem', position: 3, name: 'Renew vs Find New' },
  ],
}

export default function RenewVsFindNewPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Landlord Economics
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Renew or Find a New Tenant? The Math Usually Favours Renewal
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Every Malaysia landlord runs this calculation at the end of a lease. The temptation is to chase a higher rent with a fresh tenant. The reality is that the cost of getting there, in vacancy weeks and agent commission, eats most of the gain. Here's the math, with residential and condo worked examples.
          </p>
          <p className="text-navy-500 text-sm">
            For the renewal paperwork itself, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">general renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">The vacancy + commission cost</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Two real costs hit the moment your existing tenant moves out: weeks of zero rent while the unit sits empty, and a commission cheque to the agent who finds the replacement. Malaysia norms: 2 to 4 weeks vacancy, full-month commission for a new tenancy (typically split between landlord and tenant agents, so the landlord pays half a month if there's a co-broke setup), versus half a month commission for a renewal.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-navy-800">
                <tr>
                  <th className="text-left p-4 font-semibold">Scenario</th>
                  <th className="text-left p-4 font-semibold">residential (RM3,000/mo)</th>
                  <th className="text-left p-4 font-semibold">Condo (RM5,000/mo)</th>
                </tr>
              </thead>
              <tbody className="text-navy-600">
                <tr className="border-t border-slate-200">
                  <td className="p-4">3 weeks vacancy</td>
                  <td className="p-4">RM2,250</td>
                  <td className="p-4">RM3,750</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">Half-month new-tenant commission (landlord side)</td>
                  <td className="p-4">RM1,500</td>
                  <td className="p-4">RM2,500</td>
                </tr>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-navy-800">Total switching cost</td>
                  <td className="p-4 font-semibold text-navy-800">RM3,750</td>
                  <td className="p-4 font-semibold text-navy-800">RM6,250</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">As % of annual rent</td>
                  <td className="p-4">10.4%</td>
                  <td className="p-4">10.4%</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">Renewal commission (half month)</td>
                  <td className="p-4">RM1,500</td>
                  <td className="p-4">RM2,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            That 10.4% is the breakeven hurdle. The new tenant has to pay 10%+ more rent than your current one, every month for the full term, just for you to walk away even. And that ignores risk — the new tenant is unknown, the old one is a known quantity.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">When finding a new tenant wins</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Two situations actually justify the switching cost.
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Market rent has moved up materially</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                If comparable units in your block or condo are now letting at 12 to 15% above your current rent, and your tenant won't accept the increase on renewal, switching is rational. Check the LHDN SRX rental index for your district plus actual recent transactions on PropertyGuru. Don't rely on agent estimates alone, they're optimistic by trade. The increase has to clear 10.4% on the math and another 2 to 3% as a risk premium on the unknown new tenant. Call it a 13% threshold.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Current tenant has been bad</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Late payments, complaints from neighbours, damage you've had to chase. If you're already managing a problem tenant, the cost of switching is partially offset by the cost of continuing to manage them. A bad tenant at $3,000 is worse than vacancy followed by an unknown tenant at $3,000. Cut and reset.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">When renewal wins (most cases)</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            If your tenant pays on time, doesn't complain, and treats the unit reasonably, renewing at flat rent or even a small concession is usually the highest-return move. The math:
          </p>
          <ul className="space-y-2 text-navy-600 text-sm mb-4 pl-5 list-disc">
            <li>Renewal commission of half a month: RM1,500 on a RM3,000 residential, RM2,500 on a RM5,000 condo.</li>
            <li>Zero vacancy weeks. The tenant signs the renewal and stays.</li>
            <li>No marketing cost, no viewings to coordinate, no LOI back-and-forth.</li>
            <li>Known quantity. You already know how they treat the unit at handover.</li>
          </ul>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Compare to switching: RM3,750 cost on the residential, RM6,250 on the condo, plus risk. Renewal saves RM2,250 to RM3,750 even if the rent stays exactly flat. If you can negotiate a small increase (say 3 to 5%) the renewal is the obvious winner.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed">
            Reality check: most landlords overestimate the rent they'll get from a new tenant and underestimate how long the unit will sit empty. The two errors compound. A "$300 more per month" pitch from your agent often turns into 6 weeks vacancy and a tenant at the same rent you would have got from your current one.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Edge case: the trashed unit</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Different scenario. The current tenant has let condition slide. Walls scuffed, fittings damaged, kitchen needs deep cleaning, and they've refused to pay for repairs (or the cost exceeds the deposit). Renewing them locks in further deterioration over the next 12 to 24 months. Letting them out, refurbishing, and finding new can be net positive even at lower rent.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Run the numbers concretely. Say refurb costs RM4,000 (paint, minor repairs, professional clean). Vacancy adds another RM2,250. Commission RM1,500. Total switch + reset cost: RM7,750 on the residential. If you re-let at RM2,850 (5% below current), you lose RM150/month. But you've reset the baseline, removed a problematic tenant, and the next tenant inherits a clean unit with a clear inventory list. Over 24 months, the lost rent is RM3,600, well under the avoided continued-damage cost from keeping the bad tenant.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed">
            Caveat: only if the current tenant won't fund the repairs. If they will, renew, deduct from deposit, and move on with cleaner expectations written into the new tenancy.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Ready to renew?</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Renewal-ready tenancy agreement, pre-filled from your previous lease. Updated dates, new rent, ready for LHDN stamping. Preview before purchase, RM30 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM30
              </Link>
              <Link href="/stamp-duty-tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Stamp duty calculator
              </Link>
            </div>
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
