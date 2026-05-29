export function getYouTubeEmbedUrl(url: string) {
  if (!url) {
    return null
  }

  try {
    const parsedUrl = new URL(url)
    const host = parsedUrl.hostname.replace(/^www\./, "")

    if (host === "youtu.be") {
      const id = parsedUrl.pathname.split("/").filter(Boolean)[0]
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsedUrl.pathname.startsWith("/embed/")) {
        const id = parsedUrl.pathname.split("/").filter(Boolean)[1]
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
      }

      const id = parsedUrl.searchParams.get("v")
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }

    return null
  } catch {
    return null
  }
}
