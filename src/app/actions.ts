"use server";
import { unsplash } from "@/lib/unsplash";

interface getPhotosParams {
  topic?: string;
  page?: number;
}

export const getTopics = async () => {
  const topics = await unsplash.topics.list({ page: 1 });

  if (topics.type === "error") {
    return [];
  }

  return topics.response.results;
};
export const getPhotos = async ({ topic, page = 1 }: getPhotosParams) => {
  console.log("topic", topic);
  if (!topic) {
    const photos = await unsplash.photos.getRandom({ count: 10 });
    return Array.isArray(photos.response) ? photos.response : [photos.response];
  }

  const topicResponse = await unsplash.topics.getPhotos({
    topicIdOrSlug: topic,
    page,
    perPage: 10,
  });

  return topicResponse.response?.results;
};
