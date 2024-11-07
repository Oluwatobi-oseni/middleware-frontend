import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import pdf from '../../../assets/pdf.svg'
import {
  IconBuildingBank,
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

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
  slug: z.string().optional(),
})

const UserDetails = () => {
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
      {
        accountName: 'Tech Innovations Savings Account',
        accountNumber: '0987654321',
        bankName: 'National Bank of Nigeria',
      },
      {
        accountName: 'Tech Innovations Dollar Account',
        accountNumber: '1122334455',
        bankName: 'International Bank PLC',
      },
    ],
  }
  const [isOpen, setIsOpen] = useState(false)
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
  return (
    <>
      <div className='hide-scrollbar h-screen overflow-y-auto'>
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
                  <SelectItem value='in-review'>KYB In Review</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='my-6 flex flex-col md:flex-row'>
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
                <span className='rounded-full bg-muted-foreground px-3 py-1 text-sm font-semibold text-muted'>
                  Track Activities
                </span>
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
                      href={userData.documents.registrationCertificate}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View File
                    </a>
                  </div>

                  {/* Tax Clearance */}
                  <div className='flex flex-col items-center rounded-lg p-3 shadow-md'>
                    <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                    <span className='text-sm font-semibold'>Tax Clearance</span>
                    <a
                      className='mt-1 text-xs text-blue-500 hover:underline'
                      href={userData.documents.taxClearance}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View File
                    </a>
                  </div>

                  {/* Other Documents */}
                  {userData.documents.otherDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className='flex flex-col items-center rounded-lg p-3 shadow-md'
                    >
                      <img src={pdf} alt='PDF Icon' className='mb-1 h-12' />
                      <span className='text-sm font-semibold'>
                        Certificate {index + 1}
                      </span>
                      <a
                        className='mt-1 text-xs text-blue-500 hover:underline'
                        href={doc}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        View File
                      </a>
                    </div>
                  ))}
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
                              <FormLabel>Slug</FormLabel>
                              <FormDescription>
                                Unique identifier for the business URL.
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
                              <FormLabel>Whitelabel Business</FormLabel>
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
                    </div>
                  </form>
                </Form>
              </TabsContent>

              {/* Bank Accounts Tab */}
              <TabsContent value='bank-accounts'>
                <div>
                  {/* Check if there are any bank accounts */}
                  {userData.bankAccounts && userData.bankAccounts.length > 0 ? (
                    userData.bankAccounts.map((account, index) => (
                      <Collapsible
                        key={index}
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className='my-4 w-[500px] space-y-2'
                      >
                        <div className='mb-2 flex items-center justify-between space-x-4'>
                          <div className='flex items-center space-x-4'>
                            <img
                              src='https://www.svgrepo.com/show/401711/flag-for-nigeria.svg'
                              alt='Nigeria Flag'
                              className='h-10 w-10 rounded-full shadow-sm'
                            />{' '}
                            <div>
                              <p className='text-sm font-semibold text-muted-foreground'>
                                NGN Account Details
                              </p>
                              <p className='text-muted-foreground/300 text-xs'>
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
                        <CollapsibleContent className='space-y-4'>
                          {/* Render account details or bank icon/message */}
                          <div className='mb-8 flex w-full max-w-lg transform  flex-col justify-center rounded-lg bg-muted p-4 text-sm'>
                            <p className='mb-4 flex justify-between'>
                              <span>Account Name</span>{' '}
                              <span>{account.accountName}</span>
                            </p>
                            <p className='mb-4 flex justify-between'>
                              <span>Account Number</span>{' '}
                              <div className='flex items-center gap-2'>
                                <span>{account.accountNumber}</span>
                                <IconCopy
                                  size={18}
                                  className='cursor-pointer text-gray-600 hover:text-gray-900'
                                  onClick={() => {
                                    navigator.clipboard
                                      .writeText(account.accountNumber)
                                      .then(() => {
                                        setIsCopied(true)
                                        setTimeout(
                                          () => setIsCopied(false),
                                          2000
                                        ) // Reset the copied state after 2 seconds
                                      })
                                  }}
                                />
                              </div>
                              {isCopied && (
                                <span className='text-sm text-green-600'>
                                  Copied!
                                </span>
                              )}
                            </p>
                            <p className='flex justify-between'>
                              <span>Bank Name</span>{' '}
                              <span>{account.bankName}</span>
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    // If no bank accounts, render the bank icon and message
                    <Collapsible
                      open={isOpen}
                      onOpenChange={setIsOpen}
                      className='w-[500px] space-y-2'
                    >
                      <div className='flex items-center justify-between space-x-4 px-4'>
                        <div className='flex items-center space-x-4'>
                          <img
                            src='https://www.svgrepo.com/show/401711/flag-for-nigeria.svg'
                            alt='Nigeria Flag'
                            className='h-10 w-10 rounded-full shadow-sm'
                          />{' '}
                          <div>
                            <p className='text-sm font-semibold text-muted-foreground'>
                              NGN Account Details
                            </p>
                            <p className='text-muted-foreground/300 text-xs'>
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

                      <div className='flex w-full max-w-lg transform items-center justify-center rounded-lg bg-muted p-4'>
                        <div className='mt-2 flex flex-col items-center space-y-4'>
                          <div className='rounded-full bg-green-500 p-2'>
                            <IconBuildingBank
                              size={20}
                              className='text-muted'
                            />
                          </div>
                          <p className='text-sm font-semibold text-muted-foreground'>
                            No bank account has been issued
                          </p>
                        </div>
                      </div>

                      {/* <CollapsibleContent className='space-y-2'>
                        <div className='rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
                          @radix-ui/colors
                        </div>
                        <div className='rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
                          @stitches/react
                        </div>
                      </CollapsibleContent> */}
                    </Collapsible>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <WalletCards />
      </div>
    </>
  )
}

export default UserDetails
