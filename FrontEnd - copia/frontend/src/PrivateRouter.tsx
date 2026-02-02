// src/shared/routes/PrivateRoute.tsx
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface Props {
  children: React.ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = Cookies.get('token')

  console.log('🛡️ PrivateRoute → token:', token)

  if (!token) {
    console.warn('🚫 PrivateRoute → REDIRECT A /login')
    return <Navigate to="/login" replace />
  }

  console.log('✅ PrivateRoute → ACCESO PERMITIDO')
  return <>{children}</>
}

export default PrivateRoute
