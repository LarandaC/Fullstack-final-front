import { Badge } from '@/components/ui/badge'
import type { MovementStatus } from '../types/movement.types'

const config: Record<MovementStatus, { label: string; className: string }> = {
  pendiente: {
    label: 'Pendiente',
    className:
      'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  },
  aprobado: {
    label: 'Aprobado',
    className:
      'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  },
  rechazado: {
    label: 'Rechazado',
    className:
      'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  },
}

export function MovementStatusBadge({ status }: { status: MovementStatus }) {
  const { label, className } = config[status]
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}
