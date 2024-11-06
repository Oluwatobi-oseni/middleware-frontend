import { ColumnDef } from '@tanstack/react-table'

export type Message = {
  id: string
  channel: string
  message: string
  description: string
  date: string // formatted date (e.g., 'October 29, 2024')
}

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => <span>{row.original.channel}</span>,
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => <span>{row.original.message}</span>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <span>{row.original.description}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <span>{row.original.date}</span>,
  },
]
