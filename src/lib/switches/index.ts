import client from '../axios'
import { AxiosError } from 'axios'
import { AxiosErrorResponse } from '../invites/types'
import {
  ProviderComplianceResponse,
  ProviderMessagingResponse,
  ProvidersResponse,
  ProviderVerificationResponse,
} from './type'

// Fetch providers
export async function getProviders(): Promise<ProvidersResponse> {
  try {
    const response = await client.get<ProvidersResponse>(
      '/api/sharedServices/v1/providers'
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

export async function fetchProviderVerificationById(
  id: string
): Promise<ProviderVerificationResponse> {
  try {
    const response = await client.get<ProviderVerificationResponse>(
      `/api/sharedServices/v1/providers/verification/${id}`
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    throw new Error(axiosError.response?.data?.message || 'An error occurred')
  }
}

export async function fetchProviderMessagingById(
  id: string
): Promise<ProviderMessagingResponse> {
  try {
    const response = await client.get<ProviderMessagingResponse>(
      `/api/sharedServices/v1/providers/messaging/${id}`
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    throw new Error(axiosError.response?.data?.message || 'An error occurred')
  }
}

export async function fetchProviderComplianceById(
  id: string
): Promise<ProviderComplianceResponse> {
  try {
    const response = await client.get<ProviderComplianceResponse>(
      `/api/sharedServices/v1/providers/compliance/${id}`
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    throw new Error(axiosError.response?.data?.message || 'An error occurred')
  }
}
