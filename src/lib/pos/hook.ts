import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchBusinesses, fetchBusinessById, createBusinessAccount } from '.'
import {
  BusinessResponse,
  BusinessDetailsResponse,
  CreateBusinessAccountRequest,
  //   CreateBusinessAccountResponse,
} from './type'
import { handleSuccess } from '../auth/utilities/successHandler'
import { handleError } from '../auth/utilities/errorhandler'
import { toast } from '@/components/ui/use-toast'

// Fetch businesses
export const useBusinesses = () => {
  return useQuery<BusinessResponse[]>({
    queryKey: ['businesses'],
    queryFn: fetchBusinesses,
  })
}

// Fetch business details
export const useBusinessById = (id: string) => {
  return useQuery<BusinessDetailsResponse>({
    queryKey: ['businessDetails', id],
    queryFn: () => fetchBusinessById(id),
  })
}

// Create business account
const createBusinessAccountAsync = async (
  payload: CreateBusinessAccountRequest
) => {
  const data = await createBusinessAccount(payload)
  return { data, payload }
}

export const useCreateBusinessAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBusinessAccountAsync,
    onSuccess: ({ data }) => {
      if (data.IsSuccessful) {
        handleSuccess(
          'Business account created successfully',
          'The new business account has been registered.'
        )
        queryClient.invalidateQueries({ queryKey: ['businesses'] })
      } else {
        handleError(
          null,
          'Failed to create the business account. Please try again.'
        )
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
