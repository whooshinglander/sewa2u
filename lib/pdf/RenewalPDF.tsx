import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

export type ExtensionData = {
  landlordName: string
  landlordNric: string
  tenantName: string
  tenantNric: string
  propertyAddress: string
  originalDate: string
  currentExpiryDate: string
  newExpiryDate: string
  rentChanged: boolean
  newMonthlyRent: number | ''
  rentPaymentDay: number | ''
  depositChanged: boolean
  newSecurityDeposit: number | ''
  diplomaticClauseApplies: boolean
  diplomaticNoticeMonths: number | ''
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    paddingTop: 55,
    paddingBottom: 72,
    paddingHorizontal: 60,
    lineHeight: 1.6,
    color: '#1a1a1a',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  paragraph: { marginBottom: 10, fontSize: 10, lineHeight: 1.7 },
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
  partyLabel: { fontFamily: 'Times-Bold', width: 160 },
  partyValue: { flex: 1 },
  italic: {
    fontFamily: 'Times-Italic',
    fontSize: 10,
    marginLeft: 16,
    marginBottom: 14,
    lineHeight: 1.6,
  },
  clauseContainer: { marginBottom: 12, flexDirection: 'row' },
  clauseNum: { fontFamily: 'Times-Bold', fontSize: 10, width: 20, flexShrink: 0 },
  clauseContent: { flex: 1, fontSize: 10, lineHeight: 1.7 },
  subClause: { marginLeft: 16, marginTop: 4, fontSize: 10, lineHeight: 1.7 },
  // Signature
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid',
    height: 36,
    marginBottom: 4,
  },
  signatureName: { fontSize: 10, marginBottom: 6 },
  witnessSection: { marginTop: 12, paddingTop: 8 },
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
  pageNum: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#888',
    fontFamily: 'Times-Roman',
  },
})

// ── Helpers ──────────────────────────────────────────────────────────────────

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

function fmtDateFormal(d: string): string {
  if (!d) return '[DATE]'
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
}

function monthsBetween(from: string, to: string): number {
  if (!from || !to) return 0
  const a = new Date(from + 'T00:00:00')
  const b = new Date(to + 'T00:00:00')
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function numToWords(n: number): string {
  if (n === 0) return 'Zero'
  if (n < 0) return 'Minus ' + numToWords(-n)
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '')
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + numToWords(n % 100) : '')
  if (n < 10000) return ONES[Math.floor(n / 1000)] + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '')
  return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '')
}

function fmtMoney(n: number | ''): string {
  if (n === '' || n === 0) return '[AMOUNT]'
  return `Malaysia Dollars ${numToWords(Number(n))} Only (MYR ${Number(n).toLocaleString('en-MY', { minimumFractionDigits: 2 })})`
}

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

type Props = { data: ExtensionData }

