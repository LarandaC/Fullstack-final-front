import { TrendingUp, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../../types/product.types";
import { formatCurrency } from "@/lib/format";

interface ProductFinanceSectionProps {
  product: Product;
}

export default function ProductFinanceSection({
  product,
}: ProductFinanceSectionProps) {
  const margin = Number(
    (
      ((product.salePrice - product.purchasePrice) / product.purchasePrice) *
      100
    ).toFixed(1),
  );
  const isHealthyMargin = margin >= 20;

  return (
    <Card className="overflow-hidden border-none shadow-md bg-card/60 backdrop-blur-xl border-l-4 border-l-color-green">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">
          <div className="bg-color-green-subtle/20 p-6 flex flex-col items-center justify-center text-center border-r border-border/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[12px] font-black text-color-green-fg uppercase tracking-[0.2em]">
                Precio de Venta
              </span>
            </div>
            <div className="text-4xl font-black tracking-tighter text-foreground">
              {formatCurrency(product.salePrice)}
            </div>
            <div className="mt-2 text-[11px] font-bold">
              <Badge variant="green-outline" className="px-2 py-0 h-5">
                IVA {product.iva}% INCLUIDO
              </Badge>
            </div>
          </div>

          <div className="p-6 flex flex-col items-center justify-center text-center border-r border-border/10">
            <div className="space-y-1 flex flex-col items-center">
              <span className="text-[12px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-color-blue/10 text-color-blue text-[12px]">
                  <Info className="h-4 w-4" />
                </div>
                Costo Base
              </span>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(product.purchasePrice)}
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="space-y-1 flex flex-col items-center">
              <span className="text-[12px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-color-purple/10 text-color-purple text-[12px]">
                  <TrendingUp className="h-4 w-4" />
                </div>
                Margen de Utilidad
              </span>
              <div className="flex items-center justify-center gap-2">
                <p
                  className={`text-xl font-black ${isHealthyMargin ? "text-color-green" : "text-color-yellow-fg"}`}
                >
                  {margin}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
