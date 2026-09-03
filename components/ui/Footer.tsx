import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white mt-16">
      <div className="container-narrow py-10">
        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8">
          <div className="flex items-center gap-2 text-sm text-navy-400">
            <svg className="w-4 h-4 text-brand-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% Malaysia-focused</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-400">
            <svg className="w-4 h-4 text-brand-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Preview before payment</span>
          </div>
        </div>

        {/* Nav links — 2 rows */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-3">
          <Link href="/tenancy-agreement" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Tenancy Agreement</Link>
          <Link href="/tenancy-agreement" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Guide</Link>
          <Link href="/room-rental-agreement" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Room Rental</Link>
          <Link href="/tenancy-renewal" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Renewal</Link>
          <Link href="/tenancy-agreement-template" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Templates</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
          <Link href="/faq" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">FAQ</Link>
          <Link href="/privacy" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Privacy</Link>
          <Link href="/terms" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Terms</Link>
          <a href="mailto:whooshinglander@gmail.com" className="text-sm text-navy-400 hover:text-brand-600 transition-colors font-medium">Contact</a>
        </div>

        <p className="text-xs text-navy-300 text-center mb-1.5 max-w-lg mx-auto">
          Not legal advice. This tool generates tenancy agreements for reference only. Consult a qualified lawyer for complex tenancy matters.
        </p>
        <p className="text-xs text-navy-300 text-center">
          © {new Date().getFullYear()} Sewa2u · Built for Malaysia landlords and tenants
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
          <a href="https://sgtenancy.com" className="text-sm text-navy-400 hover:text-brand-600 transition-colors">Singapore → SG Tenancy</a>
          <a href="https://sanyathai.com" className="text-sm text-navy-400 hover:text-brand-600 transition-colors">Thailand → SanyaThai</a>
          <a href="https://phlease.com" className="text-sm text-navy-400 hover:text-brand-600 transition-colors">Philippines → PhLease</a>
        </div>
      </div>
    </footer>
  )
}
