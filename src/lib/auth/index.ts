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
    // console.error('SignIn error:', error)
    throw new Error(JSON.stringify(error))
  }
}

export async function forgotPassword(payload: { email: string }) {
  console.log('Forgot Password Payload:', payload) // Logging the payload for testing

  // Temporarily returning payload as mock data
  return payload
  // try {
  //   const res = await client.post(
  //     '/api/sharedServices/v1/auth/forgotPassword',
  //     payload,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     }
  //   )
  //   return res.data
  // } catch (error) {
  //   console.error('Forgot password error:', error)
  //   return null // Handle error and return null
  // }
}

export async function verifyEmail(payload: { otp: string }) {
  console.log('verifyEmail Payload:', payload) // Logging the payload for testing

  // Temporarily returning payload as mock data
  return payload
  // try {
  //   const res = await client.post(
  //     '/api/sharedServices/v1/auth/verifyEmailOTP', // Adjust endpoint as needed
  //     payload,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     }
  //   )
  //   return res.data
  // } catch (error) {
  //   console.error('Email verification error:', error)
  //   return null // Handle error and return null
  // }
}

export async function resetPassword(payload: { password: string }) {
  console.log('newPassword Payload:', payload) // Logging the payload for testing

  // Temporarily returning payload as mock data
  return payload
  // try {
  //   const res = await client.post(
  //     '/api/sharedServices/v1/auth/resetPassword',
  //     payload,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     }
  //   )

  //   return res.data
  // } catch (error) {
  //   console.error('Password reset error:', error)
  //   return null // Handle error and return null
  // }
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
    throw new Error('OTP verification failed. Please try again.')
    return null // Handle error and return null
  }
}
