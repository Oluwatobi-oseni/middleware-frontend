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
import { useDesignations } from '@/lib/users/hook'
import { useState } from 'react'

// Utility function to format designations
function formatDesignation(designation: string): string {
  return designation
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Schema for form validation
const AddTeamMemberSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  // .refine(
  //   (email) => /@(alertgroup\.com\.ng|alertmfb\.com\.ng)$/i.test(email),
  //   { message: 'Email must be from @alertgroup.com.ng or @alertmfb.com.ng' }
  // ),
  role: z.string().min(1, { message: 'Please select a role.' }),
  designationId: z
    .number()
    .int({ message: 'Please select a valid designation.' }),
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
      designationId: undefined,
    },
  })

  const inviteUserMutation = useInviteUser()
  const { data: designations, isLoading, isError } = useDesignations()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  function onSubmit(data: AddTeamMemberFormValues) {
    inviteUserMutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        setIsDialogOpen(false)
      },
      onError: () => {
        form.reset()
      },
    })

    // console.log(data)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            {/* Designation Input */}
            <div>
              <Label htmlFor='designation' className='text-xs font-light'>
                Designation
              </Label>
              <Select
                onValueChange={(value) =>
                  form.setValue('designationId', parseInt(value, 10))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a designation' />
                </SelectTrigger>
                <SelectContent>
                  {isLoading && <SelectItem value=''>Loading...</SelectItem>}
                  {isError && (
                    <SelectItem value=''>
                      Failed to load designations
                    </SelectItem>
                  )}
                  {designations?.map((designation) => (
                    <SelectItem
                      key={designation.id}
                      value={designation.id.toString()}
                    >
                      {formatDesignation(designation.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Role Selection */}
            <div className='mb-4'>
              <Label htmlFor='role' className='text-xs font-light'>
                Level
              </Label>
              <Select onValueChange={(value) => form.setValue('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='SENIOR'>Senior</SelectItem>
                  {/* <SelectItem value='SUPER_ADMIN'>Super Admin</SelectItem> */}
                  <SelectItem value='JUNIOR'>Junior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add Member Button */}
          <Button type='submit' className='mt-4 w-full'>
            {inviteUserMutation.isPending ? 'Adding...' : ' Add Member'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
