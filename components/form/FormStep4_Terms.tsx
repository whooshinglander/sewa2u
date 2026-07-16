import { TenancyFormData, InventoryItem } from '@/lib/types'
import FormField from './FormField'
import { useState } from 'react'

type Props = {
  formData: TenancyFormData
  onChange: (updates: Partial<TenancyFormData>) => void
  onNext: () => void
  onBack: () => void
}

const PRESET_ITEMS = [
  'Sofa', 'Dining Table & Chairs', 'Coffee Table', 'TV Console',
  'Television', 'Refrigerator', 'Washing Machine', 'Dryer',
  'Microwave', 'Oven', 'Dishwasher', 'Water Heater',
  'Bed Frame (Master)', 'Mattress (Master)', 'Wardrobe (Master)',
  'Bed Frame (Room 2)', 'Mattress (Room 2)', 'Wardrobe (Room 2)',
  'Study Desk & Chair', 'Shoe Cabinet', 'Curtains/Blinds',
]

const CONDITIONS: { value: InventoryItem['condition']; label: string; color: string }[] = [
  { value: 'good', label: 'Good', color: 'text-green-700 bg-green-50 border-green-300' },
  { value: 'fair', label: 'Fair', color: 'text-amber-700 bg-amber-50 border-amber-300' },
  { value: 'poor', label: 'Poor', color: 'text-red-700 bg-red-50 border-red-300' },
]

