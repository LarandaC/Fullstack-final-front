import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { PackageSearch, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ProductSearchInput } from './ProductSearchInput'
import type { CompraFormValues } from '../schemas/movement.schema'
import type { Product } from '@/features/products/types/product.types'

interface Props {
  form: UseFormReturn<CompraFormValues>
  fields: FieldArrayWithId<CompraFormValues, 'items'>[]
  products: Product[]
  watchedItems: CompraFormValues['items']
  existingProductIds: string[]
  onAdd: (product: Product) => void
  onRemove: (index: number) => void
}

export function CompraItemsCard({
  form,
  fields,
  products,
  watchedItems,
  existingProductIds,
  onAdd,
  onRemove,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Productos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProductSearchInput onAdd={onAdd} existingIds={existingProductIds} />

        {fields.length === 0 ? (
          <EmptyState error={form.formState.errors.items?.root?.message} />
        ) : (
          <div className="space-y-2">
            {fields.map((field, index) => {
              const product = products.find((p) => p._id === watchedItems[index]?.product)
              return (
                <CompraItemRow
                  key={field.id}
                  index={index}
                  form={form}
                  productName={product?.name}
                  productSku={product?.sku}
                  productBarcode={product?.barcode}
                  productStock={product?.stock}
                  onRemove={onRemove}
                />
              )
            })}
            {form.formState.errors.items?.root && (
              <p className="text-sm text-destructive">
                {form.formState.errors.items.root.message}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EmptyState({ error }: { error?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed rounded-lg">
      <PackageSearch size={30} className="mb-2 text-muted-foreground/40" />
      <p className="text-sm text-muted-foreground">
        Buscá productos por SKU, código de barras o nombre.
      </p>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  )
}

interface CompraItemRowProps {
  index: number
  form: UseFormReturn<CompraFormValues>
  productName?: string
  productSku?: string
  productBarcode?: string
  productStock?: number
  onRemove: (index: number) => void
}

function CompraItemRow({
  index,
  form,
  productName,
  productSku,
  productBarcode,
  productStock,
  onRemove,
}: CompraItemRowProps) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-3 items-start p-3 rounded-lg border bg-muted/20">
      {/* Product info */}
      <div className="flex-1 min-w-0 pt-1">
        <p className="font-medium text-sm leading-tight">{productName ?? '—'}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          SKU: {productSku ?? '—'}
          {productBarcode ? ` · CB: ${productBarcode}` : ''}
          {` · Stock: ${productStock ?? '—'}`}
        </p>
      </div>

      {/* Quantity */}
      <FormField
        control={form.control}
        name={`items.${index}.quantity`}
        render={({ field }) => (
          <FormItem className="w-20 shrink-0">
            <FormLabel className="text-xs">Cantidad</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                placeholder="1"
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Purchase Price */}
      <FormField
        control={form.control}
        name={`items.${index}.purchasePrice`}
        render={({ field }) => (
          <FormItem className="w-28 shrink-0">
            <FormLabel className="text-xs">P. Compra</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                step="0.01"
                placeholder="—"
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Sale Price */}
      <FormField
        control={form.control}
        name={`items.${index}.salePrice`}
        render={({ field }) => (
          <FormItem className="w-28 shrink-0">
            <FormLabel className="text-xs">P. Venta</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                step="0.01"
                placeholder="—"
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Remove */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(index)}
        className="text-muted-foreground hover:text-destructive shrink-0 mt-5"
      >
        <Trash2 size={15} />
      </Button>
    </div>
  )
}
