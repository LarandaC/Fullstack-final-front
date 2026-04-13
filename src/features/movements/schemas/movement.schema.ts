import { z } from 'zod'

const compraItemSchema = z.object({
  product: z.string().min(1, 'Seleccioná un producto'),
  quantity: z.number({ error: 'Debe ser un número' }).int('Debe ser entero').min(1, 'Mínimo 1'),
  purchasePrice: z.number({ error: 'Debe ser un número' }).min(0, 'No puede ser negativo').optional(),
  salePrice: z.number({ error: 'Debe ser un número' }).min(0, 'No puede ser negativo').optional(),
})

export const compraSchema = z.object({
  items: z.array(compraItemSchema).min(1, 'Agregá al menos un producto'),
  supplier: z.string().optional(),
  notes: z.string().optional(),
})

export type CompraFormValues = z.infer<typeof compraSchema>

const bajaItemSchema = z.object({
  product: z.string().min(1, 'Seleccioná un producto'),
  quantity: z.number({ error: 'Debe ser un número' }).int('Debe ser entero').min(1, 'Mínimo 1'),
  reason: z.enum(['daño', 'vencimiento', 'descontinuado', 'otro'], {
    message: 'Seleccioná un motivo',
  }),
  reasonDetail: z.string().optional(),
})

export const bajaSchema = z.object({
  items: z.array(bajaItemSchema).min(1, 'Agregá al menos un producto'),
  notes: z.string().optional(),
})

export type BajaFormValues = z.infer<typeof bajaSchema>
