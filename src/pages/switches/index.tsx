import { Layout } from '@/components/custom/layout'
// import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
// import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { useAuth } from '@/lib/auth/hook'
import { Navigate } from 'react-router-dom'
import { Overview } from '../dashboard/components/overview'
import { RecentSales } from '../dashboard/components/recent-sales'
import { IconCircleCheck, IconGift } from '@tabler/icons-react'
import { columns } from './columns'
import { data } from './data'
import { DataTable } from './components/data-table'
import { data as smsData } from './sms-provider/data'
import { columns as smsColumns } from './sms-provider/columns'
import { SwitchProviderDialog } from './components/switch-dialog'
import { useState } from 'react'
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

const provider = {
  customerActivity: 'Dojah',
  status: 'Active',
  uptime: '99.22%',
  customersVerified: '12,350',
  pendingVerifications: '72',
  lastSwitched: '10 Oct, 2024 14:10',
}

export default function Switches() {
  const [isActive, setIsActive] = useState(false)

  const { isSignedIn } = useAuth()
  if (!isSignedIn) {
    return <Navigate to={'/sign-in'} replace={true} />
  }

  const hasCustomerActivities = data.length > 0
  const hasSMSActivities = smsData.length > 0
  const toggleProvider = () => {
    setIsActive((prevState) => !prevState)
  }
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='mb-2 flex items-center justify-between'>
          <h1 className='text-2xl font-bold tracking-tight'>Switches</h1>
        </div>
        <div className='ml-auto hidden items-center space-x-4 md:flex'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex justify-between'>
          <h2 className='text-xl font-semibold tracking-tighter'>
            KYC Providers
          </h2>
          <SwitchProviderDialog
            isActive={isActive}
            toggleProvider={toggleProvider}
          />
        </div>
        <Tabs orientation='vertical' defaultValue='dojah' className='space-y-4'>
          {/* <div className='flex w-full flex-col items-center justify-between space-y-4 overflow-x-auto pb-2 sm:flex-row sm:space-y-0'> */}
          <TabsList className='w-full sm:w-auto'>
            <TabsTrigger value='dojah'>Dojah</TabsTrigger>
            <TabsTrigger value='regfyl'>Regfyl</TabsTrigger>
          </TabsList>
          {/* </div> */}

          <TabsContent value='dojah' className='flex h-full flex-col space-y-4'>
            <div className='mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6'>
              {/* Card Section */}
              <div className='col-span-2 flex h-full'>
                <Dialog>
                  <DialogTrigger className='flex h-full w-full'>
                    <Card className='flex h-full w-full flex-col justify-between'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                          Dojah
                        </CardTitle>
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${
                            isActive
                              ? 'border border-green-500 bg-green-100 text-green-700'
                              : 'border border-red-500 bg-red-100 text-red-700'
                          }`}
                        >
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </CardHeader>
                      <CardContent>
                        <div className='flex items-center space-x-2 pb-2 text-2xl font-bold'>
                          <span className='font-geist-mono'>12,350</span>
                          <IconCircleCheck
                            className='text-muted-foreground'
                            size={20}
                          />
                        </div>
                        <p className='text-left text-xs text-muted-foreground'>
                          Uptime: <span className='font-geist-mono'>20.1%</span>{' '}
                          from last month
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>KYC Provider</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <div className='flex flex-col gap-4'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          Provider Name
                        </span>
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
                        <div className='text-muted-foreground'>
                          Last Switched
                        </div>
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

              {/* Table Section */}
              <div className='col-span-4'>
                {hasCustomerActivities ? (
                  <DataTable columns={columns} data={data} />
                ) : (
                  <div className='flex flex-grow flex-col items-center justify-center text-center'>
                    <IconGift
                      size={80}
                      className='mb-4 text-muted-foreground'
                    />
                    <p className='text-xl font-semibold'>No activities yet</p>
                    <p className='text-muted-foreground'>
                      Customer activities will appear here once available.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Second Section */}
            <div>
              <h2 className='mb-4 text-xl font-semibold tracking-tighter'>
                SMS Providers
              </h2>
              <Tabs defaultValue='termii'>
                <TabsList className='mb-4'>
                  <TabsTrigger value='termii'>Termii</TabsTrigger>
                </TabsList>
                <TabsContent value='termii'>
                  {/* Termii Section */}
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6'>
                    {/* Card Section */}
                    <div className='col-span-2 flex'>
                      <Card className='flex w-full flex-col justify-between'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Termii
                          </CardTitle>
                          <span
                            className={`rounded px-2 py-1 text-xs font-medium ${
                              isActive
                                ? 'border border-green-500 bg-green-100 text-green-700'
                                : 'border border-red-500 bg-red-100 text-red-700'
                            }`}
                          >
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </CardHeader>
                        <CardContent>
                          <div className='flex items-center space-x-2 pb-2 text-2xl font-bold'>
                            <span className='font-geist-mono'>345,350</span>
                            <IconCircleCheck
                              className='text-muted-foreground'
                              size={20}
                            />
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Uptime:{' '}
                            <span className='font-geist-mono'>80.9%</span> from
                            last month
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Table Section */}
                    <div className='col-span-4'>
                      {hasSMSActivities ? (
                        <DataTable columns={smsColumns} data={smsData} />
                      ) : (
                        <div className='flex flex-grow flex-col items-center justify-center text-center'>
                          <p className='text-xl font-semibold'>
                            No activities yet
                          </p>
                          <p className='text-muted-foreground'>
                            Customer activities will appear here once available.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value='regfyl' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Alert Savings Transactions
                  </CardTitle>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 115.09 122.88'
                    // fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <title>nigeria-naira</title>
                    <path d='M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='font-geist-mono text-2xl font-bold'>
                    ₦450,231
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    <span className='font-geist-mono'>+20.1%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Business Banking Transactions
                  </CardTitle>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 115.09 122.88'
                    // fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <title>nigeria-naira</title>
                    <path d='M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='font-geist-mono text-2xl font-bold'>
                    ₦200,350
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    <span className='font-geist-mono'>+180.1%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Consumer Banking Transactions
                  </CardTitle>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 115.09 122.88'
                    // fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <title>nigeria-naira</title>
                    <path d='M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='font-geist-mono text-2xl font-bold'>
                    ₦120,234
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    <span className='font-geist-mono'>+19%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
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
                    <span className='font-geist-mono'>+201</span> since last
                    hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    There has been <span className='font-geist-mono'>256</span>{' '}
                    transactions this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
            {/* <DataTable
              columns={columns}
              data={transactionData}
              inputPlaceHolder='Search Transactions'
              showModalButton={true}
              ModalComponent={DatePickerWithRange}
              filterColumn='name'
            /> */}
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
