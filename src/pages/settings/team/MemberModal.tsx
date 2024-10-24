import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { IconPlus } from '@tabler/icons-react'
import { data } from './data'

export function MemberDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'} className='flex gap-1 font-[Geist] text-xs'>
          <IconPlus className='h-4 w-4' />
          <span>Add a member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='px-4 py-4 sm:max-w-[425px]'>
        {' '}
        {/* Add padding here */}
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <Separator className='my-2' />
        {/* Email Section */}
        <div className='mb-4'>
          <Label htmlFor='email' className='text-right text-xs font-light'>
            Email
          </Label>
          <div className='flex items-center justify-between'>
            <div className='flex w-full items-center justify-between'>
              <Input
                id='email'
                placeholder='Enter email'
                className='w-full placeholder:text-xs'
                autoComplete='off'
              />
              <Button className='ml-4 text-xs' variant='default'>
                Send Invite
              </Button>
            </div>
          </div>
        </div>
        {/* Members List Section */}
        <div>
          <h2 className=' text-xs font-light'>Members</h2>
          <div className='max-h-40 overflow-y-auto'>
            {data.map((user) => (
              <div
                key={user.id}
                className='flex items-center justify-between py-2'
              >
                <div className='flex items-center'>
                  <div className='h-10 w-10 flex-shrink-0'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-blue-500 font-semibold text-white'>
                      {user.accountName.charAt(0)}
                    </div>
                  </div>
                  <div className='ml-4 overflow-hidden'>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium'>
                      {user.accountName}
                    </div>
                    <div className='text-xs text-gray-400'>{user.email}</div>
                  </div>
                </div>
                <div className='ml-4 text-xs font-medium'>{user.role}</div>
              </div>
            ))}
          </div>
        </div>
        <Separator className='mb-2' />
        {/* Copy Link Section */}
        <div>
          <Label htmlFor='link' className='text-right text-xs font-light'>
            Copy Link
          </Label>
          <div className='flex items-center justify-between'>
            <div className='flex w-full items-center justify-between'>
              <Input
                id='link'
                placeholder='Alert/Users-05021e53ed564ace50406'
                className='w-full placeholder:text-xs'
              />
              <Button className='ml-4 text-xs' variant={'outline'}>
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
