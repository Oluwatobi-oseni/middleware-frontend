import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Download } from 'lucide-react'
import { useState } from 'react'

export function DownloadDialog() {
  const [downloadFormat, setDownloadFormat] = useState<{
    jpeg: boolean
    pdf: boolean
  }>({
    jpeg: false,
    pdf: false,
  })

  const handleCheckboxChange = (format: 'jpeg' | 'pdf') => {
    setDownloadFormat((prev) => ({ ...prev, [format]: !prev[format] }))
  }

  const handleDownload = () => {
    const selectedFormats = Object.entries(downloadFormat)
      .filter(([selected]) => selected)
      .map(([format]) => format.toUpperCase())
    alert(`Downloading as: ${selectedFormats.join(', ')}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          <Download className='h-4 w-4' />
          Download
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Select Download Format</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='flex items-center space-x-3'>
            <Checkbox
              id='jpeg'
              checked={downloadFormat.jpeg}
              onCheckedChange={() => handleCheckboxChange('jpeg')}
            />
            <Label htmlFor='jpeg' className='cursor-pointer'>
              Image (JPEG)
            </Label>
          </div>
          <div className='flex items-center space-x-3'>
            <Checkbox
              id='pdf'
              checked={downloadFormat.pdf}
              onCheckedChange={() => handleCheckboxChange('pdf')}
            />
            <Label htmlFor='pdf' className='cursor-pointer'>
              PDF
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='ghost'
            onClick={() => setDownloadFormat({ jpeg: false, pdf: false })}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!downloadFormat.jpeg && !downloadFormat.pdf}
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
