import { ColumnDef } from '@tanstack/react-table'

export type Business = {
  id: string
  businessName: string
  ownersName: string
  dateRegistered: string
  posAssigned: number // number of POS assigned
  kybStatus: 'Verified' | 'Pending' | 'Failed'
}

export const columns: ColumnDef<Business>[] = [
  {
    accessorKey: 'businessName',
    header: 'Business Name',
    cell: ({ row }) => <span>{row.original.businessName}</span>,
  },
  {
    accessorKey: 'ownersName',
    header: "Owner's Name",
    cell: ({ row }) => <span>{row.original.ownersName}</span>,
  },
  {
    accessorKey: 'dateRegistered',
    header: 'Date Registered',
    cell: ({ row }) => (
      <span className='font-geist-mono'>{row.original.dateRegistered}</span>
    ),
  },
  {
    accessorKey: 'posAssigned',
    header: 'No. of POS Assigned',
    cell: ({ row }) => (
      <span className='font-geist-mono'>{row.original.posAssigned}</span>
    ),
  },
  {
    accessorKey: 'kybStatus',
    header: 'KYB Status',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          row.original.kybStatus === 'Verified'
            ? 'border border-green-700 bg-green-100 text-green-700'
            : row.original.kybStatus === 'Pending'
              ? 'border border-yellow-700 bg-yellow-100 text-yellow-700'
              : 'border border-red-700 bg-red-100 text-red-700'
        }`}
      >
        {row.original.kybStatus}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <button
          className='rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-200'
          onClick={() => handleView(row.original.id)}
        >
          View
        </button>
        <button
          className='rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-200'
          onClick={() => handleDeactivate(row.original.id)}
        >
          Deactivate
        </button>
      </div>
    ),
  },
]

const handleView = (id: string) => {
  console.log(`Viewing details for business with ID: ${id}`)
}

const handleDeactivate = (id: string) => {
  console.log(`Deactivating POS for business with ID: ${id}`)
}
