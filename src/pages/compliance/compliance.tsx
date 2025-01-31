// import { Separator } from '@/components/ui/separator'
// // import { NewMessageDialog } from './message-dialog'
// import { IconMessages } from '@tabler/icons-react'
// // import { DataTable } from '@/components/table/data-table'
// // import { columns } from './columns'
// // import { useMessageData } from './data'
// // import { MessageResponse } from '@/lib/messages/types'

// const Compliance = () => {
//   //   const { data, error, isLoading } = useMessageData()

//   //   const sortedData = data
//   //     ? data.sort((a: MessageResponse, b: MessageResponse) => {
//   //         const dateA = new Date(a.createdAt)
//   //         const dateB = new Date(b.createdAt)
//   //         return dateB.getTime() - dateA.getTime()
//   //       })
//   //     : []

//   //   // Check if messages exist
//   //   const hasMessages = data && data.length > 0
//   const hasMessages = false
//   const isLoading = false
//   const error = false

//   return (
//     <>
//       <div>
//         <p className='text-muted-foreground'>Transaction Monitoring</p>
//       </div>
//       <div className='my-4 flex justify-end'>{/* <NewMessageDialog /> */}</div>
//       <Separator className='shadow' />

//       {isLoading ? (
//         <div className='flex flex-grow flex-col items-center justify-center text-center'>
//           <p className='text-xl font-semibold'>Loading messages...</p>
//         </div>
//       ) : error ? (
//         <div className='flex flex-grow flex-col items-center justify-center text-center'>
//           <p className='text-xl font-semibold'>Failed to load messages</p>
//           <p className='text-muted-foreground'>Please try again later.</p>
//         </div>
//       ) : hasMessages ? (
//         // <DataTable
//         //   columns={columns}
//         //   data={sortedData}
//         //   inputPlaceHolder='Search Messages'
//         //   filterColumn='channel'
//         //   showButton
//         //   buttonText='Search'
//         //   showDateRangePicker={false}
//         // />
//         <div>Cold</div>
//       ) : (
//         <div className='flex flex-grow flex-col items-center justify-center text-center'>
//           <IconMessages size={80} className='mb-4 text-muted-foreground' />
//           <p className='text-xl font-semibold'>No compliance report yet</p>
//           <p className='text-muted-foreground'>
//             Compliance reports will appear here.
//           </p>
//         </div>
//       )}
//     </>
//   )
// }

// export default Compliance

import { Separator } from '@/components/ui/separator'
// import { useFlaggedTransactions } from '@/lib/compliance/hook'
import { IconMessages } from '@tabler/icons-react'
import { columns } from './columns'
import { DataTable } from '@/components/table/data-table'
import { FlaggedTransaction, flaggedTransactionsData } from './data'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { format } from 'date-fns'
// import { format } from 'date-fns'

// const Compliance = () => {
//   // Fetch flagged transactions
//   // const {
//   //   data: flaggedTransactions,
//   //   error,
//   //   isLoading,
//   // } = useFlaggedTransactions()

//   // Sort flagged transactions by date (newest first)
//   // const sortedTransactions = flaggedTransactions
//   //   ? [...flaggedTransactions].sort(
//   //       (a, b) =>
//   //         new Date(b.flagged_on).getTime() - new Date(a.flagged_on).getTime()
//   //     )
//   //   : []

//   // Determine if there are any flagged transactions
//   // const hasTransactions = sortedTransactions.length > 0

