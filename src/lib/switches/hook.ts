import { useQuery } from '@tanstack/react-query'
import {
  fetchProviderMessagingById,
  fetchProviderVerificationById,
  getProviders,
} from '.'
import { ProvidersResponse } from './type'

// Fetch providers
export const useProviders = () => {
  return useQuery<ProvidersResponse>({
    queryKey: ['providers'],
    queryFn: getProviders,
  })
}

export const useProviderVerificationById = (id: string) => {
  return useQuery({
    queryKey: ['providerVerification', id],
    queryFn: () => fetchProviderVerificationById(id),
    enabled: !!id, // Ensures the query runs only if `id` is available
  })
}

export const useProviderMessagingById = (id: string) => {
  return useQuery({
    queryKey: ['providerMessaging', id],
    queryFn: () => fetchProviderMessagingById(id),
    enabled: !!id, // Ensures the query runs only if `id` is available
  })
}
