import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { addDays, format } from 'date-fns'
import { cn } from '@/lib/utils'

const businesses = [
  { value: 'business_1', label: 'Business 1' },
  { value: 'business_2', label: 'Business 2' },
  { value: 'business_3', label: 'Business 3' },
  { value: 'business_4', label: 'Business 4' },
]

export function AssignPOS() {
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const [comboBoxOpen, setComboBoxOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Assign POS</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Assign POS</DialogTitle>
          <DialogDescription>
            Please enter the required information accurately.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='grid items-center gap-1.5'>
              <Label htmlFor='posname'>POS Name</Label>
              <Input type='text' id='posname' placeholder='Enter POS name' />
            </div>
            <div className='grid max-w-sm items-center gap-1.5'>
              <Label htmlFor='businessName'>Business Name</Label>
              <Popover open={comboBoxOpen} onOpenChange={setComboBoxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={comboBoxOpen}
                    className='w-full justify-between text-xs text-muted-foreground'
                  >
                    {selectedBusiness
                      ? businesses.find((b) => b.value === selectedBusiness)
                          ?.label
                      : 'Select business name...'}
                    <ChevronsUpDown className='opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command>
                    <CommandInput
                      placeholder='Search business...'
                      className='h-9'
                    />
                    <CommandList>
                      <CommandEmpty>No business found.</CommandEmpty>
                      <CommandGroup>
                        {businesses.map((business) => (
                          <CommandItem
                            key={business.value}
                            value={business.value}
                            onSelect={(currentValue) => {
                              setSelectedBusiness(
                                currentValue === selectedBusiness
                                  ? ''
                                  : currentValue
                              )
                              setComboBoxOpen(false)
                            }}
                          >
                            {business.label}
                            <Check
                              className={
                                selectedBusiness === business.value
                                  ? 'ml-auto opacity-100'
                                  : 'ml-auto opacity-0'
                              }
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='grid items-center gap-1.5'>
            <Label htmlFor='deviceType'>Device Type</Label>
            <Select>
              <SelectTrigger id='deviceType' className='w-full'>
                <SelectValue placeholder='Select a device type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Device Types</SelectLabel>
                  <SelectItem value='android'>Android</SelectItem>
                  <SelectItem value='semi-android'>Semi-Android</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid items-center gap-1.5'>
            <Label htmlFor='serialNumber'>POS Serial Number</Label>
            <Input
              type='text'
              id='serialNumber'
              placeholder='Enter serial number'
            />
          </div>
          <div className='grid items-center gap-1.5'>
            <Label htmlFor='date'>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align='start'
                className='flex w-auto flex-col space-y-2 p-2'
              >
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='0'>Today</SelectItem>
                    <SelectItem value='1'>Tomorrow</SelectItem>
                    <SelectItem value='3'>In 3 days</SelectItem>
                    <SelectItem value='7'>In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className='rounded-md border'>
                  <Calendar mode='single' selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Alert className='flex items-start gap-2 rounded-md bg-yellow-100 p-4 text-yellow-700'>
            <div>
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription className='text-xs'>
                A POS cannot be assigned until the KYB (Know Your Business)
                process is complete.
              </AlertDescription>
            </div>
          </Alert>
        </div>
        <DialogFooter>
          <Button type='submit' className='w-full'>
            Assign POS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
