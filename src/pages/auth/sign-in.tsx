import { UserAuthForm } from './components/user-auth-form'
// import ViteLogo from '@/assets/vite.svg'
import AlertLogo from '@/assets/Alert.png'

export default function SignIn() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <img
              src={AlertLogo}
              alt='AlertLogo'
              className='mr-2 h-6 w-6'
              // style={{ filter: 'invert(1)' }}
              // style={{
              //   objectFit: 'contain',
              //   filter: 'brightness(1.5) contrast(1.2)',
              //   boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
              // }}
              style={{
                objectFit: 'contain',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '4px',
              }}
            />
            Alert MFB
          </div>

          <img
            src={AlertLogo}
            className='relative m-auto'
            width={301}
            height={60}
            alt='Alert MFB'
            style={{ filter: 'invert(1)' }}
          />

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>&ldquo;If it works dont break it&rdquo;</p>
              <footer className='text-sm'>Mr Tobi</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below <br />
                to log into your account
              </p>
            </div>
            <UserAuthForm />
            {/* <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  )
}
