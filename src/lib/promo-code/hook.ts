import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCode, fetchCodes } from '.'
import { handleSuccess } from '../auth/utilities/successHandler'
import { handleError } from '../auth/utilities/errorhandler'
import { toast } from '@/components/ui/use-toast'
import { CodeResponse, CreateCodeRequest } from './type'

const fetchCodesAsync = async (): Promise<CodeResponse[]> => {
  const data = await fetchCodes()
  return data
}

export const useCodes = () => {
  return useQuery<CodeResponse[]>({
    queryKey: ['codes'],
    queryFn: fetchCodesAsync,
    // onSuccess: (data) => { handleSuccess(...); },
    // onError: (error) => { handleError(...); },
  })
}

const createCodeAsync = async (payload: CreateCodeRequest) => {
  const data = await createCode(payload)
  return { data, payload }
}

export const useCreateCode = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCodeAsync,
    onSuccess: ({ data }) => {
      if (data.success) {
        handleSuccess(
          'Promo code created successfully',
          `'The new promo code has been created.`
        )
        queryClient.invalidateQueries({ queryKey: ['codes'] })
      } else {
        handleError(null, 'Failed to create promocode. Please try again.')
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
