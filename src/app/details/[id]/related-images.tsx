"use client";
import { determineAspectRatio, toBase64 } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { EmotionSad, Shimmer } from "@/components/icons";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getRelatedImages } from "./actions";

export default function RelatedImages({ topic }: { topic: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos", topic],
    queryFn: async () => await getRelatedImages(topic),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  function getRandomAspectRatio() {
    const ratios = ["aspect-[9/16]", "aspect-[4/3]", "aspect-square"];
    return ratios[Math.floor(Math.random() * ratios.length)];
  }

  if (isLoading)
    return (
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold leading-8 text-neutral-900">
          Related images
        </h2>
        <div className="columns-2 gap-4 py-10 lg:columns-3 lg:py-12">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className={`mb-4 h-full w-full break-inside-avoid overflow-hidden rounded-lg ${getRandomAspectRatio()}`}
            />
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-8 text-neutral-900">
          Related images
        </h2>
        <div className="flex h-screen items-center justify-center">
          <div className="flex w-full max-w-[272px] flex-col items-center gap-5 p-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full shadow">
              <EmotionSad />
            </span>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-medium leading-7 text-neutral-900">
                Unexpected error
              </h1>
              <p className="text-base font-normal leading-6 text-neutral-900">
                We&apos;re facing some issues at the moment. Please try again
                later or contact support at{" "}
                <Link
                  className="text-indigo-700"
                  href="mailto:support@codepulse.com"
                >
                  support@codepulse.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold leading-8 text-neutral-900">
        Related images
      </h2>
      <div className="flex flex-col gap-6 md:gap-12">
        <div className="columns-2 gap-4 py-10 lg:columns-3 lg:py-12">
          {data?.results.map((image: any, index: number) => {
            const aspectRatio = determineAspectRatio(image.width, image.height);
            {
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
                  <Link href={`${image.id}`}>
                    <Image
                      src={image.urls.regular}
                      alt={image.alt_description}
                      fill
                      className="absolute inset-0 h-full w-full object-cover"
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        Shimmer(3000, 3000),
                      )}`}
                    />
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
