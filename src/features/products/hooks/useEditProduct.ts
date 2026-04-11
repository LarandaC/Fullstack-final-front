import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { productSchema, type ProductFormValues } from '../schemas/product.schema'
import { productService } from '../services/product.service'
import { PRODUCTS_QUERY_KEY } from './useProducts'
import { PRODUCT_EMPTY_DEFAULTS } from './useProductForm'
import { type Product } from '../types/product.types'
import { useCategories } from '@/features/categories/hooks/useCategories'

function productToFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    description: product.description ?? '',
    sku: product.sku,
    barcode: product.barcode ?? '',
    category: typeof product.category === 'string' ? product.category : product.category._id,
    purchasePrice: product.purchasePrice,
    salePrice: product.salePrice,
    image: undefined,
    isWeighable: product.isWeighable,
    unit: product.unit,
    iva: product.iva,
    minStock: product.minStock,
    maxStock: product.maxStock,
  }
}

export function useEditProduct(product: Product | undefined) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? productToFormValues(product) : PRODUCT_EMPTY_DEFAULTS,
  })

  const isWeighable = form.watch('isWeighable')

  useEffect(() => {
    if (isWeighable) form.setValue('unit', 'kg', { shouldValidate: true })
  }, [isWeighable, form])

  useEffect(() => {
    if (product) form.reset(productToFormValues(product))
  }, [product, form])

  const { data: categories, isLoading: loadingCategories } = useCategories()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ image, ...values }: ProductFormValues) =>
      productService.update(product!._id, {
        ...values,
        barcode: values.barcode || undefined,
        image: image instanceof File ? undefined : image || undefined,
        description: values.description || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
      toast.success('Producto actualizado')
      navigate('/products')
    },
    onError: () => {
      toast.error('No se pudo actualizar el producto')
    },
  })

  return { form, isWeighable, categories, loadingCategories, isPending, onSubmit: mutate }
}
