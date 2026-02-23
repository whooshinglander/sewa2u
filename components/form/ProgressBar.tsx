const STEPS = [
  'Property Type',
  'Property Details',
  'Parties',
  'Tenancy Terms',
  'Clauses',
]

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 z-0" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-blue-500 z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((label, i) => {
          const step = i + 1
          const isComplete = step < currentStep
          const isCurrent = step === currentStep
          return (
            <div key={step} className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                  ${isComplete ? 'bg-blue-500 border-blue-500 text-white' : ''}
                  ${isCurrent ? 'bg-white border-blue-500 text-blue-600' : ''}
                  ${!isComplete && !isCurrent ? 'bg-white border-slate-300 text-slate-400' : ''}
                `}
              >
                {isComplete ? '✓' : step}
              </div>
              <span
                className={`mt-1 text-xs font-medium hidden sm:block ${
                  isCurrent ? 'text-blue-600' : isComplete ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <p className="sm:hidden text-center text-sm text-slate-500 mt-3">
        Step {currentStep} of {STEPS.length}: <span className="font-medium text-slate-700">{STEPS[currentStep - 1]}</span>
      </p>
    </div>
  )
}
