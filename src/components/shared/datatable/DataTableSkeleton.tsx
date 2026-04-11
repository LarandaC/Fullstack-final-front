import { TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableSkeletonProps {
  rows: number
  cols: number
}

/** Renderiza filas fantasma mientras los datos cargan. SRP: solo loading UI. */
export function DataTableSkeleton({ rows, cols }: DataTableSkeletonProps) {
  return Array.from({ length: rows }, (_, rowIndex) => (
    <TableRow key={rowIndex} className="hover:bg-transparent">
      {Array.from({ length: cols }, (_, colIndex) => (
        <TableCell key={colIndex} className="py-3">
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ))
}
