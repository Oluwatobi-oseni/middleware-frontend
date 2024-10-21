import { ColumnDef } from '@tanstack/react-table'
// import { useApproveRequest } from './functions'
import {
  ArrowUpDown,
  CircleCheck,
  MoreHorizontal,
  Trash,
  UserRoundSearch,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export type CardRequestData = {
  id: number
  accountNumber: string
  branch?: string
  cco?: string
  card_scheme: string
  request_type: string
  charge: boolean
  preferred_name: string
  status: string
  created_at: string
  updated_at: string
  name: string
}

export const columns: ColumnDef<CardRequestData>[] = [
  {
    header: 'Sn',
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
  },
  {
    accessorKey: 'name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
  },
  {
    accessorKey: 'card_scheme',
    header: 'Scheme',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.card_scheme === 'afrigo' ? (
            <Badge className='bg-lime-600'>{request.card_scheme}</Badge>
          ) : (
            <Badge className='bg-red-400'>{request.card_scheme}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.status === 'pending' ? (
            <Badge>{request.status}</Badge>
          ) : (
            <Badge className='bg-green-600'>{request.status}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const request = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center gap-1'>
              {/* TODO: Use account number to find customer */}
              <UserRoundSearch className='w-4' /> View customer
            </DropdownMenuItem>
            {request.status === 'pending' && (
              <DropdownMenuItem className='flex items-center gap-1 text-red-600'>
                <Trash className='w-4' />
                Delete request
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const bmColumns: ColumnDef<CardRequestData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
  },
  {
    accessorKey: 'card_scheme',
    header: 'Scheme',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.card_scheme === 'afrigo' ? (
            <Badge className='bg-lime-600'>{request.card_scheme}</Badge>
          ) : (
            <Badge className='bg-red-400'>{request.card_scheme}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.status === 'pending' ? (
            <Badge>{request.status}</Badge>
          ) : (
            <Badge className='bg-green-600'>{request.status}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const request = row.original

      // const approveRequest = useApproveRequest()

      const approve = () => {
        // approveRequest.mutate({
        //   id: request.id,
        // })
        console.log('approved' + request.id)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center gap-1'>
              {/* TODO: Use account number to find customer */}
              <UserRoundSearch className='w-4' /> View customer
            </DropdownMenuItem>
            {request.status === 'pending' && (
              <DropdownMenuItem
                className='flex items-center gap-1 text-blue-600'
                onClick={approve}
              >
                <CircleCheck className='w-4' />
                Approve request
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const hopColumns: ColumnDef<CardRequestData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
  },
  {
    accessorKey: 'branch',
    header: 'Branch',
  },
  {
    accessorKey: 'card_scheme',
    header: 'Scheme',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.card_scheme === 'afrigo' ? (
            <Badge className='bg-lime-600'>{request.card_scheme}</Badge>
          ) : (
            <Badge className='bg-red-400'>{request.card_scheme}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.status === 'pending' ? (
            <Badge>{request.status}</Badge>
          ) : (
            <Badge className='bg-green-600'>{request.status}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const request = row.original

      // const approveRequest = useApproveRequest()

      const approve = () => {
        // approveRequest.mutate({
        //   id: request.id,
        // })
        console.log('approved' + request.id)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center gap-1'>
              {/* TODO: Use account number to find customer */}
              <UserRoundSearch className='w-4' /> View customer
            </DropdownMenuItem>
            {request.status === 'pending' && (
              <DropdownMenuItem
                className='flex items-center gap-1 text-blue-600'
                onClick={approve}
              >
                <CircleCheck className='w-4' />
                Approve request
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const adminColumns: ColumnDef<CardRequestData>[] = [
  {
    header: 'Sn',
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
  },
  {
    accessorKey: 'name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
  },
  {
    accessorKey: 'branch',
    header: 'Branch',
  },
  {
    accessorKey: 'card_scheme',
    header: 'Scheme',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.card_scheme === 'afrigo' ? (
            <Badge className='bg-lime-600'>{request.card_scheme}</Badge>
          ) : (
            <Badge className='bg-red-400'>{request.card_scheme}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const request = row.original

      return (
        <div>
          {request.status === 'pending' ? (
            <Badge>{request.status}</Badge>
          ) : (
            <Badge className='bg-green-600'>{request.status}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const request = row.original

      // const approveRequest = useApproveRequest()

      const approve = () => {
        // approveRequest.mutate({
        //   id: request.id,
        // })
        console.log('approved' + request.id)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center gap-1'>
              {/* TODO: Use account number to find customer */}
              <UserRoundSearch className='w-4' /> View customer
            </DropdownMenuItem>
            {request.status === 'pending' && (
              <DropdownMenuItem
                className='flex items-center gap-1 text-blue-600'
                onClick={approve}
              >
                <CircleCheck className='w-4' />
                Approve request
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
