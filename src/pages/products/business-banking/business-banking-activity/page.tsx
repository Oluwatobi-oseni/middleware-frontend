import { useState } from 'react'
import { DataTable } from '@/components/table/data-table'
import { data } from './business-activity-table/data'
import { columns } from './business-activity-table/columns'
import { BusinessActivity } from './business-activity-table/columns'
import { IconClock } from '@tabler/icons-react'

const BusinessBankingActivity = () => {
  const [selectedRow, setSelectedRow] = useState<BusinessActivity | null>(null)

  const handleRowClick = (row: BusinessActivity) => {
    setSelectedRow(row)
  }

  return (
    <div className='flex flex-col gap-6 md:flex-row'>
      {/* DataTable Section */}
      <div className='w-full md:w-[60%]'>
        <DataTable
          columns={columns}
          data={data}
          onRowClick={handleRowClick} // Assuming DataTable supports onRowClick
        />
      </div>

      {/* Details Box Section */}
      <div
        className='flex h-screen w-full flex-col gap-6 rounded-lg border border-muted-foreground/45 bg-gradient-to-tl from-blue-100 to-blue-50 p-10 shadow-xl md:h-[70vh] md:w-[40%]'
        role='complementary'
        aria-labelledby='event-details-heading'
      >
        {/* Heading */}
        <h2
          id='event-details-heading'
          className='text-2xl font-semibold text-gray-900'
        >
          {selectedRow ? 'Event Details' : ''}
        </h2>

        {/* Row Details */}
        {selectedRow ? (
          <div className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-1 text-sm'>
                <span className='font-light text-muted-foreground'>
                  Full Name
                </span>
                <span className=' text-gray-900'>{selectedRow.fullName}</span>
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <span className='font-light text-muted-foreground'>
                  Email Address
                </span>
                <span className=' text-gray-900'>{selectedRow.email}</span>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-1 text-sm'>
                <span className='font-light text-muted-foreground'>
                  Team Role
                </span>
                <span className=' text-gray-900'>{selectedRow.teamRole}</span>
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <span className='font-light text-muted-foreground'>
                  IP Address
                </span>
                <span className=' font-geist-mono text-gray-900'>
                  {selectedRow.ipAddress}
                </span>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-1 text-sm'>
                <span className='font-light text-muted-foreground'>Device</span>
                <span className=' text-gray-900'>{selectedRow.device}</span>
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <span className='font-light text-muted-foreground'>
                  Status Code
                </span>
                <span className=' font-geist-mono text-gray-900'>
                  {selectedRow.statusCode}
                </span>
              </div>
            </div>
            <div className='mt-2 grid grid-cols-1'>
              <span className='text-sm font-light text-muted-foreground'>
                URL
              </span>
              <span className=' text-sm tracking-wide text-blue-500'>
                {selectedRow.url}
              </span>
            </div>
          </div>
        ) : (
          <div className='m-auto flex flex-col gap-4 text-muted-foreground'>
            <span className='flex items-center justify-center'>
              <IconClock size={100} className='text-muted-foreground' />
            </span>
            <p className='text-center text-lg font-medium'>
              Select a log to see more details about an event
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BusinessBankingActivity
