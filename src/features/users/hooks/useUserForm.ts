import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createUserSchema, updateUserSchema, type UserFormValues } from '../schemas/user.schema'
import { userService } from '../services/user.service'
import { USERS_QUERY_KEY } from './useUsers'
import { ROLES } from '@/lib/roles'
import type { User, UpdateUserPayload } from '../types/user.types'

interface UseUserFormOptions {
  open: boolean
  user?: User
  onSuccess: () => void
}

export function useUserForm({ open, user, onSuccess }: UseUserFormOptions) {
  const queryClient = useQueryClient()
  const isEditing = Boolean(user)

  const resolver = (
    isEditing ? zodResolver(updateUserSchema) : zodResolver(createUserSchema)
  ) as Resolver<UserFormValues>

  const form = useForm<UserFormValues>({
    resolver,
    defaultValues: { name: '', email: '', password: '', role: ROLES.INVENTARISTA },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        role: user?.role ?? ROLES.INVENTARISTA,
      })
    }
  }, [open, user, form])

  const { mutate, isPending } = useMutation({
    mutationFn: (values: UserFormValues) => {
      if (isEditing) {
        const payload: UpdateUserPayload = {
          name: values.name || undefined,
          email: values.email || undefined,
          role: values.role,
          ...(values.password ? { password: values.password } : {}),
        }
        return userService.update(user!._id, payload)
      }
      return userService.create({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
      toast.success(isEditing ? 'Usuario actualizado' : 'Usuario creado')
      onSuccess()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      const message =
        error?.response?.data?.message ??
        (isEditing ? 'Error al actualizar el usuario' : 'Error al crear el usuario')
      toast.error(message)
    },
  })

  return {
    form,
    isEditing,
    isPending,
    submit: form.handleSubmit((values) => mutate(values)),
  }
}
