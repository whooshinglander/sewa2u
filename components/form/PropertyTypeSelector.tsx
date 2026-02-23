import { PropertyType } from '@/lib/types'

type Props = {
  value: PropertyType | null
  onChange: (v: PropertyType) => void
  onContinue: () => void
}

const OPTIONS = [
  {
    type: 'hdb' as PropertyType,
    emoji: '🏢',
    title: 'HDB Flat',
    subtitle: 'Requires HDB approval for subletting. Additional HDB-specific clauses apply.',
  },
  {
    type: 'private' as PropertyType,
    emoji: '🏙️',
    title: 'Private Property',
    subtitle: 'No HDB approval needed. Standard tenancy agreement applies.',
  },
]

export default function PropertyTypeSelector({ value, onChange, onContinue }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">What type of property?</h2>
        <p className="text-slate-500 text-sm">
          This determines which clauses and rules apply to your tenancy agreement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map((opt) => {
          const selected = value === opt.type
          return (
            <button
              key={opt.type}
              onClick={() => onChange(opt.type)}
              className={`text-left p-5 rounded-xl border-2 transition-all hover:border-blue-400 hover:bg-blue-50
                ${selected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-slate-200 bg-white'
                }`}
            >
              <div className="text-4xl mb-3">{opt.emoji}</div>
              <div className="font-semibold text-slate-800 mb-1">{opt.title}</div>
              <div className="text-sm text-slate-500 leading-snug">{opt.subtitle}</div>
            </button>
          )
        })}
      </div>

      {value && (
        <div className="pt-2">
          <button
            onClick={onContinue}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
