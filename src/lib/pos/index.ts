import client from '../axios'
import { AxiosError } from 'axios'
import { AxiosErrorResponse } from '../invites/types'
import {
  BusinessResponse,
  BusinessDetailsResponse,
  CreateBusinessAccountRequest,
  CreateBusinessAccountResponse,
} from './type'

// Fetch all businesses
export async function fetchBusinesses(): Promise<BusinessResponse[]> {
  try {
    const response = await client.get<BusinessResponse[]>(
      '/api/sharedServices/v1/pos/businesses'
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

// Fetch business details by ID
export async function fetchBusinessById(
  id: string
): Promise<BusinessDetailsResponse> {
  try {
    const response = await client.get<BusinessDetailsResponse>(
      `/api/sharedServices/v1/pos/businesses/${id}`
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

// Create a business account
export async function createBusinessAccount(
  payload: CreateBusinessAccountRequest
): Promise<CreateBusinessAccountResponse> {
  try {
    const response = await client.post<CreateBusinessAccountResponse>(
      '/api/sharedServices/v1/pos/create-business-account',
      payload
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<AxiosErrorResponse>
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message)
    }
    throw new Error(
      'An unexpected error occurred while creating the business account'
    )
  }
}
