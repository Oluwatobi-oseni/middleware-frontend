import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import pdf from '../../../assets/pdf.svg'
import {
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
import { useState } from 'react'

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
    trackActivity: {
      lastLogin: '2023-10-15',
      loginCount: 15,
      recentActivities: [
        'Updated business information on 2023-10-15',
        'Submitted tax clearance on 2023-09-20',
        'Added new employee on 2023-08-30',
      ],
    },
  }

  const initials = userData.accountName
    .split(' ')
    .map((word) => word[0])
    .join('')
  const [status, setStatus] = useState('VERIFIED')
  return (
    <>
      <div className='h-screen overflow-y-auto'>
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
          <div className='flex flex-col space-y-3'>
            {/* Business Status Label and Dropdown */}
            <div className='flex items-center gap-2 text-sm'>
              <span className='font-medium text-gray-700'>Business Status</span>
              <select
                className={`mt-1 rounded border p-1 text-xs ${
                  status === 'VERIFIED'
                    ? 'border-green-500 text-green-600'
                    : 'border-red-500 text-red-600'
                }`}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='VERIFIED'>VERIFIED</option>
                <option value='UNVERIFIED'>UNVERIFIED</option>
              </select>
            </div>

            <div>
              <p className='text-xs text-muted-foreground'>
                by alertgroup@alertmfb.com.ng
              </p>
            </div>
          </div>
        </div>

        <div className='my-6 flex flex-col md:flex-row'>
          {/* Left Section: User Information */}
          <div className='mb-4 w-1/4'>
            <div className='flex w-full flex-col items-start'>
              <div className='flex h-48 w-48 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-6xl font-bold text-white shadow-lg'>
                {initials}
              </div>
              <div className='mt-4 text-left'>
                <p className='mb-2 flex items-center text-xs text-muted-foreground'>
                  <IconPhoneFilled className='mr-2 h-4 w-4 text-muted-foreground' />
                  {userData.phoneNo}
                </p>
                <p className='mb-2 flex items-center text-xs text-muted-foreground'>
                  <IconMessage className='mr-2 h-4 w-4 text-muted-foreground' />
                  {userData.email}
                </p>
                <p className='mb-2 flex items-center text-xs text-muted-foreground'>
                  <IconWorldWww className='mr-2 h-4 w-4 text-muted-foreground' />
                  {userData.website}
                </p>
              </div>
              <div className='mt-4'>
                <span className='rounded-full bg-muted-foreground px-3 py-1 text-xs font-semibold text-muted'>
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
                  <TabsTrigger value='account-info'>Basic Info</TabsTrigger>
                  <TabsTrigger value='documents'>Documents</TabsTrigger>
                  <TabsTrigger value='settings'>Settings</TabsTrigger>
                  <TabsTrigger value='bank-accounts'>Bank Accounts</TabsTrigger>
                </TabsList>
              </div>

              {/* Account Info Tab */}
              <TabsContent value='account-info'>
                <div className='grid grid-cols-1 gap-6 p-4 text-sm shadow-md'>
                  <div className='flex w-full justify-between pb-2 text-muted-foreground'>
                    <strong className='text-muted-foreground'>
                      Business Location
                    </strong>
                    <span>{userData.accountInfo.businessLocation}</span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <strong>Registration Number</strong>
                    <span>{userData.accountInfo.registrationNumber}</span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <strong>Industry</strong>
                    <span>{userData.accountInfo.industry}</span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <strong>Company Size</strong>
                    <span>{userData.accountInfo.companySize}</span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <strong>Estimated Annual Volume</strong>
                    <span>{userData.accountInfo.estimatedAnnualVolume}</span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <strong>Office Address</strong>
                    <span>{userData.accountInfo.officeAddress}</span>
                  </div>
                  <div className='flex justify-between text-muted-foreground'>
                    <strong>About</strong>
                    <span className='max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg'>
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
                <div className='p-4'>
                  <h4 className='text-lg font-semibold'>
                    Bank Accounts Content
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Here you can manage bank account information.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails
