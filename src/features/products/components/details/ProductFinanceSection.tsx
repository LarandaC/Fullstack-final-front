import { TrendingUp, ShoppingCart, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../../types/product.types";
import { formatCurrency } from "@/lib/format";

interface ProductFinanceSectionProps {
  product: Product;
}

export default function ProductFinanceSection({ product }: ProductFinanceSectionProps) {
  const margin = product.purchasePrice > 0
    ? Number((((product.salePrice - product.purchasePrice) / product.purchasePrice) * 100).toFixed(1))
    : 0;
  const isHealthyMargin = margin >= 20;

  return (
    <Card className="border-none shadow-md bg-card/60 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.15em]">
          Precios y rentabilidad
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 rounded-lg bg-color-green-subtle/30 border border-color-green/20 px-5 py-4">
            <div className="p-2.5 rounded-lg bg-color-green-subtle text-color-green-fg shrink-0">
              <Tag size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Precio de venta
              </p>
              <p className="text-2xl font-bold tracking-tight truncate">
                {formatCurrency(product.salePrice)}
              </p>
              <Badge variant="green-outline" className="mt-1 h-5 text-[10px] px-2">
                IVA {product.iva}% incluido
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-muted/40 px-5 py-4">
            <div className="p-2.5 rounded-lg bg-muted text-muted-foreground shrink-0">
              <ShoppingCart size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Costo base
              </p>
              <p className="text-2xl font-bold tracking-tight truncate">
                {formatCurrency(product.purchasePrice)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-muted/40 px-5 py-4">
            <div className={`p-2.5 rounded-lg shrink-0 ${isHealthyMargin ? "bg-color-green-subtle text-color-green-fg" : "bg-color-yellow-subtle text-color-yellow-fg"}`}>
              <TrendingUp size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Margen de utilidad
              </p>
              <p className={`text-2xl font-bold tracking-tight ${isHealthyMargin ? "text-color-green-fg" : "text-color-yellow-fg"}`}>
                {margin}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
