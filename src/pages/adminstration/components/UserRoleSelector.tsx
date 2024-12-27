import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModifyUserRole } from '@/lib/users/hook'

type UserRole = 'SUPER_ADMIN' | 'SENIOR' | 'JUNIOR'

const roleMapping: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  SENIOR: 'Senior',
  JUNIOR: 'Junior',
}

export function UserRoleSelector({
  userDetails,
}: {
  userDetails: { role: string; id: number }
}) {
  const { mutate: modifyUserRole, isPending } = useModifyUserRole()
  const [selectedRole, setSelectedRole] = useState(userDetails.role)
  const [pendingRole, setPendingRole] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRoleChange = (newRole: string) => {
    if (newRole !== selectedRole) {
      setPendingRole(newRole)
      setIsModalOpen(true) // Open confirmation modal
    }
  }

  const confirmRoleChange = () => {
    if (pendingRole) {
      modifyUserRole(
        { userId: userDetails.id, newRole: pendingRole },
        {
          onSuccess: () => {
            setSelectedRole(pendingRole)
            setPendingRole(null)
            setIsModalOpen(false) // Close modal on success
          },
        }
      )
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setPendingRole(null)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <Select value={selectedRole} onValueChange={handleRoleChange}>
          <SelectTrigger className='w-[180px]' disabled={isPending}>
            <SelectValue>
              {roleMapping[pendingRole as UserRole] ||
                roleMapping[selectedRole as UserRole]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='SUPER_ADMIN'>Super Admin</SelectItem>
              <SelectItem value='SENIOR'>Senior</SelectItem>
              <SelectItem value='JUNIOR'>Junior</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Role Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the user's role to{' '}
              <strong>
                {roleMapping[pendingRole as UserRole] || pendingRole}
              </strong>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='secondary' onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={confirmRoleChange} disabled={isPending}>
              {isPending ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
