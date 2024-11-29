// types/sharedServices.ts

// Type for the GET /api/sharedServices/v1/codes response
export interface CodeResponse {
  id: string
  title: string
  key: string
  amount: string
  usage: number
  expirationDate: string // ISO string format
  createdAt: string // ISO string format
  updatedAt: string // ISO string format
}

// Type for the POST /api/sharedServices/v1/codes/create request body
export interface CreateCodeRequest {
  title: string
  key: string
  amount: number
  usage: number
  expirationDate: string // ISO string format
}

// Type for the POST /api/sharedServices/v1/codes/create response
export interface CreateCodeResponse {
  success: boolean
  id: string
}
