import { createBrowserRouter, Navigate } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import ProtectedRoute from './lib/auth/protected-route.tsx'
import ForgotPassword from './pages/auth/forgot-password'
import Otp from './pages/auth/otp'
import TwoFactorAuthenticationPage from './pages/auth/two-factor-auth'
import RegisterAccount from './pages/auth/register-account'
import CompleteRegistration from './pages/auth/complete-signup.tsx'
import ResetPassword from './pages/auth/reset-password.tsx'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/register-account',
    element: <RegisterAccount />,
    lazy: async () => ({
      Component: (await import('./pages/auth/register-account')).default,
    }),
  },
  {
    path: '/complete-signup',
    element: <CompleteRegistration />,
    lazy: async () => ({
      Component: (await import('./pages/auth/complete-signup')).default,
    }),
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute>
        <ForgotPassword />
      </ProtectedRoute>
    ),
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    element: (
      <ProtectedRoute>
        <Otp /> {/* Make sure to import your OTP component here */}
      </ProtectedRoute>
    ),
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },
  {
    path: '/two-factor-auth',
    element: (
      <ProtectedRoute>
        <TwoFactorAuthenticationPage />{' '}
        {/* Make sure to import your TwoFactorAuth component here */}
      </ProtectedRoute>
    ),
    lazy: async () => ({
      Component: (await import('./pages/auth/two-factor-auth')).default,
    }),
  },
  {
    path: '/reset-password', // New password route
    element: (
      <ProtectedRoute>
        <ResetPassword />
      </ProtectedRoute>
    ),
    lazy: async () => ({
      Component: (await import('./pages/auth/reset-password.tsx')).default,
    }),
  },

  // Main routes (protected)
  {
    path: '/',
    element: <ProtectedRoute />,
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: 'dashboard',
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'products',
        lazy: async () => ({
          Component: (await import('@/pages/products/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/products/products.tsx'))
                .default,
            }),
          },
          {
            path: 'consumer-banking',
            lazy: async () => ({
              Component: (
                await import('@/pages/products/consumer-banking/index.tsx')
              ).default,
            }),
          },
          {
            path: 'consumer-banking/user/:id', // Add dynamic route here
            lazy: async () => ({
              Component: (
                await import('@/pages/products/consumer-banking/user.tsx')
              ).default,
            }),
          },
          {
            path: 'consumer-banking/user/:id/activities', // Add dynamic route here
            lazy: async () => ({
              Component: (
                await import(
                  '@/pages/products/consumer-banking/consumer-banking-user-activity/page.tsx'
                )
              ).default,
            }),
          },
          {
            path: 'business-banking',
            lazy: async () => ({
              Component: (
                await import('@/pages/products/business-banking/index.tsx')
              ).default,
            }),
          },
          {
            path: 'business-banking/business/:id', // Add dynamic route here
            lazy: async () => ({
              Component: (
                await import('@/pages/products/business-banking/business.tsx')
              ).default,
            }),
          },
          {
            path: 'business-banking/business/:id/activities', // Add dynamic route here
            lazy: async () => ({
              Component: (
                await import(
                  '@/pages/products/business-banking/business-banking-activity/page.tsx'
                )
              ).default,
            }),
          },
        ],
      },
      {
        path: 'integrations',
        lazy: async () => ({
          Component: (await import('@/pages/integrations/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/integrations/products.tsx'))
                .default,
            }),
          },
          {
            path: 'card-request',
            lazy: async () => ({
              Component: (await import('@/pages/card-requests/index.tsx'))
                .default,
            }),
          },
          {
            path: 'e-cam',
            lazy: async () => ({
              Component: (await import('@/pages/e-cam/index.tsx')).default,
            }),
          },
          // {
          //   path: 'support',
          //   lazy: async () => ({
          //     Component: (await import('@/pages/support/index.tsx')).default,
          //   }),
          // },
          // {
          //   path: 'agile',
          //   lazy: async () => ({
          //     Component: (await import('@/pages/agile/index.tsx')).default,
          //   }),
          // },
          // {
          //   path: 'workspace',
          //   lazy: async () => ({
          //     Component: (await import('@/pages/workspace/index.tsx')).default,
          //   }),
          // },
        ],
      },
      {
        path: 'adminstration',
        lazy: async () => ({
          Component: (await import('@/pages/adminstration/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/adminstration/admin.tsx'))
                .default,
            }),
          },
        ],
      },
      // {
      //   path: 'users',
      //   lazy: async () => ({
      //     Component: (await import('@/pages/users/index.tsx')).default,
      //   }),
      // },
      {
        path: 'analytics',
        lazy: async () => ({
          Component: (await import('@/pages/analytics/index.tsx')).default,
        }),
      },

      {
        path: 'control-center',
        lazy: async () => ({
          Component: (await import('@/pages/control-center/index.tsx')).default,
        }),
      },
      {
        path: 'switches',
        lazy: async () => ({
          Component: (await import('@/pages/switches/index.tsx')).default,
        }),
      },
      {
        path: 'messages',
        lazy: async () => ({
          Component: (await import('@/pages/messages/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/messages/message.tsx')).default,
            }),
          },
        ],
      },
      {
        path: 'promo-code',
        lazy: async () => ({
          Component: (await import('@/pages/promo-code/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/promo-code/promo.tsx')).default,
            }),
          },
        ],
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/settings/profile')).default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('./pages/settings/account')).default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (await import('./pages/settings/appearance')).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (await import('./pages/settings/notifications'))
                .default,
            }),
          },
          {
            path: 'team',
            lazy: async () => ({
              Component: (await import('./pages/settings/team/index.tsx'))
                .default,
            }),
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router

// {
//   path: 'error-example',
//   lazy: async () => ({
//     Component: (await import('./pages/settings/error-example'))
//       .default,
//   }),
//   errorElement: <GeneralError className='h-[50svh]' minimal />,
// },

// {
//   path: '/sign-in-2',
//   lazy: async () => ({
//     Component: (await import('./pages/auth/sign-in-2')).default,
//   }),
// },
// {
//   path: '/sign-up',
//   lazy: async () => ({
//     Component: (await import('./pages/auth/sign-up')).default,
//   }),
// },
// {
//   path: '/forgot-password',
//   lazy: async () => ({
//     Component: (await import('./pages/auth/forgot-password')).default,
//   }),
// },
// {
//   path: '/otp',
//   lazy: async () => ({
//     Component: (await import('./pages/auth/otp')).default,
//   }),
// },
