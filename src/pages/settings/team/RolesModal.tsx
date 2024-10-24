import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { IconRadar } from '@tabler/icons-react'

const RolesModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='flex gap-1 font-[Geist] text-xs'>
          <IconRadar className='h-4 w-4' />
          <span>Manage Roles</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='px-4 py-4 sm:max-w-[425px]'>
        {' '}
        {/* Add padding here */}
        <DialogHeader>
          <DialogTitle>Manage Roles</DialogTitle>
        </DialogHeader>
        <Separator className='my-2' />
      </DialogContent>
    </Dialog>
  )
}

export default RolesModal
