"use server";
import { unsplash } from "@/lib/unsplash";

export const getTopics = async () => {
  const topics = await unsplash.topics.list({ page: 1 });


  if (topics.type === "error") {
    return [];
  }

  return topics.response.results;
};
