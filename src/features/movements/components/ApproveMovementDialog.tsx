import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { movementService } from '../services/movement.service'
import { MOVEMENTS_QUERY_KEY } from '../hooks/useMovements'
import { PRODUCTS_QUERY_KEY } from '@/features/products/hooks/useProducts'
import type { Movement } from '../types/movement.types'
import { ConfirmDialog } from '@/components/shared/dialogs'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  movement: Movement | null
}

export function ApproveMovementDialog({ open, onOpenChange, movement }: Props) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => movementService.approveBaja(movement!._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MOVEMENTS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
      toast.success('Baja aprobada. El stock fue descontado.')
      onOpenChange(false)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message ?? 'Error al aprobar la baja')
    },
  })

  const itemCount = movement?.items.length ?? 0

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Aprobar baja?"
      description={
        <>
          Estás por aprobar una baja de{' '}
          <strong>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</strong>.
          Al confirmar se descontará el stock correspondiente. Esta acción no se puede deshacer.
        </>
      }
      onConfirm={() => mutate()}
      isPending={isPending}
      confirmLabel="Aprobar baja"
      variant="default"
    />
  )
}
