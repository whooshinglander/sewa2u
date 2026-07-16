import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '1161326837'

async function sendTelegramNotification(
  tier: string,
  amount: string,
  email: string,
  sessionId: string,
) {
  const text = [
    '💰 *New sewa2u.com payment*',
    `Tier: ${tier}`,
    `Amount: RM ${amount}`,
    `Email: ${email}`,
    `Session: ${sessionId}`,
  ].join('\n')

  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    },
  )
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const tier = session.metadata?.tier ?? 'unknown'
    const amount = ((session.amount_total ?? 0) / 100).toFixed(2)
    const email = session.customer_details?.email ?? session.customer_email ?? 'unknown'
    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? 'unknown'

    console.log('Payment received:', {
      paymentIntentId,
      amount: `RM ${amount}`,
      email,
      tier,
    })

    await sendTelegramNotification(tier, amount, email, session.id)
    await insertCustomer(session, tier)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}

async function insertCustomer(session: Stripe.Checkout.Session, tier: string) {
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    console.warn('Supabase env vars missing — skipping customer insert')
    return
  }

  const meta = (session.metadata ?? {}) as Record<string, string>
  const chunks = parseInt(meta.form_chunks || '0', 10)
  let form: Record<string, unknown> = {}
  if (chunks > 0) {
    const joined = Array.from({ length: chunks }, (_, i) => meta[`form_${i}`] || '').join('')
    try {
      form = JSON.parse(joined)
    } catch {
      form = {}
    }
  }

  const propertyAddress = [form.propertyAddress, form.unitNumber, form.postalCode]
    .filter(Boolean)
    .join(' ')
    .trim() || null

  const monthlyRent = typeof form.monthlyRent === 'number' ? form.monthlyRent : null
  const leaseStart = (form.commencementDate as string) || null
  const leaseEnd = (form.expiryDate as string) || null
  const landlordName = (form.landlordName as string) || null

  const row = {
    email: session.customer_details?.email || session.customer_email || 'unknown',
    name: session.customer_details?.name || landlordName,
    source: 'sewa2u',
    stripe_session_id: session.id,
    stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
    amount_paid: session.amount_total,
    tier,
    purchase_date: new Date((session.created || Date.now() / 1000) * 1000).toISOString(),
    lease_start_date: leaseStart,
    lease_end_date: leaseEnd,
    property_address: propertyAddress,
    monthly_rent: monthlyRent,
    contract_data: Object.keys(form).length > 0 ? form : null,
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/customers`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal,resolution=ignore-duplicates',
      },
      body: JSON.stringify(row),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('Customer insert failed:', res.status, text.slice(0, 200))
    }
  } catch (err) {
    console.error('Customer insert error:', err)
  }
}
