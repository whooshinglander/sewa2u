import { TenancyFormData } from '@/lib/types'
import FormField from './FormField'

type Props = {
  formData: TenancyFormData
  onChange: (updates: Partial<TenancyFormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep2_Property({ formData, onChange, onNext, onBack }: Props) {
  const validate = () => {
    if (!formData.propertyAddress.trim()) return 'Property address is required'
    if (!formData.unitNumber.trim()) return 'Unit number is required'
    if (!/^\d{6}$/.test(formData.postalCode)) return 'Enter a valid 6-digit postal code'
    if (formData.propertyType === 'hdb' && !formData.hdbApprovalObtained) {
      return 'Please confirm HDB subletting approval has been obtained'
    }
    return null
  }

  const handleNext = () => {
    const error = validate()
    if (error) {
      alert(error)
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Property Details</h2>
        <p className="text-slate-500 text-sm">Enter the address of the rental property.</p>
      </div>

      <div className="space-y-4">
        <FormField
          label="Property Address"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={(v) => onChange({ propertyAddress: v })}
          placeholder="e.g. 123 Orchard Road"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Unit Number"
            name="unitNumber"
            value={formData.unitNumber}
            onChange={(v) => onChange({ unitNumber: v })}
            placeholder="e.g. #05-12"
            required
          />
          <FormField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={(v) => onChange({ postalCode: v })}
            placeholder="e.g. 238880"
            required
          />
        </div>

        {formData.propertyType === 'hdb' && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hdbApprovalObtained}
                onChange={(e) => onChange({ hdbApprovalObtained: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-amber-400 text-blue-600"
              />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  I confirm that HDB subletting approval has been obtained <span className="text-red-500">*</span>
                </p>
                <p className="text-xs text-amber-600 mt-0.5">
                  HDB approval is required before subletting your flat.{' '}
                  <a
                    href="https://www.hdb.gov.sg/residential/renting-a-flat/renting-out-a-flat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Apply on HDB portal →
                  </a>
                </p>
              </div>
            </label>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="px-6 py-2.5 border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
