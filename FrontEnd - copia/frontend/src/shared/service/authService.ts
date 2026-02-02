import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const logout = () => {
  Cookies.remove('token')
  window.location.href = '/login' // o usar navigate si estás dentro de un hook/componente
}
