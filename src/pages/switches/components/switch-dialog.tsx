import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Check, X } from 'lucide-react'
import { IconToggleLeft } from '@tabler/icons-react'
import { useState } from 'react'

interface SwitchProviderDialogProps {
  isActive: boolean
  toggleProvider: () => void
}

export function SwitchProviderDialog({
  isActive,
  toggleProvider,
}: SwitchProviderDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const confirmSwitch = () => {
    toggleProvider()
    toast({
      title: 'Provider Switch Successful!',
      description: `The provider has been switched to ${isActive ? 'Refyl' : 'Dojah'}.`,
    })
    setIsDialogOpen(false) // Close the dialog after confirmation
  }

  const cancelSwitch = () => {
    setIsDialogOpen(false) // Close the dialog when "Cancel" is clicked
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center gap-2'
          onClick={() => setIsDialogOpen(true)}
        >
          <IconToggleLeft className='mr-1' />
          {isActive ? 'Switch to Refyl' : 'Switch to Dojah'}
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Confirm Provider Switch</DialogTitle>
        </DialogHeader>

        <div className='py-4'>
          <p className='text-sm'>
            Are you sure you want to switch to {isActive ? 'Refyl' : 'Dojah'}?
            This will update the active provider for your system.
          </p>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={cancelSwitch} className='mr-2'>
            <X size={16} className='mr-2' /> Cancel
          </Button>
          <Button onClick={confirmSwitch} className='flex items-center gap-2'>
            <Check size={16} className='mr-2' />
            Confirm Switch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
