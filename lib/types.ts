export type PropertyType = 'residential' | 'private' | 'room'

export type AdditionalTenant = {
  name: string
  nricPassport: string
}

export type AdditionalLandlord = {
  name: string
  nric: string
}

export type InventoryItem = {
  name: string
  condition: 'good' | 'fair' | 'poor'
}

export type Occupant = {
  name: string
  nric: string
  relation: string
}

export type TenancyFormData = {
  propertyType: PropertyType | null
  propertyAddress: string
  unitNumber: string
  postalCode: string
  landlordName: string
  landlordNric: string
  landlordAddress: string
  additionalLandlords: AdditionalLandlord[]
  tenantName: string
  tenantNric: string
  tenantAddress: string
  receiptEmail: string
  additionalTenants: AdditionalTenant[]
  commencementDate: string
  expiryDate: string
  monthlyRent: number | ''
  securityDeposit: number | ''
  handoverCondition: 'furnished' | 'partial' | 'unfurnished'
  leaseRenewalOption: boolean
  diplomaticClause: boolean
  customClauses: string[]
  utilityCap: number | ''
  petDescription: string
  freeTextClause: string
  // Room rental specific
  roomType: 'common' | 'master' | 'ensuite' | 'other'
  roomDescription: string
  utilitiesIncluded: boolean
  utilitiesSplitMethod: 'equal' | 'meter' | 'fixed'
  utilitiesFixedAmount: number | ''
  wifiIncluded: boolean
  sharedFacilities: string[]
  houseRules: string
  // Payment details
  paymentBank: string
  paymentAccountName: string
  paymentAccountNo: string
  rentPaymentDay: number | ''
  // Minor repairs threshold
  minorRepairThreshold: number | ''
  // Diplomatic clause parameters
  diplomaticMinMonths: number | ''
  diplomaticNoticeMonths: number | ''
  // Renewal parameters
  renewalTermMonths: number | ''
  // Purchase clause
  purchaseNoticeMonths: number | ''
  // General
  occupants: Occupant[]
  inventoryItems: InventoryItem[]
  skipParties: boolean
  skipTerms: boolean
  skipProperty: boolean
}

export const defaultFormData: TenancyFormData = {
  propertyType: null,
  propertyAddress: '',
  unitNumber: '',
  postalCode: '',
  landlordName: '',
  landlordNric: '',
  landlordAddress: '',
  additionalLandlords: [],
  tenantName: '',
  tenantNric: '',
  tenantAddress: '',
  receiptEmail: '',
  additionalTenants: [],
  commencementDate: '',
  expiryDate: '',
  monthlyRent: '',
  securityDeposit: '',
  handoverCondition: 'furnished',
  leaseRenewalOption: false,
  diplomaticClause: false,
  customClauses: [],
  utilityCap: '',
  petDescription: '',
  freeTextClause: '',
  roomType: 'common',
  roomDescription: '',
  utilitiesIncluded: false,
  utilitiesSplitMethod: 'equal',
  utilitiesFixedAmount: '',
  wifiIncluded: false,
  sharedFacilities: [],
  houseRules: '',
  paymentBank: '',
  paymentAccountName: '',
  paymentAccountNo: '',
  rentPaymentDay: 1,
  minorRepairThreshold: 150,
  diplomaticMinMonths: 12,
  diplomaticNoticeMonths: 2,
  renewalTermMonths: 12,
  purchaseNoticeMonths: 2,
  occupants: [],
  inventoryItems: [],
  skipParties: false,
  skipTerms: false,
  skipProperty: false,
}
