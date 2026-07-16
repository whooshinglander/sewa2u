'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

type ExtensionData = {
  landlordName: string
  landlordNric: string
  tenantName: string
  tenantNric: string
  propertyAddress: string
  originalDate: string
  currentExpiryDate: string
  newExpiryDate: string
  rentChanged: boolean
  newMonthlyRent: number | ''
  rentPaymentDay: number | ''
  depositChanged: boolean
  newSecurityDeposit: number | ''
  diplomaticClauseApplies: boolean
  diplomaticNoticeMonths: number | ''
}

const defaultData: ExtensionData = {
  landlordName: '',
  landlordNric: '',
  tenantName: '',
  tenantNric: '',
  propertyAddress: '',
  originalDate: '',
  currentExpiryDate: '',
  newExpiryDate: '',
  rentChanged: false,
  newMonthlyRent: '',
  rentPaymentDay: 1,
  depositChanged: false,
  newSecurityDeposit: '',
  diplomaticClauseApplies: false,
  diplomaticNoticeMonths: 1,
}

// Defined outside component so React doesn't remount inputs on every keystroke
function Field({ label, name, type = 'text', value, onChange, placeholder, hint, required, autoComplete, spellCheck, onBlur }: {
  label: string; name: string; type?: string; value: string | number
  onChange: (v: string) => void; placeholder?: string; hint?: string; required?: boolean
  autoComplete?: string; spellCheck?: boolean; onBlur?: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-navy-700">
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={name} name={name} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete ?? 'off'}
        spellCheck={spellCheck}
        aria-required={required}
        aria-describedby={hint ? `${name}-hint` : undefined}
        inputMode={type === 'number' ? 'numeric' : undefined}
        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow]"
      />
      {hint && <p id={`${name}-hint`} className="text-xs text-navy-500">{hint}</p>}
    </div>
  )
}

function validateNric(value: string): string {
  if (!value.trim()) return ''
  const upper = value.trim().toUpperCase()
  if (/^[STFGM]\d{7}[A-Z]$/.test(upper)) return ''
  if (/^[STFGM]/i.test(upper) || /^\d/.test(upper)) {
    return 'Enter a valid 12-digit NRIC (e.g. 880101011234)'
  }
  return ''
}

