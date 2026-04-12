import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface PriceFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
}

function formatNumber(value: number): string {
  if (!value && value !== 0) return ''
  return new Intl.NumberFormat('es-PY', { maximumFractionDigits: 0 }).format(value)
}

function parseNumber(raw: string): number {
  const cleaned = raw.replace(/\./g, '').replace(/,/g, '').trim()
  const parsed = Number(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export function PriceField<T extends FieldValues>({ form, name, label }: PriceFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={formatNumber(field.value as number)}
              onChange={(e) => field.onChange(parseNumber(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
