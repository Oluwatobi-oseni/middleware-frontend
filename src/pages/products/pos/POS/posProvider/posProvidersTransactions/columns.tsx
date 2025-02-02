import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { CheckCircle, XCircle, Smartphone } from 'lucide-react'

// Define the VendorTransaction type
export type VendorTransaction = {
  id: string
  merchantName: string
  status: 'Active' | 'Inactive'
  deviceType: 'Android' | 'Semi Android'
  posSerialNo: string
  lastSynced: string // ISO date format
}

// Define the columns for the VendorTransaction type
export const vendorTransactionColumns: ColumnDef<VendorTransaction>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => {
      return (
        <span
          className={`flex items-center justify-center rounded-full bg-gray-100 p-1.5 text-gray-600`}
          style={{ width: '24px', height: '24px' }}
        >
          {row.index + 1}
        </span>
      )
    },
  },
  {
    accessorKey: 'merchantName',
    header: 'Merchant Name',
    cell: ({ row }) => (
      <span className='font-semibold'>{row.original.merchantName}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original
      return (
        <div
          className={`flex w-fit items-center rounded-md border px-2 py-1 text-sm font-medium ${
            status === 'Active'
              ? 'border-green-800 bg-green-100 text-green-700'
              : 'border-red-800 bg-red-100 text-red-700'
          }`}
        >
          {status === 'Active' ? (
            <CheckCircle className='mr-2' size={16} />
          ) : (
            <XCircle className='mr-2' size={16} />
          )}
          <span>{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'deviceType',
    header: 'Device Type',
    cell: ({ row }) => {
      const { deviceType } = row.original
      return (
        <div className='flex items-center space-x-2'>
          <Smartphone size={16} className='text-blue-500' />
          <span className='capitalize'>{deviceType}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'posSerialNo',
    header: 'POS Serial No',
    cell: ({ row }) => (
      <span className='font-geist-mono'>{row.original.posSerialNo}</span>
    ),
  },
  {
    accessorKey: 'lastSynced',
    header: 'Last Synced',
    cell: ({ row }) => {
      const date = new Date(row.original.lastSynced)
      return (
        <div>
          <span className='font-geist-mono'>
            {format(date, 'dd MMM, yyyy')}
          </span>
          <br />
          <span className='font-geist-mono text-xs text-red-500'>
            {format(date, 'hh:mm a')}
          </span>
        </div>
      )
    },
  },
]
