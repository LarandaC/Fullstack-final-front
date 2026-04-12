import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Package, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../../types/product.types";

interface ProductDetailsHeaderProps {
  product: Product;
}

export default function ProductDetailsHeader({ product }: ProductDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/products")}
            className="h-9 w-9 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="h-16 w-16 shrink-0 rounded-xl border border-border bg-muted overflow-hidden flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Package className="h-7 w-7 text-muted-foreground/40" />
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {product.name}
              </h1>
              {product.isWeighable && (
                <Badge variant="blue-outline" className="gap-1">
                  <Scale size={11} />
                  Pesable
                </Badge>
              )}
            </div>
            
          </div>
        </div>

        <Button
          onClick={() => navigate(`/products/${product._id}/edit`)}
          className="shrink-0"
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Editar producto
        </Button>
      </div>

      <div className="h-px w-full bg-linear-to-r from-border via-border/50 to-transparent" />
    </div>
  );
}
