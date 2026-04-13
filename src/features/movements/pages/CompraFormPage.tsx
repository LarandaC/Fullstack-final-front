import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CompraItemsCard } from '../components/CompraItemsCard'
import { useCompraForm } from '../hooks/useCompraForm'

export default function CompraFormPage() {
  const {
    form,
    fields,
    products,
    watchedItems,
    existingProductIds,
    isPending,
    handleAddProduct,
    handleRemove,
    submit,
    cancel,
  } = useCompraForm()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={cancel}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Nueva compra</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Registrá los productos comprados. El stock se actualizará al guardar.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={submit} className="space-y-6">
          {/* Datos generales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Datos generales</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Proveedor{' '}
                      <span className="text-muted-foreground font-normal">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Distribuidora Sur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Notas{' '}
                      <span className="text-muted-foreground font-normal">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Observaciones..."
                        rows={1}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Productos */}
          <CompraItemsCard
            form={form}
            fields={fields}
            products={products}
            watchedItems={watchedItems}
            existingProductIds={existingProductIds}
            onAdd={handleAddProduct}
            onRemove={handleRemove}
          />

          {/* Footer */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={cancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Registrando...' : 'Registrar compra'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
