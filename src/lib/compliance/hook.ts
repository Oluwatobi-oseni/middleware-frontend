import { useQuery } from '@tanstack/react-query'
import { FlaggedTransaction } from './types'
import { fetchFlaggedTransactions } from '.'

export const useFlaggedTransactions = () => {
  return useQuery<FlaggedTransaction[]>({
    queryKey: ['flaggedTransactions'],
    queryFn: fetchFlaggedTransactions,
  })
}
