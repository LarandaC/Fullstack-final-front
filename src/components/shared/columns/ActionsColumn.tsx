import { Eye, Pen, Trash } from "lucide-react";
import type { ReactNode } from "react";

interface ActionsColumnProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

export const ActionsColumn = ({
  onEdit,
  onView,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
}: ActionsColumnProps): ReactNode => {
  return (
    <div className="flex gap-2 items-center">
      {showView && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
          className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer p-2 rounded-md"
          title="Ver"
          aria-label="Ver"
        >
          <Eye size={16} />
        </button>
      )}

      {showEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="text-color-blue hover:text-color-blue hover:bg-color-blue-subtle transition-all duration-200 cursor-pointer p-2 rounded-md"
          title="Editar"
          aria-label="Editar"
        >
          <Pen size={16} />
        </button>
      )}

      {showDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="text-color-red hover:text-color-red hover:bg-color-red-subtle transition-all duration-200 cursor-pointer p-2 rounded-md"
          title="Eliminar"
          aria-label="Eliminar"
        >
          <Trash size={16} />
        </button>
      )}
    </div>
  );
};
