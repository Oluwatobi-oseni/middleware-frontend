import { ColumnDef } from '@tanstack/react-table'

export type User = {
  id: string
  name: string
  type: 'Debit' | 'Credit'
  currency: string
  paymentType: 'Withdrawal' | 'Convert'
  time: string // e.g., '07:18:46 PM'
  amount: number // amount in Naira
  date: string // formatted date (e.g., 'October 29, 2024')
  status: 'Successful' | 'Failed'
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span>{row.original.name}</span>,
  },

  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => row.original.type,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => row.original.currency,
  },
  {
    accessorKey: 'paymentType',
    header: 'Payment Type',
    cell: ({ row }) => row.original.paymentType,
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ row }) => row.original.time,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) =>
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(row.original.amount),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.original.date,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          row.original.status === 'Successful'
            ? 'border border-green-700 bg-green-100 text-green-700'
            : 'border border-red-700 bg-red-100 text-red-700'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
]
