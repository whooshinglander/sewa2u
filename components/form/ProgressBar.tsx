const STEPS = [
  'Property Type',
  'Property Details',
  'Parties',
  'Tenancy Terms',
  'Clauses',
]

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8" role="navigation" aria-label="Form progress">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 z-0" />
        {/* Active line */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-brand-500 to-brand-600 z-0 transition-[width] duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          aria-hidden="true"
        />

        {STEPS.map((label, i) => {
          const step = i + 1
          const isComplete = step < currentStep
          const isCurrent = step === currentStep
          return (
            <div key={step} className="flex flex-col items-center z-10">
              <div
                aria-label={isComplete ? `Step ${step}: ${label} (complete)` : isCurrent ? `Step ${step}: ${label} (current)` : `Step ${step}: ${label}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-[background-color,border-color,box-shadow,color] duration-300
                  ${isComplete ? 'bg-brand-500 border-brand-500 text-white shadow-sm' : ''}
                  ${isCurrent ? 'bg-white border-brand-500 text-brand-600 shadow-sm' : ''}
                  ${!isComplete && !isCurrent ? 'bg-white border-slate-300 text-navy-400' : ''}
                `}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium hidden sm:block transition-colors
                  ${isCurrent ? 'text-brand-600' : isComplete ? 'text-navy-600' : 'text-navy-400'}`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <p className="sm:hidden text-center text-sm text-navy-500 mt-3">
        Step {currentStep} of {STEPS.length}: <span className="font-semibold text-navy-700">{STEPS[currentStep - 1]}</span>
      </p>
    </div>
  )
}
