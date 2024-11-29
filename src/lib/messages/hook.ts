import { useMutation, useQuery } from '@tanstack/react-query'
import { createMessage, fetchMessages } from '.'
import { CreateMessageRequest, MessageResponse } from './types'
import { handleSuccess } from '../auth/utilities/successHandler'
import { handleError } from '../auth/utilities/errorhandler'
import { toast } from '@/components/ui/use-toast'

const fetchMessagesAsync = async () => {
  const data = await fetchMessages()
  return data
}

export const useMessages = () => {
  return useQuery<MessageResponse>({
    queryKey: ['messages'],
    queryFn: fetchMessagesAsync,
    // onSuccess: (data) => {
    //   handleSuccess('Messages fetched successfully', `You have ${data.length} messages.`);
    // },
    // onError: (error) => {
    //   const errorMessage = error.message;
    //   toast({
    //     title: 'Error',
    //     description: 'Something went wrong. Please try again.',
    //     variant: 'destructive',
    //   });
    //   console.error(JSON.parse(errorMessage));
    // },
  })
}

const createMessageAsync = async (payload: CreateMessageRequest) => {
  const data = await createMessage(payload)
  return { data, payload }
}

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: createMessageAsync,
    onSuccess: ({ data }) => {
      if (data.success) {
        handleSuccess('Message created successfully', `Message ID: ${data.id}`)
      } else {
        handleError(null, 'Failed to create message. Please try again.')
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
