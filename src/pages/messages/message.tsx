import { Separator } from '@/components/ui/separator'
import { NewMessageDialog } from './message-dialog'
import { IconMessages } from '@tabler/icons-react'
import { data } from './data'
import { DataTable } from '@/components/table/data-table'
import { columns } from './columns'

const message = () => {
  const hasMessages = data.length > 0
  return (
    <>
      <div>
        <p className='text-muted-foreground'>
          Create and send messages to user and businesses
        </p>
      </div>
      <div className='my-4 flex justify-end'>
        <NewMessageDialog />
      </div>
      <Separator className='shadow' />
      {/* <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'></ul> */}
      {hasMessages ? (
        <DataTable
          columns={columns}
          data={data}
          inputPlaceHolder='Search Messages'
          filterColumn='message'
          showButton
          buttonText='Search'
          // onRowClick={(row) => console.log(row.id)}
        />
      ) : (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <IconMessages size={80} className='mb-4 text-muted-foreground' />
          <p className='text-xl font-semibold'>No messages yet</p>
          <p className='text-muted-foreground'>
            Chat notifications sent to users and businesses will appear here.
          </p>
        </div>
      )}
    </>
  )
}

export default message
