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
  email: string
  password: string
}) {
  try {
    const res = await client.post(
      '/api/sharedServices/v1/invites/createPassword',
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
export async function otpAuth() {
  try {
    const res = await client.get('/api/sharedServices/v1/invites/otpauth', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    return res.data
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
