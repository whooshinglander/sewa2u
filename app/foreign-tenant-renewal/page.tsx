import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Foreign Tenant Renewal in Malaysia — Pass Expiry, Immigration Updates, What to Sign | Sewa2u',
  description: 'Renewing a tenancy for an EP, S Pass, WP, or DP holder in Malaysia. Pass expiry alignment, diplomatic clause, JIM address records, mid-term pass denial. Plain English.',
  keywords: 'foreign tenant renewal Malaysia, expat tenancy renewal, ep holder rent renewal, work permit tenancy renewal, ica renewal tenant',
  alternates: { canonical: 'https://sewa2u.com/foreign-tenant-renewal' },
  openGraph: {
    title: 'Foreign Tenant Renewal in Malaysia — Pass Expiry, Immigration Updates, What to Sign',
    description: 'Renewing for EP/S Pass/WP/DP tenants: pass alignment, diplomatic clause, JIM address records.',
    url: 'https://sewa2u.com/foreign-tenant-renewal',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: "Should the tenancy term match the tenant's pass expiry date?",
    a: "Best practice is to keep the tenancy end date on or before the pass expiry. If the pass runs out 8 months into a 12-month renewal, you have a built-in problem if IMM doesn't approve the renewal. Either align the tenancy to the pass (shorter term, then re-renew once the new pass is issued), or sign a 12-month tenancy with a clear early-termination clause tied to pass non-renewal. Don't just sign and hope.",
  },
  {
    q: "What if the tenant's pass isn't renewed mid-term?",
    a: "Without a clause, the tenant is still legally bound to pay rent through the end of the term even if they have to leave Malaysia. Most foreign-tenant tenancies include a diplomatic clause covering exactly this — usually allowing the tenant to terminate after 12 months of occupancy with 2 months' notice if their pass is cancelled, employment ends, or they're transferred out. If the tenant is on a fresh renewal and their pass gets denied at the 4-month mark, the diplomatic clause may not have kicked in yet, so it's worth negotiating the wording before signing.",
  },
  {
    q: 'Does the tenant need to update Immigration (JIM) when they renew at the same address?',
    a: "If the address on their pass record already matches the rental, no — staying put doesn't trigger anything. The obligation is to keep the registered address current with the Immigration Department (Jabatan Imigresen Malaysia, JIM). So if they're renewing at the same flat, their record is already correct. If they move to a different unit (even within the same condo or block), they should update JIM when they move — via the online pass systems or at an Immigration office. A stale address on the pass record causes trouble at renewal and application time.",
  },
  {
    q: 'How does this work for Dependent Pass holders?',
    a: "DP holders ride on the main pass holder's status. If the EP holder's pass is renewed, the DP gets renewed alongside. For tenancy purposes, the DP holder can sign a tenancy in their own name, but the underlying employment risk sits with the main pass holder. Practical tip: if the lease is in the DP holder's name (often the spouse who isn't working), still verify the main EP holder's pass validity, because that's what actually keeps the family in Malaysia.",
  },
  {
    q: 'Can someone on STVP or Long Term Visit Pass rent and renew?',
    a: "Yes, both are allowed to rent residential property. STVP holders are uncommon as long-term tenants because the pass is typically 30 to 90 days, but the law doesn't prohibit it. LTVP holders (often spouses or parents of citizens/PRs) can rent and renew normally. The renewal paperwork is the same as for an EP holder, but check the LTVP expiry against the proposed term.",
  },
  {
    q: 'Is there a special bond or surety required because the tenant is foreign?',
    a: "No. Malaysia has no separate landlord-side bond or government-imposed surety for renting to foreigners. The standard 1-month deposit per year of tenancy applies the same way. Some landlords ask for a 2-month deposit on tenants whose pass expiry is close to the lease end, as a buffer against early departure. That's a commercial decision, not a legal requirement.",
  },
  {
    q: "If I'm a foreign landlord renting to a foreign tenant, any tax angle?",
    a: "Yes. As a non-resident landlord, you're taxed on rental income at a flat 22% (rising to 24% from YA 2024) on net rental, with no personal reliefs. The tenant has no withholding obligation for residential rent paid to a non-resident landlord — that's withholding for commercial property rentals, not residential. You report the rental income through your LHDN filing. If you have a property agent collecting rent on your behalf, they may have agency-specific reporting practices.",
  },
  {
    q: "Can the tenant sign a new tenancy before IMM has approved their pass renewal?",
    a: "Legally yes — the tenancy is a contract between landlord and tenant, not conditional on IMM approval. But it's risky for both sides. If IMM denies the renewal after they've signed, the tenant is on the hook for rent unless there's a clause covering it. The cleaner approach is to sign with a condition precedent: tenancy is binding subject to pass renewal approval within X weeks. Or sign a Letter of Intent with a small good-faith deposit that's refundable if the pass is denied, and only convert to a full tenancy once approval comes through.",
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
  headline: 'Foreign Tenant Renewal in Malaysia — Pass Expiry, Immigration Updates, What to Sign',
  description: 'Renewing a tenancy for foreign tenants in Malaysia: pass expiry alignment, diplomatic clause, JIM address records, mid-term pass denial, DP/STVP/LTVP holders.',
  url: 'https://sewa2u.com/foreign-tenant-renewal',
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
    { '@type': 'ListItem', position: 3, name: 'Foreign Tenant Renewal' },
  ],
}

