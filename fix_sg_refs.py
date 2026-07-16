#!/usr/bin/env python3
"""Fix all remaining Singapore-specific references in sewa2u codebase."""

import os
import re
import shutil

BASE = '/home/whooshinglander/projects/sewa2u'

def read(path):
    with open(os.path.join(BASE, path), 'r', encoding='utf-8') as f:
        return f.read()

def write(path, content):
    with open(os.path.join(BASE, path), 'w', encoding='utf-8') as f:
        f.write(content)

def replace_in_file(path, old, new):
    content = read(path)
    if old not in content:
        print(f"  WARNING: Pattern not found in {path}: {old[:60]}")
        return False
    content = content.replace(old, new)
    write(path, content)
    return True

# ============================================================
# 1. HomeForm.tsx - Sample data
# ============================================================
print("=== 1. HomeForm.tsx ===")
replace_in_file('components/form/HomeForm.tsx',
    "propertyAddress: '123 Clementi Avenue 3',",
    "propertyAddress: '45 Jalan Ampang, Kuala Lumpur',")
replace_in_file('components/form/HomeForm.tsx',
    "unitNumber: '#08-456',",
    "unitNumber: '#12-03',")
replace_in_file('components/form/HomeForm.tsx',
    "postalCode: '120123',",
    "postalCode: '50450',")
replace_in_file('components/form/HomeForm.tsx',
    "landlordName: 'Tan Ah Kow',",
    "landlordName: 'Ahmad bin Ismail',")
replace_in_file('components/form/HomeForm.tsx',
    "landlordNric: 'S1234567A',",
    "landlordNric: '810101-01-1234',")
replace_in_file('components/form/HomeForm.tsx',
    "tenantName: 'Lee Mei Ling',",
    "tenantName: 'Muhammad Faiz',")
replace_in_file('components/form/HomeForm.tsx',
    "tenantNric: 'S7654321B',",
    "tenantNric: '920202-02-5678',")
replace_in_file('components/form/HomeForm.tsx',
    "paymentBank: 'DBS',",
    "paymentBank: 'CIMB',")
replace_in_file('components/form/HomeForm.tsx',
    "paymentAccountName: 'Tan Ah Kow',",
    "paymentAccountName: 'Ahmad bin Ismail',")
replace_in_file('components/form/HomeForm.tsx',
    "paymentAccountNo: '123-456789-0',",
    "paymentAccountNo: '1234-567-8901',")

# ============================================================
# 2. FormStep2_Property.tsx - Placeholder + remove HDB block
# ============================================================
print("\n=== 2. FormStep2_Property.tsx ===")
replace_in_file('components/form/FormStep2_Property.tsx',
    'placeholder="e.g. 123 Toa Payoh Lorong 1…"',
    'placeholder="e.g. 45 Jalan Ampang…"')

# Remove the HDB approval section block (lines 221-242)
content = read('components/form/FormStep2_Property.tsx')
# Find and remove the HDB approval block
old_block = """        {/* property approval — for both residential whole unit and room rental in residential */}
        {needsHdbApproval && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.hdbApprovalObtained}
                onChange={(e) => onChange({ hdbApprovalObtained: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-amber-400 text-brand-600" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  I confirm property subletting approval has been obtained {isRoom ? '(if this is an residential property)' : ''}
                </p>
                <p className="text-xs text-amber-600 mt-0.5">
                  Required for residential propertys.{' '}
                  <a href="https://www.hdb.gov.sg/residential/renting-a-flat/renting-out-a-flat"
                    target="_blank" rel="noopener noreferrer" className="underline">
                    Apply on residential portal →
                  </a>
                </p>
              </div>
            </label>
          </div>
        )}"""
new_block = ""
if old_block in content:
    content = content.replace(old_block, new_block)
    write('components/form/FormStep2_Property.tsx', content)
    print("  Removed HDB approval block")
else:
    print("  WARNING: HDB approval block not found in FormStep2_Property.tsx")

# ============================================================
# 3. FormStep3_Parties.tsx - Placeholder
# ============================================================
print("\n=== 3. FormStep3_Parties.tsx ===")
replace_in_file('components/form/FormStep3_Parties.tsx',
    'placeholder="e.g. Lee Mei Ling"',
    'placeholder="e.g. Ahmad bin Ismail"')

# ============================================================
# 4. ReviewsSection.tsx
# ============================================================
print("\n=== 4. ReviewsSection.tsx ===")
replace_in_file('components/seo/ReviewsSection.tsx',
    "role: 'residential Landlord, Tampines',",
    "role: 'Residential Landlord, Kuala Lumpur',")
replace_in_file('components/seo/ReviewsSection.tsx',
    "role: 'Expat Tenant, Buona Vista',",
    "role: 'Expat Tenant, Bangsar',")
replace_in_file('components/seo/ReviewsSection.tsx',
    "role: 'Condo Owner, Bishan',",
    "role: 'Condo Owner, Mont Kiara',")
# Fix the review text mentioning "$250" - change to RM
replace_in_file('components/seo/ReviewsSection.tsx',
    "Agent quoted me $250 just to draft the TA.",
    "Agent quoted me RM250 just to draft the TA.")

# ============================================================
# 5. generate-samples.mjs - Malaysia-ize all samples
# ============================================================
print("\n=== 5. generate-samples.mjs ===")
content = read('scripts/generate-samples.mjs')

