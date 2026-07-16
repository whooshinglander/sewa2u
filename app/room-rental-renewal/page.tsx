import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Room Rental Renewal Malaysia — residential Master & Common Room',
  description: 'How room rental renewal works in Malaysia: property occupancy cap, master vs common room rent ranges, shared facilities, house rules. Plain English, no fluff.',
  keywords: 'room rental renewal Malaysia, renew room rental, common room renewal, master bedroom rental renewal, room rental renewal Malaysia',
  alternates: { canonical: 'https://sewa2u.com/room-rental-renewal' },
  openGraph: {
    title: 'Room Rental Renewal in Malaysia — Master & Common Room Specifics',
    description: 'Room renewal: residential cap, master vs common rent, shared facilities, house rules. Plain English.',
    url: 'https://sewa2u.com/room-rental-renewal',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'Do I need separate property approval to renew a room rental?',
    a: "No, room rentals work differently from whole-flat subletting. As long as you (the owner-occupier) still live in the flat, residential doesn't require a separate subletting approval per room. You do still need to register the tenants under the property's Renting of Bedrooms scheme via the residential portal, and that registration carries over on renewal as long as the same tenants stay. If a new tenant replaces an old one, update the registration with the new tenant's details before they move in.",
  },
  {
    q: 'Does the property occupancy cap still apply when I renew?',
    a: "Yes, and it's the most common thing landlords forget. The cap is 4 unrelated tenants total for a 4-room or larger flat, and 2 unrelated tenants for a 3-room flat. That total includes everyone living in the flat besides the owner's family, across all rooms. If you renew with the same tenants and you're already at the cap, you're fine. If you're renewing one room and adding a new tenant in another room, double-check the headcount before signing.",
  },
  {
    q: 'What are typical rents for master vs common room on renewal?',
    a: "Master bedroom typically goes for RM1,200 to RM2,000 a month, common room for RM700 to RM1,200, depending on area, MRT proximity, condition and whether the room has its own bathroom. Central areas (Bangsar, Damansara, Subang Jaya) sit at the top of those ranges. Outskirts (Cheras, Ampang, Puchong) sit lower. On renewal, market rates have been climbing the last two years, so a small increase (RM50–RM150) is usually reasonable if your tenant has been good and you don't want to risk turnover.",
  },
  {
    q: 'Why does master bedroom command so much more than common room?',
    a: "Three reasons. First, size — master is usually 30–50% bigger. Second, attached bathroom in most flats means no sharing for the master tenant. Third, master rooms typically have better windows and ventilation. The premium of roughly RM400–RM800 over a common room reflects all three. If your master doesn't have an attached bathroom (some older 4-room flats), the gap narrows.",
  },
  {
    q: 'How do I write shared facilities into the renewal?',
    a: "List them explicitly in the agreement: kitchen, laundry area, common bathroom (if shared), living room, balcony, parking lot if applicable. Specify what's included (gas/water for cooking, washing machine usage) and any limits (laundry hours, no overnight kitchen use). The previous tenancy probably had something — copy what's been working and tighten the wording on anything that caused friction during the term.",
  },
  {
    q: 'Do utilities reset on renewal or just continue?',
    a: "If you've been splitting utilities (typical for room rentals — usually equally between tenants, or owner pays a fixed share), the arrangement carries forward unless either side wants to change it. Renewal is a clean point to switch from 'split equally' to 'fixed amount per month' or vice versa, especially if one tenant uses noticeably more than the others. Write the new arrangement clearly in the renewal agreement so there's no argument month to month.",
  },
  {
    q: 'When should I switch from per-room rentals to renting out the whole flat?',
    a: "Three signals: high tenant turnover (more than 1 swap per room per year), recurring conflict between tenants over shared facilities, or the owner-occupier (you) actually moving out. Whole-flat subletting needs separate property approval and a different agreement structure, but it's simpler to manage — one tenant, one rent, one set of utilities. The flip side: per-room usually grosses more total rent (RM2,800–RM4,000 for a 4-room flat with master + 2 commons rented vs RM2,500–RM3,200 whole-flat), so you're trading yield for simplicity.",
  },
  {
    q: 'Can I let two tenants share the same room on renewal?',
    a: "Generally no for residential. the property's rule is one occupant per bedroom under the Renting of Bedrooms scheme, with limited exceptions for couples or family members. Putting two unrelated tenants in one room breaches the rules and risks penalties. If a tenant asks (often to split rent), the answer is no, and explain why in the agreement. For couples or married pairs, that's allowed, but they still count as 2 tenants against the occupancy cap.",
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
  headline: 'Room Rental Renewal in Malaysia — Master & Common Room Specifics',
  description: 'Room rental renewal walkthrough: property occupancy cap, master vs common room rent ranges, shared facilities, house rules, when to switch to whole-flat.',
  url: 'https://sewa2u.com/room-rental-renewal',
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
    { '@type': 'ListItem', position: 3, name: 'Room Rental Renewal' },
  ],
}

