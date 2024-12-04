import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useCreateCode } from '@/lib/promo-code/hook'

// Define form schema with zod
const formSchema = z.object({
  codeTitle: z.string().min(1, 'Code Title is required'),
  code: z.string().min(1, 'Code is required'),
  amount: z.number().min(0.01, 'Amount must be greater than zero'),
  usageLimit: z.string().min(1, 'Number of usage must be at least 1'),
  expirationDate: z.date(),
})

export function CreateCodeDialog() {
  //   const [date, setDate] = useState<Date | undefined>(new Date())
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codeTitle: '',
      code: '',
      amount: 0.0,
      usageLimit: '',
      expirationDate: new Date(),
    },
  })

  const { mutate, isPending } = useCreateCode()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      title: data.codeTitle,
      key: data.code,
      amount: data.amount,
      usage: parseInt(data.usageLimit),
      expirationDate: data.expirationDate.toISOString(),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Plus size={16} />
          Create Code
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Code</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Code Title Input */}
            <FormField
              control={form.control}
              name='codeTitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter Code Title<span className='text-red-500'> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='eg Alert Bonus' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code Input */}
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter Code<span className='text-red-500'> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='ALERTBONUS012345' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Input with Naira Icon */}
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount to Fund<span className='text-red-500'> *</span>
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        placeholder='0.00'
                        {...field}
                        value={(field.value ?? 0).toString()}
                        onChange={(e) => {
                          let value = e.target.value
                          if (
                            value.startsWith('0') &&
                            !value.startsWith('0.')
                          ) {
                            value = parseFloat(value).toString()
                          }
                          field.onChange(value ? parseFloat(value) : 0)
                        }}
                        className='py-8 text-2xl text-muted-foreground'
                        type='number'
                        step='0.01'
                        min={0}
                      />
                      <span className='absolute right-2 top-1/2 mr-8 flex -translate-y-1/2 transform items-center gap-1 text-muted-foreground'>
                        <img
                          src='https://www.svgrepo.com/show/401711/flag-for-nigeria.svg'
                          alt='Nigerian flag'
                          className='h-6 w-6'
                        />
                        <span className='text-sm'>NGN</span>
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Usage and Expiration Date on Same Line */}
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='usageLimit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Number of Usage<span className='text-red-500'> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Usage Limit'
                        {...field}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='expirationDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Expiration Date<span className='text-red-500'> *</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full'
              // disabled={!form.formState.isValid || isPending}
            >
              {isPending ? 'Creating...' : 'Create Code'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
