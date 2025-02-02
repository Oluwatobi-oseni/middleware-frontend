import { useNavigate, useParams } from 'react-router-dom'
// import { CheckCircleIcon } from 'lucide-react'
// import { Switch } from '@/components/ui/switch'
import { format } from 'date-fns'
import { Globe, Mail, Phone } from 'lucide-react'
import { DataTable } from '@/components/table/data-table'
import {
  vendorTransactionColumns as columns,
  VendorTransaction,
} from './posProvidersTransactions/columns'
import { vendorTransactionData as data } from './posProvidersTransactions/data'
// import { PosDevice } from '../posDevice/columns'

// Sample data
const VENDOR_DETAILS = {
  errandpay: {
    vendorName: 'ErrandPay',
    businessLocation: 'Lagos, Nigeria',
    posTerminalsProvided: 120,
    numberOfTransactions: 5000,
    valueOfTransactions: 20000000,
    email: 'support@errandpay.com',
    phoneNumber: '+234 810 123 4567',
    website: 'https://www.errandpay.com',
    officeAddress: '12, Marina Street, Lagos, Nigeria',
    status: 'Activated',
    lastSynced: new Date(),
  },
  paycliq: {
    vendorName: 'Pay Cliq',
    businessLocation: 'Abuja, Nigeria',
    posTerminalsProvided: 80,
    numberOfTransactions: 3000,
    valueOfTransactions: 15000000,
    email: 'support@paycliq.com',
    phoneNumber: '+234 902 987 6543',
    website: 'https://www.paycliq.com',
    officeAddress: '25, Jabi District, Abuja, Nigeria',
    status: 'Pending',
    lastSynced: new Date(),
  },
  grupp: {
    vendorName: 'Grupp',
    businessLocation: 'Port Harcourt, Nigeria',
    posTerminalsProvided: 50,
    numberOfTransactions: 2000,
    valueOfTransactions: 8000000,
    email: 'support@grupp.com',
    phoneNumber: '+234 803 555 7890',
    website: 'https://www.grupp.com',
    officeAddress: '10, Old GRA, PH, Nigeria',
    status: 'Deactivated',
    lastSynced: new Date(),
  },
}

const VendorDetailsPage = () => {
  const { posName: vendorName } = useParams()
  const navigate = useNavigate()
  const handleRowClick = (rowData: VendorTransaction) => {
    const posId = rowData.id
    const posName = encodeURIComponent(rowData.merchantName)
    navigate(`/products/pos/${posName}/${posId}`) // Navigate to the user detail page
  }
  const vendorData =
    VENDOR_DETAILS[vendorName as keyof typeof VENDOR_DETAILS] || null

  if (!vendorData) return <p>Vendor not found.</p>
  const isVendorActive = vendorData.status === 'Activated'

  return (
    <div className='h-screen overflow-hidden'>
      <div className='h-full overflow-y-auto p-4'>
        {/* Header */}
        <div className='mb-4 flex justify-between border-b-2 pb-2'>
          <h2 className='text-xl text-muted-foreground'>
            Vendor Details - {vendorData.vendorName}
          </h2>
          <div className='flex items-center space-x-4'>
            {/* KYB Verification */}
            <span className='text-sm text-gray-600'>Vendor Status</span>

            <div className='h-5 border-l'></div>

            {/* Terminal Status Toggle */}
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                isVendorActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {isVendorActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Vendor Information */}
        <div className='my-6 flex flex-col items-center justify-center lg:flex-row'>
          {/* Left Section: Vendor Initials */}
          <div className='mb-4 flex w-1/4 flex-col items-start'>
            <div className='flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-6xl font-bold text-white shadow-lg'>
              {vendorData.vendorName
                .split(' ')
                .map((word) => word[0])
                .join('')}
            </div>
            {/* Contact Information Section */}
            <div className='mt-6 flex flex-col items-center space-y-2'>
              {/* Phone */}
              <div className='flex items-center justify-center space-x-3 text-muted-foreground'>
                <Phone className='h-5 w-5 text-muted-foreground/80' />
                <span className='text-sm'>{vendorData.phoneNumber}</span>
              </div>

              {/* Email */}
              <div className='flex items-center space-x-3 text-muted-foreground'>
                <Mail className='h-5 w-5 text-muted-foreground/80' />
                <span className='text-sm'>{vendorData.email}</span>
              </div>

              {/* Website */}
              <div className='flex items-center space-x-3 text-muted-foreground'>
                <Globe className='h-5 w-5 text-muted-foreground/80' />
                <a
                  href={vendorData.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-muted-foreground hover:underline'
                >
                  {vendorData.website}
                </a>
              </div>
            </div>
          </div>

          {/* Right Section: Vendor Details */}
          <div className='w-3/4'>
            <div className='grid grid-cols-1 gap-6 p-4'>
              <div className='flex justify-between pb-2'>
                <p>Business Location</p>
                <span className='w-1/2 text-left'>
                  {vendorData.businessLocation}
                </span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>POS Terminals Provided</p>
                <span className='w-1/2 text-left'>
                  {vendorData.posTerminalsProvided}
                </span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Number of Transactions</p>
                <span className='w-1/2 text-left'>
                  {vendorData.numberOfTransactions}
                </span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Value of Transactions</p>
                <span className='w-1/2 text-left'>
                  ₦{vendorData.valueOfTransactions.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Email</p>
                <span className='w-1/2 text-left'>{vendorData.email}</span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Office Address</p>
                <span className='w-1/2 text-left'>
                  {vendorData.officeAddress}
                </span>
              </div>
              <div className='flex justify-between pb-2'>
                <p>Last Transaction</p>
                <span className='font-geist-mono w-1/2 text-left'>
                  {format(new Date(vendorData.lastSynced), 'dd MMM, yyyy ')}
                  <span className='text-xs font-semibold text-red-500'>
                    {format(new Date(vendorData.lastSynced), 'HH:mm')}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 overflow-auto'>
          <DataTable
            columns={columns}
            data={data}
            inputPlaceHolder='Search Transactions'
            filterColumn='merchantName'
            showButton
            buttonText='Filter'
            showDateRangePicker
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  )
}

export default VendorDetailsPage
