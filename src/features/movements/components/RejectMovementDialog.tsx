import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { movementService } from '../services/movement.service'
import { MOVEMENTS_QUERY_KEY } from '../hooks/useMovements'
import type { Movement } from '../types/movement.types'
import { ConfirmDialog } from '@/components/shared/dialogs'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  movement: Movement | null
}

export function RejectMovementDialog({ open, onOpenChange, movement }: Props) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => movementService.rejectBaja(movement!._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MOVEMENTS_QUERY_KEY] })
      toast.success('Baja rechazada.')
      onOpenChange(false)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message ?? 'Error al rechazar la baja')
      onOpenChange(false)
    },
  })

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Rechazar baja?"
      description="El movimiento quedará como rechazado y no se modificará el stock. Esta acción no se puede deshacer."
      onConfirm={() => mutate()}
      isPending={isPending}
      confirmLabel="Rechazar baja"
      variant="destructive"
    />
  )
}
