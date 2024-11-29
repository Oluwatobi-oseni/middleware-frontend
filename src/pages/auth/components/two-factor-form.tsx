import { HTMLAttributes, useState } from 'react'
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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PinInput, PinInputField } from '@/components/custom/pin-input'
import { useVerifyOTP } from '@/lib/auth/hook'

interface OtpFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  otp: z.string().min(6, { message: 'Please enter the 6-digit code.' }),
})

export function OtpForm({ className, ...props }: OtpFormProps) {
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const verifyOTPMutation = useVerifyOTP()
  const maxRetries = 5

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    verifyOTPMutation.mutate(
      { otp: data.otp },
      {
        onSuccess: () => {
          setIsLoading(false)
          form.reset()
          setIsSubmitted(false) // Reset the submission state on success
        },
        onError: () => {
          setIsLoading(false)
          setIsSubmitted(true)
        },
      }
    )
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <h2 className='text-lg font-semibold'>Two-Factor Authentication</h2>
            <p className='text-sm text-gray-600'>
              Enter the 6-digit code from your Google Authenticator app.
            </p>

            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <PinInput
                      {...field}
                      className='flex h-10 justify-between'
                      onComplete={() => setDisabledBtn(false)}
                      onIncomplete={() => setDisabledBtn(true)}
                    >
                      {Array.from({ length: 6 }, (_, i) => (
                        <PinInputField
                          key={i}
                          component={Input}
                          className={`${
                            isSubmitted && form.getFieldState('otp').invalid
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                      ))}
                    </PinInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {verifyOTPMutation.retryCount > 0 && (
              <p className='text-center text-xs text-red-600'>
                You have {maxRetries - verifyOTPMutation.retryCount} out of{' '}
                {maxRetries} attempts left.
              </p>
            )}
            <Button className='mt-2' disabled={disabledBtn || isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
