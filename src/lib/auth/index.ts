import Cookies from 'universal-cookie'
import { isExpired, decodeToken } from 'react-jwt'
import client from '../axios'
import {
  RequestPasswordResetResponse,
  ResetPasswordResponse,
  SignInWithPasswordResponse,
  VerifyPasswordResetOTPResponse,
  VerifyTOTPResponse,
} from './types'

export const SES_TOKEN_NAME = '_cptn'

export interface AuthState {
  isSignedIn: boolean
  userId?: string
}

export type Role = 'cco' | 'bm' | 'hop' | 'head_office' | 'admin'

export type User = {
  role: Role
  name: string
  email: string
}

export type TokenResponse = {
  access_token: string
}

type DecodedToken = {
  exp: number
  iat: number
  iss: string
  jti: string
  nbf: number
  sub: string
}

export const cookies = new Cookies()

export const validateToken = (token: string | undefined): AuthState => {
  if (!token || isExpired(token)) {
    return { isSignedIn: false }
  }

  const decodedToken = decodeToken<DecodedToken>(token)
  return { isSignedIn: !!decodedToken?.sub, userId: decodedToken?.sub }
}

export async function register(payload: { email: string; password: string }) {
  console.log(payload)
  // try {
  //   const res = await client.post<TokenResponse>(
  //     '/api/sharedServices/v1/auth/register', // Adjust this endpoint as needed
  //     payload,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     }
  //   )

  //   if (res.data.access_token) {
  //     cookies.set(SES_TOKEN_NAME, res.data.access_token, { path: '/' })
  //     return res.data
  //   }

  //   throw new Error('No access token returned')
  // } catch (error) {
  //   console.error('Registration error:', error)
  //   throw new Error('An unexpected error occurred during registration')
  // }
}

export async function generate2FASecret(email: string) {
  console.log(email)
  // try {
  //   const res = await client.post<TokenResponse>(
  //     '/api/sharedServices/v1/auth/generate-2fa-secret', // Adjust this endpoint as needed
  //     { email },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     }
  //   );

  //   if (res.data.secret) {
  //     return res.data; // Assuming the response includes the 2FA secret
  //   }

  //   throw new Error('No secret returned');
  // } catch (error) {
  //   console.error('2FA Secret generation error:', error);
  //   throw new Error('An unexpected error occurred while generating 2FA secret');
  // }
}

export async function signIn(payload: { email: string; password: string }) {
  try {
    const res = await client.post<SignInWithPasswordResponse>(
      '/api/sharedServices/v1/auth/signInWithPassword',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    if (!res?.data) {
      // cookies.set(SES_TOKEN_NAME, res.data.access_token, { path: '/' })
      throw new Error('Sign in was not successful')
    }
    return res.data

    // throw new Error('Sign in was not successful')
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function forgotPassword(payload: { email: string }) {
  try {
    const res = await client.post<RequestPasswordResetResponse>(
      '/api/sharedServices/v1/auth/requestPasswordReset',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return res.data
  } catch (error) {
    console.error('Forgot password error:', error)
    throw new Error('Failed to send password reset email. Please try again.')
  }
}

export async function verifyPasswordResetOTP(payload: {
  email: string
  otp: string
}) {
  try {
    const res = await client.post<VerifyPasswordResetOTPResponse>(
      '/api/sharedServices/v1/auth/verifyPasswordResetOTP',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return res.data
  } catch (error) {
    console.error('OTP verification error:', error)
    throw new Error('OTP verification failed. Please try again.')
  }
}

export async function resetPassword(payload: {
  resetId: string
  password: string
}) {
  try {
    const res = await client.post<ResetPasswordResponse>(
      '/api/sharedServices/v1/auth/resetPassword',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return res.data
  } catch (error) {
    console.error('Password reset error:', error)
    throw new Error('Password reset failed. Please try again.')
  }
}

export async function verifyOTP(payload: { otp: string }) {
  const id = sessionStorage.getItem('userId')
  if (!id) {
    throw new Error('User ID is missing. Please sign in again.')
  }
  try {
    const res = await client.post<VerifyTOTPResponse>(
      '/api/sharedServices/v1/auth/verifySignInOTP',
      { id: parseInt(id), otp: payload.otp },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    return res.data
  } catch (error) {
    console.error('OTP verification error:', error)
    throw new Error('OTP verification failed. Please try again.')
    return null // Handle error and return null
  }
}

export async function updatePassword(payload: { newPassword: string }) {
  try {
    const res = await client.post(
      '/api/sharedServices/v1/auth/updatePassword',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return res.data
  } catch (error) {
    console.error('Password update error:', error)
    throw new Error('Password update failed. Please try again.')
  }
}
