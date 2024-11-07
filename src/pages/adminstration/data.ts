import { useUsers } from '@/lib/users/hook'

// Custom hook to fetch user data for the admin page
export const useAdminUserData = () => {
  const { data, error, isLoading } = useUsers()
  console.log(data)
  return { data, error, isLoading }
}
