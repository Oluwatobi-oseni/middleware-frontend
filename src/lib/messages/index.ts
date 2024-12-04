import client from '../axios' // Replace with your axios instance
import { CreateMessageRequest, MessageResponse } from './types'
import { AxiosErrorResponse } from '../invites/types'
import { AxiosError } from 'axios'

export async function fetchMessages() {
  try {
    const response = await client.get<MessageResponse[]>(
      '/api/sharedServices/v1/messages',
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

export async function createMessage(payload: CreateMessageRequest) {
  try {
    const response = await client.post(
      '/api/sharedServices/v1/messages/create',
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
