import { useMutation } from '@tanstack/react-query'
import { createPassword, inviteUser, otpAuth } from '.'
import { handleSuccess } from '../auth/utilities/successHandler'
import { handleError } from '../auth/utilities/errorhandler'
import { toast } from '@/components/ui/use-toast'

const inviteUserAsync = async (payload: { email: string; role: string }) => {
  console.log('Sending invite with payload:', payload)
  const data = await inviteUser(payload)
  return { data, payload }
}

export const useInviteUser = () => {
  return useMutation({
    mutationFn: inviteUserAsync,
    onSuccess: ({ data }) => {
      if (data) {
        handleSuccess('Invitation sent successfully', 'User has been invited.')
      } else {
        handleError(null, 'Invitation failed. Please try again.')
      }
    },
    onError: (error) => {
      const errorMessage = error.message

      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
      console.error(JSON.parse(errorMessage))
    },
  })
}

const createPasswordAsync = async (payload: {
  email: string
  password: string
}) => {
  const data = await createPassword(payload)
  return { data, payload }
}

export const useCreatePassword = () => {
  return useMutation({
    mutationFn: createPasswordAsync,
    onSuccess: ({ data }) => {
      if (data) {
        handleSuccess('Password created successfully', 'You can now log in.')
      } else {
        handleError(null, 'Password creation failed. Please try again.')
      }
    },
    onError: (error) => {
      const errorMessage = error.message
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
      console.error(JSON.parse(errorMessage))
    },
  })
}

const otpAuthAsync = async () => {
  const data = await otpAuth()
  return data
}

export const useOtpAuth = () => {
  return useMutation({
    mutationFn: otpAuthAsync,
    onSuccess: (data) => {
      if (data) {
        handleSuccess('OTP verified successfully', 'You are now logged in.')
      } else {
        handleError(null, 'OTP verification failed. Please try again.')
      }
    },
    onError: (error) => {
      const errorMessage = error.message
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
      console.error(JSON.parse(errorMessage))
    },
  })
}
