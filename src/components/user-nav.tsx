import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSignOut } from '@/lib/auth/hook'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

// Utility function to extract initials from an email
function getInitials(email: string): string {
  const [name] = email.split('@') // Get the part before '@'
  const parts = name.split('.')
  if (parts.length > 1) {
    return parts.map((part) => part[0]?.toUpperCase()).join('')
  }
  return name[0]?.toUpperCase() ?? ''
}

// Utility function to derive name from email
function getNameFromEmail(email: string): string {
  const [name] = email.split('@')
  return name.replace(/\./g, ' ')
}

interface TokenPayload {
  email: string
}

export function UserNav() {
  const signOut = useSignOut()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token)
        setEmail(decoded.email)
      } catch (error) {
        console.error('Failed to decode JWT:', error)
      }
    }
  }, [])
  const initials = email ? getInitials(email) : 'U'
  const name = email ? getNameFromEmail(email) : 'User'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex items-center space-x-3'>
            <Avatar>
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium capitalize leading-none'>
                {name}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
