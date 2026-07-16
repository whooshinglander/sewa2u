import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Common Tenancy Renewal Pitfalls in Malaysia — 5 Mistakes That Cost Money | Sewa2u',
  description: 'The five failure modes we see most often in Malaysia tenancy renewals: handshake renewals, late LHDN stamping, missed property approval, foreign pass expiry, deposit disputes. What it costs and how to avoid each.',
  keywords: 'tenancy renewal mistakes Malaysia, tenancy renewal problems, common rental renewal pitfalls, what can go wrong tenancy renewal',
  alternates: { canonical: 'https://sewa2u.com/common-tenancy-renewal-pitfalls' },
  openGraph: {
    title: 'Common Tenancy Renewal Pitfalls in Malaysia — 5 Mistakes That Cost Money',
    description: 'Handshake renewals, late stamping, missed property approval, pass expiry, deposit disputes. What it costs and how to avoid.',
    url: 'https://sewa2u.com/common-tenancy-renewal-pitfalls',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'What is the most common pitfall in tenancy renewals?',
    a: "The handshake renewal. Tenant has been good for a year or two, both sides verbally agree to continue, no document gets signed. The original tenancy expires and you slide into a periodic tenancy by default — month-to-month, terminable on short notice, with most of the original protections gone. When something goes wrong six months later (rent missed, neighbour complaint, you want the unit back), neither side has a clear contract to fall back on. A signed renewal takes 30 minutes and costs a stamp duty payment. Skipping it is the cheapest mistake people make and the most expensive when it bites.",
  },
  {
    q: 'What happens if I stamp my renewal late with LHDN?',
    a: "LHDN charges a penalty of RM25 or the duty amount (whichever is greater) if you're up to 3 months late, and up to 4× the duty if you're more than 3 months late. The bigger problem is enforceability: an unstamped tenancy can't be admitted as evidence in Malaysia courts. If you ever have to sue for unpaid rent or damage, you have to stamp and pay the penalty before the case proceeds. Stamp within 14 days of signing and this is a non-issue.",
  },
  {
    q: "I forgot to renew my property subletting approval before the new tenancy started. What happens?",
    a: "Property management takes subletting compliance seriously. If an unapproved sublet is discovered during your renewal period, you may face penalties. The fix if you've already missed it: apply now, disclose the gap honestly, and get the agreement stamped. Don't try to backdate anything. LHDN cross-checks tenancy stamping records.",
  },
  {
    q: 'My tenant refuses to do a walk-through at the end of the renewal and is now disputing deposit deductions. What now?',
    a: "Without a signed move-in inventory and condition report, you're fighting over recollections. Send a written list of deductions with photos and quotes within 7 days of move-out. If the tenant rejects it, file a Small Claims Tribunal claim — it costs RM25 to $50 to file, no lawyer needed, and SCT handles tenancy deposit disputes up to $20,000. Bring photos, the tenancy agreement, repair invoices. Going forward: do a walk-through with a signed condition report at every renewal, not just the original move-in.",
  },
  {
    q: "My foreign tenant's Employment Pass expires 4 months into the renewal and they're leaving. Am I stuck with the vacancy?",
    a: "Depends on what your tenancy says. If there's no clause covering pass non-renewal, the tenant is technically still liable for the full term — but practically, suing a tenant who has left the country is expensive and slow. If there's a standard early termination clause for pass expiry, the tenant gives notice and you both move on. Most foreign-tenant renewals should include a pass-expiry clause that triggers prorated termination with deposit forfeiture for any breach. Without that clause you're choosing between an empty unit and a hard-to-recover legal claim.",
  },
  {
    q: "My tenant and I discussed a small rent reduction mid-term, but never wrote anything down. Now they're paying the lower amount and I'm not sure where I stand.",
    a: "If the variation isn't documented, your original signed and stamped tenancy is what's enforceable. You can technically demand the full original rent, but if you've accepted the reduced amount for several months without objection, a court might find you've waived the difference through conduct. Either way, fix it now: sign a short variation addendum stating the new rent, the effective date, and that all other terms continue unchanged. Re-stamp with LHDN. Verbal agreements on rent changes are the second most common dispute we see.",
  },
  {
    q: "My tenant won't sign the renewal but won't move out either. What can I do?",
    a: "If the original tenancy has expired and they remain in the unit paying rent, you have a periodic tenancy on the original terms. To end it, serve written notice — typically one rental period (a month for monthly tenancies). If they still don't leave after the notice period ends, they're a holdover tenant and you can apply to the courts for possession. Don't change the locks, don't cut utilities, don't remove their belongings — self-help eviction is illegal in Malaysia and exposes you to damages. Document everything in writing, keep accepting rent under protest if you want to preserve your position, and get the notice served properly.",
  },
  {
    q: 'My landlord increased the rent in the middle of my tenancy and is threatening to end it if I refuse. Is that legal?',
    a: "No. A signed tenancy locks in the rent for the agreed term. The landlord cannot unilaterally raise rent mid-term, and threatening termination over it is a breach of contract on their side, not yours. Reply in writing referencing the rent clause in the tenancy and the term end date. Keep paying the agreed amount. If the landlord tries to evict, the tenancy and LHDN stamp are your evidence. Rent reviews can only happen at renewal, not mid-term, unless your agreement specifically includes a mid-term review clause (rare in residential leases).",
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
  headline: 'Common Tenancy Renewal Pitfalls in Malaysia — 5 Mistakes That Cost Money',
  description: 'The five failure modes we see most often in Malaysia tenancy renewals, what each one costs, and how to avoid them.',
  url: 'https://sewa2u.com/common-tenancy-renewal-pitfalls',
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
    { '@type': 'ListItem', position: 3, name: 'Common Pitfalls' },
  ],
}

