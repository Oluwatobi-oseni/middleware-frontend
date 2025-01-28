import { User } from './columns'

export const data: User[] = [
  {
    id: '1',
    transactionName: 'Withdrawal',
    transactionDescription: 'Withdrawal from ATM',
    type: 'Debit',
    paymentType: 'Withdrawal',
    date: 'October 29, 2024',
  },
  {
    id: '2',
    transactionName: 'Loan Disbursement',
    transactionDescription: 'Disbursed loan amount of NGN 10,000',
    type: 'Credit',
    paymentType: 'Convert',
    date: 'October 30, 2024',
  },
  {
    id: '3',
    transactionName: 'Withdrawal',
    transactionDescription: 'Withdrawal at bank branch',
    type: 'Debit',
    paymentType: 'Withdrawal',
    date: 'October 28, 2024',
  },
]
