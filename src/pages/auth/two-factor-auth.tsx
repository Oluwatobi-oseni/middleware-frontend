import { Card } from '@/components/ui/card'
import { Navigate } from 'react-router-dom'
import { OtpForm } from './components/two-factor-form'
import { useAuth } from '@/lib/auth/hook'
// import { useEffect } from 'react'

export default function TwoFactorAuthenticationPage() {
  //   window.location.reload()
  const { isSignedIn } = useAuth()
  const is2FAVerified = sessionStorage.getItem('is2FAVerified') === 'true'
  const hasPassedSignIn = sessionStorage.getItem('hasPassedLogin') === 'true'

  // const is2FAVerified = sessionStorage.getItem('is2FAVerified') === 'true'
  if (!hasPassedSignIn) {
    return <Navigate to={'/sign-in'} replace={true} />
  }

  if (isSignedIn && is2FAVerified) {
    return <Navigate to={'/dashboard'} replace={true} />
  }

  return (
    <div className='container grid h-screen flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <img
            src='https://alertmfb.com.ng/Logo.svg'
            alt='Alert MFB Logo'
            className='h-20 w-20'
          />
        </div>
        <Card className='p-6'>
          <OtpForm />
        </Card>
      </div>
    </div>
  )
}
