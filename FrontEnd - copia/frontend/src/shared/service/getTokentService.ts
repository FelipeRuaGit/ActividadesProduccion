import Cookies from 'js-cookie'

export const getTokenService = (): string | undefined => {
  const token = Cookies.get('token')
  console.log('🟡 getTokenService → token:', token)
  return token
}

// getDataService.ts
export const getDataService = async <T>(url: string): Promise<T> => {
  const token = getTokenService()
  const headers: HeadersInit = {}

  if (token) headers['Authorization'] = `Bearer ${token}`

  const response = await fetch(url, { headers })
  const json = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(json?.detail || `HTTP ERROR ${response.status}`)
  }

  return json as T
}
