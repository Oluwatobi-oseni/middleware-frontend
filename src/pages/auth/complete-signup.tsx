import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import { useCompleteRegistration } from '@/lib/auth/hook'
import { SelectSeparator } from '@/components/ui/select'
import { IconInfoCircleFilled } from '@tabler/icons-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import SetupKeyInput from './components/setup-key'

export default function CompleteRegistration() {
  // Use the hook to handle the registration completion
  const completeRegistrationMutation = useCompleteRegistration()

  const email = 'email'
  const secret = 'secret'
  const handleContinue = () => {
    completeRegistrationMutation.mutate(email)
  }

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
          <Card className='mx-auto mt-4 max-w-md p-6'>
            <h2 className='mb-2 text-center text-lg font-bold'>
              Complete 2FA Signup
            </h2>
            <TooltipProvider>
              <p className='mb-4 text-center text-sm'>
                To activate authentication, please scan the QR code below from
                the authenticator app{' '}
              </p>
              <div className='mb-4 flex items-center justify-center'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <IconInfoCircleFilled className='ml-1 h-6 w-6 cursor-pointer' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='w-50 p-2'>
                    <img
                      src='data:image/png;base64,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'
                      alt='Authenticator'
                      className='mx-auto my-2 h-8'
                    />
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <div className='mb-2 flex flex-col items-center justify-center gap-4'>
              <QRCodeSVG
                size={180}
                value={`otpauth://totp/${email}?secret=${secret}`}
              />
              <Button
                className='mx-auto w-[180px]'
                onClick={handleContinue}
                loading={completeRegistrationMutation.isPending}
              >
                Continue
              </Button>
            </div>
            <div className='flex items-center'>
              <hr className='flex-grow' />
              <span className='text-xs'>OR Enter setup key manually</span>
              <hr className='flex-grow' />
            </div>
            <div className='mt-2 text-center text-sm'>
              {/* <div className='mx-auto my-2 flex w-full max-w-sm'> */}
              <SetupKeyInput />
              {/* </div> */}
              <SelectSeparator />

              <p className='rounded-md border-l-4 border-blue-500 bg-gray-800 p-2 text-sm font-medium text-white'>
                Using a laptop? Download the Authenticator app on your mobile
                device to complete setup.
              </p>

              <SelectSeparator />
            </div>
            <div className='mx-auto my-2 flex flex-shrink-0 items-center justify-center space-x-4 md:ml-auto md:mr-0'>
              <a
                href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200 focus:outline-none'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='h-5 w-5' // Reduced size
                  viewBox='0 0 512 512'
                >
                  <path d='M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z'></path>
                </svg>
                <span className='ml-2 flex flex-col items-start leading-none'>
                  <span className='text-xs text-gray-600'>GET IT ON</span>
                  <span className='title-font text-sm font-medium'>
                    Google Play
                  </span>{' '}
                  {/* Reduced font size */}
                </span>
              </a>
              <a
                href='https://www.apple.com/app-store/'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200 focus:outline-none'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='h-5 w-5' // Reduced size
                  viewBox='0 0 305 305'
                >
                  <path d='M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z'></path>
                  <path d='M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z'></path>
                </svg>
                <span className='ml-2 flex flex-col items-start leading-none'>
                  <span className='text-xs text-gray-600'>Download on the</span>
                  <span className='title-font text-sm font-medium'>
                    App Store
                  </span>{' '}
                  {/* Reduced font size */}
                </span>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
