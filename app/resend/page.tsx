'use client'

import { useState } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

type Step = 'form' | 'sending' | 'sent' | 'error'

export default function ResendPage() {
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<Step>('form')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) { setErrorMsg('Enter your download token.'); return }
    if (!email.includes('@')) { setErrorMsg('Enter a valid email address.'); return }

    setStep('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/resend-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.')
        setStep('error')
      } else {
        setStep('sent')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStep('error')
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {step === 'sent' ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-navy-800 mb-2">PDF sent!</h1>
              <p className="text-navy-500 text-sm mb-6">Check your inbox at <strong>{email}</strong>.</p>
              <button
                onClick={() => { setStep('form'); setToken(''); setEmail('') }}
                className="text-sm text-brand-600 hover:text-brand-700 underline"
              >
                Send to a different email
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-navy-800 mb-2">Resend your PDF</h1>
                <p className="text-navy-500 text-sm">
                  Enter your download token and we&apos;ll email the PDF to you.
                  Your token is in the URL of your download link:{' '}
                  <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">sewa2u.com/download?token=...</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="token" className="text-sm font-medium text-navy-700">Download token</label>
                  <input
                    id="token"
                    type="text"
                    value={token}
                    onChange={e => { setToken(e.target.value); setErrorMsg('') }}
                    placeholder="cs_live_..."
                    autoComplete="off"
                    spellCheck={false}
                    disabled={step === 'sending'}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white font-mono transition-[border-color,box-shadow] disabled:opacity-60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-navy-700">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrorMsg('') }}
                    placeholder="your@email.com"
                    autoComplete="email"
                    disabled={step === 'sending'}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-[border-color,box-shadow] disabled:opacity-60"
                  />
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={step === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {step === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    '✉️ Send PDF to my email'
                  )}
                </button>
              </form>

              <p className="text-xs text-navy-400 mt-6 text-center">
                Can&apos;t find your token?{' '}
                <a href="mailto:whooshinglander@gmail.com" className="underline hover:text-navy-600">
                  Email us
                </a>{' '}
                and we&apos;ll sort it out.
              </p>
            </>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}
