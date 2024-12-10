import { useQuery } from '@tanstack/react-query'
import { fetchDesignations, userDetails } from '.'

const fetchUsersAsync = async () => {
  const data = await userDetails()
  return data
}

export const useUsers = () => {
  return useQuery({
    queryFn: fetchUsersAsync,
    queryKey: ['users'],
  })
}

const fetchDesignationsAsync = async () => {
  const data = await fetchDesignations()
  return data
}
export const useDesignations = () => {
  return useQuery({
    queryFn: fetchDesignationsAsync,
    queryKey: ['designations'],
  })
}
