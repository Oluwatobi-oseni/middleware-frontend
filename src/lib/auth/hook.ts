import { useCallback, useEffect, useState } from 'react'
import {
  AuthState,
  SES_TOKEN_NAME,
  register as apiRegister,
  generate2FASecret as apiGenerate2FASecret,
  signIn as apiSignIn,
  verifyOTP as apiVerifyOTP,
  verifyPasswordResetOTP as apiVerifyEmail,
  resetPassword as apiResetPassword,
  forgotPassword as apiForgotPassword,
  updatePassword as apiUpdatePassword,
} from '.'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { cookies } from '.'
import client from '../axios'
import { handleError } from './utilities/errorhandler'
import { handleSuccess } from './utilities/successHandler'
import { toast } from '@/components/ui/use-toast'
import { RequestPasswordResetResponse } from './types'

// Context Hook
export const useAuth = (): AuthState => {
  const token = cookies.get(SES_TOKEN_NAME)
  const is2FAVerified = sessionStorage.getItem('is2FAVerified') === 'true'
  // return { isSignedIn: !!token && is2FAVerified }
  return { isSignedIn: Boolean(token && is2FAVerified) }
}

// Complete Registration Hook
const completeRegistrationAsync = async (email: string) => {
  const response = await apiGenerate2FASecret(email)
  return response
}
export const useCompleteRegistration = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: completeRegistrationAsync,
    onSuccess: () => {
      handleSuccess(
        'Registration Complete',
        'You have successfully registered!'
      )
      navigate('/signin') // Redirect to the sign-in page
    },
    onError: (error) => {
      handleError(error, 'Failed to complete registration. Please try again.')
    },
  })
}

// Register Hook
const registerAsync = async (payload: {
  email: string
  password: string
  enable2FA: boolean
}) => {
  const response = await apiRegister(payload)
  return response
}

export const useRegister = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: registerAsync,
    onSuccess: () => {
      navigate('/complete-signup') // Redirect to 2FA setup page
      handleSuccess(
        'Registration Successful',
        'You will be redirected to complete your signup with 2FA.'
      )
    },
    onError: (error) => {
      handleError(error, 'Registration failed. Please try again.')
    },
  })
}

// SignIn Hook
const signInAsync = async (payload: { email: string; password: string }) => {
  const data = await apiSignIn(payload)
  return { data, payload }
}
export const useSignIn = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signInAsync,
    onSuccess: ({ data, payload }) => {
      if (data.success) {
        const { email } = payload

        // Store token temporarily in state
        sessionStorage.setItem('hasPassedLogin', 'true')
        sessionStorage.setItem('userId', data.id.toString())
        sessionStorage.setItem('userEmail', email)

        // client.defaults.headers.common['Authorization'] =
        //   `Bearer ${data.access_token}`

        navigate('/two-factor-auth', {
          replace: true,
        })

        handleSuccess(
          'Redirecting to Two-Factor Authentication',
          data.message || 'Please complete the verification to log in.'
        )
      } else {
        handleError(null, 'Sign in failed. Please try again..')
      }
    },
    onError: (error) => {
      const errorMessage = error.message
      const status: number = JSON.parse(errorMessage).status

      if (status === 401) {
        toast({
          title: 'Error',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        })
      }
    },
  })
}

export const useVerifyOTP = () => {
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 5
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (payload: { otp: string }) => {
      const data = await apiVerifyOTP(payload)
      return data
    },
    onSuccess(data) {
      if (data && data.isAuthenticated) {
        handleVerificationSuccess(data)
      } else {
        handleVerificationError(
          'Invalid response from server. Please try again.'
        )
      }
    },
    onError(error) {
      console.error('API Error:', error)
      handleVerificationError(error)
    },
  })

  const handleVerificationSuccess = (data: {
    isAuthenticated: boolean
    access_token?: string
  }) => {
    if (data.isAuthenticated && data.access_token) {
      cookies.set(SES_TOKEN_NAME, data.access_token, { path: '/' })
      sessionStorage.setItem('accessToken', data.access_token)
      sessionStorage.setItem('is2FAVerified', 'true')
      sessionStorage.removeItem('tempToken')
      sessionStorage.removeItem('userId')

      handleSuccess(
        'Verification successful',
        'You will be redirected shortly.'
      )
      navigate('/dashboard')
    } else {
      handleFailedVerification()
    }
  }

  const handleFailedVerification = () => {
    setRetryCount((prevCount) => {
      const newCount = prevCount + 1

      if (newCount >= maxRetries) {
        handleError(null, 'You have been redirected to the sign-in page.')
        // Navigate back to the sign-in page upon exceeding max attempts
        navigate('/sign-in')
      } else {
        handleError(
          null,
          `Invalid code. Please try again. Attempts left: ${maxRetries - newCount}`
        )
      }

      return newCount
    })
  }

  const handleVerificationError = (error: unknown) => {
    handleError(error, 'An error occurred during verification.')
  }

  return { ...mutation, retryCount }
}

