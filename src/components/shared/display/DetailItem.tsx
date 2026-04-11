import React from "react";
import { Badge } from "@/components/ui/badge";

interface DetailItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  highlight?: boolean;
  isBadge?: boolean;
  badgeVariant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "green"
    | "purple"
    | "blue"
    | "red"
    | "yellow"
    | "green-outline"
    | "purple-outline"
    | "blue-outline"
    | "red-outline"
    | "yellow-outline";
  className?: string;
  align?: "left" | "center";
  size?: "sm" | "lg";
}

export default function DetailItem({
  label,
  value,
  icon,
  highlight = false,
  isBadge = false,
  badgeVariant = "purple-outline",
  className = "",
  align = "center",
  size = "sm",
}: DetailItemProps) {
  const isLeft = align === "left";
  const isLarge = size === "lg";

  return (
    <div
      className={`space-y-1.5 flex flex-col ${isLeft ? "items-start text-left" : "items-center text-center"} ${className}`}
    >
      <div
        className={`flex flex-col ${isLeft ? "items-start" : "items-center"} gap-1.5`}
      >
        {icon && (
          <div className="p-1 rounded-md bg-muted text-muted-foreground/70">
            {icon}
          </div>
        )}
        <p
          className={`${isLarge ? "text-sm" : "text-[11px]"} font-black text-muted-foreground/50 uppercase tracking-[0.15em]`}
        >
          {label}
        </p>
      </div>

      {isBadge ? (
        <Badge
          variant={badgeVariant}
          className={`${isLarge ? "px-3 py-1 h-7 text-base" : "px-2 py-2 h-5 text-sm"} font-bold`}
        >
          {value}
        </Badge>
      ) : (
        <p
          className={`${
            highlight
              ? isLarge
                ? "font-mono text-primary font-bold text-3xl"
                : "font-mono text-primary font-bold text-base"
              : isLarge
                ? "font-black text-foreground text-2xl"
                : "font-semibold text-foreground/90 text-sm"
          } truncate`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
