import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  /** Clases extra para DialogContent (ej: ancho personalizado). */
  contentClassName?: string
  children: ReactNode
}

/**
 * Wrapper genérico de Dialog para formularios.
 * Provee la estructura Dialog + header; el contenido (campos y footer)
 * va en children para que cada feature maneje su propia lógica de form.
 */
export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  contentClassName,
  children,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('max-h-[90vh] overflow-y-auto', contentClassName)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
