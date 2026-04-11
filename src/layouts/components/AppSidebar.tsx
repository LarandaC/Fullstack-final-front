import { Package, Search, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { NavItemButton } from './NavItemButton'
import { SidebarUserButton } from './SidebarUserButton'
import { navGroups } from '../config/navigation'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-3 gap-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package size={15} />
            </div>
            <span className="truncate font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              InventarioApp
            </span>
          </div>
          <button className="rounded-md p-1 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors group-data-[collapsible=icon]:hidden">
            <Settings size={15} />
          </button>
        </div>

        <div className="mt-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-1.5 text-sm text-sidebar-foreground/50 cursor-default select-none">
            <Search size={13} className="shrink-0" />
            <span className="flex-1">Buscar...</span>
            <kbd className="hidden sm:inline-flex items-center rounded border border-sidebar-border bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-mono text-sidebar-foreground/40">
              ⌘K
            </kbd>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator className='h-2'/>

      <SidebarContent className="py-2">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="px-2">
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40 px-2 mb-0.5">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <NavItemButton key={item.to} {...item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="px-2 py-2">
        <SidebarMenu>
          <SidebarUserButton />
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
