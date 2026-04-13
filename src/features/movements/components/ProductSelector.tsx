import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAllProducts } from '@/features/products/hooks/useAllProducts'

interface ProductSelectorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function ProductSelector({
  value,
  onChange,
  placeholder = 'Seleccioná un producto',
  disabled = false,
}: ProductSelectorProps) {
  const [open, setOpen] = useState(false)
  const { data: products = [] } = useAllProducts()

  const selected = products.find((p) => p._id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className={cn(
            'w-full justify-between font-normal',
            !selected && 'text-muted-foreground',
          )}
        >
          <span className="truncate">
            {selected ? `${selected.name} — ${selected.sku}` : placeholder}
          </span>
          <ChevronsUpDown size={14} className="shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar por nombre o SKU..." />
          <CommandList>
            <CommandEmpty>No se encontraron productos.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product._id}
                  value={`${product.name} ${product.sku}`}
                  onSelect={() => {
                    onChange(product._id)
                    setOpen(false)
                  }}
                >
                  <Check
                    size={14}
                    className={cn('mr-2 shrink-0', value === product._id ? 'opacity-100' : 'opacity-0')}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      SKU: {product.sku} · Stock: {product.stock}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
