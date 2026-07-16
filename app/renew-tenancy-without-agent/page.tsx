import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Renew Your Malaysia Tenancy Without an Agent — Step by Step | Sewa2u',
  description: 'How to handle a Malaysia tenancy renewal yourself, no agent. The half-month commission stays in your pocket. Plain English walkthrough, what to watch for, when an agent is still worth it.',
  keywords: 'renew tenancy without agent Malaysia, diy tenancy renewal, no agent tenancy renewal, save commission tenancy renewal, self renewal tenancy Malaysia',
  alternates: { canonical: 'https://sewa2u.com/renew-tenancy-without-agent' },
  openGraph: {
    title: 'Renew Your Malaysia Tenancy Without an Agent — Step by Step',
    description: 'DIY tenancy renewal in Malaysia. Skip the half-month commission, follow the steps, stamp it yourself.',
    url: 'https://sewa2u.com/renew-tenancy-without-agent',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'When does DIY renewal make sense, and when should I just use an agent?',
    a: "DIY makes sense when the tenant is known-good, the relationship has been clean for a year or two, and you're mainly changing dates and rent. The renewal is paperwork at that point, not a negotiation. You should use an agent when there's a real dispute brewing (deposit deductions, condition of the unit, rent arrears), when the tenant is a foreigner with a complicated pass situation, when the parties don't speak the same language well, or when you and the tenant want fundamentally different terms and need a buffer between you. Anything emotional, pay for the buffer.",
  },
  {
    q: "What does an agent actually do on a renewal that I'd take over myself?",
    a: "On a typical renewal, the agent: drafts (or copies) the renewal letter or new tenancy, runs comparable rent checks on PropertyGuru and 99.co to justify the rate, ferries signatures between landlord and tenant, and reminds you to stamp at LHDN. That's roughly 3-5 hours of work spread over a couple of weeks. For a half-month commission of $1,500-$2,500 on a typical $3,000-$5,000/month flat, the hourly rate is high. The trade-off is convenience, not legal protection. The agent isn't your lawyer.",
  },
  {
    q: 'Can my tenant insist that I use a property agent for the renewal?',
    a: "No. There's no rule in Malaysia requiring either party to use a registered agent for their own tenancy. If your tenant prefers to deal through their agent, that's their choice and their cost — they pay their agent. You're not obligated to engage one on your side, and you're not obligated to pay theirs. If the tenant refuses to deal directly, that's information about the tenant. Decide whether the renewal is still worth it.",
  },
  {
    q: "Are there General rules against me handling my own renewal as a layperson?",
    a: "No. General (Council for Estate Agencies) regulates licensed property agents and agencies. Acting as a principal in your own property transaction — your own flat, your own tenancy — is not a regulated activity. You can negotiate, draft, sign, and stamp your own renewal. What you can't do is act as an agent for someone else's property without a General licence. Renewing your own tenancy is fine.",
  },
  {
    q: "What if there's a dispute mid-renewal and I have no agent to mediate?",
    a: "Most renewal disputes are about rent (you want more, tenant wants less) or deposit top-ups. Your recourse is the same with or without an agent: negotiate, walk away, or escalate. If you can't agree on terms, the tenancy ends on the original expiry date and the tenant moves out. For deposit disputes after the fact, the Small Claims Tribunal handles claims up to $20,000 and is designed for non-lawyers. Filing fee is roughly RM25-$20 depending on amount. No agent ever resolves a real dispute for you anyway, they just pass messages.",
  },
  {
    q: 'How do I check market rent without an agent feeding me comps?',
    a: "PropertyGuru and 99.co both let you filter rental listings by district, property type, and bedroom count. Look at units in your block or the next few blocks, listed in the past 30-60 days, similar size and condition. LHDN's rental contract data on data.gov.sg shows actually-transacted rents (not asking rents) by postal sector — more accurate than listings. For residential, the residential rental transactions page publishes monthly medians by town and flat type. Cross-check three sources, your number won't be far off.",
  },
  {
    q: "Common DIY renewal mistakes — what should I watch for?",
    a: "The frequent ones: forgetting to stamp within 14 days of signing (LHDN charges a penalty); using a renewal addendum when you've actually changed multiple terms (issue a fresh tenancy instead); not checking the tenant's pass expiry against the new end date; recycling the original tenancy verbatim without updating the diplomatic clause or deposit clause; and skipping a quick inventory walk-through before signing — wear-and-tear arguments at end-of-term get expensive without one.",
  },
  {
    q: "How much do I actually save going DIY?",
    a: "On a renewal, the typical agent commission in Malaysia is half a month's rent plus GST. For a $3,000/month flat, that's ~$1,635 including GST. For a $5,000/month flat, ~$2,725. New tenancies are usually a full month commission (so a new tenant via an agent costs you $3,000-$5,000+). The renewal saving is real but smaller than people assume — the bigger saving comes from not having to find a new tenant at all.",
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
  headline: 'Renew Your Malaysia Tenancy Without an Agent — Step by Step',
  description: 'A practical walkthrough for Malaysia landlords renewing a tenancy without a property agent. Steps, market comp, stamping, and when to bring an agent in anyway.',
  url: 'https://sewa2u.com/renew-tenancy-without-agent',
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
    { '@type': 'ListItem', position: 3, name: 'Renew Tenancy Without an Agent' },
  ],
}

