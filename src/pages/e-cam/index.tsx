export default function Ecam() {
  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='flex flex-col items-start justify-center gap-4'>
          <span className='text-lg font-medium text-muted-foreground'>
            E-CAM
          </span>
        </div>
        {/* Main */}
        <div className='w-full border'>
          <iframe
            src='https://cam-portal.alertmfb.com.ng'
            className='h-screen w-full'
            title='E-CAM'
          ></iframe>
        </div>
      </div>
    </div>
  )
}
