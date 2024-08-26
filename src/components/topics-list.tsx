"use client";
import React, { useEffect, useState, useRef } from "react";
import { Pilltab, PilltabSkeleton } from "./ui/pill-tab";
import { getTopics } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { useDraggable } from "react-use-draggable-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { EmotionSad } from "./icons";
import Link from "next/link";

export default function TopicList() {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const [isScrollable, setIsScrollable] = useState(true);
  const {
    data: topics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => await getTopics(),
  });

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const isAtEnd =
          ref.current.scrollWidth - ref.current.scrollLeft ===
          ref.current.clientWidth;
        setIsScrollable(!isAtEnd);
      }
    };

    const currentRef = ref.current;
    currentRef?.addEventListener("scroll", handleScroll);

    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, []);

  if (isError) {
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
  }

  if (isLoading) {
    return (
      <div className="relative w-full">
        <div
          className="no-scrollbar relative flex w-full gap-3 overflow-x-scroll rounded-full py-2"
          ref={ref}
          {...events}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <PilltabSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        className="no-scrollbar relative flex w-full gap-3 overflow-x-scroll rounded-full py-2"
        ref={ref}
        {...events}
      >
        {topics?.map((topic) => (
          <Pilltab
            key={topic.id}
            title={topic.title}
            imageUrl={topic?.cover_photo?.urls.thumb}
            slug={topic.slug}
          />
        ))}
      </div>

      <AnimatePresence>
        {isScrollable && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pointer-events-none absolute right-0 top-0 h-full w-[112px] bg-gradient-to-l from-white to-transparent"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
