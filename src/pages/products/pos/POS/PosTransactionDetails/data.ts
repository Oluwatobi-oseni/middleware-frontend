import { Transaction } from './columns'

export const transactionData: Transaction[] = [
  {
    id: '1',
    accountName: 'Doracs Femi',
    accountNumber: '1234567890',
    type: 'Successful',
    activity: 'Withdraw money with card',
    amount: 5000,
    paymentMethod: 'Card Withdrawal',
    date: '2023-10-10T14:30:00.000Z',
  },
  {
    id: '2',
    accountName: 'Temitayo Dayo',
    accountNumber: '9876543210',
    type: 'Failed',
    activity: 'Pay with transfer',
    amount: -2000,
    paymentMethod: 'Pay with Transfer',
    date: '2023-10-11T10:15:00.000Z',
  },
  {
    id: '3',
    accountName: 'Onyebuchi Eze',
    accountNumber: '4567891230',
    type: 'Successful',
    activity: 'Deposit money',
    amount: 10000,
    paymentMethod: 'Bank Transfer',
    date: '2023-10-12T09:00:00.000Z',
  },
]
