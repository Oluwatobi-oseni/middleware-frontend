import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import pdf from '../../../assets/pdf.svg'
import samplepdf from '../../../assets/sample.pdf'
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
    console.log('Idea')
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
  const [kybStatus, setKybStatus] = useState(userData.kybStatus || '')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (userData.kybStatus) {
      setKybStatus(userData.kybStatus)
    }
  }, [userData.kybStatus])

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

  const initials = userData.accountName
    .split(' ')
    .map((word) => word[0])
    .join('')
  // const [status, setStatus] = useState('VERIFIED')

  const getNoteContent = () => {
    const userDetails = {
      name: 'Victor Bamidele',
      email: 'victor.bamidele@alertgroup.com.ng',
      actionDate: 'October 10, 2024',
      actionTime: '11:12 PM',
    }

    switch (kybStatus) {
      case 'rejected':
        return {
          title: 'KYB Rejected',
          description: `${userDetails.name} (${userDetails.email}) rejected this business account's KYB application. The account was flagged for fraud on ${userDetails.actionDate} at ${userDetails.actionTime}.`,
          type: 'error',
          borderColor: 'border-red-500',
          textColor: 'text-red-600',
        }
      case 'pending':
        return {
          title: 'KYB Pending',
          description:
            "This business account's KYB application is currently under review. Please check back later for updates.",
          type: 'warning',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-600',
        }
      case 'completed':
        return {
          title: 'KYB Approved',
          description:
            "This business account's KYB application has been successfully approved. All operations are active.",
          type: 'success',
          borderColor: 'border-green-500',
          textColor: 'text-green-600',
        }
      case 'in-review':
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
  return (
    <>
      <div className='h-screen overflow-y-auto hide-scrollbar'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          <div>
            <h3 className='mb-2 text-3xl font-semibold'>
              {userData.accountName}
            </h3>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <IconId className='mr-2 h-4 w-4 text-muted-foreground' />
                <p className='text-xs text-muted-foreground'>{userData.id}</p>
              </div>
            </div>
          </div>
          <div className=''>
            <Select
              value={kybStatus}
              onValueChange={handleKybStatusChange}
              defaultValue='completed'
            >
              <SelectTrigger
                className={`w-[180px] border-2 ${borderColorClass} focus:outline-none focus:ring-transparent`}
              >
                <SelectValue placeholder='Select KYB Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='completed'>KYB Approved</SelectItem>
                  <SelectItem value='pending'>KYB Pending</SelectItem>
                  <SelectItem value='rejected'>KYB Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='my-6 flex flex-col lg:flex-row'>
          {/* Left Section: User Information */}
          <div className='mb-4 w-1/4'>
            <div className='flex w-full flex-col items-start'>
              <div className='flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-r from-teal-500 to-blue-500 text-6xl font-bold text-muted shadow-lg'>
                {initials}
              </div>
              <div className='mt-4 text-left'>
                <p className='mb-2 flex items-center text-sm text-muted-foreground'>
                  <IconPhoneFilled className='mr-2 h-4 w-4 text-muted-foreground' />
                  {userData.phoneNo}
                </p>
                <p className='mb-2 flex items-center text-sm text-muted-foreground'>
                  <IconMessage className='mr-2 h-4 w-4 text-muted-foreground' />
                  {userData.email}
                </p>
                <p className='mb-2 flex items-center text-sm text-muted-foreground'>
                  <IconWorldWww className='mr-2 h-4 w-4 text-muted-foreground' />
                  {userData.website}
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
                <div className='grid grid-cols-1 gap-6 p-4 text-sm'>
                  <div className='flex w-full justify-between pb-2 text-muted-foreground'>
                    <p className='text-muted-foreground'>Business Location</p>
                    <span className='w-1/2 text-left'>
                      {userData.accountInfo.businessLocation}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Registration Number</p>
                    <span className='w-1/2 text-left'>
                      {userData.accountInfo.registrationNumber}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Industry</p>
                    <span className='w-1/2 text-left'>
                      {userData.accountInfo.industry}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Company Size</p>
                    <span className='w-1/2 text-left'>
                      {userData.accountInfo.companySize}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Estimated Annual Volume</p>
                    <span className='w-1/2 text-left'>
                      {userData.accountInfo.estimatedAnnualVolume}
                    </span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <p>Office Address</p>
                    <span className='w-1/2 text-left'>
                      {userData.accountInfo.officeAddress}
                    </span>
                  </div>
                  <div className='flex justify-between text-muted-foreground'>
                    <p>About</p>
                    <span className='w-1/2 max-w-xs text-left md:max-w-sm lg:max-w-md xl:max-w-lg'>
                      {userData.accountInfo.about}
                    </span>
                  </div>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value='documents'>
                <div className='grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {/* Registration Certificate */}
                  <div className='flex flex-col items-center rounded-lg p-3 shadow-md'>
                    <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                    <span className='text-sm font-semibold'>
                      Registration Certificate
                    </span>
                    <a
                      className='mt-1 text-xs text-blue-500 hover:underline'
                      href={samplepdf}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View File
                    </a>
                  </div>

                  {/* Tax Clearance */}
                  <div className='flex flex-col items-center rounded-lg p-3 shadow-md'>
                    {/* PDF Icon */}
                    <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                    <span className='text-sm font-semibold'>Tax Clearance</span>

                    {/* View File Link */}
                    <a
                      className='mt-1 text-xs text-blue-500 hover:underline'
                      href={samplepdf} // Link to the local PDF
                      target='_blank' // Open in a new tab
                      rel='noopener noreferrer' // Security improvement
                    >
                      View File
                    </a>
                  </div>

                  {/* Other Documents */}

                  <div className='flex flex-col items-center rounded-lg p-3 shadow-md'>
                    <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                    <span className='text-sm font-semibold'>Certificate A</span>
                    <a
                      className='mt-1 text-xs text-blue-500 hover:underline'
                      href={samplepdf}
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
