import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { IconCards, IconRouteAltLeft } from '@tabler/icons-react'
import { useToast } from '@/components/ui/use-toast'

interface POSModalProps {
  onClose: () => void // Define the type for onClose
}

const POSModal: React.FC<POSModalProps> = ({ onClose }) => {
  const { toast } = useToast()
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center'>
            <IconRouteAltLeft size={18} className='mr-2' />
            Request POS Options
          </DialogTitle>
          <DialogDescription>
            Choose from the available POS options for your business.
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='rounded-lg border p-4 hover:shadow-md'>
            <div className='mb-4 flex size-10 items-center justify-center rounded-lg bg-muted p-2'>
              <IconCards size={18} />
            </div>
            <h2 className='mb-1 text-sm font-semibold'>
              POS Full Touch Screen
            </h2>
            <p className='text-xs text-gray-500'>
              A full touch screen POS system.
            </p>
            <Button
              onClick={() => {
                toast({
                  title: 'POS Request',
                  description: 'POS Full Touch Screen Selected',
                })
              }}
              className='mt-4'
            >
              Request
            </Button>
          </div>
          <div className='rounded-lg border p-4 hover:shadow-md'>
            <div className='mb-4 flex size-10 items-center justify-center rounded-lg bg-muted p-2'>
              <IconCards size={18} />
            </div>
            <h2 className='mb-1 text-sm font-semibold'>
              POS Half Touch Screen
            </h2>
            <p className='text-xs text-gray-500'>
              A half touch screen POS system.
            </p>
            <Button
              onClick={() => {
                toast({
                  title: 'POS Request',
                  description: 'POS Half Touch Screen Selected',
                })
              }}
              className='mt-4'
            >
              Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default POSModal