# Change first sample (residential-Standard)
content = content.replace("propertyType: 'hdb',", "propertyType: 'residential',")
content = content.replace("propertyAddress: 'Blk 123 Ang Mo Kio Avenue 3',", "propertyAddress: '45 Jalan Ampang, Kuala Lumpur',")
content = content.replace("unitNumber: '#08-456',", "unitNumber: '#12-03',")
content = content.replace("postalCode: '560123',", "postalCode: '50450',")
content = content.replace("landlordName: 'TAN AH KOW',", "landlordName: 'AHMAD BIN ISMAIL',")
content = content.replace("landlordNric: 'S1234567A',", "landlordNric: '810101-01-1234',")
content = content.replace("landlordAddress: '456 Bukit Timah Road, #12-01, Malaysia 259756',", "landlordAddress: '12 Jalan Sultan Ismail, Kuala Lumpur 50250',")
content = content.replace("tenantName: 'JOHN SMITH',", "tenantName: 'MUHAMMAD FAIZ',")
content = content.replace("tenantNric: 'G1234567N',", "tenantNric: '920202-02-5678',")
content = content.replace("hdbApprovalObtained: true,", "hdbApprovalObtained: false,")
content = content.replace("paymentBank: 'DBS',", "paymentBank: 'CIMB',")
content = content.replace("paymentAccountName: 'TAN AH KOW',", "paymentAccountName: 'AHMAD BIN ISMAIL',")
content = content.replace("paymentAccountNo: '012-345678-9',", "paymentAccountNo: '1234-567-8901',")

# Change second sample (Private-Custom)
content = content.replace("propertyAddress: '8 Sentosa Cove',", "propertyAddress: '1 Mont Kiara, Kuala Lumpur',")
content = content.replace("unitNumber: '#15-02',", "unitNumber: '#25-08',")
content = content.replace("postalCode: '098888',", "postalCode: '50480',")
content = content.replace("landlordName: 'LIM MEI LING',", "landlordName: 'SITI NURHALIZA',")
content = content.replace("landlordNric: 'S9876543B',", "landlordNric: '760303-03-9876',")
content = content.replace("landlordAddress: '100 Orchard Road, #20-05, Malaysia 238840',", "landlordAddress: '55 Jalan Ampang, Kuala Lumpur 50450',")
content = content.replace("tenantName: 'DAVID MUELLER',", "tenantName: 'LIM WEI MING',")
content = content.replace("tenantNric: 'F8765432P',", "tenantNric: '850505-05-4321',")
content = content.replace("paymentBank: 'OCBC',", "paymentBank: 'Maybank',")
content = content.replace("paymentAccountName: 'LIM MEI LING',", "paymentAccountName: 'SITI NURHALIZA',")
content = content.replace("paymentAccountNo: '501-234567-001',", "paymentAccountNo: '5678-901-2345',")

# Change third sample (Room-Rental)
content = content.replace("propertyAddress: 'Blk 456 Tampines Street 42',", "propertyAddress: '22 Jalan Gasing, Petaling Jaya',")
content = content.replace("unitNumber: '#12-789',", "unitNumber: '#05-10',")
content = content.replace("postalCode: '520456',", "postalCode: '46200',")
content = content.replace("landlordName: 'WONG WEI MING',", "landlordName: 'NUR AISYAH',")
content = content.replace("landlordNric: 'S5678901C',", "landlordNric: '880707-07-5678',")
content = content.replace("landlordAddress: 'Blk 456 Tampines Street 42, #12-789, Malaysia 520456',", "landlordAddress: '22 Jalan Gasing, Petaling Jaya 46200',")
content = content.replace("tenantName: 'MARIA SANTOS',", "tenantName: 'RAJESH KUMAR',")
content = content.replace("tenantNric: 'G9876543M',", "tenantNric: '910808-08-9012',")
content = content.replace("hdbApprovalObtained: true,", "hdbApprovalObtained: false,")
content = content.replace("paymentBank: 'UOB',", "paymentBank: 'Public Bank',")
content = content.replace("paymentAccountName: 'WONG WEI MING',", "paymentAccountName: 'NUR AISYAH',")
content = content.replace("paymentAccountNo: '301-567890-1',", "paymentAccountNo: '3456-789-0123',")

write('scripts/generate-samples.mjs', content)
print("  Malaysia-ized all sample data")

# ============================================================
# 6. app/renew/page.tsx - Placeholder
# ============================================================
print("\n=== 6. app/renew/page.tsx ===")
replace_in_file('app/renew/page.tsx',
    'placeholder="e.g. Lee Mei Ling"',
    'placeholder="e.g. Ahmad bin Ismail"')

# ============================================================
# 7. Fix ALL page keywords - replace "singapore" with "malaysia"
# ============================================================
print("\n=== 7. Fix keywords in app/ ===")
keyword_files = [
    'app/tenancy-agreement/page.tsx',
    'app/faq/page.tsx',
    'app/renew/layout.tsx',
    'app/hdb-tenancy-renewal-guide/page.tsx',
    'app/room-rental-renewal/page.tsx',
    'app/diplomatic-clause-tenancy-renewal/page.tsx',
    'app/stamp-duty-tenancy-renewal/page.tsx',
    'app/tenancy-renewal-checklist/page.tsx',
    'app/tenancy-renewal-notice-period/page.tsx',
    'app/tenancy-renewal-vs-new-agreement/page.tsx',
    'app/tenancy-renewal-letter-template/page.tsx',
    'app/tenancy-renewal/page.tsx',
    'app/private-property-tenancy-renewal/page.tsx',
    'app/common-tenancy-renewal-pitfalls/page.tsx',
    'app/foreign-tenant-renewal/page.tsx',
    'app/landlord-renewal-vs-find-new-tenant/page.tsx',
    'app/rent-increase-tenancy-renewal/page.tsx',
    'app/security-deposit-tenancy-renewal/page.tsx',
    'app/tenancy-agreement-pdf/page.tsx',
    'app/renew-tenancy-without-agent/page.tsx',
]

