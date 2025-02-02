import { Business } from '@/lib/products/business-banking/types'
import { IconCheck, IconClock, IconUserCancel } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

// Define the Business type
// export type Business = {
//   id: string
//   name: string
//   phoneNumber: string
//   lastActive: string // ISO date format (e.g., '2023-10-21T14:48:00.000Z')
//   dateJoined: string // ISO date format
//   kybStatus: 'completed' | 'pending' | 'rejected'
// }

// Define the columns for the Business type
export const businessColumns: ColumnDef<Business>[] = [
  {
    accessorKey: 'name',
    header: 'Business Name',
    cell: ({ row }) => {
      const { businessName } = row.original
      return <span>{businessName}</span>
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => row.original.businessPhone,
  },
  {
    accessorKey: 'lastActive',
    header: 'Last Active',
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt)
      return format(date, 'MMM dd, yyyy').toUpperCase() // Format as "OCT 20, 2024"
    },
  },
  {
    accessorKey: 'dateJoined',
    header: 'Date Joined',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return format(date, 'MMM dd, yyyy').toUpperCase() // Format as "OCT 20, 2024"
    },
  },
  {
    accessorKey: 'kybStatus',
    header: 'KYB Status',
    cell: ({ row }) => {
      const kybStatus = row.original.addressVerificationStatus

      const getIcon = () => {
        switch (kybStatus) {
          case 'COMPLETED':
            return <IconCheck className='text-green-500' size={18} />
          case 'PENDING':
            return <IconClock className='text-yellow-500' size={18} />
          case 'REJECTED':
            return <IconUserCancel className='text-red-500' size={18} />
          default:
            return null
        }
      }

      const getStatusStyle = () => {
        switch (kybStatus) {
          case 'COMPLETED':
            return 'bg-green-100 text-green-700 border-green-500'
          case 'PENDING':
            return 'bg-yellow-100 text-yellow-700 border-yellow-500'
          case 'REJECTED':
            return 'bg-red-100 text-red-700 border-red-500'
          default:
            return 'bg-muted-foreground text-muted-foreground border-muted-foreground'
        }
      }

      return (
        <div className='flex justify-center'>
          <div
            className={`flex items-center gap-1 rounded-xl border px-2 py-0.5 ${getStatusStyle()} shadow-sm`}
            style={{ maxWidth: '120px' }}
          >
            <span className='rounded-full bg-muted/10 p-1'>{getIcon()}</span>
            <span className='font-medium capitalize'>{kybStatus}</span>
          </div>
        </div>
      )
    },
  },
]
