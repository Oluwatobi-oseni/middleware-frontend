import { useAuth } from '@/lib/auth/hook'
import { UserAuthForm } from './components/user-auth-form'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function SignIn() {
  const { isSignedIn } = useAuth()

  useEffect(() => {
    sessionStorage.removeItem('tempToken')
    sessionStorage.removeItem('hasPassedLogin')
    sessionStorage.removeItem('is2FAVerified')
    sessionStorage.removeItem('userEmail')
  }, [])

  if (isSignedIn) {
    return <Navigate to={'/dashboard'} />
  }

  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
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
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;We fix it even if its not broken&rdquo;
              </p>
              <footer className='text-sm'>Alert group</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password <br />
                to access your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