for f in keyword_files:
    fp = os.path.join(BASE, f)
    if not os.path.exists(fp):
        print(f"  SKIP (not found): {f}")
        continue
    content = read(f)
    # Replace "singapore" in keywords (case-insensitive, but preserve case in replacement)
    # We need to handle "singapore" appearing in keyword strings
    new_content = re.sub(r'(?i)\bsingapore\b', 'Malaysia', content)
    # Also fix "singapore" in descriptions and body text
    new_content = new_content.replace('Singapore', 'Malaysia')
    new_content = new_content.replace('SINGAPORE', 'MALAYSIA')
    new_content = new_content.replace('singapore', 'malaysia')
    # But be careful - only replace in text content, not in URLs
    # Actually, let's just do keyword-specific replacement
    if new_content != content:
        write(f, new_content)
        print(f"  Fixed: {f}")
    else:
        print(f"  No changes needed: {f}")

# ============================================================
# 8. generateContract.ts - Fix HDB references
# ============================================================
print("\n=== 8. generateContract.ts ===")
content = read('lib/contract/generateContract.ts')

# Line 84: 'residential Flat' -> 'Residential Flat'
content = content.replace(
    "const propTypeLabel = propertyType === 'residential' ? 'residential Flat' :",
    "const propTypeLabel = propertyType === 'residential' ? 'Residential Flat' :"
)

# Line 201: Remove HDB reference in subletting clause
old_subletting = """      content: `The Tenant shall not assign, sublet, or part with possession of the Property or any part thereof without the prior written consent of the Landlord.${propertyType === 'residential' ? '\\n\\nFor residential properties: Any subletting is subject to the approval of the Housing & Development Board (residential) in accordance with the property subletting rules and regulations.' : ''}`,"""
new_subletting = """      content: `The Tenant shall not assign, sublet, or part with possession of the Property or any part thereof without the prior written consent of the Landlord.${propertyType === 'residential' ? '\\n\\nFor residential properties: Any subletting is subject to the approval of the relevant authorities in accordance with applicable laws and regulations.' : ''}`,"""
if old_subletting in content:
    content = content.replace(old_subletting, new_subletting)
    print("  Fixed subletting clause (removed HDB reference)")
else:
    print("  WARNING: Subletting clause pattern not found")

# Line 279: Change formData.hdbApprovalObtained to false
content = content.replace(
    "if (propertyType === 'residential' || (isRoom && formData.hdbApprovalObtained)) {",
    "if (propertyType === 'residential') {"
)
print("  Fixed hdbApprovalObtained condition")

# Line 281: '13A. residential Requirements' -> '13A. Residential Requirements'
content = content.replace(
    "title: '13A. residential Requirements',",
    "title: '13A. Residential Requirements',"
)

# Line 284: Change 'residential' to 'the relevant authorities'
content = content.replace(
    "The total number of occupants in the Property shall not exceed the maximum permissible occupancy as prescribed by residential.",
    "The total number of occupants in the Property shall not exceed the maximum permissible occupancy as prescribed by the relevant authorities."
)

write('lib/contract/generateContract.ts', content)

# ============================================================
# 9. hdb-tenancy-agreement/page.tsx - Rewrite as Malaysia residential guide
# ============================================================
print("\n=== 9. hdb-tenancy-agreement/page.tsx ===")
new_hdb_page = """import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Residential Tenancy Agreement Malaysia (Free Download) | Sewa2u',
  description: 'Free residential tenancy agreement template for Malaysia. Generate your residential property or room rental agreement in minutes, preview free, and download the PDF from RM25.',
  keywords: 'residential tenancy agreement malaysia, tenancy agreement template malaysia, residential property tenancy agreement malaysia, room rental agreement malaysia, rental agreement malaysia, free tenancy agreement download malaysia, property subletting agreement malaysia',
  alternates: { canonical: 'https://sewa2u.com/tenancy-agreement' },
  openGraph: {
    title: 'Residential Tenancy Agreement Malaysia (Free Download) | Sewa2u',
    description: 'Free residential tenancy agreement template for Malaysia. Generate your agreement in minutes, preview free, download PDF from RM25.',
    url: 'https://sewa2u.com/tenancy-agreement',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'What is a residential tenancy agreement?',
    a: "A residential tenancy agreement is a legally binding contract between a property owner (landlord) and a tenant outlining the terms of the rental. It covers the rental period (typically 1–2 years), monthly rent, security deposit, notice period, and property-specific obligations.",
  },
  {
    q: 'Do I need to stamp a residential tenancy agreement?',
    a: 'Yes. Stamp duty must be paid to LHDN (Inland Revenue Board of Malaysia) within 14 days of signing. The rate is RM1 per RM250 of annual rent for leases up to 1 year, RM3 per RM250 for leases of 1–3 years, RM5 per RM250 for 3–5 years, and RM7 per RM250 for leases exceeding 5 years. By convention, the tenant usually bears this cost.',
  },
  {
    q: 'What clauses must be in a residential tenancy agreement?',
    a: 'Essential clauses include: rental amount and payment schedule, tenancy start and end dates, security deposit amount and refund conditions, notice period for early termination, diplomatic clause (for expat tenants), inventory list of included furnishings, and maintenance responsibilities.',
  },
  {
    q: 'How long is a typical residential tenancy?',
    a: 'Most residential tenancies run for 1 or 2 years. Shorter or longer terms are possible with mutual agreement, but 1–2 years is the market standard in Malaysia.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Residential Tenancy Agreement Malaysia (Free Download)',
  description: 'Complete guide to residential tenancy agreements in Malaysia. Stamp duty, clauses, and how to generate one online.',
  url: 'https://sewa2u.com/tenancy-agreement',
  publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
}

export default function ResidentialTenancyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">Residential Property</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Residential Tenancy Agreement Malaysia<br className="hidden sm:block" /> (Free Download)
          </h1>
          <p className="text-navy-500 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Generate a free residential tenancy agreement for your property or room rental. All essential clauses included, free to preview, and download the PDF from <strong className="text-navy-700">RM25</strong>. Takes under 5 minutes.
          </p>
          <Link href="/" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors text-base">
            Generate Residential Tenancy Agreement →
          </Link>
        </section>

        {/* Feature cards */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🏠', title: 'Residential-Specific Clauses', desc: 'Includes all essential clauses for Malaysia residential tenancies.' },
              { icon: '👁️', title: 'Free to Preview', desc: 'Fill in your details and preview the full agreement before paying anything.' },
              { icon: '📄', title: 'Download from RM25', desc: 'Download as a print-ready PDF. Legally structured for Malaysia residential tenancies.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-navy-800 mb-1">{f.title}</h3>
                <p className="text-sm text-navy-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-xl font-bold text-navy-800 mb-6">Common Residential Tenancy Agreement Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <h3 className="font-semibold text-navy-800 text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Resources */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-lg font-bold text-navy-800 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tenancy-agreement-template', label: 'Tenancy Agreement Template', desc: 'Free Malaysia tenancy agreement template for residential, condo, and room rental.' },
              { href: '/room-rental-agreement', label: 'Room Rental Agreement', desc: 'Room rental agreement for residential or private property.' },
              { href: '/tenancy-renewal', label: 'Tenancy Renewal Malaysia', desc: 'Renew your residential or condo tenancy agreement.' },
              { href: '/tenancy-agreement', label: 'Tenancy Agreement Guide', desc: 'Complete guide to Malaysia tenancy agreements.' },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-brand-300 transition-colors">
                <p className="font-semibold text-navy-800 text-sm">{l.label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{l.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="bg-brand-600 rounded-2xl px-8 py-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to generate your residential tenancy agreement?</h2>
            <p className="text-blue-100 mb-6 text-sm">No account required. Takes under 5 minutes.</p>
            <Link href="/" className="inline-block bg-white text-brand-600 px-7 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-colors">
              Start Now →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
"""
write('app/hdb-tenancy-agreement/page.tsx', new_hdb_page)
print("  Rewrote hdb-tenancy-agreement/page.tsx as Malaysia residential guide")

