// Response for signing in
export interface SignInResponse {
  access_token: string
}

// Response for verifying TOTP (Time-based One-Time Password)
export interface VerifyTOTPResponse {
  isAuthenticated: boolean
  access_token: string
}

// Response for signing in with password
export interface SignInWithPasswordResponse {
  success: boolean
  id: number
  message: string // e.g., "complete signup with otp verification"
}

// Response for verifying sign-in OTP
export interface VerifySignInOTPResponse {
  isAuthenticated: boolean
  access_token: string
}

// Response for requesting password reset
export interface RequestPasswordResetResponse {
  success: boolean
  email: string // e.g., "victor.balogun@alertgroup.com.ng"
}

// Response for verifying password reset OTP
export interface VerifyPasswordResetOTPResponse {
  id: string // UUID or other identifier
}

// Response for resetting password
export interface ResetPasswordResponse {
  success: boolean // Note: The correct key should be "success", not "succes"
  message: string // e.g., "password successfully changed"
}
