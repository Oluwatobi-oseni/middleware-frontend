// import { DisplayForm } from './display-form'
import { TableDemo } from './team-table'
import ContentSection from '../components/content-section'

export default function SettingsDisplay() {
  return (
    <ContentSection
      title='Team'
      desc="Manage your team's settings and permissions to control their access and visibility within the app. Customize each member's role to ensure they have the appropriate tools to collaborate effectively."
    >
      {/* <DisplayForm /> */}
      <TableDemo />
    </ContentSection>
  )
}
