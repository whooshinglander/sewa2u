import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ valid: false, error: 'Missing token' }, { status: 400 })
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(token)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ valid: false, error: 'Payment not confirmed' }, { status: 402 })
    }

    const metadata = session.metadata || {}
    const tier = metadata.tier || 'standard'

    // Reconstruct address from form data for display
    let address = ''
    const numChunks = parseInt(metadata.form_chunks || '0', 10)
    if (numChunks > 0) {
      const parts: string[] = []
      for (let i = 0; i < numChunks; i++) {
        parts.push(metadata[`form_${i}`] || '')
      }
      try {
        const formData = JSON.parse(parts.join(''))
        const unit = formData.unitNumber || ''
        const addr = formData.propertyAddress || ''
        const postal = formData.postalCode || ''
        address = [unit, addr, postal ? `Malaysia ${postal}` : ''].filter(Boolean).join(', ')
      } catch { /* ignore parse errors */ }
    }

    return NextResponse.json({
      valid: true,
      tier,
      address: address || 'Tenancy Agreement',
      price: tier === 'custom' ? 'RM55' : 'RM30',
    })
  } catch (err) {
    console.error('download-verify error:', err)
    return NextResponse.json({ valid: false, error: 'Invalid or expired link' }, { status: 400 })
  }
}
