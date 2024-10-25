import { useCallback, useContext, useEffect, useState } from 'react'
import {
  AuthState,
  SES_TOKEN_NAME,
  register as apiRegister,
  generate2FASecret as apiGenerate2FASecret,
  signIn as apiSignIn,
  verifyOTP as apiVerifyOTP,
} from '.'
import { AuthContext } from './auth-provider'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { cookies } from '.'
import { toast } from '@/components/ui/use-toast'
import client from '../axios'

// Context Hook
export const useAuth = (): AuthState => {
  const auth = useContext(AuthContext)
  return auth || { isSignedIn: false }
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
      toast({
        title: 'Registration Complete',
        description: 'You have successfully registered!',
      })
      navigate('/signin') // Redirect to the sign-in page
    },
    onError: (error) => {
      console.error('Error completing registration:', error)
      toast({
        title: 'Error',
        description: 'Failed to complete registration. Please try again.',
        variant: 'destructive',
      })
    },
  })
}

// Register Hook
const registerAsync = async (payload: { email: string; password: string }) => {
  const response = await apiRegister(payload)
  return response
}

export const useRegister = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: registerAsync,
    onSuccess: () => {
      navigate('/complete-signup')
      toast({
        title: 'Registration Successful',
        description: 'You will be redirected to complete your signup.',
      })
    },
    onError: (error) => {
      console.error('Registration failed:', error)
      toast({
        title: 'Registration Error',
        description:
          error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      })
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
      if (data && data.access_token) {
        const { email } = payload
        sessionStorage.setItem('hasPassedLogin', 'true')
        cookies.set(SES_TOKEN_NAME, data.access_token, { path: '/' })
        client.defaults.headers.common['Authorization'] =
          `Bearer ${data.access_token}`

        sessionStorage.setItem('userEmail', email)

        setTimeout(() => {
          navigate('/two-factor-auth', {
            replace: true,
            state: { from: '/sign-in', email },
          })
          toast({
            title: 'Redirecting to Two-Factor Authentication',
            description: 'Please complete the verification to log in.',
          })
        }, 0)
      } else {
        // Handle case where access_token is not returned
        toast({
          title: 'Login Error',
          description: 'No access token returned. Please try again.',
          variant: 'destructive',
        })
      }
    },
    onError: (error) => {
      console.error('Login failed:', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.'
      toast({
        title: 'Login Error',
        description: errorMessage,
        variant: 'destructive',
      })
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
      sessionStorage.setItem('is2FAVerified', 'true')

      toast({
        title: 'Verification successful',
        description: 'You will be redirected shortly.',
      })

      // Redirect or reload to trigger dashboard loading
      window.location.reload()
    } else {
      handleFailedVerification()
    }
  }

  const handleFailedVerification = () => {
    setRetryCount((prevCount) => {
      const newCount = prevCount + 1

      if (newCount >= maxRetries) {
        toast({
          title: 'Too many attempts',
          description: 'You have been redirected to the sign-in page.',
          variant: 'destructive',
        })

        // Navigate back to the sign-in page upon exceeding max attempts
        navigate('/sign-in')
      } else {
        toast({
          title: 'Verification failed',
          description: `Invalid code. Please try again. Attempts left: ${
            maxRetries - newCount
          }`,
          variant: 'destructive',
        })
      }

      return newCount
    })
  }

  const handleVerificationError = (error: unknown) => {
    console.error('OTP verification failed:', error)
    toast({
      title: 'Verification failed',
      description: 'An error occurred during verification.',
      variant: 'destructive',
    })
  }

  return { ...mutation, retryCount }
}

// Sign Out Hook
export const useSignOut = () => {
  const navigate = useNavigate()

  const signOut = useCallback(() => {
    cookies.remove(SES_TOKEN_NAME, { path: '/' })
    delete client.defaults.headers.common['Authorization']
    sessionStorage.removeItem('hasPassedLogin')

    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    })

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
