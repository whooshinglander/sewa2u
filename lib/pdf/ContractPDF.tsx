import React from 'react'
import {
  Document, Page, Text, View, StyleSheet,
} from '@react-pdf/renderer'
import { ContractDocument } from '@/lib/contract/generateContract'

const GOLD = '#b8963e'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    paddingTop: 55,
    paddingBottom: 72,   // room for initials bar
    paddingHorizontal: 60,
    lineHeight: 1.6,
    color: '#1a1a1a',
  },
  // ── Typography ─────────────────────────────────────────────────────────────
  title: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  paragraph: {
    marginBottom: 12,
    fontSize: 10,
    lineHeight: 1.7,
  },
  bold: { fontFamily: 'Times-Bold' },
  sectionHeading: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: 4,
  },
  partyBlock: { marginLeft: 16, marginBottom: 6 },
  partyRow: { flexDirection: 'row', marginBottom: 3, fontSize: 10 },
  partyLabel: { fontFamily: 'Times-Bold', width: 140 },
  partyValue: { flex: 1 },
  italic: {
    fontFamily: 'Times-Italic',
    fontSize: 10,
    marginLeft: 16,
    marginBottom: 14,
    lineHeight: 1.6,
  },
  clauseContainer: { marginBottom: 14 },
  clauseNum: { fontFamily: 'Times-Bold', fontSize: 10, marginBottom: 3 },
  clauseContent: { marginLeft: 20, fontSize: 10, lineHeight: 1.7 },

  // ── Initials bar (fixed, bottom of every content page) ────────────────────
  initialsBar: {
    position: 'absolute',
    bottom: 18,
    left: 60,
    right: 60,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  initialsTable: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    width: 160,
  },
  initialsCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#333',
    borderRightStyle: 'solid',
    paddingHorizontal: 4,
    paddingTop: 2,
    paddingBottom: 0,
  },
  initialsCellLast: {
    flex: 1,
    paddingHorizontal: 4,
    paddingTop: 2,
    paddingBottom: 0,
  },
  initialsHeaderText: {
    fontSize: 7,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
    marginBottom: 0,
  },
  initialsBox: {
    height: 22,
  },
  initialsPrompt: {
    fontSize: 7,
    fontFamily: 'Times-Italic',
    color: GOLD,
    textAlign: 'center',
    marginTop: 2,
  },

  // ── Signature page ─────────────────────────────────────────────────────────
  signatureSection: { marginTop: 20, paddingTop: 10 },
  signatureGrid: { flexDirection: 'row', gap: 40, marginTop: 16 },
  signatureBlock: { flex: 1 },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid',
    height: 36,
    marginBottom: 5,
  },
  signatureName: { fontSize: 10, marginBottom: 10 },
  disclaimer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#555',
    borderStyle: 'solid',
    padding: 8,
  },
  disclaimerText: {
    fontSize: 8,
    fontFamily: 'Times-Italic',
    lineHeight: 1.5,
    color: '#333',
  },
  // ── Witness block ──────────────────────────────────────────────────────────
  witnessSection: { marginTop: 14, paddingTop: 8 },
  witnessHeading: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    color: '#333',
  },
  witnessGrid: { flexDirection: 'row', gap: 30 },
  witnessBlock: { flex: 1 },
  witnessLabel: { fontSize: 8, fontFamily: 'Times-Bold', color: '#444', marginBottom: 2 },
  witnessLine: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#555',
    borderBottomStyle: 'solid',
    height: 20,
    marginBottom: 3,
  },
  witnessCaption: { fontSize: 7.5, color: '#666', fontFamily: 'Times-Roman', marginBottom: 8 },

  // ── Declaration page ───────────────────────────────────────────────────────
  declarationTitle: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    textAlign: 'center',
  },
  declarationBox: {
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    padding: 14,
    marginBottom: 14,
  },
  declarationBoxTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  declarationText: { fontSize: 9.5, lineHeight: 1.65, color: '#1a1a1a', fontFamily: 'Times-Roman' },
  declarationRow: { flexDirection: 'row', marginBottom: 3, fontSize: 9.5 },
  declarationLabel: { fontFamily: 'Times-Bold', width: 120, fontSize: 9 },
  declarationValue: { flex: 1, fontSize: 9, fontFamily: 'Times-Roman' },
  declarationSigGrid: { flexDirection: 'row', gap: 30, marginTop: 10 },
  declarationSigBlock: { flex: 1 },
  declarationSigLine: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid',
    height: 28,
    marginBottom: 3,
  },
  declarationSigLabel: { fontSize: 8, color: '#555', fontFamily: 'Times-Roman' },
  importantBox: {
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    padding: 10,
    marginTop: 14,
    backgroundColor: '#fafafa',
  },
  importantTitle: { fontFamily: 'Times-Bold', fontSize: 9, marginBottom: 4, textTransform: 'uppercase' },
  importantText: { fontSize: 8.5, lineHeight: 1.6, fontFamily: 'Times-Roman', color: '#222' },
  inventoryContent: { marginLeft: 20, fontSize: 8.5, lineHeight: 1.5, fontFamily: 'Courier' },
  noteItem: { flexDirection: 'row', marginBottom: 5, gap: 6 },
  noteNum: { fontSize: 8.5, fontFamily: 'Times-Bold', width: 14 },
  noteText: { flex: 1, fontSize: 8.5, lineHeight: 1.6, fontFamily: 'Times-Roman', color: '#222' },
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function ordinalDay(dateStr: string): string {
  if (!dateStr) return '___'
  const d = new Date(dateStr + 'T00:00:00').getDate()
  const s = ['th', 'st', 'nd', 'rd']
  const v = d % 100
  return d + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}
