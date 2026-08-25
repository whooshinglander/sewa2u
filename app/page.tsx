import HomeForm from '@/components/form/HomeForm'
import HomepageSEO from '@/components/seo/HomepageSEO'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Malaysia Tenancy Agreement Template (RM30) — Instant PDF',
  description: 'Generate a residential tenancy agreement for Malaysia. Preview before purchase, download PDF from RM30.',
  alternates: { canonical: 'https://sewa2u.com' },
  openGraph: {
    title: 'Malaysia Tenancy Agreement Template (RM30) — Instant PDF',
    description: 'Generate a residential tenancy agreement for Malaysia. Preview before purchase, download PDF from RM30.',
    url: 'https://sewa2u.com',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
  },
}

const HOMEPAGE_FAQS = [
  {
    q: 'How do I create a tenancy agreement in Malaysia?',
    a: 'Use Sewa2u to generate a tenancy agreement online. Select your property type (residential or private), enter property details, landlord and tenant information, rental terms, and optional clauses. Preview the full agreement before purchase, then download the PDF from RM30.',
  },
  {
    q: 'What should be included in an residential tenancy agreement?',
    a: 'An residential tenancy agreement should include the property address, landlord and tenant details (names, NRIC/FIN), rental amount, tenancy period, security deposit, notice period, property subletting approval confirmation, occupancy cap, and any special clauses such as a diplomatic clause or pet policy.',
  },
  {
    q: 'Is a tenancy agreement legally required in Malaysia?',
    a: 'While not strictly required by law for all rentals, a written tenancy agreement is strongly recommended and practically essential. It protects both landlord and tenant, and must be stamped with LHDN within 14 days to be admissible as evidence in court. For property subletting, a written agreement is required by residential.',
  },
  {
    q: 'How much is the stamp duty for a tenancy agreement in Malaysia?',
    a: 'Stamp duty is RM1 per RM250 of annual rent for leases of 1 year or less, or RM3 per RM250 of the annual rent for leases of 1–3 years. For example, a 1-year lease at $3,000/month costs $144 in stamp duty. Payable to LHDN within 14 days of signing — typically borne by the tenant.',
  },
  {
    q: 'Can I rent out my residential room without a tenancy agreement?',
    a: 'Technically you can, but it is not advisable. A tenancy agreement protects both parties and clearly sets out the rental terms, deposit, and notice period. For residential whole-flat subletting, residential requires proper documentation and approval. A written agreement is strongly recommended for room rentals too.',
  },
  {
    q: 'What is the minimum rental period for residential rooms in Malaysia?',
    a: 'For residential whole-flat subletting, the minimum rental period is 6 months. For individual room rentals within an owner-occupied residential property, there is no official minimum period set by residential, but most landlords require at least 3–6 months.',
  },
]

const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOMEPAGE_FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// Service schema — explicit pricing + offerings so LLMs / Google can answer
// "how much is sewa2u" / "what does it generate" directly without scraping
// the DOM.
const homepageServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sewa2u — Malaysia tenancy agreement generator',
  serviceType: 'Tenancy agreement generation',
  provider: {
    '@type': 'Organization',
    name: 'Sewa2u',
    url: 'https://sewa2u.com',
    email: 'noreply@sewa2u.com',
  },
  areaServed: { '@type': 'Country', name: 'Malaysia' },
  audience: { '@type': 'Audience', audienceType: 'Malaysia landlords and tenants' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tenancy agreement plans',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Standard tenancy agreement PDF',
        description: 'Residential, private property, or room rental — guided 5-minute form, LHDN stamp duty ready.',
        price: '30',
        priceCurrency: 'MYR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Custom tenancy agreement (advanced clauses)',
        description: 'Adds advanced custom clauses such as CCTV, custom repair thresholds, and special tenancy terms.',
        price: '45',
        priceCurrency: 'MYR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Tenancy renewal agreement PDF',
        description: 'Update an existing tenancy with new dates and rent in 2 minutes.',
        price: '30',
        priceCurrency: 'MYR',
        availability: 'https://schema.org/InStock',
        url: 'https://sewa2u.com/renew',
      },
    ],
  },
  termsOfService: 'Preview before purchase. Pay only when you download. No signup. Generated agreements follow Malaysia tenancy practice and LHDN stamp duty norms; not legal advice.',
}

// Server component wrapper — HomepageSEO is fully SSR/crawlable
// HomeForm is client-rendered (the interactive form)
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageServiceSchema) }} />
      <HomeForm />
      <HomepageSEO />
    </>
  )
}
