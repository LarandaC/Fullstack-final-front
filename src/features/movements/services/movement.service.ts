import api from '@/lib/axios'
import type { Movement, CreateMovementPayload } from '../types/movement.types'

export const movementService = {
  getAll: async (): Promise<Movement[]> => {
    const { data } = await api.get<Movement[]>('/movements')
    return data
  },

  getByProduct: async (productId: string): Promise<Movement[]> => {
    const { data } = await api.get<Movement[]>(`/movements/product/${productId}`)
    return data
  },

  create: async (payload: CreateMovementPayload): Promise<Movement> => {
    const { data } = await api.post<Movement>('/movements', payload)
    return data
  },
}
