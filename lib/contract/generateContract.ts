import { TenancyFormData } from '@/lib/types'

export type ContractSection = {
  title: string
  content: string
  isCustom?: boolean
}

export type ContractDocument = {
  // kept for PDF rendering
  allLandlords?: { name: string; nric: string }[]
  allTenants?: { name: string; id: string }[]
  sections: ContractSection[]
  meta: {
    propertyType: string
    address: string
    landlordName: string
    landlordNric: string
    landlordAddress: string
    tenantName: string
    tenantNric: string
    tenantAddress: string
    monthlyRent: string
    period: string
    commencementDate: string
    expiryDate: string
  }
}

// Placeholders for skipped fields
const p = (val: string | number | undefined | null | '', fallback: string): string => {
  if (val === '' || val === null || val === undefined) return `[${fallback}]`
  return String(val)
}

const fmtDate = (d: string) => {
  if (!d) return '[DATE]'
  return new Date(d).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
}

const fmtMoney = (v: number | '') =>
  v === '' ? '[AMOUNT]' : `MYR ${Number(v).toLocaleString('en-MY', { minimumFractionDigits: 2 })}`

const handoverLabel = (h: TenancyFormData['handoverCondition']) => {
  if (h === 'furnished') return 'fully furnished'
  if (h === 'partial') return 'partially furnished'
  return 'unfurnished'
}

