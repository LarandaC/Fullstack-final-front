import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/shared/datatable'
import { usePermissions } from '@/features/auth/hooks/usePermissions'
import { useMovements } from '../hooks/useMovements'
import { createMovementColumns } from '../columns/movement.columns'
import { MovementDetailSheet } from '../components/MovementDetailSheet'
import { ApproveMovementDialog } from '../components/ApproveMovementDialog'
import { RejectMovementDialog } from '../components/RejectMovementDialog'
import type { Movement, MovementType } from '../types/movement.types'

type FilterTab = 'todos' | MovementType

export default function MovementsPage() {
  const navigate = useNavigate()
  const { data: movements = [], isFetching } = useMovements()
  const { role } = usePermissions()

  const isAdmin = role === 'admin'
  const isFinanciero = role === 'financiero'
  const isSupervisor = role === 'supervisor'

  const [tab, setTab] = useState<FilterTab>('todos')
  const [detailTarget, setDetailTarget] = useState<Movement | null>(null)
  const [approveTarget, setApproveTarget] = useState<Movement | null>(null)
  const [rejectTarget, setRejectTarget] = useState<Movement | null>(null)

  const filtered = useMemo(
    () => (tab === 'todos' ? movements : movements.filter((m) => m.type === tab)),
    [movements, tab],
  )

  const handleView = useCallback((m: Movement) => setDetailTarget(m), [])
  const handleApprove = useCallback((m: Movement) => setApproveTarget(m), [])
  const handleReject = useCallback((m: Movement) => setRejectTarget(m), [])

  const columns = useMemo(
    () => createMovementColumns({ canApprove: isAdmin, onView: handleView, onApprove: handleApprove, onReject: handleReject }),
    [isAdmin, handleView, handleApprove, handleReject],
  )

  const pendingBajas = movements.filter((m) => m.type === 'baja' && m.status === 'pendiente').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Movimientos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Historial de compras y bajas de inventario.
          </p>
        </div>
        <div className="flex gap-2">
          {(isAdmin || isFinanciero) && (
            <Button onClick={() => navigate('/movements/compra/new')}>
              <ShoppingCart size={15} />
              Nueva compra
            </Button>
          )}
          {(isAdmin || isSupervisor) && (
            <Button variant="outline" onClick={() => navigate('/movements/baja/new')}>
              <Trash2 size={15} />
              Nueva baja
            </Button>
          )}
        </div>
      </div>

      {isAdmin && pendingBajas > 0 && (
        <div
          className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400 cursor-pointer"
          onClick={() => setTab('baja')}
        >
          <span className="font-semibold">{pendingBajas} baja{pendingBajas > 1 ? 's' : ''} pendiente{pendingBajas > 1 ? 's' : ''} de aprobación.</span>
          <span className="underline">Ver bajas</span>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
        <TabsList>
          <TabsTrigger value="todos">
            Todos <span className="ml-1.5 text-xs text-muted-foreground">({movements.length})</span>
          </TabsTrigger>
          <TabsTrigger value="compra">
            Compras <span className="ml-1.5 text-xs text-muted-foreground">({movements.filter((m) => m.type === 'compra').length})</span>
          </TabsTrigger>
          <TabsTrigger value="baja">
            Bajas <span className="ml-1.5 text-xs text-muted-foreground">({movements.filter((m) => m.type === 'baja').length})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <DataTable
        columns={columns}
        data={filtered}
        pageCount={1}
        pagination={{ pageIndex: 0, pageSize: 50 }}
        onPaginationChange={() => {}}
        isLoading={isFetching}
        emptyMessage="No hay movimientos registrados."
      />

      <MovementDetailSheet
        open={detailTarget !== null}
        onOpenChange={(open) => { if (!open) setDetailTarget(null) }}
        movement={detailTarget}
      />
      <ApproveMovementDialog
        open={approveTarget !== null}
        onOpenChange={(open) => { if (!open) setApproveTarget(null) }}
        movement={approveTarget}
      />
      <RejectMovementDialog
        open={rejectTarget !== null}
        onOpenChange={(open) => { if (!open) setRejectTarget(null) }}
        movement={rejectTarget}
      />
    </div>
  )
}
