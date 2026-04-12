import { useNavigate } from 'react-router-dom'
import type { Product } from '../types/product.types'
import { useProductForm } from '../hooks/useProductForm'
import { useEditProduct } from '../hooks/useEditProduct'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ProductInfo } from './form/ProductInfo'
import { PriceInfo } from './form/PriceInfo'
import { InventoryInfo } from './form/InventoryInfo'
import { AdditionalInfo } from './form/AdditionalInfo'

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const navigate = useNavigate()
  const isEditing = Boolean(product)

  const createHook = useProductForm()
  const editHook = useEditProduct(product)

  const { form, isWeighable, categories, loadingCategories, isPending, onSubmit } = isEditing
    ? editHook
    : createHook

  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <ProductInfo
            form={form}
            categories={categories}
            loadingCategories={loadingCategories}
          />

          <PriceInfo form={form} />

          <InventoryInfo form={form} isWeighable={isWeighable} />

          <AdditionalInfo form={form} />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear producto"}
            </Button>
          </div>
        </form>
      </Form>
  );
}
