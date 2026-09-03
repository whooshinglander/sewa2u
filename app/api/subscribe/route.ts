import { NextRequest, NextResponse } from 'next/server'

// Shared subscriber collection — writes to Supabase `subscribers` table.
// Standard across all Helios sites. Change SITE per deployment.
const SITE = 'sewa2u.com'

export async function POST(request: NextRequest) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    const res = await fetch(`${url}/rest/v1/subscribers?on_conflict=email,source`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify([{ email, source: SITE }]),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Supabase subscribe error:', res.status, err)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
