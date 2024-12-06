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
  SuspendDialogComponent: React.FC<{ isOpen: boolean; onClose: () => void }>
}

const AdminActionsMenu = <T,>({
  row,
  onEdit,
  SuspendDialogComponent,
}: AdminActionsMenuProps<T>) => {
  const [isSuspendDialogOpen, setSuspendDialogOpen] = useState(false)

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
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSuspendDialogOpen(true)}
          className='text-red-500'
        >
          Suspend
        </DropdownMenuItem>
      </DropdownMenuContent>

      <SuspendDialogComponent
        isOpen={isSuspendDialogOpen}
        onClose={() => setSuspendDialogOpen(false)}
      />
    </DropdownMenu>
  )
}

export default AdminActionsMenu
