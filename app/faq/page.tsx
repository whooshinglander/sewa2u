import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ContentSection from '@/components/seo/ContentSection'
import FAQSection from '@/components/seo/FAQSection'
import ReviewsSection from '@/components/seo/ReviewsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Malaysia Tenancy Agreement FAQ — Stamp Duty, residential, Renewal',
  description: 'Answers to common questions about Malaysia tenancy agreements — renewal of tenancy agreement, stamp duty for tenancy agreement Malaysia, General template, residential room rental requirements, diplomatic clause, and more.',
  keywords: 'renewal of tenancy agreement Malaysia, stamp duty for tenancy agreement Malaysia, Malaysia tenancy agreement faq, what is Tenancy agreement, how to renew tenancy Malaysia, diplomatic clause Malaysia, room rental agreement requirements Malaysia, tenancy stamp duty Malaysia, tenancy deposit Malaysia, subletting rules Malaysia',
  alternates: {
    canonical: 'https://sewa2u.com/faq',
  },
  openGraph: {
    title: 'Malaysia Tenancy Agreement FAQ — Stamp Duty, residential, Renewal',
    description: 'Answers on renewal of tenancy agreement Malaysia, stamp duty, property subletting, deposits, diplomatic clause, and more.',
    url: 'https://sewa2u.com/faq',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Malaysia Tenancy Agreement FAQ — Renewal, Stamp Duty, residential',
  description: 'Answers to common questions about Malaysia tenancy agreements — renewal, stamp duty, property subletting, deposits, diplomatic clause, and more.',
  url: 'https://sewa2u.com/faq',
  publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
}

export default function FAQPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main className="flex-1 pt-8">
        <div className="max-w-3xl mx-auto px-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2">Malaysia Tenancy Agreement FAQ — Renewal, Stamp Duty &amp; residential</h1>
          <p className="text-navy-500 text-base">Answers to common questions on renewal of tenancy agreement Malaysia, stamp duty, residential room rental, and more.</p>
        </div>
        <ContentSection />
        <FAQSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  )
}
