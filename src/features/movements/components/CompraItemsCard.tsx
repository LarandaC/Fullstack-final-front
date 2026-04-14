import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductSearchInput } from "./ProductSearchInput";
import { EmptyItemsState } from "./items/EmptyItemsState";
import { BaseItemRow } from "./items/BaseItemRow";
import type { CompraFormValues } from "../schemas/movement.schema";
import type { Product } from "@/features/products/types/product.types";

interface Props {
  form: UseFormReturn<CompraFormValues>;
  fields: FieldArrayWithId<CompraFormValues, "items">[];
  products: Product[];
  watchedItems: CompraFormValues["items"];
  existingProductIds: string[];
  onAdd: (product: Product) => void;
  onRemove: (index: number) => void;
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
          <EmptyItemsState error={form.formState.errors.items?.root?.message} />
        ) : (
          <div className="space-y-2">
            {fields.map((field, index) => {
              const product = products.find(
                (p) => p._id === watchedItems[index]?.product,
              );
              return (
                <CompraItemRow
                  key={field.id}
                  index={index}
                  form={form}
                  product={product}
                  onRemove={onRemove}
                />
              );
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
  );
}

interface CompraItemRowProps {
  index: number;
  form: UseFormReturn<CompraFormValues>;
  product?: Product;
  onRemove: (index: number) => void;
}

function CompraItemRow({ index, form, product, onRemove }: CompraItemRowProps) {
  return (
    <BaseItemRow
      productName={product?.name}
      productSku={product?.sku}
      productBarcode={product?.barcode}
      productStock={product?.stock}
      onRemove={() => onRemove(index)}
    >
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
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : e.target.valueAsNumber,
                  )
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
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : e.target.valueAsNumber,
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </BaseItemRow>
  );
}
