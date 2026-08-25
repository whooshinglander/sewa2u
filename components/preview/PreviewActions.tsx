'use client'

import { useRouter } from 'next/navigation'

type Props = {
  hasCustomClauses: boolean
  onEdit: (step?: number) => void
}

export default function PreviewActions({ hasCustomClauses, onEdit }: Props) {
  const router = useRouter()

  const handleCheckout = (tier: 'standard' | 'custom') => {
    sessionStorage.setItem('sewa2u_tier', tier)
    router.push('/checkout')
  }

  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Primary CTA + (optional) Custom upsell */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleCheckout('standard')}
            className="flex-1 flex items-center justify-between px-5 py-4 bg-brand-600 text-white rounded-xl hover:bg-brand-700 active:bg-brand-800 transition-colors shadow-sm"
          >
            <div className="text-left">
              <p className="text-base font-semibold leading-tight">Download my agreement</p>
              <p className="text-xs text-brand-100 leading-tight mt-0.5">All required SG legal clauses included</p>
            </div>
            <span className="text-xl font-bold ml-4 whitespace-nowrap">RM30</span>
          </button>

          {hasCustomClauses && (
            <button
              onClick={() => handleCheckout('custom')}
              className="sm:max-w-[220px] flex items-center justify-between px-4 py-3 bg-slate-100 text-navy-800 rounded-xl hover:bg-slate-200 transition-colors border border-slate-200"
            >
              <div className="text-left">
                <p className="text-sm font-semibold leading-tight">Add custom clauses</p>
                <p className="text-xs text-navy-500 leading-tight mt-0.5">Includes your additions</p>
              </div>
              <span className="text-base font-bold ml-3 whitespace-nowrap">RM55</span>
            </button>
          )}
        </div>

        {!hasCustomClauses && (
          <button
            onClick={() => onEdit(5)}
            className="block mt-2 text-xs text-navy-500 hover:text-brand-700 underline w-full text-center transition-colors"
          >
            Need custom clauses (diplomatic, pet, special conditions)? Add at Step 5 (+$8)
          </button>
        )}

        {/* Payment method icons */}
        <div className="mt-3 flex items-center justify-center gap-3 text-xs text-navy-500 flex-wrap">
          <span className="font-medium">Pay with</span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">💳</span>
            <span>Card</span>
          </span>
          <span className="text-navy-300">·</span>
          <span className="text-navy-300">·</span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">🟢</span>
            <span>Card</span>
          </span>
          <span className="text-navy-300 hidden sm:inline">·</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span aria-hidden="true">🍎</span>
            <span>Apple Pay</span>
          </span>
        </div>

        {/* Trust line + edit link */}
        <div className="mt-2 flex items-center justify-between gap-3 flex-wrap">
          <button onClick={() => onEdit()} className="text-xs text-navy-500 hover:text-brand-700 underline transition-colors">
            ← Edit details
          </button>
          <p className="text-xs text-navy-500 flex items-center gap-1.5">
            <span aria-hidden="true">🔒</span>
            <span>Stripe-secured · residential &amp; LHDN compliant</span>
          </p>
        </div>
      </div>
    </div>
  )
}
