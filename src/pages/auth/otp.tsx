import { Card } from '@/components/ui/card'
import { Link, useLocation } from 'react-router-dom'
import { OtpForm } from './components/otp-form'
import { censorEmail } from '@/lib/auth/utilities/censorEmail'

export default function Otp() {
  const location = useLocation()
  const email = location.state?.email

  // Use the censorEmail function to get the censored version
  const censoredEmail = censorEmail(email)
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
                Two-factor Authentication
              </h1>
              <p className='text-sm text-muted-foreground'>
                Please enter the authentication code. <br /> We have sent the
                authentication code to your email: <span>{censoredEmail}</span>
              </p>
            </div>
            <OtpForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              Haven't received it?{' '}
              <Link
                to='/resent-new-code'
                className='underline underline-offset-4 hover:text-primary'
              >
                Resend a new code.
              </Link>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
