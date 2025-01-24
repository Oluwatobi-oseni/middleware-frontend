// import { useState } from 'react'
// import { Button } from '@/components/custom/button'
import { DataTable } from '@/components/table/data-table'
// import { Badge } from '@/components/ui/badge'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { RecentSales } from '@/pages/dashboard/components/recent-sales'
// import { SwitchProviderDialog } from '@/pages/switches/components/switch-dialog'
// import { UptimeOverview } from '@/pages/switches/components/switches-overview'
// import { IconLayoutDashboardFilled, IconWashMachine } from '@tabler/icons-react'
import { Clock, Users } from 'lucide-react'
import { columns as businessColumns } from './Business/columns'
import { useBusinessData } from './Business/data'
import { columns as POSColumns, PosDevice } from './POS/columns'
import { data as POSData } from './POS/data'
import { AssignPOS } from './POS/assign-pos-modal'
import { IconFidgetSpinner, IconWashMachine } from '@tabler/icons-react'
// import POSDialog from './POS/POSDialog'
import { useNavigate } from 'react-router-dom'
import { BusinessResponse } from '@/lib/pos/type'
// const provider = {
//   customerActivity: 'Dojah',
//   status: 'Active',
//   uptime: '99.22%',
//   customersVerified: '12,350',
//   pendingVerifications: '72',
//   lastSwitched: '10 Oct, 2024 14:10',
// }

