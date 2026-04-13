interface Props {
  stock: number
  minStock: number
  maxStock: number
  progressColor: string
}

export function StockProgressBar({ stock, minStock, maxStock, progressColor }: Props) {
  const progressPct = Math.min(Math.round((stock / maxStock) * 100), 100)
  const minPct = Math.min(Math.round((minStock / maxStock) * 100), 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span className="tabular-nums">
          {stock} / {maxStock} unidades
        </span>
      </div>

      <div className="relative h-2.5 w-full rounded-full bg-muted overflow-visible">
        <div
          className={`h-full rounded-full transition-all ${progressColor}`}
          style={{ width: `${progressPct}%` }}
        />
        {minPct > 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-yellow/70 rounded-full"
            style={{ left: `${minPct}%` }}
            title={`Mínimo: ${minStock}`}
          />
        )}
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground/60 tabular-nums">
        <span>0</span>
        {minPct > 0 && (
          <span className="text-yellow-fg" style={{ marginLeft: `${minPct - 5}%` }}>
            mín {minStock}
          </span>
        )}
        <span>{maxStock}</span>
      </div>
    </div>
  )
}
