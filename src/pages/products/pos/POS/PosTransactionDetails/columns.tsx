import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUp, ArrowDown, CheckCircle, XCircle } from 'lucide-react'

// Define the Transaction type
export type Transaction = {
  id: string
  accountName: string
  accountNumber: string
  type: 'Successful' | 'Failed'
  activity: string
  amount: number
  paymentMethod: string
  date: string // ISO date format
}

// Define the columns for the Transaction type
export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => {
      const { amount } = row.original
      return (
        <span
          className={`flex items-center justify-center rounded-full p-1.5 ${
            amount > 0
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
          style={{ width: '24px', height: '24px' }}
        >
          {amount > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        </span>
      )
    },
  },
  {
    accessorKey: 'accountName',
    header: 'Account Name',
    cell: ({ row }) => (
      <div>
        <div className='font-semibold'>{row.original.accountName}</div>
        <div className='font-geist-mono text-sm'>
          {row.original.accountNumber.replace(/^(\d{7})/, '*******')}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const { type } = row.original
      return (
        <div
          className={`flex w-fit items-center rounded-md border px-2 py-1 text-sm font-medium ${
            type === 'Successful'
              ? 'border-green-800 bg-green-100 text-green-700'
              : 'border-red-800 bg-red-100 text-red-700'
          }`}
        >
          {type === 'Successful' ? (
            <CheckCircle className='mr-2' size={16} />
          ) : (
            <XCircle className='mr-2' size={16} />
          )}
          <span>{type}</span>
        </div>
      )
    },
  },

  {
    accessorKey: 'activity',
    header: 'Activity',
    cell: ({ row }) => <span>{row.original.activity}</span>,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const { amount } = row.original
      return (
        <span
          className={`font-geist-mono  ${amount < 0 ? 'text-red-600' : ''}`}
        >
          {amount.toLocaleString()}
        </span>
      )
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => <span>{row.original.paymentMethod}</span>,
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
          <span className='font-geist-mono text-xs text-red-500'>
            {format(date, 'hh:mm')}
          </span>
        </div>
      )
    },
  },
]
