import { useAuthStore } from '../store/auth.store'
import { ROLES } from '@/lib/roles'

/**
 * Hook centralizado para verificar permisos según el rol del usuario autenticado.
 *
 * Roles:
 * - admin       → acceso total
 * - supervisor  → gestiona productos (sin precios) y categorías, registra movimientos
 * - inventarista→ solo registra movimientos y ve stock (sin precios)
 * - financiero  → gestiona precios y ve sección financiera
 */
export function usePermissions() {
  const role = useAuthStore((s) => s.user?.role)

  return {
    role,

    // Precios / Finanzas
    canViewPrices: role === ROLES.ADMIN || role === ROLES.FINANCIERO,
    canEditPrices: role === ROLES.ADMIN || role === ROLES.FINANCIERO,

    // Productos
    canCreateProduct: role === ROLES.ADMIN || role === ROLES.SUPERVISOR,
    canEditProduct:
      role === ROLES.ADMIN ||
      role === ROLES.SUPERVISOR ||
      role === ROLES.FINANCIERO,
    canDeleteProduct: role === ROLES.ADMIN,

    // Categorías
    canManageCategories: role === ROLES.ADMIN || role === ROLES.SUPERVISOR,
    canDeleteCategory: role === ROLES.ADMIN,

    // Movimientos
    canCreateMovement:
      role === ROLES.ADMIN ||
      role === ROLES.SUPERVISOR ||
      role === ROLES.INVENTARISTA,

    // Usuarios
    canManageUsers: role === ROLES.ADMIN,
  }
}
