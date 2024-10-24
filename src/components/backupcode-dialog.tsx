import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { IconDownload } from '@tabler/icons-react'
import { SelectSeparator } from './ui/select'

export function BackupCodeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex w-1/3 items-center gap-2 text-xs'>
          <IconDownload />
          <span>Backup Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>Backup Code</DialogTitle>
          <DialogDescription className='text-center'>
            Ensure the safety of your Backup Code by printing it or writing it
            on paper
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col items-center space-y-4'>
            <p className='text-sm'>89A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
          </div>

          {/* Second column of codes */}
          <div className='flex flex-col items-center space-y-4'>
            <p className='text-sm'>22A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
            <p className='text-sm'>22A3FE90</p>
          </div>
        </div>
        <SelectSeparator />
        <div className='text-sm'>
          <p>- You can only use each Backup Code once</p>
          <p>- Only the most recent Backup Code will be used</p>
        </div>
        <SelectSeparator />
        <DialogFooter>
          <Button>Create New Backup Code</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
