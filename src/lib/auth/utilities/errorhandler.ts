import { toast } from '@/components/ui/use-toast'

export const handleError = (error: unknown, defaultMessage: string) => {
  console.error('Error occurred:', error)
  const errorMessage = error instanceof Error ? error.message : defaultMessage
  toast({
    title: 'Error',
    description: errorMessage,
    variant: 'destructive',
  })
}
