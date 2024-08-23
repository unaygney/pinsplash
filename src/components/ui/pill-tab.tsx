"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileThumbnail from "./profile-thumbnail";
import Text from "./text";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
export function Pilltab({
  title,
  imageUrl,
  slug,
}: {
  title: string;
  imageUrl: string | undefined;
  slug: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTopic = searchParams.get("topic");

  const handleClick = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("topic", slug);
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={false}
      animate={{
        backgroundColor: selectedTopic === slug ? "#EBF4FF" : "#F3F4F6",
        color: selectedTopic === slug ? "#1F2937" : "#4B5563",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="flex min-w-fit flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-full py-1 pl-1 pr-3"
    >
      <ProfileThumbnail src={imageUrl} />
      <Text
        className={cn("font-medium text-current", {
          "font-semibold": selectedTopic === slug,
        })}
      >
        {title}
      </Text>
    </motion.button>
  );
}
export function PilltabSkeleton() {
  return (
    <div className="flex h-full w-24 min-w-fit flex-shrink-0 items-center gap-3 rounded-full">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-10 w-24 rounded-full" />
    </div>
  );
}
