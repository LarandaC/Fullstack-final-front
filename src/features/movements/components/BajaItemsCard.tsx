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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSearchInput } from "./ProductSearchInput";
import { EmptyItemsState } from "./items/EmptyItemsState";
import { BaseItemRow } from "./items/BaseItemRow";
import { BAJA_REASONS, BAJA_REASON_LABELS } from "../types/movement.types";
import type { BajaFormValues } from "../schemas/movement.schema";
import type { Product } from "@/features/products/types/product.types";

interface Props {
  form: UseFormReturn<BajaFormValues>;
  fields: FieldArrayWithId<BajaFormValues, "items">[];
  products: Product[];
  watchedItems: BajaFormValues["items"];
  existingProductIds: string[];
  onAdd: (product: Product) => void;
  onRemove: (index: number) => void;
}

export function BajaItemsCard({
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
                <BajaItemRow
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

interface BajaItemRowProps {
  index: number;
  form: UseFormReturn<BajaFormValues>;
  product?: Product;
  onRemove: (index: number) => void;
}

function BajaItemRow({ index, form, product, onRemove }: BajaItemRowProps) {
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

      {/* Reason */}
      <FormField
        control={form.control}
        name={`items.${index}.reason`}
        render={({ field }) => (
          <FormItem className="w-40 shrink-0">
            <FormLabel className="text-xs">Motivo</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Motivo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {BAJA_REASONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {BAJA_REASON_LABELS[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Reason detail */}
      <FormField
        control={form.control}
        name={`items.${index}.reasonDetail`}
        render={({ field }) => (
          <FormItem className="flex-1 min-w-35">
            <FormLabel className="text-xs">Detalle (opcional)</FormLabel>
            <FormControl>
              <Input placeholder="Descripción adicional..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </BaseItemRow>
  );
}
