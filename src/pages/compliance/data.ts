export interface FlaggedTransaction {
  customer_id: string
  currency: string
  total_amount: string
  flagged_on: string
  reference: string
  transactionReference: string
  reason: string
  status: string
}

export const flaggedTransactionsData: FlaggedTransaction[] = [
  {
    customer_id: '12345',
    currency: 'NGN',
    total_amount: '2700',
    flagged_on: '2023-03-14',
    reference: 'MTMzX19pc29ubHlfYV9leTQyMDIzLTAzLT',
    transactionReference: 'IDI141',
    reason: 'Any transaction(s) in the past 2 day(s) that exceed(s) 100 Naira',
    status: 'Not yet reviewed',
  },
]