export default function CommonPitfallsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Common Pitfalls
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Common Tenancy Renewal Pitfalls in Malaysia
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            These are the failure modes we see most often. Most tenancy renewals go through cleanly, but when they break, they break in the same five ways. Each one is avoidable with about an hour of paperwork.
          </p>
          <p className="text-navy-500 text-sm">
            For the clean walkthrough, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">general renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">1. The handshake renewal</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="font-semibold text-navy-800 mb-2">What happened</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Tenant was good for two years. Both sides verbally agreed to continue. Nothing got signed, no LHDN stamping, just a verbal "let's keep going at the same rent". The original 1-year tenancy expired and the relationship slid into a periodic month-to-month arrangement by default.
            </p>
            <p className="font-semibold text-navy-800 mb-2">What it cost</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Eight months later the tenant gave 30 days notice and left. The landlord wanted a 2-month notice period as in the original tenancy, but periodic tenancies only require one rental period of notice. The deposit (held under the original agreement) was disputed because there was no current document specifying its terms. Two months of vacant unit at $3,500 plus a contested deposit ate roughly $9,000.
            </p>
            <p className="font-semibold text-navy-800 mb-2">How to avoid</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Sign a renewal. Either a short addendum or a fresh tenancy. Stamp with LHDN within 14 days. The total cost of doing this is the stamp duty (RM1 per RM250 of annual rent) plus 30 minutes of admin. Skipping it has a non-zero chance of costing thousands.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">2. Late LHDN stamping</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="font-semibold text-navy-800 mb-2">What happened</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Renewal got signed on time. Stamp duty got forgotten. Nine months in, the tenant stopped paying rent and the landlord wanted to send a lawyer's letter. The tenancy was unstamped.
            </p>
            <p className="font-semibold text-navy-800 mb-2">What it cost</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              LHDN penalty for stamping more than 3 months late is up to 4× the original stamp duty. On a $3,500/month tenancy that's roughly $670 in penalty on top of the $168 duty. Worse, an unstamped tenancy is not admissible in Malaysia court, so the lawyer's letter had no teeth until stamping was sorted. Three weeks of delay before the landlord could push the matter forward.
            </p>
            <p className="font-semibold text-navy-800 mb-2">How to avoid</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Stamp within 14 days of signing via <a href="https://mytax.hasil.gov.my" target="_blank" rel="noopener" className="text-brand-700 hover:underline">myTax (LHDN)</a>. Set a calendar reminder for the day after signing. The whole process takes ten minutes with MyKad/MyPR. See the <Link href="/stamp-duty-tenancy-renewal" className="text-brand-700 hover:underline">stamp duty page</Link> for worked examples.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">3. Missed property subletting approval renewal</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="font-semibold text-navy-800 mb-2">What happened</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              residential grants subletting approval for up to 3 years per application. Landlord renewed the tenancy with the same tenant for a third year, but the property approval window had ended four months earlier. New tenancy started. property approval did not.
            </p>
            <p className="font-semibold text-navy-800 mb-2">What it cost</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              residential conducted a routine check, flagged the unapproved sublet, and issued a financial penalty. A black mark went on the landlord's subletting record, which complicated the next approval application. In severe or repeat cases, residential has revoked subletting approval entirely. Cost here: a few hundred dollars in penalty and a meaningfully harder conversation with residential on the next renewal.
            </p>
            <p className="font-semibold text-navy-800 mb-2">How to avoid</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Pull up the property approval letter. Note the end date. If your renewal extends past it, re-apply for subletting approval through the residential portal before the new tenancy starts. Approval usually comes through in a few working days. See the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">property renewal guide</Link> for the full sequence.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">4. Foreign tenant pass expires mid-term</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="font-semibold text-navy-800 mb-2">What happened</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Tenant was on an Employment Pass valid for 18 more months. Both sides signed a 2-year renewal. Fourteen months in, the tenant's employer downsized, the EP wasn't renewed, and the tenant had 30 days to leave Malaysia. The tenancy had no clause covering pass non-renewal.
            </p>
            <p className="font-semibold text-navy-800 mb-2">What it cost</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Tenant left. Landlord was technically owed 10 months of rent under the contract, but suing a former resident who has left Malaysia is slow, expensive, and often unrecoverable. Practical outcome: deposit forfeited, unit re-listed, 4 weeks of vacancy. Total exposure was around $12,000 on a $3,000/month unit, partially offset by the deposit.
            </p>
            <p className="font-semibold text-navy-800 mb-2">How to avoid</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              For any foreign tenant on a work pass, write a pass-expiry clause into the tenancy. Standard form: tenant gives 1–2 months notice if their pass is not renewed, deposit handled per the agreement, no further claim by either side. See the <Link href="/foreign-tenant-renewal" className="text-brand-700 hover:underline">foreign tenant renewal page</Link> for sample wording.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">5. Deposit dispute at end of renewal term</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="font-semibold text-navy-800 mb-2">What happened</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Tenant moved out at the end of a 2-year renewal. Landlord deducted $2,400 from the deposit for repainting, deep cleaning, and a damaged countertop. Tenant disputed all three. There was a move-in inventory from 3 years ago but no condition report at the start of the renewal term and no walk-through at move-out.
            </p>
            <p className="font-semibold text-navy-800 mb-2">What it cost</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Six weeks of email back-and-forth. Tenant filed at the Small Claims Tribunal. Landlord won part of the claim ($800 for the countertop where there was a clear photo) and lost the rest because "wear and tear over 3 years" couldn't be distinguished from tenant damage without a baseline. Net: $1,600 of disputed deductions reversed plus the time cost of SCT proceedings.
            </p>
            <p className="font-semibold text-navy-800 mb-2">How to avoid</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Walk through the unit with the tenant at the start of every renewal. Note any wear and tear, take dated photos, both sides sign. Repeat at move-out. The condition report at renewal start is what separates new damage from pre-existing wear, and it's usually the document that decides a deposit dispute either way.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate your renewal properly</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Renewal-ready agreement, pre-filled, LHDN-stampable. Pass-expiry clauses, deposit terms, walk-through reminder included. Preview before purchase, RM30 to download.
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
