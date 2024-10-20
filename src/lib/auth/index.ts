import Cookies from 'universal-cookie'
import { isExpired, decodeToken } from 'react-jwt'
import client from '../axios'

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

export async function signIn(payload: { email: string; password: string }) {
  try {
    const res = await client.post<TokenResponse>(
      '/api/sharedServices/v1/auth/signin',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    if (res.data.access_token) {
      cookies.set(SES_TOKEN_NAME, res.data.access_token, { path: '/' })
      return res.data
    }

    throw new Error('No access token returned')
  } catch (error) {
    console.error('SignIn error:', error)
    throw new Error('An unexpected error occurred')
  }
}

export async function verifyOTP(payload: { otp: string }) {
  try {
    const res = await client.post(
      '/api/sharedServices/v1/auth/verifyTOTP',
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
    return null // Handle error and return null
  }
}
