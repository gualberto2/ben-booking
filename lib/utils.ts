import { type ClassValue, clsx } from "clsx";
import { Library } from "@googlemaps/js-api-loader";
import { twMerge } from "tailwind-merge";

export const libs: Library[] = ["core", "maps", "places", "marker"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
