import { useBusinesses } from '@/lib/pos/hook'
import { BusinessResponse } from '@/lib/pos/type'

export const useBusinessData = () => {
  const { data, error, isLoading } = useBusinesses()
  return { data: data as BusinessResponse[], error, isLoading }
}

// export const data: Business[] = [
//   {
//     id: '1',
//     businessName: 'Tech Innovators',
//     ownersName: 'Adebayo Sola',
//     dateRegistered: 'Sep 15, 2024',
//     posAssigned: 5,
//     kybStatus: 'Verified',
//     registeredPosTerminals: 8,
//     businessLocation: 'Lagos, Nigeria',
//     registrationNumber: 'RC123456',
//     industry: 'Technology',
//     companySize: '50-100 employees',
//     estimatedAnnualVolume: '₦100M - ₦500M',
//     email: 'info@techinnovators.com',
//     officeAddress: '123 Innovation Street, Victoria Island, Lagos',
//     about: 'Leading provider of innovative tech solutions across Africa.',
//   },
//   {
//     id: '2',
//     businessName: 'Green Earth Supplies',
//     ownersName: 'Ngozi Okafor',
//     dateRegistered: 'Aug 10, 2024',
//     posAssigned: 3,
//     kybStatus: 'Pending',
//     registeredPosTerminals: 5,
//     businessLocation: 'Abuja, Nigeria',
//     registrationNumber: 'RC654321',
//     industry: 'Agriculture',
//     companySize: '20-50 employees',
//     estimatedAnnualVolume: '₦50M - ₦200M',
//     email: 'contact@greenearth.com',
//     officeAddress: '456 Greenway Drive, Central District, Abuja',
//     about: 'Supplier of eco-friendly agricultural products and services.',
//   },
//   {
//     id: '3',
//     businessName: 'BlueSky Ventures',
//     ownersName: 'Emeka Chukwuma',
//     dateRegistered: 'Jul 22, 2024',
//     posAssigned: 7,
//     kybStatus: 'Failed',
//     registeredPosTerminals: 10,
//     businessLocation: 'Port Harcourt, Nigeria',
//     registrationNumber: 'RC789012',
//     industry: 'Energy',
//     companySize: '100+ employees',
//     estimatedAnnualVolume: '₦500M+',
//     email: 'support@blueskyventures.com',
//     officeAddress: '789 Ocean Drive, Trans-Amadi, Port Harcourt',
//     about: 'Focused on sustainable energy solutions and investments.',
//   },
// ]
