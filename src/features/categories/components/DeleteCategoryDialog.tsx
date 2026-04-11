import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { categoryService } from '../services/category.service'
import { CATEGORIES_QUERY_KEY } from '../hooks/useCategories'
import type { Category } from '../types/category.types'
import { ConfirmDialog } from '@/components/shared/dialogs'

interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
}

export function DeleteCategoryDialog({ open, onOpenChange, category }: DeleteCategoryDialogProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => categoryService.remove(category!._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
      toast.success('Categoría eliminada')
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'No se pudo eliminar la categoría')
      onOpenChange(false)
    },
  })

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Eliminar categoría?"
      description={
        <>
          Estás por eliminar <strong>{category?.name}</strong>. Esta acción no se puede deshacer.
          No podrás eliminarla si tiene productos asociados.
        </>
      }
      onConfirm={() => mutate()}
      isPending={isPending}
      confirmLabel="Eliminar"
    />
  )
}
