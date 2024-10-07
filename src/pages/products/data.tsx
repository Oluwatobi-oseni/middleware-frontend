import {
  IconCamera,
  IconCards,
  // IconCode,
  IconCreditCard,
  IconCurrencyNaira,
  IconLock,
  IconQrcode,
} from '@tabler/icons-react'

export const products = [
  {
    name: 'E-cam',
    logo: <IconCamera />,
    signedIn: false,
    desc: 'Sign in to E-cam for enhanced video surveillance and monitoring.',
  },
  {
    name: 'POS',
    logo: <IconCreditCard />,
    signedIn: true,
    desc: 'Sign in to POS for seamless point-of-sale transactions.',
  },
  {
    name: 'Card Request',
    logo: <IconCards />,
    signedIn: false,
    desc: 'Sign in to request and manage your cards efficiently.',
  },
  {
    name: 'Loans',
    logo: <IconCurrencyNaira />,
    signedIn: false,
    desc: 'Sign in to apply for and manage your loans quickly and easily.',
  },
  {
    name: 'Savings',
    logo: <IconLock />,
    signedIn: false,
    desc: 'Sign in to save and grow your money with our Savings service.',
  },
  {
    name: 'AlertQR',
    logo: <IconQrcode />,
    connected: false,
    desc: 'Generate and manage QR codes easily from the dashboard.',
  },
  // {
  //   name: 'Stripe',
  //   logo: <IconBrandStripe />,
  //   connected: false,
  //   desc: 'Easily manage Stripe transactions and payments.',
  // },
  // {
  //   name: 'Gmail',
  //   logo: <IconBrandGmail />,
  //   connected: true,
  //   desc: 'Access and manage Gmail messages effortlessly.',
  // },
  // {
  //   name: 'Medium',
  //   logo: <IconBrandMedium />,
  //   connected: false,
  //   desc: 'Explore and share Medium stories on your dashboard.',
  // },
  // {
  //   name: 'Skype',
  //   logo: <IconBrandSkype />,
  //   connected: false,
  //   desc: 'Connect with Skype contacts seamlessly.',
  // },
  // {
  //   name: 'Docker',
  //   logo: <IconBrandDocker />,
  //   connected: false,
  //   desc: 'Effortlessly manage Docker containers on your dashboard.',
  // },
  // {
  //   name: 'GitHub',
  //   logo: <IconBrandGithub />,
  //   connected: false,
  //   desc: 'Streamline code management with GitHub integration.',
  // },
  // {
  //   name: 'GitLab',
  //   logo: <IconBrandGitlab />,
  //   connected: false,
  //   desc: 'Efficiently manage code projects with GitLab integration.',
  // },
  // {
  //   name: 'Discord',
  //   logo: <IconBrandDiscord />,
  //   connected: false,
  //   desc: 'Connect with Discord for seamless team communication.',
  // },
  // {
  //   name: 'WhatsApp',
  //   logo: <IconBrandWhatsapp />,
  //   connected: false,
  //   desc: 'Easily integrate WhatsApp for direct messaging.',
  // },
]
