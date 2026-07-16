'use client'

import { useState } from 'react'
import { TenancyFormData, Occupant } from '@/lib/types'

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
  privateOnly?: boolean
}

const CLAUSE_OPTIONS: ClauseOption[] = [
  { id: 'UTIL_CAP', label: 'Utilities capped at MYR ___ per month', hasInput: { type: 'number', placeholder: 'e.g. 200', field: 'utilityCap' } },
  { id: 'AIRCON_TENANT', label: 'Aircon servicing by tenant every 3 months' },
  { id: 'AIRCON_LANDLORD', label: 'Aircon servicing by landlord' },
  { id: 'NO_SMOKING', label: 'No smoking on premises' },
  { id: 'NO_PETS', label: 'No pets allowed' },
  { id: 'PETS_ALLOWED', label: 'Pets allowed (specify type/breed)', hasInput: { type: 'text', placeholder: 'e.g. one small dog', field: 'petDescription' } },
  { id: 'LANDLORD_ACCESS', label: 'Landlord access with 24-hour notice' },
  { id: 'MINOR_REPAIRS', label: 'Tenant responsible for minor repairs up to MYR ___', hasInput: { type: 'number', placeholder: 'e.g. 150', field: 'minorRepairThreshold' } },
  { id: 'NO_SUBLET', label: 'No subletting without landlord written consent' },
  { id: 'ORIGINAL_CONDITION', label: 'Property to be returned in original condition' },
  { id: 'NO_NAILS', label: 'No nails/screws on walls without consent (patch on exit)' },
  { id: 'VIEWING_CLAUSE', label: 'Landlord may show property to prospects in last 2 months' },
  { id: 'PURCHASE_CLAUSE', label: 'Tenant may exit TA early if they purchase a property (notice: ___ months)', hasInput: { type: 'number', placeholder: 'e.g. 2', field: 'purchaseNoticeMonths' } },
  { id: 'GARDEN_MAINTENANCE', label: 'Garden & boundary maintenance by tenant', privateOnly: true },
  { id: 'POOL_MAINTENANCE', label: 'Swimming pool servicing contract required', privateOnly: true },
  { id: 'AUTO_GATE', label: 'Auto-gate servicing contract required', privateOnly: true },
] as const

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
        <h2 className="text-xl font-bold text-navy-800 mb-1">Additional Clauses</h2>
        <p className="text-navy-500 text-sm">Customise your agreement with specific conditions.</p>
      </div>

      {/* Pricing banner */}
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-navy-800">Custom clauses included in Professional PDF</p>
            <p className="text-xs text-navy-600 mt-0.5">
              <span className="font-medium text-brand-700">Standard PDF (RM30)</span> — standard clauses only ·{' '}
              <span className="font-medium text-brand-700">Custom PDF (RM55)</span> — your selected + custom clauses included
            </p>
          </div>
        </div>
      </div>

      {/* Diplomatic Clause */}
      <div className="bg-slate-50 rounded-lg p-4 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.diplomaticClause}
            onChange={(e) => onChange({ diplomaticClause: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded text-brand-600"
          />
          <div>
            <p className="text-sm font-semibold text-navy-800">Diplomatic Clause</p>
            <p className="text-xs text-navy-500 mt-0.5 leading-relaxed">
              Allows early termination if the tenant is repatriated, transferred, or their employment in Malaysia ends.
            </p>
          </div>
        </label>
        {formData.diplomaticClause && (
          <div className="ml-7 grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="diplomaticMinMonths" className="text-xs font-medium text-navy-600">Activates after (months)</label>
              <input
                id="diplomaticMinMonths"
                name="diplomaticMinMonths"
                type="number"
                inputMode="numeric"
                autoComplete="off"
                value={formData.diplomaticMinMonths}
                onChange={(e) => onChange({ diplomaticMinMonths: e.target.value === '' ? '' : Number(e.target.value) })}
                placeholder="e.g. 12"
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="diplomaticNoticeMonths" className="text-xs font-medium text-navy-600">Notice period (months)</label>
              <input
                id="diplomaticNoticeMonths"
                name="diplomaticNoticeMonths"
                type="number"
                inputMode="numeric"
                autoComplete="off"
                value={formData.diplomaticNoticeMonths}
                onChange={(e) => onChange({ diplomaticNoticeMonths: e.target.value === '' ? '' : Number(e.target.value) })}
                placeholder="e.g. 2"
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Authorised Occupants */}
      <div className="bg-slate-50 rounded-lg p-4 space-y-3">
        <div>
          <p className="text-sm font-semibold text-navy-800">Authorised Occupants <span className="text-navy-400 font-normal">(optional)</span></p>
          <p className="text-xs text-navy-500 mt-0.5">List all persons who will occupy the property. Required for immigration compliance.</p>
        </div>
        {formData.occupants.map((occ, idx) => (
          <div key={idx} className="ml-0 grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-end">
            <div className="flex flex-col gap-1">
              {idx === 0 && <label htmlFor={`occupantName_0`} className="text-xs font-medium text-navy-600">Name</label>}
              <input
                id={idx === 0 ? `occupantName_0` : undefined}
                name={`occupantName_${idx}`}
                type="text"
                autoComplete="name"
                aria-label={idx > 0 ? `Occupant ${idx + 1} full name` : undefined}
                value={occ.name}
                onChange={(e) => {
                  const updated = [...formData.occupants]
                  updated[idx] = { ...updated[idx], name: e.target.value }
                  onChange({ occupants: updated })
                }}
                placeholder="Full name"
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow]"
              />
            </div>
            <div className="flex flex-col gap-1">
              {idx === 0 && <label htmlFor={`occupantNric_0`} className="text-xs font-medium text-navy-600">NRIC/FIN/Passport</label>}
              <input
                id={idx === 0 ? `occupantNric_0` : undefined}
                name={`occupantNric_${idx}`}
                type="text"
                autoComplete="off"
                spellCheck={false}
                aria-label={idx > 0 ? `Occupant ${idx + 1} NRIC/FIN/Passport` : undefined}
                value={occ.nric}
                onChange={(e) => {
                  const updated = [...formData.occupants]
                  updated[idx] = { ...updated[idx], nric: e.target.value }
                  onChange({ occupants: updated })
                }}
                placeholder="ID number"
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow]"
              />
            </div>
            <div className="flex flex-col gap-1">
              {idx === 0 && <label htmlFor={`occupantRelation_0`} className="text-xs font-medium text-navy-600">Relation</label>}
              <select
                id={idx === 0 ? `occupantRelation_0` : undefined}
                name={`occupantRelation_${idx}`}
                aria-label={idx > 0 ? `Occupant ${idx + 1} relation` : undefined}
                value={occ.relation}
                onChange={(e) => {
                  const updated = [...formData.occupants]
                  updated[idx] = { ...updated[idx], relation: e.target.value }
                  onChange({ occupants: updated })
                }}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow]"
              >
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Helper">Helper</option>
                <option value="Colleague">Colleague</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                const updated = formData.occupants.filter((_, i) => i !== idx)
                onChange({ occupants: updated })
              }}
              aria-label={`Remove occupant ${idx + 1}`}
              className="px-2 py-1.5 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-[color,background-color]"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            onChange({ occupants: [...formData.occupants, { name: '', nric: '', relation: 'Spouse' }] })
          }}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          + Add Occupant
        </button>
      </div>

      {/* Clause checkboxes */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy-700">Standard Custom Clauses</p>
        {CLAUSE_OPTIONS.map((opt) => {
          // Prevent conflicting clauses
          if (opt.id === 'NO_PETS' && isChecked('PETS_ALLOWED')) return null
          if (opt.id === 'PETS_ALLOWED' && isChecked('NO_PETS')) return null
          if (opt.id === 'AIRCON_LANDLORD' && isChecked('AIRCON_TENANT')) return null
          if (opt.id === 'AIRCON_TENANT' && isChecked('AIRCON_LANDLORD')) return null
          // Private-only clauses hidden for residential/room
          if (opt.privateOnly && formData.propertyType !== 'private') return null

          return (
            <div key={opt.id}>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked(opt.id)}
                  onChange={() => toggleClause(opt.id)}
                  className="mt-0.5 w-4 h-4 rounded text-brand-600"
                />
                <span className="text-sm text-navy-700 group-hover:text-slate-900 leading-snug">
                  {opt.label}
                </span>
              </label>
              {opt.hasInput && isChecked(opt.id) && (
                <div className="ml-7 mt-2">
                  <input
                    type={opt.hasInput.type}
                    name={opt.hasInput.field as string}
                    aria-label={opt.label}
                    autoComplete="off"
                    inputMode={opt.hasInput.type === 'number' ? 'numeric' : 'text'}
                    placeholder={opt.hasInput.placeholder}
                    value={formData[opt.hasInput.field] as string | number}
                    onChange={(e) => onChange({ [opt.hasInput!.field]: opt.hasInput!.type === 'number' ? Number(e.target.value) : e.target.value })}
                    className="px-3 py-1.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow] w-48"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Free-text clause */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700">
          Add your own clause <span className="text-navy-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="freeTextClause"
          name="freeTextClause"
          aria-label="Custom clause in plain English"
          value={formData.freeTextClause}
          onChange={(e) => onChange({ freeTextClause: e.target.value })}
          placeholder="e.g. The tenant has to put the bins back inside on collection day…"
          rows={4}
          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white resize-none transition-[border-color,box-shadow]"
        />
        <p className="text-xs text-navy-400">Type in plain English — describe your clause and it will appear as written in the contract.</p>
      </div>


      <div className="flex gap-3 pt-2">
        <button onClick={onBack}
          className="btn-secondary">
          ← Back
        </button>
        <button onClick={onPreview}
          className="btn-primary">
          Preview Contract →
        </button>
      </div>
    </div>
  )
}
