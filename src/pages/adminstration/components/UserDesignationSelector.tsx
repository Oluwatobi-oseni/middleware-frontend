// import React, { useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// // import { useModifyUserDesignation } from '@/lib/users/hook' // Adjust the import as needed

// type Designation =
//   | 'HUMAN_RESOURCES'
//   | 'FINANCE'
//   | 'BRANCH_MANAGER'
//   | 'COMPLIANCE'
//   | 'LOAN_OFFICER'
//   | 'CUSTOMER_SERVICES'
//   | 'IT_OFFICE'
//   | 'LEGAL'

// const designationMapping: Record<Designation, string> = {
//   HUMAN_RESOURCES: 'Human Resources',
//   FINANCE: 'Finance',
//   BRANCH_MANAGER: 'Branch Manager',
//   COMPLIANCE: 'Compliance',
//   LOAN_OFFICER: 'Loan Officer',
//   CUSTOMER_SERVICES: 'Customer Services',
//   IT_OFFICE: 'IT Office',
//   LEGAL: 'Legal',
// }

// export function UserDesignationSelector({
//   userDetails,
// }: {
//   userDetails: { designation: string; id: number }
// }) {
// //   const { mutate: modifyUserDesignation, isPending } = useModifyUserDesignation()
//   const [selectedDesignation, setSelectedDesignation] = useState(userDetails.designation)
//   const [pendingDesignation, setPendingDesignation] = useState<string | null>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const handleDesignationChange = (newDesignation: string) => {
//     if (newDesignation !== selectedDesignation) {
//       setPendingDesignation(newDesignation)
//       setIsModalOpen(true) // Open confirmation modal
//     }
//   }

//   const confirmDesignationChange = () => {
//     if (pendingDesignation) {
//       modifyUserDesignation(
//         { userId: userDetails.id, newDesignation: pendingDesignation },
//         {
//           onSuccess: () => {
//             setSelectedDesignation(pendingDesignation)
//             setPendingDesignation(null)
//             setIsModalOpen(false) // Close modal on success
//           },
//         }
//       )
//     }
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setPendingDesignation(null)
//   }

//   return (
//     <div className='flex flex-col gap-4'>
//       <div className='flex items-center justify-between'>
//         <Select value={selectedDesignation} onValueChange={handleDesignationChange}>
//           <SelectTrigger className='w-[180px]'
//         //   disabled={isPending}
//           >
//             <SelectValue>
//               {designationMapping[pendingDesignation as Designation] ||
//                 designationMapping[selectedDesignation as Designation]}
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value='HUMAN_RESOURCES'>Human Resources</SelectItem>
//               <SelectItem value='FINANCE'>Finance</SelectItem>
//               <SelectItem value='BRANCH_MANAGER'>Branch Manager</SelectItem>
//               <SelectItem value='COMPLIANCE'>Compliance</SelectItem>
//               <SelectItem value='LOAN_OFFICER'>Loan Officer</SelectItem>
//               <SelectItem value='CUSTOMER_SERVICES'>Customer Services</SelectItem>
//               <SelectItem value='IT_OFFICE'>IT Office</SelectItem>
//               <SelectItem value='LEGAL'>Legal</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Confirmation Dialog */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Designation Change</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to change the user's designation to{' '}
//               <strong>
//                 {designationMapping[pendingDesignation as Designation] || pendingDesignation}
//               </strong>
//               ?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant='secondary' onClick={closeModal}>
//               Cancel
//             </Button>
//             <Button onClick={confirmDesignationChange}
//             // disabled={isPending}
//             >
//               {/* {isPending ? 'Processing...' : 'Confirm'} */}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
