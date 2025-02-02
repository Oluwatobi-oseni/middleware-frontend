import { AxiosError } from 'axios'
import { BusinessDetailsResponse, BusinessesResponse } from './types'
import { AxiosErrorResponse } from '@/lib/invites/types'
import client from '@/lib/axios'

export async function fetchBusinesses() {
  try {
    const response = await client.get<BusinessesResponse>(
      '/api/sharedServices/v1/businesses',
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

export async function fetchBusinessDetails(businessId: string) {
  try {
    const response = await client.get<BusinessDetailsResponse>(
      `/api/sharedServices/v1/businesses/${businessId}`,
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
