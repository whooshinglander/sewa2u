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

export async function POST(req: NextRequest) {
  try {
    const { token, email } = await req.json() as { token: string; email: string }

    if (!token || !email) {
      return NextResponse.json({ error: 'Missing token or email' }, { status: 400 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(token)
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not confirmed for this token' }, { status: 402 })
    }

    const metadata = session.metadata || {}
    const tier = metadata.tier || 'standard'
    const formData = reconstructFormData(metadata as Record<string, string>)

    if (!formData) {
      return NextResponse.json({ error: 'Form data not found for this token' }, { status: 404 })
    }

    const doc = generateContract(formData)
    const element = React.createElement(ContractPDF, { doc })
    const rawBuffer = await renderToBuffer(element as React.ReactElement)
    const buffer = await stampPageNumbers(Buffer.from(rawBuffer))
    const pdfBase64 = Buffer.from(buffer).toString('base64')

    const address = doc.meta.address?.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40) || 'tenancy'
    const filename = `SG-Tenancy-Agreement-${address}.pdf`
    const price = tier === 'custom' ? 'RM55' : 'RM30'
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://sewa2u.com'
    const downloadLink = `${base}/download?token=${token}`

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Sewa2u', email: 'noreply@sewa2u.com' },
        to: [{ email }],
        subject: 'Your Tenancy Agreement — Sewa2u',
        htmlContent: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f6f9;margin:0;padding:0"><div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)"><div style="background:#0f172a;padding:28px 32px;text-align:center"><h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;letter-spacing:-.3px">Sewa2u</h1><p style="margin:6px 0 0;color:#94a3b8;font-size:13px">Your tenancy agreement</p></div><div style="padding:32px"><p style="color:#334155;font-size:15px;line-height:1.6;margin:0 0 16px">Here is your tenancy agreement PDF as requested.</p><div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:0 0 20px"><p style="margin:0;color:#166534;font-size:14px;font-weight:600">✅ MYR ${price} — ${tier === 'custom' ? 'Custom' : 'Standard'} PDF</p><p style="margin:6px 0 0;color:#15803d;font-size:13px">${doc.meta.address}</p></div><p style="color:#334155;font-size:14px;line-height:1.6;margin:0 0 8px"><strong>Permanent download link:</strong></p><a href="${downloadLink}" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;margin:0 0 20px">Download PDF →</a><hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"><p style="color:#64748b;font-size:12px;line-height:1.5;margin:0"><strong>Important:</strong> This is a general document which may not be appropriate for all cases. When in doubt, please seek legal advice.</p></div><div style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center"><p style="margin:0;color:#94a3b8;font-size:12px">Questions? <a href="mailto:whooshinglander@gmail.com" style="color:#0f172a;text-decoration:underline">whooshinglander@gmail.com</a></p><p style="margin:6px 0 0;color:#cbd5e1;font-size:11px">© ${new Date().getFullYear()} sewa2u.com</p></div></div></body></html>`,
        attachment: [{ content: pdfBase64, name: filename }],
      }),
    })

    if (!brevoRes.ok) {
      const errBody = await brevoRes.text()
      console.error('Brevo error:', brevoRes.status, errBody)
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
    }

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('resend-pdf error:', err)
    return NextResponse.json({ error: 'Failed to resend PDF' }, { status: 500 })
  }
}
