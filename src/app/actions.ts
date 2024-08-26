"use server";
import { unsplash } from "@/lib/unsplash";

interface getPhotosParams {
  topic?: string;
  page?: number;
}

export const getTopics = async () => {
  try {
    const topics = await unsplash.topics.list({ page: 1 });

    if (topics.type === "error") {
      throw new Error(topics.errors[0]);
    }

    return topics.response.results;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw new Error("Failed to fetch topics. Please try again later.");
  }
};

export const getPhotos = async ({ topic, page = 1 }: getPhotosParams) => {
  try {
    if (!topic) {
      const photos = await unsplash.photos.getRandom({ count: 10 });
      if (photos.type === "error") {
        throw new Error(photos.errors[0]);
      }
      return Array.isArray(photos.response)
        ? photos.response
        : [photos.response];
    }

    const topicResponse = await unsplash.topics.getPhotos({
      topicIdOrSlug: topic,
      page,
      perPage: 10,
    });

    if (topicResponse.type === "error") {
      throw new Error(topicResponse.errors[0]);
    }

    return topicResponse.response?.results;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw new Error("Failed to fetch photos. Please try again later.");
  }
};
