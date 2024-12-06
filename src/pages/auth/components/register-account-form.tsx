import { HTMLAttributes, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { PasswordInput } from '@/components/custom/password-input'
import { CalendarIcon } from 'lucide-react'
import { useCreatePassword } from '@/lib/invites/hook'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { jwtDecode } from 'jwt-decode'

interface RegisterFormProps extends HTMLAttributes<HTMLDivElement> {}
const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[\W_]/, {
    message: 'Password must contain at least one special character',
  })

// Define form schema for password validation
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    dateOfBirth: z.date({
      required_error: 'A date of birth is required.',
    }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  useEffect(() => {
    const onboardingToken = sessionStorage.getItem('onboardingToken')
    if (onboardingToken) {
      const decodedToken: { email?: string } = jwtDecode(onboardingToken)
      setEmail(decodedToken.email || '')
    }
  }, [])
  const registerMutation = useCreatePassword()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const onboardingToken = sessionStorage.getItem('onboardingToken')
    if (onboardingToken) {
      registerMutation.mutate({
        firstname: data.firstName,
        lastname: data.lastName,
        dob: data.dateOfBirth.toISOString(),
        phoneNumber: data.phoneNumber,
        password: data.password,
      })
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <h1 className='text-2xl font-bold'>
        Welcome{' '}
        {email ? (
          <span>
            {email
              .split('@')[0] // Take everything before the "@".
              .split('.') // Split the username by ".".
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(' ')}{' '}
          </span>
        ) : (
          'Guest'
        )}
        !
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} className='py-4' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} className='py-4' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 gap-4'>
              {/* Phone Number Field with Nigerian Flag */}
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className='relative w-full'>
                        {/* Flag Icon and Country Code */}
                        <div className='absolute left-3 top-1/2 flex -translate-y-1/2 transform items-center space-x-2'>
                          <img
                            src='https://www.svgrepo.com/show/401711/flag-for-nigeria.svg'
                            alt='Nigerian flag'
                            className='h-6 w-6'
                          />
                          <span className='text-lg text-gray-700'>+234</span>
                        </div>
                        {/* Phone Number Input */}
                        <Input
                          type='tel'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          maxLength={11}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/\D/g, '')
                          }}
                          className='w-full rounded-md border py-6 pl-[90px] pr-4 text-lg text-gray-700'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full py-4 pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
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
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password Field */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder='Enter your password'
                      className='py-4'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*       Confirm Password Field */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      className='py-4'
                      placeholder='Confirm your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            {/* Enable 2FA Switch
            <div className='mt-2 flex items-center space-x-2 rounded bg-blue-50 p-4'>
              <InfoIcon className='text-blue-500 ' />
              <FormDescription className='text-sm'>
                <strong>Note:</strong> Two-factor authentication is required for
                enhanced security.
              </FormDescription>
            </div> */}

            <Button
              className='mt-4 py-4'
              type='submit'
              disabled={!form.formState.isValid}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
