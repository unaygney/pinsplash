"use client";

import { EmotionSad } from "@/components/icons";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
            We&apos;re facing some issues at the moment. Please try again later
            or contact support at{" "}
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
