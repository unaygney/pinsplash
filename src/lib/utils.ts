import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const determineAspectRatio = (
  width: number,
  height: number,
): keyof typeof aspectRatios => {
  const ratio = width / height;
  const tolerance = 0.3;
  const aspectRatios: Record<string, number> = {
    "9/16": 9 / 16,
    "4/3": 4 / 3,
    "1/1": 1 / 1,
  };

  if (Math.abs(ratio - aspectRatios["1/1"]) <= tolerance) {
    return "1/1";
  }

  const closestAspectRatio = (
    Object.keys(aspectRatios) as Array<keyof typeof aspectRatios>
  ).reduce((prev, curr) => {
    return Math.abs(ratio - aspectRatios[curr]) <
      Math.abs(ratio - aspectRatios[prev])
      ? curr
      : prev;
  }, "1/1");

  return closestAspectRatio;
};
