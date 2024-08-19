"use client";
import React, { useEffect, useState } from "react";
import Pilltab from "./ui/pill-tab";
import { getTopics } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { motion, AnimatePresence } from "framer-motion";

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
