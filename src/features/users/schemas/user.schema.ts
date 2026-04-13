import { z } from 'zod'

const roleEnum = z.enum(['admin', 'supervisor', 'inventarista', 'financiero'])

export const createUserSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresá un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: roleEnum,
})

export const updateUserSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  email: z.string().email('Ingresá un email válido').optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  role: roleEnum.optional(),
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>

export interface UserFormValues {
  name: string
  email: string
  password: string
  role: 'admin' | 'supervisor' | 'inventarista' | 'financiero'
}
