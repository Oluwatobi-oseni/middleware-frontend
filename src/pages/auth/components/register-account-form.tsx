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
import { InfoIcon } from 'lucide-react'
import { useCreatePassword } from '@/lib/invites/hook'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const onboardingToken = sessionStorage.getItem('onboardingToken')
    if (onboardingToken) {
      registerMutation.mutate({
        token: onboardingToken, // Pass the token
        password: data.password,
      })
    }
  }
  registerMutation.isSuccess && navigate('/complete-signup')
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
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
