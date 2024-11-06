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
import { useState } from 'react'

export function ImagePickerDialog() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0]
      if (
        file.size <= 800 * 1024 &&
        ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
      ) {
        setSelectedFile(file)
      } else {
        alert('File must be JPG, GIF, or PNG and under 800KB.')
      }
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // Handle the upload process
      console.log('Uploading:', selectedFile)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-xl' variant='outline'>
          Upload a new picture
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Upload Profile Picture</DialogTitle>
          <DialogDescription>
            Choose an image file (JPG, GIF, or PNG) with a maximum size of
            800KB.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='file' className='text-right'>
              Select File
            </Label>
            <Input
              id='file'
              type='file'
              accept='image/jpeg,image/png,image/gif'
              onChange={handleFileChange}
              className='col-span-3'
            />
          </div>
          {selectedFile && (
            <p className='text-sm text-muted-foreground'>
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
