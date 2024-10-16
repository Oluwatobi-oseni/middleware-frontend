import { createContext, ReactNode, useEffect, useState } from 'react'
import { AuthState, SES_TOKEN_NAME, cookies, validateToken } from '.'
import { Axios } from '../axios'

type ProviderProps = {
  children: ReactNode
}

type AuthStatus = 'unauthenticated' | 'authenticated' | '2faPending' | 'loading'

export const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading') // Track the current status

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true)

      const token = cookies.get(SES_TOKEN_NAME)

      if (token) {
        try {
          Axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
          const validatedState = await validateToken(token)

          if (validatedState.isValid) {
            // User is fully authenticated with a valid token
            setAuthStatus('authenticated')
            setAuthState(validatedState)
          } else {
            // Invalid token, clear it out
            cookies.remove(SES_TOKEN_NAME)
            setAuthStatus('unauthenticated')
            setAuthState(null)
          }
        } catch (error) {
          console.error('Token validation failed:', error)
          cookies.remove(SES_TOKEN_NAME)
          setAuthStatus('unauthenticated')
          setAuthState(null)
        }
      } else {
        setAuthStatus('unauthenticated') // No token present
        setAuthState(null)
      }

      setLoading(false) // Stop loading once the checks are done
    }

    checkAuthentication()
  }, [])

  // Handle login endpoint to determine if 2FA is needed
  const handleLogin = async (credentials: {
    username: string
    password: string
  }) => {
    try {
      const response = await Axios.post('/api/auth/login', credentials)
      if (response.data.isAuthenticated) {
        // User needs to complete 2FA
        setAuthStatus('2faPending')
      } else {
        setAuthStatus('unauthenticated')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setAuthStatus('unauthenticated')
    }
  }

  // Handle 2FA verification to finalize authentication
  const verifyTwoFactorAuth = async (code: string) => {
    try {
      const response = await Axios.post('/api/auth/verify-2FA', { code })
      const authToken = response.data.authToken

      if (authToken) {
        // Store the token in cookies for future use
        cookies.set(SES_TOKEN_NAME, authToken)
        Axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` }

        const validatedState = await validateToken(authToken)
        if (validatedState.isValid) {
          setAuthStatus('authenticated')
          setAuthState(validatedState)
        }
      } else {
        setAuthStatus('unauthenticated')
        setAuthState(null)
      }
    } catch (error) {
      console.error('2FA verification failed:', error)
      setAuthStatus('unauthenticated')
      setAuthState(null)
    }
  }

  // Render different content based on authentication state
  return (
    <AuthContext.Provider
      value={{ authState, handleLogin, verifyTwoFactorAuth }}
    >
      {loading ? (
        <LoadingSpinner />
      ) : authStatus === '2faPending' ? (
        <TwoFactorAuthComponent verifyTwoFactorAuth={verifyTwoFactorAuth} />
      ) : authStatus === 'unauthenticated' ? (
        <LoginComponent handleLogin={handleLogin} />
      ) : (
        children // Render the app if fully authenticated
      )}
    </AuthContext.Provider>
  )
}
