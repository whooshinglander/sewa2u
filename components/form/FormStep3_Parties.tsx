import { useState } from 'react'
import { TenancyFormData, AdditionalTenant, AdditionalLandlord } from '@/lib/types'
import FormField from './FormField'

// Validates MY NRIC: 12 digits (YYMMDD-BR-XXXX)
// Returns error string or empty string if valid/empty
function validateNric(value: string): string {
  if (!value.trim()) return ''
  const upper = value.trim().toUpperCase()
  if (/^[STFGM]\d{7}[A-Z]$/.test(upper)) return ''
  // Looks like they tried NRIC/FIN format but it's wrong
  if (/^[STFGM]/i.test(upper) || /^\d/.test(upper)) {
    return 'Enter a valid 12-digit NRIC (e.g. 880101011234)'
  }
  // Otherwise assume passport — no validation
  return ''
}

type Props = {
  formData: TenancyFormData
  onChange: (updates: Partial<TenancyFormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep3_Parties({ formData, onChange, onNext, onBack }: Props) {
  const skipStep = formData.skipParties ?? false
  const [nricErrors, setNricErrors] = useState<Record<string, string>>({})

  const handleNricBlur = (key: string, value: string) => {
    const err = validateNric(value)
    setNricErrors(prev => ({ ...prev, [key]: err }))
  }

  // ── Landlord helpers ──────────────────────────────────────────────────────
  const addLandlord = () => {
    if (formData.additionalLandlords.length < 2) {
      onChange({
        additionalLandlords: [
          ...formData.additionalLandlords,
          { name: '', nric: '' },
        ],
      })
    }
  }
  const updateAdditionalLandlord = (index: number, updates: Partial<AdditionalLandlord>) => {
    const updated = formData.additionalLandlords.map((l, i) => i === index ? { ...l, ...updates } : l)
    onChange({ additionalLandlords: updated })
  }
  const removeLandlord = (index: number) => {
    onChange({ additionalLandlords: formData.additionalLandlords.filter((_, i) => i !== index) })
  }

  // ── Tenant helpers ────────────────────────────────────────────────────────
  const addTenant = () => {
    if (formData.additionalTenants.length < 2) {
      onChange({
        additionalTenants: [
          ...formData.additionalTenants,
          { name: '', nricPassport: '' },
        ],
      })
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
        <h2 className="text-xl font-bold text-navy-800 mb-1">Parties</h2>
        <p className="text-navy-500 text-sm">Details of the landlord(s) and tenant(s).</p>
      </div>

      {/* Skip checkbox */}
      <label className={`flex items-center gap-3 cursor-pointer rounded-xl border-2 px-4 py-3 transition-[border-color,background-color]
        ${skipStep ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
        <input
          type="checkbox"
          checked={skipStep}
          onChange={(e) => onChange({ skipParties: e.target.checked })}
          className="w-4 h-4 rounded text-brand-600"
        />
        <div>
          <p className="text-sm font-semibold text-navy-800">Fill in later</p>
          <p className="text-xs text-navy-500">Skip this step and preview first. Names will show as placeholders.</p>
        </div>
      </label>

      {/* Fields */}
      <div className={`space-y-6 transition-opacity ${skipStep ? 'opacity-40 pointer-events-none select-none' : ''}`}>

        {/* ── Primary Landlord ── */}
        <div className="space-y-4">
          <h3 className="font-semibold text-navy-700 text-sm uppercase tracking-wide">Landlord</h3>
          <FormField label="Full Name" name="landlordName" value={formData.landlordName}
            onChange={(v) => onChange({ landlordName: v })}
            placeholder="e.g. Joseph Lim Zhi Kai"
            autoComplete="name" />
          <FormField label="NRIC / FIN" name="landlordNric" value={formData.landlordNric}
            onChange={(v) => { onChange({ landlordNric: v }); setNricErrors(p => ({ ...p, landlordNric: '' })) }}
            placeholder="e.g. 880101011234"
            autoComplete="off"
            spellCheck={false}
            error={nricErrors.landlordNric}
            onBlur={() => handleNricBlur('landlordNric', formData.landlordNric)} />
          <FormField label="Correspondence Address" name="landlordAddress" value={formData.landlordAddress}
            onChange={(v) => onChange({ landlordAddress: v })}
            placeholder="Address for notices…"
            autoComplete="street-address" />
        </div>

        {/* Additional Landlords */}
        {formData.additionalLandlords.map((l, i) => (
          <div key={i} className="space-y-4 bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-navy-700 text-sm uppercase tracking-wide">
                Additional Landlord {i + 1}
              </h3>
              <button onClick={() => removeLandlord(i)} className="text-xs text-red-500 hover:text-red-700 font-medium" type="button">
                Remove
              </button>
            </div>
            <FormField label="Full Name" name={`addLandlordName_${i}`} value={l.name}
              onChange={(v) => updateAdditionalLandlord(i, { name: v })}
              placeholder="As per NRIC / Passport"
              autoComplete="name" />
            <FormField label="NRIC / FIN" name={`addLandlordNric_${i}`} value={l.nric}
              onChange={(v) => { updateAdditionalLandlord(i, { nric: v }); setNricErrors(p => ({ ...p, [`addLandlordNric_${i}`]: '' })) }}
              placeholder="e.g. 880101011234"
              autoComplete="off"
              spellCheck={false}
              error={nricErrors[`addLandlordNric_${i}`]}
              onBlur={() => handleNricBlur(`addLandlordNric_${i}`, l.nric)} />

          </div>
        ))}

        {formData.additionalLandlords.length < 2 && (
          <button onClick={addLandlord} type="button"
            className="text-sm text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1">
            + Add another landlord
          </button>
        )}

        <div className="border-t border-slate-100" />

        {/* ── Primary Tenant ── */}
        <div className="space-y-4">
          <h3 className="font-semibold text-navy-700 text-sm uppercase tracking-wide">Tenant</h3>
          <FormField label="Full Name" name="tenantName" value={formData.tenantName}
            onChange={(v) => onChange({ tenantName: v })}
            placeholder="e.g. Ahmad bin Ismail"
            autoComplete="name" />
          <FormField label="NRIC / FIN / Passport No." name="tenantNric" value={formData.tenantNric}
            onChange={(v) => { onChange({ tenantNric: v }); setNricErrors(p => ({ ...p, tenantNric: '' })) }}
            placeholder="e.g. 920305021234"
            autoComplete="off"
            spellCheck={false}
            error={nricErrors.tenantNric}
            onBlur={() => handleNricBlur('tenantNric', formData.tenantNric)} />
          <FormField label="Correspondence Address" name="tenantAddress" value={formData.tenantAddress}
            onChange={(v) => onChange({ tenantAddress: v })}
            placeholder="Address for notices…"
            autoComplete="street-address" />
        </div>

        {/* Additional Tenants */}
        {formData.additionalTenants.map((t, i) => (
          <div key={i} className="space-y-4 bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-navy-700 text-sm uppercase tracking-wide">
                Additional Tenant {i + 1}
              </h3>
              <button onClick={() => removeTenant(i)} className="text-xs text-red-500 hover:text-red-700 font-medium" type="button">
                Remove
              </button>
            </div>
            <FormField label="Full Name" name={`addTenantName_${i}`} value={t.name}
              onChange={(v) => updateAdditionalTenant(i, { name: v })}
              placeholder="As per NRIC / Passport"
              autoComplete="name" />
            <FormField label="NRIC / FIN / Passport No." name={`addTenantNric_${i}`} value={t.nricPassport}
              onChange={(v) => { updateAdditionalTenant(i, { nricPassport: v }); setNricErrors(p => ({ ...p, [`addTenantNric_${i}`]: '' })) }}
              placeholder="e.g. 880101011234"
              autoComplete="off"
              spellCheck={false}
              error={nricErrors[`addTenantNric_${i}`]}
              onBlur={() => handleNricBlur(`addTenantNric_${i}`, t.nricPassport)} />

          </div>
        ))}

        {formData.additionalTenants.length < 2 && (
          <button onClick={addTenant} type="button"
            className="text-sm text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1">
            + Add another tenant
          </button>
        )}

      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={onNext} className="btn-primary">Next →</button>
      </div>
    </div>
  )
}
