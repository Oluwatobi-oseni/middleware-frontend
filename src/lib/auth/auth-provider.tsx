import { createContext, ReactNode, useEffect, useState } from 'react'
import { AuthState, SES_TOKEN_NAME, cookies, validateToken } from '.'
import client from '../axios'
// import { useNavigate } from 'react-router-dom'

type ProviderProps = {
  children: ReactNode
}

interface AuthStateWithSignOut extends AuthState {
  signOut: () => void
}

export const AuthContext = createContext<AuthStateWithSignOut | null>(null)

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [authState, setAuthState] = useState<AuthStateWithSignOut>({
    isSignedIn: false,
    signOut: () => {},
  })

  useEffect(() => {
    const token = cookies.get(SES_TOKEN_NAME)
    if (token) {
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const validatedAuthState = validateToken(token)
      setAuthState((prev) => ({ ...prev, ...validatedAuthState }))
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ ...authState }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
