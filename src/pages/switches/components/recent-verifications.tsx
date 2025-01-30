// Import phone icon
import { Recents } from '@/lib/switches/type'
import { Phone } from 'lucide-react'

interface RecentVerificationsProps {
  recentVerifications: Recents[]
}

// const getVerificationTypeStyle = (type: string) => {
//   switch (type) {
//     case 'PHONE':
//       return 'bg-blue-500 text-white' // Phone specific color
//     case 'CAC':
//       return 'bg-green-500 text-white' // CAC color
//     case 'BVN':
//       return 'bg-purple-500 text-white' // BVN color
//     default:
//       return 'bg-gray-500 text-white' // Default color
//   }
// }

export function RecentVerifications({
  recentVerifications,
}: RecentVerificationsProps) {
  // Get the most recent 5 verifications
  const recentFive = recentVerifications.slice(0, 4)

  return (
    <div className='space-y-8'>
      {recentFive.map((verification, index) => (
        <div key={index} className='flex items-center space-x-4'>
          {/* Conditionally render icon for PHONE type */}
          {verification.type === 'PHONE' ? (
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/30 text-muted-foreground'>
              <Phone />
            </div>
          ) : (
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted-foreground/30 font-semibold text-muted-foreground`}
            >
              {verification.type.slice(0, 3)}{' '}
              {/* Show first 3 letters of type */}
            </div>
          )}

          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {verification.data}
            </p>
            <p className='text-xs text-muted-foreground'>
              Verified on{' '}
              {new Date(verification.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
