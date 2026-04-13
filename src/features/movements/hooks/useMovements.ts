import { useQuery } from '@tanstack/react-query'
import { movementService } from '../services/movement.service'

export const MOVEMENTS_QUERY_KEY = 'movements'

export function useMovements() {
  return useQuery({
    queryKey: [MOVEMENTS_QUERY_KEY],
    queryFn: movementService.getAll,
  })
}
