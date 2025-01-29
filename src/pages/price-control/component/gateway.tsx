import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DollarSign, Percent, SlidersHorizontal } from 'lucide-react'
import { Info } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const formSchema = z.object({
  pricingType: z.enum(['flat', 'percentage', 'minmax']),
  percentageFee: z.string().optional(),
  removeCap: z.number().optional(),
  removePlus: z.number().optional(),
})

const Gateway = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pricingType: 'flat',
      percentageFee: '',
      removeCap: 0,
      removePlus: 0,
    },
  })

  const [selectedPricingType, setSelectedPricingType] = useState('flat')

  function onSubmit(values: {
    pricingType: string
    percentageFee: string
    removeCap: number
    removePlus: number
  }) {
    console.log(values)
  }

  const handleSelectPricingType = (value: string) => {
    setSelectedPricingType(value)
    form.setValue('pricingType', value) // Update the form state
  }

  //   const generateTitleFromPathname = (pathname: string) => {
  //     const pathSegments = pathname.split('/').filter(Boolean)
  //     const title = pathSegments
  //       .map((segment) =>
  //         segment
  //           .replace(/-/g, ' ')
  //           .replace(/\b\w/g, (char) => char.toUpperCase())
  //       )
  //       .join(' ')
  //     return title
  //   }

  //   const title = generateTitleFromPathname(location.pathname)

  const { pathname } = useLocation() // Access the current pathname

  // Extract the last part of the path
  const pathParts = pathname.split('/') // Split the pathname by "/"
  const lastPart = pathParts[pathParts.length - 1] // Get the last segment

  // Format the title (capitalize each word)
  const title = lastPart
    .split('-') // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' ') // Join them with spaces
  return (
    <div className='w-full'>
      <div className='mb-4 flex flex-col'>
        <h3 className='text-sm text-muted-foreground/75'>Gateway</h3>
        <h1 className='text-xl text-muted-foreground'>
          {title === 'Price Control' ? 'Data' : title}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4'>
          <div className='max-h-[60vh] space-y-8 overflow-y-auto hide-scrollbar'>
            {/* Currency */}
            <FormItem>
              <FormLabel className='mb-4 flex items-center space-x-1 text-sm text-muted-foreground/75'>
                Currency <span className='text-red-500'>*</span>
              </FormLabel>
              <div className='mb-4 w-fit rounded-md border border-[#004DEF] bg-[#004DEF1A] px-4 py-2 text-[#004DEF]'>
                <span className='text-lg font-semibold'>₦</span> NGN
              </div>
              <Alert className='flex max-w-2xl items-center justify-between rounded-md border-none bg-[#FF96001A] px-8 py-4 text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Info className='mr-2 h-5 w-5 text-[#FF9600]' />
                  <div>
                    <AlertTitle className='text-xs'>Current Pricing</AlertTitle>
                    <AlertDescription className='text-xs'>
                      2.5%
                    </AlertDescription>
                  </div>
                </div>
                <div className='text-xs font-medium'>
                  Last updated: Feb 14, 2025 at 11 AM
                </div>
              </Alert>
            </FormItem>

            {/* Pricing Type */}
            <FormField
              control={form.control}
              name='pricingType'
              render={() => {
                // const [selected, setSelected] = useState(field.value)

                // const handleSelect = (value: string) => {
                //   setSelected(value)
                //   field.onChange(value)
                // }

                return (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className='mb-4 flex items-center space-x-1 text-sm text-muted-foreground/75'>
                      Pricing <span className='text-red-500'>*</span>
                    </FormLabel>

                    {/* Selection Options */}
                    <div className='flex space-x-4'>
                      {[
                        {
                          value: 'flat',
                          label: 'Flat',
                          icon: <DollarSign className='h-5 w-5' />,
                        },
                        {
                          value: 'percentage',
                          label: 'Percentage',
                          icon: <Percent className='h-5 w-5' />,
                        },
                        {
                          value: 'minmax',
                          label: 'Min/Max',
                          icon: <SlidersHorizontal className='h-5 w-5' />,
                        },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className={`flex cursor-pointer items-center space-x-2 rounded-md border px-4 py-2 ${
                            selectedPricingType === option.value
                              ? 'border-[#004DEF] bg-[#004DEF1A] text-[#004DEF]'
                              : 'border-gray-300 bg-white text-gray-700'
                          }`}
                          onClick={() => handleSelectPricingType(option.value)}
                        >
                          {option.icon}
                          <span className='text-sm font-medium'>
                            {option.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )
              }}
            />

            {/* Percentage Fee Deduction */}
            <FormField
              control={form.control}
              name='percentageFee'
              render={({ field }) => {
                const pricingType = form.watch('pricingType') // Get the selected pricing type

                // Determine the icon based on pricing type
                const icon = {
                  flat: <DollarSign className='h-5 w-5 text-gray-500' />,
                  percentage: <Percent className='h-5 w-5 text-gray-500' />,
                  minmax: (
                    <SlidersHorizontal className='h-5 w-5 text-gray-500' />
                  ),
                }[pricingType]

                return (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className='mb-2 text-muted-foreground'>
                      A percentage fee deducted from each transaction amount
                      processed
                    </FormLabel>

                    {/* Input with Icon */}
                    <div className='relative w-36'>
                      <div className='absolute inset-y-0 left-3 flex items-center text-muted-foreground'>
                        {icon}
                      </div>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='2.5'
                          className='w-full rounded-md border py-2 pl-10 pr-4 text-sm focus:border-[#004DEF] focus:ring-0'
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* Remove Cap & Remove Plus */}
            <div className='flex flex-col gap-4'>
              {/* Remove Cap */}
              <FormField
                control={form.control}
                name='removeCap'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm text-red-500'>
                      Remove Cap
                    </FormLabel>
                    <div className='relative w-36'>
                      <div className='absolute inset-y-0 left-3 flex items-center text-muted-foreground'>
                        ₦
                      </div>
                      <FormControl>
                        <Input
                          type='number'
                          className='w-full rounded-md border py-2 pl-10 pr-4 text-sm focus:border-[#004DEF] focus:ring-0'
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              {/* Remove Plus */}
              <FormField
                control={form.control}
                name='removePlus'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm text-red-500'>
                      Remove Plus
                    </FormLabel>
                    <div className='relative w-36'>
                      <div className='absolute inset-y-0 left-3 flex items-center text-muted-foreground'>
                        ₦
                      </div>
                      <FormControl>
                        <Input
                          type='number'
                          className='w-full rounded-md border py-2 pl-10 pr-4 text-sm focus:border-[#004DEF] focus:ring-0'
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type='submit' className='rounded-lg px-32 py-6'>
              Update Pricing
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Gateway
