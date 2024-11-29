export default function Support() {
  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='flex flex-col items-start justify-center gap-4'>
          <span className='text-lg font-medium text-muted-foreground'>
            Support
          </span>
        </div>
        {/* Main */}
        <div className='w-full border'>
          <iframe
            src='https://support.alertmfb.com.ng'
            className='h-screen w-full'
            title='Support'
          ></iframe>
        </div>
      </div>
    </div>
  )
}
