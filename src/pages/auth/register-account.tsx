import { Card } from '@/components/ui/card'
import { RegisterForm } from './components/register-account-form'
import { useLocation } from 'react-router-dom' // If using React Router
import { useEffect } from 'react'

export default function RegisterAccount() {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get('token')

  // Save token to sessionStorage on component mount
  useEffect(() => {
    if (token) {
      sessionStorage.setItem('onboardingToken', token)
    }
  }, [token])

  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <img
              src='https://alertmfb.com.ng/Logo.svg'
              alt='AlertLogo'
              className='h-20 w-20'
            />
          </div>
          <div className='mb-4 flex items-center justify-center'>
            <h1 className='text-3xl font-bold'>Welcome !</h1>{' '}
          </div>
          <Card className='p-6'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                Set Your Password
              </h1>
              <p className='text-sm text-muted-foreground'>
                Please set and confirm your password to complete your
                registration.
              </p>
            </div>
            <RegisterForm />
          </Card>
        </div>
      </div>
    </>
  )
}
