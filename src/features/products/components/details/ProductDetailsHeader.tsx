import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../../types/product.types";

interface ProductDetailsHeaderProps {
  product: Product;
}

export default function ProductDetailsHeader({
  product,
}: ProductDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="relative space-y-3 pb-1">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-start gap-5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/products")}
            className="h-12 w-12 border-none bg-transparent"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </Button>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground/90">
                {product.name}
              </h1>
              <Badge
                variant={product.minStock > 0 ? "green" : "secondary"}
                className="h-7 px-3 text-[10px] uppercase tracking-widest font-bold"
              >
                {product.minStock > 0 ? "Catálogo Activo" : "Revisión Stock"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => navigate(`/products/${product._id}/edit`)}>
            <Edit2 className="mr-2 h-4 w-4" /> Editar Producto
          </Button>
        </div>
      </div>

      <div className="h-px w-full bg-linear-to-r from-border/50 via-border to-transparent" />
    </div>
  );
}
