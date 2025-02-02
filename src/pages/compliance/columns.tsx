import { ColumnDef } from '@tanstack/react-table'
import { FlaggedTransaction } from './data'
import { format } from 'date-fns'

// Define the columns to be displayed in the table
export const columns: ColumnDef<FlaggedTransaction>[] = [
  {
    header: 'Customer ID',
    accessorKey: 'customer_id',
  },
  {
    header: 'Total Amount',
    accessorKey: 'total_amount',
    cell: ({ row }) =>
      `${row.getValue('total_amount')} ${row.getValue('currency')}`,
  },
  {
    header: 'Flagged On',
    accessorKey: 'flagged_on',
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string)
      return format(date, 'MMM dd, yyyy, HH:mm a')
    },
  },
  //   {
  //     header: 'Reference',
  //     accessorKey: 'reference',
  //   },
  {
    header: 'Transaction Reference',
    accessorKey: 'transactionReference',
  },
  //   {
  //     header: 'Reason',
  //     accessorKey: 'reason',
  //   },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => {
      const status = getValue() as string
      return (
        <span
          className={`rounded-full px-4 py-1 text-sm font-medium ${
            status === 'Flagged'
              ? 'border border-red-500 bg-red-100 text-red-700'
              : 'border border-green-500 bg-green-100 text-green-700'
          }`}
        >
          {status}
        </span>
      )
    },
  },
]
