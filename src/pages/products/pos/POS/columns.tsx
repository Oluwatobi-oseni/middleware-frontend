import { ColumnDef } from '@tanstack/react-table'
// import { useState } from 'react'
// import { DeactivatePOSDialog } from './components/deactivatePOSDialog'

export type PosDevice = {
  id: number
  posName: string
  deviceType: string
  serialNumber: string
  status: 'Activated' | 'Pending' | 'Deactivated'
  lastSynced: string // formatted date and time
}

export const columns: ColumnDef<PosDevice>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: 'posName',
    header: 'POS Name',
    cell: ({ row }) => <span>{row.original.posName}</span>,
  },
  {
    accessorKey: 'deviceType',
    header: 'Device Type',
    cell: ({ row }) => row.original.deviceType,
  },
  {
    accessorKey: 'serialNumber',
    header: 'POS Serial No',
    cell: ({ row }) => row.original.serialNumber,
  },
  {
    accessorKey: 'status',
    header: 'POS Status',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          row.original.status === 'Activated'
            ? 'border border-green-700 bg-green-100 text-green-700'
            : row.original.status === 'Pending'
              ? 'border border-yellow-700 bg-yellow-100 text-yellow-700'
              : 'border border-red-700 bg-red-100 text-red-700'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: 'lastSynced',
    header: 'Last Synced',
    cell: ({ row }) => row.original.lastSynced,
  },
  {
    id: 'actions',
    header: '',
    // cell: ({ row }) => <ActionButtons posDevice={row.original} />,
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
          onClick={(e) => {
            e.stopPropagation()
            handleDeactivate(row.original.id)
          }}
        >
          Deactivate
        </button>
      </div>
    ),
  },
]
// const ActionButtons: React.FC<{ posDevice: PosDevice }> = ({ posDevice }) => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const handleDeactivate = () => {
//     console.log(`Deactivating POS with ID: ${posDevice.id}`)
//     setIsDialogOpen(false) // Close the dialog after action
//   }

//   const handleCancel = () => {
//     setIsDialogOpen(false) // Close the dialog without action
//   }

//   return (
//     <>
//       <button
//         className='rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-200'
//         onClick={() => handleView(posDevice.id)}
//       >
//         View
//       </button>
//       <button
//         className='rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-200'
//         onClick={() => setIsDialogOpen(true)}
//       >
//         Deactivate
//       </button>
//       {isDialogOpen && (
//         <DeactivatePOSDialog
//           onDeactivate={handleDeactivate}
//           onCancel={handleCancel}
//         />
//       )}
//     </>
//   )
// }

const handleView = (id: number) => {
  console.log(`Viewing details for POS with ID: ${id}`)
}

const handleDeactivate = (id: number) => {
  // ;<DeactivatePOSDialog onDeactivate={} onCancel={} />
  alert(id)
}
