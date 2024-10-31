import { DataTable } from '@/components/table/data-table'

import { businessData } from './data'
import { businessColumns } from './columns'
import ContentSection from '@/pages/settings/components/content-section'
import { useNavigate } from 'react-router-dom'
const BusinessBanking = () => {
  const navigate = useNavigate()

  const handleRowClick = (userId: string) => {
    navigate(`/products/business-banking/business/${userId}`) // Navigate to the user detail page
  }

  return (
    <ContentSection
      title='Business Banking'
      desc='View and manage business accounts and transactions.'
    >
      <DataTable
        columns={businessColumns}
        data={businessData}
        inputPlaceHolder='Search...'
        filterColumn='name'
        onRowClick={(row) => handleRowClick(row.id)}
        showButton
        buttonText='Search'
      />
    </ContentSection>
  )
}

export default BusinessBanking
