import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Rent Increase on Tenancy Renewal in Malaysia — What\'s Reasonable in 2026 | Sewa2u',
  description: 'How much can your landlord raise rent on renewal in Malaysia? No rent control, pure negotiation. Benchmarks from LHDN, PropertyGuru, 99.co, and what 2026 actually looks like.',
  keywords: 'rent increase tenancy renewal Malaysia, how much rent increase Malaysia, is my landlord allowed to increase rent, fair rent increase 2026, rent hike Malaysia, ura rental index',
  alternates: { canonical: 'https://sewa2u.com/rent-increase-tenancy-renewal' },
  openGraph: {
    title: 'Rent Increase on Tenancy Renewal in Malaysia — What\'s Reasonable in 2026',
    description: 'No rent control in Malaysia. How to benchmark a fair increase, when negotiation works, and what 2026 numbers actually look like.',
    url: 'https://sewa2u.com/rent-increase-tenancy-renewal',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'Is there a legal limit on how much my landlord can raise the rent?',
    a: "No. Malaysia has no rent control. The Residential Tenancies framework here doesn't cap renewal increases the way some jurisdictions do (no equivalent of Hong Kong's old rent control or NYC stabilisation). Whatever you and your landlord sign is what applies. The only constraint is the existing tenancy — your landlord cannot raise rent mid-lease unless your contract has a rent-review clause. On renewal, it's open negotiation.",
  },
  {
    q: 'How do I figure out what a fair increase actually is?',
    a: "Start with the LHDN Rental Index (the official quarterly index for private residential rents — published on ura.gov.sg). Look at the year-on-year change for your property type and region. Then cross-check current listings on PropertyGuru and 99.co for similar units in your block or neighbourhood — same size, same condition, same MRT. If your existing rent is already at or above what comparable units are listing for, you have grounds to push back. If you're significantly below market, expect a meaningful ask.",
  },
  {
    q: 'When does negotiation actually work in the tenant\'s favour?',
    a: "When the landlord wants to keep you. Vacancy is expensive — 3 to 4 weeks of empty unit plus half-month agent commission can easily wipe out a 10% rent hike for a year. If you've paid on time, kept the unit clean, and the landlord knows replacing you isn't cheap, you have leverage. Counter with a number, not a complaint. Bring two or three comparable listings and a calm proposal: 'market is at $X, I'm offering $Y, here's why renewing me beats finding someone new.'",
  },
  {
    q: 'What if the landlord refuses to negotiate at all?',
    a: "Then it's a take-it-or-leave-it. Your options are pay the new rate, walk, or go to small claims if you believe the landlord breached the existing agreement (rare in renewal disputes — the existing lease usually just expires cleanly). The Small Claims Tribunals handle tenancy disputes up to $20,000 ($30,000 if both parties agree), but they handle deposit and damage disputes, not 'my landlord raised rent too much.' There's no body in Malaysia that adjudicates 'fair rent.'",
  },
  {
    q: 'What tools do I use to check market trend?',
    a: "Three sources cover most of it. LHDN Rental Index (ura.gov.sg/realEstateIIWeb) gives you the macro trend by region and property type, updated quarterly. PropertyGuru and 99.co show you actual current asking rents — filter by your exact development if it's a condo, or by residential block cluster. SRX also publishes a private rental index that some agents reference. For residential rentals specifically, residential itself publishes median rents by town and flat type on data.gov.sg.",
  },
  {
    q: 'My landlord is asking for 20% more. Is that crazy?',
    a: "Depends on when your current lease started. If you locked in during the 2020-2021 COVID dip and you're renewing in 2026, you might genuinely be 20-30% below market — landlords saw rents jump roughly 30% in 2022 alone. If you signed your current lease in 2024 or later, a 20% bump is aggressive and probably above market. Pull LHDN Rental Index data for the period your lease covered and compare. The number itself isn't the question; the question is whether the new rate matches what your unit would let for today.",
  },
  {
    q: 'What\'s a "reasonable" increase in 2026?',
    a: "In a normalising market, 3-7% is the typical range for a tenant who's been there 1-2 years and the unit hasn't had major upgrades. In hotter pockets (newer condos near MRT, popular expat areas like River Valley or Tanjong Pagar), 8-15% still happens. If your landlord is asking for more than 15%, they're either correcting a below-market lease or trying their luck. Either way, ask for the comp data.",
  },
  {
    q: 'What happens if I just refuse and don\'t sign anything?',
    a: "When the lease ends, you become a holdover tenant. The landlord can issue notice to vacate, and if you don't leave they can apply to court for possession. You don't accidentally extend the lease by staying. If you keep paying the old rent and the landlord keeps accepting it, you might create a periodic tenancy by conduct (month-to-month at the old rate), but this is messy and the landlord can terminate it on short notice. Don't rely on it. Either negotiate, accept, or move.",
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
  headline: 'Rent Increase on Tenancy Renewal in Malaysia — What\'s Reasonable in 2026',
  description: 'Malaysia has no rent control. How to benchmark a fair renewal increase using LHDN Rental Index, PropertyGuru and 99.co, plus what 2026 numbers actually look like.',
  url: 'https://sewa2u.com/rent-increase-tenancy-renewal',
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
    { '@type': 'ListItem', position: 3, name: 'Rent Increase on Renewal' },
  ],
}