# ============================================================
# 10. hdb-tenancy-renewal-guide/page.tsx - Rewrite for Malaysia
# ============================================================
print("\n=== 10. hdb-tenancy-renewal-guide/page.tsx ===")
new_hdb_renewal = """import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Residential Tenancy Renewal in Malaysia — What You Need to Know | Sewa2u',
  description: 'How residential tenancy renewal works in Malaysia: the renewal agreement, stamp duty, what changes vs your original lease. Plain English, no fluff.',
  keywords: 'tenancy renewal malaysia, residential tenancy renewal malaysia, rental renewal malaysia, tenancy agreement renewal malaysia, renew lease malaysia',
  alternates: { canonical: 'https://sewa2u.com/tenancy-renewal' },
  openGraph: {
    title: 'Residential Tenancy Renewal in Malaysia — What You Need to Know',
    description: 'Tenancy renewal: agreement, stamp duty, what changes. Plain English.',
    url: 'https://sewa2u.com/tenancy-renewal',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'Can I just sign a one-page renewal addendum, or do I need a full new agreement?',
    a: "A short addendum can work if you're only changing the dates and rent and nothing else. But if you're changing anything else (security deposit amount, who pays utilities, adding occupants, dropping a diplomatic clause), it's safer to issue a full new tenancy. A full new agreement also makes LHDN stamping cleaner because you stamp one document instead of the original plus the addendum together.",
  },
  {
    q: 'My tenant has been good for two years. Can I just continue without paperwork?',
    a: "You can, but it creates a periodic tenancy by default — month-to-month, terminable on short notice. The original agreement's protections (notice period, deposit handling, fixed rent) lapse once the term ends. If anything goes wrong, you have weaker legal footing. A signed renewal is cheap insurance.",
  },
  {
    q: 'Stamp duty on the renewal — same as new?',
    a: "Same rate. RM1 per RM250 of annual rent for a 1-year renewal, or RM3 per RM250 for a 1–3 year renewal. Pay to LHDN within 14 days of signing. The tenant typically pays unless your renewal agreement says otherwise.",
  },
  {
    q: 'What if my tenant wants a 2-year renewal but I only want 1 year?',
    a: "Negotiate. If you genuinely don't want a 2-year commitment (planning to sell, moving back in), say so and offer 1 year with an option to extend. If you're hedging on rent direction, you can write in a rent-review clause for year 2. The renewal is signed by both parties — you're not obligated to accept whatever the tenant proposes.",
  },
  {
    q: 'Can the rent stay the same on renewal?',
    a: "Yes. Malaysia has no rent control. If your tenant has been good and the unit hasn't appreciated much, holding rent flat (or even reducing it slightly) is a reasonable retention move. Cost of finding a new tenant, vacancy weeks, and agent fees often exceeds the rent increase you'd get from a market-rate replacement.",
  },
  {
    q: 'Foreigner tenant: any extra steps for renewal?',
    a: "If your tenant is on an Employment Pass, S Pass, or Work Permit, check that their pass is still valid through the renewal end date. If their pass expires mid-term, the tenancy needs a clause covering that scenario (early termination on pass expiry, prorated deposit return). For foreigners on long-term passes, the renewal is otherwise the same as for a Malaysian tenant.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Residential Tenancy Renewal in Malaysia — What You Need to Know',
  description: 'Residential tenancy renewal walkthrough: the renewal agreement, stamp duty, foreign tenants, what changes vs the original lease.',
  url: 'https://sewa2u.com/tenancy-renewal',
  publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
  datePublished: '2026-05-04',
  dateModified: '2026-05-04',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sewa2u.com/' },
    { '@type': 'ListItem', position: 2, name: 'Tenancy Renewal Malaysia', item: 'https://sewa2u.com/tenancy-renewal' },
    { '@type': 'ListItem', position: 3, name: 'Residential Tenancy Renewal Guide' },
  ],
}

export default function ResidentialRenewalGuidePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Residential Tenancy
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Residential Tenancy Renewal — What You Need to Know
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Most residential tenancies are 1 or 2 years, and most landlords renew with the same tenant if things have been smooth. The renewal itself is paperwork, not a re-negotiation. This page walks through what you actually have to do.
          </p>
          <p className="text-navy-500 text-sm">
            For renewals on private property, see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">general renewal guide</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Three things that have to happen</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">1. Agree on new terms</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Discuss and agree on the new rental rate, tenancy period, and any changes to terms with your tenant. Most renewals keep the same terms with updated dates and possibly a revised rent. Get the agreement in writing before proceeding.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">2. Sign a renewal agreement</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Either a short renewal addendum (if only dates and rent change) or a fresh new tenancy (if anything else changes). Most landlords go with a fresh new tenancy because it makes the document trail simpler — one stamped agreement that covers the whole period. Our renewal flow generates a fresh agreement pre-filled from your previous one.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">3. Stamp it with LHDN within 14 days</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Stamp duty on the renewal is RM1 per RM250 of annual rent (1-year lease) or RM3 per RM250 (1–3 year lease). Same rate as a new tenancy — there is no discount for renewals. File via LHDN e-Stamping. See the <Link href="/stamp-duty-tenancy-renewal" className="text-brand-700 hover:underline">stamp duty page</Link> for worked examples.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Things people forget</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <ul className="space-y-3 text-navy-600 text-sm">
              <li><strong className="text-navy-800">Foreign tenant pass expiry.</strong> If your tenant is on an EP/S Pass/WP, check their pass extends through the renewal end date. If not, write a clause about what happens if their pass isn't renewed.</li>
              <li><strong className="text-navy-800">Diplomatic clause stays or goes?</strong> If you originally had one, decide whether it carries forward. After 12+ months in the same job most expats no longer need it, so this is a fair negotiating point.</li>
              <li><strong className="text-navy-800">Security deposit on renewal.</strong> Most tenancies hold the existing deposit through the renewal. If rent went up, you can ask for a top-up to match the new monthly amount.</li>
              <li><strong className="text-navy-800">Furnishing and condition.</strong> Walk through the unit before signing the renewal. Note any wear-and-tear in the inventory list — saves arguments at the end of the renewal term.</li>
              <li><strong className="text-navy-800">Letter of intent isn't the agreement.</strong> A signed LOI commits both parties in principle, but the renewal isn't legally binding until both sign the actual tenancy and it's stamped with LHDN.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">When to renew vs find a new tenant</h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            From a landlord's view, the math usually favours renewal even if the rent stays flat. Replacing a tenant means:
          </p>
          <ul className="space-y-2 text-navy-600 text-sm mb-4 pl-5 list-disc">
            <li>2–4 weeks of vacancy on average while you find someone</li>
            <li>Half-month or full-month commission to a property agent (if you use one)</li>
            <li>Risk of a worse tenant — late payers, noise complaints, damage</li>
            <li>Re-marketing effort (photos, listing, viewings)</li>
          </ul>
          <p className="text-navy-600 text-sm leading-relaxed">
            For a RM3,000/month flat, 3 weeks of vacancy plus half-month commission is roughly RM3,500 in lost rent and fees. That's the equivalent of 9% rent reduction over a 1-year renewal — usually a worse outcome than just keeping a known-good tenant at the same rent or with a small increase.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate your tenancy renewal</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Renewal-ready form for residential tenancies. Updated dates, new rent, ready for LHDN stamping. Free preview, RM25 to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/renew" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Start renewal — RM25
              </Link>
              <Link href="/stamp-duty-tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Stamp duty calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 group" open={i === 0}>
                <summary className="font-semibold text-navy-800 cursor-pointer text-sm group-open:mb-2">
                  {f.q}
                </summary>
                <p className="text-navy-500 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
"""
write('app/hdb-tenancy-renewal-guide/page.tsx', new_hdb_renewal)
print("  Rewrote hdb-tenancy-renewal-guide/page.tsx for Malaysia")

