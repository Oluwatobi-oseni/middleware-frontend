import { ColumnDef } from '@tanstack/react-table'

import { userDetailsType } from '@/lib/users/types'
import AdminActionsMenu from '@/components/custom/admin-action-menu'
import { DeleteMemberDialog } from '../settings/team/options/delete-dialog'
import { format } from 'date-fns'

export const columns: ColumnDef<userDetailsType>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span>
        {`${row.original.firstname || ''} ${row.original.lastname || ''}`.trim()}
      </span>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <span
        className={`rounded px-3 py-2 text-xs font-medium ${
          row.original.role === 'SUPER_ADMIN'
            ? 'bg-blue-200 text-blue-800'
            : 'bg-green-200 text-green-800'
        }`}
      >
        {row.original.role}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return (
        <span>
          {createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : 'N/A'}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <AdminActionsMenu
        row={row.original}
        onEdit={() => {}}
        DeleteDialogComponent={(props) => (
          <DeleteMemberDialog {...props} teamMember={row.original} />
        )}
      />
    ),
  },
]
