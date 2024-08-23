"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { getLuminance, toBase64 } from "@/lib/utils";
import { Shimmer } from "./icons";
import Text from "./ui/text";

export default function TopicDescription({ topic }: { topic: any }) {
  const luminance = topic?.cover_photo?.color
    ? getLuminance(topic.cover_photo.color)
    : 1;
  const textColor = luminance > 0.5 ? "text-black" : "text-white";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: topic ? "384px" : "0px" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-full"
      >
        {topic && (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute my-8 flex h-full w-full items-center justify-start overflow-hidden rounded-lg"
          >
            <div
              className="absolute inset-0 z-10 bg-gradient-to-r"
              style={{
                background: `linear-gradient(to right, ${topic.cover_photo.color}, transparent)`,
              }}
            ></div>
            <Image
              src={topic.cover_photo.urls.full}
              alt={topic.cover_photo.alt_description || ""}
              placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(800, 800))}`}
              fill
              className="h-full w-full object-cover object-center"
            />
            <div
              className={`relative z-20 flex max-w-[336px] flex-col gap-2 px-3 md:px-6 ${textColor}`}
            >
              <h3 className="text-3xl font-semibold leading-9">
                {topic.title}
              </h3>
              <Text className={textColor}>{topic.description}</Text>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
