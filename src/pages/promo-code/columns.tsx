import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button' // Assuming you have a button component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDots } from '@tabler/icons-react'
import { CodeResponse } from '@/lib/promo-code/type'
import { format } from 'date-fns'

// export type PromoCode = {
//   id: string
//   codeTitle: string
//   amountInNaira: number
//   status: string
//   dateCreated: string // formatted date (e.g., 'October 29, 2024')
//   expiryDate: string // formatted expiry date
// }

export const columns: ColumnDef<CodeResponse>[] = [
  {
    accessorKey: 'serialId',
    header: '#',
    cell: ({ row }) => <span className='font-geist-mono'>{row.index + 1}</span>, // Displaying the serial ID based on row index
  },
  {
    accessorKey: 'title',
    header: 'Code Title',
    cell: ({ row }) => <span>{row.original.title}</span>,
  },
  {
    accessorKey: 'amount',
    header: 'Amount (₦)',
    cell: ({ row }) => (
      <span className='font-geist-mono'>
        {parseFloat(row.original.amount).toLocaleString('en-NG', {
          style: 'currency',
          currency: 'NGN',
        })}
      </span>
    ),
  },
  {
    accessorKey: 'usage',
    header: 'Usage',
    cell: ({ row }) => (
      <span className='font-geist-mono'>{row.original.usage}</span>
    ),
  },
  // {
  //   accessorKey: 'expirationDate',
  //   header: 'Expiration Date',
  //   // cell: ({ row }) => (
  //   //   <span>{new Date(row.original.expirationDate).toLocaleDateString()}</span>
  //   // ),
  //   cell: ({ row }) => {
  //     const createdAt = row.original.expirationDate
  //     return (
  //       <span>
  //         {createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : 'N/A'}
  //       </span>
  //     )
  //   },
  // },
  {
    accessorKey: 'expirationDate',
    header: 'Expiration Date',
    cell: ({ row }) => {
      const expirationDate = row.original.expirationDate
      if (!expirationDate) return <span>N/A</span>

      // Format the date
      const formattedDate = format(new Date(expirationDate), 'MMM dd, yyyy')

      // Extract the day and year parts
      const [month, day, year] = formattedDate.split(' ')

      return (
        <span className='uppercase'>
          {month}{' '}
          <span className='font-geist-mono'>
            {day}
            {year}
          </span>
        </span>
      )
    },
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Created At',
  //   cell: ({ row }) => (
  //     <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
  //   ),
  // },
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
