import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarDays, ClipboardList, PackageCheck, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { MovementTypeBadge } from './MovementTypeBadge'
import { MovementStatusBadge } from './MovementStatusBadge'
import { BAJA_REASON_LABELS } from '../types/movement.types'
import type { Movement } from '../types/movement.types'
import { formatCurrency } from '@/lib/format'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  movement: Movement | null
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  )
}

export function MovementDetailSheet({ open, onOpenChange, movement }: Props) {
  if (!movement) return null

  const isCompra = movement.type === 'compra'
  const totalItems = movement.items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0 overflow-hidden">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <MovementTypeBadge type={movement.type} />
            {!isCompra && <MovementStatusBadge status={movement.status} />}
          </div>
          <SheetTitle className="text-lg">
            {isCompra ? 'Detalle de compra' : 'Detalle de baja'}
          </SheetTitle>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
            <CalendarDays size={13} />
            <span>
              {format(new Date(movement.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {/* info */}
          <div className="px-6 pb-2">
            <div className="divide-y divide-border/60">
              <MetaRow
                label="Registrado por"
                value={
                  <span className="flex items-center gap-1.5 justify-end">
                    <User size={13} className="text-muted-foreground" />
                    {movement.createdBy?.name ?? '—'}
                  </span>
                }
              />
              {movement.approvedBy && (
                <MetaRow
                  label={movement.status === 'aprobado' ? 'Aprobado por' : 'Rechazado por'}
                  value={
                    <span className="flex items-center gap-1.5 justify-end">
                      <User size={13} className="text-muted-foreground" />
                      {movement.approvedBy.name}
                    </span>
                  }
                />
              )}
              {isCompra && movement.supplier && (
                <MetaRow label="Proveedor" value={movement.supplier} />
              )}
            </div>

            {movement.notes && (
              <div className="mt-3 rounded-lg bg-muted/50 border px-3 py-2.5">
                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                  Notas
                </p>
                <p className="text-sm">{movement.notes}</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Items */}
          <div className="px-6 pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ClipboardList size={14} className="text-muted-foreground" />
                <span className="text-sm font-semibold">Productos</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {movement.items.length} {movement.items.length === 1 ? 'ítem' : 'ítems'} · {totalItems} {totalItems === 1 ? 'unidad' : 'unidades'}
              </span>
            </div>

            <div className="space-y-2">
              {movement.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-3 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-snug">
                        {item.product?.name ?? '—'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        SKU: {item.product?.sku ?? '—'}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold tabular-nums">
                        ×{item.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.product?.unit ?? ''}
                      </p>
                    </div>
                  </div>

                  {isCompra &&
                    (item.purchasePrice !== undefined || item.salePrice !== undefined) && (
                      <div className="flex gap-3 pt-1 border-t border-border/60">
                        {item.purchasePrice !== undefined && (
                          <div className="text-xs">
                            <p className="text-muted-foreground">P. Compra</p>
                            <p className="font-semibold text-foreground tabular-nums">
                              {formatCurrency(item.purchasePrice)}
                            </p>
                          </div>
                        )}
                        {item.salePrice !== undefined && (
                          <div className="text-xs">
                            <p className="text-muted-foreground">P. Venta</p>
                            <p className="font-semibold text-foreground tabular-nums">
                              {formatCurrency(item.salePrice)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                  {/* Baja: reason */}
                  {!isCompra && item.reason && (
                    <div className="flex items-start gap-1.5 pt-1 border-t border-border/60">
                      <PackageCheck size={13} className="text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">
                          {BAJA_REASON_LABELS[item.reason]}
                        </strong>
                        {item.reasonDetail && (
                          <span> — {item.reasonDetail}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
