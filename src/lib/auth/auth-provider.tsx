// import { createContext, ReactNode, useEffect, useState } from 'react'
// import { AuthState, SES_TOKEN_NAME, cookies, validateToken } from '.'
// import client from '../axios'
// // import { useNavigate } from 'react-router-dom'

// type ProviderProps = {
//   children: ReactNode
// }

// interface AuthStateWithSignOut extends AuthState {
//   signOut: () => void
// }

// export const AuthContext = createContext<AuthStateWithSignOut | null>(null)

// export const AuthProvider = ({ children }: ProviderProps) => {
//   const [loading, setLoading] = useState<boolean>(true)
//   const [authState, setAuthState] = useState<AuthStateWithSignOut>({
//     isSignedIn: false,
//     signOut: () => {},
//   })

//   useEffect(() => {
//     const token = cookies.get(SES_TOKEN_NAME)
//     if (token) {
//       client.defaults.headers.common['Authorization'] = `Bearer ${token}`
//       const validatedAuthState = validateToken(token)
//       setAuthState((prev) => ({ ...prev, ...validatedAuthState }))
//     }
//     setLoading(false)
//   }, [])

//   return (
//     <AuthContext.Provider value={{ ...authState }}>
//       {!loading && children}

//     </AuthContext.Provider>
//   )
// }

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { AuthState, SES_TOKEN_NAME, cookies, validateToken } from '.'

import client from '../axios'
import { InactivityDialog } from '@/pages/auth/components/InactivitySignoutDialog'

type ProviderProps = {
  children: ReactNode
}

interface AuthStateWithSignOut extends AuthState {
  signOut: () => void
}

const INACTIVITY_TIME = 5 * 60 * 1000 // 5 minutes
const COUNTDOWN_TIME = 5 * 60 // 5 minutes in seconds

export const AuthContext = createContext<AuthStateWithSignOut | null>(null)

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [authState, setAuthState] = useState<AuthStateWithSignOut>({
    isSignedIn: false,
    signOut: () => {},
  })

  const [showDialog, setShowDialog] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME)

  let timeoutId: NodeJS.Timeout | null = null

  const signOut = useCallback(() => {
    cookies.remove(SES_TOKEN_NAME, { path: '/' })
    sessionStorage.removeItem('accessToken')
    delete client.defaults.headers.common['Authorization']
    sessionStorage.removeItem('hasPassedLogin')

    setAuthState({ isSignedIn: false, signOut: () => {} }) // Reset auth state
    window.location.reload() // Reload to redirect to login or reset the app state
  }, [])

  const startCountdown = useCallback(() => {
    setShowDialog(true)
    setCountdown(COUNTDOWN_TIME)

    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          signOut() // Log out when countdown reaches 0
        }
        return prev - 1
      })
    }, 1000)
  }, [signOut])

  const resetTimeout = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId)
    setShowDialog(false) // Hide dialog on user activity
    timeoutId = setTimeout(startCountdown, INACTIVITY_TIME)
  }, [startCountdown])

  useEffect(() => {
    const token = cookies.get(SES_TOKEN_NAME)
    if (token) {
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const validatedAuthState = validateToken(token)
      setAuthState((prev) => ({ ...prev, ...validatedAuthState }))
    }
    setLoading(false)

    // Set up inactivity timeout
    window.addEventListener('mousemove', resetTimeout)
    window.addEventListener('keypress', resetTimeout)

    // Initialize the timeout
    resetTimeout()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener('mousemove', resetTimeout)
      window.removeEventListener('keypress', resetTimeout)
    }
  }, [resetTimeout, timeoutId])

  const handleContinueSession = () => {
    setShowDialog(false)
    resetTimeout() // Reset inactivity timeout
  }

  return (
    <AuthContext.Provider value={{ ...authState, signOut }}>
      {!loading && children}
      <InactivityDialog
        showDialog={showDialog}
        countdown={countdown}
        onContinue={handleContinueSession}
      />
    </AuthContext.Provider>
  )
}
