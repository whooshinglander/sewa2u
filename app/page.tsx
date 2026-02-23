'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ProgressBar from '@/components/form/ProgressBar'
import PropertyTypeSelector from '@/components/form/PropertyTypeSelector'
import FormStep2_Property from '@/components/form/FormStep2_Property'
import FormStep3_Parties from '@/components/form/FormStep3_Parties'
import FormStep4_Terms from '@/components/form/FormStep4_Terms'
import FormStep5_Clauses from '@/components/form/FormStep5_Clauses'
import { TenancyFormData, PropertyType, defaultFormData } from '@/lib/types'

export default function Home() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<TenancyFormData>(defaultFormData)

  const updateForm = (updates: Partial<TenancyFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const handlePreview = () => {
    sessionStorage.setItem('sgtenancy_form', JSON.stringify(formData))
    router.push('/preview')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Hero text — only on step 1 */}
        {step === 1 && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
              Generate your Singapore tenancy agreement
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Fill in the details below to generate a legally-structured Singapore residential tenancy agreement.
              Preview free, download from <strong>$10</strong>.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <ProgressBar currentStep={step} />

          {step === 1 && (
            <PropertyTypeSelector
              value={formData.propertyType}
              onChange={(v: PropertyType) => updateForm({ propertyType: v })}
              onContinue={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <FormStep2_Property
              formData={formData}
              onChange={updateForm}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <FormStep3_Parties
              formData={formData}
              onChange={updateForm}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <FormStep4_Terms
              formData={formData}
              onChange={updateForm}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <FormStep5_Clauses
              formData={formData}
              onChange={updateForm}
              onPreview={handlePreview}
              onBack={() => setStep(4)}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
