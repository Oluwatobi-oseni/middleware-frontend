import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

// Define the BusinessActivity type
export type BusinessActivity = {
  id: string
  timestamp: string // ISO date format (e.g., '2023-10-21T14:48:00.000Z')
  name: string
  event: string
  fullName: string
  email: string
  teamRole: string
  ipAddress: string
  device: string
  statusCode: string
  url: string
}

// Define the columns for the BusinessActivity type
export const columns: ColumnDef<BusinessActivity>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => {
      const date = new Date(row.original.timestamp)
      const formattedDate = format(date, 'MMM dd, yyyy')
      const formattedTime = format(date, 'HH:mm')

      return (
        <span className='font-geist-mono font-medium'>
          {formattedDate} at
          <span className='text-xs text-red-500'> {formattedTime}</span>
        </span>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: 'event',
    header: 'Event',
    cell: ({ row }) => <span>{row.original.event}</span>,
  },
]
