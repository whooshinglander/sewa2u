import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Tenancy Renewal Notice Period in Malaysia — How Much Notice You Actually Need | Sewa2u',
  description: 'How much notice landlords and tenants need to give for tenancy renewal in Malaysia. The 2-month norm, what your contract says, what happens if no one gives notice.',
  keywords: 'tenancy renewal notice period Malaysia, how much notice to renew tenancy, landlord notice tenancy renewal, tenant notice not to renew, tenancy notice period Malaysia',
  alternates: { canonical: 'https://sewa2u.com/tenancy-renewal-notice-period' },
  openGraph: {
    title: 'Tenancy Renewal Notice Period in Malaysia — How Much Notice You Actually Need',
    description: 'Notice period rules for tenancy renewal: 2-month norm, contract trumps everything, what happens if no notice is given.',
    url: 'https://sewa2u.com/tenancy-renewal-notice-period',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'How much notice does my contract actually require?',
    a: "Read your tenancy first, before anything else. The notice period for renewal (or non-renewal) is whatever your existing agreement says it is, and that overrides any general norm. Look for clauses titled 'Renewal', 'Option to Renew', 'Notice', or 'Termination'. Most Malaysia tenancies say 2 months written notice before the expiry date, but some are 1 month and some are 3 months. If your contract is silent on notice, the 2-month convention is the practical default, but the absence of a clause weakens your position if there's a dispute.",
  },
  {
    q: 'What is the typical Malaysia norm for renewal notice?',
    a: "2 months written notice before the existing tenancy expires. This applies in both directions — landlord telling tenant they want to renew (and at what rent), and tenant telling landlord whether they intend to stay. The 2-month window gives both sides enough time to negotiate the new rent, agree on terms, sign the new agreement, and stamp it with LHDN within the 14-day window. Anything shorter than 2 months tends to leave one side scrambling.",
  },
  {
    q: 'Is there a statutory minimum notice period in Malaysia?',
    a: "No. Residential tenancy in Malaysia is contract-driven. There's no Tenancy Reform Act or rent control statute that imposes a minimum notice period, the way some jurisdictions do. The UK and parts of Australia have statutory minimums for residential tenancies, Malaysia does not. What you and your counterparty signed is what governs. The Conveyancing and Law of Property Act covers some aspects of leases, but it doesn't override your contract on notice.",
  },
  {
    q: 'Can a tenant give shorter notice on renewal than they did at the start?',
    a: "Usually the same notice period applies, since the renewal carries forward the original terms unless you change them. If your original tenancy required 2 months notice for non-renewal, the renewal will too, unless you negotiate a different clause into the new agreement. If you want a shorter notice period in the renewal (say 1 month, for flexibility), raise it during renewal negotiation and write it into the new tenancy explicitly. Don't assume it carries over from a verbal conversation.",
  },
  {
    q: "What if the landlord gives no notice and the tenant just stays past expiry?",
    a: "This creates an implied periodic tenancy, usually month-to-month, on the same terms as the expired agreement except for the duration. The tenant continues paying rent, the landlord continues accepting it, and either side can terminate by giving notice equal to the rental period (so 1 month for monthly rent). It's legal but messy. The original agreement's protections — diplomatic clause, fixed rent, deposit handling — all carry over by implication, but you have no signed document to point to if there's a dispute.",
  },
  {
    q: 'What if neither side gives notice at all?',
    a: "Default is a month-to-month rolling arrangement on the original terms. The tenant pays, the landlord accepts, and the tenancy continues by conduct. The risk is that everything is implied. If the landlord later wants to raise rent, sell the unit, or move back in, they can give 1 month notice and end it, and the tenant has limited grounds to push back. From a tenant's view, you also lose the security of a fixed term. From a landlord's view, your insurance and tax positions might shift if the unit is technically not under a registered lease. Sign something.",
  },
  {
    q: 'Can renewal notice be given by email, or does it need to be registered mail?',
    a: "Email is fine in 2026. Most tenancies say 'written notice', and email satisfies that, since it's written and creates a paper trail. What matters is proof of delivery — send to the email address listed in the tenancy as the contact, keep the sent copy, and ideally get a reply acknowledging receipt. If your contract specifically says 'by registered post' or 'by hand', follow that to the letter. Some older agreements still require physical delivery, and you don't want to argue this in court.",
  },
  {
    q: 'What if the tenant gives notice but then changes their mind?',
    a: "Once notice is given and accepted, the tenancy is set to end on the notice date. The landlord may have already started looking for a new tenant, scheduled viewings, or accepted another offer. The tenant can ask to retract the notice, but the landlord isn't obligated to agree. If both sides agree to retract and renew instead, do it in writing — a short addendum signed by both, or a fresh renewal agreement. Don't rely on a WhatsApp 'ok lah' to reverse a formal notice.",
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
  headline: 'Tenancy Renewal Notice Period in Malaysia — How Much Notice You Actually Need',
  description: 'Notice period rules for tenancy renewal in Malaysia: contract first, 2-month norm, what happens if no notice is given, holdover, deposit risk.',
  url: 'https://sewa2u.com/tenancy-renewal-notice-period',
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
    { '@type': 'ListItem', position: 3, name: 'Notice Period' },
  ],
}

export default function TenancyRenewalNoticePeriodPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Notice Periods
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Tenancy Renewal Notice Period in Malaysia — How Much Notice You Actually Need
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Malaysia has no statutory minimum notice period for residential tenancy renewal. What governs is your contract, and the practical norm of 2 months written notice before expiry. This page covers what your agreement should say, what the 2026 'written notice' standard actually means, the timeline both sides should be working to, and what happens if anyone misses the window.
          </p>
          <p className="text-navy-500 text-sm">
            For the broader renewal walkthrough, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">general renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">What your existing agreement says is the rule</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Read your tenancy first. Before you Google anything, before you ask an agent, before you fire off a notice. The clause you want is usually called 'Renewal', 'Option to Renew', 'Notice', or 'Termination'. It will say something like 'either party shall give 2 months' written notice prior to the expiry date'. Whatever that clause says is binding on both sides, regardless of what the general Malaysia norm is.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            If your contract is silent on notice — no clause at all — you fall back on the 2-month convention as a practical default, but the absence of a written clause weakens your position if there's a dispute. A written clause is non-negotiable in any renewal you sign going forward.
          </p>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="font-semibold text-navy-800 mb-2">If you can't find a notice clause</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Search the document for the words 'notice', 'renewal', 'expiry', and 'terminate'. If none of them surface a clear notice period, treat 2 months as the working assumption, send your notice early, and put the missing clause into the renewal agreement explicitly so this isn't ambiguous next time.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">The Malaysia norm: 2 months written notice</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Most residential tenancies in Malaysia — residential and private — use 2 months written notice before expiry. That window is symmetrical: the landlord uses it to confirm renewal terms (or signal non-renewal), the tenant uses it to confirm intent to stay (or move out). Two months is enough to negotiate rent, agree on terms, draft and sign the new tenancy, and stamp it with LHDN inside the 14-day window.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            'Written notice' in 2026 includes email. The legal test is whether the notice is in writing and reaches the other party at a contact address listed in the tenancy. Email satisfies that, and it creates a paper trail automatically. What matters is:
          </p>
          <ul className="space-y-2 text-navy-600 text-sm mb-4 pl-5 list-disc">
            <li>Send to the email address specified in the tenancy as the contact (not a personal address you found on Facebook)</li>
            <li>Save the sent copy and ideally get a reply acknowledging receipt</li>
            <li>If your contract specifically says 'by registered post' or 'by hand', follow that exactly — don't substitute email</li>
            <li>WhatsApp messages, voice notes, and verbal conversations don't count as written notice on their own</li>
          </ul>
          <p className="text-navy-600 text-sm leading-relaxed">
            If you're the one giving notice, send the email, then follow up with a hard copy if your tenancy is older or if the other side is not responsive over digital channels. Belt and braces costs nothing.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Period for action — both sides</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Working backwards from the existing tenancy expiry date, here's the timeline both landlord and tenant should be tracking. Day 0 is the day the existing tenancy ends.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-4 text-navy-600 text-sm">
              <li>
                <strong className="text-navy-800">Day 60 — Give notice.</strong> Either side sends the formal written notice. Landlord signals renewal intent and proposed rent. Tenant signals whether they intend to stay. Email is fine, save the sent copy.
              </li>
              <li>
                <strong className="text-navy-800">Day 50 — Negotiate.</strong> Rent, term length, deposit top-up, diplomatic clause, any furnishing changes. Most negotiations resolve inside a week if both sides are reasonable. If you're stuck on rent, walk through the comparable units in the same building or block.
              </li>
              <li>
                <strong className="text-navy-800">Day 30 — Sign.</strong> Final renewal document signed by both parties. Either a short renewal addendum (if only dates and rent change) or a fresh new tenancy (if anything else moves). Most landlords sign a fresh new tenancy because the document trail is cleaner.
              </li>
              <li>
                <strong className="text-navy-800">Day 14 — Stamp.</strong> Renewal stamped with LHDN via <a href="https://mytax.hasil.gov.my" target="_blank" rel="noopener" className="text-brand-700 hover:underline">myTax (LHDN)</a>. Stamp duty must be paid within 14 days of signing, and the stamping needs to happen before the new tenancy commences. Same 0.4% rate as a new tenancy.
              </li>
              <li>
                <strong className="text-navy-800">Day 0 — New tenancy commences.</strong> Old tenancy ends, new one begins. Deposit either rolls over or gets topped up, rent payments continue under the new terms.
              </li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">What happens if you miss the window</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            If neither side gives notice and the expiry date passes, the tenancy doesn't just end. The tenant is still in the unit, still paying rent, the landlord is still accepting it. This is called a periodic tenancy or holdover tenancy, and it has real consequences:
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Periodic tenancy implied.</strong> A month-to-month rolling arrangement on the original terms, except the duration. Either side can end it with 1 month notice.</li>
              <li><strong className="text-navy-800">Original protections weaken.</strong> The fixed-term clauses (diplomatic clause, fixed rent, deposit handling) carry over by implication, but you have no signed document to wave at anyone if there's a dispute.</li>
              <li><strong className="text-navy-800">Deposit at risk.</strong> Most tenancies say the deposit is forfeit if the tenant doesn't give proper notice on non-renewal. If the tenant overstays then leaves, the landlord may have grounds to keep the deposit, depending on what the original tenancy said.</li>
              <li><strong className="text-navy-800">Landlord's tax and insurance.</strong> An unstamped, unwritten tenancy can complicate LHDN rental income reporting and home insurance coverage, since the unit may technically not be under a registered lease.</li>
              <li><strong className="text-navy-800">Sale of the property.</strong> If the landlord wants to sell, an unsigned periodic tenancy is harder to extract from than a fixed term with clear notice provisions. Buyers tend to want vacant possession or a clear lease.</li>
            </ul>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            The fix is the same in every case: sign a renewal agreement, even retroactively. A signed, stamped document is cheaper insurance than any of the disputes above.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate your renewal</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Renewal-ready agreement pre-filled from your previous tenancy. Updated dates, new rent, ready for LHDN stamping. Preview before purchase, RM30 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM30
              </Link>
              <Link href="/tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Renewal guide
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
