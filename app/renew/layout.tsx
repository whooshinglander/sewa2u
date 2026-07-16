import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Renewal of Tenancy Agreement Malaysia — residential & Condo | Sewa2u',
  description: 'Renewal of tenancy agreement in Malaysia made easy. Generate a legally structured residential rental renewal or condo renewal agreement in minutes. Preview before purchase, download from RM30. No agent needed.',
  keywords: 'renewal of tenancy agreement Malaysia, residential rental renewal, renew tenancy agreement Malaysia, tenancy renewal Malaysia, extend tenancy agreement Malaysia, tenancy renewal agreement generator, renew lease Malaysia',
  alternates: {
    canonical: 'https://sewa2u.com/renew',
  },
  openGraph: {
    title: 'Renewal of Tenancy Agreement Malaysia — residential & Condo | Sewa2u',
    description: 'Generate a Malaysia tenancy renewal agreement in minutes. residential rental renewal or private property. Preview before purchase, from RM30.',
    url: 'https://sewa2u.com/renew',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renewal of Tenancy Agreement Malaysia — residential & Condo | Sewa2u',
    description: 'Preview before purchase. Download from RM30. Generate your Malaysia tenancy renewal agreement in minutes.',
  },
}

export default function RenewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
