import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
// import { Switch } from '@/components/ui/switch'
import { PasswordInput } from '@/components/custom/password-input'
import { CalendarIcon, InfoIcon } from 'lucide-react'
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
  const registerMutation = useCreatePassword()

  // Decode email from onboardingToken
  const onboardingToken = sessionStorage.getItem('onboardingToken')
  let email = ''
  if (onboardingToken) {
    const decodedToken: { email?: string } = jwtDecode(onboardingToken)
    email = decodedToken.email || ''
  }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Ayo' {...field} />
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
                      <Input placeholder='Bamidele' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date of Birth and Phone Number */}
            <div className='grid grid-cols-1 gap-2'>
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
                              'w-[240px] pl-3 text-left font-normal',
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
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type='tel'
                        placeholder='+234 123 456 789'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Field */}
              <FormItem className='space-y-1'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    value={email}
                    readOnly
                    className='cursor-not-allowed bg-gray-100 text-muted-foreground'
                  />
                </FormControl>
                <FormDescription className='text-sm text-muted-foreground'>
                  This email is associated with your account and cannot be
                  changed.
                </FormDescription>
              </FormItem>
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
                      placeholder='Confirm your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            {/* Enable 2FA Switch */}
            <FormItem className='mt-2 flex items-center space-x-2 rounded bg-blue-50 p-2'>
              <InfoIcon className='text-blue-500' /> {/* Important Info Icon */}
              <FormDescription className='text-sm'>
                <strong>Note:</strong> Two-factor authentication is required for
                enhanced security.
              </FormDescription>
            </FormItem>

            <Button className='mt-8' loading={registerMutation.isPending}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
