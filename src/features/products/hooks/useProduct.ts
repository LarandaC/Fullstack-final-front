import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'
import { PRODUCTS_QUERY_KEY } from './useProducts'

export const PRODUCT_DETAIL_QUERY_KEY = 'product-detail'

/** Obtiene un producto por ID. Usa una sub-key dedicada para evitar colisiones con la lista paginada. */
export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, PRODUCT_DETAIL_QUERY_KEY, id],
    queryFn: () => productService.getById(id!),
    enabled: Boolean(id),
  })
}
