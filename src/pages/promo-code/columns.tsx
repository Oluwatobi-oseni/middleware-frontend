import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button' // Assuming you have a button component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDots } from '@tabler/icons-react'

export type PromoCode = {
  id: string
  codeTitle: string
  amountInNaira: number
  status: string
  dateCreated: string // formatted date (e.g., 'October 29, 2024')
  expiryDate: string // formatted expiry date
}

export const columns: ColumnDef<PromoCode>[] = [
  {
    accessorKey: 'codeTitle',
    header: 'Code Title',
    cell: ({ row }) => <span>{row.original.codeTitle}</span>,
  },
  {
    accessorKey: 'amountInNaira',
    header: 'Amount (₦)',
    cell: ({ row }) => (
      <span>
        {row.original.amountInNaira.toLocaleString('en-NG', {
          style: 'currency',
          currency: 'NGN',
        })}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.original.status.toLowerCase() === 'active'
      return (
        <span
          className={`rounded px-2 py-1 text-sm font-medium ${
            isActive
              ? 'border border-green-500 bg-green-100 text-green-700'
              : 'border border-red-500 bg-red-100 text-red-700'
          }`}
        >
          {row.original.status}
        </span>
      )
    },
  },
  {
    accessorKey: 'dateCreated',
    header: 'Date Created',
    cell: ({ row }) => <span>{row.original.dateCreated}</span>,
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => <span>{row.original.expiryDate}</span>,
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
            onClick={() => handleDisable(row.original.id)}
          >
            Disable Code
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive'
            onClick={() => handleDelete(row.original.id)}
          >
            Delete Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// Handlers (defined in the main component or imported)
const handleDelete = (id: string) => {
  console.log('Delete promo code:', id)
}

const handleDisable = (id: string) => {
  console.log('Disable promo code:', id)
}