function fmtMonth(dateStr: string): string {
  if (!dateStr) return '___'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-MY', { month: 'long' })
}
function fmtYear(dateStr: string): string {
  if (!dateStr) return '___'
  return String(new Date(dateStr + 'T00:00:00').getFullYear())
}
function fmtDateFull(dateStr: string): string {
  if (!dateStr) return '[DATE]'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-MY', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ── Initials bar component — fixed to bottom of page ─────────────────────────
function InitialsBar() {
  return (
    <View style={styles.initialsBar} fixed>
      <View style={styles.initialsTable}>
        <View style={styles.initialsCell}>
          <Text style={styles.initialsHeaderText}>Landlord</Text>
          <View style={styles.initialsBox} />
        </View>
        <View style={styles.initialsCellLast}>
          <Text style={styles.initialsHeaderText}>Tenant</Text>
          <View style={styles.initialsBox} />
        </View>
      </View>
      <Text style={styles.initialsPrompt}>(Please initial)</Text>
    </View>
  )
}

// ── Witness block component ───────────────────────────────────────────────────
function WitnessBlock() {
  return (
    <View style={styles.witnessSection}>
      <Text style={styles.witnessHeading}>In the Presence of (Witness)</Text>
      <View style={styles.witnessGrid}>
        <View style={styles.witnessBlock}>
          <Text style={styles.witnessLabel}>Name</Text>
          <View style={styles.witnessLine} />
          <Text style={styles.witnessCaption}>Full name as per NRIC</Text>
        </View>
        <View style={styles.witnessBlock}>
          <Text style={styles.witnessLabel}>NRIC No.</Text>
          <View style={styles.witnessLine} />
          <Text style={styles.witnessCaption}>Identity number</Text>
        </View>
      </View>
      <Text style={styles.witnessLabel}>Date</Text>
      <View style={[styles.witnessLine, { maxWidth: 120 }]} />
    </View>
  )
}

// ── Props ─────────────────────────────────────────────────────────────────────
type Props = { doc: ContractDocument }

const SKIP_TITLES = ['1. Parties', '2. Property']

export default function ContractPDF({ doc }: Props) {
  const { meta } = doc
  const allLandlords = doc.allLandlords ?? [{ name: meta.landlordName, nric: meta.landlordNric }]
  const allTenants   = doc.allTenants   ?? [{ name: meta.tenantName,   id:   meta.tenantNric   }]
  const bodySections = doc.sections.filter(s => !SKIP_TITLES.includes(s.title))

  return (
    <Document>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGE 1 — Title + Parties + Clauses
          Initials bar shown via fixed
      ════════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <InitialsBar />

        {/* Title */}
        <Text style={styles.title}>Tenancy Agreement</Text>
        <Text style={styles.subtitle}>({meta.propertyType})</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>THIS AGREEMENT</Text>
          {` made on the ${ordinalDay(meta.commencementDate)} day of ${fmtMonth(meta.commencementDate)} ${fmtYear(meta.commencementDate)}`}
        </Text>

        {/* Landlord(s) */}
        <Text style={styles.sectionHeading}>Between</Text>
        {allLandlords.map((l, i) => (
          <View key={i} style={styles.partyBlock}>
            <View style={styles.partyRow}>
              <Text style={styles.partyLabel}>NAME:</Text>
              <Text style={styles.partyValue}>{l.name}</Text>
            </View>
            <View style={styles.partyRow}>
              <Text style={styles.partyLabel}>NRIC / FIN No:</Text>
              <Text style={styles.partyValue}>{l.nric}</Text>
            </View>
            {i === 0 && (
              <View style={styles.partyRow}>
                <Text style={styles.partyLabel}>ADDRESS:</Text>
                <Text style={styles.partyValue}>{meta.landlordAddress}</Text>
              </View>
            )}
          </View>
        ))}
        <Text style={styles.italic}>
          (hereinafter called &quot;the Landlord&quot; which expression shall where the context so admits include the
          person entitled for the time being to the reversion immediately expectant on the term hereby created) of the one part
        </Text>

        {/* Tenant(s) */}
        <Text style={styles.sectionHeading}>And</Text>
        {allTenants.map((t, i) => (
          <View key={i} style={styles.partyBlock}>
            <View style={styles.partyRow}>
              <Text style={styles.partyLabel}>NAME:</Text>
              <Text style={styles.partyValue}>{t.name}</Text>
            </View>
            <View style={styles.partyRow}>
              <Text style={styles.partyLabel}>NRIC / FIN / Passport No:</Text>
              <Text style={styles.partyValue}>{t.id}</Text>
            </View>
            {i === 0 && (
              <View style={styles.partyRow}>
                <Text style={styles.partyLabel}>ADDRESS:</Text>
                <Text style={styles.partyValue}>{meta.tenantAddress ?? ''}</Text>
              </View>
            )}
          </View>
        ))}
        <Text style={styles.italic}>
          (hereinafter called &quot;the Tenant&quot; which expression shall where the context so admits include the
          Tenant&apos;s successors and assigns) of the other part.
        </Text>

        <Text style={[styles.sectionHeading, { marginTop: 8 }]}>
          Now It Is Hereby Agreed As Follows:
        </Text>

        {/* Clause 1 */}
        <View style={styles.clauseContainer} wrap={false}>
          <Text style={styles.clauseNum}>1.</Text>
          <Text style={styles.clauseContent}>
            {`(a)  The Landlord agrees to let and the Tenant agrees to take all that property known as `}
            <Text style={styles.bold}>{meta.address}</Text>
            {` (hereinafter called the "Said Premises") together with the furniture, fixtures, and fittings therein belonging to the Landlord as specified in the Inventory List annexed hereto TO HOLD unto the Tenant from `}
            <Text style={styles.bold}>{fmtDateFull(meta.commencementDate)}</Text>
            {` to `}
            <Text style={styles.bold}>{fmtDateFull(meta.expiryDate)}</Text>
            {`, at the monthly rent of `}
            <Text style={styles.bold}>{meta.monthlyRent}</Text>
            {`.`}
          </Text>
        </View>

        {/* Body clauses */}
        {bodySections.map((section, i) => {
          const labelMatch = section.title.match(/^([\d]+[A-Z]?|Schedule\s+\S+)\.\s*(.+)$/)
          const isSchedule = labelMatch && labelMatch[1].startsWith('Schedule')
          const clauseLabel = (labelMatch && !isSchedule) ? String(i + 2) : (isSchedule ? labelMatch![1] : String(i + 2))
          const titleText   = labelMatch ? labelMatch[2] : section.title
          return (
            <View key={i} style={styles.clauseContainer} wrap={true}>
              <Text style={styles.clauseNum}>{clauseLabel}.  {titleText}</Text>
              <Text style={titleText.includes('Inventory') || section.title.includes('Schedule 1') ? styles.inventoryContent : styles.clauseContent}>{section.content}</Text>
            </View>
          )
        })}
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          SIGNATURE PAGE — all signees consolidated, NO initials bar
      ════════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        {/* NO InitialsBar here */}

        <Text style={[styles.sectionHeading, { marginBottom: 12, fontSize: 11 }]}>
          Execution
        </Text>
        <Text style={styles.paragraph}>
          IN WITNESS WHEREOF the parties hereto have hereunto set their hands the day and year first above written.
        </Text>

        {/* ── Landlord(s) — all sigs, then one shared witness block ── */}
        <View style={{ marginBottom: 8 }} wrap={false}>
          <Text style={[styles.bold, { fontSize: 10, marginBottom: 10 }]}>Landlord</Text>
          {allLandlords.map((l, i) => (
            <View key={`landlord-sig-${i}`} style={{ marginBottom: 20 }}>
              <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>
                {allLandlords.length > 1 ? `Signature (Landlord ${i + 1})` : 'Signature'}
              </Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>{l.name}</Text>
              <Text style={[styles.witnessLabel, { marginTop: 8, marginBottom: 2, fontSize: 9 }]}>NRIC / FIN No.</Text>
              <View style={[styles.witnessLine, { marginBottom: 8 }]} />
              <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>Date</Text>
              <View style={[styles.witnessLine, { maxWidth: 140, marginBottom: 0 }]} />
            </View>
          ))}
          <WitnessBlock />
        </View>

        <View style={{ marginBottom: 8, marginTop: 12 }} wrap={false}>
          <Text style={[styles.bold, { fontSize: 10, marginBottom: 10 }]}>Tenant</Text>
          {allTenants.map((t, i) => (
            <View key={`tenant-sig-${i}`} style={{ marginBottom: 20 }}>
              <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>
                {allTenants.length > 1 ? `Signature (Tenant ${i + 1})` : 'Signature'}
              </Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>{t.name}</Text>
              <Text style={[styles.witnessLabel, { marginTop: 8, marginBottom: 2, fontSize: 9 }]}>NRIC / FIN / Passport No.</Text>
              <View style={[styles.witnessLine, { marginBottom: 8 }]} />
              <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>Date</Text>
              <View style={[styles.witnessLine, { maxWidth: 140, marginBottom: 0 }]} />
            </View>
          ))}
          <WitnessBlock />
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            <Text style={{ fontFamily: 'Times-Bold' }}>Important! </Text>
            This is a general document which may not be appropriate for use in all cases. When in doubt, please seek legal advice.{' '}
            Sewa2u.com disclaims any liability whatsoever arising from the use of this document (including any amendment(s) to this document).
          </Text>
        </View>
      </Page>

      {/* ══════════════════════════════════════════════════════════════════════
          DECLARATION PAGE — initials bar shown
      ════════════════════════════════════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <InitialsBar />

        <Text style={styles.declarationTitle}>Declaration</Text>
        <Text style={[styles.paragraph, { textAlign: 'center', marginBottom: 16, fontSize: 9, color: '#444' }]}>
          To be completed and signed by both Landlord and Tenant at the time of signing this Agreement.
        </Text>

        {/* No-agent declaration */}
        <View style={styles.declarationBox}>
          <Text style={styles.declarationBoxTitle}>A.  No Estate Agent Involved</Text>
          <Text style={styles.declarationText}>
            The Landlord and Tenant hereby declare that this Tenancy Agreement was entered into directly between the parties without the involvement of any licensed real estate salesperson or estate agent. No commission or agency fee has been paid or is payable to any third party in connection with this transaction.
          </Text>
          <View style={styles.declarationSigGrid}>
            <View style={styles.declarationSigBlock}>
              <Text style={[styles.declarationLabel, { marginBottom: 20 }]}>Landlord</Text>
              <View style={styles.declarationSigLine} />
              <Text style={styles.declarationSigLabel}>{meta.landlordName}</Text>
              <Text style={[styles.declarationSigLabel, { marginTop: 8 }]}>Date: _______________</Text>
            </View>
            <View style={styles.declarationSigBlock}>
              <Text style={[styles.declarationLabel, { marginBottom: 20 }]}>Tenant</Text>
              <View style={styles.declarationSigLine} />
              <Text style={styles.declarationSigLabel}>{meta.tenantName}</Text>
              <Text style={[styles.declarationSigLabel, { marginTop: 8 }]}>Date: _______________</Text>
            </View>
          </View>
        </View>

        {/* Property details confirmation */}
        <View style={styles.declarationBox}>
          <Text style={styles.declarationBoxTitle}>B.  Property &amp; Tenancy Confirmation</Text>
          <View style={styles.declarationRow}>
            <Text style={styles.declarationLabel}>Property:</Text>
            <Text style={styles.declarationValue}>{meta.address}</Text>
          </View>
          <View style={styles.declarationRow}>
            <Text style={styles.declarationLabel}>Tenancy Period:</Text>
            <Text style={styles.declarationValue}>{meta.period}</Text>
          </View>
          <View style={styles.declarationRow}>
            <Text style={styles.declarationLabel}>Monthly Rent:</Text>
            <Text style={styles.declarationValue}>{meta.monthlyRent}</Text>
          </View>
          <Text style={[styles.declarationText, { marginTop: 8 }]}>
            Both parties confirm the above particulars are accurate and that they have read and understood the terms of this Agreement before signing.
          </Text>
        </View>

        {/* Important notes */}
        <View style={styles.importantBox}>
          <Text style={styles.importantTitle}>Important Notes</Text>
          <View style={styles.noteItem}>
            <Text style={styles.noteNum}>1.</Text>
            <Text style={styles.noteText}>
              <Text style={{ fontFamily: 'Times-Bold' }}>Stamp Duty: </Text>
              This Agreement must be stamped with LHDN within 14 days of signing if executed in Malaysia, or within 30 days of receipt if executed overseas. Stamp duty is calculated based on the annual rent: RM1 per RM250 for leases ≤1 year, RM3 per RM250 for 1-3 years, RM5 per RM250 for 3-5 years, and RM7 per RM250 for leases exceeding 5 years.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.noteNum}>2.</Text>
            <Text style={styles.noteText}>
              <Text style={{ fontFamily: 'Times-Bold' }}>NRIC Verification: </Text>
              Both parties should verify the identity of the other party against their original NRIC, FIN, or Passport before signing.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.noteNum}>3.</Text>
            <Text style={styles.noteText}>
              <Text style={{ fontFamily: 'Times-Bold' }}>residential Approval (if applicable): </Text>
              If the property is an residential property, the Landlord must obtain residential&apos;s approval for subletting the entire flat before the Tenant takes possession. Room rentals within an owner-occupied residential property do not require property approval.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.noteNum}>4.</Text>
            <Text style={styles.noteText}>
              <Text style={{ fontFamily: 'Times-Bold' }}>Copies: </Text>
              Each party should retain one original signed copy of this Agreement. The Agreement takes effect from the date of signing by both parties.
            </Text>
          </View>
        </View>
      </Page>

    </Document>
  )
}
