import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "../../types/product.types";
import DetailItem from "@/components/shared/display/DetailItem";

interface ProductInventoryStatsProps {
  product: Product;
}

export default function ProductInventoryStats({
  product,
}: ProductInventoryStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-none shadow-md bg-card/60 backdrop-blur-xl border-l-4 border-l-color-red">
        <CardContent className="p-6">
          <DetailItem
            label="Stock Mínimo"
            value={product.minStock}
            className="w-full"
            highlight
            size="lg"
          />
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-card/60 backdrop-blur-xl border-l-4 border-l-color-green">
        <CardContent className="p-6">
          <DetailItem
            label="Capacidad Máxima"
            value={product.maxStock}
            className="w-full"
            highlight
            size="lg"
          />
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-card/60 backdrop-blur-xl border-l-4 border-l-color-green">
        <CardContent className="p-6">
          <DetailItem
            label="Stock Actual"
            value="15"
            className="w-full"
            highlight
            size="lg"
          />
        </CardContent>
      </Card>
    </div>
  );
}
