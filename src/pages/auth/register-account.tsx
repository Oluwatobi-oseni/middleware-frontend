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
      <div className='container relative grid h-svh flex-col items-center justify-center bg-black lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10  dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-black' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <img
              src='https://alertmfb.com.ng/Logo.svg'
              alt='AlertLogo'
              className='mr-2 h-6 w-6'
              style={{ filter: 'invert(1)' }}
            />
            Alert MFB
          </div>

          <img
            src='https://alertmfb.com.ng/Logo.svg'
            className='relative m-auto'
            width={301}
            height={60}
            alt='Alert MFB'
            // style={{ filter: 'invert(1)' }}
          />

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2 text-muted'>
              <p className='text-lg'>
                &ldquo;We fix it even if its not broken&rdquo;
              </p>
              <footer className='text-sm'>Alert group</footer>
            </blockquote>
          </div>
        </div>
        <div className='mx-auto flex flex-col justify-center space-y-2 sm:w-[640px]'>
          <Card className='p-14'>
            {/* <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                Set Your Password
              </h1>
              <p className='text-sm text-muted-foreground'>
                Please set and confirm your password to complete your
                registration.
              </p>
            </div> */}
            <RegisterForm />
          </Card>
        </div>
      </div>
    </>
  )
}
