'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 my-12 text-center">
      <h2 className="text-lg font-bold text-navy-800 mb-1">Sewa2u Tips &amp; Updates</h2>
      <p className="text-sm text-navy-500 mb-4">Stamp duty reminders, residential rule changes, and landlord tips. No spam.</p>
      {status === 'done' ? (
        <p className="text-sm text-green-700 font-medium">&#10003; You&apos;re on the list.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
            style={{ fontSize: '16px' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {status === 'loading' ? 'Saving...' : 'Notify me'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  )
}
