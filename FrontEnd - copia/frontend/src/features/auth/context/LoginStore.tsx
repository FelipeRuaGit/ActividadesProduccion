// src/features/auth/context/authStore.ts
import { create } from 'zustand'
import Cookies from 'js-cookie'
import { sendDataService } from '../../../shared/service/sendDataService'
import { IAuthStore } from '../../../features/auth/interfaces/context/ILoginStore'
import { ISendCredentialsDTO } from '../../../features/auth/interfaces/DTOs/ISendCredentialsDTO'

const BASEURL = 'http://127.0.0.1:8000/api/v1/auth'

export const authStore = create<IAuthStore>((set) => ({
  isLoadingAuth: false,
  errorMessageAuth: null,
  token: null,

  login: async (credentials: ISendCredentialsDTO): Promise<void> => {
    console.log('🟢 [authStore.login] START')
    console.log('📦 credentials:', credentials)

    set({ isLoadingAuth: true, errorMessageAuth: null })

    try {
      console.log('➡️ [authStore.login] calling backend:', `${BASEURL}/login`)

      const response = await sendDataService<{ token: string }>(
        `${BASEURL}/login`,
        credentials,
        false,
        false
      )

      console.log('✅ [authStore.login] backend response:', response)
      console.log('🔑 [authStore.login] token recibido:', response.token)

      Cookies.set('token', response.token, {
        expires: 1,
        secure: false,
        sameSite: 'lax',
      })

      console.log('🍪 [authStore.login] token guardado en cookie')

      set({ token: response.token })
      console.log('📦 [authStore.login] token guardado en store')

    } catch (error: any) {
      console.error('❌ [authStore.login] ERROR:', error)
      set({ errorMessageAuth: error.message })
      throw error
    } finally {
      set({ isLoadingAuth: false })
      console.log('🔵 [authStore.login] END')
    }
  },

  logout: () => {
    console.warn('🚪 [authStore.logout] LOGOUT EJECUTADO')
    Cookies.remove('token')
    set({ token: null })
  },

  clearError: () => {
    console.log('🧹 [authStore.clearError]')
    set({ errorMessageAuth: null })
  },
}))
