'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/faq', label: 'FAQ' },
  { href: '/tenancy-agreement', label: 'Guide' },
  { href: '/room-rental-agreement', label: 'Room Rental' },
  { href: '/renew', label: 'Renew' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - agent referral removed for Malaysia launch */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-100/60">
      <div className="container-narrow py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3 group" onClick={(e) => {
            e.preventDefault()
            localStorage.removeItem('sewa2u_form')
            localStorage.removeItem('sewa2u_step')
            sessionStorage.removeItem('sewa2u_form')
            sessionStorage.removeItem('sewa2u_step')
            if (pathname === '/') {
              // Already on home — force a full remount by reloading the page state
              window.location.href = '/'
            } else {
              router.push('/')
            }
          }}>
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-[box-shadow]">
            <svg className="w-4.5 h-4.5 text-white" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <span className="block text-base font-bold text-navy-900 leading-tight tracking-tight">
              Sewa2u
            </span>
            <p className="text-2xs text-navy-500 hidden sm:block font-medium">
              Malaysia Residential Rental Agreements
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors
                  ${active
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-navy-400 hover:text-brand-600 hover:bg-brand-50/50'}`}>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-navy-50 transition-[background-color]"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{ touchAction: 'manipulation' }}>
          <svg className="w-5 h-5 text-navy-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-navy-100 bg-white animate-fade-in">
          <div className="container-narrow py-2 flex flex-col">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link key={href} href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors
                    ${active
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-navy-500 hover:bg-navy-50'}`}>
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </div>
    </header>
  )
}
