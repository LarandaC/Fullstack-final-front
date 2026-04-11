import api from '@/lib/axios'
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
  ProductsQueryParams,
} from '../types/product.types'
import type { PaginatedResponse } from '@/components/shared/datatable'

export const productService = {
  getPaginated: async (params: ProductsQueryParams): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get<PaginatedResponse<Product>>('/products', {
      params: { page: params.page + 1, limit: params.limit }, // TanStack es 0-based, API es 1-based
    })
    return data
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  create: async (payload: CreateProductPayload): Promise<Product> => {
    const { data } = await api.post<Product>('/products', payload)
    return data
  },

  update: async (id: string, payload: UpdateProductPayload): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, payload)
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`)
  },
}
