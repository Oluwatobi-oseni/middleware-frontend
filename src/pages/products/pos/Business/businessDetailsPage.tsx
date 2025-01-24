import { useParams } from 'react-router-dom'
// import { businessData } from './data';
import { DataTable } from '@/components/table/data-table'
// import { businessColumns } from './columns';
// import { data as BusinessData } from '../Business/data'
import { CheckCircleIcon } from 'lucide-react'
import { CreateAccountNo } from '../account-number/create-account-no'
import { useBusinessById } from '@/lib/pos/hook'
import {
  Transaction,
  transactionColumns,
} from '../POS/PosTransactionDetails/columns'
import { transactionData } from '../POS/PosTransactionDetails/data'
import { ActivityDetailsDialog } from '../activity/activityDetailsDialog'
import { useState } from 'react'

const BusinessDetailsPage = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Handler to open the dialog with selected row data
  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDialogOpen(true)
  }
  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedTransaction(null)
  }
  const { businessId } = useParams() // Extract businessId from URL
  const {
    data: business,
    isLoading,
    isError,
  } = useBusinessById(businessId || '')
  // const business = .find((b) => b.id === businessId) // Find specific business data
  console.log('The data', business)

  if (isLoading) {
    return <p>Loading...</p> // Display loading message while data is fetching
  }

  if (isError || !business) {
    return <p>Business not found.</p> // Handle errors or empty data
  }
  const initials = business.name
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className='h-screen overflow-hidden'>
      <div className='h-full overflow-y-auto p-4 hide-scrollbar'>
        <div className='mb-4 mt-2 flex items-center justify-between border-b-2 border-gray-300 pb-2 lg:mt-8'>
          <h2 className='text-xl text-muted-foreground'>Business Details</h2>
          <div className='flex items-center space-x-4'>
            {/* KYC Status */}
            <div className='flex items-center space-x-1'>
              <span className='text-sm text-gray-600'>Business KYB:</span>
              <CheckCircleIcon className='h-5 w-5 text-green-500' />
              <span className='text-green-600'>Verified</span>
            </div>

            {/* Vertical Divider */}
            <div className='h-5 border-l border-gray-300'></div>

            {/* Track Activities Badge */}
            <CreateAccountNo business={business} />
          </div>
        </div>
        <div className='my-6 flex flex-col lg:flex-row'>
          {/* Left Section */}
          <div className='mb-4 w-1/4'>
            <div className='flex w-full flex-col items-start'>
              <div className='flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-r from-teal-500 to-blue-500 text-6xl font-bold text-muted shadow-lg'>
                {initials}
              </div>
              <div className='mt-4 text-center'>
                <p className='flex items-center text-sm text-muted-foreground'>
                  {business.name}
                </p>
                <p className='flex items-center text-sm text-muted-foreground'>
                  Owned by: {business.ownersName}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className='w-3/4'>
            <div className='grid grid-cols-1 gap-6 p-4'>
              <div className='flex w-full justify-between pb-2'>
                <p>Registered POS Terminals</p>
                <span className='font-geist-mono w-1/2 text-left'>
                  {business.terminals}
                </span>
              </div>
              <div className='flex w-full justify-between pb-2'>
                <p>Business Location</p>
                <span className='w-1/2 text-left'>
                  {business.businessLocation}
                </span>
              </div>
              <div className='flex w-full justify-between pb-2'>
                <p>Registration Number</p>
                <span className='w-1/2 text-left'>
                  {business.registrationNumber}
                </span>
              </div>
              <div className='flex w-full justify-between pb-2'>
                <p>Industry</p>
                <span className='w-1/2 text-left'>{business.industry}</span>
              </div>
              <div className='flex w-full justify-between pb-2'>
                <p>Company Size</p>
                <span className='font-geist-mono w-1/2 text-left'>
                  {business.companySize}
                </span>
              </div>
              <div className='flex w-full justify-between pb-2'>
                <p>Estimated Annual Volume</p>
                <span className='font-geist-mono w-1/2 text-left'>
                  {business.estimatedAnnualVolume}
                </span>
              </div>
              <div className='flex w-full justify-between pb-2'>
                <p>Email</p>
                <span className='w-1/2 text-left'>{business.Email}</span>
              </div>
              <div className='flex w-full justify-between pb-2'>
                <p>Office Address</p>
                <span className='w-1/2 text-left'>{business.Address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div>
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

export default BusinessDetailsPage
