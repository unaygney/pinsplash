"use server";

import { unsplash } from "@/lib/unsplash";

export const getSearchPhotos = async ({
  query,
  page = 1,
}: {
  query: string;
  page: number;
}) => {
  try {
    if (!query) return { status: false, message: "No query provided" };

    const photos = await unsplash.search.getPhotos({ query, page });

    if (photos.type === "error") {
      return { status: false, message: photos.errors[0] };
    }

    if (!photos.response) {
      return { status: false, message: "Try using different keywords" };
    }

    return { status: true, results: photos.response.results };
  } catch (error) {
    console.error("Error fetching search photos:", error);
    return {
      status: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};
