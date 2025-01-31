import { Briefcase } from 'lucide-react'

interface ProfiledCustomer {
  rcNumber: string
  companyName: string
}

interface RecentProfiledCustomerProps {
  recentProfiledCustomers: ProfiledCustomer[]
}

export function RecentProfiledCustomer({
  recentProfiledCustomers,
}: RecentProfiledCustomerProps) {
  // Get the most recent 4 customers
  const recentFour = recentProfiledCustomers.slice(0, 4)

  return (
    <div className='space-y-8'>
      {recentFour.map((customer, index) => (
        <div key={index} className='flex items-center space-x-4'>
          {/* Icon or Initials */}
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/30 text-muted-foreground'>
            <Briefcase className='h-5 w-5' />
          </div>

          {/* Customer Details */}
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {customer.companyName}
            </p>
            <p className='text-xs text-muted-foreground'>
              RC Number: {customer.rcNumber}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
