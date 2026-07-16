'use client'

import { useRouter } from 'next/navigation'

type Props = {
  onNewTA: () => void
}

export default function StepZero({ onNewTA }: Props) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy-900 mb-1">What do you need?</h2>
        <p className="text-navy-500 text-sm">Choose one to get started.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* New TA */}
        <button
          onClick={onNewTA}
          className="text-left p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-brand-400 hover:bg-brand-50/30 transition-[border-color,background-color] duration-200 group"
          style={{ touchAction: 'manipulation' }}
        >
          <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-[background-color]">
            <svg className="w-5 h-5 text-brand-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="font-semibold text-navy-900 mb-1">New Tenancy Agreement</p>
          <p className="text-sm text-navy-500 leading-snug">
            Generate a fresh TA for a new tenancy. residential, private property, or room rental.
          </p>
        </button>

        {/* Extend / Renew */}
        <button
          onClick={() => router.push('/renew')}
          className="text-left p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-brand-400 hover:bg-brand-50/30 transition-[border-color,background-color] duration-200 group"
          style={{ touchAction: 'manipulation' }}
        >
          <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-[background-color]">
            <svg className="w-5 h-5 text-brand-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="font-semibold text-navy-900 mb-1">Extend or Renew</p>
          <p className="text-sm text-navy-500 leading-snug">
            Already have a signed TA? Generate a 1-page extension addendum with new dates and updated rent.
          </p>
        </button>
      </div>
    </div>
  )
}
