import { useState } from 'react'
import { BackupCodeDialog } from '@/components/backupcode-dialog'

export default function SetupKeyInput({ setupKey }: { setupKey: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    const uppercaseKey = setupKey.toUpperCase()
    navigator.clipboard.writeText(uppercaseKey).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div className='my-2 w-full max-w-lg'>
      <label
        htmlFor='setup-key'
        className='mb-1 block text-left text-xs font-medium text-muted-foreground'
      >
        Setup key
      </label>
      <div className='flex items-center space-x-2'>
        <div className='relative flex-grow'>
          <input
            id='setup-key'
            type='text'
            className='w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-muted-foreground placeholder:text-xs focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400'
            // placeholder={'050211e53ed564ace50406'}
            value={setupKey}
            // disabled
            readOnly
          />
          <button
            onClick={handleCopy}
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            aria-label='Copy setup key'
          >
            {isCopied ? (
              <svg
                className='h-4 w-4 text-blue-700 dark:text-blue-500'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 16 12'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5.917 5.724 10.5 15 1.5'
                />
              </svg>
            ) : (
              <svg
                className='h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 18 20'
              >
                <path d='M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z' />
              </svg>
            )}
          </button>
          <div
            role='tooltip'
            className={`absolute bottom-12 right-2 z-10 w-auto rounded-lg bg-muted-foreground px-3 py-2 text-sm font-medium  shadow-sm transition-opacity duration-300 dark:bg-gray-700 ${
              isCopied ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </div>
        </div>
        <BackupCodeDialog />
      </div>
    </div>
  )
}
