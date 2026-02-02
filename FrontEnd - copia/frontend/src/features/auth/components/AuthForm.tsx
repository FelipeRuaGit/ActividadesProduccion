// src/features/auth/components/AuthForm.tsx
import React from 'react'

interface Field {
  name: string
  label: string
  type: string
}

interface AuthFormProps {
  title: string
  btnText: string
  fields: Field[]
  values: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  isLoading?: boolean
  loadingText?: string
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  btnText,
  fields,
  values,
  onChange,
  onSubmit,
  isLoading = false,
  loadingText = 'Cargando...',
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {title}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="space-y-5"
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={values[field.name]}
                onChange={onChange}
                placeholder={field.label}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? loadingText : btnText}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          ¿No tienes cuenta?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
