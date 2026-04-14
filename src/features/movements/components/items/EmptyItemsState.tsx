import { PackageSearch } from "lucide-react";

interface Props {
  error?: string;
}

export function EmptyItemsState({ error }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed rounded-lg">
      <PackageSearch size={30} className="mb-2 text-muted-foreground/40" />
      <p className="text-sm text-muted-foreground">
        Buscá productos por SKU, código de barras o nombre.
      </p>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
