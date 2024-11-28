export default function Workspace() {
  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='flex flex-col items-start justify-center gap-4'>
          <span className='text-lg font-medium text-muted-foreground'>
            Workspace
          </span>
        </div>
        {/* Main */}
        <div className='w-full border'>
          <iframe
            src='https://workspace.alertmfb.com.ng'
            className='h-screen w-full'
            title='Workspace'
          ></iframe>
        </div>
      </div>
    </div>
  )
}
