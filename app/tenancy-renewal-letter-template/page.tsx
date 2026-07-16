import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Tenancy Renewal Letter Template Malaysia — Landlord & Tenant Samples | Sewa2u',
  description: 'Tenancy renewal letter templates for Malaysia. Landlord-to-tenant, tenant-to-landlord, and counter-offer samples. Plain text you can copy.',
  keywords: 'tenancy renewal letter template Malaysia, letter to renew tenancy, tenancy renewal notice template, landlord renewal letter sample, loi tenancy renewal',
  alternates: { canonical: 'https://sewa2u.com/tenancy-renewal-letter-template' },
  openGraph: {
    title: 'Tenancy Renewal Letter Template Malaysia — Landlord & Tenant Samples',
    description: 'Copy-and-edit renewal letter templates for Malaysia landlords and tenants. Plain English, no fluff.',
    url: 'https://sewa2u.com/tenancy-renewal-letter-template',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'Is the renewal letter legally binding?',
    a: "No. Only the stamped tenancy agreement is binding. The renewal letter (sometimes called a Letter of Intent or LOI) is a notice of intent and a way to lock in the headline terms before drafting. Either side can technically walk away until the actual tenancy agreement is signed by both parties and stamped with LHDN. In practice, walking away after a signed letter is bad form and can sour the deal, but it's not enforceable in court the way a signed and stamped agreement is.",
  },
  {
    q: 'What should the landlord include in the renewal letter?',
    a: "Address of the property, names of both parties, current tenancy end date, proposed new term (1 year, 2 years), proposed new rent, how the security deposit will be handled (carried forward, topped up, refunded and re-paid), any changes to clauses (diplomatic clause, utilities, occupants), and a deadline for the tenant to respond. Sign off with your name and contact. Keep it to one page if you can.",
  },
  {
    q: "What should the tenant include when requesting renewal?",
    a: "Same property and party details, the date your current tenancy ends, the term you want to renew for, the rent you're proposing (matching the current rent or with a small adjustment if the market has moved), confirmation that you'll continue with the existing deposit, and a request for the landlord's response by a specific date. If you have specific things you'd like changed (a new occupant moving in, replacing an aircon unit, removing a clause), spell them out clearly.",
  },
  {
    q: 'Email or printed letter — does it matter in Malaysia?',
    a: "Email is fine and increasingly the norm. What matters is the paper trail. If you send by email, keep the thread in a folder — your reply, their reply, any attachments. If you send a printed letter, scan it before posting and keep a copy. Either format counts as written notice. WhatsApp messages are weaker because they're easy to delete and harder to reference cleanly later, so use email or printed for anything to do with renewal terms.",
  },
  {
    q: 'After the letter is sent and accepted, how soon should the actual agreement follow?',
    a: "Aim for 2 to 4 weeks. The letter sets the headline terms, but the binding tenancy agreement still needs to be drafted, reviewed by both sides, signed, and stamped with LHDN within 14 days of signing. Don't let it drag past a month — the closer you get to the current tenancy end date, the more pressure you're under, and any small disagreement on a clause can blow up the deal.",
  },
  {
    q: 'What if the tenant accepts in the letter, then refuses to sign the actual agreement?',
    a: "You're back to square one. The letter isn't enforceable, so you can't compel them to sign. What you can do is start looking for a new tenant immediately and bill them for any costs that fall on your side because of the broken commitment (vacancy, agent fees) only if your existing tenancy has clauses that cover this. Realistically, most landlords just move on. This is why the gap between letter and signed agreement should be short.",
  },
  {
    q: 'Can the renewal letter substitute for the actual tenancy agreement?',
    a: "No. The letter is a notice, not a contract. The tenancy agreement is the document that sets out the legal terms, gets signed by both parties, and gets stamped with LHDN. Skipping the agreement and relying on the letter alone leaves both sides exposed — no clear notice period, no deposit terms, no clause governing damages or early termination. If anything goes wrong, you'll be arguing over an email rather than a stamped contract.",
  },
  {
    q: 'What are the norms for counter-offers on rent in Malaysia?',
    a: "Counter-offers are normal and expected. If the landlord proposes a 10% increase and you think 5% is fair, write back with the lower number, your reasoning (comparable rents in the area, your good payment history, willingness to commit to 2 years), and a deadline for response. Don't lowball — landlords have the cost of finding a new tenant baked into their math, so they'll usually meet you somewhere reasonable. One round of counter is normal, two is fine, three starts to feel like a stalemate.",
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
  headline: 'Tenancy Renewal Letter Template Malaysia — Landlord & Tenant Samples',
  description: 'Malaysia tenancy renewal letter templates for landlords and tenants, plus a counter-offer sample. Plain text, ready to copy and edit.',
  url: 'https://sewa2u.com/tenancy-renewal-letter-template',
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
    { '@type': 'ListItem', position: 3, name: 'Renewal Letter' },
  ],
}

