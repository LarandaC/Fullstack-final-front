import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userService } from '../services/user.service'
import { USERS_QUERY_KEY } from '../hooks/useUsers'
import type { User } from '../types/user.types'
import { ROLE_LABELS } from '@/lib/roles'
import { ConfirmDialog } from '@/components/shared/dialogs'

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

export function DeleteUserDialog({ open, onOpenChange, user }: DeleteUserDialogProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => userService.remove(user!._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
      toast.success('Usuario eliminado correctamente')
      onOpenChange(false)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      const message = error?.response?.data?.message ?? 'Error al eliminar el usuario'
      toast.error(message)
      onOpenChange(false)
    },
  })

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Eliminar usuario?"
      description={
        <>
          Estás por eliminar a{' '}
          <strong>{user?.name}</strong>
          {user?.role && (
            <>
              {' '}({ROLE_LABELS[user.role]})
            </>
          )}
          . Esta acción no se puede deshacer.
        </>
      }
      onConfirm={() => mutate()}
      isPending={isPending}
      confirmLabel="Eliminar"
    />
  )
}
