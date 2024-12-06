import { useMutation, useQuery } from '@tanstack/react-query'
import { createPassword, inviteUser, otpAuth } from '.'
import { handleSuccess } from '../auth/utilities/successHandler'
import { handleError } from '../auth/utilities/errorhandler'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const inviteUserAsync = async (payload: { email: string; role: string }) => {
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
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    },
  })
}

const createPasswordAsync = async (payload: {
  firstname: string
  lastname: string
  dob: string
  phoneNumber: string
  password: string
}) => {
  const data = await createPassword(payload)
  return { data, payload }
}

export const useCreatePassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: createPasswordAsync,
    onSuccess: ({ data }) => {
      navigate('/complete-signup')
      if (data.email) {
        handleSuccess(
          'Password created successfully',
          'Proceed to complete sign up'
        )
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

const otpAuthAsync = async ({ token }: { token: string }) => {
  const data = await otpAuth({ token })
  return data
}

export const useOtpAuth = (token: string) => {
  return useQuery({
    queryFn: () => otpAuthAsync({ token }),
    queryKey: ['otpAuth'],
    // onSuccess: (data) => {
    //   if (data) {
    //     handleSuccess('OTP verified successfully', 'You are now logged in.')
    //   } else {
    //     handleError(null, 'OTP verification failed. Please try again.')
    //   }
    // },
    // onError: (error) => {
    //   const errorMessage = error.message
    //   toast({
    //     title: 'Error',
    //     description: 'Something went wrong. Please try again.',
    //     variant: 'destructive',
    //   })
    //   console.error(JSON.parse(errorMessage))
    // },
  })
}
