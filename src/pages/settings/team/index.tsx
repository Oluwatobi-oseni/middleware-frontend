// import { DisplayForm } from './display-form'
// import { TableDemo } from './team-table'
import { DataTable } from '@/components/table/data-table'
import ContentSection from '../components/content-section'
import { columns } from './columns'
import { data } from './data'
import RolesModal from './RolesModal'

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
        showModalComponent
        ModalComponent={<RolesModal />}
        inputPlaceHolder='Search Team'
        filterColumn='accountName'
        showDateRangePicker={false}
      />
    </ContentSection>
  )
}