export default function RenewalLetterTemplatePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Renewal Letter
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Tenancy Renewal Letter Templates — Malaysia
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Three templates you can copy: landlord proposing renewal to tenant, tenant requesting renewal from landlord, and a counter-offer when the first proposal needs adjusting. Malaysia-specific wording, plain English, ready to drop into an email.
          </p>
          <p className="text-navy-500 text-sm">
            Already aligned on terms? Skip the letter and <Link href="/renew" className="text-brand-700 hover:underline">generate the renewal agreement</Link> directly.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Letter ≠ Agreement</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-navy-600 text-sm leading-relaxed mb-3">
              The renewal letter is a notice. The tenancy agreement is the contract. People mix these up all the time, especially when the letter is signed by both parties and starts to feel like a deal.
            </p>
            <p className="text-navy-600 text-sm leading-relaxed mb-3">
              In Malaysia, only the stamped tenancy agreement is legally binding. The renewal letter (sometimes called a Letter of Intent or LOI) sets out the headline terms, locks in negotiating intent, and starts the paperwork timer. It does not replace the agreement, and either side can technically walk away until the actual tenancy is signed and stamped with LHDN.
            </p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Treat the letter as the handshake, the agreement as the contract. Send the letter, agree the terms, then move quickly to drafting the binding document.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Landlord-to-tenant template</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Use this when you (the landlord) are proposing renewal to a sitting tenant. Edit the bracketed fields, paste into email, send.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <pre className="whitespace-pre-wrap text-sm text-navy-700 font-mono leading-relaxed">
{`4 May 2026

[Tenant Name]
[Tenant Address / Same as Property]

Subject: Proposed Renewal of Tenancy — [Property Address, Malaysia Postal Code]

Dear [Tenant Name],

I am writing regarding the tenancy of the above property, which is due to expire on [31 July 2026]. I would like to offer a renewal on the following terms:

1. New term: 12 months, from [1 August 2026] to [31 July 2027].
2. Monthly rent: RM3,200, payable on the 1st of each month by bank transfer.
3. Security deposit: existing deposit of RM3,000 to be carried forward, with a top-up of RM200 to match the new monthly rent.
4. All other clauses (diplomatic clause, utilities, occupants) to remain as per the current tenancy agreement.
5. Signing of the new tenancy agreement to take place by [15 June 2026], with stamping completed within 14 days of signing.

Kindly confirm by [25 May 2026] whether these terms are acceptable, or let me know if you'd like to discuss any adjustments. Once we are aligned, I will arrange for the new tenancy agreement to be drawn up.

Looking forward to continuing the tenancy.

Yours sincerely,

[Landlord Name]
[Mobile Number]
[Email Address]`}
            </pre>
          </div>
          <p className="text-navy-500 text-xs mt-3">
            Numbers above are illustrative. Replace with your own.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Tenant-to-landlord template</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Use this when you (the tenant) want to initiate the renewal conversation. Sending it 8 to 10 weeks before your current tenancy ends gives both sides room to negotiate cleanly.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <pre className="whitespace-pre-wrap text-sm text-navy-700 font-mono leading-relaxed">
{`4 May 2026

[Landlord Name]
[Landlord Address or via Email]

Subject: Request to Renew Tenancy — [Property Address, Malaysia Postal Code]

Dear [Landlord Name],

I am writing to express my intention to renew the tenancy of the above property, which is currently due to expire on [31 July 2026]. I have enjoyed living at the property and would like to propose the following renewal terms:

1. New term: 12 months, from [1 August 2026] to [31 July 2027].
2. Monthly rent: RM3,200, in line with the current rent, given prevailing market conditions for the area.
3. Security deposit: I am happy for the existing deposit to be carried forward with no change.
4. All other clauses to remain as per the current tenancy agreement, with the diplomatic clause retained.
5. I would aim to sign the renewal agreement by [15 June 2026].

Please let me know by [25 May 2026] if these terms work for you, or if you'd like to discuss any adjustments. I'm happy to meet or call to talk it through.

Thank you for considering, and I hope we can continue.

Yours sincerely,

[Tenant Name]
[Mobile Number]
[Email Address]`}
            </pre>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Counter-offer template</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            When the first proposal doesn't fly, send a clean counter rather than a long debate. State the term, the number, the reasoning, the deadline.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <pre className="whitespace-pre-wrap text-sm text-navy-700 font-mono leading-relaxed">
{`4 May 2026

[Recipient Name]

Subject: Counter-Proposal — Renewal of Tenancy at [Property Address]

Dear [Recipient Name],

Thank you for your renewal proposal dated [28 April 2026]. After reviewing the terms, I'd like to counter-propose as follows:

1. Term: 24 months instead of 12, from [1 August 2026] to [31 July 2028].
2. Monthly rent: RM3,300 for both years, instead of RM3,500. This reflects current asking rents for comparable units in the area, and the longer 24-month commitment offers stability for both sides.
3. Security deposit: top up by RM300 to match the new rent.
4. All other clauses unchanged from the current tenancy.

Please let me know by [12 May 2026] whether this works. I'm open to discussing further if there are specific points you'd like to revisit.

Yours sincerely,

[Your Name]
[Mobile Number]`}
            </pre>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">After the letter — what's next</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Both sides agree on terms.</strong> Reply to the letter (email is fine) confirming acceptance.</li>
              <li><strong className="text-navy-800">Draft the renewal agreement.</strong> The actual binding document, with full clauses, signed by both parties.</li>
              <li><strong className="text-navy-800">Stamp with LHDN within 14 days.</strong> RM1 per RM250 of annual rent for a 1-year renewal, or 0.4% of average annual rent for a 1 to 3 year renewal.</li>
              <li><strong className="text-navy-800">Keep all the paperwork.</strong> The letter thread, the signed agreement, the LHDN stamp certificate. Three documents, one folder, done.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate the actual renewal agreement</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              The letter is the handshake. The agreement is the contract. Our renewal flow generates the binding document, pre-filled and ready for LHDN stamping. Preview before purchase, RM30 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM30
              </Link>
              <Link href="/tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                General renewal guide
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
