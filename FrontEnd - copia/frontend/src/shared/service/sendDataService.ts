import { getTokenService } from './getTokentService'

export const sendDataService = async <T>(
  url: string,
  payload: any,
  isFormData: boolean = false,
  useAuth: boolean = true
): Promise<T> => {
  console.log('📤 sendDataService → URL:', url)
  console.log('📦 sendDataService → Payload:', payload)
  console.log('🔐 sendDataService → useAuth:', useAuth)

  const headers: HeadersInit = {}

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  if (useAuth) {
    const token = getTokenService()
    console.log('🧾 sendDataService → Token leído:', token)

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      console.warn('⚠️ sendDataService → NO HAY TOKEN')
    }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: isFormData ? payload : JSON.stringify(payload),
    })

    console.log('⬅️ sendDataService → STATUS:', response.status)

    let json: any = null
    try {
      json = await response.json()
      console.log('⬅️ sendDataService → JSON:', json)
    } catch {
      console.error('❌ sendDataService → RESPUESTA NO JSON')
    }

    if (!response.ok) {
      const msg =
        json?.message ||
        json?.detail ||
        `HTTP ERROR ${response.status}`
      throw new Error(msg)
    }

    return json as T
  } catch (error: any) {
    console.error('🔥 sendDataService → ERROR:', error)
    throw error
  }
}
