export type Team = {
  id: string
  accountName: string
  email: string
  role: string
  twoFactorAuthEnabled: boolean
  dateJoined: string // ISO date format (e.g., '2023-10-21T14:48:00.000Z')
}