export default function PosPage() {
  const {
    data: businessData,
    error: businessError,
    isLoading: businessLoading,
  } = useBusinessData()
  // const { data: posData, error: posError, isLoading: posLoading } = usePosData()

  const navigate = useNavigate()

  const handlePOSRowClick = (rowData: PosDevice) => {
    const posId = rowData.id
    const posName = encodeURIComponent(rowData.posName)
    navigate(`/products/pos/${posName}/${posId}`) // Navigate to the user detail page
  }

  const handleBusinessRowClick = (rowData: BusinessResponse) => {
    const businessId = rowData.id
    const businessName = encodeURIComponent(rowData.name)
    navigate(`/products/business/${businessName}/${businessId}`) // Navigate to the user detail page
  }
  // const handlePOSRowClick = (pos: PosDevice) => {
  //   setSelectedPOS(pos)
  //   setIsDialogOpen(true)
  // }

  // const closeDialog = () => {
  //   setIsDialogOpen(false)
  //   setSelectedPOS(null)
  // }
  //   const [isActive, setIsActive] = useState(false)

  //   const toggleProvider = () => {
  //     setIsActive((prevState) => !prevState)
  //   }

  // const sortedBusinessData = businessData
  //   ? businessData.sort(
  //       (a, b) =>
  //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //     )
  //   : []

  // const sortedPosData = posData
  //   ? posData.sort(
  //       (a, b) =>
  //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //     )
  //   : []
  return (
    <div className='h-auto w-full overflow-y-auto hide-scrollbar'>
      {/* <div className='mb-2 flex justify-between'>
        <h2 className='text-xl font-semibold tracking-tighter'>
          KYC Providers
        </h2>
        <SwitchProviderDialog
          isActive={isActive}
          toggleProvider={toggleProvider}
        />
      </div> */}
      <Tabs
        orientation='vertical'
        defaultValue='business'
        className='space-y-4'
      >
        {/* <div className='flex w-full flex-col items-center justify-between space-y-4 overflow-x-auto pb-2 sm:flex-row sm:space-y-0'> */}
        <TabsList className='w-full sm:w-auto'>
          <TabsTrigger value='business'>Business</TabsTrigger>
          <TabsTrigger value='pos'>POS</TabsTrigger>
        </TabsList>
        {/* </div> */}

        <TabsContent
          value='business'
          className='flex h-full flex-col space-y-4 overflow-y-auto hide-scrollbar'
        >
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='flex flex-col justify-center rounded-lg border border-l-0 border-t-0 px-4 py-6'>
              <div className='flex flex-row items-center justify-start space-x-4'>
                <div className='flex items-center justify-center rounded-full bg-muted p-4'>
                  <IconWashMachine className='h-6 w-6' />
                </div>
                <div>
                  <div className='font-geist-mono text-2xl font-bold sm:text-lg'>
                    5,173
                  </div>
                  <p className='text-xs text-muted-foreground'>POS Terminal</p>
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
                    90,021
                  </div>
                  <p className='text-xs text-muted-foreground'>Businesses</p>
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
                    5,173
                  </div>
                  <p className='text-xs text-muted-foreground'>POS Assigned</p>
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
                  <p className='text-xs text-muted-foreground'>
                    Deactivated POS
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <UptimeOverview kycProvider="Dojah's" />
            <Card className='col-span-1 h-96 lg:col-span-3'>
              <CardHeader>
                <CardTitle>Recent KYC Provided</CardTitle>
                <CardDescription>
                  There are currently{' '}
                  <span className='font-geist-mono'>2021</span> KYC
                  verifications.
                </CardDescription>
              </CardHeader>
              <CardContent className='h-72'>
                {' '}
                <div className='h-full overflow-y-scroll hide-scrollbar'>
                  <RecentSales />
                </div>
              </CardContent>
            </Card>
          </div> */}
          {businessLoading ? (
            <div className='mt-20 flex flex-grow flex-col items-center justify-center text-center'>
              {/* <p className='text-xl font-semibold'>Loading business data...</p> */}
              <IconFidgetSpinner className='h-6 w-6 animate-spin text-xl' />
            </div>
          ) : businessError ? (
            <div className='mt-20 flex flex-grow flex-col items-center justify-center text-center'>
              <p className='text-xl font-semibold'>
                Failed to load business data
              </p>
              <p className='text-muted-foreground'>Please try again later.</p>
            </div>
          ) : businessData.length > 0 ? (
            // <div className='overflow-scroll'>
            <DataTable
              columns={businessColumns}
              data={businessData}
              inputPlaceHolder='Search Business'
              filterColumn='businessName'
              onRowClick={handleBusinessRowClick}
              showButton
              buttonText='Search'
              showDateRangePicker={false}
            />
          ) : (
            // </div>
            <div className='flex flex-grow flex-col items-center justify-center text-center'>
              <p className='text-xl font-semibold'>
                No business data available
              </p>
              <p className='text-muted-foreground'>
                Businesses will appear here once created.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value='pos'
          className='flex h-full flex-col space-y-4 overflow-y-scroll hide-scrollbar'
        >
          <div className='flex justify-end'>
            <AssignPOS />
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='flex flex-col justify-center rounded-lg border border-l-0 border-t-0 px-4 py-6'>
              <div className='flex flex-row items-center justify-start space-x-4'>
                <div className='flex items-center justify-center rounded-full bg-muted p-4'>
                  <IconWashMachine className='h-6 w-6' />
                </div>
                <div>
                  <div className='font-geist-mono text-2xl font-bold sm:text-lg'>
                    5,173
                  </div>
                  <p className='text-xs text-muted-foreground'>POS Terminal</p>
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
                    90,021
                  </div>
                  <p className='text-xs text-muted-foreground'>Businesses</p>
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
                    5,173
                  </div>
                  <p className='text-xs text-muted-foreground'>POS Assigned</p>
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
                  <p className='text-xs text-muted-foreground'>
                    Deactivated POS
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DataTable
            columns={POSColumns}
            data={POSData}
            inputPlaceHolder='Search...'
            filterColumn='posName'
            showButton
            buttonText='Search'
            showDateRangePicker={false}
            onRowClick={(rowData) => handlePOSRowClick(rowData)}
          />

          {/* {isDialogOpen && selectedPOS && (
            <POSDialog pos={selectedPOS} onClose={closeDialog} />
          )} */}
          {/* <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'> */}
          {/* <UptimeOverview kycProvider="Regfyl's" /> */}

          {/* <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                  Trending up by 5.2% this month{' '}
                  <TrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter> */}

          {/* <Card className='col-span-1 h-96 lg:col-span-3'>
              <CardHeader>
                <CardTitle>Recent KYC Provided</CardTitle>
                <CardDescription>
                  There are currently{' '}
                  <span className='font-geist-mono'>2021</span> KYC
                  verifications.
                </CardDescription>
              </CardHeader>
              <CardContent className='h-72'>
                {' '}
                <div className='h-full overflow-y-scroll hide-scrollbar'>
                  <RecentSales />
                </div>
              </CardContent>
            </Card> */}
          {/* </div> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
