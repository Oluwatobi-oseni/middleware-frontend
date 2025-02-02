import { Navigate, Outlet } from 'react-router-dom'
import {
  IconBulb,
  IconCards,
  IconCreditCardPay,
  IconCreditCardRefund,
  IconDatabaseCog,
  IconPlugConnected,
} from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Separator } from '@/components/ui/separator'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useAuth } from '@/lib/auth/hook'
import SidebarNav from '../settings/components/sidebar-nav'

export default function PriceControl() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Navigate to={'/sign-in'} replace={true} />
  }
  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Pricing
        </h1>
        <div className='ml-auto hidden items-center space-x-4 md:flex'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='flex flex-col'>
        <div className='space-y-0.5'>
          <p className='text-[14px] font-normal text-muted-foreground'>
            Set and manage pricing plan for Products.
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full p-1 pr-4 md:overflow-y-hidden'>
            <Outlet />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}

const sidebarNavItems = [
  {
    title: 'Data',
    icon: <IconDatabaseCog size={18} />,
    href: '/price-control',
  },
  {
    title: 'Cable Tv',
    icon: <IconPlugConnected size={18} />,
    href: '/price-control/cable-tv',
  },
  {
    title: 'Electricity',
    icon: <IconBulb size={18} />,
    href: '/price-control/electricity',
  },
  {
    title: 'Card',
    icon: <IconCards size={18} />,
    href: '#',
    items: [
      {
        title: 'Card Issuance',
        url: '/price-control/card-issuance',
      },
      {
        title: 'Card Termination',
        url: '/price-control/card-termination',
      },
    ],
  },
  {
    title: 'Pay Out',
    icon: <IconCreditCardPay size={18} />,
    href: '#',
    items: [
      {
        title: 'Bank Transfer',
        url: '/price-control/payout/bank-transfer',
      },
    ],
  },
  {
    title: 'Pay In',
    icon: <IconCreditCardRefund size={18} />,
    href: '#',
    items: [
      {
        title: 'Bank Transfer',
        url: '/price-control/payin/bank-transfer',
      },
      {
        title: 'Direct Debit',
        url: '/price-control/direct-debit',
      },
    ],
  },
]
