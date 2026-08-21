import * as React from "react"
import { Play, ExternalLink, Globe, Tv } from "lucide-react"
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

  // Default to Bilibili if available, otherwise fallback intelligently
  const [playerSource, setPlayerSource] = React.useState<"bilibili" | "youtube">(
    bilibiliEmbedUrl ? "bilibili" : "youtube"
  )

  const [hasStartedPlaying, setHasStartedPlaying] = React.useState(false)

  return (
    <div className="space-y-3">
      {/* Route Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 rounded-lg bg-secondary/80 p-1 border border-border/70 text-xs">
          <button
            type="button"
            onClick={() => {
              setPlayerSource("bilibili")
              setHasStartedPlaying(true)
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
              setHasStartedPlaying(true)
            }}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              playerSource === "youtube"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-3.5 text-red-500" />
            YouTube 路线
          </button>
        </div>

        <span className="hidden sm:inline-block text-[11px] text-muted-foreground">
          {playerSource === "bilibili" ? "国内直连流畅播放" : "海外 4K 超清源"}
        </span>
      </div>

      {/* Main Video Screen */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-border/80 shadow-2xl">
        {/* Cover / Poster with Click-to-Play to avoid eager iframe network blocking */}
        {!hasStartedPlaying && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition hover:bg-black/30" />

            <button
              type="button"
              onClick={() => setHasStartedPlaying(true)}
              aria-label="点击播放视频"
              className="group relative z-20 flex flex-col items-center gap-3 active:scale-95 transition-transform"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-white text-black shadow-2xl transition duration-300 group-hover:scale-110">
                <Play className="ml-1 size-7 fill-black" />
              </span>
              <span className="rounded-full bg-black/70 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md border border-white/20 shadow-lg">
                点击载入并播放视频 ({playerSource === "bilibili" ? "B站源" : "YouTube源"})
              </span>
            </button>
          </div>
        )}

        {/* Video Iframes */}
        {hasStartedPlaying && playerSource === "bilibili" && (
          bilibiliEmbedUrl ? (
            <iframe
              src={`${bilibiliEmbedUrl}&autoplay=1`}
              title={`${title} Bilibili 播放器`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <Tv className="size-12 text-sky-400 mb-3 opacity-80" />
              <p className="text-sm font-medium text-foreground">暂未配置此项目的 Bilibili 专属嵌入链接</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-md">
                你可以在项目数据中填入 B站 BV号或视频链接，或直接点击下方在 Bilibili / YouTube 观看。
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/30 px-4 py-2 text-xs font-medium hover:bg-sky-500/25 transition"
                >
                  去 Bilibili 搜索原片
                  <ExternalLink className="size-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setPlayerSource("youtube")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary/80 transition"
                >
                  切换至 YouTube 播放
                </button>
              </div>
            </div>
          )
        )}

        {hasStartedPlaying && playerSource === "youtube" && (
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

      {/* Notice for network */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground/80 px-1">
        <span>国内若遇 YouTube 加载慢，点击上方可随时切换为 Bilibili</span>
        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground inline-flex items-center gap-1 underline underline-offset-2"
        >
          在 YouTube 原站打开
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}
