import { useQuery } from '@tanstack/react-query'
import { userDetails } from '.'

const fetchUsersAsync = async () => {
  const data = await userDetails()
  console.log(data)
  return data
}

export const useUsers = () => {
  return useQuery({
    queryFn: fetchUsersAsync,
    queryKey: ['users'],
  })
}
