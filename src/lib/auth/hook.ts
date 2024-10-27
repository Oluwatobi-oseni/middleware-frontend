import { useCallback, useEffect, useState } from 'react'
import {
  AuthState,
  SES_TOKEN_NAME,
  register as apiRegister,
  generate2FASecret as apiGenerate2FASecret,
  signIn as apiSignIn,
  verifyOTP as apiVerifyOTP,
  verifyEmail as apiVerifyEmail,
  resetPassword as apiResetPassword,
  forgotPassword as apiForgotPassword,
} from '.'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { cookies } from '.'
import client from '../axios'
import { handleError } from './utilities/errorhandler'
import { handleSuccess } from './utilities/successHandler'

// Context Hook
export const useAuth = (): AuthState => {
  const token = cookies.get(SES_TOKEN_NAME)
  const is2FAVerified = sessionStorage.getItem('is2FAVerified') === 'true'
  return { isSignedIn: !!token && is2FAVerified }
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
      if (data?.access_token) {
        const { email } = payload

        // Store token temporarily in state
        sessionStorage.setItem('hasPassedLogin', 'true')
        sessionStorage.setItem('tempToken', data.access_token)
        sessionStorage.setItem('userEmail', email)

        navigate('/two-factor-auth', {
          replace: true,
        })

        handleSuccess(
          'Redirecting to Two-Factor Authentication',
          'Please complete the verification to log in.'
        )
      } else {
        handleError(null, 'No access token returned. Please try again.')
      }
    },
    onError: (error) => {
      handleError(error, 'Login failed. Please try again.')
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
      handleVerificationSuccess(data)
    },
    onError(error) {
      handleVerificationError(error)
    },
  })

  const handleVerificationSuccess = (data: { isAuthenticated: boolean }) => {
    if (data.isAuthenticated) {
      // Set 2FA verification flag in sessionStorage
      const token = sessionStorage.getItem('tempToken')
      if (token) {
        cookies.set(SES_TOKEN_NAME, token, { path: '/' })
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`
        sessionStorage.removeItem('tempToken')
        sessionStorage.setItem('is2FAVerified', 'true')

        handleSuccess(
          'Verification successful',
          'You will be redirected shortly.'
        )
        window.location.reload()
      }
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
  const handleForgotPasswordSuccess = (data: { email: string }) => {
    // if (data.success) {
    //   handleSuccess(
    //     'Password Reset Email Sent',
    //     'OTP has been sent to your email. Please check your inbox.'
    //   )
    //   navigate('/otp')
    // } else {
    //   handleError(null, 'Failed to send password reset email.')
    // }
    console.log('Email', data)
    handleSuccess(
      'Password Reset Email Sent',
      'OTP has been sent to your email. Please check your inbox.'
    )
    navigate('/otp', { state: { email: data.email } })
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
const verifyEmailAsync = async (payload: { otp: string }) => {
  const data = await apiVerifyEmail(payload)
  return data
}
export const useVerifyEmail = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: verifyEmailAsync,
    onSuccess(data) {
      handleVerificationSuccess(data)
    },
    onError(error) {
      handleVerificationError(error)
    },
  })
  const handleVerificationSuccess = (data: { otp: string }) => {
    if (data) {
      handleSuccess('OTP verified', 'You can now set a new password.')
      navigate('/reset-password')
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
  const data = await apiResetPassword(payload)
  return data
}

export const useResetPassword = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: resetPasswordAsync,
    onSuccess() {
      handleSuccess(
        'Password reset successfully',
        'You can now log in with your new password.'
      )
      navigate('/sign-in') // Redirect to login page after a successful reset
    },
    onError(error) {
      handleError(error, 'An error occurred while resetting your password.')
    },
  })
  return { ...mutation }
}
// Sign Out Hook
export const useSignOut = () => {
  const navigate = useNavigate()

  const signOut = useCallback(() => {
    cookies.remove(SES_TOKEN_NAME, { path: '/' })
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
