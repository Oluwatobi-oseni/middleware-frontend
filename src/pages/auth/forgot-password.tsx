import { Card } from '@/components/ui/card'
import { ForgotPasswordForm } from './components/forgot-form'

export default function ForgotPassword() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <img
              src='https://alertmfb.com.ng/Logo.svg'
              alt='Alert MFB Logo'
              className='h-20 w-20'
            />
          </div>
          <Card className='p-6'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                Forgot Password
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your registered email and <br /> we will send you a link
                to reset your password.
              </p>
            </div>
            <ForgotPasswordForm />
          </Card>
        </div>
      </div>
    </>
  )
}