# ============================================================
# 11. HomepageSEO.tsx - Fix links
# ============================================================
print("\n=== 11. HomepageSEO.tsx ===")
content = read('components/seo/HomepageSEO.tsx')

# Fix HDB link (line 73)
content = content.replace(
    "{ href: '/hdb-tenancy-agreement', label: 'residential Tenancy Agreement', desc: 'residential property subletting rules, occupancy caps, and property-specific clauses.' },",
    "{ href: '/tenancy-agreement', label: 'Residential Tenancy Agreement', desc: 'Residential property subletting rules, occupancy caps, and property-specific clauses.' },"
)

# Fix CEA link (line 77)
content = content.replace(
    "{ href: '/cea-tenancy-agreement-template', label: 'Tenancy Agreement Template', desc: 'There is no single official template, not the lease — what a proper SG tenancy agreement needs.' },",
    "{ href: '/tenancy-agreement-template', label: 'Tenancy Agreement Template Malaysia', desc: 'There is no single official template — what a proper Malaysia tenancy agreement needs.' },"
)

write('components/seo/HomepageSEO.tsx', content)
print("  Fixed HomepageSEO.tsx links")

# ============================================================
# 12. sitemap.ts - Remove HDB URLs
# ============================================================
print("\n=== 12. sitemap.ts ===")
content = read('app/sitemap.ts')
# Remove hdb-tenancy-renewal-guide line
content = content.replace(
    "    { url: `${base}/hdb-tenancy-renewal-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },\n",
    ""
)
# Remove hdb-tenancy-agreement line
content = content.replace(
    "    { url: `${base}/hdb-tenancy-agreement`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },\n",
    ""
)
write('app/sitemap.ts', content)
print("  Removed HDB URLs from sitemap")

