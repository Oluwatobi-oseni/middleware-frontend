import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { CheckCircleIcon } from 'lucide-react'

export default function UserForm() {
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
            <Switch /> {/* Toggle switch component */}
          </div>

          {/* Vertical Divider */}
          <div className='h-5 border-l border-gray-300'></div>

          {/* Track Activities Badge */}
          <Badge variant='outline' className='border-green-500 text-green-500'>
            Track Activities
          </Badge>
        </div>
      </div>

      <form className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Avatar Upload */}
        <div>
          <Avatar className='h-20 w-20'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* First Name */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='firstName'>First Name</Label>
          <Input type='text' id='firstName' placeholder='Victor' />
        </div>

        {/* Last Name */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input type='text' id='lastName' placeholder='Bassey' />
        </div>

        {/* Username */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='username'>Username</Label>
          <Input type='text' id='username' placeholder='VictorAlert' />
        </div>

        {/* Date of Birth */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='dob'>Date of Birth</Label>
          <Input type='date' id='dob' />
        </div>

        {/* Phone Number */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input type='tel' id='phone' placeholder='08012345678' />
        </div>

        {/* Email */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            placeholder='Victor@alertgroup.com.ng'
          />
        </div>

        {/* Address */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='address'>Address</Label>
          <Input
            type='text'
            id='address'
            placeholder='No 132 Herbert Macaulay way, Yaba'
          />
        </div>

        <div className='grid w-full max-w-sm grid-cols-2 items-center gap-6'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='postalcode'>Postal Code</Label>
            <Input type='text' id='postalcode' placeholder='LA 24B' />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='country'>Country</Label>
            <Input type='text' id='country' placeholder='NG' />
          </div>
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='joinedDate'>Joined</Label>
          <Input type='date' id='joinedDate' />
        </div>

        {/* Last Login Date */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='lastLogin'>Last Login</Label>
          <div className='flex items-center justify-between rounded-md border p-2 text-sm text-gray-600'>
            <span>2024-11-01 10:15 AM</span> {/* Example static date */}
            <button className='text-blue-500 hover:underline'>
              View Details
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
