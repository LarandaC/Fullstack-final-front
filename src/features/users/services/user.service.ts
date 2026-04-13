import api from '@/lib/axios'
import type { User, CreateUserPayload, UpdateUserPayload } from '../types/user.types'

export const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users')
    return data
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`)
    return data
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await api.post<User>('/users', payload)
    return data
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<User> => {
    const { data } = await api.put<User>(`/users/${id}`, payload)
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
