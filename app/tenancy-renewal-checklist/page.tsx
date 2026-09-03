import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Tenancy Renewal Checklist Malaysia — What to Include in Your Agreement | Sewa2u',
  description: 'The sections every Malaysia tenancy renewal needs, the ones you should add, and the ones nice to have. Stamp duty, witnesses, e-signatures, addendums covered.',
  keywords: 'tenancy renewal checklist Malaysia, what to include renewal agreement, renewal contract template Malaysia, lease renewal checklist',
  alternates: { canonical: 'https://sewa2u.com/tenancy-renewal-checklist' },
  openGraph: {
    title: 'Tenancy Renewal Checklist Malaysia — What to Include in Your Agreement',
    description: 'Required, recommended, and nice-to-have sections for a Malaysia tenancy renewal. Plain English checklist.',
    url: 'https://sewa2u.com/tenancy-renewal-checklist',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'What are the minimum sections a renewal agreement must contain?',
    a: "Seven things, no fewer. Identification of both parties (full name + NRIC/FIN/passport), identification of the property (full address with unit number and postal code), the term (start and end date in DD/MM/YYYY), rent amount with the day of the month it's due and the bank account it goes into, the security deposit amount and how it's refunded, the notice period for early termination, and an acknowledgment that stamp duty will be paid. Without these seven, you don't really have an agreement, you have a draft.",
  },
  {
    q: 'What sections are required vs nice to have?',
    a: "Required is the seven above. Strongly recommended (you'd regret omitting these): inventory list, utilities arrangement, custom clauses like no-smoking or no-pets, a repair threshold so small fixes go to the tenant, governing law (Malaysia), and dispute resolution. Nice to have, but not load-bearing: aircon servicing schedule, internet inclusion, parking, CCTV disclosure, key handover process. The required seven keep the agreement enforceable. The recommended ones prevent fights. The nice-to-haves are polish.",
  },
  {
    q: 'Should I use NRIC, FIN, or passport number for the tenant?',
    a: "Whichever ID document the tenant currently holds. Malaysian and PR tenants: NRIC. Employment Pass / S Pass / Work Permit / Student Pass holders: FIN (the number on their work pass card, not their passport). Tourists or short-stay foreigners (rare for renewals): passport number plus pass type and expiry. Use the same ID type they used in the original tenancy unless their status has changed (e.g., went from EP to PR). Don't mix — pick one consistent ID per party.",
  },
  {
    q: 'Do I need witnesses to sign the renewal?',
    a: "No. Malaysia tenancy agreements don't legally require a witness signature. The contract is binding on both parties once signed and stamped, regardless of whether a third person watched. Some templates still include witness signature lines because they're copy-pasted from old UK forms. You can leave them blank or remove them — neither affects validity. What matters is signature from both landlord and tenant, and LHDN stamping within 14 days.",
  },
  {
    q: 'What does LHDN stamp duty actually require the document to contain?',
    a: "For e-stamping via <a href=\"https://mytax.hasil.gov.my\" target=\"_blank\" rel=\"noopener\" className=\"text-brand-700 hover:underline\">myTax (LHDN)</a>, LHDN needs: full names + IDs of both parties, property address, lease start and end dates, rent amount, and any other consideration (e.g., advance rent or premium). The system asks for these explicitly during e-stamping. If your renewal agreement is missing any of them, you'll have to pull data from somewhere else to fill the form — which means your agreement isn't doing its job. The seven required sections above cover everything LHDN asks for.",
  },
  {
    q: 'Is an addendum valid without re-signing the original tenancy?',
    a: "Yes, if it's properly drafted. An addendum extends or modifies an existing tenancy and references the original by date and parties. Both sides sign the addendum (not the original again), and you stamp the addendum with LHDN. The original stays in force, with the addendum overriding any clauses it explicitly changes. The trap: addendums layered on addendums get messy fast. After two amendments to the same lease, just issue a fresh tenancy — cleaner stamping, no ambiguity about which clause supersedes which.",
  },
  {
    q: 'Are electronic signatures (DocuSign, etc.) valid for tenancy renewals in Malaysia?',
    a: "Yes. Under Malaysia's Electronic Transactions Act (ETA), e-signatures are legally equivalent to wet-ink signatures for tenancy agreements. Common platforms — DocuSign, Adobe Sign, HelloSign, even a clear scanned PDF with both parties' signatures emailed back and forth — all qualify. LHDN accepts e-signed documents for stamping. The only contracts the ETA excludes (wills, negotiable instruments, real estate sale deeds) don't include tenancies, so you're fine. Save the signed PDF, stamp it, done.",
  },
  {
    q: 'What happens if a required section is missing or incomplete?',
    a: "Depends which one. Missing rent amount or term dates: the agreement may be unenforceable as a fixed-term lease, defaulting to a periodic tenancy under common law (terminable on short notice, weak protection for both sides). Missing party IDs: you can't e-stamp it, and you'll have problems if you ever need to enforce it in court. Missing security deposit clause: the deposit isn't legally tied to specific damages, so refund disputes get murky. Always run through the seven required sections before signing. If something's missing, fix the document, don't sign and hope.",
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
  headline: 'Tenancy Renewal Checklist Malaysia — What to Include in Your Agreement',
  description: 'Required, recommended, and nice-to-have sections for a Malaysia tenancy renewal. Stamp duty, witnesses, e-signatures, addendums covered.',
  url: 'https://sewa2u.com/tenancy-renewal-checklist',
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
    { '@type': 'ListItem', position: 3, name: 'Renewal Checklist' },
  ],
}

export default function TenancyRenewalChecklistPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Renewal Checklist
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Tenancy Renewal Checklist — What to Include in a Malaysia Renewal Agreement
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            A renewal agreement is shorter than people think it should be. Seven sections are non-negotiable, six more are strongly recommended, and the rest is house-specific polish. This page is the checklist, in the order most landlords work through it.
          </p>
          <p className="text-navy-500 text-sm">
            Works for residential, private condo, and room rentals. For property-specific approval steps, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">tenancy renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Required sections (the minimum)</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Skip any of these and the agreement either can't be stamped or won't hold up if something goes wrong.
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">1. Parties identification</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Full legal names of landlord and tenant, plus ID numbers. Malaysian / PR uses NRIC, foreigner on a work or student pass uses FIN, short-stay foreigner uses passport number with pass type. Add residential address for both parties — needed for legal notice service if disputes arise.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">2. Property identification</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Full address: block + unit number, street, postal code. For room rentals, specify which room (e.g., "common room facing the corridor"). For residential, include the flat type. Vague descriptions create arguments later about what was actually rented.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">3. Term — start and end dates</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Specific dates in DD/MM/YYYY. Don't write "12 months from signing" — pick the dates and write them in. Most Malaysia renewals are 12 or 24 months. Anything longer than 3 years pushes stamp duty into a different bracket and may need land registry filing.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">4. Rent amount, payment day, payment method</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Monthly rent in MYR, the day it's due each month (1st, 5th, 15th — pick one), and the bank account (GrabPay details). State whether GST applies — only needed if landlord is GST-registered, which is rare for individuals.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">5. Security deposit</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Amount (typically 1 month for 1-year lease, 2 months for 2-year), what it covers, and the refund timeline after lease ends (usually 14–30 days). Note whether existing deposit from the original lease carries over or if there's a top-up.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">6. Notice period</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                For early termination by either side. 2 months is standard. Specify whether notice can be served at any time or only after a minimum lock-in (often 12 months). If you have a diplomatic clause, the notice period under that clause is usually shorter — write it in clearly.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">7. Stamp duty acknowledgment</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                One line stating who pays LHDN stamp duty. The tenant pays by default in Malaysia unless the agreement says otherwise. Stamp duty must be paid within 14 days of signing — see the <Link href="/stamp-duty-tenancy-renewal" className="text-brand-700 hover:underline">stamp duty page</Link> for rates and worked examples.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Strongly recommended sections</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Not legally required, but omitting these is how renewals turn into arguments.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Diplomatic clause (if applicable).</strong> For foreign tenants on work passes — early termination if the tenant loses their job and has to leave Malaysia. Usually triggers after 12 months in the lease and requires 2 months' notice plus proof of departure (cancelled work pass, flight booking).</li>
              <li><strong className="text-navy-800">Inventory list.</strong> Furniture, appliances, fittings — what's included and what condition each item is in at handover. Without it, deposit disputes about wear and tear become he-said-she-said.</li>
              <li><strong className="text-navy-800">Utilities arrangement.</strong> Who pays SP Group bill, water, gas, internet. Default is tenant pays, but spell it out. For room rentals, include split formula if shared.</li>
              <li><strong className="text-navy-800">Custom clauses.</strong> No smoking, no pets, no overnight guests beyond X nights, no subletting, no commercial use. Pick what matters to you and write it in. Verbal understandings don't survive year 2.</li>
              <li><strong className="text-navy-800">Minor repair threshold.</strong> Standard practice in Malaysia is the tenant pays for repairs under $150–$200 per incident (e.g., light bulbs, tap washers, minor plumbing). Above that, landlord pays. Write the threshold in.</li>
              <li><strong className="text-navy-800">Governing law and dispute resolution.</strong> "This agreement is governed by the laws of Malaysia. Disputes referred to the Small Claims Tribunals (for claims under $20,000) or Malaysia courts." Two lines, saves headaches.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Nice to have</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Polish that prevents niggles, but won't break the agreement if missing.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Pet policy specifics.</strong> If pets are allowed, what kind, how many, deposit top-up if any, professional cleaning at end of lease.</li>
              <li><strong className="text-navy-800">CCTV disclosure.</strong> If the property has indoor or doorway cameras, disclose them. Malaysia's PDPA requires it, and tenants notice eventually anyway.</li>
              <li><strong className="text-navy-800">Aircon servicing schedule.</strong> Quarterly is standard for Malaysia. Spell out who arranges (usually tenant) and who pays (usually tenant for routine, landlord for major repairs).</li>
              <li><strong className="text-navy-800">Internet / wifi.</strong> Whether existing broadband is included in rent, transferred to tenant, or terminated. State the provider and account holder.</li>
              <li><strong className="text-navy-800">Parking.</strong> Lot number, season parking arrangement, who pays the season parking fee.</li>
              <li><strong className="text-navy-800">Key handover process.</strong> Number of keys (front door, gate, mailbox, access card, fob). Replacement cost if lost. Whether duplicates are allowed.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Don't forget</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">LHDN stamping within 14 days.</strong> From signing date, not start date. File via <a href="https://mytax.hasil.gov.my" target="_blank" rel="noopener" className="text-brand-700 hover:underline">myTax (LHDN)</a> with MyKad/MyPR. Late stamping triggers a penalty of RM25 or the duty amount, whichever is higher, plus up to 4x the duty for serious delays.</li>
              <li><strong className="text-navy-800">property approval if applicable.</strong> If the renewal extends past your current property subletting approval window, re-apply via the residential portal before the new tenancy starts. Room rentals don't need separate approval but still count toward the occupancy cap.</li>
              <li><strong className="text-navy-800">One signed copy each side, plus one for stamping.</strong> Three originals total — landlord keeps one, tenant keeps one, the third goes through LHDN e-stamping. With e-signatures, this just means saving three identical PDFs.</li>
              <li><strong className="text-navy-800">Witnesses usually not required.</strong> Malaysia tenancies are valid with just landlord and tenant signatures. If your template has witness lines, you can leave them blank or remove them — neither affects enforceability.</li>
              <li><strong className="text-navy-800">Date the document.</strong> Sounds obvious, gets forgotten. The signing date drives the 14-day stamping clock and matters if the agreement is ever challenged.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate a complete renewal in minutes</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              All seven required sections, the strongly recommended ones, and your custom clauses — pre-built into a clean PDF, ready for LHDN stamping. Preview before purchase, RM30 to download.
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
