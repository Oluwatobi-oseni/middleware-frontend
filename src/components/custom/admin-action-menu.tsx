// AdminActionsMenu.tsx
import { useState } from 'react'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDots } from '@tabler/icons-react'

interface AdminActionsMenuProps<T> {
  row: T
  onEdit: (row: T) => void
  DeleteDialogComponent: React.FC<{ isOpen: boolean; onClose: () => void }>
}

const AdminActionsMenu = <T,>({
  row,
  onEdit,
  DeleteDialogComponent,
}: AdminActionsMenuProps<T>) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <IconDots className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => onEdit(row)}
          className='text-muted-foreground'
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setDeleteDialogOpen(true)}
          className='text-muted-foreground'
        >
          Suspend
        </DropdownMenuItem>
      </DropdownMenuContent>

      <DeleteDialogComponent
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </DropdownMenu>
  )
}

export default AdminActionsMenu
