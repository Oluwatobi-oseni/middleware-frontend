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
import { IconDownload } from '@tabler/icons-react'
import { useState, useEffect } from 'react'

export function ExportDialog() {
  const [selectedFormat, setSelectedFormat] = useState<
    'excel' | 'pdf' | 'csv' | null
  >(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve the email from sessionStorage on component mount
    const storedEmail = sessionStorage.getItem('userEmail')
    setEmail(storedEmail)
  }, [])

  const handleSelectFormat = (format: 'excel' | 'pdf' | 'csv') => {
    setSelectedFormat(format)
  }

  const handleConfirm = () => {
    if (!email) {
      console.error('Email not found in sessionStorage')
      return
    }
    console.log('Selected format:', selectedFormat)
    console.log('Email:', email)

    // Add your API call logic here
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'} className='text-xs'>
          <IconDownload className='text-muted-200 h-4 w-4' />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[375px]'>
        <DialogHeader>
          <DialogTitle>Data Report</DialogTitle>
          <DialogDescription className='text-xs'>
            Select the file type you would like to be sent via email.
          </DialogDescription>
        </DialogHeader>
        <div className='col-span-3 flex space-x-2'>
          {/* Excel Option */}
          <div
            className={`flex cursor-pointer items-center p-2 ${
              selectedFormat === 'excel' ? 'border border-blue-500' : ''
            }`}
            onClick={() => handleSelectFormat('excel')}
          >
            <img src={excelIcon} alt='excel' className='h-6 w-6' />
            <span className='ml-1'>Excel</span>
          </div>

          {/* PDF Option */}
          <div
            className={`flex cursor-pointer items-center p-2 ${
              selectedFormat === 'pdf' ? 'border border-blue-500' : ''
            }`}
            onClick={() => handleSelectFormat('pdf')}
          >
            <img src={pdfIcon} alt='pdf' className='h-6 w-6' />
            <span className='ml-1'>PDF</span>
          </div>

          {/* CSV Option */}
          <div
            className={`flex cursor-pointer items-center p-2 ${
              selectedFormat === 'csv' ? 'border border-blue-500' : ''
            }`}
            onClick={() => handleSelectFormat('csv')}
          >
            <img src={csvIcon} alt='csv' className='h-6 w-6' />
            <span className='ml-1'>CSV</span>
          </div>
        </div>
        <div className='mt-4 w-full'>
          <Button
            onClick={handleConfirm}
            disabled={!selectedFormat}
            className='w-full'
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
