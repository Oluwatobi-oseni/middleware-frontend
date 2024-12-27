import { Separator } from '@/components/ui/separator'
import { NewMessageDialog } from './message-dialog'
import { IconMessages } from '@tabler/icons-react'
import { DataTable } from '@/components/table/data-table'
import { columns } from './columns'
import { useMessageData } from './data'
import { MessageResponse } from '@/lib/messages/types'

const Message = () => {
  const { data, error, isLoading } = useMessageData()

  const sortedData = data
    ? data.sort((a: MessageResponse, b: MessageResponse) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
    : []

  // Check if messages exist
  const hasMessages = data && data.length > 0

  return (
    <>
      <div>
        <p className='text-muted-foreground'>
          Create and send messages to users and businesses.
        </p>
      </div>
      <div className='my-4 flex justify-end'>
        <NewMessageDialog />
      </div>
      <Separator className='shadow' />

      {isLoading ? (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <p className='text-xl font-semibold'>Loading messages...</p>
        </div>
      ) : error ? (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <p className='text-xl font-semibold'>Failed to load messages</p>
          <p className='text-muted-foreground'>Please try again later.</p>
        </div>
      ) : hasMessages ? (
        <DataTable
          columns={columns}
          data={sortedData}
          inputPlaceHolder='Search Messages'
          filterColumn='channel'
          showButton
          buttonText='Search'
          showDateRangePicker={false}
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

export default Message
