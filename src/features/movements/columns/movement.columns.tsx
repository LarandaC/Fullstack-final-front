import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CheckCircle2, Eye, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovementTypeBadge } from '../components/MovementTypeBadge'
import { MovementStatusBadge } from '../components/MovementStatusBadge'
import type { Movement } from '../types/movement.types'

interface MovementColumnsOptions {
  canApprove: boolean
  onView: (m: Movement) => void
  onApprove: (m: Movement) => void
  onReject: (m: Movement) => void
}

export function createMovementColumns(opts: MovementColumnsOptions): ColumnDef<Movement, unknown>[] {
  return [
    {
      accessorKey: 'type',
      header: () => <div className="text-center">Tipo</div>,
      cell: ({ getValue }) => (
        <div className="flex justify-center">
          <MovementTypeBadge type={getValue<Movement['type']>()} />
        </div>
      ),
    },
    {
      id: 'items',
      header: () => <div className="text-center">Productos</div>,
      cell: ({ row }) => {
        const count = row.original.items.length
        return (
          <span className="flex justify-center text-sm tabular-nums">
            {count} {count === 1 ? 'producto' : 'productos'}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => {
        const { type, status } = row.original
        if (type === 'compra') return <span className="flex justify-center text-xs text-muted-foreground">—</span>
        return (
          <div className="flex justify-center">
            <MovementStatusBadge status={status} />
          </div>
        )
      },
    },
    {
      id: 'supplier',
      header: () => <div className="text-center">Proveedor</div>,
      cell: ({ row }) => (
        <span className="flex justify-center text-sm text-muted-foreground">
          {row.original.supplier ?? '—'}
        </span>
      ),
    },
    {
      id: 'createdBy',
      header: () => <div className="text-center">Registrado por</div>,
      cell: ({ row }) => (
        <span className="flex justify-center text-sm">{row.original.createdBy?.name ?? '—'}</span>
      ),
    },
    {
      accessorKey: 'date',
      header: () => <div className="text-center">Fecha</div>,
      cell: ({ getValue }) => (
        <span className="flex justify-center text-sm text-muted-foreground">
          {format(new Date(getValue<string>()), 'dd MMM yyyy', { locale: es })}
        </span>
      ),
    },
    {
      id: 'acciones',
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const m = row.original
        const isPending = m.type === 'baja' && m.status === 'pendiente'
        return (
          <div className="flex items-center justify-center gap-1">
            <Button size="icon" variant="ghost" onClick={() => opts.onView(m)} title="Ver detalle">
              <Eye size={15} />
            </Button>
            {opts.canApprove && isPending && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={() => opts.onApprove(m)}
                  title="Aprobar baja"
                >
                  <CheckCircle2 size={15} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => opts.onReject(m)}
                  title="Rechazar baja"
                >
                  <XCircle size={15} />
                </Button>
              </>
            )}
          </div>
        )
      },
    },
  ]
}
