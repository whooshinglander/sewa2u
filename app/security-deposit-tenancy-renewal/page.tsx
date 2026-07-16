import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Security Deposit on Tenancy Renewal in Malaysia — Carry Over, Top Up, or Refund? | Sewa2u',
  description: 'How the security deposit works when you renew a tenancy in Malaysia: when it carries over, when you top up, when you refund, and how to document it cleanly.',
  keywords: 'security deposit renewal Malaysia, tenancy deposit refund renewal, deposit topup rent increase, 1 month vs 2 months deposit Malaysia',
  alternates: { canonical: 'https://sewa2u.com/security-deposit-tenancy-renewal' },
  openGraph: {
    title: 'Security Deposit on Tenancy Renewal in Malaysia — Carry Over, Top Up, or Refund?',
    description: 'When deposits carry over on renewal, when you top up, when you refund. Plain English with worked examples.',
    url: 'https://sewa2u.com/security-deposit-tenancy-renewal',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'Does the existing security deposit carry over to the renewal?',
    a: "Usually yes. The standard practice in Malaysia is that the deposit held by the landlord stays with the landlord through the renewal — there is no return-and-redeposit. The deposit just continues to secure the new term. Both parties save on bank transfers, and the tenant doesn't have to find another month or two of cash. The renewal agreement should still mention the carryover explicitly so there's no confusion about how much is held and against which tenancy.",
  },
  {
    q: 'Rent is going up. Do I need to top up the deposit?',
    a: "Standard market practice is yes, top up to match the new rent, if the original deposit was set as a fixed number of months. Quick math: if the original deposit was 1 month at $3,000 = $3,000, and the new rent is $3,300, the top-up is $300 to bring the deposit to 1 month at the new rate. If the original deposit was 2 months at $4,500 = $9,000, and the new rent is $5,000, the top-up is $1,000 to make it 2 months at the new rate. The top-up is usually transferred on or before the renewal start date.",
  },
  {
    q: 'Can the tenant ask for a partial deposit refund at renewal?',
    a: "They can ask, but it's rare unless there's a real reason — most often, going from a 2-year original lease (typically 2 months deposit) to a 1-year renewal (typically 1 month deposit). In that case the landlord refunds the extra month. Outside that scenario, deposit reductions on renewal aren't standard. The deposit is the landlord's protection against unpaid rent and damage, and most landlords won't reduce it without a reason.",
  },
  {
    q: 'My original lease was 2 years with 2 months deposit. Renewal is 1 year. What happens to the deposit?',
    a: "Common outcome: the landlord refunds 1 month of deposit and keeps 1 month, since 1-year leases conventionally carry 1 month deposit. So if the rent is $4,000/month, the landlord returns $4,000 to the tenant and continues holding $4,000. Both parties sign off on the new amount in the renewal agreement. If both parties want to keep 2 months deposit on the 1-year renewal (extra security), that's also fine — write it in.",
  },
  {
    q: 'Does the landlord have to pay interest on the security deposit?',
    a: "No. There is no legal obligation in Malaysia for landlords to pay interest on tenancy deposits. The deposit sits with the landlord, typically in their own bank account, and any interest earned is the landlord's. This is different from some other jurisdictions (UK, parts of the US) where deposit-protection schemes apply. Malaysia has no equivalent scheme — the deposit is a private contractual arrangement.",
  },
  {
    q: 'What if there is a deposit dispute at the end of the renewal term?',
    a: "If the landlord withholds part of the deposit and the tenant disputes it, the route is the Small Claims Tribunal (SCT) for amounts up to $20,000 (or $30,000 if both parties agree in writing). Filing fee is small (RM25–$30 depending on amount). No lawyers allowed at SCT — both parties represent themselves. Most deposit disputes settle there. Keep your inventory list, photos at handover, and receipts for any deductions — that's what the SCT will look at.",
  },
  {
    q: 'How should we document the deposit at renewal — handover-wise?',
    a: "You don't physically hand anything over since the deposit is already with the landlord. What you do is: (1) state in the renewal agreement the exact deposit amount being carried forward, (2) reference the original tenancy date and amount, (3) record any top-up paid (date, amount, transfer reference), and (4) sign and date. If you also do a fresh inventory list / condition report at renewal, attach that too — it resets the baseline for the new term and avoids arguments about what was already worn at the start of the renewal.",
  },
  {
    q: 'What paperwork records the deposit carryover on renewal?',
    a: "The renewal agreement itself. There should be a clause that reads something like: 'The Tenant has paid a security deposit of RM[amount] under the original Tenancy Agreement dated [date], which is hereby carried forward and held by the Landlord as security for this renewed Tenancy. The Tenant shall pay an additional top-up of RM[amount] on or before [date] to reflect the revised monthly rent.' That single clause covers it. No separate receipt is needed for the carryover — only for any top-up actually transferred.",
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
  headline: 'Security Deposit on Tenancy Renewal in Malaysia — Carry Over, Top Up, or Refund?',
  description: 'How the security deposit works on tenancy renewal in Malaysia: standard carryover, top-up math when rent rises, partial refund when going from 2-year to 1-year, dispute resolution, and how to document it.',
  url: 'https://sewa2u.com/security-deposit-tenancy-renewal',
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
    { '@type': 'ListItem', position: 3, name: 'Security Deposit on Renewal' },
  ],
}

