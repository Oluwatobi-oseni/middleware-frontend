import { ColumnDef } from '@tanstack/react-table'
import { RowLink } from './row-link'

export type User = {
  id: string
  name: string
  phoneNumber: string
  lastActive: string // ISO date format (e.g., '2023-10-21T14:48:00.000Z')
  dateJoined: string // ISO date format
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',

    cell: ({ row }) => {
      const { id, name } = row.original
      const path = `/products/users/${id}`

      return <RowLink path={path} name={name} />
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
