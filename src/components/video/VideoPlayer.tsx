import * as React from "react"
import { Play, ExternalLink, Globe, Tv, Sparkles, CheckCircle2 } from "lucide-react"
import { getYouTubeEmbedUrl } from "@/lib/video"

interface VideoPlayerProps {
  title: string
  videoUrl: string
  bilibiliUrl?: string
  videoSrc?: string
  posterUrl: string
}

export function VideoPlayer({ title, videoUrl, bilibiliUrl, videoSrc, posterUrl }: VideoPlayerProps) {
  const youtubeEmbedUrl = React.useMemo(() => getYouTubeEmbedUrl(videoUrl), [videoUrl])
  const directBilibiliUrl = bilibiliUrl || "https://space.bilibili.com/20890448"

  const [playerMode, setPlayerMode] = React.useState<"native" | "youtube">("native")

  return (
    <div className="space-y-3">
      {/* Route Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 rounded-lg bg-secondary/80 p-1 border border-border/70 text-xs">
          <button
            type="button"
            onClick={() => setPlayerMode("native")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              playerMode === "native"
                ? "bg-card text-foreground shadow-sm font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="size-3.5 text-primary" />
            1080P 原生直接播放
          </button>

          <button
            type="button"
            onClick={() => setPlayerMode("youtube")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              playerMode === "youtube"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-3.5 text-red-500" />
            YouTube 4K
          </button>
        </div>

        <a
          href={directBilibiliUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-400 hover:text-sky-300 transition"
        >
          <Tv className="size-3" />
          在 Bilibili 打开原片
          <ExternalLink className="size-2.5" />
        </a>
      </div>

      {/* Main Video Display Screen */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-border/80 shadow-2xl">
        {/* Mode 1: Native HTML5 High-Performance Video Player */}
        {playerMode === "native" && (
          videoSrc ? (
            <video
              src={videoSrc}
              controls
              playsInline
              preload="metadata"
              poster={posterUrl}
              className="h-full w-full object-contain bg-black"
            >
              您的浏览器不支持 HTML5 视频播放。
            </video>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              视频准备中...
            </div>
          )
        )}

        {/* Mode 2: YouTube 4K Embed */}
        {playerMode === "youtube" && (
          youtubeEmbedUrl ? (
            <iframe
              src={`${youtubeEmbedUrl}?autoplay=1`}
              title={`${title} YouTube 播放器`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              暂无 YouTube 视频源
            </div>
          )
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground/80 px-1">
        <span className="flex items-center gap-1 text-emerald-400">
          <CheckCircle2 className="size-3" />
          原生 1080P 高清视频 · 极速分段秒开 · 无广告无黑屏
        </span>
        <div className="flex items-center gap-3">
          <a
            href={directBilibiliUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground inline-flex items-center gap-1"
          >
            B站 原片
            <ExternalLink className="size-2.5" />
          </a>
          <span>·</span>
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground inline-flex items-center gap-1"
          >
            YouTube
            <ExternalLink className="size-2.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
