import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import RenewalPDF, { ExtensionData } from '@/lib/pdf/RenewalPDF'
import { stampPageNumbers } from '@/lib/pdf/stampPageNumbers'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json() as { formData: ExtensionData }

    if (!formData) {
      return NextResponse.json({ error: 'Missing formData' }, { status: 400 })
    }

    const element = React.createElement(RenewalPDF, { data: formData })
    const rawBuffer = await renderToBuffer(element as React.ReactElement)
    const buffer = await stampPageNumbers(Buffer.from(rawBuffer))

    const address = (formData.propertyAddress || 'tenancy').replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40)
    const filename = `SG-Tenancy-Renewal-Agreement-${address}.pdf`

    const uint8 = new Uint8Array(buffer)

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(uint8.byteLength),
      },
    })
  } catch (err) {
    console.error('generate-renewal-pdf error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
