import api from '@/lib/axios'
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../types/category.types'

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>('/categories')
    return data
  },

  getById: async (id: string): Promise<Category> => {
    const { data } = await api.get<Category>(`/categories/${id}`)
    return data
  },

  create: async (payload: CreateCategoryPayload): Promise<Category> => {
    const { data } = await api.post<Category>('/categories', payload)
    return data
  },

  update: async (id: string, payload: UpdateCategoryPayload): Promise<Category> => {
    const { data } = await api.put<Category>(`/categories/${id}`, payload)
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`)
  },
}
