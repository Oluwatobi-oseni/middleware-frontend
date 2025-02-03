import { Transaction } from './columns'

export const transactionData: Transaction[] = [
  {
    id: '1',
    name: 'Blaise Pascal',
    type: 'Deposit',
    amount: '500000',
    reference: 'REF12345',
    dateJoined: '2024-10-10T14:48:00.000Z',
  },
  {
    id: '2',
    name: 'Samuel Peter',
    type: 'Withdraw',
    amount: '200000',
    reference: 'REF67890',
    dateJoined: '2024-09-15T08:30:00.000Z',
  },
  {
    id: '3',
    name: 'Yesufu David',
    type: 'Card deposit',
    amount: '150000',
    reference: 'REF11121',
    dateJoined: '2024-08-20T10:15:00.000Z',
  },
  {
    id: '4',
    name: 'Bamidele Abdul',
    type: 'Deposit',
    amount: '300000',
    reference: 'REF22234',
    dateJoined: '2024-07-12T16:45:00.000Z',
  },
  {
    id: '5',
    name: 'Keneth Johnson',
    type: 'Withdraw',
    amount: '100000',
    reference: 'REF55567',
    dateJoined: '2024-06-28T09:00:00.000Z',
  },
]
