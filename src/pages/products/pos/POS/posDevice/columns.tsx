import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IconDots } from '@tabler/icons-react'

export type PosDevice = {
  id: number
  posName: string
  deviceType: string
  serialNumber: string
  status: 'Activated' | 'Pending' | 'Deactivated'
  lastSynced: string // formatted date and time
  vendors: string
}

export const columns: ColumnDef<PosDevice>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: 'posName',
    header: 'POS Name',
    cell: ({ row }) => <span>{row.original.posName}</span>,
  },
  {
    accessorKey: 'vendors',
    header: 'Vendors',
    cell: ({ row }) => <span>{row.original.vendors}</span>,
  },
  {
    accessorKey: 'deviceType',
    header: 'Device Type',
    cell: ({ row }) => row.original.deviceType,
  },
  {
    accessorKey: 'serialNumber',
    header: 'POS Serial No',
    cell: ({ row }) => row.original.serialNumber,
  },
  {
    accessorKey: 'status',
    header: 'POS Status',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          row.original.status === 'Activated'
            ? 'border border-green-700 bg-green-100 text-green-700'
            : row.original.status === 'Pending'
              ? 'border border-yellow-700 bg-yellow-100 text-yellow-700'
              : 'border border-red-700 bg-red-100 text-red-700'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: 'lastSynced',
    header: 'Last Synced',
    cell: ({ row }) => {
      const date = new Date(row.original.lastSynced)
      return (
        <div>
          <span className='font-geist-mono'>
            {format(date, 'dd MMM, yyyy')}
          </span>
          <br />
          <span className='font-geist-mono text-xs text-red-500'>
            {format(date, 'hh:mm')}
          </span>
        </div>
      )
    },
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

const handleView = (id: number) => {
  console.log(`Viewing details for POS with ID: ${id}`)
}

const handleDeactivate = (id: number) => {
  alert(`Deactivating POS with ID: ${id}`)
}
