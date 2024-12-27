import client from '../axios'
import {
  designationType,
  ModifyUserRoleResponse,
  SuspendUserResponse,
  userDetailsType,
} from './types'

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

export async function fetchDesignations() {
  try {
    const token = sessionStorage.getItem('accessToken')
    const res = await client.get<designationType[]>(
      `/api/sharedServices/v1/admin/designations`,
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

export async function disable2FA(userId: string) {
  try {
    const token = sessionStorage.getItem('accessToken')
    const res = await client.post(
      `/api/sharedServices/v1/admin/mfa/disable`,
      { userId },
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

export async function suspendUser(userId: string) {
  try {
    const token = sessionStorage.getItem('accessToken')
    const res = await client.post<SuspendUserResponse>(
      `/api/sharedServices/v1/admin/suspendUser`,
      { userId },
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

export async function modifyUserRole(payload: {
  userId: number
  newRole: string
}) {
  try {
    const token = sessionStorage.getItem('accessToken')
    const res = await client.post<ModifyUserRoleResponse>(
      `/api/sharedServices/v1/admin/modifyRole`,
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
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
