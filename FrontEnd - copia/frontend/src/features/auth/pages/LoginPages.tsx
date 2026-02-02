// src/features/auth/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthForm from '../components/AuthForm'
import { authStore } from '../../auth/context/LoginStore'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoadingAuth, errorMessageAuth, clearError } = authStore()

  const [values, setValues] = useState({
    documento: '',
    password: '',
  })

  useEffect(() => {
    if (errorMessageAuth) {
      Swal.fire({
        icon: 'error',
        title: 'Error en login',
        text: String(errorMessageAuth),
      })
      clearError()
    }
  }, [errorMessageAuth])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async () => {
    if (!values.documento.trim() || !values.password.trim()) {
      Swal.fire('Campos requeridos', 'Completa todos los campos', 'warning')
      return
    }

    try {
      await login({
        document: values.documento,
        password: values.password,
      })

      Swal.fire(
        'Inicio exitoso',
        'Bienvenido a actividades Cory',
        'success'
      ).then(() => navigate('/activities'))
    } catch {
    }
  }

  return (
    <AuthForm
      title="Iniciar sesión"
      btnText="Ingresar"
      fields={[
        { name: 'documento', label: 'Documento', type: 'text' },
        { name: 'password', label: 'Contraseña', type: 'password' },
      ]}
      values={values}
      onChange={handleChange}
      onSubmit={handleLogin}
      isLoading={isLoadingAuth}
      loadingText="Ingresando..."
    />
  )
}

export default LoginPage