export default function RenewPage() {
  const router = useRouter()
  const [data, setData] = useState<ExtensionData>(defaultData)
  const [nricErrors, setNricErrors] = useState<Record<string, string>>({})

  const handleNricBlur = (key: string, value: string) => {
    setNricErrors(prev => ({ ...prev, [key]: validateNric(value) }))
  }

  const update = (updates: Partial<ExtensionData>) =>
    setData(prev => ({ ...prev, ...updates }))

  const handlePreview = () => {
    sessionStorage.setItem('sewa2u_extension', JSON.stringify(data))
    router.push('/renew/preview')
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 px-2 py-1 rounded mb-3 inline-block">
            Renew Tenancy
          </span>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">
            Renewal of Tenancy Agreement Malaysia — Residential &amp; Condo
          </h1>
          <p className="text-navy-500 text-sm">
            Already have a signed TA? Generate a Malaysia tenancy renewal agreement — a concise addendum that extends the end date and optionally adjusts the rent. Residential rental renewal and private property supported. All original terms remain unchanged.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">

          {/* Parties */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-navy-700 uppercase tracking-wide">Parties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Landlord Full Name" name="landlordName" value={data.landlordName}
                onChange={v => update({ landlordName: v })} placeholder="e.g. Joseph Lim Zhi Kai"
                autoComplete="name" />
              <Field label="Landlord NRIC / FIN" name="landlordNric" value={data.landlordNric}
                onChange={v => { update({ landlordNric: v }); setNricErrors(p => ({ ...p, landlordNric: '' })) }}
                placeholder="e.g. 880101011234" autoComplete="off" spellCheck={false}
                onBlur={() => handleNricBlur('landlordNric', data.landlordNric)} />
            </div>
            {nricErrors.landlordNric && <p className="text-xs text-red-500 font-medium mt-0.5">{nricErrors.landlordNric}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Tenant Full Name" name="tenantName" value={data.tenantName}
                onChange={v => update({ tenantName: v })} placeholder="e.g. Ahmad bin Ismail"
                autoComplete="name" />
              <Field label="Tenant NRIC / FIN / Passport" name="tenantNric" value={data.tenantNric}
                onChange={v => { update({ tenantNric: v }); setNricErrors(p => ({ ...p, tenantNric: '' })) }}
                placeholder="e.g. 920305021234" autoComplete="off" spellCheck={false}
                onBlur={() => handleNricBlur('tenantNric', data.tenantNric)} />
            </div>
            {nricErrors.tenantNric && <p className="text-xs text-red-500 font-medium mt-0.5">{nricErrors.tenantNric}</p>}
          </div>

          <div className="border-t border-slate-100" />

          {/* Original TA */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-navy-700 uppercase tracking-wide">Original Tenancy Agreement</h2>
            <Field label="Property Address" name="propertyAddress" value={data.propertyAddress}
              onChange={v => update({ propertyAddress: v })}
              placeholder="Full address including unit number and postal code…"
              autoComplete="street-address" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Original TA Date" name="originalDate" type="date"
                value={data.originalDate} onChange={v => update({ originalDate: v })}
                hint="DD/MM/YYYY — date the original TA was signed" />
              <Field label="Current Expiry Date" name="currentExpiryDate" type="date"
                value={data.currentExpiryDate} onChange={v => update({ currentExpiryDate: v })}
                hint="DD/MM/YYYY — when the current TA ends" />
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Extension terms */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-navy-700 uppercase tracking-wide">Renewal Terms</h2>
            <Field label="New Expiry Date" name="newExpiryDate" type="date"
              value={data.newExpiryDate} onChange={v => update({ newExpiryDate: v })}
              hint="DD/MM/YYYY — new end date after extension" />

            <div>
              <p className="text-sm font-medium text-navy-700 mb-2">Monthly Rent</p>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" checked={!data.rentChanged}
                    onChange={() => update({ rentChanged: false })}
                    className="w-4 h-4 text-brand-600" />
                  <span className="text-sm text-navy-700">Unchanged — same rent as original TA</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" checked={data.rentChanged}
                    onChange={() => update({ rentChanged: true })}
                    className="w-4 h-4 text-brand-600" />
                  <span className="text-sm text-navy-700">Updated rent amount</span>
                </label>
                {data.rentChanged && (
                  <div className="ml-7 grid grid-cols-2 gap-3">
                    <Field label="New Monthly Rent (MYR)" name="newMonthlyRent" type="number"
                      value={data.newMonthlyRent} onChange={v => update({ newMonthlyRent: v === '' ? '' : Number(v) })}
                      placeholder="e.g. 3500" />
                    <Field label="Due on (day of month)" name="rentPaymentDay" type="number"
                      value={data.rentPaymentDay} onChange={v => update({ rentPaymentDay: v === '' ? '' : Number(v) })}
                      placeholder="e.g. 1" />
                  </div>
                )}
              </div>
            </div>

            {/* Security Deposit */}
            <div>
              <p className="text-sm font-medium text-navy-700 mb-2">Security Deposit</p>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" checked={!data.depositChanged}
                    onChange={() => update({ depositChanged: false })}
                    className="w-4 h-4 text-brand-600" />
                  <span className="text-sm text-navy-700">Unchanged — same deposit as original TA</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" checked={data.depositChanged}
                    onChange={() => update({ depositChanged: true })}
                    className="w-4 h-4 text-brand-600" />
                  <span className="text-sm text-navy-700">Updated deposit amount</span>
                </label>
                {data.depositChanged && (
                  <div className="ml-7">
                    <Field label="New Security Deposit (MYR)" name="newSecurityDeposit" type="number"
                      value={data.newSecurityDeposit} onChange={v => update({ newSecurityDeposit: v === '' ? '' : Number(v) })}
                      placeholder="e.g. 3500"
                      hint="Tenant tops up or landlord refunds the difference at commencement of extension" />
                  </div>
                )}
              </div>
            </div>

            {/* Diplomatic Clause */}
            <div>
              <p className="text-sm font-medium text-navy-700 mb-2">Diplomatic Clause</p>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" checked={!data.diplomaticClauseApplies}
                    onChange={() => update({ diplomaticClauseApplies: false })}
                    className="w-4 h-4 text-brand-600" />
                  <span className="text-sm text-navy-700">Not applicable for this extension</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" checked={data.diplomaticClauseApplies}
                    onChange={() => update({ diplomaticClauseApplies: true })}
                    className="w-4 h-4 text-brand-600" />
                  <span className="text-sm text-navy-700">Tenant may exercise diplomatic clause with notice</span>
                </label>
                {data.diplomaticClauseApplies && (
                  <div className="ml-7 max-w-xs">
                    <Field label="Notice Period (months)" name="diplomaticNoticeMonths" type="number"
                      value={data.diplomaticNoticeMonths} onChange={v => update({ diplomaticNoticeMonths: v === '' ? '' : Number(v) })}
                      placeholder="e.g. 1" hint="Written notice required to exercise diplomatic clause" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={handlePreview}
              className="w-full sm:w-auto px-8 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
            >
              Preview Renewal Agreement →
            </button>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-navy-700 mb-2">What is a tenancy extension addendum?</p>
          <p className="text-sm text-navy-500 leading-relaxed">
            An addendum is a short supplementary document that modifies one or more terms of an existing agreement.
            It references the original TA and is signed by both parties. It&apos;s simpler and cheaper to stamp than a full new TA —
            you only pay stamp duty on any rent increase (if applicable).
          </p>
        </div>

        {/* residential rental renewal info box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-800 mb-2">Residential rental renewal — what you need to know</p>
          <ul className="text-sm text-blue-700 space-y-1.5 leading-relaxed">
            <li>• Update your property subletting record if you are subletting the whole flat — property approval must be current.</li>
            <li>• Stamp duty applies to the renewal period. Pay to LHDN within 14 days of signing.</li>
            <li>• Minimum renewal period for residential whole-flat subletting is 6 months.</li>
            <li>• Non-Malaysian tenants require property approval on record — check approval expiry before renewing.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
