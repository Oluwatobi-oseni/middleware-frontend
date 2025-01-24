import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
// import { useDisable2FA } from '@/lib/users/hook'
import { userDetailsType } from '@/lib/users/types'
import { format } from 'date-fns'
import { UserRoleSelector } from './components/UserRoleSelector'
import { Disable2FAComponent } from './components/Disable2FA'

type UserDetailsModalProps = {
  userDetails: userDetailsType
  onClose: () => void
}

const UserDetailsModal = ({ onClose, userDetails }: UserDetailsModalProps) => {
  //   const disable2FAMutation = useDisable2FA() // Destructure from the hook
  //   const { mutate: disable2FA, isPending } = disable2FAMutation
  const email = userDetails.email
  const name = email
    .split('@')[0]
    .split('.')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
  const originalDate = userDetails.createdAt
  const formattedDate = format(new Date(originalDate), 'dd MMM, yyyy')
  const formattedTime = format(new Date(originalDate), 'hh:mm ')

  //   const toggle2FAStatus = () => {
  //     disable2FA(userDetails.id)
  //   }
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='w-full max-w-md'>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Email Address</span>
            <span className='text-sm'>{userDetails.email}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Designation</span>
            <span className='text-sm'>
              {
                userDetails.Designation
                  ? userDetails.Designation.name === 'IT_OFFICE'
                    ? 'IT Office'
                    : userDetails.Designation.name
                        .split('_') // Split by underscores
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        ) // Capitalize each word
                        .join(' ') // Join the words with a space
                  : 'N/A' // Default value
              }
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Level</span>
            <UserRoleSelector
              userDetails={{
                role: userDetails.role,
                id: Number(userDetails.id),
              }}
            />
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>2FA Status</span>
            <Disable2FAComponent
              userId={Number(userDetails.id)}
              has2FAEnabled={userDetails.has2FAEnabled}
            />
            {/* <button
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm ${
                userDetails.has2FAEnabled
                  ? 'border border-green-300 bg-green-100 text-green-800'
                  : 'border border-red-300 bg-red-100 text-red-800'
              }`}
              onClick={toggle2FAStatus}
              disabled={isPending} // Disable the button while the mutation is loading
            >
              {isPending
                ? 'Updating...' // Show loading text while mutation is in progress
                : userDetails.has2FAEnabled
                  ? 'ON'
                  : 'OFF'}
            </button> */}
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Date Created</span>
            <span className='flex flex-col'>
              <span className='font-geist-mono'>{formattedDate}</span>
              <span className='font-geist-mono flex justify-end text-xs text-red-500'>
                {formattedTime}
              </span>
            </span>
          </div>

          {/* <p>
          <strong>2FA Status:</strong>{' '}
          {userDetails.twoFactorAuthStatus ? 'Enabled' : 'Disabled'}
        </p> */}
          {/* Add more fields as needed */}
        </div>
        <DialogClose asChild>
          <DialogFooter>
            <Button className='mt-4 w-full'>Done</Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailsModal
