import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { User } from './columns'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Button } from '@/components/custom/button'
import { Separator } from '@/components/ui/separator'
import { CircleCheckBig } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

type TransactionDetailsDialogProps = {
  transaction: User
  onClose: () => void
}

const transactionOutcome: string = 'Successful'

const TransactionDetailsDialog: React.FC<TransactionDetailsDialogProps> = ({
  transaction,
  onClose,
}) => {
  const originalDate = transaction.date
  const formattedDate = format(new Date(originalDate), 'dd MMM, yyyy')
  const formattedTime = format(new Date(originalDate), 'hh:mm ')
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sent</DialogTitle>
        </DialogHeader>
        <div>
          <div className='flex items-center justify-between p-2'>
            <span className='flex items-center gap-1'>
              ₦
              <span className='font-geist-mono text-3xl'>
                {transaction.amount}
              </span>
            </span>
            <Badge
              className={`${
                transactionOutcome === 'Successful'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {transactionOutcome}
            </Badge>
          </div>
          <div className='p-2'>
            <h3 className='mb-2 text-sm font-semibold text-muted-foreground'>
              Payment Details
            </h3>
            <div className='flex gap-2 rounded-lg border border-muted p-4 text-sm text-muted-foreground'>
              <div className='flex flex-col items-center gap-2'>
                <CircleCheckBig className='text-green-500' />
                <div className='h-full w-0.5 bg-green-500' />
                <CircleCheckBig className='text-green-500' />
              </div>
              <div className='w-full space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col'>
                    <span>{transaction.accountName}</span>{' '}
                    <span className='text-xs'>{transaction.type}</span>
                  </div>
                  <span className='flex flex-col'>
                    <span className='font-geist-mono'>{formattedDate}</span>
                    <span className='font-geist-mono flex justify-end text-xs text-red-500'>
                      {formattedTime}
                    </span>
                  </span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col'>
                    <span>Alert Micro Finance Bank</span>{' '}
                    <span className='text-xs'>
                      Alert Savings - {transaction.accountName}
                    </span>
                  </div>
                  <span className='flex flex-col'>
                    <span className='font-geist-mono'>{formattedDate}</span>
                    <span className='font-geist-mono flex justify-end text-xs text-red-500'>
                      {formattedTime}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details Section */}
          <div className='mb-4 p-2'>
            <h3 className='mb-2 text-sm font-semibold text-muted-foreground'>
              Transaction Details
            </h3>
            <div className='space-y-4 text-sm text-muted-foreground'>
              <div className='flex items-center justify-between gap-2'>
                <span>Amount</span>{' '}
                <span className='font-geist-mono'>₦ {transaction.amount}</span>
              </div>
              <div className='flex items-center justify-between gap-2'>
                <span>Transaction Type</span> <span>{transaction.type}</span>
              </div>
              <div className='flex items-center justify-between gap-2'>
                <span>Transaction Reference</span>{' '}
                <span className='font-geist-mono'>
                  {transaction.referenceId}
                </span>
              </div>
              {transactionOutcome === 'Failed' && (
                <Alert>
                  {/* <Terminal className='h-4 w-4' /> */}
                  {/* <AlertTitle>Transaction failed</AlertTitle> */}
                  <AlertDescription className='text-xs'>
                    Transaction failed due to insufficient fund
                    <br />
                    Reference ID:{' '}
                    <span className='font-geist-mono'>
                      {transaction.referenceId}
                    </span>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant={'default'} onClick={onClose} className='w-full'>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionDetailsDialog
