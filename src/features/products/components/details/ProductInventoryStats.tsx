import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "../../types/product.types";

interface ProductInventoryStatsProps {
  product: Product;
}

export default function ProductInventoryStats({ product }: ProductInventoryStatsProps) {
  const { minStock, maxStock } = product;
  const range = maxStock - minStock;
  const fillPct = maxStock > 0 ? Math.round((minStock / maxStock) * 100) : 0;

  return (
    <Card className="border-none shadow-md bg-card/60 backdrop-blur-xl">
      <CardContent className="p-6 space-y-4">
        <p className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.15em]">
          Niveles de inventario
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-3">
            <div className="p-2 rounded-md bg-color-red-subtle text-color-red-fg">
              <TrendingDown size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Stock mínimo
              </p>
              <p className="text-2xl font-bold tabular-nums">{minStock}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-3">
            <div className="p-2 rounded-md bg-color-green-subtle text-color-green-fg">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Capacidad máxima
              </p>
              <p className="text-2xl font-bold tabular-nums">{maxStock}</p>
            </div>
          </div>
        </div>

        {maxStock > 0 && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Rango de stock</span>
              <span className="tabular-nums">{range} unidades de margen</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/60 transition-all"
                style={{ width: `${fillPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground/60 tabular-nums">
              <span>{minStock}</span>
              <span>{maxStock}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
