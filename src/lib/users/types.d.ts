export type userDetailsType = {
  id: number
  email: string
  firstname: string | null
  lastname: string | null
  role: 'SUPER_ADMIN' | 'MEMBER' | 'JUNIOR' | 'SENIOR'
  createdAt: string
  Designation?: {
    name:
      | 'HUMAN_RESOURCES'
      | 'FINANCE'
      | 'BRANCH_MANAGER'
      | 'COMPLIANCE'
      | 'LOAN_OFFICER'
      | 'CUSTOMER_SERVICE'
      | 'IT_OFFICE'
      | 'LEGAL'
  }
  has2FAEnabled: boolean
}

export type designationType = {
  id: number
  name: string
}

// Type for the response when a user is suspended
export type SuspendUserResponse = {
  success: boolean
  message: 'This user has been suspended'
}

// Type for the response when a user’s role is modified
export type ModifyUserRoleResponse = {
  success: boolean
  message: 'SENIOR' | 'JUNIOR' | 'MEMBER' | 'SUPER_ADMIN'
}