export default function RentIncreaseRenewalPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Rent Negotiation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Rent Increase on Tenancy Renewal — What&apos;s Reasonable in 2026
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Renewal time, the landlord wants more rent, and you&apos;re trying to figure out if the number is fair. Malaysia has no rent control, which means there is no legal answer. Only a market answer. This page walks through how to benchmark it, when negotiation actually works, and what 2026 numbers look like on the ground.
          </p>
          <p className="text-navy-500 text-sm">
            For the full renewal process, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">tenancy renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Malaysia has no rent control</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-3">
            This is the part that surprises people moving from London, New York, or Sydney. Malaysia does not cap renewal rent increases. There is no rent stabilisation board, no fair-rent tribunal, no annual percentage limit. The Residential Tenancies legal framework governs deposits, evictions, and stamp duty. It does not set or police rent levels.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-3">
            What this means in practice: when your existing tenancy ends, the landlord can ask for whatever number they want. You can accept, counter, or walk. The only thing they cannot do is raise the rent during your fixed-term lease (unless your contract specifically allows it, which most don&apos;t).
          </p>
          <p className="text-navy-600 text-sm leading-relaxed">
            The Small Claims Tribunals handle tenancy disputes for damage, deposit return, and breaches up to $20,000. They do not adjudicate &quot;is this rent fair.&quot; MAS doesn&apos;t regulate rents either, despite the occasional confusion. There is no government rent dispute service. It&apos;s pure negotiation.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">How to benchmark a fair increase</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Three sources, in order of usefulness:
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">1. LHDN Rental Index</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                The official quarterly index for private residential rents at <a href="https://www.ura.gov.sg/realEstateIIWeb" target="_blank" rel="noopener" className="text-brand-700 hover:underline">ura.gov.sg/realEstateIIWeb</a>. Filter by region (CCR, RCR, OCR) and property type. Look at the year-on-year change covering the period of your existing lease. If the index is up 6%, a 6% renewal ask is in line with the market. If it&apos;s up 15%, expect a bigger number.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">2. Live listings on PropertyGuru and 99.co</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Go to PropertyGuru and 99.co. Filter for your exact development (if condo) or your residential block cluster. Same number of bedrooms, similar floor area, similar condition. Note the asking rents on at least 5 comparable units. Asking is not transacted — actual rents close 3-8% below ask in a balanced market — but it&apos;s a useful ceiling.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">3. residential and SRX transacted data</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                For residential rentals, residential publishes median rents by town and flat type on data.gov.sg. For private property, SRX publishes a monthly rental index that captures actual contract data. Both are slower than listings but show what people actually paid, not what landlords hoped for.
              </p>
            </div>
          </div>
          <p className="text-navy-500 text-sm leading-relaxed mt-4">
            Hawker-cost-of-living check — if you&apos;re telling yourself &quot;rent only went up 5% so I can absorb it,&quot; remember CPI ran 3-4% over the same period. A 5% rent bump on a $4,500 condo is $225/month, roughly 45 hawker meals. The number matters in absolute dollars, not just percentage.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Who usually wins the negotiation</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Leverage in a renewal is asymmetric and depends on three things: vacancy risk, tenant quality, and how hot the local rental market is right now.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <p className="font-semibold text-navy-800 mb-3">Tenant has leverage when:</p>
            <ul className="space-y-2 text-navy-600 text-sm pl-5 list-disc">
              <li>Local market is soft — listings sit unrented for 3+ weeks, asking rents flat or down</li>
              <li>You&apos;ve paid on time, kept the unit clean, and the landlord has zero complaints to point to</li>
              <li>The landlord lives overseas or doesn&apos;t want the hassle of finding someone new</li>
              <li>Your unit has quirks (small kitchen, no covered carpark, old aircon) that limit who else would take it</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <p className="font-semibold text-navy-800 mb-3">Landlord has leverage when:</p>
            <ul className="space-y-2 text-navy-600 text-sm pl-5 list-disc">
              <li>Market is hot — listings rent in 1 week, asking rents climbing month-on-month</li>
              <li>The unit is in a sought-after location (near international school, MRT interchange, CCR address)</li>
              <li>You&apos;re a foreigner on a 2-year work assignment and moving is expensive and disruptive</li>
              <li>Comparable transacted data clearly supports the new ask</li>
            </ul>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            The vacancy math: a $4,500/month unit empty for 3 weeks costs the landlord roughly $3,400 in lost rent, plus half-month agent commission of $2,250 = about $5,650 to find a new tenant. That&apos;s 10.5% of annual rent. So if the landlord is asking for an 8% increase and you&apos;re a known good tenant, the rational play for them is often to take 4-5% and keep you. Make this math explicit when you negotiate. Don&apos;t be aggressive about it; just write it down.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">What&apos;s a reasonable increase in 2026</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The post-COVID rental boom (2022-2023) is over. Rents climbed roughly 30% in 2022, then another 8-10% in 2023, before plateauing in 2024 as supply caught up. By 2026, the market is closer to normal — modest year-on-year movement, no extreme conditions in either direction.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <p className="font-semibold text-navy-800 mb-3">Rough 2026 ranges by situation:</p>
            <ul className="space-y-2 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Stable market, good tenant, no major upgrades:</strong> 3-7% increase</li>
              <li><strong className="text-navy-800">Hot pocket (new MRT line, popular school district, recent unit refurb):</strong> 8-15%</li>
              <li><strong className="text-navy-800">Below-market lease being corrected (signed in 2020-2021 dip):</strong> 15-30%, sometimes more</li>
              <li><strong className="text-navy-800">Soft submarket, landlord wants retention:</strong> 0-3%, occasionally a small drop</li>
            </ul>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed mb-3">
            Concrete numbers — a 4-room residential in a mature estate currently rents around $3,500-$4,200/month, depending on condition. A 2-bedroom condo in OCR is in the $4,000-$5,500 range. RCR 2-beds run $5,500-$7,500. CCR can be $7,000-RM25,000+ depending on building. If your renewal pushes you past the top of the equivalent range, ask why.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed">
            One thing to be honest about: if you signed your lease in 2020 or 2021 and you&apos;re renewing now, you probably got a great deal during COVID, and the renewal is correcting back to market. That&apos;s not your landlord being greedy. That&apos;s the calendar.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Once you&apos;ve agreed the new rate</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Generate the renewal at the agreed rate. Pre-filled from your previous tenancy, ready for LHDN stamping. Preview before purchase, RM30 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Generate the renewal — RM25
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
