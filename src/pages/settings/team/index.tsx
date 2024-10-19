// import { DisplayForm } from './display-form'
// import { TableDemo } from './team-table'
import ContentSection from '../components/content-section'
import BasicTable from '@/components/table/BasicTable'
// import { MemberDialog } from './MemberModal'

export default function SettingsDisplay() {
  return (
    <ContentSection
      title='Team'
      desc="Manage your team's settings and permissions to control their access and visibility within the app."
    >
      {/* <DisplayForm /> */}
      {/* <TableDemo /> */}
      <BasicTable />
    </ContentSection>
  )
}
