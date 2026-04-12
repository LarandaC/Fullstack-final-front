import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import type { UserRole } from '@/lib/roles'

interface RoleGuardProps {
  roles: UserRole[]
  redirectTo?: string
}

/**
 * Protege rutas según el rol del usuario.
 * Si el rol no está en la lista permitida, redirige a `redirectTo` (default: "/").
 */
export default function RoleGuard({ roles, redirectTo = '/' }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user)

  if (!user || !roles.includes(user.role as UserRole)) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
