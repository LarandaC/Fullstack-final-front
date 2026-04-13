import { useNavigate } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { compraSchema, type CompraFormValues } from '../schemas/movement.schema'
import { movementService } from '../services/movement.service'
import { MOVEMENTS_QUERY_KEY } from './useMovements'
import { useAllProducts } from '@/features/products/hooks/useAllProducts'
import type { Product } from '@/features/products/types/product.types'

export function useCompraForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: products = [] } = useAllProducts()

  const form = useForm<CompraFormValues>({
    resolver: zodResolver(compraSchema),
    defaultValues: { items: [], supplier: '', notes: '' },
  })

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'items' })

  const watchedItems = form.watch('items')
  const existingProductIds = watchedItems.map((item) => item.product)

  const handleAddProduct = (product: Product) => {
    append({
      product: product._id,
      quantity: 1,
      purchasePrice: product.purchasePrice ?? undefined,
      salePrice: product.salePrice ?? undefined,
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CompraFormValues) =>
      movementService.createCompra({
        items: values.items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          ...(item.purchasePrice != null ? { purchasePrice: item.purchasePrice } : {}),
          ...(item.salePrice != null ? { salePrice: item.salePrice } : {}),
        })),
        supplier: values.supplier || undefined,
        notes: values.notes || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MOVEMENTS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Compra registrada. El stock fue actualizado.')
      navigate('/movements')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message ?? 'Error al registrar la compra')
    },
  })

  return {
    form,
    fields,
    products,
    watchedItems,
    existingProductIds,
    isPending,
    handleAddProduct,
    handleRemove: remove,
    submit: form.handleSubmit((values) => mutate(values)),
    cancel: () => navigate('/movements'),
  }
}
