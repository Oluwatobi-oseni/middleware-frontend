import { useParams } from 'react-router-dom'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import pdf from '../../../assets/pdf.svg'
// import { DataTable } from '@/components/table/data-table'
import { columns } from './activity-table/columns'
import { data } from './activity-table/data'
// import UserForm from '../components/user-form'

import WalletCards from '../components/wallet-card'
// import { columns } from './columns'
// import { data } from './data'
import { DataTable } from '@/components/table/data-table'

const UserDetails = () => {
  const { id } = useParams()
  console.log('The user id is', id)

  // Sample user data
  // const userData = {
  //   accountName: 'Chinedu Technologies',
  //   phoneNo: '123-456-7890',
  //   email: 'Chinedu@alert.com.ng',
  //   accountInfo: {
  //     businessLocation: 'Nigeria',
  //     registrationNumber: '002456899888',
  //     industry: 'Financial Technology',
  //     companySize: '0 - 100',
  //     estimatedAnnualVolume: 'N100,000 - N1,000,000',
  //     officeAddress: '12th strt, Elolo, Off Dreams Ville',
  //     about:
  //       'Chinedu Technologies is a forward-thinking technology company focused on revolutionizing digital solutions worldwide. Our platform empowers individuals and businesses to seamlessly manage multiple digital tools, enhance connectivity, and streamline operations across borders.',
  //   },
  //   documents: {
  //     registrationCertificate: 'link_to_certificate.pdf',
  //     taxClearance: 'link_to_tax_clearance.pdf',
  //     otherDocuments: ['link_to_other_doc1.pdf', 'link_to_other_doc2.pdf'],
  //   },
  //   trackActivity: {
  //     lastLogin: '2023-10-28',
  //     loginCount: 15,
  //     recentActivities: [
  //       'Updated business information on 2023-10-15',
  //       'Submitted tax clearance on 2023-09-20',
  //       'Added new employee on 2023-08-30',
  //     ],
  //   },
  // }

  // const initials = userData.accountName
  //   .split(' ')
  //   .map((word) => word[0])
  //   .join('')

  return (
    <div className='h-screen overflow-y-auto hide-scrollbar'>
      {/* <UserForm /> */}
      <WalletCards />
      <div className='overflow-auto'>
        <h2 className='mb-4 mt-8 border-b-2 border-gray-300 pb-2 text-xl text-muted-foreground'>
          Transactions History
        </h2>
        <DataTable
          columns={columns}
          data={data}
          inputPlaceHolder='Search Transactions'
          filterColumn='transactionName'
          showButton
          buttonText='Done'
        />
      </div>
    </div>
  )
}

export default UserDetails
