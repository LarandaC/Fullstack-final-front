import { NavLink, useMatch } from 'react-router-dom'
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from '@/components/ui/sidebar'
import type { NavItem } from '../config/navigation'

export function NavItemButton({ to, label, icon: Icon, badge }: NavItem) {
  const match = useMatch(to)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={!!match} tooltip={label} asChild>
        <NavLink to={to}>
          <Icon size={16} />
          <span>{label}</span>
        </NavLink>
      </SidebarMenuButton>
      {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
    </SidebarMenuItem>
  )
}
