import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import pdf from '../../../assets/pdf.svg'
import {
  // IconBuildingBank,
  IconCopy,
  IconId,
  IconMessage,
  IconPhoneFilled,
  IconWorldWww,
} from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import WalletCards from './components/wallet'
import { DataTable } from '@/components/table/data-table'
import { columns, User } from './transaction/columns'
import { data } from './transaction/data'
import TransactionDetailsDialog from './transaction/transactionDetailsDialog'
import { useBusinessDetails } from '@/lib/products/business-banking/hook'

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
  slug: z.string().optional(),
})

const UserDetails = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<User | null>(
    null
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Handler to open the dialog with selected row data
  const handleRowClick = (transaction: User) => {
    setSelectedTransaction(transaction)
    setIsDialogOpen(true)
  }

  // Handler to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedTransaction(null)
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  const { id } = useParams()
  console.log('The user id is', id)
  // Fetch business details using the custom hook
  const { data: businessData, isLoading, error } = useBusinessDetails(id || '')

  const navigate = useNavigate()

  const goToActivities = () => {
    const currentPath = window.location.pathname.replace(/\/$/, '')
    navigate(`${currentPath}/activities`)
  }

  // Sample user data
  const userData = {
    id: '1',
    accountName: 'Tech Innovations Ltd',
    phoneNo: '+2348123456789',
    email: 'alert@alertgroup.com.ng',
    website: 'https://www.alertmfb.com.ng',
    kybStatus: 'completed',
    accountInfo: {
      businessLocation: 'Nigeria',
      registrationNumber: '002456899888',
      industry: 'Technology',
      companySize: '0 - 100',
      estimatedAnnualVolume: 'N100,000 - N1,000,000',
      officeAddress: '12th Street, Elolo, Off Dreams Ville',
      about:
        'Tech Innovations Ltd is a leading company focused on delivering innovative tech solutions worldwide.',
    },
    documents: {
      registrationCertificate: 'link_to_certificate.pdf',
      taxClearance: 'link_to_tax_clearance.pdf',
      otherDocuments: ['link_to_other_doc1.pdf', 'link_to_other_doc2.pdf'],
    },
    bankAccounts: [
      {
        accountName: 'Tech Innovations Operational Account',
        accountNumber: '1234567890',
        bankName: 'Alert Microfinance Bank',
      },
    ],
  }
  const [isOpen, setIsOpen] = useState(true)
  const [kybStatus, setKybStatus] = useState(
    businessData?.data.addressVerificationStatus || ''
  )
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (businessData?.data.addressVerificationStatus) {
      setKybStatus(businessData?.data.addressVerificationStatus)
    }
  }, [businessData?.data.addressVerificationStatus])

  const handleKybStatusChange = (value: string) => {
    setKybStatus(value)
  }

  const borderColorClass =
    kybStatus === 'completed'
      ? 'border-green-500'
      : kybStatus === 'pending'
        ? 'border-yellow-500'
        : kybStatus === 'rejected'
          ? 'border-red-500'
          : kybStatus === 'in-review'
            ? 'border-blue-500'
            : 'border-muted-foreground' // Default border color

  const getNoteContent = () => {
    const userDetails = {
      name: 'Victor Bamidele',
      email: 'victor.bamidele@alertgroup.com.ng',
      actionDate: 'October 10, 2024',
      actionTime: '11:12 PM',
    }

    switch (kybStatus) {
      case 'REJECTED':
        return {
          title: 'KYB Rejected',
          description: `${userDetails.name} (${userDetails.email}) rejected this business account's KYB application. The account was flagged for fraud on ${userDetails.actionDate} at ${userDetails.actionTime}.`,
          type: 'error',
          borderColor: 'border-red-500',
          textColor: 'text-red-600',
        }
      case 'PENDING':
        return {
          title: 'KYB Pending',
          description:
            "This business account's KYB application is currently under review. Please check back later for updates.",
          type: 'warning',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-600',
        }
      case 'COMPLETED':
        return {
          title: 'KYB Approved',
          description:
            "This business account's KYB application has been successfully approved. All operations are active.",
          type: 'success',
          borderColor: 'border-green-500',
          textColor: 'text-green-600',
        }
      case 'IN-REVIEW':
        return {
          title: 'KYB In Review',
          description:
            "This business account's KYB application is being reviewed. Further details will follow soon.",
          type: 'info',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-600',
        }
      default:
        return {
          title: 'Unknown Status',
          description:
            'No information is available for the selected KYB status.',
          type: 'info',
          borderColor: 'border-muted-foreground',
          textColor: 'text-gray-600',
        }
    }
  }

  const noteContent = getNoteContent()
  if (isLoading) {
    return (
      <div className='flex h-48 w-48 animate-pulse items-center justify-center rounded-3xl border border-gray-300 bg-gray-100'>
        <span className='text-gray-500'>Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-48 w-48 flex-col items-center justify-center rounded-3xl border border-red-300 bg-red-50 p-4 text-center text-red-600'>
        <span>Failed to load business details.</span>
      </div>
    )
  }

  return (
    <>
      <div className='h-screen overflow-y-auto hide-scrollbar'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          <div>
            <h3 className='mb-2 text-3xl font-semibold'>
              {businessData?.data.businessName}
            </h3>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <IconId className='mr-2 h-4 w-4 text-muted-foreground' />
                <p className='text-xs text-muted-foreground'>
                  {businessData?.data.id}
                </p>
              </div>
            </div>
          </div>
          <div className=''>
            <Select
              value={kybStatus}
              onValueChange={handleKybStatusChange}
              defaultValue='PENDING'
            >
              <SelectTrigger
                className={`w-[180px] border-2 ${borderColorClass} focus:outline-none focus:ring-transparent`}
              >
                <SelectValue placeholder='Select KYB Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='COMPLETED'>KYB Approved</SelectItem>
                  <SelectItem value='PENDING'>KYB Pending</SelectItem>
                  <SelectItem value='REJECTED'>KYB Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='my-6 flex flex-col lg:flex-row'>
          {/* Left Section: User Information */}
          <div className='mb-4 w-1/4'>
            <div className='flex w-full flex-col items-start'>
              <div className='flex h-48 w-48 items-center justify-center rounded-3xl shadow-lg'>
                <img
                  src={businessData?.data.logo}
                  alt='Logo'
                  className='h-full w-full rounded-3xl object-cover'
                />
              </div>
              <div className='mt-4 text-left'>
                <p className='mb-2 flex items-center text-sm text-muted-foreground'>
                  <IconPhoneFilled className='mr-2 h-4 w-4 text-muted-foreground' />
                  {businessData?.data.businessPhone}
                </p>
                <p className='mb-2 flex items-center text-sm text-muted-foreground'>
                  <IconMessage className='mr-2 h-4 w-4 text-muted-foreground' />
                  {businessData?.data.businessEntity}
                </p>
                <p className='mb-2 flex items-center text-sm text-muted-foreground'>
                  <IconWorldWww className='mr-2 h-4 w-4 text-muted-foreground' />
                  {businessData?.data.city}
                </p>
              </div>
              <div className='mt-4'>
                <Button onClick={goToActivities} className=''>
                  Track Activities
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section: Tabs */}
          <div className='w-3/4'>
            <Tabs
              orientation='vertical'
              defaultValue='account-info'
              className='space-y-4'
            >
              <div className='flex items-center justify-between'>
                <TabsList>
                  <TabsTrigger value='account-info'>Account Info</TabsTrigger>
                  <TabsTrigger value='documents'>Documents</TabsTrigger>
                  <TabsTrigger value='settings'>Settings</TabsTrigger>
                  <TabsTrigger value='bank-accounts'>Bank Accounts</TabsTrigger>
                </TabsList>
              </div>

              {/* Account Info Tab */}
              <TabsContent value='account-info'>
                <div className='grid grid-cols-1 gap-4 p-4 text-sm'>
                  <div className='flex w-full justify-between pb-2 text-muted-foreground'>
                    <p className='text-muted-foreground'>Business Location</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.city}, {businessData?.data.state}
                    </span>
                  </div>
                  <div className='flex w-full justify-between pb-2 text-muted-foreground'>
                    <p className='text-muted-foreground'>Business Entity</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.businessEntity}
                    </span>
                  </div>
                  <div className='flex w-full justify-between pb-2 text-muted-foreground'>
                    <p className='text-muted-foreground'>Company Type</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.companyType}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Registration Number</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.cacNumber}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Industry</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.industry}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Company Size</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.size}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Estimated Annual Volume</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.income}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Office Address</p>
                    <span className='w-1/2 text-left'>
                      {businessData?.data.address}
                    </span>
                  </div>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value='documents'>
                <div className='grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  <div className='flex flex-col items-center rounded-lg p-3 shadow-md'>
                    <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                    <span className='text-sm font-semibold'>CAC document</span>
                    <a
                      className='mt-1 text-xs text-blue-500 hover:underline'
                      href={businessData?.data.cacdoc}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View File
                    </a>
                  </div>

                  <div className='flex flex-col items-center rounded-lg p-3 shadow-md'>
                    {/* Moi doc */}
                    <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                    <span className='text-sm font-semibold'>MOI Document</span>
                    <a
                      className='mt-1 text-xs text-blue-500 hover:underline'
                      href={businessData?.data.moiDoc}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View File
                    </a>
                  </div>

                  <div className='flex flex-col items-center rounded-lg p-3 shadow-md'>
                    <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                    <span className='text-sm font-semibold'>
                      Scuml Document{' '}
                    </span>
                    <a
                      className='mt-1 text-xs text-blue-500 hover:underline'
                      href={businessData?.data.scumlDoc}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View File
                    </a>
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value='settings'>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full space-y-6'
                  >
                    <div className='space-y-4'>
                      {/* New Slug Field with Edit Button */}
                      <FormField
                        control={form.control}
                        name='slug'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <div className='w-full space-y-0.5'>
                              <FormLabel>
                                Business Slug (NGN Account Issuance)
                              </FormLabel>
                              <FormDescription>
                                AlertMFB - <span>Techi</span> / Business Slug
                              </FormDescription>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <FormControl>
                                <Input
                                  type='text'
                                  {...field}
                                  className='input hidden rounded border p-2'
                                />
                              </FormControl>
                              <Button
                                type='button'
                                onClick={() => /* Add edit logic here */ {}}
                                variant={'outline'}
                                className='text-xs'
                              >
                                Edit Slug
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='marketing_emails'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <div className='space-y-0.5'>
                              <FormLabel>Card Issuance</FormLabel>
                              <FormDescription>
                                Enable this business apply their own branding on
                                the payment page
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='security_emails'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <div className='space-y-0.5'>
                              <FormLabel>Bills Payment</FormLabel>
                              <FormDescription>
                                Enable this business apply their own branding on
                                the payment page
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='security_emails'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <div className='space-y-0.5'>
                              <FormLabel>Payment Gateway</FormLabel>
                              <FormDescription>
                                Enable this business apply their own branding on
                                the payment page
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='security_emails'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <div className='space-y-0.5'>
                              <FormLabel>Account Issuance</FormLabel>
                              <FormDescription>
                                Enable this business apply their own branding on
                                the payment page
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </TabsContent>

              {/* Bank Accounts Tab */}
              <TabsContent value='bank-accounts'>
                <div className='flex w-full'>
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className='w-full space-y-4 rounded-lg border bg-white p-6 shadow-md'
                  >
                    <div className='mb-4 flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        <img
                          src='https://www.svgrepo.com/show/401711/flag-for-nigeria.svg'
                          alt='Nigeria Flag'
                          className='h-10 w-10 rounded-full shadow-sm'
                        />
                        <div>
                          <p className='text-lg font-semibold text-gray-800'>
                            NGN Account Details
                          </p>
                          <p className='text-sm text-gray-500'>
                            Bank account details for Nigerian Naira
                          </p>
                        </div>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <ChevronsUpDown className='h-4 w-4' />
                          <span className='sr-only'>Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <div className='space-y-4 rounded-lg bg-gray-50 p-4'>
                        <p className='flex justify-between'>
                          <span className='text-sm font-medium text-gray-700'>
                            Account Name
                          </span>
                          <span className='text-sm text-gray-800'>
                            {userData.accountName}
                          </span>
                        </p>
                        <p className='flex justify-between'>
                          <span className='text-sm font-medium text-gray-700'>
                            Account Number
                          </span>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm text-gray-800'>
                              {userData.bankAccounts[0].accountNumber}
                            </span>
                            <IconCopy
                              size={18}
                              className='cursor-pointer text-gray-600 hover:text-gray-900'
                              onClick={() => {
                                navigator.clipboard
                                  .writeText(
                                    userData.bankAccounts[0].accountNumber
                                  )
                                  .then(() => {
                                    setIsCopied(true)
                                    setTimeout(() => setIsCopied(false), 2000)
                                  })
                              }}
                            />
                          </div>
                        </p>
                        {isCopied && (
                          <p className='text-sm text-green-600'>
                            Account number copied!
                          </p>
                        )}
                        <p className='flex justify-between'>
                          <span className='text-sm font-medium text-gray-700'>
                            Bank Name
                          </span>
                          <span className='text-sm text-gray-800'>
                            {userData.bankAccounts[0].bankName}
                          </span>
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Alert
          variant={noteContent.type === 'error' ? 'destructive' : 'default'}
          className={`border-l-2 ${noteContent.borderColor} p-4`}
        >
          <AlertTitle className={`text-lg font-bold ${noteContent.textColor}`}>
            {noteContent.title}
          </AlertTitle>
          <AlertDescription>{noteContent.description}</AlertDescription>
        </Alert>

        <WalletCards />

        <div className='mt-8 overflow-auto'>
          <DataTable
            columns={columns}
            data={data}
            inputPlaceHolder='Search Transactions'
            filterColumn='accountName'
            showDateRangePicker={false}
            onRowClick={handleRowClick}
          />
        </div>
        {isDialogOpen && selectedTransaction && (
          <TransactionDetailsDialog
            transaction={selectedTransaction}
            onClose={closeDialog}
          />
        )}
      </div>
    </>
  )
}

export default UserDetails
