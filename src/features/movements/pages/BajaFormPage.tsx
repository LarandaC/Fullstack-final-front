import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { BajaItemsCard } from '../components/BajaItemsCard'
import { useBajaForm } from '../hooks/useBajaForm'

export default function BajaFormPage() {
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
  } = useBajaForm()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={cancel}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Nueva baja</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            El movimiento quedará pendiente hasta ser aprobado por un administrador.
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
        El stock <strong>no se descuenta</strong> hasta que el administrador apruebe la baja.
      </div>

      <Form {...form}>
        <form onSubmit={submit} className="space-y-6">
          {/* Datos generales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Datos generales</CardTitle>
            </CardHeader>
            <CardContent>
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
                        placeholder="Contexto adicional sobre la baja..."
                        rows={2}
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
          <BajaItemsCard
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
              {isPending ? 'Enviando...' : 'Enviar para aprobación'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
