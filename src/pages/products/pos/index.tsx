import ContentSection from '@/pages/settings/components/content-section'
import PosPage from './pos'

const Pos = () => {
  return (
    <ContentSection
      title='POS'
      desc='Manage and assign POS devices to businesses'
    >
      <PosPage />
    </ContentSection>
  )
}

export default Pos
