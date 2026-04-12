import { useEffect } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ProductFormValues } from '../schemas/product.schema'

/** Fuerza la unidad a "kg" cuando el producto es pesable. */
export function useWeighableUnit(form: UseFormReturn<ProductFormValues>) {
  const isWeighable = form.watch('isWeighable')

  useEffect(() => {
    if (isWeighable) form.setValue('unit', 'kg', { shouldValidate: true })
  }, [isWeighable, form])

  return isWeighable
}
