import { ColumnDef } from '@tanstack/react-table'
// import { Button } from '@/components/custom/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { IconDots } from '@tabler/icons-react'

export type Transaction = {
  id: string
  name: string
  type: 'Deposit' | 'Withdraw' | 'Card deposit'
  amount: string
  reference: string
  dateJoined: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const { name } = row.original
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')

      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F8] text-[#111111]'>
            {initials}
          </div>
          <div style={{ marginLeft: '8px' }}>
            <div>{name}</div> {/* Renders the name */}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type
      const typeClass =
        type === 'Deposit'
          ? 'bg-green-100 text-green-800'
          : type === 'Withdraw'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'

      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${typeClass}`}
        >
          {type}
        </span>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `NGN ${row.original.amount.toLocaleString()}`, // Formats the amount as NGN currency
  },
  {
    accessorKey: 'reference',
    header: 'Reference',
    cell: ({ row }) => (
      <span className='text-gray-500'>{row.original.reference}</span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date Joined',
    cell: ({ row }) =>
      new Date(row.original.dateJoined).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }), // Formats as 10 October, 2024
  },
  //   {
  //     id: 'actions',
  //     cell: ({ row }) => {
  //       const transaction = row.original

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant='ghost' className='h-8 w-8 p-0'>
  //               <span className='sr-only'>Open menu</span>
  //               <IconDots className='h-4 w-4' />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align='end'>
  //             <DropdownMenuItem className='text-xs text-[#FF0000]'>
  //               Delete
  //             </DropdownMenuItem>
  //             <DropdownMenuItem className='text-xs text-[#215DE7]'>
  //               Edit
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       )
  //     },
  //   },
]
