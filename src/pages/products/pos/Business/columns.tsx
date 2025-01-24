import { ColumnDef } from '@tanstack/react-table'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={(e) => e.stopPropagation()}
          >
            <span className='sr-only'>Open menu</span>
            <IconDots className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-40 p-0'>
          <div className='flex flex-col'>
            <Button
              variant='ghost'
              onClick={() => handleView(row.original.id)}
              className='justify-start px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100'
            >
              View
            </Button>
            <Button
              variant='ghost'
              onClick={() => handleDeactivate(row.original.id)}
              className='justify-start px-4 py-2 text-sm text-destructive hover:bg-red-100'
            >
              Deactivate
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
]

const handleView = (id: string) => {
  console.log(`Viewing details for business with ID: ${id}`)
}

const handleDeactivate = (id: string) => {
  console.log(`Deactivating POS for business with ID: ${id}`)
}
