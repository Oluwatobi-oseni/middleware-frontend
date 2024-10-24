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
      },
      {
        path: 'products/card-requests',
        lazy: async () => ({
          Component: (await import('@/pages/card-requests/index.tsx')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'analytics',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'integrations',
        lazy: async () => ({
          Component: (await import('@/pages/integrations/index.tsx')).default,
        }),
      },
      {
        path: 'control-center',
        lazy: async () => ({
          Component: (await import('@/pages/control-center/index.tsx')).default,
        }),
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
