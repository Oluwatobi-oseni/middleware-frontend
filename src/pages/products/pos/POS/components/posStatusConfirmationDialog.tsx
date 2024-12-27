import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface POSStatusConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedValue: 'Activated' | 'Pending' | 'Deactivated'
  handleConfirm: () => void
}

export function POSStatusConfirmationDialog({
  open,
  onOpenChange,
  selectedValue,
  handleConfirm,
}: POSStatusConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Confirm Selection</DialogTitle>
          <DialogDescription>
            Are you sure you want to {selectedValue} the POS?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleConfirm}>Yes, I'm sure</Button>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
