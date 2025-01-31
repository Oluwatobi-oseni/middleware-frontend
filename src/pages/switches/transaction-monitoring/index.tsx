import { Button } from '@/components/custom/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconFidgetSpinner } from '@tabler/icons-react'
import { Clock, Users } from 'lucide-react'
import { UptimeOverview } from '../components/switches-overview'
// import { useState } from 'react'
// import { useAuth } from '@/lib/auth/hook'
// import { Navigate } from 'react-router-dom'
import { useProviderComplianceById, useProviders } from '@/lib/switches/hook'
import { useEffect, useState } from 'react'
import { RecentProfiledCustomer } from '../components/recent-profiled-customer'
// import { SwitchProviderDialog } from '../components/switch-dialog'

const ProviderCompliance = ({ providerId }: { providerId: string }) => {
  const {
    data: complianceData,
    error,
    isLoading,
  } = useProviderComplianceById(providerId)
  console.log('complianceData', complianceData)

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>Loading...</div>
    )
  }

  if (error) {
    return <p className='text-red-500'>Failed to load compliance data.</p>
  }

  const chartData = [
    {
      name: 'Customers Profiled',
      value: complianceData?.profiledCustomers || 0,
      fill: '#4299E1',
    },
    {
      name: 'Flagged Transactions',
      value: complianceData?.flaggedTransactions.length || 0,
      fill: '#E53E3E',
    },
  ]

  const chartConfig = {
    uptime: {
      label: 'Customers Profiled',
      color: '#4299E1', // Blue
    },
    downtime: {
      label: 'Flagged Transactions',
      color: '#E53E3E', // Red
    },
  }

  return (
    <>
      <div className='col-span-2 flex h-full'>
        <Dialog>
          <DialogTrigger className='flex w-full justify-end'>
            <Badge>View All</Badge>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Transaction Monitoring Provider</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Provider Name</span>
                <span>{complianceData?.provider.name}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Status</span>
                <span
                  className={`rounded-full px-4 py-1 text-sm font-medium ${
                    complianceData?.provider.isEnabled
                      ? 'border border-green-500 bg-green-100 text-green-700'
                      : 'border border-red-500 bg-red-100 text-red-700'
                  }`}
                >
                  {complianceData?.provider.isEnabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Profiled Customer</span>
                <span className='font-geist-mono'>
                  {complianceData?.profiledCustomers}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>
                  Flagged Transactions
                </span>
                <span className='font-geist-mono'>
                  {complianceData?.flaggedTransactions.length}
                </span>
              </div>
              {/* <div className='flex justify-between'>
                <span className='text-muted-foreground'>
                  Pending Verifications
                </span>
                <span className='font-geist-mono'>
                  {provider.pendingVerifications || '72'}
                </span>
              </div> */}
              {/* <div className='flex justify-between'>
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
              </div> */}
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
            <div className='flex flex-row items-center justify-start space-x-4'>
              <img
                src={complianceData?.provider.logoUrl}
                alt={complianceData?.provider.name}
                className='h-10 w-10 object-contain'
              />
            </div>
            <div>
              <div className='font-geist-mono text-2xl font-bold sm:text-lg'>
                {complianceData?.provider.name}
              </div>
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
                {complianceData?.profiledCustomers}
              </div>
              <p className='text-xs text-muted-foreground'>
                Customers Profiled
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
                {complianceData?.flaggedTransactions.length}
              </div>
              <p className='text-xs text-muted-foreground'>
                Flagged Transactions
              </p>
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
          provider="Customers (Regfyl's)"
          chartData={chartData}
          chartConfig={chartConfig}
        />

        {/* <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                  Trending up by 5.2% this month{' '}
                  <TrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter> */}

        <Card className='col-span-1 h-96 lg:col-span-3'>
          <CardHeader>
            <CardTitle>Recent Profiled Customers</CardTitle>
            <CardDescription>
              Showing last <span className='font-geist-mono'>24</span> Hours.
            </CardDescription>
          </CardHeader>
          <CardContent className='h-72'>
            {' '}
            <div className='h-full overflow-y-scroll hide-scrollbar'>
              <RecentProfiledCustomer
                recentProfiledCustomers={
                  complianceData!.recentProfiledCustomers
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

const TransactionMonitoring = () => {
  // const [isActive, setIsActive] = useState(false)
  const { data, error, isLoading } = useProviders()

  const [defaultTab, setDefaultTab] = useState<string>('')

  useEffect(() => {
    if (data?.complianceProviders && data?.complianceProviders.length > 0) {
      setDefaultTab(data.complianceProviders[0].name.toLowerCase())
    }
  }, [data])

  if (isLoading || !defaultTab) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <IconFidgetSpinner className='animate-spin' size={32} />
      </div>
    )
  }

  if (error) {
    return <p className='text-red-500'>Failed to load providers.</p>
  }

  // const { isSignedIn } = useAuth()
  // if (!isSignedIn) {
  //   return <Navigate to={'/sign-in'} replace={true} />
  // }

  // const toggleProvider = () => {
  //   setIsActive((prevState) => !prevState)
  // }
  return (
    <div className='w-full'>
      <div className='mb-2 flex justify-between'>
        <h2 className='text-xl font-semibold tracking-tighter'>
          Transaction Monitoring
        </h2>
        {/* <SwitchProviderDialog
          isActive={isActive}
          toggleProvider={toggleProvider}
        /> */}
      </div>
      <Tabs
        orientation='vertical'
        defaultValue={defaultTab}
        className='space-y-4'
      >
        <TabsList className='w-full sm:w-auto'>
          {data?.complianceProviders?.map((provider) => (
            <TabsTrigger key={provider.id} value={provider.name.toLowerCase()}>
              {provider.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {data?.complianceProviders?.map((provider) => {
          return (
            <TabsContent
              key={provider.id}
              value={provider.name.toLowerCase()}
              className='flex h-full flex-col space-y-4 overflow-y-scroll hide-scrollbar'
            >
              <ProviderCompliance providerId={provider.id} />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default TransactionMonitoring
