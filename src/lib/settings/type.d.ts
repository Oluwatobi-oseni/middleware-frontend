export interface UserDesignation {
  name: string
}

export interface UserDataResponse {
  dob: string
  email: string
  firstname: string
  lastname: string
  phoneNumber: string
  role: string
  Designation: UserDesignation
}