export function generateContract(formData: TenancyFormData): ContractDocument {
  const {
    propertyType, propertyAddress, unitNumber, postalCode,
    landlordName, landlordNric, landlordAddress,
    additionalLandlords,
    tenantName, tenantNric, tenantAddress,
    additionalTenants,
    commencementDate, expiryDate, monthlyRent, securityDeposit,
    handoverCondition, leaseRenewalOption,
    diplomaticClause, customClauses, utilityCap, petDescription, freeTextClause,
    paymentBank, paymentAccountName, paymentAccountNo, rentPaymentDay,
    minorRepairThreshold, diplomaticMinMonths, diplomaticNoticeMonths,
    renewalTermMonths, purchaseNoticeMonths,
    skipParties, skipTerms,
  } = formData

  const fullAddress = [
    p(unitNumber, 'UNIT NUMBER') !== '[UNIT NUMBER]' ? p(unitNumber, 'UNIT NUMBER') : '',
    p(propertyAddress, 'PROPERTY ADDRESS'),
    `Malaysia ${p(postalCode, 'POSTAL CODE')}`,
  ].filter(Boolean).join(', ')

  const landlord = p(landlordName, 'LANDLORD NAME')
  const landlordId = p(landlordNric, 'LANDLORD NRIC/FIN')
  const landlordAddr = p(landlordAddress, 'LANDLORD ADDRESS')
  const tenant = p(tenantName, 'TENANT NAME')
  const tenantId = p(tenantNric, 'TENANT NRIC/FIN/PASSPORT')
  const tenantAddr = p(tenantAddress, 'TENANT ADDRESS')
  const rent = fmtMoney(skipTerms ? '' : monthlyRent)
  const deposit = fmtMoney(skipTerms ? '' : securityDeposit)
  const startDate = fmtDate(skipTerms ? '' : commencementDate)
  const endDate = fmtDate(skipTerms ? '' : expiryDate)
  const isRoom = propertyType === 'room'
  const roomTypeLabel: Record<string, string> = { common: 'Common Room', master: 'Master Bedroom', ensuite: 'En-Suite Room', other: 'Room' }
  const propTypeLabel = propertyType === 'residential' ? 'Residential Flat' : isRoom ? `Room Rental (${roomTypeLabel[formData.roomType] || 'Room'})` : 'Private Residential Property'

  // Build landlord list
  const allLandlords: { name: string; nric: string }[] = [{ name: landlord, nric: landlordId }]
  if (!skipParties && additionalLandlords) {
    additionalLandlords.forEach((l) => {
      if (l.name || l.nric) allLandlords.push({
        name: p(l.name, 'ADDITIONAL LANDLORD NAME'),
        nric: p(l.nric, 'ADDITIONAL LANDLORD NRIC'),
      })
    })
  }

  const landlordPartyText = allLandlords
    .map(l => `${l.name} (NRIC/FIN: ${l.nric})`)
    .join('\n')

  // Build tenant list
  const allTenants: { name: string; id: string }[] = [{ name: tenant, id: tenantId }]
  if (!skipParties) {
    additionalTenants.forEach((t) => {
      if (t.name || t.nricPassport) allTenants.push({
        name: p(t.name, 'ADDITIONAL TENANT NAME'),
        id: p(t.nricPassport, 'ADDITIONAL TENANT NRIC'),
      })
    })
  }

  const tenantPartyText = allTenants
    .map(t => `${t.name} (NRIC/FIN/Passport: ${t.id})`)
    .join('\n')

  const sections: ContractSection[] = [
    {
      title: '1. Parties',
      content: `This Tenancy Agreement ("Agreement") is entered into between:

LANDLORD: ${landlordPartyText}
Correspondence Address: ${landlordAddr}

TENANT: ${tenantPartyText}
Correspondence Address: ${tenantAddr}`,
    },
    {
      title: '2. Property',
      content: `The Landlord agrees to let and the Tenant agrees to take the following property ("Property") on the terms and conditions set out in this Agreement:

Property Address: ${fullAddress}
Property Type: ${propTypeLabel}`,
    },
    {
      title: '3. Tenancy Period',
      content: `The tenancy shall commence on ${startDate} and expire on ${endDate}, unless sooner determined in accordance with the terms of this Agreement.

${leaseRenewalOption && !skipTerms ? `Option to Renew: The Tenant shall have the option to renew this tenancy for a further term of ${renewalTermMonths || '[X]'} month(s) at a rent to be mutually agreed, provided the Tenant gives not less than two (2) months' written notice prior to the expiry of this Agreement and there is no existing breach of any condition herein.` : ''}`.trim(),
    },
    {
      title: '4. Rent',
      content: `The monthly rent for the Property is ${rent}, payable in advance on the ${rentPaymentDay || '1st'} day of each calendar month.

The Tenant shall pay the first month's rent upon signing of this Agreement.
${paymentBank || paymentAccountName || paymentAccountNo ? `\nSubsequent payments shall be made via direct bank transfer / GIRO to:\nBank: ${paymentBank || '[BANK]'}\nAccount Name: ${paymentAccountName || '[ACCOUNT NAME]'}\nAccount No: ${paymentAccountNo || '[ACCOUNT NO]'}` : ''}`.trim(),
    },
    {
      title: '5. Security Deposit',
      content: `The Tenant shall pay a security deposit of ${deposit} upon signing of this Agreement.

The security deposit shall be refunded to the Tenant within fourteen (14) days after the expiry or earlier termination of the tenancy, less any deductions for outstanding rent, utilities, or damage to the Property beyond fair wear and tear. This deposit shall not be utilised as set-off by the Tenant for any rent due and payable during the currency of this Agreement.

Should this tenancy be terminated by the Tenant prematurely before the expiration of this tenancy (except as otherwise provided in this Agreement), the security deposit shall be forfeited to the Landlord without prejudice to the right of action of the Landlord for claim to losses and damages or otherwise in respect of any such breach or any antecedent breach.

In the event of a sale or disposal of the Property by the Landlord, the Tenant consents to the transfer of the security deposit to the new owner(s) of the Property and hereby agrees to release the Landlord from all obligations in respect of the security deposit.`,
    },
    {
      title: '6. Stamp Duty',
      content: `The Tenant shall be responsible for the stamp duty payable on this Agreement to the Inland Revenue Authority of Malaysia (LHDN). If this Agreement is executed in Malaysia, it must be stamped within fourteen (14) days of the date of execution. If executed outside Malaysia, it must be stamped within thirty (30) days of the date of receipt in Malaysia. Stamp duty shall be calculated in accordance with the LHDN schedule of rates applicable to residential tenancies.`,
    },
    {
      title: '7. Handover Condition',
      content: `The Property is let in its current condition as ${handoverLabel(handoverCondition)}. The Tenant acknowledges having inspected the Property and accepts it in its current state.

An inventory list, if applicable, shall be attached as a schedule to this Agreement.`,
    },
    {
      title: '8. Utilities & Services',
      content: isRoom
        ? `The Tenant shall be responsible for their proportionate share of utility charges as agreed with the Landlord. All utility accounts shall remain in the Landlord's name.`
        : `The Tenant shall be responsible for all utility charges including electricity, water, gas, cable television, broadband and telecommunications services consumed at the Property during the tenancy period.

The Tenant shall arrange for the transfer of utility accounts to their name within seven (7) days of the commencement date.

Upon expiry or earlier termination of this tenancy, the Tenant shall ensure that all internet, broadband and cable television services are either terminated or transferred to the Landlord (with Landlord's prior written consent).`,
    },
    {
      title: '9. Maintenance & Repairs',
      content: `The Landlord shall be responsible for structural repairs and maintenance of the Property, including but not limited to the roof, external walls, and major systems (plumbing, electrical wiring, and drainage).

The Tenant shall be responsible for keeping the Property clean and in good tenantable repair and condition, and for minor day-to-day repairs and maintenance not attributable to fair wear and tear.

The Tenant shall promptly notify the Landlord in writing of any damage or defects requiring repair. The Landlord shall, within a reasonable time of receiving such notification, carry out the necessary repairs.`,
    },
    {
      title: '10. Alterations',
      content: `The Tenant shall not make any alterations, additions, or improvements to the Property without the prior written consent of the Landlord.

Any approved alterations shall, at the Landlord's election, either be removed by the Tenant at the end of the tenancy or remain as part of the Property.`,
    },
    {
      title: '11. Insurance',
      content: `The Tenant shall not do or permit to be done anything whereby the policy or policies of insurance on the Property against damage by fire may become void or voidable or whereby the premium thereon may be increased.`,
    },
    {
      title: '12. Dangerous Materials',
      content: `The Tenant shall not keep or permit to be kept on the Property or any part thereof any materials of a dangerous or explosive nature or the keeping of which may contravene any statute or subsidiary legislation.`,
    },
    {
      title: '13. Assignment & Subletting',
      content: `The Tenant shall not assign, sublet, or part with possession of the Property or any part thereof without the prior written consent of the Landlord.${propertyType === 'residential' ? '\n\nFor residential properties: Any subletting is subject to the approval of the relevant authorities in accordance with applicable laws and regulations.' : ''}`,
    },
    {
      title: '14. Access & Sale with Tenancy',
      content: `The Landlord or the Landlord's agent shall be entitled to enter and inspect the Property at all reasonable times by prior appointment (except in cases of emergency where no prior appointment is required) for the purpose of viewing the condition thereof or carrying out such works as may be required.

During the last two (2) months of the tenancy, the Landlord or its representatives may, by prior appointment, bring prospective tenants or purchasers to view the Property.

In the event of a prospective sale, the Property shall be sold subject to this Tenancy. The Tenant consents for the Landlord and/or its representatives to disclose the entirety of this Agreement, any supplementary agreements, and the Tenant's contact details to parties interested in purchasing the Property and their representatives.`,
    },
    {
      title: '15. Termination & Notice',
      content: `Either party may terminate this Agreement by giving not less than ${!skipTerms && commencementDate && expiryDate ? (
        Math.round((new Date(expiryDate).getTime() - new Date(commencementDate).getTime()) / (1000 * 60 * 60 * 24 * 30)) >= 24 ? 'two (2) months\'' : 'one (1) month\'s'
      ) : 'one (1) month\'s'} written notice to the other party.

Upon expiry or earlier termination of this tenancy, the Tenant shall yield up the Property in good and tenantable repair and condition (fair wear and tear excepted), including:
(a) dry cleaning of all curtains provided (if any);
(b) general cleaning of the Property;
(c) return of all locks, keys, access cards, and remote controls;
(d) return of all furniture and fittings as per the inventory list (if applicable);
(e) termination or transfer (with Landlord's prior written consent) of all internet, broadband, and cable television services.`,
    },
    {
      title: '16. Governing Law',
      content: `This Agreement shall be governed by and construed in accordance with the laws of the Republic of Malaysia. Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the Malaysia courts.`,
    },
  ]

  // Room-specific sections
  if (isRoom) {
    const facilityList = formData.sharedFacilities?.length
      ? formData.sharedFacilities.join(', ')
      : 'as agreed between the parties'

    const utilitiesText = formData.utilitiesIncluded
      ? 'Utilities (electricity, water) are included in the monthly rent.'
      : formData.utilitiesSplitMethod === 'fixed'
        ? `The Tenant shall pay a fixed monthly utilities contribution of MYR ${formData.utilitiesFixedAmount || '[AMOUNT]'}, payable together with the rent on the first day of each month.`
        : formData.utilitiesSplitMethod === 'equal'
          ? 'Utilities shall be split equally among all occupants of the property and billed accordingly.'
          : 'Utilities shall be charged based on the Tenant\'s individual meter reading or actual consumption.'

    sections.push({
      title: `${sections.length + 1}. Room Description`,
      content: `The Landlord agrees to let the Tenant the following room ("Room") at the Property:\n\nRoom Type: ${roomTypeLabel[formData.roomType] || 'Room'}\n${formData.roomDescription ? `Description: ${formData.roomDescription}\n` : ''}The Tenant shall have exclusive use of the Room and shared use of the following common facilities: ${facilityList}.`,
    })

    sections.push({
      title: `${sections.length + 1}. Utilities`,
      content: utilitiesText + (formData.wifiIncluded ? '\n\nWiFi/broadband access is included in the monthly rent.' : '\n\nWiFi/broadband charges are not included and are the Tenant\'s own arrangement.'),
    })

    sections.push({
      title: `${sections.length + 1}. Common Areas`,
      content: `The Tenant shall use the shared facilities in a considerate and responsible manner, keeping them clean and tidy at all times. The Tenant shall not obstruct or interfere with the use of common areas by other occupants of the Property.\n\nThe Tenant acknowledges that the Landlord or other occupants also reside at the Property and agrees to respect the peaceful enjoyment of all occupants.`,
    })

    if (formData.houseRules?.trim()) {
      sections.push({
        title: `Schedule A — House Rules`,
        content: `The following house rules apply to all occupants and form part of this Agreement:\n\n${formData.houseRules.trim()}`,
      })
    }
  }

  // Authorised Occupants (if any listed)
  if (formData.occupants && formData.occupants.length > 0) {
    const occupantList = formData.occupants
      .map(o => `${o.name} (NRIC/FIN/Passport: ${o.nric}) — ${o.relation}`)
      .join('\n')
    sections.push({
      title: `${sections.length + 1}. Authorised Occupants`,
      content: `Only the following persons approved by the Landlord are permitted to occupy the Property:\n\n${occupantList}\n\nThe Tenant shall at all times ensure that all occupants of the Property comply with all applicable laws for entering and staying in Malaysia, and shall produce to the Landlord for inspection the originals of all occupants' identity cards, passports, and other relevant documents evidencing their legal entry into and stay in Malaysia upon request.`,
    })
  }

  // property-specific section
  if (propertyType === 'residential') {
    sections.splice(13, 0, {
      title: '13A. Residential Requirements',
      content: `The Landlord confirms that property approval for subletting has been obtained prior to the commencement of this tenancy. The Tenant acknowledges that the tenancy is subject to the property's prevailing subletting rules and regulations.

The total number of occupants in the Property shall not exceed the maximum permissible occupancy as prescribed by the relevant authorities.

The Landlord shall comply with all property reporting and renewal requirements for the duration of the subletting period.`,
    })
  }

  // Diplomatic clause
  if (diplomaticClause) {
    const dipMin = diplomaticMinMonths || 12
    const dipNotice = diplomaticNoticeMonths || 2
    sections.push({
      title: `${sections.length + 1}. Diplomatic Clause`,
      content: `In the event that the Tenant is required to leave Malaysia permanently due to repatriation, early termination of employment contract, or transfer by the Tenant's employer to another country, it shall be lawful for the Tenant to determine this tenancy by giving not less than ${dipNotice === 1 ? 'one (1) month\'s' : `${dipNotice === 2 ? 'two (2)' : dipNotice} months'`} written notice to the Landlord, provided such notice is served after the expiry of the first ${dipMin} months of the tenancy.

The Tenant shall serve such notice together with documentary evidence of such transfer, repatriation or cessation of employment.`,
      isCustom: true,
    })
  }

  // Custom clauses
  const customClauseTexts: Record<string, string> = {
    UTIL_CAP: `Utilities shall not exceed MYR ${utilityCap || '[AMOUNT]'} per month. If utility charges exceed this amount in any given month, the excess shall be borne by the Tenant.`,
    AIRCON_TENANT: `The Tenant shall take up a service contract with a qualified air-conditioning contractor to service and maintain the air-conditioning system installed at the Property at least once every three (3) months at the expense of the Tenant, including topping-up of gas and chemical cleaning if required. The Tenant shall keep the air-conditioning system in good and tenantable repair throughout the term of this Agreement. A copy of the service contract shall be forwarded to the Landlord.`,
    AIRCON_LANDLORD: `The Landlord shall be responsible for regular aircon servicing at least once every three (3) months throughout the tenancy period.`,
    NO_SMOKING: `Smoking is strictly prohibited within the Property and in any common areas directly associated with the Property.`,
    NO_PETS: `No pets or animals of any kind shall be kept or brought into the Property without the prior written consent of the Landlord.`,
    PETS_ALLOWED: `The Tenant is permitted to keep the following pet(s) at the Property: ${petDescription || '[PET DESCRIPTION]'}. The Tenant shall be responsible for any damage caused by the pet(s), shall ensure the pet(s) do not cause nuisance to neighbours, and shall comply with all rules and regulations of the Animal & Veterinary Service (AVS) and other relevant government authorities.`,
    LANDLORD_ACCESS: `The Landlord or the Landlord's agent shall give at least twenty-four (24) hours' notice before entering the Property, except in cases of emergency.`,
    MINOR_REPAIRS: `The Tenant shall be responsible for the cost of any minor repairs or replacements up to MYR ${minorRepairThreshold || 150}.00 per item per incident. Where the cost exceeds MYR ${minorRepairThreshold || 150}.00, the Tenant shall bear MYR ${minorRepairThreshold || 150}.00 and any excess shall be borne by the Landlord. For repairs above MYR ${minorRepairThreshold || 150}.00, the Landlord's prior approval must be obtained and the Landlord reserves the right to engage their own contractor. This clause shall not apply where the repair or replacement is necessitated by the Tenant's wilful act, default or neglect.`,
    NO_SUBLET: `The Tenant shall not sublet the Property or any part thereof, or allow any other person to occupy the Property, without the prior written consent of the Landlord.`,
    ORIGINAL_CONDITION: `The Tenant shall return the Property to the Landlord at the end of the tenancy in the same condition as at the commencement date, including all fixtures, fittings, and furniture (if furnished), fair wear and tear excepted.`,
    NO_NAILS: `The Tenant shall not affix nails, screws, or any sharp fixtures on the walls of the Property for the purpose of hanging pictures or otherwise without the Landlord's prior written consent, which consent shall not be unreasonably withheld. At the expiry or earlier termination of this tenancy, the Tenant shall at their own expense patch up and repaint all affected areas to the original condition and colour.`,
    VIEWING_CLAUSE: `During the two (2) months immediately preceding the expiration or earlier termination of this tenancy, the Tenant shall permit the Landlord or its representatives, by prior appointment at all reasonable times, to bring prospective tenants or purchasers to view the Property.`,
    GARDEN_MAINTENANCE: `The Tenant shall keep the garden and boundary fences and hedges (if any) of the Property in good order and condition.`,
    POOL_MAINTENANCE: `The Tenant shall take up a servicing contract with a certified maintenance contractor for the service and maintenance of the swimming pool (if any) at the Property. A copy of the servicing contract shall be provided to the Landlord.`,
    AUTO_GATE: `The Tenant shall take up a servicing contract with a certified maintenance contractor for the servicing of the auto-gate (if any) at the Property. A copy of the servicing contract shall be provided to the Landlord.`,
    PURCHASE_CLAUSE: `In the event that the Tenant shall, during the subsistence of this Tenancy Agreement, exercise an Option to Purchase or enter into a Sale and Purchase Agreement in respect of any property in Malaysia, the Tenant shall be entitled to terminate this Tenancy Agreement early by serving ${purchaseNoticeMonths || 2} month(s)' prior written notice to the Landlord together with documentary evidence of such purchase (including a copy of the Option to Purchase or Sale and Purchase Agreement duly executed). Upon the expiry of such notice, this Agreement shall cease and determine without further liability on the part of either party, save in respect of any antecedent breach. The security deposit shall be refunded to the Tenant within fourteen (14) days of the termination date, subject to deduction of any amounts lawfully due to the Landlord.`,
  }

  const customClauseLabels: Record<string, string> = {
    UTIL_CAP: 'Utilities Cap',
    AIRCON_TENANT: 'Air-Conditioning Servicing (Tenant)',
    AIRCON_LANDLORD: 'Air-Conditioning Servicing (Landlord)',
    NO_SMOKING: 'No Smoking',
    NO_PETS: 'No Pets',
    PETS_ALLOWED: 'Pets Allowed',
    LANDLORD_ACCESS: 'Landlord Access',
    MINOR_REPAIRS: 'Minor Repairs',
    NO_SUBLET: 'No Subletting',
    ORIGINAL_CONDITION: 'Return in Original Condition',
    NO_NAILS: 'No Nails or Screws on Walls',
    VIEWING_CLAUSE: 'Viewing Rights',
    GARDEN_MAINTENANCE: 'Garden Maintenance',
    POOL_MAINTENANCE: 'Swimming Pool Maintenance',
    AUTO_GATE: 'Auto-Gate Maintenance',
    PURCHASE_CLAUSE: 'Early Termination — Property Purchase',
  }

  let clauseNum = sections.length + 1
  customClauses.forEach((id) => {
    if (customClauseTexts[id]) {
      const label = customClauseLabels[id] || 'Special Condition'
      sections.push({
        title: `${clauseNum++}. ${label}`,
        content: customClauseTexts[id],
        isCustom: true,
      })
    }
  })

  if (freeTextClause.trim()) {
    sections.push({
      title: `${clauseNum++}. Special Condition`,
      content: freeTextClause.trim(),
      isCustom: true,
    })
  }

  // Schedule 1 — Inventory List
  if (formData.inventoryItems && formData.inventoryItems.length > 0) {
    const conditionLabel: Record<string, string> = { good: 'Good', fair: 'Fair', poor: 'Poor' }
    const rows = formData.inventoryItems
      .map(item => `${item.name.padEnd(35)} ${conditionLabel[item.condition]}`)
      .join('\n')

    sections.push({
      title: 'Schedule 1 — Inventory List',
      content: `The following items are included in the Property at the commencement of the tenancy. Both parties shall inspect and initial against each item at handover.\n\nItem                                    Condition\n${'─'.repeat(55)}\n${rows}\n\nLandlord's signature: _____________________  Date: ___________\n\nTenant's signature:   _____________________  Date: ___________`,
      isCustom: false,
    })
  }

  return {
    sections,
    allLandlords,
    allTenants,
    meta: {
      propertyType: propTypeLabel,
      address: fullAddress,
      landlordName: landlord,
      landlordNric: landlordId,
      landlordAddress: landlordAddr,
      tenantName: tenant,
      tenantNric: tenantId,
      tenantAddress: tenantAddr,
      monthlyRent: rent,
      period: `${startDate} to ${endDate}`,
      commencementDate: skipTerms ? '' : commencementDate,
      expiryDate: skipTerms ? '' : expiryDate,
    },
  }
}
