import { PosTransaction } from './columns'

export const data: PosTransaction[] = [
  {
    id: 1,
    provider: 'Alert POS',
    narration: 'Sent money to 11****99',
    type: 'Virtual Account',
    amount: 5000,
    transactionId: 'TXN123456',
    date: '2024-01-10T14:30:00.000Z',
  },
  {
    id: 2,
    provider: 'ErrandPay',
    narration: 'Received payment from 22****88',
    type: 'Card',
    amount: 12000,
    transactionId: 'TXN654321',
    date: '2024-01-11T10:15:00.000Z',
  },
  {
    id: 3,
    provider: 'PayCliq',
    narration: 'Refunded to 33****77',
    type: 'Virtual Account',
    amount: 7500,
    transactionId: 'TXN789012',
    date: '2024-01-12T16:00:00.000Z',
  },
  {
    id: 4,
    provider: 'Grupp',
    narration: 'Payment for service 44****66',
    type: 'Card',
    amount: 30000,
    transactionId: 'TXN987654',
    date: '2024-01-13T09:45:00.000Z',
  },
]
