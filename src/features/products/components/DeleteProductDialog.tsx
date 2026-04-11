import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { productService } from '../services/product.service'
import { PRODUCTS_QUERY_KEY } from '../hooks/useProducts'
import type { Product } from '../types/product.types'
import { ConfirmDialog } from '@/components/shared/dialogs'

interface DeleteProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export function DeleteProductDialog({ open, onOpenChange, product }: DeleteProductDialogProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => productService.remove(product!._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
      toast.success('Producto eliminado')
      onOpenChange(false)
    },
    onError: () => {
      toast.error('No se pudo eliminar el producto')
      onOpenChange(false)
    },
  })

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Eliminar producto?"
      description={
        <>
          Estás por eliminar <strong>{product?.name}</strong> (SKU: {product?.sku}).
          Esta acción no se puede deshacer.
        </>
      }
      onConfirm={() => mutate()}
      isPending={isPending}
      confirmLabel="Eliminar"
    />
  )
}
