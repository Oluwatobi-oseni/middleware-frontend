import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Transaction } from '../POS/PosTransactionDetails/columns'
import { DownloadDialog } from './download'
import { Separator } from '@/components/ui/separator'
import { Check, Send, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import clsx from 'clsx'

type TransactionDetailsDialogProps = {
  transaction: Transaction
  onClose: () => void
}

export const ActivityDetailsDialog: React.FC<TransactionDetailsDialogProps> = ({
  transaction,
  onClose,
}) => {
  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length < 10) return accountNumber
    return `${accountNumber.slice(0, 2)}******${accountNumber.slice(-2)}`
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isSuccessful = transaction.type.toLowerCase() === 'successful'

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className='flex items-center justify-between px-4'>
            <DialogTitle>Activity Details</DialogTitle>
            <DownloadDialog />
          </div>
        </DialogHeader>
        <Separator />
        <div className='my-4 flex items-center justify-between rounded-lg border border-gray-300 px-4 py-8 shadow-md'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 shadow'>
              <Send className='h-6 w-6 text-blue-600' />
            </div>
            <div className='flex flex-col'>
              <p className='text-sm text-muted-foreground'>
                Transfer to {transaction.accountName}
              </p>
              <p className='text-xs text-muted-foreground'>
                {maskAccountNumber(transaction.accountNumber)}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p className='font-geist-mono text-2xl font-semibold text-muted-foreground'>
              ₦{transaction.amount.toLocaleString()}
            </p>
            <Badge
              className={clsx(
                'flex items-center gap-1 px-2 py-1 text-white',
                isSuccessful ? 'bg-green-500' : 'bg-red-500'
              )}
            >
              {isSuccessful ? (
                <Check className='h-4 w-4' aria-label='Success' />
              ) : (
                <X className='h-4 w-4' aria-label='Failed' />
              )}
              {transaction.type}
            </Badge>
          </div>
        </div>
        <div className='mb-4 space-y-4'>
          <h1 className='text-lg text-muted-foreground'>Transaction Details</h1>

          <div className='flex items-start justify-between'>
            <p className='font-medium'>Initiator Name</p>
            <div className='text-right'>
              <p className='text-sm '>{transaction.accountName}</p>
              <p className='text-xs '>
                {maskAccountNumber(transaction.accountNumber)}
              </p>
            </div>
          </div>

          <div className='flex items-start justify-between'>
            <p className='font-medium '>Recipient Name</p>
            <div className='text-right'>
              <p className='text-sm'>{transaction.accountName}</p>
              <p className='text-xs '>
                {maskAccountNumber(transaction.accountNumber)}
              </p>
            </div>
          </div>

          <div className=' flex items-center justify-between'>
            <p className='font-medium '>Transaction Type</p>
            <p className='text-sm '>{transaction.activity}</p>
          </div>

          <div className=' flex items-center justify-between'>
            <p className='font-medium '>Reference Number</p>
            <p className='font-geist-mono 0 text-sm'>{transaction.id}</p>
          </div>

          <div className='flex items-center justify-between'>
            <p className='font-medium '>Date</p>
            <p className='font-geist-mono text-sm '>
              {formatDate(transaction.date)}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type='button' className='w-full' onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
