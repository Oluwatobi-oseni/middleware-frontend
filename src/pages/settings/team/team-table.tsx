import { IconCompass } from '@tabler/icons-react'
import { MemberDialog } from './MemberModal'
import { Button } from '@/components/custom/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Example user data
const userData = [
  {
    id: 1,
    accountName: 'OluwaTobi Oseni',
    email: 'OluwaTobioseni@alertgroup.com.ng',
    teamRole: 'Team Manager',
    twoFactorStatus: 'ON',
    dateJoined: '11 October, 2024',
  },
  {
    id: 2,
    accountName: 'Victor Smith',
    email: 'victorsmith@alertgroup.com.ng',
    teamRole: 'Developer',
    twoFactorStatus: 'OFF',
    dateJoined: '5 July, 2024',
  },
  {
    id: 3,
    accountName: 'Lionel Messi',
    email: 'lionelmessi@alertgroup.com.ng',
    teamRole: 'Developer',
    twoFactorStatus: 'ON',
    dateJoined: '7 March, 2024',
  },
  {
    id: 4,
    accountName: 'Steph Curry',
    email: 'stephcurry@alertgroup.com.ng',
    teamRole: 'Designer',
    twoFactorStatus: 'OFF',
    dateJoined: '5 August, 2024',
  },
  {
    id: 5,
    accountName: 'Ruth Odeh',
    email: 'ruthodeh@alertgroup.com.ng',
    teamRole: 'Developer',
    twoFactorStatus: 'OFF',
    dateJoined: '5 July, 2024',
  },
]

export function TableDemo() {
  return (
    <div className='mb-8 w-full p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <Button variant='outline' className='flex gap-2'>
          <IconCompass />
          <span>Manage Roles</span>
        </Button>
        {/* <Button variant={'default'} className='flex gap-2'>
          <IconPlus />
          <span>Add a member</span>
        </Button> */}
        <MemberDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='px-2 py-3 text-xs uppercase text-[#707070]'>
              Account Name
            </TableHead>
            <TableHead className='px-2 py-3 text-xs uppercase text-[#707070]'>
              Team Role
            </TableHead>
            <TableHead className='px-2 py-3 text-center text-xs uppercase'>
              2FA Status
            </TableHead>
            <TableHead className='px-2 py-3 text-center text-xs uppercase text-[#707070]'>
              Date Joined
            </TableHead>
            <TableHead className='px-2 py-3'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className='px-2 py-6'>
                <div className='flex items-center'>
                  <div className='h-10 w-10 flex-shrink-0'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-blue-500 font-semibold text-white'>
                      {user.accountName.charAt(0)}
                    </div>
                  </div>
                  <div className='ml-4 overflow-hidden'>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium'>
                      {user.accountName}
                    </div>
                    <div className='text-xs text-gray-400'>{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='px-2 py-6'>{user.teamRole}</TableCell>
              <TableCell className='px-2 py-6 text-center'>
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    user.twoFactorStatus === 'ON'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.twoFactorStatus}
                </span>
              </TableCell>
              <TableCell className='px-2 py-6 text-center'>
                {user.dateJoined}
              </TableCell>
              <TableCell className='px-2 py-6 text-center'>
                <button className='mr-4 text-red-600 hover:text-red-400'>
                  Delete
                </button>
                <button className='text-indigo-600 hover:text-indigo-400'>
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
