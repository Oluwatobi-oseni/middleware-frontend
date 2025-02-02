import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export type PosTransaction = {
  id: number
  provider: 'Alert POS' | 'ErrandPay' | 'Grupp' | 'PayCliq'
  narration: string
  type: 'Virtual Account' | 'Card'
  amount: number
  transactionId: string
  date: string // ISO format date
}

export const columns: ColumnDef<PosTransaction>[] = [
  {
    accessorKey: 'provider',
    header: 'Provider Name',
    cell: ({ row }) => <span>{row.original.provider}</span>,
  },
  {
    accessorKey: 'narration',
    header: 'Narration',
    cell: ({ row }) => <span>{row.original.narration}</span>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          row.original.type === 'Virtual Account'
            ? 'border border-blue-700 bg-blue-100 text-blue-700'
            : 'border border-purple-700 bg-purple-100 text-purple-700'
        }`}
      >
        {row.original.type}
      </span>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className='font-semibold'>
        ₦{row.original.amount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => <span>{row.original.transactionId}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      return (
        <div>
          <span className='font-geist-mono'>
            {format(date, 'dd MMM, yyyy')}
          </span>
          <br />
          <span className='font-geist-mono text-xs text-muted-foreground text-red-500'>
            {format(date, 'hh:mm a')}
          </span>
        </div>
      )
    },
  },
  // {
  //   id: 'actions',
  //   header: '',
  //   cell: ({ row }) => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant='ghost' className='h-8 w-8 p-0'>
  //           <span className='sr-only'>Open menu</span>
  //           <IconDots className='h-4 w-4' />
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align='end'>
  //         <DropdownMenuItem
  //           className='text-muted-foreground'
  //           onClick={() => handleView(row.original.transactionId)}
  //         >
  //           View Details
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   ),
  // },
]

// const handleView = (transactionId: string) => {
//   console.log(`Viewing details for Transaction ID: ${transactionId}`)
// }
