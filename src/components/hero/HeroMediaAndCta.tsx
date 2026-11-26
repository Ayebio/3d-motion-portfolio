import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDownRight, Download, Play, Sparkles, X } from "lucide-react"

import { PROFILE } from "@/data/profile"

const WECHAT_INLINE_ATTRS = {
  "webkit-playsinline": "true",
  "x5-playsinline": "true",
  "x5-video-player-type": "h5-page",
} as Record<string, string>

export function HeroBackgroundVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const video = videoRef.current
    if (!video || mq.matches) return

    video.muted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback silently to poster image if WebView blocks autoplay
      })
    }
  }, [])

  return (
    <>
      <img
        src={PROFILE.showreel.posterSrc}
        alt="Yang Zongye 三维产品动态作品主视觉"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60 brightness-90 contrast-105"
        loading="eager"
      />
      <video
        ref={videoRef}
        src={PROFILE.showreel.previewLoopSrc}
        poster={PROFILE.showreel.posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setVideoReady(true)}
        {...WECHAT_INLINE_ATTRS}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover brightness-90 contrast-105 transition-opacity duration-700 ${
          videoReady ? "opacity-60" : "opacity-0"
        }`}
      />
    </>
  )
}

export function HeroCtaActions() {
  const [showreelOpen, setShowreelOpen] = React.useState(false)
  const { showreel, resumeHref } = PROFILE
  const activeVideoSrc = showreel.ready ? showreel.src : showreel.previewLoopSrc

  React.useEffect(() => {
    if (!showreelOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowreelOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [showreelOpen])

  return (
    <>
      <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
        <button
          type="button"
          onClick={() => setShowreelOpen(true)}
          className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-black shadow-lg outline-none hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/60 active:scale-[0.98] sm:w-auto"
        >
          <Play className="size-3.5 fill-black" aria-hidden="true" />
          观看 Showreel（{showreel.durationLabel}）
        </button>

        <a
          href={resumeHref}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-md outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50 active:scale-[0.98] sm:w-auto"
        >
          <Download className="size-4" aria-hidden="true" />
          下载简历
        </a>
      </div>

      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-label="Yang Zongye Showreel"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setShowreelOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 p-4 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">
                      {PROFILE.name} · Showreel ({showreel.durationLabel})
                    </h3>
                    {!showreel.ready && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-medium text-amber-200">
                        <Sparkles className="size-3" />
                        90s 完整版剪辑中 · 当前为静音高光预览
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-white/65">
                    {showreel.ready
                      ? "近 4 年出海智能硬件 3D 产品发布片、结构解构与 3D + AI 镜头精选混剪。"
                      : "完整 90 秒有声 Showreel 正在精剪更新中，下方可先预览核心镜头或直接浏览 9 部完整精选案例。"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowreelOpen(false)}
                  aria-label="关闭 Showreel 弹窗"
                  className="shrink-0 rounded-full border border-white/20 p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                <video
                  src={activeVideoSrc}
                  poster={showreel.posterSrc}
                  controls
                  autoPlay
                  loop={!showreel.ready}
                  muted={!showreel.ready}
                  playsInline
                  {...WECHAT_INLINE_ATTRS}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-white/60">
                  所有商业片均独立负责动画、灯光材质、渲染与合成（产品模型由 ID 部门提供）。
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="#work"
                    onClick={() => setShowreelOpen(false)}
                    className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-white/90 transition"
                  >
                    浏览完整精选案例
                    <ArrowDownRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
