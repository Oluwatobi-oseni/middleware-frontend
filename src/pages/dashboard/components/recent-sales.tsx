import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Obasi Miracle</p>
          <p className='text-sm text-muted-foreground'>obasi.mira@gmail.com</p>
        </div>
        <div className='font-geist-mono ml-auto font-medium'>+₦1,999.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Judas Lokoja</p>
          <p className='text-sm text-muted-foreground'>judas.loo@gmail.com</p>
        </div>
        <div className='font-geist-mono ml-auto font-medium'>+₦39.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Israel Victor</p>
          <p className='text-sm text-muted-foreground'>isrealite@gmail.com</p>
        </div>
        <div className='font-geist-mono ml-auto font-medium'>+₦299.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>White Kadiri</p>
          <p className='text-sm text-muted-foreground'>Kadiri@gmail.com</p>
        </div>
        <div className='font-geist-mono ml-auto font-medium'>+₦99.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Solomon David</p>
          <p className='text-sm text-muted-foreground'>davisd.sol@gmail.com</p>
        </div>
        <div className='font-geist-mono ml-auto font-medium'>+₦39.00</div>
      </div>
    </div>
  )
}
