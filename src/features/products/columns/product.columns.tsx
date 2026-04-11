import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";
import { ActionsColumn } from "@/components/shared/columns";
import { formatCurrency } from "@/lib/format";
import type { Product } from "../types/product.types";
import { UNIT_LABELS } from "../types/product.types";

const getCategoryName = (category: Product["category"]) =>
  typeof category === "string" ? category : category.name;

export function createProductColumns(
  onView: (product: Product) => void,
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void,
): ColumnDef<Product, unknown>[] {
  return [
    {
      accessorKey: "sku",
      header: () => <div className="text-center">SKU</div>,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm text-muted-foreground flex justify-center">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "barcode",
      header: () => <div className="text-center">Cód. barras</div>,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm text-muted-foreground flex justify-center">
          {getValue<string | undefined>() ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center">Nombre</div>,
      cell: ({ getValue }) => (
        <span className="font-medium flex justify-center">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-center">Categoría</div>,
      cell: ({ getValue }) => (
        <div className="flex justify-center">
          <Badge variant="purple" className="capitalize">
            {getCategoryName(getValue<Product["category"]>())}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "purchasePrice",
      header: () => <div className="text-center">P. compra</div>,
      cell: ({ getValue }) => (
        <span className="text-sm flex justify-center">
          {formatCurrency(getValue<number>())}
        </span>
      ),
    },
    {
      accessorKey: "unit",
      header: () => <div className="text-center">Unidad</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1.5">
          {row.original.isWeighable && (
            <Scale size={14} className="text-muted-foreground" />
          )}
          <span className="text-sm">{UNIT_LABELS[row.original.unit]}</span>
        </div>
      ),
    },
    {
      accessorKey: "minStock",
      header: () => <div className="text-center">Stock mín.</div>,
      cell: ({ getValue }) => {
        const stock = getValue<number>();
        return (
          <div className="flex justify-center">
            <span
              className={
                stock === 0
                  ? "text-color-red font-medium"
                  : stock < 10
                    ? "text-color-yellow font-medium"
                    : "text-color-green font-medium"
              }
            >
              {stock}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "maxStock",
      header: () => <div className="text-center">Stock máx.</div>,
      cell: ({ getValue }) => (
        <span className="text-sm flex justify-center">
          {getValue<number>()}
        </span>
      ),
    },
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <ActionsColumn
            onView={() => onView(row.original)}
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
            showView={true}
            showEdit={true}
            showDelete={true}
          />
        </div>
      ),
    },
  ];
}
