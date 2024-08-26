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
  toleranValue = 0.3,
): keyof typeof aspectRatios => {
  const ratio = width / height;
  const tolerance = toleranValue;
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
export function getLuminance(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
  );
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
export function getInitials(name?: string) {
  if (!name) return "UN";

  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0][0]?.toUpperCase() || "UN";
  }
  return (
    `${nameParts[0][0]?.toUpperCase() || ""}${nameParts[1][0]?.toUpperCase() || ""}` ||
    "UN"
  );
}