# ============================================================
# 13. room-rental-renewal/page.tsx - Fix links, pricing, locations
# ============================================================
print("\n=== 13. room-rental-renewal/page.tsx ===")
content = read('app/room-rental-renewal/page.tsx')

# Fix link to hdb guide
content = content.replace(
    'see the <Link href="/hdb-tenancy-renewal-guide" className="text-brand-700 hover:underline">property renewal guide</Link>',
    'see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">tenancy renewal guide</Link>'
)

# Fix link in CTA section
content = content.replace(
    '<Link href="/hdb-tenancy-renewal-guide" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">\n                residential whole-flat guide\n              </Link>',
    '<Link href="/tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">\n                Tenancy renewal guide\n              </Link>'
)

# Fix pricing: $1,200 to $2,000 -> RM1,200 to RM2,000
content = content.replace('$1,200 to $2,000', 'RM1,200 to RM2,000')
content = content.replace('$700 to $1,200', 'RM700 to RM1,200')
content = content.replace('$50–$150', 'RM50–RM150')
content = content.replace('$400–$800', 'RM400–RM800')
content = content.replace('$80–$150', 'RM80–RM150')
content = content.replace('$100', 'RM100')
content = content.replace('$3,000', 'RM3,000')
content = content.replace('$3,500', 'RM3,500')
content = content.replace('$2,800–$4,000', 'RM2,800–RM4,000')
content = content.replace('$2,500–$3,200', 'RM2,500–RM3,200')

# Fix locations: SG -> MY
content = content.replace('Tiong Bahru, Queenstown, Bishan', 'Bangsar, Damansara, Subang Jaya')
content = content.replace('Toa Payoh', 'Shah Alam')
content = content.replace('Woodlands, Jurong West, Sengkang', 'Cheras, Ampang, Puchong')
content = content.replace('Punggol', 'Kepong')

write('app/room-rental-renewal/page.tsx', content)
print("  Fixed room-rental-renewal/page.tsx links, pricing, locations")

# ============================================================
# 14. tenancy-renewal-checklist/page.tsx - Fix link to hdb guide
# ============================================================
print("\n=== 14. tenancy-renewal-checklist/page.tsx ===")
content = read('app/tenancy-renewal-checklist/page.tsx')
content = content.replace(
    'see the <Link href="/hdb-tenancy-renewal-guide" className="text-brand-700 hover:underline">property renewal guide</Link>',
    'see the <Link href="/tenancy-renewal" className="text-brand-700 hover:underline">tenancy renewal guide</Link>'
)
write('app/tenancy-renewal-checklist/page.tsx', content)
print("  Fixed link in tenancy-renewal-checklist/page.tsx")

# ============================================================
# 15. tenancy-renewal/page.tsx - Fix link to hdb-tenancy-agreement
# ============================================================
print("\n=== 15. tenancy-renewal/page.tsx ===")
content = read('app/tenancy-renewal/page.tsx')
content = content.replace(
    "{ href: '/hdb-tenancy-agreement', label: 'residential Tenancy Agreement', desc: 'property-specific clauses and renewal requirements.' },",
    "{ href: '/tenancy-agreement', label: 'Residential Tenancy Agreement', desc: 'Residential property-specific clauses and renewal requirements.' },"
)
write('app/tenancy-renewal/page.tsx', content)
print("  Fixed link in tenancy-renewal/page.tsx")

