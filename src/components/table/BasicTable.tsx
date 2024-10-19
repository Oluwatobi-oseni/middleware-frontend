import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import { IconViewfinder, IconSearch } from '@tabler/icons-react'

import { Button } from '@/components/custom/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MemberDialog } from '@/pages/settings/team/MemberModal'

type AccountName = {
  name: string
  email: string
}

type UserData = {
  id: number
  accountName: AccountName
  teamRole: string
  twoFactorStatus: string
  dateJoined: string
}

const userData: UserData[] = [
  {
    id: 1,
    accountName: {
      name: 'OluwaTobi Oseni',
      email: 'OluwaTobioseni@alertgroup.com.ng',
    },
    teamRole: 'Team Manager',
    twoFactorStatus: 'ON',
    dateJoined: '11 October, 2024',
  },
  {
    id: 2,
    accountName: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
    teamRole: 'Developer',
    twoFactorStatus: 'OFF',
    dateJoined: '25 September, 2024',
  },
  {
    id: 3,
    accountName: {
      name: 'John Smith',
      email: 'john.smith@example.com',
    },
    teamRole: 'Designer',
    twoFactorStatus: 'ON',
    dateJoined: '5 August, 2024',
  },
]

export default function BasicTable() {
  const data = useMemo(() => userData, [])

  const columns: ColumnDef<UserData>[] = useMemo(
    () => [
      {
        accessorKey: 'accountName',
        header: 'ACCOUNT NAME',
        id: 'accountName',
        cell: ({ row }) => {
          const accountName = row.getValue('accountName') as AccountName // Type assertion here
          return (
            <div className='flex items-center'>
              <div className='h-10 w-10 flex-shrink-0'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-blue-500 font-semibold text-white'>
                  {accountName.name.charAt(0)}
                </div>
              </div>
              <div className='ml-4 overflow-hidden'>
                <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold'>
                  {accountName.name}
                </div>
                <div className='text-xs text-gray-400'>{accountName.email}</div>
              </div>
            </div>
          )
        },
        filterFn: 'includesString',
      },
      {
        header: 'TEAM ROLE',
        accessorKey: 'teamRole',
        id: 'teamRole',
        cell: ({ getValue }) => (
          <span className='text-[13px] font-medium'>
            {getValue() as string}
          </span> // Type assertion here
        ),
      },
      {
        header: '2FA STATUS',
        accessorKey: 'twoFactorStatus',
        id: 'twoFactorStatus',
        cell: ({ getValue }) => (
          <span
            className={`flex justify-center rounded-full px-2 text-xs font-semibold leading-5 ${
              getValue() === 'ON'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {getValue() as string}
          </span>
        ),
      },
      {
        header: 'DATE JOINED',
        accessorKey: 'dateJoined',
        id: 'dateJoined',
        cell: ({ getValue }) => (
          <span className='flex justify-center text-[13px] font-medium'>
            {getValue() as string}
          </span>
        ),
      },
      {
        header: '',
        id: 'actions',
        cell: () => (
          <div className='flex items-center justify-center space-x-6'>
            <button className='text-[10px] font-semibold text-red-600 hover:text-red-400'>
              Delete
            </button>
            <button className='text-[10px] font-semibold text-indigo-600 hover:text-indigo-400'>
              Edit
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const [filtering, setFiltering] = useState('')

  function isAccountName(object: unknown): object is AccountName {
    return (
      object !== null &&
      typeof object === 'object' &&
      'name' in object &&
      'email' in object
    )
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId)
      // Custom filtering logic to handle nested `accountName` object
      if (columnId === 'accountName' && isAccountName(cellValue)) {
        return (
          cellValue.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          cellValue.email.toLowerCase().includes(filterValue.toLowerCase())
        )
      }
      return String(cellValue).toLowerCase().includes(filterValue.toLowerCase())
    },
    onGlobalFilterChange: setFiltering,
  })

  return (
    <div className='mt-6 w-full rounded-lg border border-gray-300 bg-white p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' className='flex gap-1 font-[Geist] text-xs'>
            <IconViewfinder className='h-4 w-4' />
            <span>Manage Roles</span>
          </Button>
          <MemberDialog />
        </div>
        <div className='mb-4 flex items-center rounded-lg border border-gray-300 p-2'>
          <IconSearch className='mr-2 text-gray-500' />
          <input
            type='text'
            placeholder='Search Team'
            className='w-full border-none text-sm outline-none focus:ring-0'
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
      </div>

      <Table className='w-full'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`px-2 py-3 text-[10px] font-medium uppercase text-[#707070] ${
                    header.id !== 'accountName' && header.id !== 'teamRole'
                      ? 'text-center'
                      : ''
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='px-2 py-6'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className='h-full'>
              <TableCell
                className='h-full bg-gray-100 p-4 text-center'
                colSpan={columns.length}
              >
                <div className='flex h-full w-full flex-col items-center justify-center p-8'>
                  <p>No data was found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
