import { ColumnDef } from '@tanstack/react-table'

// Define the Business type
export type Business = {
  id: string
  name: string
  phoneNumber: string
  lastActive: string // ISO date format (e.g., '2023-10-21T14:48:00.000Z')
  dateJoined: string // ISO date format
}

// Define the columns for the Business type
export const businessColumns: ColumnDef<Business>[] = [
  {
    accessorKey: 'name',
    header: 'Business Name',
    cell: ({ row }) => {
      const { name } = row.original
      return <span>{name}</span> // Render the business name
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => row.original.phoneNumber,
  },
  {
    accessorKey: 'lastActive',
    header: 'Last Active',
    cell: ({ row }) =>
      new Date(row.original.lastActive).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'dateJoined',
    header: 'Date Joined',
    cell: ({ row }) =>
      new Date(row.original.dateJoined).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
  },
]
