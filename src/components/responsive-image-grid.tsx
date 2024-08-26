"use client";
import { determineAspectRatio, toBase64 } from "@/lib/utils";
import Image from "next/image";
import React, { useRef, useCallback } from "react";
import { EmotionSad, Shimmer } from "./icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPhotos } from "@/app/actions";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export default function ResponsiveImageGrid({ topic }: { topic?: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["photos", topic],
    queryFn: async ({ pageParam = 1 }) =>
      await getPhotos({ topic, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  function getRandomAspectRatio() {
    const ratios = ["aspect-[9/16]", "aspect-[4/3]", "aspect-square"];
    return ratios[Math.floor(Math.random() * ratios.length)];
  }

  if (isLoading)
    return (
      <div className="columns-2 gap-4 py-10 lg:columns-3 lg:py-12">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`mb-4 h-full w-full break-inside-avoid overflow-hidden rounded-lg ${getRandomAspectRatio()}`}
          />
        ))}
      </div>
    );

  if (isError)
    return (
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
    );

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <div className="columns-2 gap-4 py-10 lg:columns-3 lg:py-12">
        {data?.pages.flat().map((image: any, index: number) => {
          const aspectRatio = determineAspectRatio(image?.width, image?.height);

          if (index === data.pages.flat().length - 1) {
            return (
              <div
                ref={lastElementRef}
                key={index}
                className={`relative mb-4 break-inside-avoid overflow-hidden rounded-lg ${
                  aspectRatio === "9/16"
                    ? "aspect-[9/16]"
                    : aspectRatio === "4/3"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                }`}
              >
                <Link href={`details/${image?.id}`}>
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
          } else {
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
                <Link href={`details/${image.id}`}>
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
      {isFetchingNextPage && (
        <div className="flex w-full items-center justify-center gap-4 text-center text-neutral-400">
          <Loader2 className="animate-spin" />
          <p className="text-sm font-medium leading-5">Loading More...</p>
        </div>
      )}
    </div>
  );
}
