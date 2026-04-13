import api from '@/lib/axios'
import type {
  Movement,
  CreateCompraPayload,
  CreateBajaPayload,
} from '../types/movement.types'

export const movementService = {
  getAll: async (): Promise<Movement[]> => {
    const { data } = await api.get<Movement[]>('/movements')
    return data
  },

  getById: async (id: string): Promise<Movement> => {
    const { data } = await api.get<Movement>(`/movements/${id}`)
    return data
  },

  getByProduct: async (productId: string): Promise<Movement[]> => {
    const { data } = await api.get<Movement[]>(`/movements/product/${productId}`)
    return data
  },

  createCompra: async (payload: CreateCompraPayload): Promise<Movement> => {
    const { data } = await api.post<Movement>('/movements/compra', payload)
    return data
  },

  createBaja: async (payload: CreateBajaPayload): Promise<Movement> => {
    const { data } = await api.post<Movement>('/movements/baja', payload)
    return data
  },

  approveBaja: async (id: string): Promise<Movement> => {
    const { data } = await api.patch<Movement>(`/movements/${id}/approve`)
    return data
  },

  rejectBaja: async (id: string): Promise<Movement> => {
    const { data } = await api.patch<Movement>(`/movements/${id}/reject`)
    return data
  },
}
