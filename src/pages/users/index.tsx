// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'

// import { Button } from '@/components/custom/button'
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { useInviteUser } from '@/lib/invites/hook'

// // Schema for form validation
// const InviteUserSchema = z.object({
//   email: z.string().email({ message: 'Please enter a valid email address.' }),
//   role: z.string().min(1, { message: 'Please select a role.' }),
// })

// type InviteUserFormValues = z.infer<typeof InviteUserSchema>

// export default function InviteUserForm() {
//   const form = useForm<InviteUserFormValues>({
//     resolver: zodResolver(InviteUserSchema),
//     defaultValues: {
//       email: '',
//       role: '',
//     },
//   })

//   const inviteUserMutation = useInviteUser()

//   function onSubmit(data: InviteUserFormValues) {
//     inviteUserMutation.mutate(data)
//   }

//   return (
//     <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
//       <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
//         <Card className='mx-auto w-[400px] p-6'>
//           <CardHeader>
//             <CardTitle>Invite User</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className='space-y-4'
//               >
//                 <FormField
//                   control={form.control}
//                   name='email'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type='email'
//                           placeholder="Enter user's email"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name='role'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <FormControl>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder='Select a role' />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value='MEMBER'>Member</SelectItem>
//                             <SelectItem value='SUPER_ADMIN'>
//                               Super Admin
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <CardFooter className='flex justify-end'>
//                   <Button
//                     className='mt-8 w-full'
//                     loading={inviteUserMutation.isPending}
//                   >
//                     Invite User
//                   </Button>
//                 </CardFooter>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
