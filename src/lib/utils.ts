import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/"
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base
  const cleanPath = path.startsWith("/") ? path.slice(1) : path
  return `${cleanBase}/${cleanPath}`
}