export default function RoomRentalRenewalPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Room Rental Renewal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Room Rental Renewal in Malaysia — Master & Common Room
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Renting out a master or common room while you live in the flat is the most common residential rental setup. The renewal process is lighter than whole-flat subletting, but a few things still trip people up — the occupancy cap, how shared facilities get handled, and whether utilities carry forward. This page covers the room-specific stuff.
          </p>
          <p className="text-navy-500 text-sm">
            For whole-flat property renewals, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">tenancy renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">property rules for room rentals on renewal</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Owner-occupier requirement</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                You (or an immediate family member named on the flat) have to keep living in the flat for room rental to qualify under the Renting of Bedrooms scheme. If you've moved out and are renting out all the rooms, that's whole-flat subletting and needs a separate property approval. On renewal, this still applies — the owner-occupier setup has to be intact for the whole renewal term.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Occupancy cap stays the same</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                4 unrelated tenants total for a 4-room or larger flat, 2 unrelated tenants for a 3-room flat. The cap doesn't move on renewal. Family members count separately. If you're at the cap with the existing tenants, you can renew without changing anything; if you want to add a new tenant in another room, you can't push past the cap.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Tenant registration update</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Same tenant renewing? The residential Renting of Bedrooms registration carries over. New tenant replacing an old one mid-renewal? Update the registration via the residential portal before they move in. It takes a few minutes and costs nothing.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Master vs common room — the rent gap</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Typical 2026 ranges across Malaysia:
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Master bedroom:</strong> RM1,200 to RM2,000/month. Top of range for central locations (Bangsar, Damansara, Subang Jaya, Shah Alam) within walking distance of an MRT. Bottom of range for outskirts (Cheras, Ampang, Puchong, Kepong).</li>
              <li><strong className="text-navy-800">Common room:</strong> RM700 to RM1,200/month. Same area logic applies. A common room with attached bathroom in a newer flat can hit master-room territory.</li>
              <li><strong className="text-navy-800">The gap:</strong> roughly RM400–RM800. Driven by size (master is 30–50% bigger), attached bathroom (no sharing), and better windows/ventilation in most layouts.</li>
            </ul>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed">
            On renewal, market rates have been climbing the last two years. A RM50–RM150 increase is usually reasonable if the tenant has been good and you don't want to risk a swap. Going hard on a hike often costs you a month of vacancy plus the time of finding and vetting a new tenant — usually not worth it for RM100 more rent.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Shared facilities — write them in the renewal</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The renewal agreement should spell out what's shared and how. Vague wording is where disputes start. List each:
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Kitchen.</strong> Tenant has access for cooking, included gas/water in utilities, any limits on cooking hours or strong-smelling food (some landlords ban frying or specific cuisines).</li>
              <li><strong className="text-navy-800">Laundry.</strong> Washing machine usage included or with quota, drying area access, hours if there's a quiet rule.</li>
              <li><strong className="text-navy-800">Common bathroom.</strong> Only relevant if the tenant doesn't have attached. Specify schedule rules if multiple tenants share it during peak hours.</li>
              <li><strong className="text-navy-800">Living room and common areas.</strong> Whether the tenant can use them, whether guests can be entertained there.</li>
              <li><strong className="text-navy-800">Parking.</strong> If the flat has an residential season parking lot and you're including it, name it. Otherwise default is no parking included.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Utilities on renewal — reset or continue?</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            Two common setups for room rentals:
          </p>
          <ul className="space-y-2 text-navy-600 text-sm mb-4 pl-5 list-disc">
            <li><strong className="text-navy-800">Equal split.</strong> Total utility bill divided by number of occupants (including you). Simple, fair if usage is similar.</li>
            <li><strong className="text-navy-800">Fixed amount per month.</strong> RM80–RM150 per tenant per month, owner absorbs the rest. Predictable for the tenant, you take the variance.</li>
          </ul>
          <p className="text-navy-600 text-sm leading-relaxed">
            Renewal is a clean point to switch between the two if the existing arrangement has been creating friction. If one tenant uses way more (long showers, AC running constantly), moving them to a fixed higher amount or switching to equal-split sub-metering is a fair conversation to have at renewal. Whatever you land on, write it into the new agreement explicitly.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">House rules on renewal</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            If the existing house rules have been working, copy them forward. If something's been a problem, this is the moment to tighten the wording. The usual list:
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Visitors.</strong> Allowed during reasonable hours, common areas only or tenant's room only, your call.</li>
              <li><strong className="text-navy-800">Overnight guests.</strong> Most landlords allow occasional overnight stays, some draw a hard line. If you allow them, cap at a number of nights per month so it doesn't drift into a second occupant.</li>
              <li><strong className="text-navy-800">Cooking.</strong> What's allowed in the kitchen — heavy frying, religious dietary restrictions, hours.</li>
              <li><strong className="text-navy-800">Smoking.</strong> Default is no smoking inside the flat. Balcony or outside building only, if at all.</li>
              <li><strong className="text-navy-800">Pets.</strong> Default is no pets unless explicitly agreed. residential has its own rules on approved breeds.</li>
              <li><strong className="text-navy-800">Quiet hours.</strong> Usually 10:30pm to 7am — matters more in shared rooms with thin walls.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate your room rental renewal</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Renewal-ready form for master or common room rentals. Shared facilities, house rules, utility split, all pre-filled. Preview before purchase, RM30 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM30
              </Link>
              <Link href="/tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Tenancy renewal guide
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
