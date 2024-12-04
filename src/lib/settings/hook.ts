import { useQuery } from '@tanstack/react-query'
import { fetchUserDetails } from '.'

const fetchUserDetailsAsync = async (accessToken: string) => {
  const data = await fetchUserDetails(accessToken)
  return data
}

export const useFetchUserDetails = () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('Access token not found')
  }

  return useQuery({
    queryFn: () => fetchUserDetailsAsync(accessToken),
    queryKey: ['user', accessToken],
    enabled: !!accessToken,
  })
}
