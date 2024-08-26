import { redirect } from "next/navigation";
import React from "react";
import ResponsiveSearchImageGrid from "./responsive-search-image-grid";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) return redirect("/");

  let decodedId = decodeURIComponent(id);

  return (
    <main className="px-4 md:px-8">
      <MaxWidthWrapper className="flex h-full w-full flex-col">
        <ResponsiveSearchImageGrid search={decodedId} />
      </MaxWidthWrapper>
    </main>
  );
}
