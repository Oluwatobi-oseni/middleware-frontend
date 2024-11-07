'use client'

import { useState } from 'react'
import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { FormField, FormLabel } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { FormProvider, useForm } from 'react-hook-form'
import { IconSettings } from '@tabler/icons-react'

// FormItem displaces checkbox and label

const roles = [
  { id: 'team_manager', label: 'Team Manager' },
  { id: 'developer', label: 'Developer' },
  { id: 'product_designer', label: 'Product Designer' },
  { id: 'analyst', label: 'Analyst' },
  { id: 'operations', label: 'Operations' },
  { id: 'support', label: 'Support' },
]

const permissions: Record<
  string,
  { category: string; permissions: { id: string; label: string }[] }[]
> = {
  team_manager: [
    {
      category: 'Transaction Permission',
      permissions: [
        { id: 'view_transactions', label: 'Can view transactions' },
        { id: 'export_transactions', label: 'Export Transactions' },
      ],
    },
    {
      category: 'Balance Permission',
      permissions: [
        { id: 'view_balances', label: 'Can view balances' },
        { id: 'fund_balances', label: 'Can Fund balances' },
      ],
    },
    {
      category: 'Transfer Permission',
      permissions: [
        { id: 'view_transfers', label: 'Can view Transfers' },
        { id: 'create_transfers', label: 'Can create transfers' },
      ],
    },
    {
      category: 'Execute Permission',
      permissions: [
        { id: 'assign_roles', label: 'Can assign roles' },
        { id: 'delete_user', label: 'Can delete user' },
      ],
    },
  ],
  developer: [
    {
      category: 'Development Permission',
      permissions: [
        { id: 'view_code', label: 'Can view code' },
        { id: 'commit_code', label: 'Can commit code' },
        { id: 'execute_permission', label: 'Execute permission' },
      ],
    },
  ],
  product_designer: [
    {
      category: 'Design Permission',
      permissions: [
        { id: 'view_designs', label: 'Can view designs' },
        { id: 'edit_designs', label: 'Can edit designs' },
      ],
    },
  ],
  analyst: [
    {
      category: 'Analysis Permission',
      permissions: [
        { id: 'view_reports', label: 'Can view reports' },
        { id: 'generate_reports', label: 'Can generate reports' },
      ],
    },
  ],
  operations: [
    {
      category: 'Operations Permission',
      permissions: [
        { id: 'view_operations', label: 'Can view operations' },
        { id: 'manage_operations', label: 'Can manage operations' },
      ],
    },
  ],
  support: [
    {
      category: 'Support Permission',
      permissions: [
        { id: 'view_tickets', label: 'Can view support tickets' },
        { id: 'resolve_tickets', label: 'Can resolve tickets' },
      ],
    },
  ],
}

const RolesModal = () => {
  const [selectedRole, setSelectedRole] = useState<string>('team_manager') // Default role as 'Team Manager'
  const form = useForm<Record<string, boolean>>() // Initialize the form

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId) // Set the selected role
    form.reset({}) // Reset form values when changing roles
  }

  const handleSubmitForm = (data: Record<string, boolean>) => {
    toast({
      title: 'Permissions Updated',
      description: `Permissions for ${selectedRole} have been updated: ${JSON.stringify(data)}`,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='flex gap-1 text-xs'>
          <IconSettings size={16} />
          <span>Manage Roles</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='px-4 py-4 sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Manage Roles</DialogTitle>
        </DialogHeader>
        <Separator className='my-2' />

        <FormProvider {...form}>
          <div className='flex space-x-4'>
            {/* Left column for roles */}
            <div className='flex w-1/3 flex-col border-r pr-4'>
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={`cursor-pointer p-2 text-left text-xs transition-all duration-300
                    ${selectedRole === role.id ? 'border-r-4 border-muted-foreground bg-muted shadow-lg' : 'hover:bg-muted-foreground/10'}`}
                >
                  {role.label}
                </div>
              ))}
            </div>

            {/* Right column for permissions */}
            <div className='flex-1'>
              {selectedRole && (
                <div className='mt-2'>
                  {permissions[selectedRole].map((permissionCategory) => (
                    <div key={permissionCategory.category} className='mb-4'>
                      <h4 className='mb-2 font-semibold text-muted-foreground'>
                        {permissionCategory.category}
                      </h4>
                      {permissionCategory.permissions.map((permission) => (
                        <FormField
                          key={permission.id}
                          control={form.control}
                          name={permission.id}
                          defaultValue={false}
                          render={({ field }) => (
                            <div className='mb-1 flex items-center space-x-2'>
                              <Checkbox
                                id={permission.id}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <FormLabel
                                htmlFor={permission.id}
                                className='text-xs'
                              >
                                {permission.label}
                              </FormLabel>
                            </div>
                          )}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button
            type='button'
            className='mt-4'
            onClick={form.handleSubmit(handleSubmitForm)}
          >
            Save Permissions
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default RolesModal
