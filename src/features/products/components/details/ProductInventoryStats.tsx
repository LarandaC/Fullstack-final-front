import { Card, CardContent } from '@/components/ui/card'
import { getStockStatus, STOCK_STATUS_CONFIG } from '../../utils/stockStatus'
import { StockStatusBanner } from './StockStatusBanner'
import { ThresholdGrid } from './ThresholdGrid'
import { StockProgressBar } from './StockProgressBar'
import type { Product } from '../../types/product.types'

interface Props {
  product: Product
}

export default function ProductInventoryStats({ product }: Props) {
  const { stock, minStock, maxStock } = product
  const status = getStockStatus(stock, minStock, maxStock)
  const config = STOCK_STATUS_CONFIG[status]

  return (
    <Card className="border-none shadow-md bg-card/60 backdrop-blur-xl">
      <CardContent className="p-6 space-y-5">
        <p className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.15em]">
          Niveles de inventario
        </p>
        <StockStatusBanner stock={stock} config={config} />
        <ThresholdGrid minStock={minStock} maxStock={maxStock} />
        {maxStock > 0 && (
          <StockProgressBar
            stock={stock}
            minStock={minStock}
            maxStock={maxStock}
            progressColor={config.progressColor}
          />
        )}
      </CardContent>
    </Card>
  )
}
