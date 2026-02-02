import { getTokenService } from "./getTokentService";

export const getDataService = async <T>(
  url: string,
  useAuth: boolean = true
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (useAuth) {
    const token = getTokenService();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🟡 getDataService → Token enviado en header');
    } else {
      console.warn('⚠️ getDataService → No hay token disponible');
    }
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      // credentials: 'include', // habilitar si usas cookies también
    });

    let json: any = null;
    try {
      json = await response.json();
    } catch {
      console.error('❌ getDataService → La respuesta no es JSON');
    }

    if (!response.ok) {
      const msg = json?.message || json?.detail || `HTTP ERROR ${response.status}`;
      throw new Error(msg);
    }

    return json as T;
  } catch (error: any) {
    console.error('🔥 getDataService → ERROR:', error.message);
    throw error;
  }
};
