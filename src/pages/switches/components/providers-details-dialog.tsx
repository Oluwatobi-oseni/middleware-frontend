// import { Button } from '@/components/custom/button'
import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { IconEye } from '@tabler/icons-react'

interface Provider {
  customerName: string
  status: string
  dateApplied: string
  dateVerified: string
}
type ProviderDetailsDialogProps = {
  provider: Provider
}

export const ProviderDetailsDialog = ({
  provider,
}: ProviderDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {' '}
        <Button variant={'ghost'} className='text-xs'>
          <IconEye className='text-muted-200 mr-1 h-4 w-4' />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-sm'>
        <DialogHeader>
          <DialogTitle>{provider.customerName}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Provider Name</span>
            <span>{provider.customerName}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Status</span>
            <span
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                provider.status === 'Active'
                  ? 'border border-green-500 bg-green-100 text-green-700'
                  : 'border border-red-500 bg-red-100 text-red-700'
              }`}
            >
              {provider.status || 'Active'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Date Applied</span>
            <span>
              {provider.dateVerified ? (
                <>
                  <span className='font-geist-mono'>
                    {provider.dateApplied.split(' ')[0]}{' '}
                    {provider.dateApplied.split(' ')[1]}{' '}
                    {provider.dateApplied.split(' ')[2]}
                  </span>
                  <span className='font-geist-mono block text-right text-xs font-semibold text-red-500'>
                    {provider.dateApplied.split(' ')[3]}
                  </span>
                </>
              ) : (
                '20 Oct, 2024 14:10'
              )}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Date Verified</span>
            <span>
              {provider.dateVerified ? (
                <>
                  <span className='font-geist-mono'>
                    {provider.dateVerified.split(' ')[0]}{' '}
                    {provider.dateVerified.split(' ')[1]}{' '}
                    {provider.dateVerified.split(' ')[2]}
                  </span>
                  <span className='font-geist-mono block text-right text-xs font-semibold text-red-500'>
                    {provider.dateVerified.split(' ')[3]}
                  </span>
                </>
              ) : (
                '20 Oct, 2024 14:10'
              )}
            </span>
          </div>
        </div>
        <DialogClose asChild>
          <DialogFooter>
            <Button className='mt-4 w-full'>Done</Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
