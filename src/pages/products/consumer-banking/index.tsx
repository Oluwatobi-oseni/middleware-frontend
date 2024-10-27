import { DataTable } from '@/components/table/data-table'

import { columns } from './columns'
import { data } from './data'
import ContentSection from '@/pages/settings/components/content-section'

export default function SettingsDisplay() {
  return (
    <ContentSection
      title='Team'
      desc="Manage your team's settings and permissions to control their access and visibility within the app."
      showMemberDialog
    >
      <DataTable
        columns={columns}
        data={data}
        showModalButton={true}
        inputPlaceHolder='Search Team'
        filterColumn='accountName'
      />
    </ContentSection>
  )
}
