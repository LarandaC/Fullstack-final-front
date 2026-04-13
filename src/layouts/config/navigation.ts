import { LayoutGrid, ArrowLeftRight, Tag, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { UserRole } from '@/lib/roles'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  badge?: string
  /** Si se define, el ítem solo es visible para los roles indicados */
  roles?: UserRole[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
  /** Si se define, el grupo solo es visible para los roles indicados */
  roles?: UserRole[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'General',
    items: [
      { to: '/products', label: 'Productos', icon: LayoutGrid },
      { to: '/categories', label: 'Categorías', icon: Tag, roles: ['admin', 'supervisor', 'inventarista'] },
      { to: '/movements', label: 'Movimientos', icon: ArrowLeftRight },
    ],
  },
  {
    label: 'Administración',
    roles: ['admin'],
    items: [
      { to: '/users', label: 'Usuarios', icon: Users, roles: ['admin'] },
    ],
  },
]

export const navItems = navGroups.flatMap((g) => g.items)
