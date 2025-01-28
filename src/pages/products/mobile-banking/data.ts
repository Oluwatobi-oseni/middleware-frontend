import { User } from './columns'

export const data: User[] = [
  {
    id: '1',
    name: 'Adeyemi OluwaPosi',
    type: 'Debit',
    currency: 'NGN',
    paymentType: 'Withdrawal',
    time: '07:18:46 PM',
    amount: 5000,
    date: 'October 29, 2024',
    status: 'Successful',
  },
  {
    id: '2',
    name: 'Ige Ngozi',
    type: 'Credit',
    currency: 'NGN',
    paymentType: 'Convert',
    time: '10:45:12 AM',
    amount: 1500,
    date: 'October 30, 2024',
    status: 'Failed',
  },
  {
    id: '3',
    name: 'Femi Lawal',
    type: 'Debit',
    currency: 'NGN',
    paymentType: 'Withdrawal',
    time: '03:50:30 PM',
    amount: 12000,
    date: 'October 28, 2024',
    status: 'Successful',
  },
]
