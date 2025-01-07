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
import { Send } from 'lucide-react'
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
        <div className='flex items-center justify-between rounded-lg border border-gray-300 p-4 shadow-md'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 shadow'>
              <Send className='h-6 w-6 text-blue-600' />
            </div>
            <div className='flex flex-col'>
              <p className='text-sm text-gray-700'>
                Transfer to {transaction.accountName}
              </p>
              <p className='text-xs text-gray-500'>
                {maskAccountNumber(transaction.accountNumber)}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p className='font-geist-mono text-2xl font-semibold text-black'>
              ₦{transaction.amount.toLocaleString()}
            </p>
            <Badge
              className={clsx(
                'px-2 py-1 text-white',
                isSuccessful ? 'bg-green-500' : 'bg-red-500'
              )}
            >
              {transaction.type}
            </Badge>
          </div>
        </div>
        <div className='mt-4 space-y-4'>
          <h1 className='text-xl font-semibold text-gray-800'>
            Transaction Details
          </h1>

          <div className='flex items-start justify-between'>
            <p className='font-medium text-gray-600'>Initiator Name</p>
            <div className='text-right'>
              <p className='text-sm font-semibold text-gray-800'>
                {transaction.accountName}
              </p>
              <p className='text-xs text-gray-500'>
                {maskAccountNumber(transaction.accountNumber)}
              </p>
            </div>
          </div>

          <div className='flex items-start justify-between'>
            <p className='font-medium text-gray-600'>Recipient Name</p>
            <div className='text-right'>
              <p className='text-sm font-semibold text-gray-800'>
                {transaction.accountName}
              </p>
              <p className='text-xs text-gray-500'>
                {maskAccountNumber(transaction.accountNumber)}
              </p>
            </div>
          </div>

          <div className=' flex items-center justify-between'>
            <p className='font-medium text-gray-600'>Transaction Type</p>
            <p className='text-lg  text-gray-800'>{transaction.activity}</p>
          </div>

          <div className=' flex items-center justify-between'>
            <p className='font-medium text-gray-600'>Reference Number</p>
            <p className='font-geist-mono text-lg text-gray-700'>
              {transaction.id}
            </p>
          </div>

          <div className='flex items-center justify-between'>
            <p className='font-medium text-gray-600'>Date</p>
            <p className='font-geist-mono text-lg text-gray-700'>
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
