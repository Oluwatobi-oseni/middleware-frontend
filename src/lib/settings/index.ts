import client from '../axios'
import { jwtDecode } from 'jwt-decode'
import { AxiosError } from 'axios'
import { AxiosErrorResponse } from '../invites/types'
import { UserDataResponse } from './type'

interface DecodedToken {
  sub: number
}

export async function fetchUserDetails(accessToken: string) {
  try {
    const decodedToken = jwtDecode<DecodedToken>(accessToken)
    const userId = decodedToken.sub

    if (!userId) {
      throw new Error('User ID not found in token')
    }

    const response = await client.get<UserDataResponse>(
      `/api/sharedServices/v1/users/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<AxiosErrorResponse>
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message)
    }
    throw new Error('An unexpected error occurred')
  }
}
