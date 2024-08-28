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
    aspectRatio === "9/16" || "1/1" ? "object-contain" : "object-cover";

  const getOptimizedImageUrl = (
    url: string,
    options: {
      w?: number;
      h?: number;
      fit?: string;
      fm?: string;
      q?: number;
      dpr?: number;
    } = {},
  ) => {
    const params = new URLSearchParams({
      ...(options.w && { w: options.w.toString() }),
      ...(options.h && { h: options.h.toString() }),
      ...(options.fit && { fit: options.fit }),
      ...(options.fm && { fm: options.fm }),
      ...(options.q && { q: options.q.toString() }),
      ...(options.dpr && { dpr: options.dpr.toString() }),
      auto: "format",
    });
    return `${url}?${params.toString()}`;
  };

  const optimizedImageUrl = getOptimizedImageUrl(photoUrls.raw, {
    w: width * 0.8,
    h: height * 0.8,
    fit: "cover",
    fm: "jpg",
    q: 80,
    dpr: 2,
  });

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
        src={optimizedImageUrl}
        alt={alt ?? "image"}
        fill
        priority={true}
        className={cn(
          "transition-all duration-300 ease-in-out",
          objectFitStyle,
        )}
        onLoad={(event) => {
          const imageElement = event.target as HTMLImageElement;
          const blurhashElement = imageElement.previousSibling as HTMLElement;
          if (blurhashElement) {
            blurhashElement.style.display = "none";
          }
        }}
      />
    </div>
  );
}
