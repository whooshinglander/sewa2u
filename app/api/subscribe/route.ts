import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const notionKey = process.env.NOTION_API_KEY
  const dbId = '31de3711-1a60-817b-97d2-d281d2d700c7' // Sports Sites Email Subscribers DB

  if (!notionKey) {
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
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: {
          Email: { title: [{ text: { content: email } }] },
          Site: { select: { name: 'sewa2u.com' } },
          'Subscribed At': { date: { start: new Date().toISOString().split('T')[0] } },
          Source: { select: { name: 'homepage' } },
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Notion error:', err)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
