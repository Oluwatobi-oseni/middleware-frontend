import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface DeleteUserDialogProps {
  username: string
  onClose: () => void // Define onClose as a function that returns void
}

export function DeleteUserDialog({ username, onClose }: DeleteUserDialogProps) {
  const handleDelete = () => {
    // Logic for deleting the user goes here
    console.log(`Deleting user: ${username}`)

    // After deletion logic, close the dialog
    onClose()
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant={'destructive'} className='w-full'>
          Yes, Remove
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-xs'>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {username}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type='button' variant={'destructive'} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
