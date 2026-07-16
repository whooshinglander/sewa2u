'use client'

import Link from 'next/link'
import { PropertyType } from '@/lib/types'

type Props = {
  value: PropertyType | null
  onChange: (v: PropertyType) => void
  onContinue: () => void
  onBack?: () => void
}

const OPTIONS = [
  {
    type: 'residential' as PropertyType,
    title: 'Residential Flat',
    subtitle: 'Renting out the entire residential property. Requires property subletting approval.',
    tag: 'Whole Unit',
    icon: (
      <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    type: 'private' as PropertyType,
    title: 'Private Property',
    subtitle: 'Renting out an entire condo, apartment, or landed property.',
    tag: 'Whole Unit',
    icon: (
      <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    type: 'room' as PropertyType,
    title: 'Room Rental',
    subtitle: 'Renting out a single room in a residential or private property. Includes shared facilities and house rules.',
    tag: 'Room Only',
    icon: (
      <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
]

export default function PropertyTypeSelector({ value, onChange, onContinue, onBack }: Props) {
  return (
    <div className="space-y-6">
      <Link
        href="/renew"
        className="block rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 hover:bg-brand-100 transition-colors"
      >
        <span className="font-semibold">Renewing an existing tenancy?</span> Start renewal flow →
      </Link>

      <div>
        <h2 className="text-xl font-bold text-navy-900 mb-1">What type of property?</h2>
        <p className="text-navy-500 text-sm">
          This determines which clauses and rules apply to your tenancy agreement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {OPTIONS.map((opt) => {
          const selected = value === opt.type
          return (
            <button
              key={opt.type}
              onClick={() => onChange(opt.type)}
              aria-pressed={selected}
              className={`text-left p-5 rounded-xl border-2 transition-[border-color,background-color,box-shadow] duration-200
                ${selected
                  ? 'border-brand-500 bg-brand-50/50 shadow-card-hover'
                  : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/20'
                }`}
              style={{ touchAction: 'manipulation' }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3
                ${selected ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-navy-500'}`}>
                {opt.icon}
              </div>
              <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-2
                ${selected ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-navy-500'}`}>
                {opt.tag}
              </span>
              <div className={`font-semibold text-base mb-1 ${selected ? 'text-brand-800' : 'text-navy-900'}`}>
                {opt.title}
              </div>
              <div className="text-sm text-navy-500 leading-snug">{opt.subtitle}</div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3 pt-2">
        {onBack && (
          <button onClick={onBack} className="btn-secondary">
            ← Back
          </button>
        )}
        {value && (
          <button onClick={onContinue} className="btn-primary">
            Continue →
          </button>
        )}
      </div>

      <p className="text-center text-xs text-navy-400 pt-2">
        New agreement flow
      </p>
    </div>
  )
}
