import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { generateContract } from '@/lib/contract/generateContract'
import { TenancyFormData } from '@/lib/types'
import ContractPDF from '@/lib/pdf/ContractPDF'
import { stampPageNumbers } from '@/lib/pdf/stampPageNumbers'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { formData, email } = await req.json() as {
      formData: TenancyFormData
      email: string
    }

    if (!formData || !email) {
      return NextResponse.json({ error: 'Missing formData or email' }, { status: 400 })
    }

    // Generate watermarked PDF (same PDF, watermark is rendered in ContractPreview HTML only;
    // the PDF itself carries a DRAFT watermark text in the document title)
    const doc = generateContract(formData)
    const element = React.createElement(ContractPDF, { doc })
    const rawBuffer = await renderToBuffer(element as React.ReactElement)
    const buffer = await stampPageNumbers(Buffer.from(rawBuffer))
    const pdfBase64 = Buffer.from(buffer).toString('base64')
    const filename = `SG-Tenancy-Agreement-PREVIEW.pdf`

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
        subject: '[Preview] Your Tenancy Agreement — Sewa2u',
        htmlContent: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f6f9;margin:0;padding:0">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)">
    <div style="background:#0f172a;padding:28px 32px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700">Sewa2u</h1>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:13px">Contract preview attached</p>
    </div>
    <div style="padding:32px">
      <div style="background:#fefce8;border:1px solid #fde047;border-radius:8px;padding:14px;margin:0 0 20px">
        <p style="margin:0;color:#854d0e;font-size:13px;font-weight:600">⚠️ This is a preview only</p>
        <p style="margin:6px 0 0;color:#92400e;font-size:12px">The attached PDF is for review purposes. Purchase the official version at sewa2u.com to use as a legal document.</p>
      </div>
      <p style="color:#334155;font-size:14px;line-height:1.6;margin:0 0 16px">
        Your tenancy agreement preview for <strong>${doc.meta.address}</strong> is attached.
      </p>
      <p style="color:#334155;font-size:14px;line-height:1.6;margin:0 0 20px">
        Happy with it? Head back to purchase the official PDF.
      </p>
      <a href="https://sewa2u.com" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none">
        Get Official PDF →
      </a>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">
      <p style="color:#64748b;font-size:12px;line-height:1.5;margin:0">
        This is a general document and may not be appropriate for all cases. When in doubt, seek legal advice.
      </p>
    </div>
    <div style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center">
      <p style="margin:0;color:#cbd5e1;font-size:11px">© ${new Date().getFullYear()} sewa2u.com</p>
    </div>
  </div>
</body>
</html>`,
        attachment: [{
          content: pdfBase64,
          name: filename,
        }],
      }),
    })

    if (!brevoRes.ok) {
      const errBody = await brevoRes.text()
      console.error('Brevo preview email error:', brevoRes.status, errBody)
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
    }

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('send-preview-email error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
