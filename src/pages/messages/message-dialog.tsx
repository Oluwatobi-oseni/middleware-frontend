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
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { useCreateMessage } from '@/lib/messages/hook'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  Banknote,
  Bell,
  Briefcase,
  MessageCircle,
  Plus,
  Smartphone,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  category: z.string().nonempty('Please select a category'),
  channel: z.string().nonempty('Please select a channel'),
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  messageBody: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
})

export function NewMessageDialog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: '',
      channel: '',
      title: '',
      messageBody: '',
    },
  })

  const createMessageMutation = useCreateMessage()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      category: data.category.toUpperCase().replace(/-/g, '_'), // Convert to API-expected format
      channel: data.channel.toUpperCase().replace(/-/g, '_'),
      title: data.title,
      body: data.messageBody,
    }

    createMessageMutation.mutate(payload, {
      onSuccess: ({ data }) => {
        toast({
          title: 'Message Created',
          description: `Your message (ID: ${data.id}) has been sent successfully.`,
        })
        form.reset() // Reset the form after success
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description:
            error.message || 'Failed to create the message. Please try again.',
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Plus size={16} />
          New Message
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Fill in the details below and click "Send Message" to deliver your
            message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              {/* Category and Channel Select */}
              <div className='grid grid-cols-2 items-center gap-4'>
                <div className='grid items-center gap-2'>
                  <Label htmlFor='category' className='text-right text-xs'>
                    Select Category
                  </Label>
                  <Select
                    onValueChange={(value) => form.setValue('category', value)}
                  >
                    <SelectTrigger id='category' className='col-span-3'>
                      <SelectValue
                        placeholder='Select an Option'
                        className='placeholder:text-xs'
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='alert-savings' className='text-xs'>
                        <div className='flex items-center gap-2'>
                          <AlertCircle size={18} />
                          Alert Savings
                        </div>
                      </SelectItem>
                      <SelectItem value='mobile-app' className='text-xs'>
                        <div className='flex items-center gap-2'>
                          <Smartphone size={18} />
                          Mobile App
                        </div>
                      </SelectItem>
                      <SelectItem value='consumer-banking' className='text-xs'>
                        <div className='flex items-center gap-2'>
                          <Banknote size={18} /> Consumer Banking Product
                        </div>
                      </SelectItem>
                      <SelectItem value='business-banking' className='text-xs'>
                        <div className='flex items-center gap-2'>
                          <Briefcase size={18} />
                          Business Banking Product
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid items-center gap-2'>
                  <Label htmlFor='channel' className='text-right text-xs'>
                    Select Channel
                  </Label>
                  <Select
                    onValueChange={(value) => form.setValue('channel', value)}
                  >
                    <SelectTrigger id='channel' className='col-span-3'>
                      <SelectValue
                        placeholder='Select an Option'
                        className='placeholder:text-xs'
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value='mobile-notification'
                        className='text-xs'
                      >
                        <div className='flex items-center gap-2'>
                          <Bell size={18} />
                          Mobile Notification
                        </div>
                      </SelectItem>
                      <SelectItem value='in-app-message' className='text-xs'>
                        <div className='flex items-center gap-2'>
                          <MessageCircle size={18} />
                          In-App Messages
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Title Input */}
              <div className='grid gap-1'>
                <Label htmlFor='title' className='text-left text-xs'>
                  Title
                </Label>
                <Input
                  id='title'
                  placeholder='Enter message title'
                  className='col-span-3'
                  {...form.register('title')}
                />
              </div>
              {/* Message Body Textarea */}
              <div className='grid gap-1'>
                <Label htmlFor='messageBody' className='text-left text-xs'>
                  Message Body
                </Label>
                <Textarea
                  id='messageBody'
                  placeholder='Type your message here...'
                  rows={4}
                  {...form.register('messageBody')}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' className='w-full'>
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
