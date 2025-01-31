import { Recents } from '@/lib/switches/type'
import { format } from 'date-fns'

interface RecentProps {
  recentMessages: Recents[]
}

export function RecentMessages({ recentMessages }: RecentProps) {
  return (
    <div className='space-y-6'>
      {recentMessages.map((message, index) => {
        const formattedDate = format(
          new Date(message.createdAt),
          "MMM dd, yyyy 'at' h:mm a"
        )

        return (
          <div
            key={index}
            className='flex items-center justify-between border-b border-gray-200 p-4'
          >
            {/* Message Content */}
            <div>
              <p className='text-sm font-medium text-gray-900'>
                {message.data}
              </p>
              <p className='text-xs text-gray-500'>{formattedDate}</p>
            </div>

            {/* Message Type Label */}
            <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase text-blue-600'>
              {message.type}
            </span>
          </div>
        )
      })}
    </div>
  )
}
