const MEDIA_BASE_URL = (import.meta.env.PUBLIC_MEDIA_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") || ""

/**
 * Resolves a local asset path (e.g. "/videos/work-01.mp4") against PUBLIC_MEDIA_BASE_URL when configured,
 * allowing seamless migration from local public/ assets to Cloudflare R2 / OSS / COS CDN without editing project entries.
 */
export function resolveMediaUrl(path: string): string {
  if (!MEDIA_BASE_URL || /^https?:\/\//i.test(path)) {
    return path
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${MEDIA_BASE_URL}${normalizedPath}`
}
