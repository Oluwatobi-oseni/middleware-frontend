export type Provider = {
  id: string
  isEnabled: boolean
  logoUrl: string
  name: string
}

export type ProvidersResponse = {
  verificationProviders: Provider[]
  messagingProviders: Provider[]
  complianceProviders: Provider[]
}

export interface Recents {
  type: string
  data: string
  createdAt: string
}
export interface ProviderVerificationResponse {
  id: string
  name: string
  isEnabled: boolean
  logoUrl: string
  customersVerified: number
  pendingVerifications: number
  recentVerifications: Recents[]
}

export interface ProviderMessagingResponse {
  id: string
  name: string
  isEnabled: boolean
  logoUrl: string
  messages: Recents[]
  totalMessages: number
  whatsappTotal: number
  smsTotal: number
}

export interface ProviderComplianceResponse {
  provider: {
    id: string
    name: string
    isEnabled: boolean
    logoUrl: string
  }
  profiledCustomers: number
  flaggedTransactions: FlaggedTransaction[]
  recentProfiledCustomers: RecentProfiledCustomer[]
}

export interface FlaggedTransaction {
  transactionId: string
  reason: string
  dateFlagged: string // ISO date format
}

export interface RecentProfiledCustomer {
  rcNumber: string
  companyName: string
}
