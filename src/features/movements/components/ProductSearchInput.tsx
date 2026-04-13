import { useRef, useState } from 'react'
import { LayoutList, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useAllProducts } from '@/features/products/hooks/useAllProducts'
import type { Product } from '@/features/products/types/product.types'

interface ProductSearchInputProps {
  onAdd: (product: Product) => void
  existingIds?: string[]
}

export function ProductSearchInput({ onAdd, existingIds = [] }: ProductSearchInputProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data: products = [] } = useAllProducts()
  const inputRef = useRef<HTMLInputElement>(null)

  const q = query.trim().toLowerCase()
  const filtered = q.length > 0
    ? products.filter(
        (p) =>
          p.sku.toLowerCase().includes(q) ||
          (p.barcode?.toLowerCase().includes(q) ?? false) ||
          p.name.toLowerCase().includes(q),
      )
    : []

  const handleSelect = (product: Product) => {
    onAdd(product)
    setQuery('')
    setOpen(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSelectFromDialog = (product: Product) => {
    onAdd(product)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filtered.length === 1) {
      e.preventDefault()
      handleSelect(filtered[0])
    }
  }

  return (
    <div className="flex gap-2">
      <Popover open={open && filtered.length > 0} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (filtered.length > 0) setOpen(true)
              }}
              placeholder="Buscar por SKU o código de barras..."
              className="pl-9"
              autoComplete="off"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-120 p-0"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command shouldFilter={false}>
            <CommandList>
              <CommandEmpty>No se encontraron productos.</CommandEmpty>
              <CommandGroup>
                {filtered.map((product) => (
                  <CommandItem
                    key={product._id}
                    value={product._id}
                    onSelect={() => handleSelect(product)}
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-medium text-sm">{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        SKU: {product.sku}
                        {product.barcode ? ` · CB: ${product.barcode}` : ''}
                        {` · Stock: ${product.stock}`}
                      </span>
                    </div>
                    {existingIds.includes(product._id) && (
                      <span className="text-xs text-muted-foreground ml-3 shrink-0">
                        ya en lista
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="outline"
        onClick={() => setDialogOpen(true)}
        className="shrink-0 gap-2"
      >
        <LayoutList size={15} />
        Explorar
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg p-0 gap-0">
          <DialogHeader className="px-4 pt-4 pb-0">
            <DialogTitle>Seleccionar productos</DialogTitle>
          </DialogHeader>
          <Command className="rounded-none border-0">
            <CommandInput placeholder="Buscar por nombre, SKU o código de barras..." />
            <CommandList className="max-h-105">
              <CommandEmpty>No se encontraron productos.</CommandEmpty>
              <CommandGroup>
                {products.map((product) => {
                  const alreadyAdded = existingIds.includes(product._id)
                  return (
                    <CommandItem
                      key={product._id}
                      value={`${product.name} ${product.sku} ${product.barcode ?? ''}`}
                      onSelect={() => handleSelectFromDialog(product)}
                      className="flex items-center gap-3 py-2.5 cursor-pointer"
                    >
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-medium text-sm">{product.name}</span>
                        <span className="text-xs text-muted-foreground">
                          SKU: {product.sku}
                          {product.barcode ? ` · CB: ${product.barcode}` : ''}
                          {` · Stock: ${product.stock}`}
                        </span>
                      </div>
                      {alreadyAdded ? (
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          En lista
                        </Badge>
                      ) : null}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}
