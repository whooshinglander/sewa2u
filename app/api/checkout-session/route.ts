import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createHash } from 'crypto'
import { notifyError } from '@/lib/notify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PRICES: Record<string, { amount: number; name: string }> = {
  standard: { amount: 3000, name: 'Sewa2u Agreement — Standard PDF' },
  custom:   { amount: 5500, name: 'Sewa2u Agreement — Custom PDF' },
  renewal:  { amount: 3000, name: 'Sewa2u Renewal Agreement — PDF' },
}

// Required form fields. Empty string or missing → reject the checkout.
// Added 2026-05-10 after a customer paid 3× in 7 min for the same blank-template
// PDF because the form let them check out with empty property/parties/dates.
const REQUIRED_FIELDS = [
  'propertyAddress',
  'landlordName',
  'tenantName',
  'commencementDate',
  'monthlyRent',
] as const

function validateFormData(formData: Record<string, unknown> | undefined): string[] {
  if (!formData || typeof formData !== 'object') return ['form data missing']
  const missing: string[] = []
  for (const f of REQUIRED_FIELDS) {
    const v = formData[f]
    if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
      missing.push(f)
    }
  }
  return missing
}

// Stripe metadata: max 500 chars per value, 50 keys max
// We chunk the formData JSON across multiple keys
function chunkFormData(formData: Record<string, unknown>): Record<string, string> {
  const json = JSON.stringify(formData)
  const chunkSize = 490 // leave margin
  const chunks: Record<string, string> = {}
  const numChunks = Math.ceil(json.length / chunkSize)

  if (numChunks > 45) {
    // Reserve some keys for other metadata
    throw new Error('FORM_TOO_LARGE')
  }

  for (let i = 0; i < numChunks; i++) {
    chunks[`form_${i}`] = json.slice(i * chunkSize, (i + 1) * chunkSize)
  }
  chunks.form_chunks = String(numChunks)

  return chunks
}

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const { tier, formData, customerEmail } = await request.json()
    const item = PRICES[tier] ?? PRICES.standard
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://sewa2u.com'

    // Server-side validation: always require core fields before checkout.
    // Skip flags only control the preview; they never bypass payment validation.
    const isRenewal = tier === 'renewal'
    if (!isRenewal) {
      const missing = validateFormData(formData)
      if (missing.length) {
        return NextResponse.json(
          { error: 'Required fields are missing — fill them in before paying.', missing },
          { status: 400 },
        )
      }
    }

    // Build metadata with form data chunks
    const metadata: Record<string, string> = {
      tier: tier || 'standard',
    }

    if (formData) {
      const chunks = chunkFormData(formData)
      Object.assign(metadata, chunks)
    }

    // Stripe idempotency-key — Stripe itself dedupes within 24h.
    // Same form + same tier + same email → returns the SAME session (no double charge).
    // Customers who back-navigate from success and re-click "Pay" hit Stripe's cache.
    const fingerprint = createHash('sha256')
      .update(JSON.stringify({ tier, formData, email: customerEmail || '' }))
      .digest('hex')
      .slice(0, 32)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'myr',
          product_data: { name: item.name },
          unit_amount: item.amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata,
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url:  `${base}/preview`,
    }, {
      idempotencyKey: `sgt_${tier}_${fingerprint}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    if (message === 'FORM_TOO_LARGE') {
      return NextResponse.json(
        { error: 'Your agreement data is too large to process. Please reduce the number of custom clauses or the length of special conditions.' },
        { status: 413 }
      )
    }
    const stripeErr = err as { type?: string; code?: string }
    const code = stripeErr?.code || stripeErr?.type || ''
    console.error('checkout-session FAILURE:', { code, message: message.slice(0, 200) })

    const isServerFault = ['api_key_expired', 'authentication_error', 'rate_limit', 'api_connection_error'].includes(code)

    void notifyError({
      source: 'sewa2u/checkout-session',
      code: code || 'unhandled',
      message: message.slice(0, 200),
      context: { type: stripeErr?.type, env: process.env.VERCEL_ENV || 'unknown' },
    })

    if (isServerFault) {
      return NextResponse.json({
        error: 'Payment is temporarily unavailable on our end. We have been notified — please email whooshinglander@gmail.com if this persists.',
        code,
      }, { status: 503 })
    }

    return NextResponse.json({
      error: 'We could not start checkout. Please try again, or email whooshinglander@gmail.com if this keeps happening.',
      code: code || 'unknown',
    }, { status: 500 })
  }
}