export default function SecurityDepositRenewalPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Security Deposit
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Security Deposit on Tenancy Renewal — Carry Over, Top Up, or Refund?
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            In Malaysia, deposits are usually 1 month for a 1-year lease and 2 months for a 2-year lease. When you renew, the question is what happens to that money. Most of the time it just keeps sitting with the landlord, but there are three real scenarios — carryover, top-up, partial refund — and each one needs a single clause in the renewal to keep things clean.
          </p>
          <p className="text-navy-500 text-sm">
            For the wider renewal flow, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">tenancy renewal guide</Link>. For rent changes, see the <Link href="/rent-increase-tenancy-renewal" className="text-brand-700 hover:underline">rent increase page</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">The default: deposit carries over</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Standard practice is that the deposit already held by the landlord continues into the renewal term. There is no return-and-redeposit dance. The deposit is just re-tagged against the new tenancy in the agreement, and the same amount stays in the landlord's account.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            This is the cleanest path for both sides. The tenant doesn't have to find another month or two of cash to redeposit. The landlord doesn't have to refund and then receive again. Both parties just need the renewal agreement to state the deposit amount being carried forward and reference the original tenancy.
          </p>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="font-semibold text-navy-800 mb-2">What the agreement should say</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              One clause is enough: the deposit amount, the original tenancy date it was paid under, and a statement that it's now held as security for the renewal term. No separate transfer, no separate receipt needed for the carryover itself.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">When you top up</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            If rent goes up at renewal and the original deposit was set as a number of months, market practice is to top up so the deposit still equals the same number of months at the new rate. The math is simple — multiply the new rent by the number of months and pay the difference.
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Example 1 — 1-year renewal, $3,000 → $3,300</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Original deposit: 1 month at $3,000 = <strong>$3,000</strong> held.<br />
                New deposit at 1 month at $3,300 = <strong>$3,300</strong>.<br />
                Top-up: <strong>$300</strong>, paid by the tenant on or before the renewal start date.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Example 2 — 2-year renewal, $4,500 → $5,000</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Original deposit: 2 months at $4,500 = <strong>$9,000</strong> held.<br />
                New deposit at 2 months at $5,000 = <strong>RM25,000</strong>.<br />
                Top-up: <strong>$1,000</strong>.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Example 3 — flat-amount deposit (no top-up)</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                If your original tenancy specified the deposit as a fixed dollar figure (e.g. "RM5,000") rather than "1 month rent", there's no automatic top-up. Some landlords still ask for one; the tenant can reasonably refuse since the contract sets a fixed sum. This is why landlords typically write deposits as "X months rent" in the original lease — it auto-scales on renewal.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">When you refund partially</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The clearest case for a partial refund is going from a 2-year original lease to a 1-year renewal. The convention is 2 months deposit on a 2-year lease and 1 month on a 1-year lease — so the landlord refunds one month when the term shortens.
          </p>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
            <p className="font-semibold text-navy-800 mb-2">Worked example</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Rent $4,000/month. Original 2-year lease deposit: 2 months = <strong>$8,000</strong> held by landlord.<br />
              Renewal: 1 year, deposit at 1 month = <strong>$4,000</strong>.<br />
              Landlord refunds <strong>$4,000</strong> to tenant on or before the renewal start. Landlord keeps the other <strong>$4,000</strong> as the new deposit.
            </p>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            Some parties prefer to keep the full 2 months deposit on the 1-year renewal as extra security — that's fine if both agree. Just write the chosen amount into the renewal agreement so there's no ambiguity later.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Documenting the carryover</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The renewal agreement is the only document that needs to record the deposit position. Make sure it covers four things:
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Exact carryover amount.</strong> The dollar figure currently held, in writing.</li>
              <li><strong className="text-navy-800">Reference to the original tenancy.</strong> Date of the original lease where the deposit was first paid.</li>
              <li><strong className="text-navy-800">Top-up or refund details.</strong> If either applies: amount, date paid, transfer reference. If not, state explicitly that no adjustment is required.</li>
              <li><strong className="text-navy-800">Fresh inventory / condition report.</strong> Walk through the unit at renewal, photograph any wear-and-tear, attach the list as an annex. This resets the baseline for the new term.</li>
            </ul>
          </div>
          <p className="text-navy-500 text-sm leading-relaxed mt-4">
            One more thing: there is no LHDN-side action specifically for the deposit. Stamp duty is calculated on the rent, not the deposit. The deposit is purely a private contractual matter between landlord and tenant.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate your renewal with the deposit clause built in</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Pre-filled deposit carryover, top-up math, partial refund — all written into the renewal agreement. Preview before purchase, RM30 to download.
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

        {/* Cross-link to sanyathai */}
        <section className="max-w-3xl mx-auto px-4 pb-4">
          <div className="border-t border-slate-200 pt-6">
            <p className="text-xs text-navy-400 leading-relaxed">
              Renting in Thailand? See{' '}
              <Link href="https://sanyathai.com/security-deposit-thailand" className="text-brand-600 hover:text-brand-700 underline">
                Thailand security deposit rules for rentals
              </Link>
              {' '}(2 months deposit, governed by Civil and Commercial Code).
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
