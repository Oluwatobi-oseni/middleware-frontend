import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { IconCalendar, IconMail, IconUser } from '@tabler/icons-react'
import { DeleteUserDialog } from './confirm-delete-dialog'

const teamMember = {
  avatarUrl: 'https://github.com/shadcn.png',
  name: 'Victor Olayemi',
  role: 'Developer',
  email: 'victor.olayemi@alert.com.ng',
  dateJoined: 'January 10, 2022',
}

export function DeleteMemberDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  //   onOpen: (open: boolean) => void
  onClose: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant='outline'>Delete Member</Button>
      </DialogTrigger> */}
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Remove Team Member</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='mb-4 flex items-center justify-between gap-4'>
          <div className='flex h-full w-1/2 items-center justify-center'>
            <Avatar className='h-full w-fit'>
              <AvatarImage src={teamMember.avatarUrl} alt={teamMember.name} />
              <AvatarFallback>{teamMember.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className='space-y-2'>
            <p className='flex items-center font-semibold'>{teamMember.name}</p>
            <p className='flex items-center text-xs text-muted-foreground'>
              <IconUser size={16} className='mr-1' />
              {teamMember.role}
            </p>
            <p className='flex items-center text-xs text-muted-foreground'>
              <IconMail size={16} className='mr-1' />
              {teamMember.email}
            </p>
            <p className='flex items-center text-xs text-muted-foreground'>
              <IconCalendar size={16} className='mr-1' />
              Joined on {teamMember.dateJoined}
            </p>
          </div>
        </div>
        <Separator />
        <DialogFooter>
          <DeleteUserDialog username='Victor Olayemi' onClose={onClose} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
