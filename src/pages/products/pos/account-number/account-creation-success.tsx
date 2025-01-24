// import { CheckCircle } from 'lucide-react'
// import { useState } from 'react'

// const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
// const [accountName, setAccountName] = useState('') // Track account name for success message

// const handleFormSubmit = () => {
//   // Validate inputs and check all conditions
//   if (allConditionsAreMet()) {
//     setIsSuccessDialogOpen(true)
//   }
// }

// const allConditionsAreMet = () => {
//   // Implement validation logic for form fields
//   return true // Placeholder, replace with actual validation
// }

// return (
//   <>
//     <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
//       <DialogContent className='sm:max-w-[425px]'>
//         <DialogHeader>
//           <div className='flex items-center justify-center'>
//             <CheckCircle className='text-green-600 h-16 w-16' />
//           </div>
//           <DialogTitle>Account Number Created Successfully</DialogTitle>
//           <DialogDescription>
//             Account number has been successfully created under{' '}
//             <strong>{accountName}</strong>.
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <Button onClick={() => setIsSuccessDialogOpen(false)} className='w-full'>
//             Done
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>

//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>Create Account No</Button>
//       </DialogTrigger>
//       <DialogContent className='sm:max-w-[425px]'>
//         <DialogHeader>
//           <DialogTitle>Account Number</DialogTitle>
//           <DialogDescription>Please enter the required information accurately.</DialogDescription>
//         </DialogHeader>
//         {/* Form content here */}
//         <DialogFooter>
//           <Button type='submit' onClick={handleFormSubmit} className='w-full'>
//             Done
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   </>
// )
