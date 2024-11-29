import client from '../axios'
import { AxiosError } from 'axios'
import { AxiosErrorResponse } from '../invites/types'
import { CodeResponse, CreateCodeRequest } from './type'

export async function fetchCodes() {
  try {
    const response = await client.get<CodeResponse>(
      '/api/sharedServices/v1/codes',
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

export async function createCode(payload: CreateCodeRequest) {
  try {
    const response = await client.post(
      '/api/sharedServices/v1/codes/create',
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
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
