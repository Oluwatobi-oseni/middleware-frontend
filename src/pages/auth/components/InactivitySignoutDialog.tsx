import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export const InactivityDialog = ({
  showDialog,
  countdown,
  onContinue,
}: {
  showDialog: boolean
  countdown: number
  onContinue: () => void
}) => {
  if (!showDialog) return null

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inactivity Warning</AlertDialogTitle>
          <AlertDialogDescription>
            You have been inactive for 5 minutes. You will be logged out in{' '}
            {Math.floor(countdown / 60)}:
            {(countdown % 60).toString().padStart(2, '0')} unless you take
            action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onContinue}>
            Continue Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
