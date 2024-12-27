import { PosDevice } from './columns'

export const data: PosDevice[] = [
  {
    id: 1,
    posName: 'POS Terminal A',
    deviceType: 'Android',
    serialNumber: 'POS123456',
    status: 'Activated',
    lastSynced: '2023-10-10T14:30:00.000Z',
  },
  {
    id: 2,
    posName: 'POS Terminal B',
    deviceType: 'Android',
    serialNumber: 'POS654321',
    status: 'Pending',
    lastSynced: '2023-10-10T14:30:00.000Z',
  },
  {
    id: 3,
    posName: 'POS Terminal C',
    deviceType: 'Semi-android',
    serialNumber: 'POS789012',
    status: 'Deactivated',
    lastSynced: '2023-10-10T14:30:00.000Z',
  },
]
