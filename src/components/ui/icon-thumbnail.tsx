import { cn } from "@/lib/utils";
import React from "react";

export default function IconThumbnail({
  className,
  children,
}: {
  className?: string;
  children: React.ReactElement<SVGElement>;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow",
        className,
      )}
    >
      {children}
    </span>
  );
}
