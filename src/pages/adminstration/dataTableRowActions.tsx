import { useState } from 'react'

import DeleteForm from '@/components/forms/delete-form'
import EditForm from './components/EditForm'
import IconMenu from '@/components/table-dialog/icon-menu'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import { userDetailsType } from '@/lib/users/types'

export interface WithId<T = number> {
  id: T
}
interface DataTableRowActionsProps<TData extends userDetailsType> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends userDetailsType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  //   const cardId = row.original.id as string

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsEditOpen(true)
  }

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsDeleteOpen(true)
  }
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title='Edit Person'
      >
        <EditForm userDetails={row.original} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title='Delete Person'
        description='Are you sure you want to delete this person?'
      >
        <DeleteForm userDetails={row.original} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={(e) => e.stopPropagation()}
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='z-50 w-[160px]'>
          <DropdownMenuItem className='font-base group flex w-full items-center  justify-between p-0 text-left text-sm text-neutral-500 '>
            <button
              onClick={handleEditClick}
              className='flex w-full justify-start rounded-md p-2 transition-all duration-75 hover:bg-neutral-100'
            >
              <IconMenu text='View' icon={<EyeIcon className='h-4 w-4' />} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='font-base group flex w-full items-center  justify-between p-0 text-left text-sm text-neutral-500 '>
            <button
              onClick={handleDeleteClick}
              className='flex w-full justify-start rounded-md p-2 text-red-500 transition-all duration-75 hover:bg-neutral-100'
            >
              <IconMenu text='Suspend' icon={<Trash2 className='h-4 w-4' />} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
