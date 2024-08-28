"use server";

import { unsplash } from "@/lib/unsplash";
import { redirect } from "next/navigation";

export const getPhotoWithId = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Photo not found");
    }

    const photo = await unsplash.photos.get({ photoId: id });

    if (photo.type === "error") {
      throw new Error("Photo not found");
    }

    if (!photo.response) {
      redirect("/");
    }

    return photo.response;
  } catch (error) {
    console.error("Error fetching photo by ID:", error);
    throw new Error("An unexpected error occurred while fetching the photo.");
  }
};

export const getRelatedImages = async (topic: string) => {
  try {
    const relatedImages = await unsplash.search.getPhotos({
      query: topic,
      page: 1,
    });

    if (relatedImages.type === "error") {
      throw new Error("Related images not found");
    }

    return relatedImages.response;
  } catch (error) {
    console.error("Error fetching related images:", error);
    throw new Error(
      "An unexpected error occurred while fetching related images.",
    );
  }
};

export const updateDownloadCount = async (
  url: string,
  width: string,
  height: string,
) => {
  const updateCount = await unsplash.photos.trackDownload({
    downloadLocation: url,
  });

  let downloadImageUrl = updateCount.response?.url;

  if (downloadImageUrl) {
    downloadImageUrl = `${downloadImageUrl}&w=${width}&h=${height}&fit=crop`;
  }

  return downloadImageUrl;
};
