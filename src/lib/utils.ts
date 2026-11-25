import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
