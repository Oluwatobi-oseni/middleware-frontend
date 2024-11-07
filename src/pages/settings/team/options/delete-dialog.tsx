import { Avatar } from '@/components/ui/avatar'
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
import { userDetailsType } from '@/lib/users/types'

// interface TeamMember {
//   avatarUrl: string
//   name: string
//   role: string
//   email: string
//   dateJoined: string
// }

export function DeleteMemberDialog({
  isOpen,
  onClose,
  teamMember,
}: {
  isOpen: boolean
  onClose: () => void
  teamMember?: userDetailsType
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Remove Team Member</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='mb-4 flex gap-6'>
          <div className='flex flex-shrink-0 items-center justify-center'>
            <Avatar className='h-16 w-16'>
              <div className='flex h-full w-full items-center justify-center rounded-full bg-gray-200'>
                <span className='text-2xl font-medium'>
                  {teamMember?.email.charAt(0)}
                </span>
              </div>
            </Avatar>
          </div>
          <div className='space-y-3'>
            <p className='flex items-center'>{teamMember?.email}</p>
            <p className='flex items-center text-xs text-muted-foreground'>
              <IconUser size={16} className='mr-1' />
              {teamMember?.role}
            </p>
            <p className='flex items-center text-xs text-muted-foreground'>
              <IconMail size={16} className='mr-1' />
              {teamMember?.email}
            </p>
            <p className='flex items-center text-xs text-muted-foreground'>
              <IconCalendar size={16} className='mr-1' />
              Joined on
            </p>
          </div>
        </div>
        <Separator />
        <DialogFooter>
          <DeleteUserDialog username={teamMember?.email} onClose={onClose} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
