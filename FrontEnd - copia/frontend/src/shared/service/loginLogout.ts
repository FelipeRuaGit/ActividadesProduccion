// src/shared/auth/loginLogout.ts
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate()

  return () => {
    Cookies.remove('token')
    navigate('/login', { replace: true })
  }
}
