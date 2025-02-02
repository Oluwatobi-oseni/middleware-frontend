import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { PosDevice } from './posDevice/columns'
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'

type POSDetailsDialogProps = {
  pos: PosDevice
  onClose: () => void
}

const POSDialog: React.FC<POSDetailsDialogProps> = ({ pos, onClose }) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{pos.posName}</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>POS Name</span>
            <span>{pos.posName}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Status</span>
            <Select
            // value={status} onValueChange={setStatus}
            >
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Activated'>Activated</SelectItem>
                <SelectItem value='Pending'>Pending</SelectItem>
                <SelectItem value='Deactivated'>Deactivated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Device Type</span>
            <span>{pos.deviceType}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>POS Serial Number</span>
            <span>{pos.serialNumber}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Last Synced</span>
            <span>{pos.lastSynced}</span>
          </div>
          {/* <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Status</span>
            <span
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                pos.status === 'Active'
                  ? 'border border-green-500 bg-green-100 text-green-700'
                  : 'border border-red-500 bg-red-100 text-red-700'
              }`}
            >
              {provider.status || 'Active'}
            </span>
          </div> */}
          {/* <div className='flex justify-between'>
            <span className='text-muted-foreground'>Date Applied</span>
            <span>
              {pos.lastSynced ? (
                <>
                  <span className='font-geist-mono'>
                    {pos.dateApplied.split(' ')[0]}{' '}
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
          </div> */}
          {/* <div className='flex justify-between'>
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
          </div> */}
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default POSDialog
