import { z } from 'zod'

export const movementSchema = z.object({
  type: z.enum(['entrada', 'salida'], { message: 'Tipo requerido' }),
  quantity: z.coerce.number().min(1, 'Mínimo 1 unidad'),
  product: z.string().min(1, 'El producto es requerido'),
  supplier: z.string().optional(),
  reason: z.string().optional(),
  date: z.string().optional(),
})

export type MovementFormValues = z.infer<typeof movementSchema>
