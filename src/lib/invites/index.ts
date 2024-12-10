import { AxiosError } from 'axios'
import client from '../axios'
import { AxiosErrorResponse, OtpAuthResponse } from './types'

// Invite User API function
export async function inviteUser(payload: {
  email: string
  role: string
  designationId: number
}) {
  try {
    const token = sessionStorage.getItem('accessToken')
    const res = await client.post(
      '/api/sharedServices/v1/invites/inviteUser',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    )

    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<AxiosErrorResponse>
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message)
    }
    throw new Error('An unexpected error occurred')
  }
}

// Create Password API function
export async function createPassword(payload: {
  firstname: string
  lastname: string
  dob: string
  phoneNumber: string
  password: string
}) {
  try {
    const token = sessionStorage.getItem('onboardingToken')
    const res = await client.post(
      `/api/sharedServices/v1/invites/createPassword?token=${token}`,
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
    throw new Error(JSON.stringify(error))
  }
}

// OTP Authentication API function
export async function otpAuth({ token }: { token: string }) {
  try {
    const res = await client.get<OtpAuthResponse>(
      `/api/sharedServices/v1/invites/otpauth?token=${token}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    return res.data
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
