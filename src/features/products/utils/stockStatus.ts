import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react'

export type StockStatus = 'empty' | 'low' | 'ok' | 'over'

export function getStockStatus(stock: number, minStock: number, maxStock: number): StockStatus {
  if (stock === 0) return 'empty'
  if (stock < minStock) return 'low'
  if (maxStock > 0 && stock > maxStock) return 'over'
  return 'ok'
}

export const STOCK_STATUS_CONFIG: Record<
  StockStatus,
  { label: string; badgeClass: string; cardClass: string; progressColor: string; icon: typeof Package }
> = {
  empty: {
    label: 'Sin stock',
    badgeClass: 'bg-red-subtle text-red-fg border-red/30',
    cardClass: 'bg-red-subtle/60',
    progressColor: 'bg-red',
    icon: AlertTriangle,
  },
  low: {
    label: 'Stock bajo',
    badgeClass: 'bg-yellow-subtle text-yellow-fg border-yellow/30',
    cardClass: 'bg-yellow-subtle/60',
    progressColor: 'bg-yellow',
    icon: TrendingDown,
  },
  ok: {
    label: 'Normal',
    badgeClass: 'bg-green-subtle text-green-fg border-green/30',
    cardClass: 'bg-green-subtle/60',
    progressColor: 'bg-green',
    icon: Package,
  },
  over: {
    label: 'Sobrestock',
    badgeClass: 'bg-blue-subtle text-blue-fg border-blue/30',
    cardClass: 'bg-blue-subtle/60',
    progressColor: 'bg-blue',
    icon: TrendingUp,
  },
}
