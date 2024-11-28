import { ColumnDef } from '@tanstack/react-table'
// import { Button } from '@/components/ui/button'
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
// import * as Dialog from '@radix-ui/react-dialog'
// import { IconDots, IconDownload, IconEye } from '@tabler/icons-react'
// import { useState } from 'react'
import { ActionCell } from './components/action-cell'
import { format } from 'date-fns'

export type CustomerActivity = {
  id: string
  customerActivity: string
  date: string // Date with time included
}

// const dummyProvider = {
//   customerActivity: 'Dojah',
//   status: 'Active',
//   uptime: '99.22%',
//   customersVerified: '12,350',
//   pendingVerifications: '72',
//   lastSwitched: '10 Oct, 2024 14:10',
// }

// Separate component for actions and dialog
// const ActionCell = () => {
//   const [dialogType, setDialogType] = useState<'view' | 'export' | null>(null)

//   const handleOpenDialog = (type: 'view' | 'export') => {
//     setDialogType(type)
//   }

//   return (
//     <>
//       {/* Dropdown Menu */}
//       <DropdownMenu.Root>
//         <DropdownMenu.Trigger asChild>
//           <Button variant='ghost' className='h-8 w-8 p-0'>
//             <IconDots className='h-4 w-4' />
//           </Button>
//         </DropdownMenu.Trigger>
//         <DropdownMenu.Portal>
//           <DropdownMenu.Content
//             align='end'
//             className='min-w-[150px] rounded-md border bg-white p-1 shadow-md'
//           >
//             <DropdownMenu.Item
//               className='flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100'
//               onClick={() => handleOpenDialog('view')}
//             >
//               <IconEye className='mr-2 h-4 w-4 text-gray-500' />
//               View
//             </DropdownMenu.Item>
//             <DropdownMenu.Item
//               className='flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100'
//               onClick={() => handleOpenDialog('export')}
//             >
//               <IconDownload className='mr-2 h-4 w-4 text-gray-500' />
//               Export
//             </DropdownMenu.Item>
//           </DropdownMenu.Content>
//         </DropdownMenu.Portal>
//       </DropdownMenu.Root>

//       {/* Dialog */}
//       <Dialog.Root open={!!dialogType} onOpenChange={() => setDialogType(null)}>
//         <Dialog.Portal>
//           <Dialog.Overlay className='fixed inset-0 bg-black/50' />
//           <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg'>
//             <Dialog.Title className='text-lg font-semibold text-gray-800'>
//               {dialogType === 'view' ? 'Provider Details' : 'Export Data'}
//             </Dialog.Title>
//             {/* <Dialog.Description className='mt-2 text-sm text-gray-600'>
//               {dialogType === 'view'
//                 ? 'View detailed information about this provider.'
//                 : 'Export this data for further use.'}
//             </Dialog.Description> */}
//             <div className='mt-4'>
//               {dialogType === 'view' && (
//                 <div className='flex flex-col gap-4'>
//                   <div className='flex justify-between'>
//                     <span className='text-muted-foreground'>Provider Name</span>
//                     <span>{dummyProvider.customerActivity}</span>
//                   </div>
//                   <div className='flex justify-between'>
//                     <span className='text-muted-foreground'>Status</span>
//                     <span>{dummyProvider.status || 'Active'}</span>
//                   </div>
//                   <div className='flex justify-between'>
//                     <span className='text-muted-foreground'>Uptime</span>
//                     <span className='font-geist-mono'>
//                       {dummyProvider.uptime || '99.22%'}
//                     </span>
//                   </div>
//                   <div className='flex justify-between'>
//                     <span className='text-muted-foreground'>
//                       Customers Verified
//                     </span>
//                     <span className='font-geist-mono'>
//                       {dummyProvider.customersVerified || '12,350'}
//                     </span>
//                   </div>
//                   <div className='flex justify-between'>
//                     <span className='text-muted-foreground'>
//                       Pending Verifications
//                     </span>
//                     <span className='font-geist-mono'>
//                       {dummyProvider.pendingVerifications || '72'}
//                     </span>
//                   </div>
//                   <div className='flex justify-between'>
//                     <span className='text-muted-foreground'>Last Switched</span>
//                     <span className='font-geist-mono'>
//                       {dummyProvider.lastSwitched || '10 Oct, 2024 14:10'}
//                     </span>
//                   </div>
//                 </div>
//               )}
//               {dialogType === 'export' && (
//                 <p>Data export functionality will be implemented here.</p>
//               )}
//             </div>
//             <div className='mt-6 flex justify-end'>
//               <Button
//                 variant={'default'}
//                 className='w-full'
//                 onClick={() => setDialogType(null)}
//               >
//                 Cancel
//               </Button>
//               {dialogType === 'export' && (
//                 <Button variant={'default'} onClick={() => setDialogType(null)}>
//                   Export
//                 </Button>
//               )}
//             </div>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     </>
//   )
// }

// Define the columns
export const columns: ColumnDef<CustomerActivity>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: 'customerActivity',
    header: 'Customer Activity',
    cell: ({ row }) => <span>{row.original.customerActivity}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const originalDate = row.original.date
      const formattedDate = format(new Date(originalDate), 'dd MMM, yyyy')
      const formattedTime = format(new Date(originalDate), 'hh:mm ')

      return (
        <div>
          <span className='font-geist-mono'>{formattedDate}. </span>
          <span className='font-geist-mono text-xs text-red-500'>
            {formattedTime}
          </span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: () => <ActionCell />,
  },
]
