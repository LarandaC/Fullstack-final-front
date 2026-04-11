import api from '@/lib/axios'
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth.types'

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload)
    return data
  },

  register: async (payload: RegisterPayload): Promise<{ message: string; user: AuthResponse['user'] }> => {
    const { data } = await api.post('/auth/register', payload)
    return data
  },
}
