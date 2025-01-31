import { Recents } from '@/lib/switches/type'
import { Phone } from 'lucide-react'
import { format } from 'date-fns'

interface RecentVerificationsProps {
  recentVerifications: Recents[]
}

// Define colors for different verification types
const getVerificationTypeStyle = (type: string) => {
  switch (type) {
    case 'PHONE':
      return 'bg-blue-100 text-blue-700' // Phone color
    case 'CAC':
      return 'bg-green-100 text-green-700' // CAC color
    case 'BVN':
      return 'bg-purple-100 text-purple-700' // BVN color
    default:
      return 'bg-gray-100 text-gray-700' // Default color
  }
}

export function RecentVerifications({
  recentVerifications,
}: RecentVerificationsProps) {
  // Get the most recent 4 verifications
  const recentFour = recentVerifications.slice(0, 4)

  return (
    <div className='space-y-6'>
      {recentFour.map((verification, index) => {
        const formattedDate = format(
          new Date(verification.createdAt),
          "MMM dd, yyyy 'at' h:mm a"
        )

        return (
          <div
            key={index}
            className='flex items-center justify-between border-b border-muted p-4'
          >
            {/* Left Section: Icon & Data */}
            <div className='flex items-center space-x-4'>
              {/* Conditionally render icon for PHONE type */}
              {verification.type === 'PHONE' ? (
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/30 text-muted-foreground'>
                  <Phone />
                </div>
              ) : (
                <span
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase ${getVerificationTypeStyle(verification.type)}`}
                >
                  {verification.type}
                </span>
              )}

              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  {verification.data}
                </p>
                <p className='text-xs text-muted-foreground/50'>
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
