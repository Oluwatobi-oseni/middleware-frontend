export default function Agile() {
  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='flex flex-col items-start justify-center gap-4'>
          <span className='text-lg font-medium text-muted-foreground'>
            Agile
          </span>
        </div>
        {/* Main */}
        <div className='w-full border'>
          <iframe
            src='https://agile.alertmfb.com.ng'
            className='h-screen w-full'
            title='Agile'
          ></iframe>
        </div>
      </div>
    </div>
  )
}
