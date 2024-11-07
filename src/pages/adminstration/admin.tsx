import { Separator } from '@/components/ui/separator'
// import { CreateAdminActionDialog } from './admin-action-dialog'  // A new dialog component for general admin actions
// import { adminData } from './adminData'  // Data specific to admin actions or entities
import { IconUser } from '@tabler/icons-react' // Use a more general icon for the admin page
import { DataTable } from '@/components/table/data-table'
import { columns } from './columns'
import { useAdminUserData } from './data'
import RolesModal from '../settings/team/RolesModal'
import { AddTeamMemberDialog } from './AddMemberModal'

// import { adminColumns } from './adminColumns'  // Columns configuration specific to admin data

const AdminPage = () => {
  const { data } = useAdminUserData()
  const hasAdminData = data?.length

  return (
    <div className='h-screen overflow-y-auto'>
      <div>
        <p className='text-muted-foreground'>
          Manage users, permissions, and other administrative actions
        </p>
      </div>
      <div className='my-4 flex justify-end'>
        <AddTeamMemberDialog />
      </div>
      <Separator className='shadow' />
      {hasAdminData ? (
        <DataTable
          columns={columns}
          data={data}
          inputPlaceHolder='Search...'
          filterColumn='email'
          showButton={false}
          showDateRangePicker={false}
          showModalComponent
          ModalComponent={<RolesModal />}
          buttonText='Search'
        />
      ) : (
        <div className='flex h-full flex-col items-center justify-center text-center'>
          <IconUser size={80} className='mb-4 text-muted-foreground' />
          <p className='text-xl font-semibold'>No data available</p>
          <p className='text-muted-foreground'>
            Administrative data and user management options will appear here.
          </p>
        </div>
      )}
    </div>
  )
}

export default AdminPage
