import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const profileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z
    .string({
      required_error: 'Please enter your email.',
    })
    .email('Invalid email format.'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits.')
    .max(15, 'Phone number must not be longer than 15 digits.'),
  bio: z.string().max(160).min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: 'Team manager.',
}

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <>
      <div className='my-8 flex items-center gap-4'>
        <Avatar className='h-24 w-24'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button className='rounded-xl' variant={'outline'}>
          Upload a new picture
        </Button>
        <Button className='rounded-xl' variant={'destructive'}>
          Delete
        </Button>
      </div>
      <Form {...form}>
        <h2 className='mb-4 mt-2 font-semibold'>Personal Information</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* First Name and Last Name Fields */}
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='First Name' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. You can only change this
                    once every 30 days.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Last Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='you@alertgroup.com.ng'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us a little bit about yourself'
                    className='resize-none'
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Brief description of your profile. URLs are hyperlinked
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full justify-end'>
            <Button type='submit'>Save Changes</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
