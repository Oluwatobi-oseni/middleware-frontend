import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { data as POSData } from '../POS/data'
import { Switch } from '@/components/ui/switch'
import { CheckCircleIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DataTable } from '@/components/table/data-table'
import { transactionData } from './PosTransactionDetails/data'
import {
  Transaction,
  transactionColumns,
} from './PosTransactionDetails/columns'
import { format } from 'date-fns'
import { POSStatusConfirmationDialog } from './components/posStatusConfirmationDialog'
import { ActivityDetailsDialog } from '../activity/activityDetailsDialog'

const POSDetailsPage = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Handler to open the dialog with selected row data
  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDialogOpen(true)
  }

  // Handler to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedTransaction(null)
  }
  const { posId } = useParams() // Extract posId from URL
  const posData = POSData.find((pos) => pos.id === Number(posId)) // Find the specific data

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<
    'Activated' | 'Pending' | 'Deactivated'
  >(posData?.status || 'Deactivated')
  if (!posData) {
    return <p>POS Terminal not found.</p>
  }

  const handleValueChange = (
    value: 'Activated' | 'Pending' | 'Deactivated'
  ) => {
    setSelectedValue(value)
    setOpen(true) // Show confirmation dialog
  }

  const handleConfirm = () => {
    handlePOSStatusChange(selectedValue)
    setOpen(false) // Close the dialog
  }

  const initials = posData.posName
    .split(' ')
    .map((word) => word[0])
    .join('')

  const handlePOSStatusChange = (
    newStatus: 'Activated' | 'Pending' | 'Deactivated'
  ) => {
    console.log(`POS status changed for business with ID: ${posData.id}`)
    // Additional logic to handle the status change can be added here
    setSelectedValue(newStatus)
  }

  return (
    <div className='h-screen overflow-hidden'>
      <div className='h-full overflow-y-auto p-4 hide-scrollbar'>
        <div className='mb-4 mt-2 flex items-center justify-between border-b-2 border-gray-300 pb-2 lg:mt-8'>
          <h2 className='text-xl text-muted-foreground'>POS Details</h2>

          {/* Right-aligned Section */}
          <div className='flex items-center space-x-4'>
            {/* KYC Status */}
            <div className='flex items-center space-x-1'>
              <span className='text-sm text-gray-600'>Business KYB:</span>
              <CheckCircleIcon className='h-5 w-5 text-green-500' />
              <span className='text-green-600'>Verified</span>
            </div>

            {/* Vertical Divider */}
            <div className='h-5 border-l border-gray-300'></div>

            {/* User Status Toggle */}
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600'>Terminal Status</span>
              <Switch
              // checked={isLein} onClick={toggleLeinStatus}
              />
            </div>

            {/* Vertical Divider */}
            <div className='h-5 border-l border-gray-300'></div>

            {/* Track Activities Badge */}
            <Select
              //   defaultValue={selectedValue}
              value={selectedValue}
              onValueChange={handleValueChange} // Trigger confirmation dialog on change
            >
              <SelectTrigger
                className={`w-[180px] border-2 ${
                  posData.status === 'Activated'
                    ? 'border-green-500'
                    : 'border-red-500'
                } focus:outline-none focus:ring-transparent`}
              >
                <SelectValue placeholder='Select POS Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='Activated'>Activate POS</SelectItem>
                  <SelectItem value='Deactivated'>Deactivate POS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <POSStatusConfirmationDialog
              open={open}
              onOpenChange={setOpen}
              selectedValue={selectedValue}
              handleConfirm={handleConfirm}
            />
          </div>
        </div>
        <div className='my-6 flex flex-col lg:flex-row'>
          {/* Left Section: User Information */}
          <div className='mb-4 w-1/4'>
            <div className='flex w-full flex-col items-start'>
              <div className='flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-r from-teal-500 to-blue-500 text-6xl font-bold text-muted shadow-lg'>
                {initials}
              </div>
              <div className='mt-4 text-center'>
                <p className='flex items-center text-sm text-muted-foreground'>
                  {posData.posName}
                </p>
                <p className='flex items-center text-sm text-muted-foreground'>
                  {posData.deviceType}
                </p>
              </div>
            </div>
          </div>
          <div className='w-3/4'>
            <div className='grid grid-cols-1 gap-6 p-4'>
              <div className='flex w-full justify-between pb-2'>
                <p>Merchant Business Name</p>
                <span className='w-1/2 text-left'>{posData.posName}</span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Account Number</p>
                <span className='w-1/2 text-left'>{posData.serialNumber}</span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Business Type</p>
                <span className='w-1/2 text-left'>{posData.deviceType}</span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>POS Serial Number</p>
                <span className='w-1/2 text-left'>{posData.serialNumber}</span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Last Transaction</p>
                <span className='font-geist-mono w-1/2 text-left'>
                  {format(new Date(posData.lastSynced), 'dd MMM, yyyy ')}
                  <span className='text-xs font-semibold text-red-500'>
                    {format(new Date(posData.lastSynced), 'HH:mm')}
                  </span>
                </span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Date Assigned</p>
                <span className='font-geist-mono w-1/2 text-left'>
                  {format(new Date(posData.lastSynced), 'dd MMM, yyyy ')}
                  <span className='text-xs font-semibold text-red-500'>
                    {format(new Date(posData.lastSynced), 'HH:mm')}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 overflow-auto'>
          <DataTable
            columns={transactionColumns}
            data={transactionData}
            inputPlaceHolder='Search Transactions'
            filterColumn='accountName'
            showDateRangePicker={false}
            onRowClick={handleRowClick}
          />
          {isDialogOpen && selectedTransaction && (
            <ActivityDetailsDialog
              transaction={selectedTransaction}
              onClose={closeDialog}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default POSDetailsPage