export default function RenewalPDF({ data }: Props) {
  const extensionMonths = monthsBetween(data.currentExpiryDate, data.newExpiryDate)
  const monthsText = extensionMonths > 0
    ? `${numToWords(extensionMonths)} (${extensionMonths}) month${extensionMonths !== 1 ? 's' : ''}`
    : '[X] months'
  const paymentDay = data.rentPaymentDay || 1
  const rent = data.rentChanged && data.newMonthlyRent ? Number(data.newMonthlyRent) : null
  const deposit = data.depositChanged && data.newSecurityDeposit ? Number(data.newSecurityDeposit) : null
  const dipNotice = data.diplomaticNoticeMonths || 1

  const p = (v: string | number | '', fallback: string) =>
    (!v && v !== 0) ? `[${fallback}]` : String(v)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Page number */}
        <Text style={styles.pageNum} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />

        {/* Title */}
        <Text style={styles.title}>Tenancy Renewal Agreement</Text>

        {/* Intro */}
        <Text style={styles.paragraph}>
          {'This Tenancy Renewal Agreement is made pursuant to the Tenancy Agreement (the "Agreement") dated '}
          <Text style={styles.bold}>{fmtDateFormal(data.originalDate)}</Text>
          {' entered into between'}
        </Text>

        {/* Landlord */}
        <Text style={styles.sectionHeading}>Between</Text>
        <View style={styles.partyBlock}>
          <View style={styles.partyRow}>
            <Text style={styles.partyLabel}>NAME:</Text>
            <Text style={styles.partyValue}>{p(data.landlordName, 'LANDLORD NAME')}</Text>
          </View>
          <View style={styles.partyRow}>
            <Text style={styles.partyLabel}>NRIC / FIN No:</Text>
            <Text style={styles.partyValue}>{p(data.landlordNric, 'SXXXXXXXA')}</Text>
          </View>
        </View>
        <Text style={styles.italic}>(hereinafter called "the Landlord") of the one part</Text>

        {/* Tenant */}
        <Text style={styles.sectionHeading}>And</Text>
        <View style={styles.partyBlock}>
          <View style={styles.partyRow}>
            <Text style={styles.partyLabel}>NAME:</Text>
            <Text style={styles.partyValue}>{p(data.tenantName, 'TENANT NAME')}</Text>
          </View>
          <View style={styles.partyRow}>
            <Text style={styles.partyLabel}>NRIC / FIN / Passport No:</Text>
            <Text style={styles.partyValue}>{p(data.tenantNric, 'SXXXXXXXA')}</Text>
          </View>
        </View>
        <Text style={styles.italic}>(hereinafter called "the Tenant") of the other part</Text>

        {/* Property */}
        <Text style={[styles.paragraph, { marginTop: 6 }]}>
          {'for the lease of the premises known as '}
          <Text style={styles.bold}>{p(data.propertyAddress, 'PROPERTY ADDRESS')}</Text>
          {' ("Premises").'}
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>The Parties hereby agree as follows:</Text>

        {/* Clause 1 — Extension term */}
        <View style={styles.clauseContainer} wrap={true}>
          <Text style={styles.clauseNum}>1.</Text>
          <Text style={styles.clauseContent}>
            {'The Tenant hereby requests and the Landlord grants an extension of the Tenancy for a term of '}
            <Text style={styles.bold}>{monthsText}</Text>
            {' ("Term") with effect from '}
            <Text style={styles.bold}>{fmtDateFormal(data.currentExpiryDate)}</Text>
            {' and expiring on '}
            <Text style={styles.bold}>{fmtDateFormal(data.newExpiryDate)}</Text>
            {'.'}
          </Text>
        </View>

        {/* Clause 2 — Rent */}
        <View style={styles.clauseContainer} wrap={true}>
          <Text style={styles.clauseNum}>2.</Text>
          <Text style={styles.clauseContent}>
            {rent
              ? `The monthly rent, inclusive of maintenance and service charge shall be ${fmtMoney(rent)}, and payable in advance on the ${ordinal(Number(paymentDay))} day of each month for the duration of the Term.`
              : `The monthly rent shall remain unchanged as per the original Agreement, payable in advance on the ${ordinal(Number(paymentDay))} day of each month for the duration of the Term.`
            }
          </Text>
        </View>

        {/* Clause 3 — Security deposit */}
        <View style={styles.clauseContainer} wrap={true}>
          <Text style={styles.clauseNum}>3.</Text>
          <View style={styles.clauseContent}>
            <Text>
              {deposit
                ? `The security deposit for this extension shall be ${fmtMoney(deposit)}.`
                : 'The security deposit shall remain unchanged as per the original Agreement.'
              }
            </Text>
            {deposit && (
              <>
                <Text style={styles.subClause}>
                  {'(a)  In the event that the security deposit is increased from the previous deposit, the Tenant shall top-up the excess deposit to the Landlord upon the commencement of this extension.'}
                </Text>
                <Text style={styles.subClause}>
                  {'(b)  In the event that the security deposit is decreased from the previous deposit, the Landlord shall refund the difference to the Tenant upon the commencement of this extension.'}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Clause 4 — Option to renew */}
        <View style={styles.clauseContainer} wrap={true}>
          <Text style={styles.clauseNum}>4.</Text>
          <Text style={styles.clauseContent}>
            The Tenant shall have an Option to renew the lease for a further term by serving two (2) months&apos; written notice prior to the expiry of this Term at a rent to be mutually agreed between the parties but otherwise containing the like conditions, covenants and stipulations as are herein contained with the exception of this option for renewal.
          </Text>
        </View>

        {/* Clause 5 — Diplomatic clause */}
        <View style={styles.clauseContainer} wrap={true}>
          <Text style={styles.clauseNum}>5.</Text>
          <Text style={styles.clauseContent}>
            {data.diplomaticClauseApplies
              ? `The Tenant may exercise the "Diplomatic Clause" by serving ${numToWords(Number(dipNotice))} (${dipNotice}) month${Number(dipNotice) !== 1 ? 's' : ''}'s notice at any time during the extension of this tenancy.`
              : `For avoidance of doubt, the "Diplomatic Clause" in the Tenancy Agreement shall not apply for the duration of this extension.`
            }
          </Text>
        </View>

        {/* Clause 6 — Other terms remain */}
        <View style={styles.clauseContainer} wrap={true}>
          <Text style={styles.clauseNum}>6.</Text>
          <Text style={styles.clauseContent}>
            It is further agreed that all other terms and conditions contained in the Agreement shall remain in force for the entire duration of the Term. In the event of any conflict(s) between the terms of this extension and the Agreement, the terms and conditions of this extension shall prevail.
          </Text>
        </View>

        {/* Clause 7 — Governing law */}
        <View style={styles.clauseContainer} wrap={true}>
          <Text style={styles.clauseNum}>7.</Text>
          <Text style={styles.clauseContent}>
            This Agreement shall be governed and construed in accordance with the laws of Malaysia and the jurisdiction of the Malaysia courts.
          </Text>
        </View>

        {/* Execution */}
        <Text style={[styles.sectionHeading, { marginTop: 14, marginBottom: 10, fontSize: 11 }]}>Execution</Text>
        <Text style={styles.paragraph}>
          IN WITNESS WHEREOF the parties hereto have hereunto set their hands the day and year first above written.
        </Text>

        {/* Landlord signature */}
        <View style={{ marginBottom: 8 }} wrap={false}>
          <Text style={[styles.bold, { fontSize: 10, marginBottom: 10 }]}>Landlord</Text>
          <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>Signature</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>{p(data.landlordName, 'LANDLORD NAME')}</Text>
          <Text style={[styles.witnessLabel, { marginTop: 6, marginBottom: 2, fontSize: 9 }]}>NRIC / FIN No.</Text>
          <View style={[styles.witnessLine, { marginBottom: 8 }]} />
          <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>Date</Text>
          <View style={[styles.witnessLine, { maxWidth: 140, marginBottom: 0 }]} />
          <WitnessBlock />
        </View>

        {/* Tenant signature */}
        <View style={{ marginBottom: 8, marginTop: 16 }} wrap={false}>
          <Text style={[styles.bold, { fontSize: 10, marginBottom: 10 }]}>Tenant</Text>
          <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>Signature</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>{p(data.tenantName, 'TENANT NAME')}</Text>
          <Text style={[styles.witnessLabel, { marginTop: 6, marginBottom: 2, fontSize: 9 }]}>NRIC / FIN / Passport No.</Text>
          <View style={[styles.witnessLine, { marginBottom: 8 }]} />
          <Text style={[styles.witnessLabel, { marginBottom: 2, fontSize: 9 }]}>Date</Text>
          <View style={[styles.witnessLine, { maxWidth: 140, marginBottom: 0 }]} />
          <WitnessBlock />
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            <Text style={{ fontFamily: 'Times-Bold' }}>Important! </Text>
            This is a general document which may not be appropriate for use in all cases. When in doubt, please seek legal advice. Sewa2u.com disclaims any liability whatsoever arising from the use of this document (including any amendment(s) to this document).
          </Text>
        </View>
      </Page>
    </Document>
  )
}
