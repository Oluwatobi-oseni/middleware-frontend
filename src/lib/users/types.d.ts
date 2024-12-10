export type userDetailsType = {
  id: number
  email: string
  firstname: string | null
  lastname: string | null
  role: 'SUPER_ADMIN' | 'MEMBER'
  createdAt: string
}

export type designationType = {
  id: number
  name: string
}
