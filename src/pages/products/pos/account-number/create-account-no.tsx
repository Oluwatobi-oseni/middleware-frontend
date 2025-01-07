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
import PhoneInput from 'react-phone-number-input'
import { useCreateBusinessAccount } from '@/lib/pos/hook'
import { BusinessDetailsResponse } from '@/lib/pos/type'
import { CheckCircleIcon } from 'lucide-react'

const formSchema = z.object({
  FirstName: z.string().min(1, 'First Name is required'),
  LastName: z.string().min(1, 'Last Name is required'),
  Email: z.string().email('Invalid email address'),
  PhoneNo: z.string().min(1, 'Phone Number is required'),
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
    mode: 'onChange',
  })

  const { mutate, isPending } = useCreateBusinessAccount()
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState<string | undefined>()

  // const createBusinessAccount = useCreateBusinessAccount()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        Gender: business.Gender === 'male' ? 1 : 2,
        CustomerId: business.CustomerId || '',
        BVN: business.BVN || '',
        FirstName: data.FirstName,
        LastName: data.LastName,
        PlaceOfBirth: business.PlaceOfBirth || '',
        DateOfBirth: business.DateOfBirth || '',
        PhoneNo: data.PhoneNo,
        Address: business.Address || '',
        Email: data.Email,
        ProductId: '0193d868-2a38-76c6-925b-3cc3004e940d',
      }
      await mutate(payload)
      form.reset()
      setShowSuccessDialog(true)
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
              <PhoneInput
                defaultCountry='NG'
                id='phoneNumber'
                placeholder='Enter phone number'
                value={form.watch('PhoneNo') ?? ''}
                onChange={(value) => form.setValue('PhoneNo', value as string)}
                className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200'
              />
            </div>
          </form>
          <DialogFooter>
            <Button
              type='submit'
              className='w-full'
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? 'Creating...' : 'Create Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className='flex flex-col items-center justify-center gap-4'>
          <CheckCircleIcon className='h-16 w-16 text-green-500' />
          <DialogTitle>Success</DialogTitle>
          <DialogDescription>
            Account number has been successfully created under {business.name}.
          </DialogDescription>
          <Button onClick={() => setShowSuccessDialog(false)}>OK</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
