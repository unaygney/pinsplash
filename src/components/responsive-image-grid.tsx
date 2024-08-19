"use client";
import { determineAspectRatio, toBase64 } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Shimmer } from "./icons";

export default function ResponsiveImageGrid({ images }: any) {
  return (
    <div className="columns-2 gap-4 py-10 lg:columns-3 lg:py-12">
      {images.map((image: any, index: number) => {
        const aspectRatio = determineAspectRatio(image.width, image.height);

        return (
          <div
            key={index}
            className={`relative mb-4 break-inside-avoid overflow-hidden rounded-lg ${
              aspectRatio === "9/16"
                ? "aspect-[9/16]"
                : aspectRatio === "4/3"
                  ? "aspect-[4/3]"
                  : "aspect-square"
            }`}
          >
            <Image
              src={image.urls.regular}
              alt={image.alt_description}
              fill
              className="absolute inset-0 h-full w-full object-cover"
              placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(3000, 3000))}`}
            />
          </div>
        );
      })}
    </div>
  );
}
