import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDots } from '@tabler/icons-react'
import { DeleteMemberDialog } from './options/delete-dialog'
import { useState } from 'react'

import { Team } from './types'
const ActionsCell = ({ row }: { row: { original: Team } }) => {
  const team = row.original
  console.log(team)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <IconDots className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
        {/* <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(team.id)}
        >
          Copy payment ID
        </DropdownMenuItem> */}
        <DropdownMenuItem className='text-[#215DE7]'>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setDeleteDialogOpen(true)}
          className='text-red-500'
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <DeleteMemberDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: 'accountName',
    header: 'Account Name',
    filterFn: (row, filterValue) => {
      // Cast row.original to Team to access account safely
      const accountName = row.original.accountName
      return accountName.toLowerCase().includes(filterValue.toLowerCase())
    },
    cell: ({ row }) => {
      const { accountName, email } = row.original
      const initials = accountName
        .split(' ')
        .map((n) => n[0])
        .join('')

      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F8] text-[#111111]'>
            {initials}
          </div>
          <div style={{ marginLeft: '8px' }}>
            <div>{accountName}</div> {/* Renders the name */}
            <div style={{ color: 'gray', fontSize: '12px' }}>{email}</div>{' '}
            {/* Renders the email */}
          </div>
        </div>
      )
    },
  },
  //   {
  //     accessorKey: 'account.mail',
  //     header: 'Email',
  //   },
  {
    accessorKey: 'role',
    header: 'Team Role',
  },
  {
    accessorKey: 'twoFactorAuthEnabled',
    header: '2FA Status',
    cell: ({ row }) => {
      const twoFactorStatus = row.original.twoFactorAuthEnabled ? 'ON' : 'OFF'
      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            twoFactorStatus === 'ON'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {twoFactorStatus}
        </span>
      )
    },
  },
  {
    accessorKey: 'dateJoined',
    header: 'Date Joined',
    cell: ({ row }) =>
      new Date(row.original.dateJoined).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }), // Formats as 11 October, 2024
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
    //   {
    //   const team = row.original
    //   console.log(team)
    //   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant='ghost' className='h-8 w-8 p-0'>
    //           <span className='sr-only'>Open menu</span>
    //           <IconDots className='h-4 w-4' />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align='end'>
    //         {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
    //         {/* <DropdownMenuItem
    //           onClick={() => navigator.clipboard.writeText(team.id)}
    //         >
    //           Copy payment ID
    //         </DropdownMenuItem> */}
    //         <DropdownMenuItem className='text-xs text-[#215DE7]'>
    //           Edit
    //         </DropdownMenuItem>
    //         <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
    //           Delete
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>

    //       <DeleteMemberDialog
    //         isOpen={isDeleteDialogOpen}
    //         onClose={() => setDeleteDialogOpen(false)}
    //       />
    //     </DropdownMenu>
    //   )
    // },
  },
]
