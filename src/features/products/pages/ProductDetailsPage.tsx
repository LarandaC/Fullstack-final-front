import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "../hooks/useProduct";
import ProductDetailsHeader from "../components/details/ProductDetailsHeader";
import ProductFinanceSection from "../components/details/ProductFinanceSection";
import ProductMainInfo from "../components/details/ProductMainInfo";
import ProductInventoryStats from "../components/details/ProductInventoryStats";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="bg-destructive/10 p-4 rounded-full">
          <XCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Producto no encontrado
        </h2>
        <p className="text-muted-foreground max-w-xs">
          No pudimos obtener la información del producto solicitado. Es posible
          que haya sido eliminado de la base de datos.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/products")}
          className="mt-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl items-center mx-auto">
      <ProductDetailsHeader product={product} />

      <ProductMainInfo product={product} />

      <ProductInventoryStats product={product} />

      <ProductFinanceSection product={product} />

    </div>
  );
}
