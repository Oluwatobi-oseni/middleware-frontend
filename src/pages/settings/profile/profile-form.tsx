import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImagePickerDialog } from './upload-image-dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

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
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  firstName: 'Victor',
  lastName: 'Chukwuma',
  email: sessionStorage.getItem('userEmail') || '',
  phoneNumber: '08012345678',
  dob: new Date('2023-01-23'),
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
      <div className='my-2 flex items-center gap-4'>
        <Avatar className='h-16 w-16'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ImagePickerDialog />
        <Button className='rounded-xl' variant={'destructive'}>
          Delete
        </Button>
      </div>
      <Form {...form}>
        <h2 className='my-8 font-semibold'>Personal Information</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12'>
          {/* First Name and Last Name Fields */}
          <div className='grid grid-cols-2 gap-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='First Name'
                      {...field}
                      disabled
                      // className='border-none shadow-none outline-none'
                    />
                  </FormControl>
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
                    <Input
                      placeholder='Last Name'
                      {...field}
                      disabled
                      // className='border-none shadow-none outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-2'>
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
                      disabled
                      // className='border-none shadow-none outline-none'
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
                    <Input
                      placeholder='Enter phone number'
                      {...field}
                      disabled
                      // className='border-none shadow-none outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <FormField
              control={form.control}
              name='dob'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          disabled
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            dayjs(field.value).format('MMM D, YYYY')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      // className='border-none shadow-none outline-none'
                    />
                  </FormControl>
                  {/* <FormDescription>
                  Brief description of your profile. URLs are hyperlinked
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  )
}
