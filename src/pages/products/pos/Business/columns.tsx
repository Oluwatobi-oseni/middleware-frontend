import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IconDots } from '@tabler/icons-react'
import { BusinessResponse } from '@/lib/pos/type'
import { CircleCheck, Clock } from 'lucide-react'

// export type Business = {
//   id: string
//   businessName: string
//   ownersName: string
//   dateRegistered: string
//   posAssigned: number // number of POS assigned
//   kybStatus: 'Verified' | 'Pending' | 'Failed'
//   registeredPosTerminals: number
//   businessLocation: string
//   registrationNumber: string
//   industry: string
//   companySize: string
//   estimatedAnnualVolume: string
//   email: string
//   officeAddress: string
//   about: string
// }

export const columns: ColumnDef<BusinessResponse>[] = [
  {
    id: 'number',
    header: '#',
    cell: ({ row }) => <span>{row.index + 1}</span>,
    size: 50,
  },
  {
    accessorKey: 'businessName',
    header: 'Business Name',
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: 'ownersName',
    header: "Owner's Name",
    cell: ({ row }) => <span>{row.original.ownersName}</span>,
  },
  {
    accessorKey: 'dateRegistered',
    header: 'Date Registered',
    cell: ({ row }) => {
      const formattedDate = new Date(
        row.original.dateRegistered
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

      return <span className='font-geist-mono'>{formattedDate}</span>
    },
  },
  {
    accessorKey: 'posAssigned',
    header: 'No. of POS Assigned',
    cell: ({ row }) => (
      <span className='font-geist-mono'>{row.original.terminals}</span>
    ),
  },
  {
    accessorKey: 'kybStatus',
    header: 'KYB Status',
    cell: ({ row }) => (
      <span
        className={`mx-auto flex w-fit items-center rounded-full px-3 py-1  text-xs font-semibold ${
          row.original.kybStatus === true
            ? 'border border-green-700 bg-green-100 text-green-700'
            : row.original.kybStatus === false
              ? 'border border-yellow-700 bg-yellow-100 text-yellow-700'
              : 'border border-red-700 bg-red-100 text-red-700'
        }`}
      >
        {row.original.kybStatus === true ? (
          <>
            <CircleCheck className='mr-1' /> Verified
          </>
        ) : (
          <>
            <Clock className='mr-1' /> Pending
          </>
        )}
      </span>
    ),
  },

  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDots className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            className='text-muted-foreground'
            onClick={() => handleView(row.original.id)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive'
            onClick={() => handleDeactivate(row.original.id)}
          >
            Deactivate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const handleView = (id: string) => {
  console.log(`Viewing details for business with ID: ${id}`)
}

const handleDeactivate = (id: string) => {
  console.log(`Deactivating POS for business with ID: ${id}`)
}
