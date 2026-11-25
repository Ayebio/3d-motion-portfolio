import * as React from "react"
import { AlertCircle, ExternalLink, Loader2, Play, RotateCcw, Tv } from "lucide-react"

import { getBilibiliEmbedUrl } from "@/lib/video"

interface VideoPlayerProps {
  title: string
  videoSrc?: string
  posterUrl: string
  bilibiliUrl?: string
  youtubeUrl?: string
}

type PlayerMode = "cover" | "native" | "bilibili" | "error"

const LOAD_TIMEOUT_MS = 10000
const SLOW_HINT_MS = 3500

export function VideoPlayer({
  title,
  videoSrc,
  posterUrl,
  bilibiliUrl,
  youtubeUrl,
}: VideoPlayerProps) {
  const bilibiliEmbedUrl = React.useMemo(
    () => getBilibiliEmbedUrl(bilibiliUrl),
    [bilibiliUrl]
  )

  const [mode, setMode] = React.useState<PlayerMode>("cover")
  const [isBuffering, setIsBuffering] = React.useState(false)
  const [isSlowLoading, setIsSlowLoading] = React.useState(false)
  const [fallbackReason, setFallbackReason] = React.useState<string | null>(null)
  const [retryKey, setRetryKey] = React.useState(0)

  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const hasLoadedRef = React.useRef(false)

  // Reset state if navigating between projects with View Transitions
  React.useEffect(() => {
    setMode("cover")
    setIsBuffering(false)
    setIsSlowLoading(false)
    setFallbackReason(null)
    hasLoadedRef.current = false
  }, [videoSrc, bilibiliUrl])

  const triggerFallbackOrError = React.useCallback(
    (reason: string) => {
      setIsBuffering(false)
      setIsSlowLoading(false)
      setFallbackReason(reason)
      if (bilibiliEmbedUrl) {
        setMode("bilibili")
      } else {
        setMode("error")
      }
    },
    [bilibiliEmbedUrl]
  )

  // Timeout protection for mobile / WeChat networks where <video> stalls silently at 0:00
  React.useEffect(() => {
    if (mode !== "native") return

    hasLoadedRef.current = false
    setIsBuffering(true)
    setIsSlowLoading(false)

    const slowTimer = window.setTimeout(() => {
      if (!hasLoadedRef.current) {
        setIsSlowLoading(true)
      }
    }, SLOW_HINT_MS)

    const timeoutTimer = window.setTimeout(() => {
      const video = videoRef.current
      if (!hasLoadedRef.current && (!video || video.readyState < 1)) {
        triggerFallbackOrError("直连视频加载超时")
      }
    }, LOAD_TIMEOUT_MS)

    return () => {
      window.clearTimeout(slowTimer)
      window.clearTimeout(timeoutTimer)
    }
  }, [mode, retryKey, triggerFallbackOrError])

  // Attempt playback when native <video> mounts (compatible with WeChat WeixinJSBridgeReady)
  React.useEffect(() => {
    if (mode !== "native") return
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Autoplay blocked by mobile browser policy — keep native controls visible so user can tap play
        })
      }
    }

    tryPlay()

    const onWeixinReady = () => tryPlay()
    document.addEventListener("WeixinJSBridgeReady", onWeixinReady, false)
    return () => {
      document.removeEventListener("WeixinJSBridgeReady", onWeixinReady, false)
    }
  }, [mode, retryKey])

  const handleStartPlay = () => {
    setFallbackReason(null)
    if (videoSrc) {
      setMode("native")
      setRetryKey((k) => k + 1)
    } else if (bilibiliEmbedUrl) {
      setMode("bilibili")
    } else {
      setMode("error")
    }
  }

  const handleRetryNative = () => {
    if (!videoSrc) return
    setFallbackReason(null)
    setMode("native")
    setRetryKey((k) => k + 1)
  }

  const handleSwitchToBilibili = () => {
    if (!bilibiliEmbedUrl) return
    setIsBuffering(false)
    setIsSlowLoading(false)
    setFallbackReason(null)
    setMode("bilibili")
  }

  const handleVideoReady = () => {
    hasLoadedRef.current = true
    setIsBuffering(false)
    setIsSlowLoading(false)
  }

  const handleVideoError = () => {
    triggerFallbackOrError("直连视频加载失败")
  }

  // Non-standard attributes required by iOS Safari & WeChat Android X5/XWeb browsers
  const mobileVideoAttrs = {
    "webkit-playsinline": "true",
    "x5-playsinline": "true",
    "x5-video-player-type": "h5-page",
    "x5-video-player-fullscreen": "false",
    "x-webkit-airplay": "allow",
  } as Record<string, string>

  const canPlayAnything = Boolean(videoSrc || bilibiliEmbedUrl)

  return (
    <div className="space-y-2.5">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/80 bg-black shadow-2xl">
        {/* 1. Cover state: clean poster + custom centered play button */}
        {mode === "cover" && (
          <div className="relative h-full w-full">
            <img
              src={posterUrl}
              alt={title}
              className="h-full w-full object-cover"
              loading="eager"
            />
            {canPlayAnything && (
              <button
                type="button"
                onClick={handleStartPlay}
                aria-label={`播放视频：${title}`}
                className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black/25 transition-colors duration-300 hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white/60 group-hover:bg-primary group-hover:text-primary-foreground group-active:scale-95 sm:size-20">
                  <Play
                    className="ml-1 size-7 fill-current sm:size-8"
                    aria-hidden="true"
                  />
                </span>

                <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-medium tracking-wide text-white/85 backdrop-blur-md">
                  点击播放
                </span>
              </button>
            )}
          </div>
        )}

        {/* 2. Native HTML5 video state */}
        {mode === "native" && videoSrc && (
          <div className="relative h-full w-full bg-black">
            <video
              key={retryKey}
              ref={videoRef}
              src={videoSrc}
              poster={posterUrl}
              controls
              autoPlay
              playsInline
              preload="auto"
              controlsList="nodownload"
              onLoadedMetadata={handleVideoReady}
              onLoadedData={handleVideoReady}
              onCanPlay={handleVideoReady}
              onPlaying={handleVideoReady}
              onWaiting={() => setIsBuffering(true)}
              onError={handleVideoError}
              className="h-full w-full bg-black object-contain"
              {...mobileVideoAttrs}
            >
              您的浏览器不支持 HTML5 视频播放。
            </video>

            {isBuffering && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 px-4 text-center backdrop-blur-[2px]">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-medium text-white shadow-lg">
                  <Loader2 className="size-4 animate-spin text-primary" aria-hidden="true" />
                  <span>视频缓冲中…</span>
                </div>

                {isSlowLoading && bilibiliEmbedUrl && (
                  <button
                    type="button"
                    onClick={handleSwitchToBilibili}
                    className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/25 active:scale-95"
                  >
                    <Tv className="size-3.5" aria-hidden="true" />
                    加载较慢？切换 Bilibili 线路
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. Bilibili embed fallback state */}
        {mode === "bilibili" && bilibiliEmbedUrl && (
          <iframe
            src={bilibiliEmbedUrl}
            title={`${title} - Bilibili 播放器`}
            className="h-full w-full border-0 bg-black"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="no-referrer"
          />
        )}

        {/* 4. Error fallback state (when no Bilibili embed is available) */}
        {mode === "error" && (
          <div className="relative flex h-full w-full items-center justify-center">
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[2px]"
            />
            <div className="relative z-10 flex max-w-sm flex-col items-center gap-3 rounded-xl border border-white/15 bg-black/75 px-6 py-5 text-center backdrop-blur-md">
              <AlertCircle className="size-7 text-amber-400" aria-hidden="true" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  {fallbackReason || "视频暂时无法播放"}
                </p>
                <p className="text-xs text-white/70">
                  当前网络环境加载直连视频受限，可重试或使用备用线路观看。
                </p>
              </div>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                {videoSrc && (
                  <button
                    type="button"
                    onClick={handleRetryNative}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-white/90 active:scale-95"
                  >
                    <RotateCcw className="size-3.5" aria-hidden="true" />
                    重试播放
                  </button>
                )}
                {bilibiliUrl && (
                  <a
                    href={bilibiliUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
                  >
                    去 Bilibili 观看
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                )}
                {youtubeUrl && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
                  >
                    去 YouTube 观看
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle status & quick-switch bar when auto-switched to Bilibili */}
      {mode === "bilibili" && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 bg-card/80 px-3.5 py-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Tv className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            {fallbackReason
              ? `${fallbackReason}，已自动切换至 Bilibili 线路`
              : "当前正在使用 Bilibili 备用线路播放"}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {videoSrc && (
              <button
                type="button"
                onClick={handleRetryNative}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/70 px-2.5 py-1 font-medium text-foreground transition hover:bg-secondary active:scale-95"
              >
                <RotateCcw className="size-3" aria-hidden="true" />
                重试直连
              </button>
            )}
            {bilibiliUrl && (
              <a
                href={bilibiliUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/70 px-2.5 py-1 font-medium text-foreground transition hover:bg-secondary"
              >
                打开 B 站原页
                <ExternalLink className="size-3 text-muted-foreground" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
