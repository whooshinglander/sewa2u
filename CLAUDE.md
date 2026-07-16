# CLAUDE.md — sewa2u

## What this is
Malaysia tenancy agreement generator. Paid product — MYR RM30 (standard) and RM55 (custom). Stripe payments live.

## Stack
Next.js 14 App Router (app/), TypeScript, Tailwind CSS, Stripe, Brevo email, Vercel.

## Critical rules
- **Stripe: live mode.** Payments are real. Never test with live keys — use test keys locally. Live keys in Vercel env vars only.
- **Stripe webhook:** signature verification must not be removed or simplified. Webhook handles payment confirmation + document delivery.
- **Brevo email:** transactional email from `noreply@sewa2u.com`. API key in Vercel env vars.
- **Legal documents:** tenancy agreement templates are legally-structured. Do not simplify, reformat, or change legal clauses without explicit instruction.
- **Never hardcode Stripe keys** — pk_live and sk_live in Vercel env vars only.

## Known gotchas
- This repo uses `app/` not `src/app/` — flat App Router structure.
- PDF generation happens server-side — do not move to client-side.
- Malaysia law context — all clauses reference Malaysia Contracts Act 1950. Do not adapt for other jurisdictions.

## Deploy
`VERCEL_TOKEN=$(security find-generic-password -a helios -s vercel_token -w) vercel --yes --prod`
