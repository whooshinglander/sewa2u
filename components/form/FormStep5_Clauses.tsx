import { TenancyFormData } from '@/lib/types'

type Props = {
  formData: TenancyFormData
  onChange: (updates: Partial<TenancyFormData>) => void
  onPreview: () => void
  onBack: () => void
}

type ClauseOption = {
  id: string
  label: string
  hasInput?: { type: 'number' | 'text'; placeholder: string; field: keyof TenancyFormData }
}

const CLAUSE_OPTIONS: ClauseOption[] = [
  { id: 'UTIL_CAP', label: 'Utilities capped at SGD ___ per month', hasInput: { type: 'number', placeholder: 'e.g. 200', field: 'utilityCap' } },
  { id: 'AIRCON_TENANT', label: 'Aircon servicing by tenant every 3 months' },
  { id: 'AIRCON_LANDLORD', label: 'Aircon servicing by landlord' },
  { id: 'NO_SMOKING', label: 'No smoking on premises' },
  { id: 'NO_PETS', label: 'No pets allowed' },
  { id: 'PETS_ALLOWED', label: 'Pets allowed (specify type/breed)', hasInput: { type: 'text', placeholder: 'e.g. one small dog', field: 'petDescription' } },
  { id: 'LANDLORD_ACCESS', label: 'Landlord access with 24-hour notice' },
  { id: 'MINOR_REPAIRS', label: 'Tenant responsible for minor repairs up to $150' },
  { id: 'NO_SUBLET', label: 'No subletting without landlord written consent' },
  { id: 'ORIGINAL_CONDITION', label: 'Property to be returned in original condition' },
]

export default function FormStep5_Clauses({ formData, onChange, onPreview, onBack }: Props) {
  const toggleClause = (id: string) => {
    const current = formData.customClauses
    const updated = current.includes(id) ? current.filter((c) => c !== id) : [...current, id]
    onChange({ customClauses: updated })
  }

  const isChecked = (id: string) => formData.customClauses.includes(id)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Additional Clauses</h2>
        <p className="text-slate-500 text-sm">Customise your agreement with specific conditions.</p>
      </div>

      {/* Pricing banner */}
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Custom clauses included in Professional PDF</p>
            <p className="text-xs text-slate-600 mt-0.5">
              <span className="font-medium text-blue-700">Standard PDF ($10)</span> — standard clauses only ·{' '}
              <span className="font-medium text-blue-700">Custom PDF ($18)</span> — your selected + custom clauses included
            </p>
          </div>
        </div>
      </div>

      {/* Diplomatic Clause */}
      <div className="bg-slate-50 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.diplomaticClause}
            onChange={(e) => onChange({ diplomaticClause: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded text-blue-600"
          />
          <div>
            <p className="text-sm font-semibold text-slate-800">Diplomatic Clause</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Allows early termination if the tenant is repatriated, transferred, or their employment in Singapore ends.
              Typically activates after the first 12 months with 2 months&apos; written notice.
            </p>
          </div>
        </label>
      </div>

      {/* Clause checkboxes */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">Standard Custom Clauses</p>
        {CLAUSE_OPTIONS.map((opt) => {
          // Prevent conflicting clauses
          if (opt.id === 'NO_PETS' && isChecked('PETS_ALLOWED')) return null
          if (opt.id === 'PETS_ALLOWED' && isChecked('NO_PETS')) return null
          if (opt.id === 'AIRCON_LANDLORD' && isChecked('AIRCON_TENANT')) return null
          if (opt.id === 'AIRCON_TENANT' && isChecked('AIRCON_LANDLORD')) return null

          return (
            <div key={opt.id}>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked(opt.id)}
                  onChange={() => toggleClause(opt.id)}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 leading-snug">
                  {opt.label}
                </span>
              </label>
              {opt.hasInput && isChecked(opt.id) && (
                <div className="ml-7 mt-2">
                  <input
                    type={opt.hasInput.type}
                    placeholder={opt.hasInput.placeholder}
                    value={formData[opt.hasInput.field] as string | number}
                    onChange={(e) => onChange({ [opt.hasInput!.field]: opt.hasInput!.type === 'number' ? Number(e.target.value) : e.target.value })}
                    className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white w-48"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Free-text clause */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Add your own clause <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={formData.freeTextClause}
          onChange={(e) => onChange({ freeTextClause: e.target.value })}
          placeholder="e.g. Tenant shall ensure bins are returned inside the unit on the same day as collection."
          rows={3}
          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white resize-none"
        />
        <p className="text-xs text-slate-400">Write the clause in plain English. It will be formatted and included as-is.</p>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack}
          className="px-6 py-2.5 border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors">
          ← Back
        </button>
        <button onClick={onPreview}
          className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Preview Contract →
        </button>
      </div>
    </div>
  )
}
