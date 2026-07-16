import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json({
      paid: session.payment_status === 'paid',
      tier: searchParams.get('tier') || 'standard',
      amount_total: session.amount_total,
      currency: session.currency,
    })
  } catch (err) {
    console.error('verify-payment error:', err)
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
  }
}
