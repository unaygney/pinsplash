import dynamic from "next/dynamic";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { unsplash } from "@/lib/unsplash";
const ResponsiveImageGrid = dynamic(
  () => import("@/components/responsive-image-grid"),
  { ssr: false },
);
const TopicList = dynamic(() => import("@/components/topics-list"), {
  ssr: false,
});
const TopicDescription = dynamic(
  () => import("@/components/topic-description"),
  { ssr: false },
);

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { topic: param } = searchParams;
  const topic = await unsplash.topics.get({ topicIdOrSlug: param as string });

  return (
    <main className="px-4 md:px-8">
      <MaxWidthWrapper className="flex h-full w-full flex-col">
        <TopicList />
        {topic && <TopicDescription topic={topic.response} />}
        <ResponsiveImageGrid
          topic={Array.isArray(param) ? param[0] : (param ?? undefined)}
        />
      </MaxWidthWrapper>
    </main>
  );
}
