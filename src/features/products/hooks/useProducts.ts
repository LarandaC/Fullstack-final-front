import { useQuery } from '@tanstack/react-query'
import type { PaginationState } from '@tanstack/react-table'
import { productService } from '../services/product.service'

export const PRODUCTS_QUERY_KEY = 'products'

/** Obtiene la página actual de productos desde el servidor. */
export function useProducts(pagination: PaginationState) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      productService.getPaginated({
        page: pagination.pageIndex,
        limit: pagination.pageSize,
      }),
    placeholderData: (prev) => prev, // mantiene datos anteriores mientras carga la nueva página
  })
}
