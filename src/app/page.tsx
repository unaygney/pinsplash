import dynamic from "next/dynamic";
const TopicList = dynamic(() => import("@/components/topics-list"), {
  ssr: false,
});
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { unsplash } from "@/lib/unsplash";
import ResponsiveImageGrid from "@/components/responsive-image-grid";

export default async function Home() {
  return (
    <main className="px-4 md:px-8">
      <MaxWidthWrapper className="h-full w-full">
        <TopicList />
        {/* <ResponsiveImageGrid images={photos.response} /> */}
      </MaxWidthWrapper>
    </main>
  );
}
