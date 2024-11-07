import client from '../axios'
import { userDetailsType } from './types'

export async function userDetails() {
  try {
    const token = sessionStorage.getItem('accessToken')
    const res = await client.get<userDetailsType[]>(
      `/api/sharedServices/v1/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    )

    return res.data
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
