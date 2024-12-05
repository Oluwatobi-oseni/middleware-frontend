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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useInviteUser } from '@/lib/invites/hook'

// Schema for form validation
const AddTeamMemberSchema = z.object({
  // firstName: z.string().min(1, { message: 'Please enter the first name.' }),
  // lastName: z.string().min(1, { message: 'Please enter the last name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  // .refine(
  //   (email) => /@(alertgroup\.com\.ng|alertmfb\.com\.ng)$/i.test(email),
  //   { message: 'Email must be from @alertgroup.com.ng or @alertmfb.com.ng' }
  // ),
  role: z.string().min(1, { message: 'Please select a role.' }),
  // designation: z.string().min(1, { message: 'Please enter a designation.' }),
})

type AddTeamMemberFormValues = z.infer<typeof AddTeamMemberSchema>

export function AddTeamMemberDialog() {
  const form = useForm<AddTeamMemberFormValues>({
    resolver: zodResolver(AddTeamMemberSchema),
    defaultValues: {
      // firstName: '',
      // lastName: '',
      email: '',
      role: '',
      // designation: '',
      // designation: '',
    },
  })

  const inviteUserMutation = useInviteUser()

  function onSubmit(data: AddTeamMemberFormValues) {
    inviteUserMutation.mutate(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default' className='flex gap-1 font-[Geist] text-xs'>
          <IconPlus className='h-4 w-4' />
          <span>Add a team member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='px-4 py-4 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <Separator className='my-2' />

        {/* Form Section */}
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Full Name Inputs */}
          {/* <div className='mb-4 grid grid-cols-2 gap-2'> */}
          {/* <div>
              <Label htmlFor='firstName' className='text-xs font-light'>
                First Name
              </Label>
              <Input
                id='firstName'
                placeholder='Enter first name'
                className='w-full placeholder:text-xs'
                autoComplete='off'
                {...form.register('firstName')}
              />
            </div> */}
          {/* <div>
              <Label htmlFor='lastName' className='text-xs font-light'>
                Last Name
              </Label>
              <Input
                id='lastName'
                placeholder='Enter last name'
                className='w-full placeholder:text-xs'
                autoComplete='off'
                {...form.register('lastName')}
              />
            </div> */}
          {/* </div> */}

          {/* Email Input */}
          <div className='mb-4'>
            <Label htmlFor='email' className='text-xs font-light'>
              Email Address
            </Label>
            <Input
              id='email'
              placeholder='Enter email'
              className='w-full placeholder:text-xs'
              autoComplete='off'
              {...form.register('email')}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {/* Role Selection */}
            <div className='mb-4'>
              <Label htmlFor='role' className='text-xs font-light'>
                Role
              </Label>
              <Select onValueChange={(value) => form.setValue('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='SENIOR'>Senior</SelectItem>
                  <SelectItem value='SUPER_ADMIN'>Super Admin</SelectItem>
                  <SelectItem value='JUNIOR'>Junior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Designation Input */}
            <div>
              <Label htmlFor='designation' className='text-xs font-light'>
                Designation
              </Label>
              <Input
                id='designation'
                placeholder='Enter designation'
                className='w-full placeholder:text-xs'
                autoComplete='off'
                // {...form.register('designation')}
              />
            </div>
          </div>

          {/* Add Member Button */}
          <Button
            type='submit'
            className='mt-4 w-full'
            // loading={inviteUserMutation.isPending}
            // loading={inviteUserMutation.isPending}
          >
            Add Member
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
