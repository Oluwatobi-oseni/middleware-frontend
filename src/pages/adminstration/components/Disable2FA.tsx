import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDisable2FA } from '@/lib/users/hook'

type Props = {
  userId: number
  has2FAEnabled: boolean
}

export const Disable2FAComponent: React.FC<Props> = ({
  userId,
  has2FAEnabled,
}) => {
  const { mutate: disable2FA, isPending } = useDisable2FA()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const handle2FAChange = async () => {
    try {
      await disable2FA(userId)
      setIsDialogOpen(false) // Close dialog on success
    } catch (error) {
      // Handle error (optional)
      console.error('Error disabling 2FA:', error)
    }
  }

  return (
    <div>
      <button
        className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm ${
          has2FAEnabled
            ? 'border border-green-300 bg-green-100 text-green-800'
            : 'border border-red-300 bg-red-100 text-red-800'
        }`}
        onClick={toggleDialog}
        disabled={isPending} // Disable the button while the mutation is loading
      >
        {isPending
          ? 'Updating...' // Show loading text while mutation is in progress
          : has2FAEnabled
            ? 'ON'
            : 'OFF'}
      </button>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Disable 2FA</DialogTitle>
            <DialogDescription>
              Are you sure you want to disable 2FA for this user? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='secondary' onClick={toggleDialog}>
              Cancel
            </Button>
            <Button onClick={handle2FAChange} disabled={isPending}>
              {isPending ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
