import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './data-table'
import { columns } from './columns'

export default function CardRequests() {
  return (
    <div className='w-full px-8 py-4'>
      <div className='w-full'>
        <div className='flex flex-col items-start justify-center gap-8'>
          <div className='flex w-full items-start justify-between gap-3'>
            <h1 className='text-2xl font-bold'>Card Requests</h1>
            <div className='flex items-center justify-start gap-4 p-0'>
              <ThemeSwitch />
              <UserNav />
            </div>
          </div>
          <span className='text-lg text-muted-foreground'>
            Cards requested from the mobile app
          </span>
        </div>
        {/* Main */}
        <div>
          <DataTable columns={columns} data={[]} />
        </div>
      </div>
    </div>
  )
}
