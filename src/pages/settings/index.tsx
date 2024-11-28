import { Navigate, Outlet } from 'react-router-dom'
// import {
//   // IconNotification,
//   // IconPalette,
//   IconTool,
//   IconUser,
//   // IconUsers,
// } from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Separator } from '@/components/ui/separator'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import SidebarNav from './components/sidebar-nav'
import { useAuth } from '@/lib/auth/hook'

export default function Settings() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Navigate to={'/sign-in'} replace={true} />
  }
  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Settings
        </h1>
        <div className='ml-auto hidden items-center space-x-4 md:flex'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='flex flex-col'>
        <div className='space-y-0.5'>
          <p className='text-[14px] font-normal text-muted-foreground'>
            Manage your account settings.
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
          {/* <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside> */}
          <div className='flex w-full p-1 pr-4 md:overflow-y-hidden'>
            <Outlet />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}

// const sidebarNavItems = [
// {
//   title: 'Profile',
//   icon: <IconUser size={18} />,
//   href: '/settings',
// },
// {
//   title: 'Account',
//   icon: <IconTool size={18} />,
//   href: '/settings/account',
// },
// {
//   title: 'Team',
//   icon: <IconUsers size={18} />,
//   href: '/settings/team',
// },
// {
//   title: 'Notifications',
//   icon: <IconNotification size={18} />,
//   href: '/settings/notifications',
// },
// {
//   title: 'Appearance',
//   icon: <IconPalette size={18} />,
//   href: '/settings/appearance',
// },
// {
//   title: 'Error Example',
//   icon: <IconExclamationCircle size={18} />,
//   href: '/settings/error-example',
// },
// ]
