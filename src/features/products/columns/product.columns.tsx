import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";
import { ActionsColumn } from "@/components/shared/columns";
import { formatCurrency } from "@/lib/format";
import type { Product } from "../types/product.types";
import { UNIT_LABELS } from "../types/product.types";

const getCategoryName = (category: Product["category"]) =>
  typeof category === "string" ? category : category.name;

interface ProductColumnsOptions {
  canViewPrices: boolean
  canEdit: boolean
  canDelete: boolean
}

export function createProductColumns(
  onView: (product: Product) => void,
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void,
  options: ProductColumnsOptions,
): ColumnDef<Product, unknown>[] {
  const columns: ColumnDef<Product, unknown>[] = [
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
      accessorKey: "name",
      header: () => <div className="text-center">Nombre</div>,
      cell: ({ getValue }) => (
        <span className="font-semibold text-foreground flex justify-center">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-center">Categoría</div>,
      cell: ({ getValue }) => (
        <div className="flex justify-center">
          <Badge variant="purple" className="capitalize font-medium">
            {getCategoryName(getValue<Product["category"]>())}
          </Badge>
        </div>
      ),
    },
  ]

  if (options.canViewPrices) {
    columns.push(
      {
        accessorKey: "salePrice",
        header: () => <div className="text-center">Precio venta</div>,
        cell: ({ getValue }) => (
          <span className="font-semibold text-foreground flex justify-center">
            {formatCurrency(getValue<number>())}
          </span>
        ),
      },
      {
        accessorKey: "iva",
        header: () => <div className="text-center">IVA</div>,
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground flex justify-center">
            {getValue<number>()}%
          </span>
        ),
      },
    )
  }

  columns.push(
    {
      accessorKey: "unit",
      header: () => <div className="text-center">Unidad</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1.5">
          {row.original.isWeighable && (
            <Scale size={13} className="text-muted-foreground shrink-0" />
          )}
          <span className="text-sm">{UNIT_LABELS[row.original.unit]}</span>
        </div>
      ),
    },
    {
      accessorKey: "minStock",
      header: () => <div className="text-center">Stock mín.</div>,
      cell: ({ getValue }) => (
        <span className="text-sm tabular-nums font-medium flex justify-center">
          {getValue<number>()}
        </span>
      ),
    },
    {
      accessorKey: "maxStock",
      header: () => <div className="text-center">Stock máx.</div>,
      cell: ({ getValue }) => (
        <span className="text-sm tabular-nums flex justify-center text-muted-foreground">
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
            showEdit={options.canEdit}
            showDelete={options.canDelete}
          />
        </div>
      ),
    },
  )

  return columns
}
