import { toast } from '@/components/ui/use-toast'

export const handleSuccess = (title: string, description: string) => {
  toast({
    title,
    description,
  })
}