export default function ForeignTenantRenewalPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Foreign Tenant Renewal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Renewing a Tenancy for a Foreign Tenant in Malaysia
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Renewing for an Employment Pass, S Pass, Work Permit, or Dependent's Pass holder is mostly the same as for a Malaysian tenant. The differences are pass expiry alignment, the diplomatic clause, and keeping the address on the Immigration (JIM) record current. Get those three right and the rest is just paperwork.
          </p>
          <p className="text-navy-500 text-sm">
            For the general renewal flow, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">renewal guide</Link>. For the clause itself, see the <Link href="/diplomatic-clause-tenancy-renewal" className="text-brand-700 hover:underline">diplomatic clause page</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Pass expiry alignment is the main thing to check</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Before you sign anything, run through this:
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">1. Get a copy of the current pass</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Ask the tenant for a photo of their pass card (front and back) or the printout from IMM's online portal. Note the pass type (EP, S Pass, WP, DP) and the exact expiry date. Don't take their word for it — pass cards get lost, and renewal applications get denied more often than people admit.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">2. Compare pass expiry to proposed tenancy end date</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                If the pass expires after the tenancy ends, you're fine. If it expires before, you have a decision: shorten the tenancy to match the pass (then re-renew once their new pass comes through), or write a clause that handles non-renewal of the pass.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">3. Confirm the employer is renewing the pass</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                For EP and S Pass holders, the employer files for renewal, not the tenant. Ask the tenant whether their company has already submitted (or intends to submit) the renewal. If they haven't started and the pass expires in 6 weeks, you're in higher-risk territory and may want a shorter tenancy term.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">4. Match the tenancy term sensibly</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Common patterns: 12 months with diplomatic clause if pass expiry is well past the term. 12 months with a tighter early-termination clause if pass expiry falls inside the term. 6 months if the pass renewal is genuinely uncertain.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Diplomatic clause vs no clause</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The diplomatic clause is a market-standard early-termination right for foreign tenants. The usual wording: after 12 continuous months of occupancy, the tenant may terminate with 2 months' written notice if they're transferred out of Malaysia, their employment ends, or their pass is cancelled or not renewed.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">EP holders.</strong> Almost always negotiate for one. Multinational expats expect it as standard. Refusing usually loses you the tenant.</li>
              <li><strong className="text-navy-800">S Pass holders.</strong> Often included. The S Pass renewal rate is high but not 100%, and tenants on tighter budgets need the option.</li>
              <li><strong className="text-navy-800">WP holders.</strong> Less common, partly because WP tenancies are often dorms or company-arranged housing. If renting on the open market, a clause is reasonable.</li>
              <li><strong className="text-navy-800">DP holders.</strong> Tied to the main pass holder, so the diplomatic trigger is usually framed around the EP/S Pass holder's status, not the DP itself.</li>
              <li><strong className="text-navy-800">PR holders.</strong> Don't typically need a diplomatic clause — they're not at risk of pass non-renewal in the same way. Treat the renewal like a Malaysian tenant.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Address records with Immigration (JIM) — the tenant&apos;s side</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Long-term pass holders are expected to keep their residential address current with the Immigration Department of Malaysia (Jabatan Imigresen Malaysia, or JIM) — the address is part of the pass record, and updates go through the pass systems (e.g. MyXPATS/ePPAX) or the nearest Immigration office. Unlike some neighbouring countries, Malaysia does not publish a strict statutory day-count for the address change itself — but pass renewals and new applications check the records, so stale addresses surface at the worst moment.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            For a renewal where the tenant is staying at the same unit, nothing needs filing — the address on file already matches. If the renewal involves a unit change (different flat, even in the same building), the tenant should update their address with JIM when they move.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Practical points:
          </p>
          <ul className="space-y-2 text-navy-600 text-sm mb-4 pl-5 list-disc">
            <li>The tenant needs to update their residential address with the Immigration Department of Malaysia (Jabatan Imigresen) — this is done via the employer's ESD/MyXPATS portal for expatriate passes, or at the nearest Immigration office. A stamped tenancy agreement is the cleanest proof of address.</li>
            <li>The tenant needs proof of address — a stamped tenancy agreement is the cleanest evidence, which is why getting LHDN stamping done early matters.</li>
            <li>A stale address on the pass record complicates future pass renewals and any long-stay applications — better corrected at move-in than discovered at renewal time.</li>
            <li>As landlord you don't file the JIM update for them, but pointing it out (especially for first-time tenants in Malaysia) avoids problems later.</li>
          </ul>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">If their pass gets denied or expires mid-term</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            This is the scenario landlords don't want to think about and tenants definitely don't. Build the contract assuming it could happen.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <p className="font-semibold text-navy-800 mb-3">Clause checklist:</p>
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Pass non-renewal trigger.</strong> Define what counts: IMM denial, employer withdrawal, pass cancellation. Be specific so there's no argument about whether the trigger fired.</li>
              <li><strong className="text-navy-800">Notice period.</strong> Standard is 2 months' written notice once the trigger fires. Some agreements require the tenant to provide a copy of the IMM letter.</li>
              <li><strong className="text-navy-800">Effective date.</strong> Usually the later of (a) end of notice period, or (b) actual move-out. Avoids the tenant being forced out before they can pack.</li>
              <li><strong className="text-navy-800">Deposit treatment.</strong> Prorated return after deduction for any unpaid rent, utilities, or damage. Be explicit that deposit isn't forfeit just because the term wasn't completed.</li>
              <li><strong className="text-navy-800">Documentation requirement.</strong> Tenant produces evidence of pass status — IMM letter, employer letter, or pass card showing the new expiry.</li>
            </ul>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            Without a clause, the tenant is contractually liable for the remaining rent. In practice most landlords negotiate something reasonable rather than chasing someone who has already left the country, but having the legal position clear from day one avoids ugly disputes.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate a renewal with the right clauses</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Foreign-tenant renewals pre-filled with diplomatic clause and pass-related terms. Updated dates, new rent, ready for LHDN stamping. Preview before purchase, RM30 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM30
              </Link>
              <Link href="/diplomatic-clause-tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Diplomatic clause guide
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-link to sanyathai */}
        <section className="max-w-3xl mx-auto px-4 pb-4">
          <div className="border-t border-slate-200 pt-6">
            <p className="text-xs text-navy-400 leading-relaxed">
              Renting in Thailand? See{' '}
              <Link href="https://sanyathai.com/foreigners-renting-property-thailand" className="text-brand-600 hover:text-brand-700 underline">
                foreigner property rights in Thailand
              </Link>
              {' '}— can expats rent and own property, visa considerations.
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
