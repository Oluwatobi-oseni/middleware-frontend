import client from '../axios'

// Invite User API function
export async function inviteUser(payload: { email: string; role: string }) {
  try {
    const res = await client.post(
      '/api/sharedServices/v1/invites/inviteUser',
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

// Create Password API function
export async function createPassword(payload: {
  token: string
  password: string
}) {
  try {
    const res = await client.post(
      `/api/sharedServices/v1/invites/createPassword?token=${payload.token}`,
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
    const res = await client.get(
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
