import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { IconPlus } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useInviteUser } from '@/lib/invites/hook'

// Schema for form validation
const AddTeamMemberSchema = z.object({
  firstName: z.string().min(1, { message: 'Please enter the first name.' }),
  lastName: z.string().min(1, { message: 'Please enter the last name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  role: z.string().min(1, { message: 'Please select a role.' }),
})

type AddTeamMemberFormValues = z.infer<typeof AddTeamMemberSchema>

export function AddTeamMemberDialog() {
  const form = useForm<AddTeamMemberFormValues>({
    resolver: zodResolver(AddTeamMemberSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
  })

  const inviteUserMutation = useInviteUser()

  function onSubmit(data: AddTeamMemberFormValues) {
    inviteUserMutation.mutate(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default' className='flex gap-1 font-[Geist] text-xs'>
          <IconPlus className='h-4 w-4' />
          <span>Add a team member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='px-4 py-4 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <Separator className='my-2' />

        {/* Form Section */}
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Full Name Inputs */}
          <div className='mb-4 grid grid-cols-2 gap-2'>
            <div>
              <Label htmlFor='firstName' className='text-xs font-light'>
                First Name
              </Label>
              <Input
                id='firstName'
                placeholder='Enter first name'
                className='w-full placeholder:text-xs'
                autoComplete='off'
                {...form.register('firstName')}
              />
            </div>
            <div>
              <Label htmlFor='lastName' className='text-xs font-light'>
                Last Name
              </Label>
              <Input
                id='lastName'
                placeholder='Enter last name'
                className='w-full placeholder:text-xs'
                autoComplete='off'
                {...form.register('lastName')}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className='mb-4'>
            <Label htmlFor='email' className='text-xs font-light'>
              Email Address
            </Label>
            <Input
              id='email'
              placeholder='Enter email'
              className='w-full placeholder:text-xs'
              autoComplete='off'
              {...form.register('email')}
            />
          </div>

          {/* Role Selection */}
          <div className='mb-4'>
            <Label htmlFor='role' className='text-xs font-light'>
              Role
            </Label>
            <Select onValueChange={(value) => form.setValue('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='MEMBER'>Member</SelectItem>
                <SelectItem value='SUPER_ADMIN'>Super Admin</SelectItem>
                <SelectItem value='ADMIN'>Admin</SelectItem>
                <SelectItem value='GROUP_CEO'>
                  Group Chief Executive Officer
                </SelectItem>
                <SelectItem value='GROUP_COO'>
                  Group Chief Operating Officer
                </SelectItem>
                <SelectItem value='GROUP_CPO'>
                  Group Chief People Officer
                </SelectItem>
                <SelectItem value='CFO'>Chief Finance Officer</SelectItem>
                <SelectItem value='MD_ALERT'>
                  Managing Director (Alert)
                </SelectItem>
                <SelectItem value='COO_ALERT'>
                  Chief Operating Officer (Alert)
                </SelectItem>
                <SelectItem value='GROUP_HEAD_INTERNAL_AUDIT'>
                  Group Head Internal Audit
                </SelectItem>
                <SelectItem value='GROUP_HEAD_LEGAL'>
                  Group Head Legal
                </SelectItem>
                <SelectItem value='HEAD_RECOVERY'>Head Recovery</SelectItem>
                <SelectItem value='GROUP_HEAD_INTERNAL_CC'>
                  Group Head Internal C&C
                </SelectItem>
                <SelectItem value='HEAD_HR'>Head HR</SelectItem>
                <SelectItem value='GROUP_HEAD_MARKETING'>
                  Group Head Marketing
                </SelectItem>
                <SelectItem value='HEAD_OPERATIONS'>
                  Head of Operations
                </SelectItem>
                <SelectItem value='CUSTOMER_SERVICE_SUPERVISOR'>
                  Customer Service Supervisor
                </SelectItem>
                <SelectItem value='HEAD_IT'>Head IT</SelectItem>
                <SelectItem value='FINANCE_MANAGER'>
                  Finance Manager & Cost Control
                </SelectItem>
                <SelectItem value='HEAD_DIGITAL'>Head Digital</SelectItem>
                <SelectItem value='CISO'>
                  Chief Information Security Officer
                </SelectItem>
                <SelectItem value='BRANCH_MANAGER'>Branch Manager</SelectItem>
                <SelectItem value='DEPUTY_BRANCH_MANAGER'>
                  Deputy Branch Manager
                </SelectItem>
                <SelectItem value='REGIONAL_MANAGER'>
                  Regional Manager
                </SelectItem>
                <SelectItem value='LOAN_OFFICER'>Loan Officer</SelectItem>
                <SelectItem value='EXECUTIVE_CREDIT_MANAGER'>
                  Executive Credit Manager
                </SelectItem>
                <SelectItem value='SOCIAL_PERFORMANCE_MANAGER'>
                  Social Performance Manager
                </SelectItem>
                <SelectItem value='CUSTOMER_SERVICE_OFFICER'>
                  Customer Service Officer
                </SelectItem>
                <SelectItem value='HEAD_CREDIT_RISK'>
                  Head Credit/Risk
                </SelectItem>
                <SelectItem value='LIABILITY_GENERATION_OFFICER'>
                  Liability Generation Officer
                </SelectItem>
                <SelectItem value='PORTFOLIO_MANAGER'>
                  Funds/Portfolio Manager (Asset)
                </SelectItem>
                <SelectItem value='HEAD_HR_ADMIN'>Head HR Admin</SelectItem>
                <SelectItem value='HR_LEARNING_DEV_OFFICER'>
                  HR Learning and Development Officer
                </SelectItem>
                <SelectItem value='HR_ADMIN'>HR Admin</SelectItem>
                <SelectItem value='TALENT_ACQUISITION_SPECIALIST'>
                  Talent Acquisition Specialist
                </SelectItem>
                <SelectItem value='FACILITY_MANAGER'>
                  Facility Manager
                </SelectItem>
                <SelectItem value='HEAD_INTERNAL_CTRL_COMPLIANCE'>
                  Head Internal Control & Compliance
                </SelectItem>
                <SelectItem value='RECOVERY_OFFICER'>
                  Recovery Officer
                </SelectItem>
                <SelectItem value='AUDIT_OFFICER'>Audit Officer</SelectItem>
                <SelectItem value='PROCUREMENT_OFFICER'>
                  Procurement Officer
                </SelectItem>
                <SelectItem value='COMPLIANCE_OFFICER_ASSET'>
                  Compliance Officer (Asset)
                </SelectItem>
                <SelectItem value='RECONCILIATION_OFFICER'>
                  Reconciliation Officer
                </SelectItem>
                <SelectItem value='FINANCE_OFFICER'>Finance Officer</SelectItem>
                <SelectItem value='FRONT_DESK_OFFICER'>
                  Front Desk Officer
                </SelectItem>
                <SelectItem value='INTERNAL_CTRL_COMPLIANCE_OFFICER'>
                  Internal Control & Compliance Officer
                </SelectItem>
                <SelectItem value='LEGAL_OFFICER'>Legal Officer</SelectItem>
                <SelectItem value='LEGAL_RECOVERY_OFFICER'>
                  Legal/Recovery Officer
                </SelectItem>
                <SelectItem value='SAVINGS_MOBILIZATION_OFFICER'>
                  Savings Mobilization Officer
                </SelectItem>
                <SelectItem value='IT_SUPPORT_OFFICER'>
                  IT Support Officer
                </SelectItem>
                <SelectItem value='DEPLOYMENT_OFFICER'>
                  Deployment Officer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Member Button */}
          <Button
            type='submit'
            className='mt-4 w-full'
            loading={inviteUserMutation.isPending}
          >
            Add Member
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
