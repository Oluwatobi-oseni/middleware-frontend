import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDots, IconEye, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'

export type CustomerActivity = {
  id: string
  customerActivity: string
  date: string // Date with time included
}

export const columns: ColumnDef<CustomerActivity>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: 'customerActivity',
    header: 'Customer Activity',
    cell: ({ row }) => <span>{row.original.customerActivity}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const originalDate = row.original.date
      const formattedDate = format(new Date(originalDate), 'dd MMM, yyyy')
      const formattedTime = format(new Date(originalDate), 'hh:mm ')

      return (
        <div>
          <span className='font-geist-mono'>{formattedDate}. </span>
          <span className='font-geist-mono text-xs text-red-500'>
            {formattedTime}
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
          <DropdownMenuItem onClick={() => handleView(row.original.id)}>
            <IconEye className='mr-2 h-4 w-4' />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive'
            onClick={() => handleDelete(row.original.id)}
          >
            <IconTrash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const handleView = (id: string) => {
  console.log('View activity:', id)
}

const handleDelete = (id: string) => {
  console.log('Delete activity:', id)
}