//   return (
//     <div className='space-y-6'>
//       {/* Header */}
//       <div>
//         <p className='text-lg font-semibold text-muted-foreground'>
//           Transaction Monitoring
//         </p>
//       </div>
//       {/* Separator */}
//       <Separator className='shadow' />
//       {/* Loading State */}
//       {/* {isLoading ? (
//         <div className='flex flex-grow flex-col items-center justify-center py-10 text-center'>
//           <p className='text-lg font-semibold'>Loading compliance reports...</p>
//         </div>
//       ) : error ? (
//         // Error State
//         <div className='flex flex-grow flex-col items-center justify-center py-10 text-center'>
//           <p className='text-lg font-semibold text-red-500'>
//             Failed to load compliance reports
//           </p>
//           <p className='text-sm text-muted-foreground'>
//             Please try again later.
//           </p>
//         </div>
//       ) : hasTransactions ? ( */}
//       // Data Table - Show flagged transactions
//       <div className='space-y-4'>
//         <DataTable
//           columns={columns}
//           data={flaggedTransactionsData}
//           inputPlaceHolder='Search Transactions'
//           filterColumn='reason'
//           showButton
//           buttonText='Search'
//           showDateRangePicker={false}
//         />
//       </div>
//       ) : ( // No Transactions State
//       <div className='flex flex-grow flex-col items-center justify-center py-10 text-center'>
//         <IconMessages size={80} className='mb-4 text-muted-foreground' />
//         <p className='text-lg font-semibold'>No compliance reports yet</p>
//         <p className='text-sm text-muted-foreground'>
//           Compliance reports will appear here once transactions are flagged.
//         </p>
//       </div>
//       )
//     </div>
//   )
// }

// export default Compliance

const Compliance = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<FlaggedTransaction | null>(null) // State to hold the selected transaction
  const [isDialogOpen, setIsDialogOpen] = useState(false) // State to manage dialog visibility

  const handleRowClick = (transaction: FlaggedTransaction) => {
    setSelectedTransaction(transaction) // Set the selected transaction data
    setIsDialogOpen(true) // Open the dialog
  }

  const closeDialog = () => {
    setIsDialogOpen(false) // Close the dialog
    setSelectedTransaction(null) // Clear the selected transaction
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <p className='text-lg font-semibold text-muted-foreground'>
          Transaction Monitoring
        </p>
      </div>
      {/* Separator */}
      <Separator className='shadow' />
      {/* Data Table - Show flagged transactions */}
      <div className='space-y-4'>
        <DataTable
          columns={columns}
          data={flaggedTransactionsData}
          inputPlaceHolder='Search'
          filterColumn='customer_id'
          showButton={false}
          buttonText='Search'
          showDateRangePicker={false}
          onRowClick={handleRowClick} // Attach the click handler to rows
        />
      </div>

      {/* No Transactions State */}
      {flaggedTransactionsData.length === 0 && (
        <div className='flex flex-grow flex-col items-center justify-center py-10 text-center'>
          <IconMessages size={80} className='mb-4 text-muted-foreground' />
          <p className='text-lg font-semibold'>No compliance reports yet</p>
          <p className='text-sm text-muted-foreground'>
            Compliance reports will appear here once transactions are flagged.
          </p>
        </div>
      )}

      {/* Dialog for displaying selected transaction details */}
      {selectedTransaction && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <DialogTrigger asChild>
          <Badge>View Transaction</Badge>
        </DialogTrigger> */}

          <DialogContent className='rounded-lg bg-white p-6 shadow-lg sm:max-w-[480px]'>
            <DialogHeader>
              <DialogTitle className='text-2xl font-semibold text-muted-foreground'>
                Transaction Details
              </DialogTitle>
            </DialogHeader>

            <Separator className='my-4' />

            <div className='space-y-6'>
              {/* Transaction Information */}
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Customer ID</span>
                <span className='font-geist-mono'>
                  {selectedTransaction?.customer_id}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Amount</span>
                <span className='font-geist-mono'>
                  {selectedTransaction?.total_amount}{' '}
                  {selectedTransaction?.currency || 'NGN'}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Reference</span>
                <span className='font-geist-mono'>
                  {selectedTransaction?.reference}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>
                  Transaction Reference
                </span>
                <span className='font-geist-mono'>
                  {selectedTransaction?.transactionReference}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Reason</span>
                <span className='font-geist text-right'>
                  {selectedTransaction?.reason}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Status</span>
                <span
                  className={`rounded-full px-4 py-1 text-sm font-medium ${
                    selectedTransaction?.status === 'Flagged'
                      ? 'border border-red-500 bg-red-100 text-red-700'
                      : 'border border-green-500 bg-green-100 text-green-700'
                  }`}
                >
                  {selectedTransaction?.status}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Flagged On</span>
                <span className='font-geist-mono'>
                  {selectedTransaction?.flagged_on
                    ? format(new Date(selectedTransaction?.flagged_on), 'PPPpp')
                    : 'N/A'}
                </span>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={closeDialog} className='mt-4 w-full'>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default Compliance
