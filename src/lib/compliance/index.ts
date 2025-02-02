import { AxiosError } from 'axios'
import client from '../axios'
import { FlaggedTransaction } from './types'

export async function fetchFlaggedTransactions(): Promise<
  FlaggedTransaction[]
> {
  try {
    const response = await client.get<FlaggedTransaction[]>(
      '/api/sharedServices/v1/compliance/transactions/flagged'
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(
      axiosError.response?.data?.message || 'An unexpected error occurred'
    )
  }
}
