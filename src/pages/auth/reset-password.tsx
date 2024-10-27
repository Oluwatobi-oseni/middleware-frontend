import { Card } from '@/components/ui/card'
import { NewPasswordForm } from './components/reset-password-form'

export default function ResetPassword() {
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
          <div className='mb-4 flex items-center justify-center'></div>
          <Card className='p-6'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                Set new password
              </h1>
              <p className='text-sm text-muted-foreground'>
                Please create a new password and confirm it.
              </p>
            </div>
            <NewPasswordForm />
          </Card>
        </div>
      </div>
    </>
  )
}