export default function FormStep4_Terms({ formData, onChange, onNext, onBack }: Props) {
  const [customItem, setCustomItem] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const skipStep = formData.skipTerms ?? false
  const showInventory = !skipStep && (formData.handoverCondition === 'furnished' || formData.handoverCondition === 'partial')

  const validate = () => {
    if (!formData.commencementDate) return 'Commencement date is required'
    if (!formData.expiryDate) return 'Expiry date is required'
    if (formData.expiryDate <= formData.commencementDate) return 'Expiry date must be after commencement date'
    if (!formData.monthlyRent || Number(formData.monthlyRent) <= 0) return 'Monthly rent is required'
    if (!formData.securityDeposit || Number(formData.securityDeposit) <= 0) return 'Security deposit is required'
    return null
  }

  const handleNext = () => {
    if (skipStep) { onNext(); return }
    const error = validate()
    if (error) { setErrors([error]); return }
    setErrors([])
    onNext()
  }

  const handleRentChange = (v: string) => {
    const rent = v === '' ? '' : Number(v)
    onChange({
      monthlyRent: rent,
      securityDeposit: formData.securityDeposit === formData.monthlyRent ? rent : formData.securityDeposit,
    })
  }

  const togglePresetItem = (name: string) => {
    const exists = formData.inventoryItems.find(i => i.name === name)
    if (exists) {
      onChange({ inventoryItems: formData.inventoryItems.filter(i => i.name !== name) })
    } else {
      onChange({ inventoryItems: [...formData.inventoryItems, { name, condition: 'good' }] })
    }
  }

  const updateCondition = (name: string, condition: InventoryItem['condition']) => {
    onChange({
      inventoryItems: formData.inventoryItems.map(i => i.name === name ? { ...i, condition } : i)
    })
  }

  const addCustomItem = () => {
    const trimmed = customItem.trim()
    if (!trimmed || formData.inventoryItems.find(i => i.name === trimmed)) return
    onChange({ inventoryItems: [...formData.inventoryItems, { name: trimmed, condition: 'good' }] })
    setCustomItem('')
  }

  const removeItem = (name: string) => {
    onChange({ inventoryItems: formData.inventoryItems.filter(i => i.name !== name) })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy-800 mb-1">Tenancy Terms</h2>
        <p className="text-navy-500 text-sm">Dates, rent, and conditions of the lease.</p>
      </div>

      {/* Skip checkbox */}
      <label className={`flex items-center gap-3 cursor-pointer rounded-xl border-2 px-4 py-3 transition-[border-color,background-color]
        ${skipStep ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
        <input
          type="checkbox"
          checked={skipStep}
          onChange={(e) => onChange({ skipTerms: e.target.checked })}
          className="w-4 h-4 rounded text-brand-600"
        />
        <div>
          <p className="text-sm font-semibold text-navy-800">Fill in later</p>
          <p className="text-xs text-navy-500">Skip to preview the contract structure first. Dates and rent will show as placeholders.</p>
        </div>
      </label>

      {/* Fields */}
      <div className={`space-y-6 transition-opacity ${skipStep ? 'opacity-40 pointer-events-none select-none' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Commencement Date" name="commencementDate" type="date"
            value={formData.commencementDate}
            onChange={(v) => {
              onChange({ commencementDate: v })
              // Auto-suggest expiry at +12 months if not already set
              if (v && !formData.expiryDate) {
                const d = new Date(v)
                d.setFullYear(d.getFullYear() + 1)
                d.setDate(d.getDate() - 1)
                onChange({ commencementDate: v, expiryDate: d.toISOString().split('T')[0] })
              }
            }} required />
          <FormField label="Expiry Date" name="expiryDate" type="date"
            value={formData.expiryDate} onChange={(v) => onChange({ expiryDate: v })}
            hint={formData.commencementDate && formData.expiryDate ? `${Math.round((new Date(formData.expiryDate).getTime() - new Date(formData.commencementDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44))} months` : undefined}
            required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Monthly Rent (MYR)" name="monthlyRent" type="number"
            value={formData.monthlyRent} onChange={handleRentChange}
            placeholder="e.g. 3500" required
            autoComplete="off"
            inputMode="numeric" />
          <FormField label="Security Deposit (MYR)" name="securityDeposit" type="number"
            value={formData.securityDeposit}
            onChange={(v) => onChange({ securityDeposit: v === '' ? '' : Number(v) })}
            placeholder="e.g. 3500" hint="Typically 1 month's rent" required
            autoComplete="off"
            inputMode="numeric" />
        </div>

        {/* Rent payment day */}
        <FormField label="Rent Due On (day of month)" name="rentPaymentDay" type="number"
          value={formData.rentPaymentDay} onChange={(v) => onChange({ rentPaymentDay: v === '' ? '' : Number(v) })}
          placeholder="e.g. 1" hint="Day of each month rent is payable (1–28)"
          autoComplete="off"
          inputMode="numeric" />

        {/* LHDN info */}
        <div className="bg-brand-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <div className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-brand-800">Stamp Duty Required by LHDN</p>
            <p className="text-xs text-brand-600 mt-0.5">
              Must be stamped within 30 days of signing.{' '}
              <a href="https://www.hasil.gov.my/en/individual/duties/stamp-duty/lease-or-tenancy-agreement"
                target="_blank" rel="noopener noreferrer" className="underline font-medium">
                Calculate on LHDN →
              </a>
            </p>
          </div>
        </div>

        <FormField label="Handover Condition" name="handoverCondition" value={formData.handoverCondition}
          onChange={(v) => onChange({ handoverCondition: v as TenancyFormData['handoverCondition'] })}>
          <select
            value={formData.handoverCondition}
            onChange={(e) => onChange({ handoverCondition: e.target.value as TenancyFormData['handoverCondition'] })}
            aria-label="Handover condition"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-[border-color,box-shadow]"
          >
            <option value="furnished">Furnished</option>
            <option value="partial">Partially Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </FormField>

        {/* Bank payment details */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-navy-700">Payment Details <span className="text-navy-400 font-normal">(optional — for GIRO/bank transfer)</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormField label="Bank Name" name="paymentBank" value={formData.paymentBank}
              onChange={(v) => onChange({ paymentBank: v })} placeholder="e.g. DBS"
              autoComplete="off" />
            <FormField label="Account Name" name="paymentAccountName" value={formData.paymentAccountName}
              onChange={(v) => onChange({ paymentAccountName: v })} placeholder="e.g. Joseph Lim"
              autoComplete="off" />
            <FormField label="Account Number" name="paymentAccountNo" value={formData.paymentAccountNo}
              onChange={(v) => onChange({ paymentAccountNo: v })} placeholder="e.g. 0123-456-789"
              autoComplete="off"
              spellCheck={false} />
          </div>
        </div>

        {/* Inventory section */}
        {showInventory && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-navy-700">Inventory List</p>
              <p className="text-xs text-navy-500 mt-0.5">
                Select items included in the property. This becomes Schedule 1 of the agreement — both parties initial each item at handover.
              </p>
            </div>

            {/* Preset items grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_ITEMS.map((name) => {
                const selected = formData.inventoryItems.find(i => i.name === name)
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => togglePresetItem(name)}
                    className={`text-left text-xs px-3 py-2 rounded-lg border transition-[border-color,background-color,color]
                      ${selected
                        ? 'border-brand-400 bg-brand-50 text-brand-800 font-medium'
                        : 'border-slate-200 bg-white text-navy-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {selected ? '✓ ' : ''}{name}
                  </button>
                )
              })}
            </div>

            {/* Custom item input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem())}
                placeholder="Add custom item (e.g. Piano)…"
                aria-label="Custom inventory item name"
                autoComplete="off"
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400"
              />
              <button
                type="button"
                onClick={addCustomItem}
                className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Selected items with condition */}
            {formData.inventoryItems.length > 0 && (
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 grid grid-cols-12 gap-2 text-xs font-semibold text-navy-500 uppercase tracking-wide">
                  <span className="col-span-5">Item</span>
                  <span className="col-span-6">Condition at handover</span>
                  <span className="col-span-1" />
                </div>
                {formData.inventoryItems.map((item) => (
                  <div key={item.name} className="px-4 py-2.5 grid grid-cols-12 gap-2 items-center border-t border-slate-100">
                    <span className="col-span-5 text-sm text-navy-700 font-medium">{item.name}</span>
                    <div className="col-span-6 flex gap-1">
                      {CONDITIONS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => updateCondition(item.name, c.value)}
                          className={`flex-1 text-xs py-1 rounded border font-medium transition-[border-color,background-color,color]
                            ${item.condition === c.value ? c.color : 'text-navy-400 bg-white border-slate-200 hover:border-slate-300'}`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.name)}
                      aria-label={`Remove ${item.name} from inventory`}
                      className="col-span-1 text-navy-400 hover:text-red-500 transition-[color] text-center text-lg leading-none"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-navy-700 mb-2">Lease Renewal Option</p>
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            {[
              { label: 'Yes — tenant has first right of renewal', value: true },
              { label: 'No', value: false },
            ].map((opt) => (
              <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formData.leaseRenewalOption === opt.value}
                  onChange={() => onChange({ leaseRenewalOption: opt.value })}
                  className="w-4 h-4 text-brand-600"
                />
                <span className="text-sm text-navy-700">{opt.label}</span>
              </label>
            ))}
          </div>
          {formData.leaseRenewalOption && (
            <div className="ml-0 mt-2 max-w-xs">
              <FormField label="Renewal Term (months)" name="renewalTermMonths" type="number"
                value={formData.renewalTermMonths}
                onChange={(v) => onChange({ renewalTermMonths: v === '' ? '' : Number(v) })}
                placeholder="e.g. 12" hint="Duration of the renewed lease"
                autoComplete="off"
                inputMode="numeric" />
            </div>
          )}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-fade-in">
          {errors.map((e, i) => (
            <p key={i} className="text-sm text-red-600 font-medium">{e}</p>
          ))}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-secondary" aria-label="Go to previous step">← Back</button>
        <button onClick={handleNext} className="btn-primary" aria-label="Go to next step">Next →</button>
      </div>
    </div>
  )
}
