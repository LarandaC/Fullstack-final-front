import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface Props {
  productName?: string;
  productSku?: string;
  productBarcode?: string;
  productStock?: number;
  onRemove: () => void;
  children: ReactNode;
}

export function BaseItemRow({
  productName,
  productSku,
  productBarcode,
  productStock,
  onRemove,
  children,
}: Props) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-3 items-start p-3 rounded-lg border bg-muted/20">
      {/* Product info */}
      <div className="flex-1 min-w-0 pt-1">
        <p className="font-medium text-sm leading-tight">
          {productName ?? "—"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          SKU: {productSku ?? "—"}
          {productBarcode ? ` · CB: ${productBarcode}` : ""}
          {productStock !== undefined ? ` · Stock: ${productStock}` : ""}
        </p>
      </div>

      {/* Specific Form Fields */}
      {children}

      {/* Remove Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive shrink-0 mt-5"
      >
        <Trash2 size={15} />
      </Button>
    </div>
  );
}
