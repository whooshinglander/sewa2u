import { TenancyFormData, AdditionalTenant } from '@/lib/types'
import FormField from './FormField'

type Props = {
  formData: TenancyFormData
  onChange: (updates: Partial<TenancyFormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep3_Parties({ formData, onChange, onNext, onBack }: Props) {
  const validate = () => {
    if (!formData.landlordName.trim()) return 'Landlord name is required'
    if (!formData.landlordNric.trim()) return 'Landlord NRIC/FIN is required'
    if (!formData.landlordAddress.trim()) return 'Landlord address is required'
    if (!formData.tenantName.trim()) return 'Tenant name is required'
    if (!formData.tenantNric.trim()) return 'Tenant NRIC/FIN/Passport is required'
    if (!formData.tenantEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.tenantEmail)) {
      return 'A valid tenant email is required (PDF will be sent here)'
    }
    return null
  }

  const handleNext = () => {
    const error = validate()
    if (error) { alert(error); return }
    onNext()
  }

  const addTenant = () => {
    if (formData.additionalTenants.length < 2) {
      onChange({ additionalTenants: [...formData.additionalTenants, { name: '', nricPassport: '' }] })
    }
  }

  const updateAdditionalTenant = (index: number, updates: Partial<AdditionalTenant>) => {
    const updated = formData.additionalTenants.map((t, i) => i === index ? { ...t, ...updates } : t)
    onChange({ additionalTenants: updated })
  }

  const removeTenant = (index: number) => {
    onChange({ additionalTenants: formData.additionalTenants.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Parties</h2>
        <p className="text-slate-500 text-sm">Details of the landlord and tenant(s).</p>
      </div>

      {/* Landlord */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Landlord</h3>
        <FormField label="Full Name" name="landlordName" value={formData.landlordName}
          onChange={(v) => onChange({ landlordName: v })} placeholder="As per NRIC" required />
        <FormField label="NRIC / FIN" name="landlordNric" value={formData.landlordNric}
          onChange={(v) => onChange({ landlordNric: v })} placeholder="e.g. S1234567A" required />
        <FormField label="Correspondence Address" name="landlordAddress" value={formData.landlordAddress}
          onChange={(v) => onChange({ landlordAddress: v })} placeholder="Address for notices" required />
      </div>

      <div className="border-t border-slate-100" />

      {/* Primary Tenant */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Tenant</h3>
        <FormField label="Full Name" name="tenantName" value={formData.tenantName}
          onChange={(v) => onChange({ tenantName: v })} placeholder="As per NRIC / Passport" required />
        <FormField label="NRIC / FIN / Passport No." name="tenantNric" value={formData.tenantNric}
          onChange={(v) => onChange({ tenantNric: v })} placeholder="e.g. S1234567A or Passport no." required />
        <FormField label="Email Address" name="tenantEmail" type="email" value={formData.tenantEmail}
          onChange={(v) => onChange({ tenantEmail: v })} placeholder="PDF will be sent here"
          required hint="A copy of the signed PDF will be emailed to this address." />
      </div>

      {/* Additional Tenants */}
      {formData.additionalTenants.map((t, i) => (
        <div key={i} className="space-y-4 bg-slate-50 rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
              Additional Tenant {i + 1}
            </h3>
            <button onClick={() => removeTenant(i)} className="text-xs text-red-500 hover:text-red-700">
              Remove
            </button>
          </div>
          <FormField label="Full Name" name={`addTenantName_${i}`} value={t.name}
            onChange={(v) => updateAdditionalTenant(i, { name: v })} placeholder="As per NRIC / Passport" />
          <FormField label="NRIC / FIN / Passport No." name={`addTenantNric_${i}`} value={t.nricPassport}
            onChange={(v) => updateAdditionalTenant(i, { nricPassport: v })} placeholder="e.g. S1234567A" />
        </div>
      ))}

      {formData.additionalTenants.length < 2 && (
        <button onClick={addTenant}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
          + Add another tenant
        </button>
      )}

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
