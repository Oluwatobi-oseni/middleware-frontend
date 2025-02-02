import { DataTable } from '@/components/table/data-table'
import { businessColumns } from './columns'
import ContentSection from '@/pages/settings/components/content-section'
import { useNavigate } from 'react-router-dom'
import { useBusinesses } from '@/lib/products/business-banking/hook'
import { Business } from '@/lib/products/business-banking/types'
import { IconBuildingStore } from '@tabler/icons-react'

const BusinessBanking = () => {
  const { data, isLoading, error } = useBusinesses()
  console.log('Business', data)
  const navigate = useNavigate()

  // Sort businesses by creation date (if available)
  const sortedData = data
    ? data.data.sort((a: Business, b: Business) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
    : []

  const handleRowClick = (userId: string) => {
    navigate(`/products/business-banking/business/${userId}`) // Navigate to the user detail page
  }

  return (
    <ContentSection
      title='Business Banking'
      desc='View and manage business accounts and transactions.'
    >
      {isLoading ? (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <p className='text-xl font-semibold'>Loading business data...</p>
        </div>
      ) : error ? (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <p className='text-xl font-semibold'>Failed to load business data</p>
          <p className='text-muted-foreground'>Please try again later.</p>
        </div>
      ) : data && data.data.length > 0 ? (
        <DataTable
          columns={businessColumns} // Make sure the business columns are properly defined
          data={sortedData} // Use the sorted data from the hook
          inputPlaceHolder='Search businesses...'
          filterColumn='businessName'
          onRowClick={(row) => handleRowClick(row.id)} // Navigate to the business details page
          showButton
          buttonText='Filter'
        />
      ) : (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <IconBuildingStore size={80} className='mb-4 text-muted-foreground' />
          <p className='text-xl font-semibold'>No businesses found</p>
          <p className='text-muted-foreground'>
            Business accounts will appear here once created.
          </p>
        </div>
      )}
    </ContentSection>
  )
}

export default BusinessBanking
