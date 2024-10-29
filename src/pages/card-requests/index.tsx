import { DataTable } from './data-table'
import { columns } from './columns'

export default function CardRequests() {
  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='flex flex-col items-start justify-center gap-4'>
          <span className='text-lg font-medium text-muted-foreground'>
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
