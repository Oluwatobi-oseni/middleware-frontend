import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import { useCreateBusinessAccount } from '@/lib/pos/hook'
import { BusinessDetailsResponse } from '@/lib/pos/type'
import { CircleCheck } from 'lucide-react'

const formSchema = z.object({
  FirstName: z.string().min(1, 'First Name is required'),
  LastName: z.string().min(1, 'Last Name is required'),
  Email: z.string().email('Invalid email address'),
  PhoneNo: z
    .string()
    // .regex(
    //   /^(?:\+234|0)(70|80|81|90|91)\d{8}$/,
    //   'Invalid phone number. Please enter a valid Nigerian phone number.'
    // )
    .min(10, 'Phone Number must be at least 11 digits')
    .max(11, 'Phone Number must be at most 11 digits'),
})

export function CreateAccountNo({
  business,
}: {
  business: BusinessDetailsResponse
}) {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      PhoneNo: '',
    },
    // mode: 'onChange',
  })

  const { mutate, isPending, data } = useCreateBusinessAccount()
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState<string | undefined>()

  // const createBusinessAccount = useCreateBusinessAccount()
  const res = data?.data
  // console.log('French', data)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        Gender: business.Gender === 'male' ? 0 : 1,
        // CustomerId: business.CustomerId || '',
        CustomerId: '006363',
        // BVN: business.BVN || '',
        FirstName: data.FirstName,
        LastName: data.LastName,
        PlaceOfBirth: business.PlaceOfBirth || '',
        DateOfBirth: business.DateOfBirth || '',
        PhoneNo: data.PhoneNo,
        Address: business.Address || '',
        Email: data.Email,
        ProductId: '0193a96f-0a7c-722f-8af7-18cf7s361re2',
      }
      await mutate(payload)
      console.log(payload)
      form.reset()
      {
        res?.IsSuccessful && setShowSuccessDialog(true)
      }
    } catch (error) {
      console.error('Error creating account:', error)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Account No</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Account Number</DialogTitle>
            <DialogDescription>
              Please enter the required information accurately.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <div className='grid grid-cols-2 gap-2'>
              <div className='grid items-center gap-1.5'>
                <Label htmlFor='firstName'>
                  First Name <span className='text-red-600'>*</span>
                </Label>
                <Input
                  type='text'
                  id='firstName'
                  placeholder='Enter first name'
                  {...form.register('FirstName')}
                />
              </div>
              <div className='grid items-center gap-1.5'>
                <Label htmlFor='lastName'>
                  Last Name <span className='text-red-600'>*</span>
                </Label>
                <Input
                  autoComplete='off'
                  type='text'
                  id='lastName'
                  placeholder='Enter last name'
                  {...form.register('LastName')}
                />
              </div>
            </div>
            <div className='grid items-center gap-1.5'>
              <Label htmlFor='email'>
                Email Address <span className='text-red-600'>*</span>
              </Label>
              <Input
                autoComplete='off'
                type='email'
                id='email'
                placeholder='Enter email address'
                {...form.register('Email')}
              />
            </div>
            <div className='grid items-center gap-2'>
              <Label htmlFor='phoneNumber'>
                Phone Number <span className='text-red-600'>*</span>
              </Label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-lg'>
                  🇳🇬 +234
                </span>
                <Input
                  autoComplete='off'
                  type='tel'
                  {...form.register('PhoneNo')}
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 pl-20 text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type='submit'
                className='w-full'
                disabled={!form.formState.isValid || isPending}
              >
                {isPending ? 'Creating...' : 'Create Account'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className='flex flex-col items-center justify-center gap-4 sm:max-w-[425px]'>
          <CircleCheck className='h-16 w-16 text-green-500' />
          <DialogTitle>Account Number Created Successfully</DialogTitle>
          <DialogDescription className='text-center'>
            Account number has been successfully Created Under {business.name}.
          </DialogDescription>
          <Button
            className='w-full'
            onClick={() => setShowSuccessDialog(false)}
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
