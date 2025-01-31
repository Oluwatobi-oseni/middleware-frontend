// types.d.ts

// Business type for individual businesses
export type Director = {
  id: string
  businessId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  idType: string
  idNumber: string
  idImage: string
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  email: string | null
  firstName: string
  lastName: string
  otherName: string
  gender: string
  reference: string | null
  phoneNumber: string
  onboardType: string
  onboarding: string
  kybStatus: string
  login: string
  createdAt: string
  updatedAt: string
}

export type Business = {
  id: string
  userId: string
  businessName: string
  businessEntity: string
  logo: string
  businessPhone: string
  companyType: string
  regDate: string | null
  industry: string
  size: string
  income: string
  address: string
  city: string
  state: string
  zipcode: string | null
  landmark: string | null
  lga: string
  cacNumber: string
  cacdoc: string
  moiDoc: string
  scumlDoc: string
  utilityBill: string | null
  addressVerificationStatus: string
  addressVerificationId: string | null
  createdAt: string
  updatedAt: string
  directors: Director[]
  user: User
}

export type BusinessesResponse = {
  status: string
  message: string
  data: Business[]
}

export type BusinessDetailsResponse = {
  status: string
  message: string
  data: Business
}
