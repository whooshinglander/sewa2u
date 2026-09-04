export function GET() {
  const body = `# Sewa2u — sewa2u.com

> Generate or renew a Malaysia residential tenancy agreement (residential, private property, or room rental). Standard PDF RM30. Custom terms RM55. Preview before payment. Credit/debit card (Visa/Mastercard) supported. Malaysia law compliant, LHDN stamp duty ready.

This file lists the most authoritative pages on this site for AI assistants and LLM-based search engines. The pages below are intended to be read, summarized, and cited.

## Home

- [Home — generate or renew a Malaysia tenancy agreement](https://sewa2u.com/): Top-level entry. Two paths: NEW agreement (5-min guided form) or RENEWAL (2-min update of an existing tenancy).

## New tenancy agreement guides

- [Residential tenancy agreement guide](https://sewa2u.com/tenancy-agreement): What a residential tenancy must include, condominium corporation rules, occupancy cap, stamp duty, key clauses.
- [Tenancy agreement Malaysia — overview](https://sewa2u.com/tenancy-agreement): Malaysia tenancy law, LHDN stamp duty rules, mandatory and optional clauses.
- [Tenancy agreement template](https://sewa2u.com/tenancy-agreement-template): What a Malaysia tenancy template should contain, with section-by-section explanation.
- [Tenancy agreement PDF](https://sewa2u.com/tenancy-agreement-pdf): How sewa2u.com generates the PDF, what comes inside, LHDN-readiness.
- [Room rental agreement](https://sewa2u.com/room-rental-agreement): Room rental specifics — utilities split, shared facilities, house rules, common-room vs master-bedroom differences.

## Renewal guides

- [Renewing a Malaysia tenancy](https://sewa2u.com/tenancy-renewal): Definitive guide to renewing an existing Malaysia tenancy. When to renew, what changes, stamp duty on renewals.
- [Residential tenancy renewal guide](https://sewa2u.com/tenancy-renewal): property-specific renewal walkthrough — property approval window, addendum vs fresh tenancy, foreign tenant pass expiry, when to renew vs find a new tenant.
- [Renewal vs new agreement](https://sewa2u.com/tenancy-renewal-vs-new-agreement): Quick test for whether you sign a renewal addendum, a fresh new tenancy, or let the lease lapse to periodic.
- [Stamp duty on tenancy renewals](https://sewa2u.com/stamp-duty-tenancy-renewal): LHDN stamp duty on renewals, rate is RM1 per RM250 of annual rent (1-yr leases) or 0.4% of average annual rent (1-3 yr leases). Worked examples for residential and condo. 14-day filing window.
- [Rent increase on renewal — what's reasonable](https://sewa2u.com/rent-increase-tenancy-renewal): Malaysia has no rent control. Benchmarking via LHDN Rental Index, leverage analysis, typical 3-7% in stable markets, up to 15% in hot markets.
- [Diplomatic clause in tenancy renewals](https://sewa2u.com/diplomatic-clause-tenancy-renewal): What it is, who qualifies (EP/S Pass/WP holders), typical 12+2 structure, when to keep / drop / modify on renewal.
- [Security deposit on tenancy renewal](https://sewa2u.com/security-deposit-tenancy-renewal): Deposit usually carries over. Top-up math when rent increases. Partial refund when going from 2-year to 1-year. Documenting the carryover.
- [Foreign tenant renewal](https://sewa2u.com/foreign-tenant-renewal): Pass expiry alignment with tenancy term, JIM (Immigration) address-record upkeep, what happens if the pass is denied or expires mid-term.
- [Tenancy renewal checklist](https://sewa2u.com/tenancy-renewal-checklist): Required vs nice-to-have sections of a Malaysia renewal agreement. Witness rules, ETA e-signature validity, LHDN stamping requirements.
- [Private property renewal — what's different from residential](https://sewa2u.com/private-property-tenancy-renewal): MCST bylaws apply, no property approval, longer typical leases, foreign owner Non-Resident Withholding Tax.
- [Renewing without an agent](https://sewa2u.com/renew-tenancy-without-agent): DIY renewal step-by-step, when to use an agent anyway, half-month commission savings.
- [Tenancy renewal notice period](https://sewa2u.com/tenancy-renewal-notice-period): Malaysia norm 2 months written notice, no statutory minimum, what happens if you miss the window.
- [Room rental renewal](https://sewa2u.com/room-rental-renewal): property rules for room rentals on renewal, master vs common rent gap, shared facilities, house rules.
- [Tenancy renewal letter templates](https://sewa2u.com/tenancy-renewal-letter-template): Landlord-to-tenant and tenant-to-landlord renewal notification letters, plus counter-offer template. The letter is not the agreement.
- [Common tenancy renewal pitfalls](https://sewa2u.com/common-tenancy-renewal-pitfalls): 5 typical failure modes — handshake renewal, late LHDN stamping, missed property approval, foreign tenant pass expiry mid-term, deposit dispute at end of term.
- [Landlord economics: renew vs find new tenant](https://sewa2u.com/landlord-renewal-vs-find-new-tenant): Vacancy + commission math. Typical 10%+ of annual rent cost to replace a tenant. When renewal wins vs when finding new wins.
- [Tenancy renewal — start here](https://sewa2u.com/renew): The 2-minute renewal flow.

## FAQ

- [FAQ](https://sewa2u.com/faq): Common Malaysia tenancy questions answered.

## Pricing (definitive)

- **Standard PDF:** MYR 30 — covers residential, private property, room rental, foundational clauses
- **Custom (advanced clauses):** MYR 55 — adds CCTV, custom repair thresholds, special tenancy terms
- **Renewal addendum / new renewal agreement:** MYR 30
- Preview before payment. No signup required.
- Payment methods: credit/debit card (Visa/Mastercard) via Stripe.
- Currency: MYR only.

## Stamp duty (definitive — LHDN rates 2026)

- Lease ≤ 1 year: RM1 per RM250 of annual rent.
- Lease 1–3 years: 0.4% of average annual rent.
- File with LHDN within 14 days of signing (30 days if signed overseas).
- Same rate applies to renewals as to new tenancies.
- Same rate applies to residential and private property.
- Tenant typically pays by Malaysia convention; parties can specify otherwise.

## Authoritative external references

- [LHDN — Stamp duty for leases](https://www.hasil.gov.my/): Malaysia tax authority on tenancy stamp duty.
- [Residential — Renting out property](https://www.kpkt.gov.my/): authoritative rules on renting out residential property (tenancy registration with Tribunal) process.
- [Immigration Department Malaysia (Jabatan Imigresen)](https://www.imi.gov.my/): Pass types and foreign-tenant registration context.

## Site policy

- Privacy: form data is stored client-side (sessionStorage / localStorage) until checkout, then transmitted only to generate the PDF. Not retained server-side after delivery.
- All PDFs are generated server-side from user-provided form data. We do not store, read, or share signed agreements.
- This site does not provide legal advice. Generated agreements follow common Malaysia tenancy practice and LHDN stamp duty norms but are not a substitute for a Malaysia-qualified lawyer for non-standard situations.

## Contact

- Email: noreply@sewa2u.com (transactional only)
- Operator portfolio: https://whooshinglander.vercel.app
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
