import { LayoutGrid, ArrowLeftRight, Tag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'General',
    items: [
      { to: '/products', label: 'Productos', icon: LayoutGrid },
      { to: '/categories', label: 'Categorías', icon: Tag },
      { to: '/movements', label: 'Movimientos', icon: ArrowLeftRight },
    ],
  },
]

export const navItems = navGroups.flatMap((g) => g.items)
