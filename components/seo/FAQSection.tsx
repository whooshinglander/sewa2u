'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Do I need a tenancy agreement in Malaysia?',
    a: 'Technically no, but practically yes. A written, stamped tenancy agreement is the only reliable protection for both landlord and tenant in Malaysia. Without it, disputes over deposits, repairs, and early termination are extremely difficult to resolve.',
  },
  {
    q: 'How much does it cost to stamp a tenancy agreement in Malaysia?',
    a: 'Stamp duty is RM1 per RM250 of the annual rent for leases up to 1 year, or RM3 per RM250 of the annual rent for leases of 1–3 years. For a 2-year lease at $3,000/month, that\'s roughly $288. It must be paid to LHDN within 14 days of signing.',
  },
  {
    q: 'Can I renew my tenancy without signing a new agreement?',
    a: 'You can, but it\'s risky. A verbal renewal or email confirmation has limited legal standing. The safest approach is to either sign a new tenancy agreement for the new period, or sign a short extension addendum to the existing agreement that specifies the new end date and any rent changes.',
  },
  {
    q: 'What is a diplomatic clause in a Malaysia tenancy agreement?',
    a: 'A diplomatic clause allows a tenant to terminate the lease early if they are repatriated, transferred abroad, or their Malaysia employment ends. It typically activates after the first 12 months of the tenancy with 2 months\' written notice. It\'s standard for expat tenants.',
  },
  {
    q: 'How much security deposit should I charge?',
    a: 'The standard in Malaysia is 1 month\'s deposit for a 1-year lease and 2 months\' deposit for a 2-year lease. For furnished properties, some landlords charge an additional month. The deposit must be refunded within 14 days of the tenancy end, less any valid deductions.',
  },
  {
    q: 'Who pays stamp duty — landlord or tenant?',
    a: 'By convention in Malaysia, the tenant typically bears the stamp duty. This should be stated clearly in the tenancy agreement. Both parties can agree to split it, but the default is tenant pays.',
  },
  {
    q: 'Is this tenancy agreement legally valid in Malaysia?',
    a: 'The agreement is generated based on standard Malaysia residential tenancy terms. It covers all major clauses required under Malaysia law. However, this is a template tool — for complex situations (commercial properties, disputes, non-standard arrangements), consult a qualified Malaysia lawyer.',
  },
  {
    q: 'Can I use this for property subletting?',
    a: 'Yes. The tool includes property-specific clauses and a reminder to confirm property subletting approval has been obtained. Note that it is the landlord\'s legal responsibility to obtain and renew property approval before subletting — this tool does not apply for or confirm that approval.',
  },
  {
    q: 'How do I renew a tenancy agreement in Malaysia?',
    a: 'Generate a Tenancy Renewal Agreement — a short addendum that extends the existing tenancy with updated rent, new start/end dates, and any changed terms. Both parties sign it and stamp duty applies on the new term. This is cleaner and faster than drafting a new full agreement.',
  },
  {
    q: 'How to renew a tenancy agreement without going through an agent?',
    a: "You don't need an agent to renew a tenancy agreement in Malaysia. If both landlord and tenant agree on the new terms (rent, dates, duration), simply generate a Tenancy Renewal Agreement, review it together, sign it, and pay stamp duty via LHDN myStamp within 14 days. The whole process takes under 30 minutes and costs a fraction of agent commission — typically 1 month's rent saved.",
  },
  {
    q: 'What is stamp duty on a tenancy agreement in Malaysia?',
    a: "Stamp duty is RM1 per RM250 of the annual rent for leases up to 1 year; 0.4% of average annual rent for leases of 1–3 years; and 0.4% of 4× the average annual rent for leases over 3 years. It must be paid to LHDN within 14 days of signing. The tenant typically bears this cost by convention.",
  },
  {
    q: 'What is a diplomatic clause in a Malaysia tenancy agreement?',
    a: "A diplomatic clause allows either party to terminate the tenancy early — typically after the first 12 months — with 2 months' written notice, if the tenant is repatriated or their Malaysia employment ends. It's standard for expat tenants and protects both landlord and tenant from being locked in if circumstances change.",
  },
  {
    q: 'What is the difference between residential and private property tenancy agreements?',
    a: 'Residential tenancies follow standard Malaysia contract law under the Contracts Act 1950. All tenancy agreements require stamp duty payment to LHDN within 14 days of signing, a written agreement with clear terms, and standard clauses for security deposit, notice period, and termination. Private property agreements follow the same legal framework.',
  },
  {
    q: 'How to terminate a tenancy agreement early in Malaysia?',
    a: "Check for a diplomatic clause or break clause in your agreement. Without one, the party breaking the lease typically forfeits their deposit or pays compensation equal to the remaining rent liability. Always give written notice and document everything to avoid disputes.",
  },
  {
    q: 'What happens to the security deposit if the landlord sells the property?',
    a: 'The deposit obligation transfers to the new owner at the point of sale. The original landlord is required to hand over the deposit to the buyer at property handover, and the tenant\'s right to recover the deposit is fully preserved under the new landlord.',
  },
  {
    q: 'Can a landlord increase rent during the tenancy period?',
    a: 'No — rent is fixed for the full duration of the tenancy term as agreed at signing. The landlord can only propose new rent at renewal. Any mid-tenancy rent change requires written mutual agreement from both parties.',
  },
  {
    q: 'What is a break clause in a Malaysia tenancy agreement?',
    a: "A break clause (often called a diplomatic clause in Malaysia) gives one or both parties the right to end the lease early after a minimum period — usually 12 months — with a notice period of 1–2 months. It's most common for expat tenants whose employment may end unexpectedly.",
  },
  {
    q: 'What is a Tenancy agreement?',
    a: "The General (Council for Estate Agencies) tenancy agreement is a standardised template published by Malaysia's real estate regulatory body. It provides a baseline format for residential tenancies covering key clauses like rent, deposit, notice period, and maintenance obligations. While not legally mandatory, it is widely used as a reference. A tenancy agreement generator like Sewa2u builds on the General template with additional clauses for property subletting, diplomatic termination, and property-specific terms.",
  },
  {
    q: 'How do I renew a residential tenancy agreement?',
    a: "To renew a residential tenancy: (1) Give written notice at least 2 months before the current lease expires. (2) Agree on new rent and duration with the other party. (3) Sign a new tenancy agreement or renewal addendum. (4) Stamp the renewed agreement with LHDN within 14 days. (5) Update your property subletting record if subletting the whole flat — property approval must be current. Use Sewa2u's renewal generator to create a stamped-ready renewal agreement in minutes.",
  },
  {
    q: 'What are residential room rental agreement requirements?',
    a: "Residential room rental in Malaysia requires: the flat owner must be a Malaysia Citizen or Permanent Resident, the owner must continue to live in the flat, the total occupancy must not exceed 6 persons (3-room or smaller) or 9 persons (4-room or larger), non-Malaysian tenants need property approval, and the minimum rental period is typically 6 months. A written room rental agreement covering rent, deposit, house rules, and shared facilities is strongly recommended.",
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-xl font-bold text-navy-800 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-medium text-navy-800">{faq.q}</span>
              <span className={`flex-shrink-0 w-5 h-5 text-navy-400 transition-transform ${open === i ? 'rotate-180' : ''}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-navy-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
