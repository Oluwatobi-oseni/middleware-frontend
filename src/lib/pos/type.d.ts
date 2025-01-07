export type BusinessResponse = {
  id: string
  name: string
  ownersName: string
  dateRegistered: string // ISO string
  terminals: number
  kybStatus: boolean
}

export type BusinessDetailsResponse = BusinessResponse & {
  CustomerId: string
  BVN: string
  Gender: 'male' | 'female'
  FirstName: string
  LastName: string
  OtherNames: string
  PlaceOfBirth: string
  DateOfBirth: string // ISO string
  PhoneNo: string
  Address: string
  Email: string
  businessAddress: string
  businessLocation: string
  companySize: string // Example: "1000+"
  estimatedAnnualVolume: string // Example: "N100,000,000 - N500,000,000"
  industry: string
  registrationNumber: string
}

export type CreateBusinessAccountRequest = {
  Gender: number
  CustomerId: string
  BVN: string
  FirstName: string
  LastName: string
  PlaceOfBirth: string
  DateOfBirth: string // yyyy-MM-dd
  PhoneNo: string
  Address: string
  Email: string
  ProductId: string
}

export type CreateBusinessAccountResponse = {
  IsSuccessful: boolean
  CustomerIDInString: string | null
  Message: {
    AccountNumber: string
    BankoneAccountNumber: string
    CustomerID: string
    FullName: string
    CreationMessage: string | null
    Id: number
  }
  TransactionTrackingRef: string | null
  Page: string | null
}
