import { useQuery } from '@tanstack/react-query'
import {
  fetchProviderComplianceById,
  fetchProviderMessagingById,
  fetchProviderVerificationById,
  getProviders,
} from '.'
import { ProviderComplianceResponse, ProvidersResponse } from './type'

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
    enabled: !!id,
  })
}

export const useProviderMessagingById = (id: string) => {
  return useQuery({
    queryKey: ['providerMessaging', id],
    queryFn: () => fetchProviderMessagingById(id),
    enabled: !!id,
  })
}

export const useProviderComplianceById = (id: string) => {
  return useQuery<ProviderComplianceResponse>({
    queryKey: ['providerCompliance', id],
    queryFn: () => fetchProviderComplianceById(id),
    enabled: !!id,
  })
}