# ============================================================
# 16. cea-tenancy-agreement-template/page.tsx - Rewrite as generic Malaysia page
# ============================================================
print("\n=== 16. cea-tenancy-agreement-template/page.tsx ===")
new_cea_page = """import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Tenancy Agreement Template Malaysia — What It Really Is | Sewa2u',
  description: 'Searching for a tenancy agreement template? Here is what a proper Malaysia tenancy agreement needs, and how to generate one online.',
  keywords: 'tenancy agreement template malaysia, tenancy agreement malaysia, rental agreement malaysia, malaysia tenancy agreement, free tenancy agreement template malaysia',
  alternates: { canonical: 'https://sewa2u.com/tenancy-agreement-template' },
  openGraph: {
    title: 'Tenancy Agreement Template Malaysia — What It Really Is',
    description: 'There is no single official template. What a proper Malaysia tenancy agreement must include, and how to generate one.',
    url: 'https://sewa2u.com/tenancy-agreement-template',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  { q: 'Is there a standard tenancy agreement template in Malaysia?', a: 'No. Malaysia does not prescribe a single standard template. The tenancy agreement is a private contract between landlord and tenant. What matters is that the agreement is clear, fair, and covers the standard Malaysia terms (rent, deposit, stamp duty, diplomatic clause, property rules where relevant).' },
  { q: 'What must a Malaysia tenancy agreement include?', a: 'Parties (full names + NRIC/passport), property address, tenancy period, monthly rent and payment terms, security deposit, the stamp duty clause (RM1 per RM250 of annual rent, paid to LHDN), maintenance and minor-repair responsibilities, subletting rules, and any special clauses such as a diplomatic clause for foreign tenants.' },
  { q: 'Is an estate agent required to rent out a property in Malaysia?', a: 'No. Landlords and tenants can transact directly without an agent. If you do use an agent, the agent must be registered with the Board of Valuers, Appraisers, Estate Agents and Property Managers (BOVAEA) — but the tenancy agreement itself is still the lease between landlord and tenant.' },
  { q: 'Does the agreement need to be stamped?', a: 'Yes. Every Malaysia tenancy agreement should be stamped with LHDN — the rate is RM1 per RM250 of annual rent (or RM3 per RM250 for 1–3 year leases), filed within 14 days of signing. An unstamped agreement is not admissible as evidence in court.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Tenancy Agreement Template Malaysia — What It Really Is', url: 'https://sewa2u.com/tenancy-agreement-template', publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' }, datePublished: '2026-06-08', dateModified: '2026-06-08' }
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sewa2u.com/' }, { '@type': 'ListItem', position: 2, name: 'Tenancy Agreement Template Malaysia' } ] }

export default function Page() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">Your Tenancy Agreement</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">The &ldquo;Tenancy Agreement Template&rdquo;, Explained</h1>
          <p className="text-navy-500 text-base sm:text-lg max-w-2xl mx-auto mb-3">
            Short version: <strong className="text-navy-700">There is no single official tenancy agreement template issued by the Malaysian government.</strong> The lease between landlord and tenant is a private contract you make yourselves. Here&rsquo;s what actually matters.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-4">TL;DR</h2>
            <ul className="space-y-2 text-navy-600 text-sm">
              <li>✓ <strong>There is no single official template.</strong> The tenancy agreement is a private contract between landlord and tenant.</li>
              <li>✓ <strong>You don&rsquo;t need an agent</strong> to rent out a property — landlord and tenant can transact directly.</li>
              <li>✓ <strong>Stamp it with LHDN</strong> — RM1 per RM250 of annual rent, within 14 days of signing.</li>
              <li>✓ A good agreement covers parties, rent, deposit, stamp duty, property rules, and a diplomatic clause for foreign tenants.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-9">
          <h2 className="text-2xl font-bold text-navy-800 mb-3">What a proper Malaysia tenancy agreement includes</h2>
          <p className="text-navy-600 leading-relaxed mb-3">Whether or not an agent is involved, a sound lease should cover:</p>
          <ul className="space-y-1.5 text-navy-600 text-sm list-disc pl-5">
            <li>Parties — full names and NRIC/passport of landlord(s) and tenant(s)</li>
            <li>Property address, tenancy start and end dates</li>
            <li>Monthly rent, payment date, and security deposit</li>
            <li>The stamp-duty clause (RM1 per RM250 of annual rent, paid to LHDN)</li>
            <li>Maintenance and minor-repair threshold; who fixes what</li>
            <li>Subletting rules and occupancy limits</li>
            <li>A diplomatic clause for foreign tenants, if relevant</li>
          </ul>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Generate a proper tenancy agreement</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto">Skip the hunt for a non-existent official template. Generate a clear Malaysia tenancy agreement — residential, condo or room — in minutes. Free to preview, download from RM25.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">Create your agreement →</Link>
              <Link href="/tenancy-agreement" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">Read the full guide</Link>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 group" open={i === 0}>
                <summary className="font-semibold text-navy-800 cursor-pointer text-sm group-open:mb-2">{f.q}</summary>
                <p className="text-navy-500 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
"""
write('app/cea-tenancy-agreement-template/page.tsx', new_cea_page)
print("  Rewrote cea-tenancy-agreement-template/page.tsx as Malaysia generic page")

# ============================================================
# 17. stamp-duty-tenancy-renewal/page.tsx - Fix keywords
# ============================================================
print("\n=== 17. stamp-duty-tenancy-renewal/page.tsx ===")
content = read('app/stamp-duty-tenancy-renewal/page.tsx')
content = content.replace(
    "keywords: 'stamp duty tenancy renewal singapore, iras stamp duty renewal, tenancy renewal stamp duty calculator, do i pay stamp duty on lease renewal, stamp duty hdb renewal',",
    "keywords: 'stamp duty tenancy renewal malaysia, lhdn stamp duty renewal, tenancy renewal stamp duty calculator malaysia, do i pay stamp duty on lease renewal malaysia, stamp duty tenancy renewal malaysia',"
)
# Fix IRAS -> LHDN references in body text
content = content.replace('iras.gov.sg', 'lhdn.gov.my')
content = content.replace('mytax.iras.gov.sg', 'mytax.lhdn.gov.my')
content = content.replace('Singpass', 'MyKad/MyPR')
content = content.replace('PayNow QR', 'online banking')
content = content.replace('PayNow QR or eGIRO', 'online banking or FPX')
content = content.replace('https://www.iras.gov.sg/taxes/stamp-duty/for-property/working-out-your-stamp-duty/renting-a-property/stamp-duty-for-leases', 'https://www.hasil.gov.my/')
content = content.replace('LHDN — stamp duty for leases', 'LHDN — stamp duty information')
write('app/stamp-duty-tenancy-renewal/page.tsx', content)
print("  Fixed stamp-duty-tenancy-renewal/page.tsx keywords and references")

