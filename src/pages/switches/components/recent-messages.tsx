import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Recents } from '@/lib/switches/type'

interface RecentProps {
  recentMessages: Recents[]
}

export function RecentMessages({ recentMessages }: RecentProps) {
  return (
    <div className='space-y-8'>
      {recentMessages.map((verification, index) => (
        <div key={index} className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src='/avatars/01.png' alt='Avatar' />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {verification.data}
            </p>
            <p className='text-sm text-muted-foreground'>
              Verified on{' '}
              {new Date(verification.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
