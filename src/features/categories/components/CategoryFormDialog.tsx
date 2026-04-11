import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { categorySchema, type CategoryFormValues } from '../schemas/category.schema'
import { categoryService } from '../services/category.service'
import { CATEGORIES_QUERY_KEY } from '../hooks/useCategories'
import type { Category } from '../types/category.types'
import { FormDialog } from '@/components/shared/dialogs'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'

interface CategoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category
}

export function CategoryFormDialog({ open, onOpenChange, category }: CategoryFormDialogProps) {
  const queryClient = useQueryClient()
  const isEditing = Boolean(category)

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '' },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name ?? '',
        description: category?.description ?? '',
      })
    }
  }, [open, category, form])

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CategoryFormValues) =>
      isEditing
        ? categoryService.update(category!._id, values)
        : categoryService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
      toast.success(isEditing ? 'Categoría actualizada' : 'Categoría creada')
      onOpenChange(false)
    },
    onError: () => {
      toast.error(isEditing ? 'No se pudo actualizar la categoría' : 'No se pudo crear la categoría')
    },
  })

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? 'Editar categoría' : 'Nueva categoría'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => mutate(values))} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Electrónica" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Descripción <span className="text-muted-foreground">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción breve de la categoría" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear categoría'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </FormDialog>
  )
}
