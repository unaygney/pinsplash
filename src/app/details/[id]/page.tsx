import React from "react";
import { redirect } from "next/navigation";
import { getPhotoWithId } from "./actions";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "@/components/icons";

import Tag from "@/components/ui/tag";
import dynamic from "next/dynamic";
import ImageContainer from "./image-container";
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
          tags={
            // @ts-ignore
            photo.tags
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

function UserDetails({ photo, name }: { photo: string; name: string }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage className="" src={photo} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <span className="text-base font-semibold leading-6 text-neutral-900">
          {name}
        </span>
      </div>

      <Button>
        Download
        <ArrowDown />
      </Button>
    </div>
  );
}

function ImageDetails({
  views,
  downloads,
  date,
  tags,
}: {
  views: number;
  downloads: number;
  date: string;
  tags: any[];
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
        {tags.map((tag, i) => {
          if (tag.type === "search") {
            return <Tag key={i}>{tag?.title}</Tag>;
          }
          return null;
        })}
      </div>
    </div>
  );
}
