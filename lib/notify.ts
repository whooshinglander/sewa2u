// Server-side error notifier.
//
// Fires a Telegram message to the operator on critical failures (Stripe API
// errors, PDF generation crashes, etc). Rate-limited per error code per hour
// using an in-memory bucket so a flood of identical errors only telegrams once.
//
// Built 2026-05-07 in response to the silent 4-day Stripe-key breakage —
// future failures get visibility within seconds, not days.

const BOT = process.env.TELEGRAM_BOT_TOKEN
const CHAT = process.env.TELEGRAM_OPERATOR_CHAT_ID || '1161326837'

type Payload = {
  source: string         // e.g. 'checkout-session', 'generate-pdf'
  code?: string          // Stripe error code or similar
  message: string        // human-readable summary
  context?: Record<string, string | number | boolean | null | undefined>
}

// Rate-limit: { "checkout-session:api_key_expired": <epoch_ms_of_last_send> }
// Lambdas are short-lived so this dedup is best-effort. Stripe also has its
// own retry pattern, so a single user-facing failure typically shows up as
// one alert; bursts get one per hour.
const lastSent: Record<string, number> = {}
const HOUR_MS = 60 * 60 * 1000

export async function notifyError(p: Payload) {
  if (!BOT) {
    console.error('notifyError: TELEGRAM_BOT_TOKEN unset, falling back to console only')
    console.error(p)
    return
  }

  const key = `${p.source}:${p.code || 'unknown'}`
  const now = Date.now()
  if (lastSent[key] && now - lastSent[key] < HOUR_MS) {
    return  // already alerted within the last hour for this code+source
  }
  lastSent[key] = now

  const ctx = p.context
    ? Object.entries(p.context).map(([k, v]) => `${k}: ${v}`).join('\n')
    : ''

  const text = [
    `🚨 sanyathai/${p.source} error`,
    p.code ? `code: ${p.code}` : '',
    `msg: ${p.message.slice(0, 250)}`,
    ctx ? `\n${ctx}` : '',
    `\n${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'localhost'}`,
  ].filter(Boolean).join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text }),
    })
  } catch (e) {
    console.error('notifyError: telegram fetch failed', e)
  }
}
