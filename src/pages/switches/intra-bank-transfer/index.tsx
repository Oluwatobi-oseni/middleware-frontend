// import { Layout } from '@/components/custom/layout'
// import { useState } from 'react'
// import { SwitchProviderDialog } from '../components/switch-dialog'
import { useAuth } from '@/lib/auth/hook'
import { Navigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { Separator } from '@/components/ui/separator'
import {
  //   IconCircleCheck,
  //   IconGift,
  IconLayoutDashboardFilled,
} from '@tabler/icons-react'
// import { Overview } from '@/pages/dashboard/components/overview'
// import { RecentSales } from '@/pages/dashboard/components/recent-sales'
import { UptimeOverview } from '../components/switches-overview'
import { Clock, Users } from 'lucide-react'
import { RecentSales } from '@/pages/dashboard/components/recent-sales'
import { Badge } from '@/components/ui/badge'

const provider = {
  customerActivity: 'Dojah',
  status: 'Active',
  uptime: '99.22%',
  customersVerified: '12,350',
  pendingVerifications: '72',
  lastSwitched: '10 Oct, 2024 14:10',
}

const chartData = [
  { name: 'Verified Customers', value: 12350, fill: '#4299E1' },
  { name: 'Pending Verifications', value: 12972, fill: '#E53E3E' },
]

const chartConfig = {
  uptime: {
    label: 'Verified Customers',
    color: '#4299E1', // Blue
  },
  downtime: {
    label: 'Pending Verifications',
    color: '#E53E3E', // Red
  },
}
export default function IntraBankTransfer() {
  // const [isActive, setIsActive] = useState(false)

  const { isSignedIn } = useAuth()
  if (!isSignedIn) {
    return <Navigate to={'/sign-in'} replace={true} />
  }

  // const toggleProvider = () => {
  //   setIsActive((prevState) => !prevState)
  // }
  return (
    <div className='w-full'>
      <div className='mb-2 flex justify-between'>
        <h2 className='text-xl font-semibold tracking-tighter'>
          IntraBank Transfer Providers
        </h2>
        {/* <SwitchProviderDialog
          isActive={isActive}
          toggleProvider={toggleProvider}
        /> */}
      </div>
      <Tabs orientation='vertical' defaultValue='nibbs' className='space-y-4'>
        {/* <div className='flex w-full flex-col items-center justify-between space-y-4 overflow-x-auto pb-2 sm:flex-row sm:space-y-0'> */}
        <TabsList className='w-full sm:w-auto'>
          <TabsTrigger value='nibbs'>NIBBS</TabsTrigger>
          <TabsTrigger value='nip'>NIP</TabsTrigger>
        </TabsList>
        {/* </div> */}

        <TabsContent
          value='nibbs'
          className='flex h-full flex-col space-y-4 overflow-y-scroll hide-scrollbar'
        >
          <div className='col-span-2 flex h-full'>
            <Dialog>
              <DialogTrigger className='flex w-full justify-end'>
                <Badge>View All</Badge>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>KYC Provider</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Provider Name</span>
                    <span>{provider.customerActivity}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>Status</span>
                    <span
                      className={`rounded-full px-4 py-1 text-sm font-medium ${
                        provider.status === 'Active'
                          ? 'border border-green-500 bg-green-100 text-green-700'
                          : 'border border-red-500 bg-red-100 text-red-700'
                      }`}
                    >
                      {provider.status || 'Active'}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Uptime</span>
                    <span className='font-geist-mono'>
                      {provider.uptime || '99.22%'}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>
                      Customers Verified
                    </span>
                    <span className='font-geist-mono'>
                      {provider.customersVerified || '12,350'}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>
                      Pending Verifications
                    </span>
                    <span className='font-geist-mono'>
                      {provider.pendingVerifications || '72'}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-muted-foreground'>Last Switched</div>
                    <span className='font-geist-mono text-lg'>
                      {provider.lastSwitched ? (
                        <>
                          <span>
                            {provider.lastSwitched.split(' ')[0]}{' '}
                            {provider.lastSwitched.split(' ')[1]}{' '}
                            {provider.lastSwitched.split(' ')[2]}
                          </span>
                          <span className='block text-right text-xs font-semibold text-red-500'>
                            {provider.lastSwitched.split(' ')[3]}
                          </span>
                        </>
                      ) : (
                        '10 Oct, 2024 14:10'
                      )}
                    </span>
                  </div>
                </div>
                <DialogClose asChild>
                  <DialogFooter>
                    <Button className='mt-4 w-full'>Done</Button>
                  </DialogFooter>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
          <div className='grid gap-4 sm:grid-cols-3'>
            <div className='flex flex-col justify-center rounded-lg border border-l-0 border-t-0 px-4 py-6'>
              <div className='flex flex-row items-center justify-start space-x-4'>
                <div className='flex items-center justify-center rounded-full bg-muted p-4'>
                  <IconLayoutDashboardFilled className='h-6 w-6' />
                </div>
                <div>
                  <div className='font-geist-mono text-2xl font-bold sm:text-lg'>
                    NIBBS
                  </div>
                  {/* <p className='text-xs text-muted-foreground'>kyc Status</p> */}
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center rounded-lg border border-l-0 border-t-0 px-4 py-6'>
              <div className='flex flex-row items-center justify-start space-x-4'>
                <div className='flex items-center justify-center rounded-full bg-muted p-4'>
                  <Users className='h-6 w-6' />
                </div>
                <div>
                  <div className='font-geist-mono text-2xl font-bold sm:text-lg'>
                    2,021
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Customer Verified
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center rounded-lg border border-l-0 border-t-0 px-4 py-6'>
              <div className='flex flex-row items-center justify-start space-x-4'>
                <div className='flex items-center justify-center rounded-full bg-muted p-4'>
                  <Clock className='h-6 w-6' />
                </div>
                <div>
                  <div className='font-geist-mono text-2xl font-bold sm:text-lg'>
                    11
                  </div>
                  <p className='text-xs text-muted-foreground'>Pending</p>
                </div>
              </div>
            </div>
            {/* <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  POS Transactions
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='font-geist-mono text-2xl font-bold'>
                  ₦573,000
                </div>
                <p className='text-xs text-muted-foreground'>
                  <span className='font-geist-mono'>+201</span> since last hour
                </p>
              </CardContent>
            </Card> */}
          </div>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <UptimeOverview
              provider='Customers (NIBBS)'
              chartData={chartData}
              chartConfig={chartConfig}
            />
            <Card className='col-span-1 h-96 lg:col-span-3'>
              <CardHeader>
                <CardTitle>Recent Transfer</CardTitle>
                <CardDescription>
                  Showing last <span className='font-geist-mono'>24</span>{' '}
                  Hours.
                </CardDescription>
              </CardHeader>
              <CardContent className='h-72'>
                {' '}
                <div className='h-full overflow-y-scroll hide-scrollbar'>
                  <RecentSales />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
