import React from "react";
import { redirect } from "next/navigation";
import { getPhotoWithId } from "./actions";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

import Tag from "@/components/ui/tag";
import dynamic from "next/dynamic";
import ImageContainer from "./image-container";
import UserDetails from "./user-details";
import Link from "next/link";
const RelatedImages = dynamic(() => import("./related-images"), { ssr: false });

export default async function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  if (!id) return redirect("/");

  const photo = await getPhotoWithId(id);

  return (
    <main className="px-4 md:px-8">
      <MaxWidthWrapper className="flex h-full w-full flex-col gap-8">
        <UserDetails
          photo={photo.user.profile_image.small}
          name={photo.user.name}
          id={photo.id}
          downloadUrl={photo.links.download_location}
        />
        <ImageContainer
          width={photo.width}
          height={photo.height}
          photoUrls={photo.urls}
          alt={photo.alt_description}
          blurHash={photo.blur_hash!}
        />
        <ImageDetails
          views={photo.likes}
          downloads={
            // @ts-ignore
            photo.downloads
          }
          topics={
            // @ts-ignore
            photo.topics
          }
          date={photo.created_at}
        />
        <RelatedImages
          topic={
            // @ts-ignore
            photo?.tags?.[0]?.title ?? "nature"
          }
        />
      </MaxWidthWrapper>
    </main>
  );
}

function ImageDetails({
  views,
  downloads,
  date,
  topics,
}: {
  views: number;
  downloads: number;
  date: string;
  topics: any[];
}) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-col gap-4 md:flex-row lg:max-w-2xl">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs font-normal leading-4 text-neutral-600">
            Views
          </span>
          <span className="text-sm font-semibold leading-5 text-neutral-900">
            {views}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs font-normal leading-4 text-neutral-600">
            Date
          </span>
          <span className="text-sm font-semibold leading-5 text-neutral-900">
            {formattedDate}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs font-normal leading-4 text-neutral-600">
            Downloads
          </span>
          <span className="text-sm font-semibold leading-5 text-neutral-900">
            {downloads}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic, i) => (
          <Link key={i} href={`/?topic=${topic.slug}`}>
            <Tag>{topic.title}</Tag>
          </Link>
        ))}
      </div>
    </div>
  );
}
