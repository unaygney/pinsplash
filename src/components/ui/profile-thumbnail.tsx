import { cn, toBase64 } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Shimmer } from "../icons";

export default function ProfileThumbnail({
  src,
  alt,
  className,
}: {
  src: string | undefined;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full",
        className,
      )}
    >
      <Image
        src={src ?? "/vercel.svg"}
        fill
        placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(80, 80))}`}
        alt={alt ?? "Profile image thumbnail"}
      />
    </div>
  );
}
