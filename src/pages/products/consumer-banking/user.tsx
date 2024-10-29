import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import pdf from '../../../assets/pdf.svg'
import { DataTable } from '@/components/table/data-table'
import { columns } from './transaction/columns'
import { data } from './transaction/data'
import Header from '@/components/custom/header'

const UserDetails = () => {
  const { id } = useParams()
  console.log(id)

  // Sample user data
  const userData = {
    accountName: 'Chinedu Technologies',
    phoneNo: '123-456-7890',
    email: 'Chinedu@alert.com.ng',
    accountInfo: {
      businessLocation: 'Nigeria',
      registrationNumber: '002456899888',
      industry: 'Financial Technology',
      companySize: '0 - 100',
      estimatedAnnualVolume: 'N100,000 - N1,000,000',
      officeAddress: '12th strt, Elolo, Off Dreams Ville',
      about:
        'Chinedu Technologies is a forward-thinking technology company focused on revolutionizing digital solutions worldwide. Our platform empowers individuals and businesses to seamlessly manage multiple digital tools, enhance connectivity, and streamline operations across borders.',
    },
    documents: {
      registrationCertificate: 'link_to_certificate.pdf',
      taxClearance: 'link_to_tax_clearance.pdf',
      otherDocuments: ['link_to_other_doc1.pdf', 'link_to_other_doc2.pdf'],
    },
    trackActivity: {
      lastLogin: '2023-10-28',
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

  return (
    <>
      <div className='h-screen overflow-y-auto'>
        <Header title={userData.accountName} desc='Consumer Banking' />
        <div className='my-6 flex flex-col md:flex-row'>
          {/* Left Section: User Information */}
          <div className='mb-4 w-1/5 '>
            <div className='flex w-full flex-col items-start'>
              <div className='flex h-32 w-32 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-6xl font-bold text-white shadow-lg'>
                {initials}
              </div>
              <div className='mt-4 text-center'>
                <p className='text-xs text-muted-foreground'>
                  {userData.phoneNo}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {userData.email}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Tabs */}
          <div className='w-4/5'>
            <Tabs
              orientation='vertical'
              defaultValue='account-info'
              className='space-y-4'
            >
              <div className='flex items-center justify-between'>
                <TabsList>
                  <TabsTrigger value='account-info'>Account Info</TabsTrigger>
                  <TabsTrigger value='documents'>Documents</TabsTrigger>
                  <TabsTrigger value='track-activities'>
                    Track Activities
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Account Info Tab */}
              <TabsContent value='account-info'>
                <div className='grid grid-cols-1 gap-6 p-4 text-sm shadow-md'>
                  <div className='flex w-full justify-between pb-2 text-muted-foreground'>
                    <strong className='text-muted-foreground'>
                      Business Name
                    </strong>
                    <span>{userData.accountName}</span>
                  </div>
                  <div className='flex justify-between pb-2 text-muted-foreground'>
                    <strong>Business Location</strong>
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
                      <img
                        src={pdf} // Replace with the path to your PDF icon/image
                        alt='PDF Icon'
                        className='mb-1 h-12' // Reduced height
                      />
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

              {/* Track Activities Tab */}
              <TabsContent value='track-activities'>
                <div className='rounded-lg p-4 shadow-md sm:p-6'>
                  <h4 className='mb-4 text-lg font-semibold'>
                    User Activity Overview
                  </h4>

                  <div className='mb-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2'>
                    {/* Last Login */}
                    <div className='flex items-center rounded-lg p-4 text-muted-foreground'>
                      <strong>Last Login:</strong>
                      <span className='ml-2 font-medium'>
                        {userData.trackActivity.lastLogin}
                      </span>
                    </div>

                    {/* Login Count */}
                    <div className='flex items-center rounded-lg p-4 text-muted-foreground'>
                      <strong>Login Count:</strong>
                      <span className='ml-2 font-medium'>
                        {userData.trackActivity.loginCount}
                      </span>
                    </div>
                  </div>

                  <h4 className='my-4 text-lg font-semibold'>
                    Recent Activities:
                  </h4>
                  <ul className='list-none pl-0'>
                    {userData.trackActivity.recentActivities.map(
                      (activity, index) => (
                        <li
                          key={index}
                          className='mb-3 flex items-center text-sm text-muted-foreground'
                        >
                          {/* Custom Bullet Point */}
                          <div className='mr-3 h-3 w-3 rounded-full bg-muted-foreground'></div>
                          <span>{activity}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='overflow-auto'>
          <h2 className='mb-2 mt-8 border-b-2 border-gray-300 pb-2 text-xl text-muted-foreground'>
            Transactions
          </h2>
          <DataTable
            columns={columns}
            data={data}
            inputPlaceHolder='Search Transactions'
            filterColumn='accountName'
            showDateRangePicker={false}
          />
        </div>
      </div>
    </>
  )
}

export default UserDetails
