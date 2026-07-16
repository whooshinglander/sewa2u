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
    const { formData } = await req.json() as { formData: TenancyFormData }

    if (!formData) {
      return NextResponse.json({ error: 'Missing formData' }, { status: 400 })
    }

    const doc = generateContract(formData)
    const element = React.createElement(ContractPDF, { doc })
    const rawBuffer = await renderToBuffer(element as React.ReactElement)
    const buffer = await stampPageNumbers(Buffer.from(rawBuffer))

    const address = doc.meta.address?.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40) || 'tenancy'
    const filename = `SG-Tenancy-Agreement-${address}.pdf`

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
    console.error('generate-pdf error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