export default function RenewWithoutAgentPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            DIY Renewal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Renew Your Malaysia Tenancy Without an Agent
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Renewing with a tenant you already know is the easiest case for going DIY. The relationship is settled, the unit condition is documented, the agreement is mostly a copy of the previous one with new dates and rent. The half-month commission, typically $1,500-$2,500, stays in your pocket.
          </p>
          <p className="text-navy-500 text-sm">
            For the broader rules around renewals (notice, stamp duty, deposits), see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">tenancy renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">The 7 steps, in order</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">1. Decide on terms before you talk to the tenant</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Pull comparable rents on PropertyGuru and 99.co for similar units in your block or district, listed in the last 30-60 days. Cross-check against LHDN's contracted rental data on data.gov.sg (actual transactions, not asking rents). Decide three numbers: the rent you want, the rent you'll accept, and your walk-away. Decide tenancy length (1 year vs 2), and whether anything else changes (deposit, occupants, diplomatic clause). Going in with numbers in hand is the agent's only real advantage — take it back.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">2. Notify the tenant 60 days before expiry</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                A short message is fine. State the new rent, the new term length, and ask for a yes/no by a date 30 days out. Don't bury terms in small talk. If the tenant counters, negotiate plainly. Most renewal conversations resolve in 1-2 exchanges if both sides are reasonable. See the <Link href="/tenancy-renewal-notice-period" className="text-brand-700 hover:underline">notice period page</Link> if you're unsure on timing.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">3. If residential: check your subletting approval window</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                residential grants approval for up to 3 years. If your renewal extends past the approved end date, re-apply on the residential portal before the new tenancy starts. Inside the window, no re-application needed but update residential with the new dates. Skip this if you're on private property. See the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">property renewal page</Link>.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">4. Generate the renewal agreement</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                You can adapt the original tenancy yourself or use a template. <Link href="/renew" className="text-brand-700 hover:underline">Our renewal flow</Link> pre-fills a fresh agreement from the previous one — new dates, new rent, deposit clause and diplomatic clause refreshed. A fresh new tenancy is cleaner than a renewal addendum once you change more than just the dates and rent. One stamped document covering the new term, no need to keep referring back to the original.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">5. Both parties sign</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Two physical copies, each side keeps one. Or sign a single PDF electronically — Malaysia's Electronic Transactions Act recognises e-signatures for tenancies. Make sure all named parties sign (joint tenants, both spouses if both are on the original). A witness signature is good practice but not strictly required for a residential tenancy.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">6. Stamp via LHDN within 14 days</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Log in to <a href="https://mytax.hasil.gov.my" target="_blank" rel="noopener" className="text-brand-700 hover:underline">myTax (LHDN)</a> with MyKad/MyPR. Under e-Stamping, choose Lease/Tenancy Agreement, enter the dates, the monthly rent, and pay RM1 per RM250 of annual rent (1-year lease) or 0.4% of average annual rent (1-3 year lease). The certificate downloads as a PDF, attach it to the signed tenancy. Tenant typically pays unless your agreement says otherwise. See the <Link href="/stamp-duty-tenancy-renewal" className="text-brand-700 hover:underline">stamp duty page</Link> for worked examples.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">7. Update the bank if rent is paid via GIRO</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                If the tenant pays rent through a standing GIRO instruction and the rent amount is changing, the tenant needs to update their GIRO mandate at their bank with the new amount and end date. Some banks accept the new tenancy as supporting documentation. If rent is paid by GrabPay each month, no bank step needed — the tenant just changes the transfer amount.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">When you should use an agent anyway</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            DIY isn't always the right call. Bring an agent in when any of these are true:
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Active dispute mid-term.</strong> Unpaid rent, damage claims, or behaviour complaints already in motion. An agent (or a lawyer, depending on severity) gives you a buffer and creates a paper trail. Doing this yourself while emotional is how landlords lose deposit cases at the Small Claims Tribunal.</li>
              <li><strong className="text-navy-800">Foreign tenant with a complicated pass.</strong> Pass renewals pending, employer change in motion, family pass dependents, dependents' visas tied to the tenancy. The paperwork has more moving parts and an agent who does this regularly will catch the gaps.</li>
              <li><strong className="text-navy-800">Conflicting parties or bad communication.</strong> Co-owners who disagree on terms, tenants who won't reply directly, language barriers that turn every email into 4 emails. Pay the half-month, save the relationship.</li>
              <li><strong className="text-navy-800">You don't have time.</strong> A renewal done badly costs more than the agent fee. If you're travelling, mid-house-move, or otherwise distracted, it's reasonable to outsource.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">What you save (real numbers)</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Renewal commission in Malaysia is conventionally half a month's rent plus GST, paid by the landlord (or the party that engaged the agent). Worked examples:
          </p>
          <ul className="space-y-2 text-navy-600 text-sm mb-4 pl-5 list-disc">
            <li>$2,500/month flat: half-month + 9% GST = ~$1,363 saved</li>
            <li>$3,500/month flat: ~$1,908 saved</li>
            <li>$5,000/month flat: ~$2,725 saved</li>
            <li>$7,000/month condo: ~$3,815 saved</li>
          </ul>
          <p className="text-navy-600 text-sm leading-relaxed">
            For 3-5 hours of work over a couple of weeks, the implied hourly rate of DIY is high. The numbers are even better if the agent would have charged you a full month (some do, particularly for new tenancies presented as renewals on different terms).
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate your renewal agreement</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Renewal-ready tenancy, pre-filled from your previous one. Updated dates, new rent, ready for LHDN stamping. Preview before purchase, RM30 to download.
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
