import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'

export function useAllProducts() {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: productService.getAll,
    staleTime: 1000 * 60 * 5,
  })
}
