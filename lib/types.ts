export type PropertyType = 'hdb' | 'private'

export type AdditionalTenant = {
  name: string
  nricPassport: string
}

export type TenancyFormData = {
  propertyType: PropertyType | null
  propertyAddress: string
  unitNumber: string
  postalCode: string
  landlordName: string
  landlordNric: string
  landlordAddress: string
  tenantName: string
  tenantNric: string
  tenantEmail: string
  additionalTenants: AdditionalTenant[]
  commencementDate: string
  expiryDate: string
  monthlyRent: number | ''
  securityDeposit: number | ''
  hdbApprovalObtained: boolean
  handoverCondition: 'furnished' | 'partial' | 'unfurnished'
  leaseRenewalOption: boolean
  diplomaticClause: boolean
  customClauses: string[]
  utilityCap: number | ''
  petDescription: string
  freeTextClause: string
}

export const defaultFormData: TenancyFormData = {
  propertyType: null,
  propertyAddress: '',
  unitNumber: '',
  postalCode: '',
  landlordName: '',
  landlordNric: '',
  landlordAddress: '',
  tenantName: '',
  tenantNric: '',
  tenantEmail: '',
  additionalTenants: [],
  commencementDate: '',
  expiryDate: '',
  monthlyRent: '',
  securityDeposit: '',
  hdbApprovalObtained: false,
  handoverCondition: 'furnished',
  leaseRenewalOption: false,
  diplomaticClause: false,
  customClauses: [],
  utilityCap: '',
  petDescription: '',
  freeTextClause: '',
}
