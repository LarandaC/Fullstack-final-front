import { useNavigate } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { bajaSchema, type BajaFormValues } from '../schemas/movement.schema'
import { movementService } from '../services/movement.service'
import { MOVEMENTS_QUERY_KEY } from './useMovements'
import { useAllProducts } from '@/features/products/hooks/useAllProducts'
import type { Product } from '@/features/products/types/product.types'

export function useBajaForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: products = [] } = useAllProducts()

  const form = useForm<BajaFormValues>({
    resolver: zodResolver(bajaSchema),
    defaultValues: { items: [], notes: '' },
  })

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'items' })

  const watchedItems = form.watch('items')
  const existingProductIds = watchedItems.map((item) => item.product)

  const handleAddProduct = (product: Product) => {
    append({ product: product._id, quantity: 1, reason: 'daño', reasonDetail: '' })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (values: BajaFormValues) =>
      movementService.createBaja({
        items: values.items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          reason: item.reason,
          ...(item.reasonDetail ? { reasonDetail: item.reasonDetail } : {}),
        })),
        notes: values.notes || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MOVEMENTS_QUERY_KEY] })
      toast.success('Baja enviada. Queda pendiente de aprobación por el administrador.')
      navigate('/movements')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message ?? 'Error al registrar la baja')
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
