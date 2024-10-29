import { ColumnDef } from '@tanstack/react-table'

// Define the data type for the accounts
export type Account = {
  accountName: string
  accountType: string
  amount: number // Assuming amount is a number
  referenceId: string
  dateJoined: string // ISO date format
}

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: 'accountName',
    header: 'Account Name',
    cell: ({ row }) => {
      const { accountName } = row.original
      return <span>{accountName}</span> // Render account name
    },
  },
  {
    accessorKey: 'accountType',
    header: 'Account Type',
    cell: ({ row }) => {
      const { accountType } = row.original
      return <span>{accountType}</span> // Render account type
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const { amount } = row.original
      return <span>${amount.toLocaleString()}</span> // Format as currency
    },
  },
  {
    accessorKey: 'referenceId',
    header: 'Reference ID',
    cell: ({ row }) => {
      const referenceId = row.original.referenceId
      const handleCopy = () => {
        navigator.clipboard.writeText(referenceId)
        alert('Reference ID copied to clipboard!')
      }

      return (
        <button onClick={handleCopy} className='cursor-pointer underline'>
          {referenceId}
        </button>
      )
    },
  },
  {
    accessorKey: 'dateJoined',
    header: 'Date Joined',
    cell: ({ row }) => {
      const { dateJoined } = row.original
      return new Date(dateJoined).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
  },
]
