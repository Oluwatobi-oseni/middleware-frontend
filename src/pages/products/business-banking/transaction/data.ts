import { User } from './columns'

export const data: User[] = [
  {
    id: '1',
    accountName: 'Victor Bamidele',
    type: 'Withdrawal',
    amount: 'NGN 400,000',
    referenceId: 'REF123456789',
    date: '2024-10-01T12:30:00Z',
  },
  {
    id: '2',
    accountName: 'Dorcas Femi',
    type: 'Deposit',
    amount: 'NGN 200,000',
    referenceId: 'REF987654321',
    date: '2024-10-01T12:30:00Z',
  },
  {
    id: '3',
    accountName: 'Chika John',
    type: 'Card Deposit',
    amount: 'NGN 150,000',
    referenceId: 'REF567890123',
    date: '2024-10-01T12:30:00Z',
  },
]
