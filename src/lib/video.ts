export function getBilibiliEmbedUrl(url?: string) {
  if (!url) {
    return null
  }

  try {
    const trimmed = url.trim()
    if (/^BV[0-9A-Za-z]+$/i.test(trimmed)) {
      return `https://player.bilibili.com/player.html?bvid=${trimmed}&page=1&high_quality=1&danmaku=0&autoplay=0`
    }

    const parsedUrl = new URL(trimmed)
    const host = parsedUrl.hostname.replace(/^www\./, "")

    if (host === "bilibili.com" || host === "m.bilibili.com") {
      const match = parsedUrl.pathname.match(/\/video\/(BV[0-9A-Za-z]+)/i)
      if (match && match[1]) {
        return `https://player.bilibili.com/player.html?bvid=${match[1]}&page=1&high_quality=1&danmaku=0&autoplay=0`
      }
    }

    return null
  } catch {
    return null
  }
}

export function getYouTubeEmbedUrl(url?: string) {
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