const forgotPasswordAsync = async (payload: { email: string }) => {
  const data = await apiForgotPassword(payload)
  if (data.success) {
    sessionStorage.setItem('resetEmail', payload.email)
  }
  return data
}
export const useForgotPassword = () => {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: forgotPasswordAsync,
    onSuccess(data) {
      handleForgotPasswordSuccess(data)
    },
    onError(error) {
      handleForgotPasswordError(error)
    },
  })
  const handleForgotPasswordSuccess = (data: RequestPasswordResetResponse) => {
    if (data.success) {
      handleSuccess(
        'Password Reset Email Sent',
        'OTP has been sent to your email. Please check your inbox.'
      )
      navigate('/otp')
    } else {
      handleError(null, 'Failed to send password reset email.')
    }
  }

  const handleForgotPasswordError = (error: unknown) => {
    handleError(
      error,
      'An error occurred while attempting to reset the password.'
    )
  }

  return { ...mutation }
}

// Verify email hook
const verifyPasswordResetOTPAsync = async (payload: { otp: string }) => {
  const email = sessionStorage.getItem('resetEmail')
  if (!email) {
    throw new Error('Email not found in session. Please try again.')
  }
  const data = await apiVerifyEmail({ email, otp: payload.otp })

  if (data.id) {
    sessionStorage.setItem('resetId', data.id)
  }
  sessionStorage.removeItem('resetEmail')
  return data
}
export const useVerifyEmail = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: verifyPasswordResetOTPAsync,
    onSuccess(data) {
      handleVerificationSuccess(data)
    },
    onError(error) {
      handleVerificationError(error)
    },
  })
  const handleVerificationSuccess = (data: { id: string }) => {
    if (data?.id) {
      handleSuccess('OTP verified', 'You can now set a new password.')
      navigate('/reset-password', { state: { id: data.id } })
    } else {
      handleError(null, 'Invalid OTP. Please try again.')
    }
  }
  const handleVerificationError = (error: unknown) => {
    handleError(error, 'An error occurred during verification.')
  }
  return { ...mutation }
}

// Reset Password Hook
const resetPasswordAsync = async (payload: { password: string }) => {
  const resetId = sessionStorage.getItem('resetId')

  if (!resetId) {
    throw new Error('Reset ID not found. Please try the reset process again.')
  }
  const data = await apiResetPassword({ password: payload.password, resetId })
  sessionStorage.removeItem('resetId')
  return data
}

export const useResetPassword = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: resetPasswordAsync,
    onSuccess(data) {
      handleSuccess(
        'Password Reset Successful',
        data.message || 'Your password has been changed successfully.'
      )
      navigate('/sign-in')
    },
    onError(error) {
      handleError(error, 'An error occurred while resetting your password.')
    },
  })
  return { ...mutation }
}

const updatePasswordAsync = async (payload: { newPassword: string }) => {
  const data = await apiUpdatePassword(payload)
  return data
}

export const useUpdatePassword = () => {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: updatePasswordAsync,
    onSuccess(data) {
      if (data.success) {
        handleSuccess(
          'Password Updated',
          'Your password has been successfully updated.'
        )
        navigate('/dashboard') // Redirect to a desired page after success
      } else {
        handleError(null, 'Failed to update password. Please try again.')
      }
    },
    onError(error) {
      handleError(error, 'An error occurred while updating your password.')
    },
  })

  return { ...mutation }
}

// Sign Out Hook
export const useSignOut = () => {
  const navigate = useNavigate()

  const signOut = useCallback(() => {
    cookies.remove(SES_TOKEN_NAME, { path: '/' })
    sessionStorage.removeItem('accessToken')
    delete client.defaults.headers.common['Authorization']
    sessionStorage.removeItem('hasPassedLogin')

    handleSuccess('Signed Out', 'You have been successfully signed out.')

    navigate('/sign-in')
    window.location.reload()
  }, [navigate])

  // Auto sign-out after 5 minutes of inactivity
  useEffect(() => {
    const inactivityTime = 5 * 60 * 1000
    let timeoutId: NodeJS.Timeout

    const resetTimeout = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(signOut, inactivityTime)
    }

    resetTimeout()

    window.addEventListener('mousemove', resetTimeout)
    window.addEventListener('keypress', resetTimeout)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('mousemove', resetTimeout)
      window.removeEventListener('keypress', resetTimeout)
    }
  }, [signOut])

  return signOut
}
