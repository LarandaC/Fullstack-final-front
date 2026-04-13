import { Badge } from '@/components/ui/badge'
import type { STOCK_STATUS_CONFIG } from '../../utils/stockStatus'

type Config = (typeof STOCK_STATUS_CONFIG)[keyof typeof STOCK_STATUS_CONFIG]

interface Props {
  stock: number
  config: Config
}

export function StockStatusBanner({ stock, config }: Props) {
  const Icon = config.icon
  return (
    <div className={`flex items-center gap-4 rounded-xl px-5 py-4 ${config.cardClass}`}>
      <div className="p-2.5 rounded-lg bg-background/60">
        <Icon size={20} className="text-foreground/70" />
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Stock actual
        </p>
        <p className="text-4xl font-black tabular-nums leading-none mt-0.5">{stock}</p>
      </div>
      <Badge variant="outline" className={`text-xs px-2.5 py-1 ${config.badgeClass}`}>
        {config.label}
      </Badge>
    </div>
  )
}
