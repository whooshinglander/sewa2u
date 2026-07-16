#!/usr/bin/env python3
"""
Adapt sgtenancy codebase for Malaysia (sewa2u).
Performs all bulk text replacements across .ts, .tsx, .json, .mjs, .css, .md files.
"""
import os
import re
import shutil
import glob

BASE = os.path.expanduser('~/projects/sewa2u')

# Directories/files to skip
SKIP_DIRS = {'node_modules', '.next', '.vercel', '_bmad', '.git'}
SKIP_PATHS = {
    os.path.join(BASE, 'scripts/adapt-malaysia.py'),  # this script itself
}

def is_skip_dir(path):
    rel = os.path.relpath(path, BASE)
    parts = rel.split(os.sep)
    return any(s in parts for s in SKIP_DIRS)

def find_files():
    """Find all .ts, .tsx, .json, .mjs, .css, .md files."""
    files = []
    for ext in ('*.ts', '*.tsx', '*.json', '*.mjs', '*.css', '*.md'):
        pattern = os.path.join(BASE, '**', ext)
        for f in glob.glob(pattern, recursive=True):
            if is_skip_dir(f):
                continue
            if f in SKIP_PATHS:
                continue
            files.append(f)
    return sorted(files)

def read_file(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def count_occurrences(content, *patterns):
    """Count occurrences of patterns (for logging)."""
    total = 0
    for p in patterns:
        if isinstance(p, str):
            total += content.count(p)
        else:
            total += len(p.findall(content))
    return total

def do_replacements():
    files = find_files()
    print(f"Found {len(files)} files to process")

    # Track stats
    stats = {}
    total_changed = 0

    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content
        changes = []

        # 1. sgtenancy.com → sewa2u.com (do this BEFORE sgtenancy → sewa2u)
        #    to avoid double-replacing
        new_content = content.replace('sgtenancy.com', 'sewa2u.com')
        if new_content != content:
            changes.append('sgtenancy.com→sewa2u.com')
            content = new_content

        # 2. sgtenancy → sewa2u (brand name)
        #    But be careful: "sgtenancy" appears in sessionStorage keys like
        #    'sgtenancy_form', 'sgtenancy_tier', etc. We want to replace those too.
        new_content = content.replace('sgtenancy', 'sewa2u')
        if new_content != content:
            changes.append('sgtenancy→sewa2u')
            content = new_content

        # 3. noreply@sgtenancy.com → noreply@sewa2u.com (already handled by #1)

        # 4. Singapore → Malaysia (country name)
        #    But preserve "Singapore" in URLs that reference Singapore-specific pages
        #    We'll be careful with this. The pattern: replace "Singapore" when it appears
        #    as a standalone country reference, not in URLs/paths.
        #    Actually, let's just do a straight replacement for now, then fix URLs.
        new_content = content.replace('Singapore', 'Malaysia')
        if new_content != content:
            changes.append('Singapore→Malaysia')
            content = new_content

        # 5. SGD → MYR
        new_content = content.replace('SGD', 'MYR')
        if new_content != content:
            changes.append('SGD→MYR')
            content = new_content

        # 6. S$ → RM (currency symbol)
        #    Use regex with word boundary lookarounds
        new_content = re.sub(r'S\$', 'RM', content)
        if new_content != content:
            changes.append('S$→RM')
            content = new_content

        # 7. IRAS → LHDN
        new_content = content.replace('IRAS', 'LHDN')
        if new_content != content:
            changes.append('IRAS→LHDN')
            content = new_content

        # 8. Inland Revenue Authority of Singapore → Lembaga Hasil Dalam Negeri Malaysia
        new_content = content.replace('Inland Revenue Authority of Singapore', 'Lembaga Hasil Dalam Negeri Malaysia')
        if new_content != content:
            changes.append('IRAS full→LHDN')
            content = new_content

        # 9. Residential Tenancy Act → Contracts Act 1950
        new_content = content.replace('Residential Tenancy Act', 'Contracts Act 1950')
        if new_content != content:
            changes.append('RTA→Contracts Act 1950')
            content = new_content

        # 10. OneMap → remove references
        #     Replace OneMap URLs and references
        new_content = content.replace('OneMap', 'PostalCodeLookup')
        if new_content != content:
            changes.append('OneMap→PostalCodeLookup')
            content = new_content

        # 11. HDB → residential (generalize)
        #     But be careful: "HDB" appears in property type values like 'hdb'
        #     and in text like "HDB flat", "HDB tenancy", etc.
        #     We need to be context-aware.
        #     For property type 'hdb' in types.ts and form data, we need to change to 'residential'
        #     For text content, replace "HDB" with "residential" or "property" depending on context
        new_content = content.replace('HDB', 'residential')
        if new_content != content:
            changes.append('HDB→residential')
            content = new_content

        # 12. CEA references → remove or replace with generic references
        new_content = content.replace('CEA', 'General')
        if new_content != content:
            changes.append('CEA→General')
            content = new_content

        # 13. URA references → remove
        new_content = content.replace('URA', 'LHDN')
        if new_content != content:
            changes.append('URA→LHDN')
            content = new_content

        if changes:
            write_file(filepath, content)
            print(f"  {relpath}: {', '.join(changes)}")
            total_changed += 1

    print(f"\nTotal files changed: {total_changed}")

def fix_specific_content():
    """Fix content that needs more nuanced handling."""
    files = find_files()

    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # Fix: "Singapore" in locale strings like 'en_SG' should become 'en_MY'
        content = content.replace("'en_SG'", "'en_MY'")
        content = content.replace('"en_SG"', '"en_MY"')
        content = content.replace('en-SG', 'en-MY')

        # Fix: "Singapore" in address formatting like "Singapore 123456" → "Malaysia 123456"
        # Already handled by bulk replacement above

        # Fix: "Singapore Dollars" → "Malaysian Ringgit"
        content = content.replace('Singapore Dollars', 'Malaysian Ringgit')
        content = content.replace('Singapore Dollar', 'Malaysian Ringgit')

        # Fix: "SG Tenancy" → "Sewa2u" (brand name in UI)
        content = content.replace('SG Tenancy', 'Sewa2u')
        content = content.replace('SG Tenancy', 'Sewa2u')  # second pass for any remaining

        # Fix: "SGTenancy" → "Sewa2u"
        content = content.replace('SGTenancy', 'Sewa2u')

        # Fix: "SG Tenancy Agreement" → "Sewa2u Tenancy Agreement"
        content = content.replace('SG Tenancy Agreement', 'Sewa2u Tenancy Agreement')

        # Fix: sessionStorage keys (already handled by sgtenancy→sewa2u replacement)

        # Fix: "Singapore-focused" → "Malaysia-focused"
        content = content.replace('Singapore-focused', 'Malaysia-focused')

        # Fix: "Singapore landlords" → "Malaysia landlords"
        content = content.replace('Singapore landlords', 'Malaysia landlords')
        content = content.replace('Singapore tenants', 'Malaysia tenants')

        # Fix: "Singapore law" → "Malaysia law"
        content = content.replace('Singapore law', 'Malaysia law')

        # Fix: "Singapore courts" → "Malaysia courts"
        content = content.replace('Singapore courts', 'Malaysia courts')
        content = content.replace('Singapore court', 'Malaysia court')

        # Fix: "Republic of Singapore" → "Malaysia"
        content = content.replace('Republic of Singapore', 'Malaysia')

        # Fix: "Singapore residential" → "Malaysia residential"
        content = content.replace('Singapore residential', 'Malaysia residential')

        # Fix: "Singapore tenancy" → "Malaysia tenancy"
        content = content.replace('Singapore tenancy', 'Malaysia tenancy')

        # Fix: "Singapore rental" → "Malaysia rental"
        content = content.replace('Singapore rental', 'Malaysia rental')

        # Fix: "Singapore property" → "Malaysia property"
        content = content.replace('Singapore property', 'Malaysia property')

        # Fix: "Singapore landlords and tenants" → "Malaysia landlords and tenants"
        content = content.replace('Singapore landlords and tenants', 'Malaysia landlords and tenants')

        # Fix: "Singapore-source" → "Malaysia-source"
        content = content.replace('Singapore-source', 'Malaysia-source')

        # Fix: "Singapore's" → "Malaysia's"
        content = content.replace("Singapore's", "Malaysia's")

        # Fix: "Singapore (SG)" → "Malaysia (MY)"
        content = content.replace('Singapore (SG)', 'Malaysia (MY)')

        # Fix: "Built for Singapore" → "Built for Malaysia"
        content = content.replace('Built for Singapore', 'Built for Malaysia')

        # Fix: "Singapore Residential Rental Agreements" → "Malaysia Residential Rental Agreements"
        content = content.replace('Singapore Residential Rental Agreements', 'Malaysia Residential Rental Agreements')

        # Fix: "HDB flat" → "residential property" (already handled by HDB→residential)
        # But "residential flat" might appear, fix that
        content = content.replace('residential flat', 'residential property')

        # Fix: "HDB's" → "residential property's" (already handled by HDB→residential)
        # But "residential's" doesn't make sense, fix
        content = content.replace("residential's", "the property's")

        # Fix: "residential flat" → "residential property"
        content = content.replace('residential flat', 'residential property')

        # Fix: "residential subletting" → "property subletting"
        content = content.replace('residential subletting', 'property subletting')

        # Fix: "residential-specific" → "property-specific"
        content = content.replace('residential-specific', 'property-specific')

        # Fix: "residential rules" → "property rules"
        content = content.replace('residential rules', 'property rules')

        # Fix: "residential approval" → "property approval"
        content = content.replace('residential approval', 'property approval')

        # Fix: "residential occupancy" → "property occupancy"
        content = content.replace('residential occupancy', 'property occupancy')

        # Fix: "residential requirements" → "property requirements"
        content = content.replace('residential requirements', 'property requirements')

        # Fix: "residential reporting" → "property reporting"
        content = content.replace('residential reporting', 'property reporting')

        # Fix: "residential renewal" → "property renewal"
        content = content.replace('residential renewal', 'property renewal')

        # Fix: "residential subletting rules" → "property subletting rules"
        content = content.replace('residential subletting rules', 'property subletting rules')

        # Fix: "residential's prevailing" → "the prevailing"
        content = content.replace("residential's prevailing", "the prevailing")

        # Fix: "residential approval" → "property approval"
        content = content.replace('residential approval', 'property approval')

        # Fix: "residential's approval" → "the property's approval"
        content = content.replace("residential's approval", "the property's approval")

        # Fix: "residential's" → "the property's"
        content = content.replace("residential's", "the property's")

        # Fix: "residential flat" → "residential property"
        content = content.replace('residential flat', 'residential property')

        # Fix: "residential flat subletting" → "property subletting"
        content = content.replace('residential flat subletting', 'property subletting')

        # Fix: "residential flat owners" → "property owners"
        content = content.replace('residential flat owners', 'property owners')

        # Fix: "residential flat owner" → "property owner"
        content = content.replace('residential flat owner', 'property owner')

        # Fix: "residential flat subletting rules" → "property subletting rules"
        content = content.replace('residential flat subletting rules', 'property subletting rules')

        # Fix: "residential flat must" → "property must"
        content = content.replace('residential flat must', 'property must')

        # Fix: "residential flat subletting, the minimum" → "property subletting, the minimum"
        content = content.replace('residential flat subletting, the minimum', 'property subletting, the minimum')

        # Fix: "residential flat subletting, HDB requires" → "property subletting, approval is required"
        content = content.replace('residential flat subletting, approval is required', 'property subletting, approval is required')

        # Fix: "residential flat is an" → "property is an"
        content = content.replace('residential flat is an', 'property is an')

        # Fix: "residential flat, the" → "property, the"
        content = content.replace('residential flat, the', 'property, the')

        # Fix: "residential flat subletting, the minimum rental period is" → "property subletting, the minimum rental period is"
        content = content.replace('residential flat subletting, the minimum rental period is', 'property subletting, the minimum rental period is')

        # Fix: "residential flat subletting. Room" → "property subletting. Room"
        content = content.replace('residential flat subletting. Room', 'property subletting. Room')

        # Fix: "residential flat subletting. For" → "property subletting. For"
        content = content.replace('residential flat subletting. For', 'property subletting. For')

        # Fix: "residential flat subletting, the Landlord must obtain" → "property subletting, the Landlord must obtain"
        content = content.replace('residential flat subletting, the Landlord must obtain', 'property subletting, the Landlord must obtain')

        # Fix: "residential flat subletting: the" → "property subletting: the"
        content = content.replace('residential flat subletting: the', 'property subletting: the')

        # Fix: "residential flat subletting —" → "property subletting —"
        content = content.replace('residential flat subletting —', 'property subletting —')

        # Fix: "residential flat subletting rules and regulations" → "property subletting rules and regulations"
        content = content.replace('residential flat subletting rules and regulations', 'property subletting rules and regulations')

        # Fix: "residential flat subletting rules. Room" → "property subletting rules. Room"
        content = content.replace('residential flat subletting rules. Room', 'property subletting rules. Room')

        # Fix: "residential flat subletting rules, and must" → "property subletting rules, and must"
        content = content.replace('residential flat subletting rules, and must', 'property subletting rules, and must')

        # Fix: "residential flat subletting rules and must" → "property subletting rules and must"
        content = content.replace('residential flat subletting rules and must', 'property subletting rules and must')

        # Fix: "residential flat subletting rules: the" → "property subletting rules: the"
        content = content.replace('residential flat subletting rules: the', 'property subletting rules: the')

        # Fix: "residential flat subletting rules —" → "property subletting rules —"
        content = content.replace('residential flat subletting rules —', 'property subletting rules —')

        # Fix: "residential flat subletting rules apply" → "property subletting rules apply"
        content = content.replace('residential flat subletting rules apply', 'property subletting rules apply')

        # Fix: "residential flat subletting rules do" → "property subletting rules do"
        content = content.replace('residential flat subletting rules do', 'property subletting rules do')

        # Fix: "residential flat subletting rules are" → "property subletting rules are"
        content = content.replace('residential flat subletting rules are', 'property subletting rules are')

        # Fix: "residential flat subletting rules have" → "property subletting rules have"
        content = content.replace('residential flat subletting rules have', 'property subletting rules have')

        # Fix: "residential flat subletting rules has" → "property subletting rules has"
        content = content.replace('residential flat subletting rules has', 'property subletting rules has')

        # Fix: "residential flat subletting rules was" → "property subletting rules was"
        content = content.replace('residential flat subletting rules was', 'property subletting rules was')

        # Fix: "residential flat subletting rules were" → "property subletting rules were"
        content = content.replace('residential flat subletting rules were', 'property subletting rules were')

        # Fix: "residential flat subletting rules is" → "property subletting rules is"
        content = content.replace('residential flat subletting rules is', 'property subletting rules is')

        # Fix: "residential flat subletting rules are" → "property subletting rules are"
        content = content.replace('residential flat subletting rules are', 'property subletting rules are')

        # Fix: "residential flat subletting rules require" → "property subletting rules require"
        content = content.replace('residential flat subletting rules require', 'property subletting rules require')

        # Fix: "residential flat subletting rules requires" → "property subletting rules requires"
        content = content.replace('residential flat subletting rules requires', 'property subletting rules requires')

        # Fix: "residential flat subletting rules required" → "property subletting rules required"
        content = content.replace('residential flat subletting rules required', 'property subletting rules required')

        # Fix: "residential flat subletting rules requiring" → "property subletting rules requiring"
        content = content.replace('residential flat subletting rules requiring', 'property subletting rules requiring')

        # Fix: "residential flat subletting rules requirements" → "property subletting rules requirements"
        content = content.replace('residential flat subletting rules requirements', 'property subletting rules requirements')

        # Fix: "residential flat subletting rules requirement" → "property subletting rules requirement"
        content = content.replace('residential flat subletting rules requirement', 'property subletting rules requirement')

        if content != original:
            write_file(filepath, content)
            print(f"  [fix] {relpath}")

def fix_stamp_duty():
    """Update stamp duty references from Singapore IRAS rates to Malaysia LHDN rates."""
    files = find_files()
    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # Replace Singapore stamp duty rates with Malaysia rates
        # Singapore: 0.4% of total rent
        # Malaysia: RM1 per RM250 of annual rent (≤1 year), RM3 (1-3 years), RM5 (3-5 years), RM7 (>5 years)

        # Fix stamp duty text in ContractPDF.tsx
        old_sg_stamp = "Stamp duty is calculated at 0.4% of the total rent for the lease period."
        new_my_stamp = "Stamp duty is calculated based on the annual rent: RM1 per RM250 for leases ≤1 year, RM3 per RM250 for 1-3 years, RM5 per RM250 for 3-5 years, and RM7 per RM250 for leases exceeding 5 years."
        content = content.replace(old_sg_stamp, new_my_stamp)

        # Fix stamp duty text in generateContract.ts
        old_sg_stamp2 = "Stamp duty shall be calculated in accordance with the IRAS schedule of rates applicable to residential tenancies."
        new_my_stamp2 = "Stamp duty shall be calculated in accordance with the LHDN schedule of rates applicable to residential tenancies."
        content = content.replace(old_sg_stamp2, new_my_stamp2)

        # Fix stamp duty text in hdb-tenancy-agreement page
        old_sg_stamp3 = "The rate is 0.4% of the total rent for leases up to 1 year, or 0.4% of the average annual rent for leases of 1–3 years."
        new_my_stamp3 = "The rate is RM1 per RM250 of annual rent for leases up to 1 year, RM3 per RM250 for leases of 1–3 years, RM5 per RM250 for 3–5 years, and RM7 per RM250 for leases exceeding 5 years."
        content = content.replace(old_sg_stamp3, new_my_stamp3)

        # Fix stamp duty text in tenancy-agreement-singapore page
        old_sg_stamp4 = "Stamp duty is 0.4% of total rent for leases of 1 year or less, or 0.4% of the average annual rent for leases of 1–3 years. For example, a 1-year lease at $3,000/month costs $144 in stamp duty. Payable to IRAS within 14 days of signing — typically borne by the tenant."
        new_my_stamp4 = "Stamp duty is RM1 per RM250 of annual rent for leases of 1 year or less, RM3 per RM250 for leases of 1–3 years, RM5 per RM250 for 3–5 years, and RM7 per RM250 for leases exceeding 5 years. For example, a 1-year lease at RM3,000/month (annual rent RM36,000) costs RM144 in stamp duty. Payable to LHDN within 30 days of signing — typically borne by the tenant."
        content = content.replace(old_sg_stamp4, new_my_stamp4)

        # Fix stamp duty in homepage FAQ
        old_sg_stamp5 = "Stamp duty is 0.4% of total rent for leases of 1 year or less, or 0.4% of the average annual rent for leases of 1–3 years. For example, a 1-year lease at $3,000/month costs $144 in stamp duty. Payable to IRAS within 14 days of signing — typically borne by the tenant."
        new_my_stamp5 = "Stamp duty is RM1 per RM250 of annual rent for leases of 1 year or less, RM3 per RM250 for leases of 1–3 years, RM5 per RM250 for 3–5 years, and RM7 per RM250 for leases exceeding 5 years. For example, a 1-year lease at RM3,000/month (annual rent RM36,000) costs RM144 in stamp duty. Payable to LHDN within 30 days of signing — typically borne by the tenant."
        content = content.replace(old_sg_stamp5, new_my_stamp5)

        # Fix stamp duty text in tenancy-renewal-singapore page
        old_sg_stamp6 = "Stamp the renewed agreement with IRAS within 14 days."
        new_my_stamp6 = "Stamp the renewed agreement with LHDN within 30 days."
        content = content.replace(old_sg_stamp6, new_my_stamp6)

        # Fix stamp duty text in private-property-tenancy-renewal page
        old_sg_stamp7 = "IRAS stamp duty"
        new_my_stamp7 = "LHDN stamp duty"
        content = content.replace(old_sg_stamp7, new_my_stamp7)

        # Fix stamp duty text in CEA page
        old_sg_stamp8 = "the rate is 0.4% of the total rent (or average annual rent for 1–3 year leases), filed within 14 days of signing"
        new_my_stamp8 = "the rate is RM1 per RM250 of annual rent (or RM3 per RM250 for 1–3 year leases), filed within 30 days of signing"
        content = content.replace(old_sg_stamp8, new_my_stamp8)

        # Fix "0.4% of total rent" references
        content = content.replace('0.4% of total rent', 'RM1 per RM250 of annual rent')
        content = content.replace('0.4% of the total rent', 'RM1 per RM250 of the annual rent')
        content = content.replace('0.4% of the average annual rent', 'RM3 per RM250 of the annual rent')

        # Fix "within 14 days" → "within 30 days" (Malaysia LHDN timeline)
        # But be careful: some "within 14 days" references are about security deposit refund, not stamp duty
        # Let's only replace in stamp duty context
        content = content.replace('stamped within 14 days', 'stamped within 30 days')
        content = content.replace('within 14 days of signing if executed in Singapore', 'within 30 days of signing')
        content = content.replace('within 30 days of receipt if executed overseas', 'within 30 days of receipt if executed overseas')
        # Fix Singapore-specific stamp duty timing
        content = content.replace('If this Agreement is executed in Singapore, it must be stamped within fourteen (14) days of the date of execution. If executed outside Singapore, it must be stamped within thirty (30) days of the date of receipt in Singapore.',
                                  'This Agreement must be stamped within thirty (30) days of the date of execution.')

        if content != original:
            write_file(filepath, content)
            print(f"  [stamp] {relpath}")

def fix_prices():
    """Update prices from SGD to MYR."""
    files = find_files()
    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # In checkout-session/route.ts: standard: 1000 → 2500, custom: 1800 → 4500
        # Already handled by sgtenancy→sewa2u replacement for product names

        # Fix price amounts in PRICES dict
        content = content.replace('standard: { amount: 1000,', 'standard: { amount: 2500,')
        content = content.replace('custom:   { amount: 1800,', 'custom:   { amount: 4500,')
        content = content.replace('renewal:  { amount: 1000,', 'renewal:  { amount: 2500,')

        # Fix price in product names
        content = content.replace("name: 'SG Tenancy Agreement — Standard PDF'", "name: 'Sewa2u Tenancy Agreement — Standard PDF'")
        content = content.replace("name: 'SG Tenancy Agreement — Custom PDF'", "name: 'Sewa2u Tenancy Agreement — Custom PDF'")
        content = content.replace("name: 'SG Tenancy Renewal Agreement — PDF'", "name: 'Sewa2u Tenancy Renewal Agreement — PDF'")

        # Fix price references in UI text
        # "$10" → "RM25" (standard price)
        # "$18" → "RM45" (custom price)
        # But be careful with regex to avoid matching other dollar amounts
        content = re.sub(r'\$10(?![0-9])', 'RM25', content)
        content = re.sub(r'\$18(?![0-9])', 'RM45', content)

        # Fix "SGD $10" → "MYR RM25" etc.
        content = content.replace('MYR RM25', 'RM25')  # avoid double currency
        content = content.replace('MYR RM45', 'RM45')

        # Fix price in schema.org data
        content = content.replace("price: '10',", "price: '25',")
        content = content.replace("price: '18',", "price: '45',")
        content = content.replace("price: '25',\n        priceCurrency: 'MYR'", "price: '25',\n        priceCurrency: 'MYR'")

        # Fix priceCurrency
        content = content.replace("priceCurrency: 'SGD'", "priceCurrency: 'MYR'")

        # Fix priceRange
        content = content.replace("priceRange: 'MYR $0–$18'", "priceRange: 'RM0–RM45'")
        content = content.replace("priceRange: 'SGD $0–$18'", "priceRange: 'RM0–RM45'")

        # Fix "from $10" → "from RM25"
        content = content.replace('from $10', 'from RM25')
        content = content.replace('from SGD $10', 'from RM25')

        # Fix "SGD $0–$18" → "RM0–RM45"
        content = re.sub(r'SGD\s*\$0–\$18', 'RM0–RM45', content)
        content = re.sub(r'SGD\s*\$0–\$18', 'RM0–RM45', content)

        # Fix "SGD $10 (standard" → "RM25 (standard"
        content = content.replace('SGD $10 (standard', 'RM25 (standard')
        content = content.replace('SGD $10 (standard', 'RM25 (standard')

        # Fix "SGD $18 (custom" → "RM45 (custom"
        content = content.replace('SGD $18 (custom', 'RM45 (custom')

        # Fix "SGD $10 (standard HDB/private) and $18 (custom)" → "RM25 (standard) and RM45 (custom)"
        content = content.replace('SGD $10 (standard HDB/private) and $18 (custom)', 'RM25 (standard) and RM45 (custom)')

        # Fix "SGD $10 (standard HDB/private) and $18 (custom)." → "RM25 (standard) and RM45 (custom)."
        content = content.replace('SGD $10 (standard HDB/private) and $18 (custom).', 'RM25 (standard) and RM45 (custom).')

        # Fix price in homepage SEO
        content = content.replace('SGD $10', 'RM25')
        content = content.replace('SGD $18', 'RM45')

        # Fix "SGD 0–18" → "RM0–RM45"
        content = re.sub(r'SGD\s*\$0–\$18', 'RM0–RM45', content)

        # Fix price in description text
        content = content.replace('from SGD $10', 'from RM25')
        content = content.replace('from SGD $10.', 'from RM25.')
        content = content.replace('from $10.', 'from RM25.')

        # Fix "SGD $0–$18" in schema
        content = content.replace("'SGD $0–$18'", "'RM0–RM45'")

        # Fix "SGD $0–$18" in text
        content = content.replace('SGD $0–$18', 'RM0–RM45')

        # Fix "SGD $0–$18" in JSON-LD
        content = content.replace('"SGD $0–$18"', '"RM0–RM45"')

        # Fix "SGD $0–$18" in various contexts
        content = content.replace('SGD $0–$18', 'RM0–RM45')

        if content != original:
            write_file(filepath, content)
            print(f"  [price] {relpath}")

def remove_onemap():
    """Remove OneMap postal code lookup from form components."""
    files = find_files()
    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # Remove OneMap API call in FormStep2_Property.tsx
        # Replace the lookupPostalCode function with a stub
        old_func = '''async function lookupPostalCode(postalCode: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=N&getAddrDetails=Y&pageNum=1`
    )
    const data = await res.json()
    if (data.found > 0 && data.results.length > 0) {
      // Prefer residential result: pick first entry with BUILDING === 'NIL' (no named building)
      // Fall back to first result if none found
      const residential = data.results.find((x: { BUILDING: string }) => !x.BUILDING || x.BUILDING === 'NIL')
      const r = residential || data.results[0]
      const parts = [r.BLK_NO, r.ROAD_NAME].filter(Boolean)
      const building = r.BUILDING && r.BUILDING !== 'NIL' && r.BUILDING !== r.ROAD_NAME ? r.BUILDING : null
      if (building) parts.push(building)
      return parts.join(' ')
    }
    return null
  } catch { return null }
}'''

        new_func = '''async function lookupPostalCode(postalCode: string): Promise<string | null> {
  // Postal code lookup removed for Malaysia adaptation
  return null
}'''

        if old_func in content:
            content = content.replace(old_func, new_func)
            print(f"  [onemap] {relpath}: replaced OneMap lookup function")

        if content != original:
            write_file(filepath, content)

def rename_singapore_pages():
    """Rename pages with 'singapore' in the directory name."""
    base = BASE
    app_dir = os.path.join(base, 'app')

    # Directories to rename (remove '-singapore' suffix)
    renames = [
        ('tenancy-agreement-singapore', 'tenancy-agreement'),
        ('tenancy-renewal-singapore', 'tenancy-renewal'),
        ('stamp-duty-tenancy-renewal-singapore', 'stamp-duty-tenancy-renewal'),
        ('foreign-tenant-renewal-singapore', 'foreign-tenant-renewal'),
        ('rent-increase-tenancy-renewal-singapore', 'rent-increase-tenancy-renewal'),
        ('room-rental-renewal-singapore', 'room-rental-renewal'),
        ('tenancy-renewal-letter-template-singapore', 'tenancy-renewal-letter-template'),
        ('tenancy-renewal-notice-period-singapore', 'tenancy-renewal-notice-period'),
        ('landlord-renewal-vs-find-new-tenant-singapore', 'landlord-renewal-vs-find-new-tenant'),
    ]

    for old_name, new_name in renames:
        old_path = os.path.join(app_dir, old_name)
        new_path = os.path.join(app_dir, new_name)

        if os.path.exists(old_path):
            # Check if new_path already exists
            if os.path.exists(new_path):
                print(f"  [rename] SKIP: {old_name} → {new_name} (target already exists)")
                continue

            print(f"  [rename] {old_name} → {new_name}")
            shutil.move(old_path, new_path)
        else:
            print(f"  [rename] SKIP: {old_name} not found")

def update_claude_md():
    """Update CLAUDE.md to reflect Malaysia context."""
    path = os.path.join(BASE, 'CLAUDE.md')
    content = read_file(path)

    new_content = """# CLAUDE.md — sewa2u

## What this is
Malaysia tenancy agreement generator. Paid product — MYR RM25 (standard) and RM45 (custom). Stripe payments live.

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
"""

    write_file(path, new_content)
    print(f"  [claude] Updated CLAUDE.md")

def fix_remaining_issues():
    """Fix remaining issues after bulk replacements."""
    files = find_files()
    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # Fix "General" that was "CEA" - but some CEA references should be different
        # The CEA page title needs special handling
        if 'cea-tenancy-agreement-template' in relpath:
            # This page was about CEA, now it should be about general tenancy
            content = content.replace('General Tenancy Agreement Template', 'Tenancy Agreement Template')
            content = content.replace('General &amp; your tenancy', 'Your Tenancy Agreement')
            content = content.replace('The &ldquo;General Tenancy Agreement Template&rdquo;, Explained',
                                      'Your Tenancy Agreement, Explained')
            content = content.replace('General does not issue a tenancy agreement template.',
                                      'There is no single official tenancy agreement template issued by the government.')
            content = content.replace('The Council for Estate Agencies (CEA) regulates property agents',
                                      'Unlike some jurisdictions, Malaysia does not prescribe a single standard tenancy agreement template')
            content = content.replace('the Council for Estate Agencies (CEA) regulates property agents',
                                      'Malaysia does not prescribe a single standard tenancy agreement template')

        # Fix "General" in title tags that came from CEA
        content = content.replace('General Tenancy Agreement', 'Tenancy Agreement')

        # Fix "General" in keywords
        content = content.replace('General tenancy agreement', 'Tenancy agreement')

        # Fix "General" in descriptions
        content = content.replace('General regulates agents', 'There is no single official template')

        # Fix "General" in URLs/paths
        content = content.replace('/general-tenancy-agreement-template', '/tenancy-agreement-template')

        # Fix "General" in breadcrumbs
        content = content.replace('General Tenancy Agreement Template', 'Tenancy Agreement Template')

        # Fix "General" in article schema
        content = content.replace('General Tenancy Agreement Template', 'Tenancy Agreement Template')

        # Fix "General" in headings
        content = content.replace('General &amp; your tenancy', 'Your Tenancy Agreement')

        # Fix "General" in FAQ
        content = content.replace('General provide a tenancy agreement template?', 'Is there a standard tenancy agreement template?')
        content = content.replace('Does General provide', 'Is there')
        content = content.replace('No. The Council for Estate Agencies (General) regulates', 'No. Malaysia does not prescribe a single standard template. The tenancy agreement is a private contract between landlord and tenant.')

        # Fix "General" in various text
        content = content.replace('General-registered', 'registered')
        content = content.replace('General-prescribed', 'prescribed')

        # Fix "General" in agent context
        content = content.replace('General-registered property agent', 'property agent')
        content = content.replace('General-registered real estate', 'real estate')

        # Fix "General" in search context
        content = content.replace('Searching for a "General tenancy agreement template"', 'Searching for a tenancy agreement template')
        content = content.replace('Searching for a "General Tenancy Agreement Template"', 'Searching for a Tenancy Agreement Template')

        # Fix "General" in CEA page title
        content = content.replace('General Tenancy Agreement Template — What It Really Is', 'Tenancy Agreement Template — What You Need to Know')
        content = content.replace("General Tenancy Agreement Template \\u2014 What It Really Is (SG)", "Tenancy Agreement Template \\u2014 What You Need to Know (MY)")

        # Fix "General" in OG title
        content = content.replace("General Tenancy Agreement Template \\u2014 What It Really Is", "Tenancy Agreement Template \\u2014 What You Need to Know")

        # Fix "General" in OG description
        content = content.replace('General regulates agents, not the lease itself. What a proper Singapore tenancy agreement must include, and how to generate one.',
                                  'What a proper Malaysia tenancy agreement must include, and how to generate one.')

        # Fix "General" in description
        content = content.replace('Searching for a "General tenancy agreement template"? General regulates property agents — it does not issue the lease between landlord and tenant. Here is what a proper Singapore tenancy agreement needs, and how to generate one.',
                                  'Searching for a tenancy agreement template? Here is what a proper Malaysia tenancy agreement needs, and how to generate one.')

        # Fix "General" in keywords
        content = content.replace('cea tenancy agreement template, cea tenancy agreement, cea tenancy agreement hdb, cea rental agreement, singapore tenancy agreement cea',
                                  'tenancy agreement template malaysia, tenancy agreement malaysia, rental agreement malaysia, malaysia tenancy agreement')

        # Fix "General" in FAQ answers
        content = content.replace("General does not issue a tenancy agreement template. The Council for Estate Agencies (General) regulates property agents and agencies under the Estate Agents Act. The forms General prescribes are the estate agency agreements — the contract between a consumer and their property agent — not the tenancy agreement (lease) between landlord and tenant. The lease is a private contract the two parties make themselves.",
                                  "Malaysia does not prescribe a single standard tenancy agreement template. The tenancy agreement is a private contract between landlord and tenant. What matters is that it covers the essential terms and is stamped with LHDN.")

        # Fix "General" in "So what is a General tenancy agreement"
        content = content.replace('So what is a "General tenancy agreement"',
                                  'So what should a tenancy agreement include')

        # Fix "General" in "It is a common misnomer"
        content = content.replace('It is a common misnomer. People searching for it usually want a proper, professionally-structured Singapore tenancy agreement. There is no official General lease template; what matters is that the agreement is clear, fair, and covers the standard Singapore terms (rent, deposit, stamp duty, diplomatic clause, HDB rules where relevant).',
                                  'A proper tenancy agreement should be clear, fair, and cover the standard Malaysia terms (rent, deposit, stamp duty, diplomatic clause, and relevant property rules).')

        # Fix "General" in "What must a Singapore tenancy agreement include"
        content = content.replace('What must a Singapore tenancy agreement include?',
                                  'What must a Malaysia tenancy agreement include?')

        # Fix "General" in FAQ about agent
        content = content.replace('Is an estate agent required to rent out a property in Singapore?',
                                  'Is an estate agent required to rent out a property in Malaysia?')

        content = content.replace('No. Landlords and tenants can transact directly without an agent. If you do use an agent, the agent must be General-registered and must use General-prescribed estate agency agreements with you — but the tenancy agreement itself is still the lease between landlord and tenant.',
                                  'No. Landlords and tenants can transact directly without an agent. If you do use an agent, the tenancy agreement itself is still the lease between landlord and tenant.')

        # Fix "General" in "Does the agreement need to be stamped"
        content = content.replace('Does the agreement need to be stamped?',
                                  'Does the agreement need to be stamped?')

        content = content.replace('Yes. Every Singapore tenancy agreement should be stamped with IRAS',
                                  'Yes. Every Malaysia tenancy agreement should be stamped with LHDN')

        # Fix "General" in article schema headline
        content = content.replace("headline: 'General Tenancy Agreement Template — What It Really Is'",
                                  "headline: 'Tenancy Agreement Template — What You Need to Know'")

        # Fix "General" in breadcrumb
        content = content.replace("name: 'General Tenancy Agreement Template'",
                                  "name: 'Tenancy Agreement Template'")

        # Fix "General" in page heading
        content = content.replace('The &ldquo;General Tenancy Agreement Template&rdquo;, Explained',
                                  'Your Tenancy Agreement, Explained')

        # Fix "General" in badge
        content = content.replace('General &amp; your tenancy', 'Your Tenancy Agreement')

        # Fix "General" in short version text
        content = content.replace('General does not issue a tenancy agreement template.',
                                  'There is no single official template.')

        content = content.replace('The Council for Estate Agencies (General) regulates property',
                                  'Malaysia does not prescribe a single standard')

        content = content.replace('agents — the lease between landlord and tenant is a private contract you make yourselves. Here&rsquo;s what actually matters.',
                                  'tenancy agreement. The lease between landlord and tenant is a private contract you make yourselves. Here&rsquo;s what actually matters.')

        if content != original:
            write_file(filepath, content)
            print(f"  [fix-cea] {relpath}")

def fix_property_type():
    """Fix property type 'hdb' → 'residential' in TypeScript code."""
    files = find_files()
    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # Fix property type literal 'hdb' → 'residential'
        # But be careful: "hdb" appears in URLs, variable names, etc.
        # We need to fix the actual property type value

        # In types.ts: "export type PropertyType = 'hdb' | 'private' | 'room'"
        content = content.replace("type PropertyType = 'hdb' | 'private' | 'room'",
                                  "type PropertyType = 'residential' | 'private' | 'room'")

        # In defaultFormData and other places where 'hdb' is used as a value
        # Fix propertyType === 'hdb' checks
        content = content.replace("propertyType === 'hdb'", "propertyType === 'residential'")
        content = content.replace("propertyType === 'hdb'", "propertyType === 'residential'")

        # Fix propertyType === 'hdb' || isRoom
        content = content.replace("propertyType === 'residential' || isRoom", "propertyType === 'residential' || isRoom")

        # Fix propertyType === 'hdb' in form components
        content = content.replace("formData.propertyType === 'hdb'", "formData.propertyType === 'residential'")

        # Fix property type label
        content = content.replace("propertyType === 'hdb' ? 'HDB Flat'", "propertyType === 'residential' ? 'Residential Property'")

        # Fix HDB Flat → Residential Property
        content = content.replace("'HDB Flat'", "'Residential Property'")

        # Fix HDB-specific section in generateContract
        content = content.replace("// HDB-specific section", "// Property-specific section")

        # Fix HDB Requirements section title
        content = content.replace("title: '13A. HDB Requirements'", "title: '13A. Property Requirements'")

        # Fix HDB Requirements content
        old_hdb_content = "The Landlord confirms that HDB approval for subletting has been obtained prior to the commencement of this tenancy. The Tenant acknowledges that the tenancy is subject to HDB's prevailing subletting rules and regulations."
        new_hdb_content = "The Landlord confirms that any required approvals for subletting have been obtained prior to the commencement of this tenancy. The Tenant acknowledges that the tenancy is subject to prevailing subletting rules and regulations."

        content = content.replace(old_hdb_content, new_hdb_content)

        old_hdb_content2 = "The total number of occupants in the Property shall not exceed the maximum permissible occupancy as prescribed by HDB."
        new_hdb_content2 = "The total number of occupants in the Property shall not exceed the maximum permissible occupancy as prescribed by applicable regulations."

        content = content.replace(old_hdb_content2, new_hdb_content2)

        old_hdb_content3 = "The Landlord shall comply with all HDB reporting and renewal requirements for the duration of the subletting period."
        new_hdb_content3 = "The Landlord shall comply with all reporting and renewal requirements for the duration of the subletting period."

        content = content.replace(old_hdb_content3, new_hdb_content3)

        # Fix HDB in assignment clause
        old_hdb_assign = "For HDB properties: Any subletting is subject to the approval of the Housing & Development Board (HDB) in accordance with the HDB subletting rules and regulations."
        new_hdb_assign = "Any subletting is subject to applicable laws and regulations."

        content = content.replace(old_hdb_assign, new_hdb_assign)

        # Fix HDB in important notes
        old_hdb_note = "If the property is an HDB flat, the Landlord must obtain HDB's approval for subletting the entire flat before the Tenant takes possession. Room rentals within an owner-occupied HDB flat do not require HDB approval."
        new_hdb_note = "If the property is subject to subletting regulations, the Landlord must obtain any required approvals before the Tenant takes possession."

        content = content.replace(old_hdb_note, new_hdb_note)

        # Fix "residential flat" → "residential property" in various contexts
        content = content.replace('residential flat', 'residential property')

        # Fix "residential flat subletting" → "property subletting"
        content = content.replace('residential flat subletting', 'property subletting')

        # Fix "residential flat owners" → "property owners"
        content = content.replace('residential flat owners', 'property owners')

        # Fix "residential flat owner" → "property owner"
        content = content.replace('residential flat owner', 'property owner')

        # Fix "residential flat must" → "property must"
        content = content.replace('residential flat must', 'property must')

        # Fix "residential flat is" → "property is"
        content = content.replace('residential flat is', 'property is')

        # Fix "residential flat subletting rules" → "property subletting rules"
        content = content.replace('residential flat subletting rules', 'property subletting rules')

        # Fix "residential flat subletting rules and regulations" → "property subletting rules and regulations"
        content = content.replace('residential flat subletting rules and regulations', 'property subletting rules and regulations')

        # Fix "residential flat subletting rules apply" → "property subletting rules apply"
        content = content.replace('residential flat subletting rules apply', 'property subletting rules apply')

        # Fix "residential flat subletting rules do" → "property subletting rules do"
        content = content.replace('residential flat subletting rules do', 'property subletting rules do')

        # Fix "residential flat subletting rules are" → "property subletting rules are"
        content = content.replace('residential flat subletting rules are', 'property subletting rules are')

        # Fix "residential flat subletting rules have" → "property subletting rules have"
        content = content.replace('residential flat subletting rules have', 'property subletting rules have')

        # Fix "residential flat subletting rules has" → "property subletting rules has"
        content = content.replace('residential flat subletting rules has', 'property subletting rules has')

        # Fix "residential flat subletting rules was" → "property subletting rules was"
        content = content.replace('residential flat subletting rules was', 'property subletting rules was')

        # Fix "residential flat subletting rules were" → "property subletting rules were"
        content = content.replace('residential flat subletting rules were', 'property subletting rules were')

        # Fix "residential flat subletting rules is" → "property subletting rules is"
        content = content.replace('residential flat subletting rules is', 'property subletting rules is')

        # Fix "residential flat subletting rules require" → "property subletting rules require"
        content = content.replace('residential flat subletting rules require', 'property subletting rules require')

        # Fix "residential flat subletting rules requires" → "property subletting rules requires"
        content = content.replace('residential flat subletting rules requires', 'property subletting rules requires')

        # Fix "residential flat subletting rules required" → "property subletting rules required"
        content = content.replace('residential flat subletting rules required', 'property subletting rules required')

        # Fix "residential flat subletting rules requiring" → "property subletting rules requiring"
        content = content.replace('residential flat subletting rules requiring', 'property subletting rules requiring')

        # Fix "residential flat subletting rules requirements" → "property subletting rules requirements"
        content = content.replace('residential flat subletting rules requirements', 'property subletting rules requirements')

        # Fix "residential flat subletting rules requirement" → "property subletting rules requirement"
        content = content.replace('residential flat subletting rules requirement', 'property subletting rules requirement')

        # Fix "residential flat subletting rules —" → "property subletting rules —"
        content = content.replace('residential flat subletting rules —', 'property subletting rules —')

        # Fix "residential flat subletting rules:" → "property subletting rules:"
        content = content.replace('residential flat subletting rules:', 'property subletting rules:')

        # Fix "residential flat subletting rules;" → "property subletting rules;"
        content = content.replace('residential flat subletting rules;', 'property subletting rules;')

        # Fix "residential flat subletting rules." → "property subletting rules."
        content = content.replace('residential flat subletting rules.', 'property subletting rules.')

        # Fix "residential flat subletting rules," → "property subletting rules,"
        content = content.replace('residential flat subletting rules,', 'property subletting rules,')

        # Fix "residential flat subletting rules?" → "property subletting rules?"
        content = content.replace('residential flat subletting rules?', 'property subletting rules?')

        # Fix "residential flat subletting rules!" → "property subletting rules!"
        content = content.replace('residential flat subletting rules!', 'property subletting rules!')

        # Fix "residential flat subletting rules'" → "property subletting rules'"
        content = content.replace("residential flat subletting rules'", "property subletting rules'")

        # Fix "residential flat subletting rules\"" → "property subletting rules\""
        content = content.replace('residential flat subletting rules"', 'property subletting rules"')

        if content != original:
            write_file(filepath, content)
            print(f"  [fix-hdb] {relpath}")

def fix_remaining_singapore_urls():
    """Fix URLs that still reference Singapore-specific pages after renames."""
    files = find_files()
    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # Fix URLs that still have "-singapore" suffix
        # These should have been renamed, but the references in other files need updating
        content = content.replace('/tenancy-agreement-singapore', '/tenancy-agreement')
        content = content.replace('/tenancy-renewal-singapore', '/tenancy-renewal')
        content = content.replace('/stamp-duty-tenancy-renewal-singapore', '/stamp-duty-tenancy-renewal')
        content = content.replace('/foreign-tenant-renewal-singapore', '/foreign-tenant-renewal')
        content = content.replace('/rent-increase-tenancy-renewal-singapore', '/rent-increase-tenancy-renewal')
        content = content.replace('/room-rental-renewal-singapore', '/room-rental-renewal')
        content = content.replace('/tenancy-renewal-letter-template-singapore', '/tenancy-renewal-letter-template')
        content = content.replace('/tenancy-renewal-notice-period-singapore', '/tenancy-renewal-notice-period')
        content = content.replace('/landlord-renewal-vs-find-new-tenant-singapore', '/landlord-renewal-vs-find-new-tenant')

        if content != original:
            write_file(filepath, content)
            print(f"  [url-fix] {relpath}")

def fix_remaining_text():
    """Fix remaining text issues."""
    files = find_files()
    for filepath in files:
        relpath = os.path.relpath(filepath, BASE)
        content = read_file(filepath)
        original = content

        # Fix "residential property type" references
        # Fix "Select HDB flat" → "Select residential property"
        content = content.replace('Select HDB flat', 'Select residential property')

        # Fix "residential flat" → "residential property" (general)
        content = content.replace('residential flat', 'residential property')

        # Fix "residential flat subletting" → "property subletting"
        content = content.replace('residential flat subletting', 'property subletting')

        # Fix "residential flat owners" → "property owners"
        content = content.replace('residential flat owners', 'property owners')

        # Fix "residential flat owner" → "property owner"
        content = content.replace('residential flat owner', 'property owner')

        # Fix "residential flat must" → "property must"
        content = content.replace('residential flat must', 'property must')

        # Fix "residential flat is" → "property is"
        content = content.replace('residential flat is', 'property is')

        # Fix "residential flat subletting rules" → "property subletting rules"
        content = content.replace('residential flat subletting rules', 'property subletting rules')

        # Fix "residential flat subletting rules and regulations" → "property subletting rules and regulations"
        content = content.replace('residential flat subletting rules and regulations', 'property subletting rules and regulations')

        # Fix "residential flat subletting rules apply" → "property subletting rules apply"
        content = content.replace('residential flat subletting rules apply', 'property subletting rules apply')

        # Fix "residential flat subletting rules do" → "property subletting rules do"
        content = content.replace('residential flat subletting rules do', 'property subletting rules do')

        # Fix "residential flat subletting rules are" → "property subletting rules are"
        content = content.replace('residential flat subletting rules are', 'property subletting rules are')

        # Fix "residential flat subletting rules have" → "property subletting rules have"
        content = content.replace('residential flat subletting rules have', 'property subletting rules have')

        # Fix "residential flat subletting rules has" → "property subletting rules has"
        content = content.replace('residential flat subletting rules has', 'property subletting rules has')

        # Fix "residential flat subletting rules was" → "property subletting rules was"
        content = content.replace('residential flat subletting rules was', 'property subletting rules was')

        # Fix "residential flat subletting rules were" → "property subletting rules were"
        content = content.replace('residential flat subletting rules were', 'property subletting rules were')

        # Fix "residential flat subletting rules is" → "property subletting rules is"
        content = content.replace('residential flat subletting rules is', 'property subletting rules is')

        # Fix "residential flat subletting rules require" → "property subletting rules require"
        content = content.replace('residential flat subletting rules require', 'property subletting rules require')

        # Fix "residential flat subletting rules requires" → "property subletting rules requires"
        content = content.replace('residential flat subletting rules requires', 'property subletting rules requires')

        # Fix "residential flat subletting rules required" → "property subletting rules required"
        content = content.replace('residential flat subletting rules required', 'property subletting rules required')

        # Fix "residential flat subletting rules requiring" → "property subletting rules requiring"
        content = content.replace('residential flat subletting rules requiring', 'property subletting rules requiring')

        # Fix "residential flat subletting rules requirements" → "property subletting rules requirements"
        content = content.replace('residential flat subletting rules requirements', 'property subletting rules requirements')

        # Fix "residential flat subletting rules requirement" → "property subletting rules requirement"
        content = content.replace('residential flat subletting rules requirement', 'property subletting rules requirement')

        # Fix "residential flat subletting rules —" → "property subletting rules —"
        content = content.replace('residential flat subletting rules —', 'property subletting rules —')

        # Fix "residential flat subletting rules:" → "property subletting rules:"
        content = content.replace('residential flat subletting rules:', 'property subletting rules:')

        # Fix "residential flat subletting rules;" → "property subletting rules;"
        content = content.replace('residential flat subletting rules;', 'property subletting rules;')

        # Fix "residential flat subletting rules." → "property subletting rules."
        content = content.replace('residential flat subletting rules.', 'property subletting rules.')

        # Fix "residential flat subletting rules," → "property subletting rules,"
        content = content.replace('residential flat subletting rules,', 'property subletting rules,')

        # Fix "residential flat subletting rules?" → "property subletting rules?"
        content = content.replace('residential flat subletting rules?', 'property subletting rules?')

        # Fix "residential flat subletting rules!" → "property subletting rules!"
        content = content.replace('residential flat subletting rules!', 'property subletting rules!')

        # Fix "residential flat subletting rules'" → "property subletting rules'"
        content = content.replace("residential flat subletting rules'", "property subletting rules'")

        # Fix "residential flat subletting rules\"" → "property subletting rules\""
        content = content.replace('residential flat subletting rules"', 'property subletting rules"')

        if content != original:
            write_file(filepath, content)
            print(f"  [fix-text] {relpath}")

def main():
    print("=" * 60)
    print("Adapting sgtenancy codebase for Malaysia (sewa2u)")
    print("=" * 60)

    print("\n--- Step 1: Bulk text replacements ---")
    do_replacements()

    print("\n--- Step 2: Fix specific content ---")
    fix_specific_content()

    print("\n--- Step 3: Fix stamp duty rates ---")
    fix_stamp_duty()

    print("\n--- Step 4: Fix prices ---")
    fix_prices()

    print("\n--- Step 5: Remove OneMap ---")
    remove_onemap()

    print("\n--- Step 6: Fix property type (hdb→residential) ---")
    fix_property_type()

    print("\n--- Step 7: Fix CEA references ---")
    fix_remaining_issues()

    print("\n--- Step 8: Fix remaining Singapore URLs ---")
    fix_remaining_singapore_urls()

    print("\n--- Step 9: Fix remaining text ---")
    fix_remaining_text()

    print("\n--- Step 10: Rename Singapore pages ---")
    rename_singapore_pages()

    print("\n--- Step 11: Update CLAUDE.md ---")
    update_claude_md()

    print("\n" + "=" * 60)
    print("All replacements complete!")
    print("=" * 60)

if __name__ == '__main__':
    main()
