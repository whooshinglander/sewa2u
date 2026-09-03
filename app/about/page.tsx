import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const URL = 'https://sewa2u.com/about'

export const metadata: Metadata = {
  title: 'About Sewa2u — Who We Are | Sewa2u',
  description: 'Sewa2u is run by an independent developer under Fifteenoneone Private Limited. How our Malaysian tenancy agreements (Bahasa Malaysia and English) are built, verified against LHDN and primary sources, and priced.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sewa2u',
  url: 'https://sewa2u.com',
  description: 'Malaysia tenancy agreement generator in Bahasa Malaysia and English for whole units and rooms.',
  parentOrganization: { '@type': 'Organization', name: 'Fifteenoneone Private Limited' },
  areaServed: 'Malaysian',
}

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-6">About Sewa2u</h1>

        <div className="space-y-6 text-navy-600 leading-relaxed text-[15px]">
          <p>
            Sewa2u is a document tool for Malaysian landlords and tenants: you fill in the terms, we generate a tenancy agreement in Bahasa Malaysia or English — ready to sign, stamp, and use. It started as one builder&apos;s own frustration: trying to rent out a unit in KL, every free template online was either Singapore law with &ldquo;Malaysia&rdquo; pasted over it, or missing the e-stamping basics entirely.
          </p>

          <h2 className="text-lg font-semibold text-navy-800 pt-2">Who runs it</h2>
          <p>
            Sewa2u is built and maintained by Ronald, an independent developer in Singapore, and operated under <strong className="text-navy-800">Fifteenoneone Private Limited</strong> (Singapore) — the same company name you&apos;ll see on your payment receipt. It&apos;s a small portfolio of practical rental tools for Malaysia, Singapore, Thailand and the Philippines; no call center, no sales team — when you email, the person who built the tool answers.
          </p>

          <h2 className="text-lg font-semibold text-navy-800 pt-2">How the documents and guides are kept accurate</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Every fee, rate, and legal point in our guides is checked against <strong className="text-navy-800">primary sources</strong> — the Contracts Act 1950, Stamp Act 1949 and LHDN e-stamping guidance — not copied from other blogs.</li>
            <li>Contract clauses follow standard Malaysian rental practice and the terms you enter on the checkout review screen go into your document verbatim.</li>
            <li>When a law or rate changes, we update the affected guides and note the change — the pages you read carry &ldquo;last checked&rdquo; references to the source.</li>
            <li>We don&apos;t use your data: form answers stay in your browser until you pay, the PDF is generated once for delivery, and we don&apos;t keep or share signed agreements.</li>
          </ul>

          <h2 className="text-lg font-semibold text-navy-800 pt-2">What Sewa2u is not</h2>
          <p>
            We&apos;re not a law firm and this is not legal advice. The generator produces well-structured documents based on common Malaysian practice — for disputes, unusual arrangements, or anything high-value, spend an hour with a qualified Malaysian lawyer. If a guide or clause ever looks out of date, email us and we&apos;ll fix it — corrections from real users have improved every page on this site.
          </p>

          <h2 className="text-lg font-semibold text-navy-800 pt-2">Pricing, plainly</h2>
          <p>
            Standard PDFs are RM30, custom terms RM55, renewals RM30. Preview the full document free before you pay — what you see is exactly what you get.
          </p>

          <h2 className="text-lg font-semibold text-navy-800 pt-2">Renting in another country</h2>
          <p>
            We run the same tool for the other markets:
            <a href="https://sgtenancy.com" className="text-brand-700 hover:underline">Singapore</a> <a href="https://sanyathai.com" className="text-brand-700 hover:underline">Thailand</a> and <a href="https://phlease.com" className="text-brand-700 hover:underline">Philippines</a>.
          </p>

          <p className="text-sm text-navy-400 pt-4">
            Questions, corrections, or partnership ideas: <a href="mailto:whooshinglander@gmail.com" className="text-brand-700 hover:underline">whooshinglander@gmail.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
