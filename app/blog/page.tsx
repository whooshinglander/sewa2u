import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Malaysia Tenancy Guides — Contracts, Stamping, Deposits | Sewa2u',
  description: 'Plain guides to Malaysian tenancy: agreement essentials, LHDN e-stamping, deposits, Malay-language contracts, foreign tenants, and renewals. Verified against the Stamp Act and Contracts Act.',
  alternates: { canonical: 'https://sewa2u.com/blog' },
}

const groups = [
  {
    "name": "Agreements & templates",
    "posts": [
      {
        "href": "/tenancy-agreement",
        "title": "Malaysian Tenancy Agreement — What It Must Contain",
        "desc": "Essential clauses under the Contracts Act 1950, and what the free templates leave out.",
        "tag": "Agreements"
      },
      {
        "href": "/tenancy-agreement-in-malay",
        "title": "Perjanjian Sewa — Malaysian Tenancy in Bahasa Malaysia",
        "desc": "When a Malay agreement makes sense, duti setem basics, and bilingual options.",
        "tag": "Agreements"
      },
      {
        "href": "/tenancy-agreement-template",
        "title": "Tenancy Agreement Template (Whole Unit vs Room)",
        "desc": "Which clauses change between whole-unit and room rentals.",
        "tag": "Agreements"
      },
      {
        "href": "/tenancy-agreement-pdf",
        "title": "How the Tenancy PDF Is Built",
        "desc": "What goes inside the generated PDF and how e-stamping readiness works.",
        "tag": "Agreements"
      },
      {
        "href": "/room-rental-agreement",
        "title": "Room Rental Agreement Guide",
        "desc": "Utilities split, shared facilities, and house rules for room tenancies.",
        "tag": "Agreements"
      }
    ]
  },
  {
    "name": "Money & stamping",
    "posts": [
      {
        "href": "/stamp-duty-tenancy-renewal",
        "title": "Duti Setem: e-Stamping Your Tenancy (LHDN)",
        "desc": "RM1/RM250 and 0.4% rates, the 14-day window, and how to e-stamp.",
        "tag": "Money"
      },
      {
        "href": "/security-deposit-tenancy-renewal",
        "title": "Security Deposits in Malaysia",
        "desc": "The 2+1 norm, lawful deductions, and getting the refund.",
        "tag": "Money"
      },
      {
        "href": "/rent-increase-tenancy-renewal",
        "title": "Rent Increases at Renewal — What’s Fair",
        "desc": "How KL landlords benchmark increases, and leverage on both sides.",
        "tag": "Money"
      }
    ]
  },
  {
    "name": "Renewing & ending",
    "posts": [
      {
        "href": "/tenancy-renewal",
        "title": "Renewing a Tenancy in Malaysia",
        "desc": "Renewal vs new agreement, stamping on renewals, and timing.",
        "tag": "Renewals"
      },
      {
        "href": "/tenancy-renewal-checklist",
        "title": "Tenancy Renewal Checklist",
        "desc": "What to re-check at renewal — from agent fees to inventory.",
        "tag": "Renewals"
      },
      {
        "href": "/tenancy-renewal-notice-period",
        "title": "Notice Periods: What’s Normal",
        "desc": "Two months is the norm; what the contract overrides.",
        "tag": "Renewals"
      },
      {
        "href": "/tenancy-renewal-letter-template",
        "title": "Renewal Letter Templates",
        "desc": "Landlord-to-tenant and tenant-to-landlord notice letters.",
        "tag": "Renewals"
      },
      {
        "href": "/tenancy-renewal-vs-new-agreement",
        "title": "Renewal vs Brand-New Agreement",
        "desc": "When an addendum beats a fresh contract.",
        "tag": "Renewals"
      },
      {
        "href": "/renew-tenancy-without-agent",
        "title": "Renewing Without an Agent",
        "desc": "The DIY renewal path, fee savings, and what to re-verify.",
        "tag": "Renewals"
      },
      {
        "href": "/landlord-renewal-vs-find-new-tenant",
        "title": "Landlord: Renew or Find a New Tenant?",
        "desc": "Vacancy cost vs a bad-tenant risk — the honest math.",
        "tag": "Renewals"
      },
      {
        "href": "/common-tenancy-renewal-pitfalls",
        "title": "Common Renewal Pitfalls",
        "desc": "The mistakes that cost deposits and months.",
        "tag": "Renewals"
      },
      {
        "href": "/renew",
        "title": "Renew Your Agreement (2-Minute Flow)",
        "desc": "Update dates and rent — stamped-ready output.",
        "tag": "Renewals"
      }
    ]
  },
  {
    "name": "Property types & tenants",
    "posts": [
      {
        "href": "/private-property-tenancy-renewal",
        "title": "Private Property Renewals (Strata & Landed)",
        "desc": "MCST bylaws, maintenance fees, and who pays what.",
        "tag": "Property"
      },
      {
        "href": "/foreign-tenant-renewal",
        "title": "Foreign Tenant Renewals (Pass Alignment)",
        "desc": "Aligning term to pass expiry, the diplomatic clause, Immigration (JIM) address records.",
        "tag": "Property"
      },
      {
        "href": "/diplomatic-clause-tenancy-renewal",
        "title": "The Diplomatic Clause",
        "desc": "Early-exit protection for visa-tied tenants — sample wording.",
        "tag": "Property"
      },
      {
        "href": "/room-rental-renewal",
        "title": "Room Rental Renewals",
        "desc": "What changes when a room tenancy renews.",
        "tag": "Property"
      }
    ]
  }
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: groups.flatMap((g, gi) =>
    g.posts.map((p, pi) => ({
      '@type': 'ListItem',
      position: gi * 10 + pi + 1,
      name: p.title,
      url: 'https://sewa2u.com' + p.href,
    }))),
}

export default function BlogPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">Malaysia Tenancy Guides</h1>
        <p className="text-navy-600 text-base sm:text-lg leading-relaxed">Everything we know about renting out and renting in Malaysia, in plain language — grounded in the Contracts Act 1950 and the Stamp Act 1949. Each guide ends with the document step you need.</p>

        {groups.map(g => (
          <section key={g.name} className="pt-10">
            <h2 className="text-xl font-bold text-navy-800 mb-4">{g.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {g.posts.map(p => (
                <Link key={p.href} href={p.href} className="block bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-brand-300 transition-colors">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-brand-700 bg-brand-50 rounded-full px-2 py-0.5 mb-2">{p.tag}</span>
                  <p className="font-semibold text-navy-800 mb-1 leading-snug">{p.title}</p>
                  <p className="text-navy-500 text-sm leading-relaxed">{p.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="pt-14 pb-4">
          <div className="border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Ready to sign?</h2>
            <p className="text-navy-500 mb-6 text-sm max-w-xl mx-auto">Generate a Malaysia-compliant tenancy agreement in Bahasa Malaysia or English — e-stamping ready. Free preview, PDF from RM30.</p>
            <Link href="/" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">Create your agreement →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
