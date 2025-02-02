import { IconCopy } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export type User = {
  id: string // Unique identifier
  accountName: string // Name of the account
  type: 'Deposit' | 'Withdrawal' | 'Card Deposit' // Type of transaction
  amount: string // Formatted amount (e.g., 'NGN 400,000')
  referenceId: string // Reference ID for the transaction
  date: string // Formatted date (e.g., 'October 29, 2024')
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => row.original.id,
    meta: {
      align: 'left', // Align left
    },
  },
  {
    accessorKey: 'accountName',
    header: 'Account Name',
    cell: ({ row }) => <div className=''>{row.original.accountName}</div>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div
        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
          row.original.type === 'Withdrawal'
            ? 'bg-red-100 text-red-700'
            : row.original.type === 'Deposit'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
        }`}
      >
        {row.original.type}
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <div className='font-medium'>{row.original.amount}</div>,
  },
  {
    accessorKey: 'referenceId',
    header: 'Reference ID',
    cell: ({ row }) => (
      <div className='inline-flex items-center gap-2 text-muted-foreground'>
        <span>{row.original.referenceId}</span>
        <button
          className='text-blue-500 hover:underline'
          onClick={() =>
            navigator.clipboard.writeText(row.original.referenceId)
          }
        >
          <IconCopy className='h-4 w-4' />
        </button>
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const originalDate = row.original.date
      const formattedDate = format(new Date(originalDate), 'dd MMM, yyyy')
      const formattedTime = format(new Date(originalDate), 'hh:mm ')

      return (
        <div className='flex flex-col items-center justify-center gap-1'>
          <span className='font-geist-mono'>{formattedDate}. </span>
          <span className='font-geist-mono text-left text-xs text-red-500'>
            {formattedTime}
          </span>
        </div>
      )
    },
  },
]
