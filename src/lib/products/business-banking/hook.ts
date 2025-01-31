import { useQuery } from '@tanstack/react-query'
import { fetchBusinesses, fetchBusinessDetails } from './index'
import { BusinessDetailsResponse, BusinessesResponse } from './types'

const fetchBusinessesAsync = async (): Promise<BusinessesResponse> => {
  const data = await fetchBusinesses()
  return data
}

export const useBusinesses = () => {
  return useQuery<BusinessesResponse>({
    queryKey: ['businesses'],
    queryFn: fetchBusinessesAsync,
    // onSuccess: (data) => { handleSuccess(...); },
    // onError: (error) => { handleError(...); },
  })
}

const fetchBusinessDetailsAsync = async (
  businessId: string
): Promise<BusinessDetailsResponse> => {
  const data = await fetchBusinessDetails(businessId)
  return data
}
export const useBusinessDetails = (businessId: string) => {
  return useQuery<BusinessDetailsResponse>({
    queryKey: ['businessDetails', businessId],
    queryFn: () => fetchBusinessDetailsAsync(businessId),
    // onSuccess: (data) => { handleSuccess(...); },
    // onError: (error) => { handleError(...); },
  })
}
