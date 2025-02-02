import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { buttonVariants } from '@/components/custom/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: JSX.Element
    items?: { title: string; url: string }[] // Optional nested items
  }[]
}

export default function SidebarNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [val, setVal] = useState(pathname ?? '/settings')
  const [openItem, setOpenItem] = useState<string | null>(null) // Track open item

  const handleSelect = (e: string) => {
    setVal(e)
    navigate(e)
  }

  const toggleSubItems = (title: string) => {
    setOpenItem((prev) => (prev === title ? null : title)) // Toggle the open state of the clicked item
  }

  return (
    <>
      <div className='p-1 md:hidden'>
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className='h-12 sm:w-48'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className='flex gap-x-4 px-2 py-1'>
                  <span className='scale-125'>{item.icon}</span>
                  <span className='text-md'>{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='hidden w-full overflow-x-auto bg-background px-1 py-2 md:block'>
        <nav
          className={cn(
            'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <div key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  pathname === item.href
                    ? 'bg-muted hover:bg-muted'
                    : 'hover:bg-transparent hover:underline',
                  'flex items-center justify-between'
                )}
                onClick={() => item.items && toggleSubItems(item.title)} // Call toggleSubItems on click if item has sub-items
              >
                <div className='flex items-center'>
                  <span className='mr-2'>{item.icon}</span>
                  {item.title}
                </div>
                {/* Render chevron icon if the item has sub-items */}
                {item.items && (
                  <span className='ml-auto'>
                    {openItem === item.title ? (
                      <IconChevronDown size={18} />
                    ) : (
                      <IconChevronRight size={18} />
                    )}
                  </span>
                )}
              </Link>

              {/* If this item has nested items, render them */}
              {item.items && openItem === item.title && (
                <div className='ml-4'>
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.url}
                      to={subItem.url}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        pathname === subItem.url
                          ? 'bg-muted hover:bg-muted'
                          : 'hover:bg-transparent hover:underline',
                        'block justify-start'
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
