import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Sewa2u',
  description: 'Privacy policy for Sewa2u — how we handle your data.',
  alternates: { canonical: 'https://sewa2u.com/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-navy-800 mb-6">Privacy Policy</h1>
        <div className="prose prose-slate prose-sm max-w-none space-y-6 text-navy-600 leading-relaxed">
          <p className="text-sm text-navy-400">Last updated: February 2026</p>

          <section>
            <h2 className="text-base font-semibold text-navy-800 mb-2">What we collect</h2>
            <p>Sewa2u does not require account registration. All form data you enter (landlord/tenant names, property details, rental terms) is stored locally in your browser session only and is never transmitted to our servers except when you initiate a PDF download purchase.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-navy-800 mb-2">Payment data</h2>
            <p>Payments are processed by Stripe. We do not store your card details. Stripe's privacy policy applies to payment processing. We receive confirmation of successful payment and the transaction ID only.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-navy-800 mb-2">Analytics</h2>
            <p>We use Google Analytics (GA4) to understand how visitors use the site. This collects anonymised usage data including pages visited, session duration, and general location. No personally identifiable information is collected through analytics.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-navy-800 mb-2">Cookies</h2>
            <p>We use session storage (not cookies) to preserve your form progress across pages. GA4 may set cookies for analytics purposes.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-navy-800 mb-2">Contact</h2>
            <p>For any privacy questions, email <a href="mailto:whooshinglander@gmail.com" className="text-brand-600 hover:underline">whooshinglander@gmail.com</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
