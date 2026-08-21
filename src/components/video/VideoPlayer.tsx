import * as React from "react"
import { Play, ExternalLink, Globe, Tv, Sparkles, ShieldCheck } from "lucide-react"
import { getBilibiliEmbedUrl, getYouTubeEmbedUrl } from "@/lib/video"

interface VideoPlayerProps {
  title: string
  videoUrl: string
  bilibiliUrl?: string
  posterUrl: string
}

export function VideoPlayer({ title, videoUrl, bilibiliUrl, posterUrl }: VideoPlayerProps) {
  const youtubeEmbedUrl = React.useMemo(() => getYouTubeEmbedUrl(videoUrl), [videoUrl])
  const bilibiliEmbedUrl = React.useMemo(() => getBilibiliEmbedUrl(bilibiliUrl), [bilibiliUrl])

  const [playerSource, setPlayerSource] = React.useState<"bilibili" | "youtube">("bilibili")
  const [embedMode, setEmbedMode] = React.useState(false)

  const directBilibiliUrl = bilibiliUrl || "https://space.bilibili.com/20890448"

  return (
    <div className="space-y-3">
      {/* Route Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 rounded-lg bg-secondary/80 p-1 border border-border/70 text-xs">
          <button
            type="button"
            onClick={() => {
              setPlayerSource("bilibili")
              setEmbedMode(false)
            }}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              playerSource === "bilibili"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Tv className="size-3.5 text-sky-400" />
            Bilibili 国内路线
          </button>

          <button
            type="button"
            onClick={() => {
              setPlayerSource("youtube")
              setEmbedMode(true)
            }}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              playerSource === "youtube"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-3.5 text-red-500" />
            YouTube 4K 内嵌
          </button>
        </div>

        <span className="hidden sm:inline-block text-[11px] text-muted-foreground">
          {playerSource === "bilibili" ? "国内直连 1080P 超清" : "海外 4K 超清内嵌"}
        </span>
      </div>

      {/* Main Video Display */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-border/80 shadow-2xl">
        {/* Bilibili Route: High-Res Interactive Player Card (Prevents Bilibili third-party hotlink block error) */}
        {playerSource === "bilibili" && !embedMode && (
          <div className="relative h-full w-full overflow-hidden group">
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 backdrop-blur-[1px]" />

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-between p-6 text-center sm:p-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 px-3 py-1 text-[11px] font-medium text-sky-300 border border-sky-500/30 backdrop-blur-md">
                  <Sparkles className="size-3" />
                  Bilibili 官方高清路线
                </span>
                <span className="rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-mono text-white/80 border border-white/10 backdrop-blur-md">
                  1080P 30FPS
                </span>
              </div>

              <div className="space-y-3 max-w-lg">
                <a
                  href={directBilibiliUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex items-center gap-2.5 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/25 hover:bg-sky-400 hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="size-4 fill-white" />
                  在 Bilibili 播放高清原片
                  <ExternalLink className="size-3.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
                <p className="text-xs text-white/70">
                  国内免梯子秒开 · 官方原生 1080P 满帧画质
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-white/60">
                <button
                  type="button"
                  onClick={() => setEmbedMode(true)}
                  className="underline underline-offset-4 hover:text-white transition"
                >
                  尝试在当前页内嵌播放
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setPlayerSource("youtube")}
                  className="underline underline-offset-4 hover:text-white transition"
                >
                  切换至 YouTube 4K
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bilibili In-Page Embed (if user chooses to try) */}
        {playerSource === "bilibili" && embedMode && (
          bilibiliEmbedUrl ? (
            <iframe
              src={bilibiliEmbedUrl}
              title={`${title} Bilibili 播放器`}
              className="h-full w-full border-0"
              referrerPolicy="no-referrer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              未配置 Bilibili 链接
            </div>
          )
        )}

        {/* YouTube 4K Embed */}
        {playerSource === "youtube" && (
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
        <span className="flex items-center gap-1">
          <ShieldCheck className="size-3 text-emerald-400" />
          全项目均已关联 B站 专属原片，随时一键直达
        </span>
        <a
          href={directBilibiliUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground inline-flex items-center gap-1 underline underline-offset-2"
        >
          打开 B站 视频原站
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}
