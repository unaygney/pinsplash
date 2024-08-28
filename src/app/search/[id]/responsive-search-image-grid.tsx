"use client";
import { determineAspectRatio, getInitials } from "@/lib/utils";
import Image from "next/image";
import React, { useRef, useCallback } from "react";
import { EmotionSad, Search } from "@/components/icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getSearchPhotos } from "./actions";
import { Blurhash } from "react-blurhash";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ResponsiveSearchImageGrid({
  search,
}: {
  search: string;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["photos", search],
    queryFn: async ({ pageParam = 1 }) =>
      await getSearchPhotos({ query: search, page: pageParam }),
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

  console.log("data => ", data);

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

  const results = data?.pages.flatMap((page) => page.results) || [];

  if (results.length === 0) {
    return (
      <div className="flex flex-col py-6">
        <h3 className="text-3xl font-semibold leading-9 text-neutral-900">
          {search}
        </h3>
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex w-full max-w-[272px] flex-col items-center gap-5 p-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full shadow">
              <Search className="h-6 w-6 text-indigo-700" />
            </span>
            <h1 className="text-xl font-medium leading-7 text-neutral-900">
              No results found
            </h1>
            <p className="text-base font-normal leading-6 text-neutral-900">
              Try using different keywords
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <div className="columns-2 gap-4 py-10 lg:columns-3 lg:py-12">
        {results.map((image: any, index: number) => {
          const aspectRatio = determineAspectRatio(image.width, image.height);

          if (index === results.length - 1) {
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
                <Link href={`/details/${image.id}`}>
                  <Blurhash
                    hash={image.blur_hash}
                    width="100%"
                    height="100%"
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className="absolute inset-0 h-full w-full"
                  />
                  <Image
                    src={image.urls.regular}
                    alt={image.alt_description}
                    fill
                    className="absolute inset-0 h-full w-full object-cover"
                    onLoadingComplete={(imageElement) => {
                      const blurhashElement =
                        imageElement.previousSibling as HTMLElement;
                      if (blurhashElement) {
                        blurhashElement.style.display = "none";
                      }
                    }}
                  />
                </Link>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-lg ${
                  aspectRatio === "9/16"
                    ? "aspect-[9/16]"
                    : aspectRatio === "4/3"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                }`}
              >
                <Link href={`/details/${image.id}`}>
                  <Blurhash
                    hash={image.blur_hash}
                    width="100%"
                    height="100%"
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className="absolute inset-0 h-full w-full"
                  />
                  <Image
                    src={image.urls.regular}
                    alt={image.alt_description}
                    fill
                    className="absolute inset-0 h-full w-full object-cover"
                    onLoadingComplete={(imageElement) => {
                      const blurhashElement =
                        imageElement.previousSibling as HTMLElement;
                      if (blurhashElement) {
                        blurhashElement.style.display = "none";
                      }
                    }}
                  />

                  {/* Overlay and Caption */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-2 left-2 z-10 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                className=""
                                src={image.user.profile_image.small}
                              />
                              <AvatarFallback>
                                {getInitials(image?.user?.name)}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>{image?.user?.name}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <span className="line-clamp-1 text-xs font-semibold leading-4 text-white">
                        {image?.description || image?.alt_description}
                      </span>
                    </div>
                  </div>
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
