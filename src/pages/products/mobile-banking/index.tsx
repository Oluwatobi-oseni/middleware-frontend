import { DataTable } from '@/components/table/data-table'

import { columns } from './columns'
import { data } from './data'
import ContentSection from '@/pages/settings/components/content-section'
import { useNavigate } from 'react-router-dom'
const ConsumerBanking = () => {
  const navigate = useNavigate()

  const handleRowClick = (userId: string) => {
    navigate(`/products/mobile-banking/user/${userId}`) // Navigate to the user detail page
  }

  return (
    <ContentSection
      title='Mobile Banking'
      desc='View and manage consumer business accounts'
    >
      <DataTable
        columns={columns}
        data={data}
        inputPlaceHolder='Search...'
        filterColumn='name'
        onRowClick={(row) => handleRowClick(row.id)}
        showButton
        buttonText='Search'
      />
    </ContentSection>
  )
}

export default ConsumerBanking
