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

type DeactivatePOSDialogProps = {
  onDeactivate: () => void
  onCancel: () => void
}

export const DeactivatePOSDialog: React.FC<DeactivatePOSDialogProps> = ({
  onDeactivate,
  onCancel,
}) => {
  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogTrigger asChild>
        <Button variant='outline' className='text-red-600'>
          Deactivate POS
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Deactivate POS</DialogTitle>
          <DialogDescription>
            Are you sure you want to deactivate this POS? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={onDeactivate}>
            Deactivate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
