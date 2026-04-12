import { useCallback, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/shared/datatable'
import { Button } from '@/components/ui/button'
import { useCategories } from '../hooks/useCategories'
import { createCategoryColumns } from '../columns/category.columns'
import { CategoryFormDialog } from '../components/CategoryFormDialog'
import { DeleteCategoryDialog } from '../components/DeleteCategoryDialog'
import type { Category } from '../types/category.types'

export default function CategoriesPage() {
  const { data: categories, isFetching } = useCategories()

  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Category | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

  const handleEdit = useCallback((category: Category) => {
    setEditTarget(category)
    setFormOpen(true)
  }, [])

  const handleDelete = useCallback((category: Category) => {
    setDeleteTarget(category)
  }, [])

  const handleFormOpenChange = (open: boolean) => {
    setFormOpen(open)
    if (!open) setEditTarget(undefined)
  }

  const columns = useMemo(
    () => createCategoryColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categorías</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestioná las categorías para clasificar los productos.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={16} />
          Nueva categoría
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={categories ?? []}
        pageCount={1}
        pagination={{ pageIndex: 0, pageSize: 50 }}
        onPaginationChange={() => {}}
        isLoading={isFetching}
        emptyMessage="No hay categorías registradas."
      />

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={handleFormOpenChange}
        category={editTarget}
      />

      <DeleteCategoryDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        category={deleteTarget}
      />
    </div>
  )
}
