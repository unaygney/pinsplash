"use client";

import { cn, determineAspectRatio } from "@/lib/utils";
import { Blurhash } from "react-blurhash";
import Image from "next/image";

interface PhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export default function ImageContainer({
  photoUrls,
  width,
  height,
  alt,
  blurHash,
}: {
  photoUrls: PhotoUrls;
  width: number;
  height: number;
  alt: string | null;
  blurHash: string;
}) {
  const aspectRatio = determineAspectRatio(width, height);
  const objectFitStyle =
    aspectRatio === "9/16" ? "object-contain" : "object-cover";

  return (
    <div className="relative h-[155px] w-full overflow-hidden rounded-[2.26px] md:h-[317px] lg:h-[548px]">
      <Blurhash
        hash={blurHash}
        width={"100%"}
        height={"100%"}
        resolutionX={32}
        resolutionY={32}
        punch={1}
        className="absolute inset-0 h-full w-full"
      />
      <Image
        src={photoUrls.small}
        fill
        alt={alt ?? "image"}
        className={cn("md:hidden", objectFitStyle)}
        onLoadingComplete={(imageElement) => {
          // Blurhash görüntüsünü gizle
          const blurhashElement = imageElement.previousSibling as HTMLElement;
          if (blurhashElement) {
            blurhashElement.style.display = "none";
          }
        }}
      />
      <Image
        src={photoUrls.regular}
        fill
        alt={alt ?? "image"}
        className={cn("hidden md:block lg:hidden", objectFitStyle)}
        onLoadingComplete={(imageElement) => {
          const blurhashElement = imageElement.previousSibling as HTMLElement;
          if (blurhashElement) {
            blurhashElement.style.display = "none";
          }
        }}
      />
      <Image
        src={photoUrls.full}
        fill
        alt={alt ?? "image"}
        className={cn("hidden lg:block", objectFitStyle)}
        onLoadingComplete={(imageElement) => {
          const blurhashElement = imageElement.previousSibling as HTMLElement;
          if (blurhashElement) {
            blurhashElement.style.display = "none";
          }
        }}
      />
    </div>
  );
}
