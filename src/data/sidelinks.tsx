import {
  IconAdjustments,
  IconAnalyze,
  IconApps,
  IconGift,
  IconLayoutDashboard,
  IconMessage,
  IconSettings,
  IconSwitchVertical,
  IconTablePlus,
  IconUsers,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Products',
    label: '',
    href: '/products',
    icon: <IconApps size={18} />,
  },
  {
    title: 'Integrations',
    label: '',
    href: '/integrations',
    icon: <IconTablePlus size={18} />,
  },
  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  // {
  //   title: 'Requests',
  //   label: '10',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  {
    title: 'Analytics',
    label: '',
    href: '/analytics',
    icon: <IconAnalyze size={18} />,
  },

  {
    title: 'Control Center',
    label: '',
    href: '/control-center',
    icon: <IconAdjustments size={18} />,
  },
  {
    title: 'Switches',
    label: '',
    href: '/switches',
    icon: <IconSwitchVertical size={18} />,
  },
  {
    title: 'Messages',
    label: '',
    href: '/messages',
    icon: <IconMessage size={18} />,
  },
  {
    title: 'Promo Code',
    label: '',
    href: '/promo-code',
    icon: <IconGift size={18} />,
  },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //     {
  //       title: 'Unauthorised Error',
  //       label: '',
  //       href: '/401',
  //       icon: <IconLock size={18} />,
  //     },
  //   ],
  // },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