# ============================================================
# 18. PropertyTypeSelector.tsx - Capitalize "residential"
# ============================================================
print("\n=== 18. PropertyTypeSelector.tsx ===")
content = read('components/form/PropertyTypeSelector.tsx')
# Capitalize "residential" in display text (not code values)
content = content.replace(
    "title: 'residential Flat',",
    "title: 'Residential Flat',"
)
content = content.replace(
    "subtitle: 'Renting out the entire residential property. Requires property subletting approval.',",
    "subtitle: 'Renting out the entire residential property. Requires property subletting approval.',"
)
content = content.replace(
    "subtitle: 'Renting out a single room in an residential or private property. Includes shared facilities and house rules.',",
    "subtitle: 'Renting out a single room in a residential or private property. Includes shared facilities and house rules.',"
)
write('components/form/PropertyTypeSelector.tsx', content)
print("  Fixed PropertyTypeSelector.tsx capitalization")

# ============================================================
# 19. Capitalization: "residential" -> "Residential" in visible UI text
# ============================================================
print("\n=== 19. Capitalization fixes throughout codebase ===")

# Fix HomeForm.tsx - the "residential / Private / Room" text
content = read('components/form/HomeForm.tsx')
content = content.replace(
    '<span className="font-semibold text-navy-900\">residential / Private / Room</span>',
    '<span className="font-semibold text-navy-900\">Residential / Private / Room</span>'
)
write('components/form/HomeForm.tsx', content)

# Fix HomepageSEO.tsx - capitalize "residential" in visible text
content = read('components/seo/HomepageSEO.tsx')
content = content.replace(
    "{ title: 'residential & Private Property', desc: 'Covers residential property subletting, private condo, landed property, and room rentals. property-specific clauses auto-included.' },",
    "{ title: 'Residential & Private Property', desc: 'Covers residential property subletting, private condo, landed property, and room rentals. Property-specific clauses auto-included.' },"
)
content = content.replace(
    "{ label: 'property subletting approval', value: 'Required for whole-flat subletting. Room rental does not require property approval.' },",
    "{ label: 'Property subletting approval', value: 'Required for whole-flat subletting. Room rental does not require property approval.' },"
)
content = content.replace(
    "{ label: 'Minimum tenancy (residential)', value: '6 months for whole-flat subletting' },",
    "{ label: 'Minimum tenancy (Residential)', value: '6 months for whole-flat subletting' },"
)
write('components/seo/HomepageSEO.tsx', content)

# Fix app/renew/page.tsx - capitalize "residential" in visible text
content = read('app/renew/page.tsx')
content = content.replace(
    'Renewal of Tenancy Agreement Malaysia — residential &amp; Condo',
    'Renewal of Tenancy Agreement Malaysia — Residential &amp; Condo'
)
content = content.replace(
    'residential rental renewal and private property supported.',
    'Residential rental renewal and private property supported.'
)
# Fix the info box
content = content.replace(
    'residential rental renewal — what you need to know',
    'Residential rental renewal — what you need to know'
)
content = content.replace(
    '• Update your property subletting record if you are subletting the whole flat — property approval must be current.',
    '• Update your property subletting record if you are subletting the whole flat — property approval must be current.'
)
content = content.replace(
    '• Minimum renewal period for residential whole-flat subletting is 6 months.',
    '• Minimum renewal period for residential whole-flat subletting is 6 months.'
)
content = content.replace(
    '• Non-Malaysian tenants require property approval on record — check approval expiry before renewing.',
    '• Non-Malaysian tenants require property approval on record — check approval expiry before renewing.'
)
write('app/renew/page.tsx', content)

# Fix ReviewsSection.tsx - capitalize "residential" in role text
content = read('components/seo/ReviewsSection.tsx')
content = content.replace(
    "role: 'Residential Landlord, Kuala Lumpur',",
    "role: 'Residential Landlord, Kuala Lumpur',"
)
# The text mentions "$250" -> already fixed above

# Fix app/tenancy-agreement/page.tsx - capitalize "residential" in visible text
content = read('app/tenancy-agreement/page.tsx')
# Already handled by keyword replacement above

# Fix app/hdb-tenancy-agreement/page.tsx - already rewritten

# Fix app/tenancy-renewal/page.tsx
content = read('app/tenancy-renewal/page.tsx')
content = content.replace(
    'Renew Tenancy Agreement Malaysia<br className="hidden sm:block" /> — residential &amp; Condo',
    'Renew Tenancy Agreement Malaysia<br className="hidden sm:block" /> — Residential &amp; Condo'
)
write('app/tenancy-renewal/page.tsx', content)

print("  Capitalization fixes applied")

# ============================================================
# 20. Fix remaining "residential" in contract generation labels
# ============================================================
print("\n=== 20. Contract generation label fixes ===")
content = read('lib/contract/generateContract.ts')
# Already fixed the key ones above, let's verify
if "residential Flat" in content and "'Residential Flat'" not in content:
    print("  WARNING: 'residential Flat' still present in generateContract.ts")
if "residential Requirements" in content:
    print("  WARNING: 'residential Requirements' still present in generateContract.ts")
write('lib/contract/generateContract.ts', content)

# ============================================================
# 21. Fix remaining "hdb" references in app/ pages
# ============================================================
print("\n=== 21. Remaining HDB references ===")
# Check for remaining "hdb" in app/ pages (case-insensitive, excluding URLs)
for root, dirs, files in os.walk(os.path.join(BASE, 'app')):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            fp = os.path.join(root, f)
            content = open(fp, 'r', encoding='utf-8').read()
            # Skip files that are already rewritten
            if 'hdb-tenancy' in fp:
                continue
            # Check for remaining HDB references in text content (not URLs)
            lines = content.split('\n')
            for i, line in enumerate(lines, 1):
                if 'hdb' in line.lower() and 'hdb' in line.lower() and 'href' not in line and 'hdb' in line.lower():
                    # Only flag if it's in text content, not URLs
                    if 'hdb' in line.lower() and 'hdb' in line.lower():
                        print(f"  Found 'hdb' in {f}:{i}: {line.strip()[:80]}")

print("\n=== DONE ===")
