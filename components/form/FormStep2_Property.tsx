import { useState } from 'react'
import { TenancyFormData } from '@/lib/types'
import FormField from './FormField'

type Props = {
  formData: TenancyFormData
  onChange: (updates: Partial<TenancyFormData>) => void
  onNext: () => void
  onBack: () => void
}

async function lookupPostalCode(postalCode: string): Promise<string | null> {
  // Postal code lookup removed for Malaysia adaptation
  return null
}

const SHARED_FACILITIES = ['Kitchen', 'Bathroom', 'Living Room', 'Laundry', 'Garden/Balcony', 'Parking']

export default function FormStep2_Property({ formData, onChange, onNext, onBack }: Props) {
  const [lookingUp, setLookingUp] = useState(false)
  const [lookupError, setLookupError] = useState('')
  const skipStep = formData.skipProperty ?? false
  const isPrivate = formData.propertyType === 'private'
  const isRoom = formData.propertyType === 'room'

  const handlePostalChange = async (v: string) => {
    onChange({ postalCode: v })
    setLookupError('')
    if (/^\d{6}$/.test(v)) {
      setLookingUp(true)
      const address = await lookupPostalCode(v)
      setLookingUp(false)
      if (address) onChange({ postalCode: v, propertyAddress: address })
      else setLookupError('Address not found — please enter manually.')
    }
  }

  const validate = () => {
    if (!formData.propertyAddress.trim()) return 'Property address is required'
    if (!isPrivate && !isRoom && !formData.unitNumber.trim()) return 'Unit number is required'
    if (!/^\d{5}$/.test(formData.postalCode)) return 'Enter a valid 5-digit postal code'
    return null
  }

  const [errors, setErrors] = useState<string[]>([])

  const handleNext = () => {
    if (skipStep) { onNext(); return }
    const error = validate()
    if (error) { setErrors([error]); return }
    setErrors([])
    onNext()
  }

  const toggleFacility = (f: string) => {
    const cur = formData.sharedFacilities
    onChange({ sharedFacilities: cur.includes(f) ? cur.filter(x => x !== f) : [...cur, f] })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy-800 mb-1">
          {isRoom ? 'Room & Property Details' : 'Property Details'}
        </h2>
        <p className="text-navy-500 text-sm">
          {isRoom ? 'Details about the room and the property it is in.' : 'Enter the address of the rental property.'}
        </p>
      </div>

      {/* Skip checkbox */}
      <label className={`flex items-center gap-3 cursor-pointer rounded-xl border-2 px-4 py-3 transition-[border-color,background-color]
        ${skipStep ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
        <input type="checkbox" checked={skipStep}
          onChange={(e) => onChange({ skipProperty: e.target.checked })}
          className="w-4 h-4 rounded text-brand-600" />
        <div>
          <p className="text-sm font-semibold text-navy-800">Fill in later</p>
          <p className="text-xs text-navy-500">Skip to preview a sample contract first.</p>
        </div>
      </label>

      <div className={`space-y-5 transition-opacity ${skipStep ? 'opacity-40 pointer-events-none select-none' : ''}`}>

        {/* Address */}
        <div className="space-y-4">
          <div>
            <FormField label="Postal Code" name="postalCode" value={formData.postalCode}
              onChange={handlePostalChange} placeholder="e.g. 123456"
              autoComplete="postal-code"
              inputMode="numeric"
              hint={lookingUp ? '🔍 Looking up…' : 'Address auto-fills from postal code'} />
            <p className="text-xs text-amber-600 mt-1" role="status" aria-live="polite">
              {lookupError}
            </p>
          </div>
          <FormField label="Property Address" name="propertyAddress" value={formData.propertyAddress}
            onChange={(v) => onChange({ propertyAddress: v })} placeholder="e.g. 45 Jalan Ampang…"
            autoComplete="street-address" />
          <FormField
            label={isPrivate || isRoom ? 'Unit Number (if applicable)' : 'Unit Number'}
            name="unitNumber" value={formData.unitNumber}
            onChange={(v) => onChange({ unitNumber: v })} placeholder="e.g. #05-12"
            autoComplete="address-line2"
            hint={(isPrivate || isRoom) ? 'Leave blank for landed property' : undefined} />
        </div>

        {/* Room-specific fields */}
        {isRoom && (
          <>
            <div className="border-t border-slate-100" />

            <div className="space-y-4">
              <p className="text-sm font-semibold text-navy-700">Room Details</p>

              <div>
                <label className="text-sm font-medium text-navy-700 block mb-2">Room Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { value: 'common', label: 'Common Room' },
                    { value: 'master', label: 'Master Bedroom' },
                    { value: 'ensuite', label: 'En-Suite Room' },
                    { value: 'other', label: 'Other' },
                  ].map(opt => (
                    <button key={opt.value} type="button"
                      onClick={() => onChange({ roomType: opt.value as TenancyFormData['roomType'] })}
                      className={`text-xs px-3 py-2 rounded-lg border transition-[border-color,background-color,color] font-medium
                        ${formData.roomType === opt.value
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-slate-200 bg-white text-navy-600 hover:border-slate-300'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <FormField label="Room Description (optional)" name="roomDescription"
                value={formData.roomDescription}
                onChange={(v) => onChange({ roomDescription: v })}
                placeholder="e.g. Air-conditioned common room with window, approx 100 sqft…" />
            </div>

            <div className="border-t border-slate-100" />

            <div className="space-y-4">
              <p className="text-sm font-semibold text-navy-700">Shared Facilities</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHARED_FACILITIES.map(f => (
                  <label key={f} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.sharedFacilities.includes(f)}
                      onChange={() => toggleFacility(f)}
                      className="w-4 h-4 rounded text-brand-600" />
                    <span className="text-sm text-navy-700">{f}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100" />

            <div className="space-y-4">
              <p className="text-sm font-semibold text-navy-700">Utilities & WiFi</p>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.wifiIncluded}
                  onChange={(e) => onChange({ wifiIncluded: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-600" />
                <span className="text-sm text-navy-700">WiFi included in rent</span>
              </label>

              <div>
                <p className="text-sm font-medium text-navy-700 mb-2">Utilities</p>
                <div className="space-y-2">
                  {[
                    { value: 'included', label: 'Included in rent' },
                    { value: 'equal', label: 'Split equally among all occupants' },
                    { value: 'meter', label: 'Billed by individual meter reading' },
                    { value: 'fixed', label: 'Fixed monthly contribution' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio"
                        checked={opt.value === 'included' ? formData.utilitiesIncluded : (!formData.utilitiesIncluded && formData.utilitiesSplitMethod === opt.value)}
                        onChange={() => {
                          if (opt.value === 'included') onChange({ utilitiesIncluded: true })
                          else onChange({ utilitiesIncluded: false, utilitiesSplitMethod: opt.value as TenancyFormData['utilitiesSplitMethod'] })
                        }}
                        className="w-4 h-4 text-brand-600" />
                      <span className="text-sm text-navy-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
                {!formData.utilitiesIncluded && formData.utilitiesSplitMethod === 'fixed' && (
                  <div className="mt-3 ml-7">
                    <FormField label="Fixed monthly utilities (MYR)" name="utilitiesFixedAmount" type="number"
                      value={formData.utilitiesFixedAmount}
                      onChange={(v) => onChange({ utilitiesFixedAmount: v === '' ? '' : Number(v) })}
                      placeholder="e.g. 80" />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100" />

            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">
                House Rules <span className="text-navy-400 font-normal">(optional)</span>
              </label>
              <textarea value={formData.houseRules}
                onChange={(e) => onChange({ houseRules: e.target.value })}
                placeholder="e.g. No overnight guests. Quiet hours after 11pm. Common areas to be kept clean…"
                rows={3}
                aria-label="House rules"
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white resize-none transition-[border-color,box-shadow]" />
              <p className="text-xs text-navy-400 mt-1">Will be included as a schedule in the agreement.</p>
            </div>
          </>
        )}


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
