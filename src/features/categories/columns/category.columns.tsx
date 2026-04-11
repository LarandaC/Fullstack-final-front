import type { ColumnDef } from '@tanstack/react-table'
import { ActionsColumn } from '@/components/shared/columns'
import type { Category } from '../types/category.types'

/**
 * Factory que recibe los handlers de acción para mantener las columnas
 * desacopladas del estado de la página.
 */
export function createCategoryColumns(
  onEdit: (category: Category) => void,
  onDelete: (category: Category) => void,
): ColumnDef<Category, unknown>[] {
  return [
    {
      accessorKey: 'name',
      header: () => <div className="text-center">Nombre</div>,
      cell: ({ getValue }) => (
        <span className="font-medium text-center flex justify-center">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: 'description',
      header: () => <div className="text-center">Descripción</div>,
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground text-center flex justify-center">
          {getValue<string | undefined>() ?? '—'}
        </span>
      ),
    },
    {
      id: 'acciones',
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <ActionsColumn
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
            showView={false}
            showEdit={true}
            showDelete={true}
          />
        </div>
      ),
    },
  ]
}
