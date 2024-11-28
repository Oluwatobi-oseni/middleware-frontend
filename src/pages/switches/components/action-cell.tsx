import { ExportDialog } from '@/pages/dashboard/components/export-dialog'
// import { IconDownload, IconEye } from '@tabler/icons-react' // These can be removed if not needed
import { ProviderDetailsDialog } from './providers-details-dialog'

const dummyProvider = {
  customerName: 'Afolarin',
  status: 'Active',
  dateApplied: '10 Oct, 2024 14:10',
  dateVerified: '25 Oct, 2024 14:10',
}

export const ActionCell = () => {
  return (
    <>
      {/* Directly render dialogs */}
      <div className='flex'>
        <ExportDialog />
        <ProviderDetailsDialog provider={dummyProvider} />
      </div>
    </>
  )
}
