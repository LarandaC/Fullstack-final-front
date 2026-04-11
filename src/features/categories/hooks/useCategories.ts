import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../services/category.service'

export const CATEGORIES_QUERY_KEY = 'categories'

/** Obtiene todas las categorías. */
export function useCategories() {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: categoryService.getAll,
  })
}
