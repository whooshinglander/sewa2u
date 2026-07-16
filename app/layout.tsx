import type { Metadata, Viewport } from 'next'
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['500', '600', '700', '800'],
})

const GA_ID = 'G-LCWJPFYG1X'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // NOTE: user-scalable is NOT set. Pinch-to-zoom is allowed.
  themeColor: '#f8fafc',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sewa2u.com'),
  title: 'Residential Tenancy Agreement Template Malaysia | Sewa2u',
  description: 'Generate a residential tenancy agreement for Malaysia. Preview before purchase, download PDF from RM30.',
  keywords: 'tenancy agreement generator Malaysia, Malaysia tenancy agreement, residential tenancy agreement, Malaysia rental contract, tenancy agreement generator, rental agreement Malaysia, tenancy renewal Malaysia, tenancy agreement Malaysia, Malaysia TA template, tenancy renewal agreement generator, tenancy renewal agreement generator Malaysia, renew tenancy agreement generator Malaysia, generate tenancy renewal agreement Malaysia',
  alternates: {
    canonical: 'https://sewa2u.com',
  },
  openGraph: {
    title: 'Residential Tenancy Agreement Template Malaysia | Sewa2u',
    description: 'Generate a residential tenancy agreement. Preview before purchase, download PDF from RM30.',
    url: 'https://sewa2u.com',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
    images: [{ url: 'https://sewa2u.com/opengraph-image', width: 1200, height: 630, alt: 'Sewa2u Agreement Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residential Tenancy Agreement Template Malaysia | Sewa2u',
    description: 'Generate a residential tenancy agreement. Preview before purchase, download PDF from RM30.',
    images: ['https://sewa2u.com/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sewa2u Agreement Generator',
    url: 'https://sewa2u.com',
    applicationCategory: 'LegalService',
    operatingSystem: 'Any',
    description: 'Generate Malaysia tenancy agreements for residential propertys and private property. Preview before purchase, download from RM30.',
    offers: {
      '@type': 'Offer',
      price: '30',
      priceCurrency: 'MYR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '3',
      bestRating: '5',
      worstRating: '1',
    },
    provider: {
      '@type': 'Organization',
      name: 'Sewa2u',
      url: 'https://sewa2u.com',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Sewa2u Agreement Generator',
    url: 'https://sewa2u.com',
    description: 'Online generator for Malaysia residential tenancy agreements. Preview before purchase, download from RM30.',
    areaServed: {
      '@type': 'Country',
      name: 'Malaysia',
    },
    serviceType: 'Tenancy Agreement Generator',
    availableLanguage: 'English',
    priceRange: 'MYR $0–RM55',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to create a Malaysia tenancy agreement',
    description: 'Generate a legally structured Malaysia tenancy agreement for residential or private property in minutes.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Enter property details', text: 'Select residential property, private condo, landed property, or room rental. Enter the property address and type.' },
      { '@type': 'HowToStep', position: 2, name: 'Add landlord and tenant information', text: 'Enter the full legal names, NRIC/FIN/passport numbers, and contact details for both parties.' },
      { '@type': 'HowToStep', position: 3, name: 'Set rental terms', text: 'Specify the monthly rent, tenancy start and end dates, security deposit amount, and any special clauses such as diplomatic clause or pet policy.' },
      { '@type': 'HowToStep', position: 4, name: 'Review and download your agreement', text: 'Preview the full tenancy agreement before purchase. Download as a ready-to-sign PDF from RM30.' },
    ],
    tool: [{ '@type': 'HowToTool', name: 'Sewa2u Agreement Generator', url: 'https://sewa2u.com' }],
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <Analytics />
      </body>
    </html>
  )
}
