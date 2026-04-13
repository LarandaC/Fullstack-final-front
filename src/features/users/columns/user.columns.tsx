import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ActionsColumn } from '@/components/shared/columns'
import { Badge } from '@/components/ui/badge'
import { ROLE_LABELS, type UserRole } from '@/lib/roles'
import type { User } from '../types/user.types'

const roleBadgeClass: Record<UserRole, string> = {
  admin:
    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  supervisor:
    'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  financiero:
    'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  inventarista:
    'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
}

interface UserColumnsOptions {
  canEdit: boolean
  canDelete: boolean
}

export function createUserColumns(
  onEdit: (user: User) => void,
  onDelete: (user: User) => void,
  options: UserColumnsOptions,
): ColumnDef<User, unknown>[] {
  return [
    {
      accessorKey: 'name',
      header: () => <div className="text-center">Nombre</div>,
      cell: ({ getValue }) => (
        <span className="font-medium flex justify-center">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'email',
      header: () => <div className="text-center">Email</div>,
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground flex justify-center">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: 'role',
      header: () => <div className="text-center">Rol</div>,
      cell: ({ getValue }) => {
        const role = getValue<UserRole>()
        return (
          <div className="flex justify-center">
            <Badge variant="outline" className={roleBadgeClass[role]}>
              {ROLE_LABELS[role]}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className="text-center">Creado</div>,
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground flex justify-center">
          {format(new Date(getValue<string>()), 'dd MMM yyyy', { locale: es })}
        </span>
      ),
    },
    {
      id: 'acciones',
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <ActionsColumn
            showView={false}
            showEdit={options.canEdit}
            showDelete={options.canDelete}
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
          />
        </div>
      ),
    },
  ]
}
