import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './auth-provider'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext)

  if (!authContext || !authContext.isSignedIn) {
    return <Navigate to='/sign-in' replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
