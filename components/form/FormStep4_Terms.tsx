import { TenancyFormData } from '@/lib/types'
import FormField from './FormField'

type Props = {
  formData: TenancyFormData
  onChange: (updates: Partial<TenancyFormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep4_Terms({ formData, onChange, onNext, onBack }: Props) {
  const validate = () => {
    if (!formData.commencementDate) return 'Commencement date is required'
    if (!formData.expiryDate) return 'Expiry date is required'
    if (formData.expiryDate <= formData.commencementDate) return 'Expiry date must be after commencement date'
    if (!formData.monthlyRent || Number(formData.monthlyRent) <= 0) return 'Monthly rent is required'
    if (!formData.securityDeposit || Number(formData.securityDeposit) <= 0) return 'Security deposit is required'
    return null
  }

  const handleNext = () => {
    const error = validate()
    if (error) { alert(error); return }
    onNext()
  }

  const handleRentChange = (v: string) => {
    const rent = v === '' ? '' : Number(v)
    onChange({
      monthlyRent: rent,
      securityDeposit: formData.securityDeposit === formData.monthlyRent ? rent : formData.securityDeposit,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Tenancy Terms</h2>
        <p className="text-slate-500 text-sm">Dates, rent, and conditions of the lease.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Commencement Date" name="commencementDate" type="date"
          value={formData.commencementDate} onChange={(v) => onChange({ commencementDate: v })} required />
        <FormField label="Expiry Date" name="expiryDate" type="date"
          value={formData.expiryDate} onChange={(v) => onChange({ expiryDate: v })} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Monthly Rent (SGD)" name="monthlyRent" type="number"
          value={formData.monthlyRent} onChange={handleRentChange}
          placeholder="e.g. 3500" required />
        <FormField label="Security Deposit (SGD)" name="securityDeposit" type="number"
          value={formData.securityDeposit}
          onChange={(v) => onChange({ securityDeposit: v === '' ? '' : Number(v) })}
          placeholder="e.g. 3500"
          hint="Typically 1 month's rent" required />
      </div>

      {/* IRAS info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <span className="text-blue-500 text-lg flex-shrink-0">ℹ️</span>
        <div>
          <p className="text-sm font-medium text-blue-800">Stamp Duty Required by IRAS</p>
          <p className="text-xs text-blue-600 mt-0.5">
            Tenancy agreements must be stamped within 14 days of signing. Stamp duty is calculated on the annual rent.{' '}
            <a href="https://www.iras.gov.sg/taxes/stamp-duty/for-property/renting-a-property/renting-residential-property"
              target="_blank" rel="noopener noreferrer" className="underline font-medium">
              Calculate on IRAS website →
            </a>
          </p>
        </div>
      </div>

      <FormField label="Handover Condition" name="handoverCondition" value={formData.handoverCondition}
        onChange={(v) => onChange({ handoverCondition: v as TenancyFormData['handoverCondition'] })}>
        <select
          value={formData.handoverCondition}
          onChange={(e) => onChange({ handoverCondition: e.target.value as TenancyFormData['handoverCondition'] })}
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        >
          <option value="furnished">Furnished</option>
          <option value="partial">Partially Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </FormField>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Lease Renewal Option</p>
        <div className="flex gap-4">
          {[
            { label: 'Yes — tenant has first right of renewal', value: true },
            { label: 'No', value: false },
          ].map((opt) => (
            <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={formData.leaseRenewalOption === opt.value}
                onChange={() => onChange({ leaseRenewalOption: opt.value })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-slate-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack}
          className="px-6 py-2.5 border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors">
          ← Back
        </button>
        <button onClick={handleNext}
          className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Next →
        </button>
      </div>
    </div>
  )
}
