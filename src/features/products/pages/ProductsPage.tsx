import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/shared/datatable";
import { Button } from "@/components/ui/button";
import { useDataTablePagination } from "@/components/shared/datatable/hooks/useDataTablePagination";
import { useProducts } from "../hooks/useProducts";
import { createProductColumns } from "../columns/product.columns";
import { DeleteProductDialog } from "../components/DeleteProductDialog";
import type { Product } from "../types/product.types";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { pagination, onPaginationChange } = useDataTablePagination();
  const { data, isFetching } = useProducts(pagination);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const columns = useMemo(
    () =>
      createProductColumns(
        (product) => navigate(`/products/${product._id}`),
        (product) => navigate(`/products/${product._id}/edit`),
        (product) => setDeleteTarget(product),
      ),
    [navigate],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestión del catálogo de productos e inventario.
          </p>
        </div>
        <Button onClick={() => navigate("/products/new")}>
          <Plus size={16} />
          Nuevo producto
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pageCount={data?.pageCount ?? 0}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        isLoading={isFetching}
        emptyMessage="No hay productos registrados."
      />

      <DeleteProductDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        product={deleteTarget}
      />
    </div>
  );
}
