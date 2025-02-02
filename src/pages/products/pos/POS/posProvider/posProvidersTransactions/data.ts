import { VendorTransaction } from './columns'

export const vendorTransactionData: VendorTransaction[] = [
  {
    id: '1',
    merchantName: 'ErrandPay POS 001',
    status: 'Active',
    deviceType: 'Android',
    posSerialNo: 'EP12345678',
    lastSynced: '2024-01-15T14:30:00.000Z',
  },
  {
    id: '2',
    merchantName: 'PayCliq Store 05',
    status: 'Inactive',
    deviceType: 'Semi Android',
    posSerialNo: 'PC98765432',
    lastSynced: '2024-01-14T10:15:00.000Z',
  },
  {
    id: '3',
    merchantName: 'Grupp Merchant 08',
    status: 'Active',
    deviceType: 'Android',
    posSerialNo: 'GP45678912',
    lastSynced: '2024-01-16T09:00:00.000Z',
  },
  {
    id: '4',
    merchantName: 'FastPay Agent 11',
    status: 'Inactive',
    deviceType: 'Semi Android',
    posSerialNo: 'FP32165498',
    lastSynced: '2024-01-17T12:45:00.000Z',
  },
]
