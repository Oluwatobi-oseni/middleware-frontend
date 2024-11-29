import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { CheckCircleIcon } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

export default function UserForm() {
  const navigate = useNavigate()

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
            <span className='text-sm text-gray-600'>User Status</span>
            <Switch defaultChecked /> {/* Toggle switch component */}
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

      <form className='space-y-8'>
        {/* Avatar Upload */}
        <div className='w-full'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

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
                className='cursor-not-allowed bg-gray-100'
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
                className='cursor-not-allowed bg-gray-100'
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
              <div className='flex items-center justify-between rounded-md border p-2 text-sm text-gray-600'>
                <span>2024-11-01 10:15 AM</span>
                <button className='text-blue-500 hover:underline'>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
