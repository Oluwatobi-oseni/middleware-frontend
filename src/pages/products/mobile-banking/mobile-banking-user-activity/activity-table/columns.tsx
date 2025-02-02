import { IconBell } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'

export type User = {
  id: string
  transactionName: string // The name of the transaction
  transactionDescription: string // Description of the transaction
  type: 'Debit' | 'Credit'
  paymentType: 'Withdrawal' | 'Convert'
  date: string // formatted date (e.g., 'October 29, 2024')
}

export const columns: ColumnDef<User>[] = [
  {
    // First column without a header for the transaction icon
    id: 'transaction',
    header: '',
    cell: () => (
      <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted p-2'>
        <IconBell className='text-xl text-muted-foreground' />
      </span>
    ),
    meta: {
      align: 'center', // Center the icon
    },
  },

  {
    // Second column for transaction details (transaction name and description)
    accessorKey: 'transactionName',
    header: '',
    cell: ({ row }) => (
      <div>
        <div className='font-semibold'>{row.original.transactionName}</div>
        <div className='text-sm text-gray-500'>
          {row.original.transactionDescription}
        </div>
      </div>
    ),
  },

  {
    // Third column for the transaction date
    accessorKey: 'date',
    header: '',
    cell: ({ row }) => row.original.date,
  },
]
