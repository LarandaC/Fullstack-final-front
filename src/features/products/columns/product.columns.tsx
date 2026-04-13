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
      accessorKey: "stock",
      header: () => <div className="text-center">Stock actual</div>,
      cell: ({ row }) => {
        const { stock, minStock, maxStock } = row.original

        type StockStatus = "empty" | "low" | "ok" | "over"
        const status: StockStatus =
          stock === 0
            ? "empty"
            : stock < minStock
              ? "low"
              : maxStock > 0 && stock > maxStock
                ? "over"
                : "ok"

        const statusConfig: Record<StockStatus, { label: string; className: string }> = {
          empty: {
            label: "Sin stock",
            className:
              "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
          },
          low: {
            label: "Stock bajo",
            className:
              "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
          },
          ok: {
            label: "Normal",
            className:
              "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
          },
          over: {
            label: "Sobrestock",
            className:
              "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
          },
        }

        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-base font-bold tabular-nums">{stock}</span>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusConfig[status].className}`}>
              {statusConfig[status].label}
            </Badge>
          </div>
        )
      },
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
