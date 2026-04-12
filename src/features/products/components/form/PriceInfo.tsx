import type { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IVA_VALUES } from '../../schemas/product.schema'
import type { ProductFormValues } from '../../schemas/product.schema'
import { PriceField } from '@/components/shared/fields/PriceField'


interface PriceInfoProps {
  form: UseFormReturn<ProductFormValues>
}

export function PriceInfo({ form }: PriceInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Precios</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <PriceField form={form} name="purchasePrice" label="Precio de compra" />
          <PriceField form={form} name="salePrice" label="Precio de venta" />
        </div>

        <FormField
          control={form.control}
          name="iva"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IVA</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar IVA" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {IVA_VALUES.map((iva) => (
                    <SelectItem key={iva} value={String(iva)}>
                      {iva}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
