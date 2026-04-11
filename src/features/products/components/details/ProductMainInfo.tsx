import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "../../types/product.types";
import { UNIT_LABELS } from "../../types/product.types";
import DetailItem from "@/components/shared/display/DetailItem";

interface ProductMainInfoProps {
  product: Product;
}

export default function ProductMainInfo({ product }: ProductMainInfoProps) {
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category.name;

  return (
    <Card className="overflow-hidden border-none shadow-md bg-card/60 backdrop-blur-xl border-l-4 border-l-color-blue">
      <CardHeader className="bg-color-blue-subtle/20 px-6 border-b border-border/60">
        <CardTitle className="text-sm font-bold flex items-center gap-2.5 text-color-blue-fg uppercase tracking-widest">
          Información General
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 justify-center">
        <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8">
          <DetailItem label="SKU" value={product.sku} align="left" highlight />
          <DetailItem
            label="Código de barras"
            value={product.barcode || "N/D"}
            align="left"
          />
          <DetailItem
            label="Categoría"
            value={categoryName}
            align="left"
            isBadge
          />
          <DetailItem
            label="Unidad de Medida"
            value={UNIT_LABELS[product.unit]}
            align="left"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-border/10">
          <p className="text-[12px] font-black text-muted-foreground/50 uppercase tracking-[0.15em] mb-2">
            Descripción
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed italic pl-4 py-1">
            {product.description ||
              "El producto no cuenta con una descripción registrada."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
