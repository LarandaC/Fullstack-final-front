import { Badge } from '@/components/ui/badge'
import { HelpCircle, ShoppingCart, Trash2 } from 'lucide-react'
import type { MovementType } from '../types/movement.types'

const config: Record<string, { label: string; className: string; icon: typeof ShoppingCart }> = {
  compra: {
    label: 'Compra',
    className:
      'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    icon: ShoppingCart,
  },
  baja: {
    label: 'Baja',
    className:
      'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
    icon: Trash2,
  },
}

const FALLBACK = {
  label: 'Desconocido',
  className: 'bg-muted text-muted-foreground border-muted',
  icon: HelpCircle,
}

export function MovementTypeBadge({ type }: { type: MovementType | string }) {
  const { label, className, icon: Icon } = config[type] ?? FALLBACK
  return (
    <Badge variant="outline" className={`gap-1 ${className}`}>
      <Icon size={11} />
      {label}
    </Badge>
  )
}
