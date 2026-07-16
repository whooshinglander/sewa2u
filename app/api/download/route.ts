import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { generateContract } from '@/lib/contract/generateContract'
import { TenancyFormData } from '@/lib/types'
import ContractPDF from '@/lib/pdf/ContractPDF'
import { stampPageNumbers } from '@/lib/pdf/stampPageNumbers'

export const dynamic = 'force-dynamic'

function reconstructFormData(metadata: Record<string, string>): TenancyFormData | null {
  const numChunks = parseInt(metadata.form_chunks || '0', 10)
  if (numChunks === 0) return null

  const parts: string[] = []
  for (let i = 0; i < numChunks; i++) {
    parts.push(metadata[`form_${i}`] || '')
  }

  try {
    return JSON.parse(parts.join('')) as TenancyFormData
  } catch (e) {
    console.error('reconstructFormData parse error:', e)
    return null
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(token)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not confirmed' }, { status: 402 })
    }

    const metadata = session.metadata || {}
    const formData = reconstructFormData(metadata as Record<string, string>)

    if (!formData) {
      return NextResponse.json({
        error: 'Form data not found. Please contact whooshinglander@gmail.com with your Stripe receipt.'
      }, { status: 404 })
    }

    // Generate PDF
    const doc = generateContract(formData)
    const element = React.createElement(ContractPDF, { doc })
    const rawBuffer = await renderToBuffer(element as React.ReactElement)
    const buffer = await stampPageNumbers(Buffer.from(rawBuffer))

    const address = doc.meta.address?.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40) || 'tenancy'
    const filename = `SG-Tenancy-Agreement-${address}.pdf`

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(buffer.byteLength),
      },
    })
  } catch (err) {
    console.error('download error:', err)
    return NextResponse.json({ error: 'Invalid or expired link' }, { status: 400 })
  }
}
