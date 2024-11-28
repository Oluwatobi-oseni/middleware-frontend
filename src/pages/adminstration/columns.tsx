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
    cell: ({ row }) => {
      const roleStyles = {
        SUPER_ADMIN: 'bg-blue-100 text-blue-800 border border-blue-300',
        ADMIN: 'bg-green-100 text-green-800 border border-green-300',
        USER: 'bg-gray-100 text-gray-800 border border-gray-300',
      }
      const roleClass =
        roleStyles[row.original.role as keyof typeof roleStyles] ||
        'bg-gray-100 text-gray-600'

      return (
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm ${roleClass}`}
        >
          {row.original.role}
        </span>
      )
    },
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
