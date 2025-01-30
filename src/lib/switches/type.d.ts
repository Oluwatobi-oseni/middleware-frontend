export type Provider = {
  id: string
  isEnabled: boolean
  logoUrl: string
  name: string
}

export type ProvidersResponse = {
  verificationProviders: Provider[]
  messagingProviders: Provider[]
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
