// import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { userDetailsType } from '@/lib/users/types'
import AdminActionsMenu from '@/components/custom/admin-action-menu'
import { DeleteMemberDialog } from '../settings/team/options/delete-dialog'
import { format } from 'date-fns'
// import { IconCheck, IconClock } from '@tabler/icons-react'

export const columns: ColumnDef<userDetailsType>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const email = row.original.email
      const name = email
        .split('@')[0]
        .split('.')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
      return <span>{name}</span>
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  // {
  //   id: 'onboardingStatus',
  //   header: 'Onboarding Status',
  //   cell: ({ row }) => {
  //     const status = row.original.onboardingStatus || 'PENDING' // Default status
  //     const statusStyles = {
  //       ACTIVE: {
  //         className: 'bg-green-100 text-green-800 border border-green-300',
  //         icon: <IconCheck className='mr-1 inline-block h-4 w-4' />, // Check icon
  //       },
  //       PENDING: {
  //         className: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  //         icon: <IconClock className='mr-1 inline-block h-4 w-4' />, // Clock icon
  //       },
  //     }

  //     // Capitalize only the first character of the status
  //     const formattedStatus =
  //       status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()

  //     const { className, icon } = statusStyles[
  //       status as keyof typeof statusStyles
  //     ] || {
  //       className: 'bg-gray-100 text-gray-600',
  //       icon: null,
  //     }

  //     return (
  //       <span
  //         className={`flex items-center justify-center rounded-full px-1 py-1 text-xs font-bold capitalize shadow-sm ${className}`}
  //       >
  //         {icon}
  //         {formattedStatus}
  //       </span>
  //     )
  //   },
  // },

  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const roleStyles = {
        SUPER_ADMIN: 'bg-blue-100 text-blue-800 border border-blue-300',
        SENIOR: 'bg-green-100 text-green-800 border border-green-300',
        JUNIOR: 'bg-gray-100 text-gray-800 border border-gray-300',
      }

      const roleLabels = {
        SUPER_ADMIN: 'Super Admin',
        SENIOR: 'Senior',
        JUNIOR: 'Junior',
      }

      const rawRole = row.original.role || '' // Default to an empty string if role is not present
      const formattedRole =
        roleLabels[rawRole as keyof typeof roleLabels] || rawRole // Map to readable label or fallback to original

      const roleClass =
        roleStyles[rawRole as keyof typeof roleStyles] ||
        'bg-gray-100 text-gray-600'

      return (
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize shadow-sm ${roleClass}`}
        >
          {formattedRole}
        </span>
      )
    },
  },

  // {
  //   id: 'twoFactorAuth',
  //   header: '2FA Status',
  //   cell: ({ row }) => {
  //     const [is2FAEnabled, setIs2FAEnabled] = useState(true) // Default to ON
  //     const statusClass = is2FAEnabled
  //       ? 'bg-green-100 text-green-800 border border-green-300'
  //       : 'bg-red-100 text-red-800 border border-red-300'

  //     return (
  //       <button
  //         onClick={() => setIs2FAEnabled((prev) => !prev)}
  //         className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm ${statusClass}`}
  //       >
  //         {is2FAEnabled ? 'ON' : 'OFF'}
  //       </button>
  //     )
  //   },
  // },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      if (!createdAt) return <span>N/A</span>

      // Format the date
      const formattedDate = format(new Date(createdAt), 'MMM dd, yyyy')

      // Extract the day and year parts
      const [month, day, year] = formattedDate.split(' ')

      return (
        <span className='uppercase'>
          {month} <span className='font-geist-mono'>{day}</span> {year}
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
        SuspendDialogComponent={(props) => (
          <DeleteMemberDialog {...props} teamMember={row.original} />
        )}
      />
    ),
  },
]
