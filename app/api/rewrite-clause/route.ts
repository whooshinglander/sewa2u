import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'AI rewrite not available. Add ANTHROPIC_API_KEY to environment variables.' },
    { status: 503 }
  )
}
