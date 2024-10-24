import csvIcon from '../../../assets/csv.svg'
import excelIcon from '../../../assets/excel.svg'
import pdfIcon from '../../../assets/pdf.svg'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { IconDownload, IconPlus } from '@tabler/icons-react'
import { useState } from 'react'

export function ExportDialog() {
  const [selectedFormat, setSelectedFormat] = useState<
    'excel' | 'pdf' | 'csv' | null
  >(null)
  const [email, setEmail] = useState('')
  const handleSelectFormat = (format: 'excel' | 'pdf' | 'csv') => {
    setSelectedFormat(format)
  }

  const handleConfirm = () => {
    console.log('Selected format:', selectedFormat)
    console.log('Email:', email)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <IconDownload />
          <span>Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Data Report</DialogTitle>
          <DialogDescription className='text-xs'>
            Select the file type you would like to be sent to your email
          </DialogDescription>
        </DialogHeader>
        <div className='col-span-3 flex space-x-4'>
          {/* Excel Option */}
          <div
            className={`flex cursor-pointer items-center p-2 ${
              selectedFormat === 'excel' ? 'border border-blue-500' : ''
            }`}
            onClick={() => handleSelectFormat('excel')}
          >
            <img
              src={excelIcon}
              alt='excel'
              className='h-6 w-6'
              color='black'
            />
            <span className='ml-1'>Excel File</span>
          </div>

          {/* PDF Option */}
          <div
            className={`flex cursor-pointer items-center p-2 ${
              selectedFormat === 'pdf' ? 'border border-blue-500' : ''
            }`}
            onClick={() => handleSelectFormat('pdf')}
          >
            <img src={pdfIcon} alt='pdf' className='h-6 w-6' color='black' />
            <span className='ml-1'>PDF File</span>
          </div>

          {/* CSV Option */}
          <div
            className={`flex cursor-pointer items-center p-2 ${
              selectedFormat === 'csv' ? 'border border-blue-500' : ''
            }`}
            onClick={() => handleSelectFormat('csv')}
          >
            <img src={csvIcon} alt='csv' className='h-6 w-6' color='black' />
            <span className='ml-1'>CSV File</span>
          </div>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <div className='relative w-full'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 transform'>
              <IconPlus size={16} />
            </span>
            <Input
              type='email'
              placeholder='Add email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full pl-8' // padding-left to accommodate icon
            />
          </div>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
