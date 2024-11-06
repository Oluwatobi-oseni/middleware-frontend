import { PromoCode } from './columns'

export const data: PromoCode[] = [
  {
    id: '1',
    codeTitle: 'SUMMER20',
    amountInNaira: 2000,
    status: 'Active',
    dateCreated: 'October 1, 2024',
    expiryDate: 'December 31, 2024',
  },
  {
    id: '2',
    codeTitle: 'WELCOME10',
    amountInNaira: 1000,
    status: 'Inactive',
    dateCreated: 'September 15, 2024',
    expiryDate: 'November 30, 2024',
  },
  {
    id: '3',
    codeTitle: 'HOLIDAY50',
    amountInNaira: 5000,
    status: 'Active',
    dateCreated: 'October 10, 2024',
    expiryDate: 'January 1, 2025',
  },
]
