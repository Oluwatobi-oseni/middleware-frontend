import { Account } from './columns'

// data.js
export const data: Account[] = [
  {
    accountName: 'John Doe',
    accountType: 'Savings',
    amount: 1500.0,
    referenceId: 'REF123456',
    dateJoined: '2023-01-15T00:00:00Z',
  },
  {
    accountName: 'Jane Smith',
    accountType: 'Checking',
    amount: 2000.5,
    referenceId: 'REF654321',
    dateJoined: '2023-02-20T00:00:00Z',
  },
  {
    accountName: 'Alice Johnson',
    accountType: 'Business',
    amount: 50000.75,
    referenceId: 'REF987654',
    dateJoined: '2023-03-10T00:00:00Z',
  },
  {
    accountName: 'Bob Brown',
    accountType: 'Savings',
    amount: 750.25,
    referenceId: 'REF321456',
    dateJoined: '2023-04-05T00:00:00Z',
  },
  {
    accountName: 'Charlie Davis',
    accountType: 'Checking',
    amount: 1200.0,
    referenceId: 'REF456789',
    dateJoined: '2023-05-18T00:00:00Z',
  },
]
