import dynamic from "next/dynamic";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { unsplash } from "@/lib/unsplash";
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
      <MaxWidthWrapper className="h-full w-full">
        <TopicList />
        <TopicDescription topic={topic.response} />
      </MaxWidthWrapper>
    </main>
  );
}
