import { TrendingDown, TrendingUp } from 'lucide-react'

interface Props {
  minStock: number
  maxStock: number
}

export function ThresholdGrid({ minStock, maxStock }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-3">
        <TrendingDown size={15} className="text-yellow shrink-0" />
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Mínimo
          </p>
          <p className="text-xl font-bold tabular-nums">{minStock}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-3">
        <TrendingUp size={15} className="text-blue shrink-0" />
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Máximo
          </p>
          <p className="text-xl font-bold tabular-nums">{maxStock > 0 ? maxStock : '—'}</p>
        </div>
      </div>
    </div>
  )
}
