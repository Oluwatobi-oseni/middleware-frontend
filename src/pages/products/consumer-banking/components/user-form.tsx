import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { CheckCircleIcon, TriangleAlert } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function UserForm() {
  const navigate = useNavigate()
  const [isLein, setIsLein] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleLeinStatus = () => setIsDialogOpen(true)

  const confirmLeinToggle = () => {
    setIsLein(!isLein)
    setIsDialogOpen(false)
  }

  const cancelLeinToggle = () => setIsDialogOpen(false)

  const goToActivities = () => {
    const currentPath = window.location.pathname.replace(/\/$/, '')
    navigate(`${currentPath}/activities`)
  }
  const isInActivitiesPage = location.pathname.endsWith('/activities')
  return (
    <div className='p-2'>
      <div className='mb-4 mt-2 flex items-center justify-between border-b-2 border-gray-300 pb-2 lg:mt-8'>
        <h2 className='text-xl text-muted-foreground'>User Details</h2>

        {/* Right-aligned Section */}
        <div className='flex items-center space-x-4'>
          {/* KYC Status */}
          <div className='flex items-center space-x-1'>
            <span className='text-sm text-gray-600'>KYC:</span>
            <CheckCircleIcon className='h-5 w-5 text-green-500' />
            <span className='text-green-600'>Verified</span>
          </div>

          {/* Vertical Divider */}
          <div className='h-5 border-l border-gray-300'></div>

          {/* User Status Toggle */}
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-gray-600'>Lein Status</span>
            <Switch checked={isLein} onClick={toggleLeinStatus} />
          </div>

          {/* Vertical Divider */}
          <div className='h-5 border-l border-gray-300'></div>

          {/* Track Activities Badge */}
          {!isInActivitiesPage && (
            <Badge
              variant='outline'
              className='cursor-pointer border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
              onClick={goToActivities}
            >
              Track Activities
            </Badge>
          )}
        </div>
      </div>

      {/* Avatar and Alert Section */}
      <div className='mb-6 flex items-center justify-between space-x-6'>
        <div className='flex items-center space-x-3'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Alert displayed only when user is in lein */}
        {isLein && (
          <Alert className='w-full max-w-lg rounded-md border-l-4 border-red-600 bg-red-50 p-4 shadow-sm'>
            <div className='flex items-start'>
              <TriangleAlert className='h-12 w-12 text-red-600' />

              {/* Content Section */}
              <div className='ml-3'>
                <AlertTitle className='text-sm font-semibold text-red-700'>
                  User is on Lein
                </AlertTitle>
                <AlertDescription className='mt-1 text-sm text-red-700'>
                  This user is currently marked as being in lein. They are
                  restricted from certain actions and need to be cleared before
                  they regain full access.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
      </div>

      <form className='space-y-8'>
        <div className='rounded-lg border p-6'>
          <h3 className='mb-4 text-lg font-medium'>Personal Information</h3>
          <div className='grid grid-cols-3 gap-6'>
            {/* First Name */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='firstName'>First Name</Label>
              <Input
                type='text'
                id='firstName'
                placeholder='Victor'
                readOnly
                className='cursor-not-allowed bg-gray-100'
              />
            </div>

            {/* Last Name */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                type='text'
                id='lastName'
                placeholder='Bassey'
                readOnly
                className='cursor-not-allowed bg-gray-100'
              />
            </div>

            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                placeholder='Victor@alertgroup.com.ng'
                readOnly
                className='cursor-not-allowed bg-gray-100'
              />
            </div>

            {/* Date of Birth */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='dob'>Date of Birth</Label>
              <Input
                type='date'
                id='dob'
                readOnly
                className='cursor-not-allowed bg-gray-100 text-muted-foreground'
              />
            </div>

            {/* Phone Number */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                type='tel'
                id='phone'
                placeholder='08012345678'
                readOnly
                className='cursor-not-allowed bg-gray-100'
              />
            </div>

            {/* Joined Date */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='joinedDate'>Date Joined</Label>
              <Input
                type='date'
                id='joinedDate'
                readOnly
                className='cursor-not-allowed bg-gray-100 text-muted-foreground'
              />
            </div>
          </div>
        </div>

        <div className='rounded-lg border p-6'>
          <h3 className='mb-4 text-lg font-medium'>Address</h3>
          <div className='grid grid-cols-2 gap-6'>
            {/* Address */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='address'>Address</Label>
              <Input
                type='text'
                id='address'
                placeholder='No 132 Herbert Macaulay way, Yaba'
                readOnly
                className='cursor-not-allowed bg-gray-100'
              />
            </div>

            {/* Postal Code */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='postalcode'>Postal Code</Label>
              <Input
                type='text'
                id='postalcode'
                placeholder='LA 24B'
                readOnly
                className='cursor-not-allowed bg-gray-100'
              />
            </div>

            {/* Country */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='country'>Country</Label>
              <Input
                type='text'
                id='country'
                placeholder='NG'
                readOnly
                className='cursor-not-allowed bg-gray-100'
              />
            </div>

            {/* Last Login */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='lastLogin'>Last Login</Label>
              <div className='flex items-center justify-between rounded-md border p-2 text-sm text-muted-foreground'>
                <span>2024-11-01 10:15 AM</span>
                {/* <Button
                  variant={'ghost'}
                  className='text-blue-500 hover:underline'
                >
                  View Details
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isLein ? 'Disable Lein Status' : 'Enable Lein Status'}
            </DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to{' '}
            {isLein
              ? 'remove this customer from lein'
              : 'put this customer on lein'}
            ? This action will immediately change their status.
          </p>
          <DialogFooter>
            <Button variant='secondary' onClick={cancelLeinToggle}>
              Cancel
            </Button>
            <Button
              variant={isLein ? 'destructive' : 'default'}
              onClick={confirmLeinToggle}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
