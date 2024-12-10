import { MessageResponse } from '@/lib/messages/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const columns: ColumnDef<MessageResponse>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  //   cell: ({ row }) => <span>{row.original.id}</span>,
  // },
  {
    accessorKey: 'serialId',
    header: '#',
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => {
      const channelStyles = {
        IN_APP_MESSAGES: 'bg-green-50 text-green-700 border border-green-300',
        MOBILE_NOTIFICATION:
          'bg-purple-50 text-purple-700 border border-purple-300',
      }

      const channelLabels = {
        IN_APP_MESSAGES: 'In App Messages',
        MOBILE_NOTIFICATION: 'Mobile Notifications',
      }

      const channelClass =
        channelStyles[row.original.channel as keyof typeof channelStyles] ||
        'bg-gray-50 text-gray-600'

      const displayChannel =
        channelLabels[row.original.channel as keyof typeof channelLabels] ||
        row.original.channel

      return (
        <span
          className={`inline-block rounded-lg px-4 py-1.5 text-sm font-semibold shadow-md ${channelClass}`}
        >
          {displayChannel}
        </span>
      )
    },
  },

  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <span>{row.original.title}</span>,
  },
  {
    accessorKey: 'body',
    header: 'Body',
    cell: ({ row }) => <span>{row.original.body}</span>,
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Created At',
  //   cell: ({ row }) => {
  //     const createdAt = row.original.createdAt
  //     return (
  //       <span>
  //         {createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : 'N/A'}
  //       </span>
  //     )
  //   },
  // },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      if (!createdAt) return <span>N/A</span>

      // Format the date
      const formattedDate = format(new Date(createdAt), 'MMM dd, yyyy')

      // Extract the day and year parts
      const [month, day, year] = formattedDate.split(' ')

      return (
        <span className='uppercase'>
          {month}{' '}
          <span className='font-geist-mono'>
            {day}
            {year}
          </span>
        </span>
      )
    },
  },
  // {
  //   accessorKey: 'updatedAt',
  //   header: 'Updated At',
  //   cell: ({ row }) => {
  //     const updatedAt = row.original.updatedAt
  //     return (
  //       <span>
  //         {updatedAt ? format(new Date(updatedAt), 'MMMM dd, yyyy') : 'N/A'}
  //       </span>
  //     )
  //   },
  // },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <button
          className='text-blue-500 hover:underline'
          onClick={() => alert(`Editing message: ${row.original.id}`)}
        >
          Edit
        </button>
        <button
          className='text-red-500 hover:underline'
          onClick={() => alert(`Deleting message: ${row.original.id}`)}
        >
          Delete
        </button>
      </div>
    ),
  },
]
