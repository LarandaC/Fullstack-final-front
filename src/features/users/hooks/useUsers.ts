import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/user.service'

export const USERS_QUERY_KEY = 'users'

export function useUsers() {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: userService.getAll,
  })
}
