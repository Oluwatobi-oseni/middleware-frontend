import {
  IconBuilding,
  IconCamera,
  IconCards,
  IconHeadset,
  IconPackage,
} from '@tabler/icons-react'

export const integrations = [
  {
    id: '1',
    name: 'E-cam',
    logo: <IconCamera />,
    desc: 'Enhance bank security and operations with advanced video surveillance and real-time monitoring tools.',
    path: 'https://cam-portal.alertmfb.com.ng/',
  },
  {
    id: '2',
    name: 'Customer Support',
    logo: <IconHeadset />,
    desc: 'Empower your customer service teams with tools for efficient query handling, issue resolution, and multi-channel communication.',
    path: 'https://support.alertmfb.com.ng/',
  },
  {
    id: '3',
    name: 'Card Request',
    logo: <IconCards />,
    desc: 'Simplify the card issuance process for employees, ensuring fast and accurate card request management for customers.',
    path: '/integrations/card-requests',
  },
  //   {
  //     id: '4',
  //     name: 'Business Banking',
  //     logo: <IconBriefcase />,
  //     desc: 'Equip teams with the tools to manage business accounts, offering tailored solutions for business clients and facilitating growth.',
  //     path: '/',
  //   },
  {
    id: '5',
    name: 'Workspace',
    logo: <IconBuilding />,
    desc: 'Optimize collaboration with tools to manage workspaces and resources, ensuring teams have the best environment to thrive.',
    path: 'https://workspace.alertmfb.com.ng/',
  },
  {
    id: '6',
    name: 'Product Management',
    logo: <IconPackage />,
    desc: 'Provide employees with the tools to oversee product development, ensuring timely updates and alignment with business goals.',
    path: 'https://agile.alertmfb.com.ng/',
  },
]
