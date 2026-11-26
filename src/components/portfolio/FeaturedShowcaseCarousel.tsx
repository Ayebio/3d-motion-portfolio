import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, Pause, Play, X } from "lucide-react"

import type { PortfolioProject } from "@/data/projects"

interface FeaturedShowcaseCarouselProps {
  projects: PortfolioProject[]
}

const AUTOPLAY_MS = 6000
const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function getImageSource(project: PortfolioProject, imageIndex = 0) {
  const image = project.images[imageIndex] || project.images[0]
  return typeof image.src === "string" ? image.src : image.src.src
}

export function FeaturedShowcaseCarousel({ projects }: FeaturedShowcaseCarouselProps) {
  const total = projects.length

  // 3x cloned track enables true seamless infinite looping in both directions
  const loopedProjects = React.useMemo(
    () => (total > 1 ? [...projects, ...projects, ...projects] : projects),
    [projects, total]
  )

  const [virtualIndex, setVirtualIndex] = React.useState(() => (total > 1 ? total : 0))
  const [instantSnap, setInstantSnap] = React.useState(false)
  const [isPlayingAuto, setIsPlayingAuto] = React.useState(true)
  const [isHovered, setIsHovered] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const [stageWidth, setStageWidth] = React.useState(1200)
  const [playingSlug, setPlayingSlug] = React.useState<string | null>(null)
  const [posterGalleryProject, setPosterGalleryProject] = React.useState<PortfolioProject | null>(null)
  const [posterIndex, setPosterIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [dragOffset, setDragOffset] = React.useState(0)

  const stageRef = React.useRef<HTMLDivElement>(null)
  const dragStartX = React.useRef<number | null>(null)
  const isDraggingRef = React.useRef(false)
  const elapsedRef = React.useRef(0)

  const activeIndex = total > 0 ? ((virtualIndex % total) + total) % total : 0
  const isInlineMediaActive = Boolean(playingSlug || posterGalleryProject)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => {
      setReducedMotion(mq.matches)
      if (mq.matches) setIsPlayingAuto(false)
    }
    syncMotion()
    mq.addEventListener("change", syncMotion)
    return () => mq.removeEventListener("change", syncMotion)
  }, [])

  React.useEffect(() => {
    const node = stageRef.current
    if (!node) return
    const updateWidth = () => setStageWidth(node.clientWidth)
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Re-enable smooth transitions right after an invisible loop-boundary snap paints
  React.useEffect(() => {
    if (!instantSnap) return
    let raf1 = 0
    let raf2 = 0
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        setInstantSnap(false)
      })
    })
    return () => {
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
    }
  }, [instantSnap])

  const stepBy = React.useCallback(
    (delta: number) => {
      if (total <= 1 || delta === 0) return
      setPlayingSlug(null)
      setPosterGalleryProject(null)
      elapsedRef.current = 0
      setProgress(0)
      setInstantSnap(false)
      setVirtualIndex((prev) => {
        const next = prev + delta
        if (next < 1 || next > 3 * total - 2) {
          const normalized = total + (((next % total) + total) % total)
          return normalized
        }
        return next
      })
    },
    [total]
  )

  const goNext = React.useCallback(() => stepBy(1), [stepBy])
  const goPrev = React.useCallback(() => stepBy(-1), [stepBy])

  const goToRealIndex = React.useCallback(
    (targetRealIndex: number) => {
      if (total <= 1) return
      let delta = targetRealIndex - activeIndex
      if (delta > total / 2) delta -= total
      if (delta < -total / 2) delta += total
      if (delta !== 0) {
        stepBy(delta)
      }
    },
    [activeIndex, total, stepBy]
  )

  const handleTrackAnimationComplete = React.useCallback(() => {
    if (total <= 1 || instantSnap || dragOffset !== 0) return
    if (virtualIndex < total || virtualIndex >= 2 * total) {
      const centeredIndex = total + (((virtualIndex % total) + total) % total)
      setInstantSnap(true)
      setVirtualIndex(centeredIndex)
    }
  }, [total, instantSnap, dragOffset, virtualIndex])

  React.useEffect(() => {
    const shouldTick = isPlayingAuto && !isHovered && !isInlineMediaActive && !reducedMotion && total > 1
    if (!shouldTick) return

    let rafId = 0
    let lastTimestamp = performance.now()

    const tick = (now: number) => {
      const delta = now - lastTimestamp
      lastTimestamp = now
      elapsedRef.current += delta

      if (elapsedRef.current >= AUTOPLAY_MS) {
        elapsedRef.current = 0
        setProgress(0)
        setInstantSnap(false)
        setVirtualIndex((prev) => prev + 1)
        return
      }

      setProgress(Math.min(1, elapsedRef.current / AUTOPLAY_MS))
      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(rafId)
  }, [virtualIndex, isPlayingAuto, isHovered, isInlineMediaActive, reducedMotion, total])

  React.useEffect(() => {
    if (!isInlineMediaActive) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPlayingSlug(null)
        setPosterGalleryProject(null)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isInlineMediaActive])

  if (total === 0) {
    return null
  }

  const isCompact = stageWidth < 640
  const gap = isCompact ? 14 : 32
  const slideWidth = isCompact
    ? Math.max(280, Math.round(stageWidth * 0.88))
    : Math.min(900, Math.round(stageWidth * 0.68))
  const sideMargin = (stageWidth - slideWidth) / 2
  const trackOffset = sideMargin - virtualIndex * (slideWidth + gap) + dragOffset

  const navEdgeOffset = Math.max(16, Math.round(sideMargin - 68))

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (playingSlug) return
    if ((event.target as HTMLElement).closest("a, button, video")) return
    dragStartX.current = event.clientX
    isDraggingRef.current = false
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const delta = event.clientX - dragStartX.current
    if (Math.abs(delta) > 6) {
      isDraggingRef.current = true
    }
    setDragOffset(delta * 0.45)
  }

  const finishDrag = (clientX?: number) => {
    if (dragStartX.current === null) return
    const delta = clientX !== undefined ? clientX - dragStartX.current : 0
    dragStartX.current = null
    setDragOffset(0)
    if (Math.abs(delta) > 48) {
      if (delta < 0) {
        goNext()
      } else {
        goPrev()
      }
    }
    window.setTimeout(() => {
      isDraggingRef.current = false
    }, 80)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      goNext()
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      goPrev()
    }
  }

  const handleActivateMedia = (project: PortfolioProject) => {
    if (isDraggingRef.current) return
    if (project.videoSrc) {
      setPlayingSlug(project.slug)
    } else {
      setPosterIndex(0)
      setPosterGalleryProject(project)
    }
  }

  const activeProject = projects[activeIndex]

  return (
    <>
      <div
        className="space-y-5 sm:space-y-7"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          if (dragStartX.current !== null) finishDrag()
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="精选作品轮播"
      >
        {/* Minimal Editorial Counter Row (strictly single-line on mobile) */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            <span className="shrink-0 whitespace-nowrap font-mono text-xs font-medium tracking-wider text-muted-foreground tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-5 shrink-0 bg-border sm:w-8" aria-hidden="true" />
            <span className="min-w-0 truncate text-xs font-medium text-foreground/90">
              {activeProject.title}
            </span>
          </div>

          <a
            href={`/projects/${activeProject.slug}`}
            className="inline-flex shrink-0 whitespace-nowrap items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            查看项目详情
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Full-bleed Apple Cinema Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(e) => finishDrag(e.clientX)}
          onPointerCancel={() => finishDrag()}
          className="relative w-full overflow-hidden py-2 sm:py-3 select-none"
        >
          {/* Desktop Left / Right Flanking Buttons (hidden on mobile so nothing overlaps 16:9 media or text) */}
          <button
            type="button"
            onClick={goPrev}
            style={{ left: `${navEdgeOffset}px` }}
            aria-label="上一部精选作品"
            className="hidden sm:flex absolute top-1/2 z-30 size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/85 text-foreground shadow-lg backdrop-blur-2xl transition duration-300 hover:scale-105 hover:bg-secondary active:scale-95 dark:border-white/15 dark:bg-black/65 dark:text-white dark:hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            style={{ right: `${navEdgeOffset}px` }}
            aria-label="下一部精选作品"
            className="hidden sm:flex absolute top-1/2 z-30 size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/85 text-foreground shadow-lg backdrop-blur-2xl transition duration-300 hover:scale-105 hover:bg-secondary active:scale-95 dark:border-white/15 dark:bg-black/65 dark:text-white dark:hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="size-5" />
          </button>

          <motion.div
            className="flex items-stretch sm:items-center will-change-transform"
            style={{ gap: `${gap}px` }}
            animate={{ x: trackOffset }}
            transition={
              instantSnap || dragOffset !== 0
                ? { duration: 0 }
                : reducedMotion
                ? { duration: 0.2 }
                : { duration: 0.82, ease: APPLE_EASE }
            }
            onAnimationComplete={handleTrackAnimationComplete}
          >
            {loopedProjects.map((project, index) => {
              const isActive = index === virtualIndex
              const distance = Math.abs(index - virtualIndex)
              const isThisPlaying = isActive && playingSlug === project.slug && Boolean(project.videoSrc)

              return (
                <motion.article
                  key={`${Math.floor(index / total)}-${project.slug}`}
                  style={{ width: `${slideWidth}px` }}
                  animate={{
                    scale: isActive ? 1 : isCompact ? 0.95 : 0.925,
                    opacity: isActive ? 1 : distance === 1 ? 0.48 : 0.2,
                  }}
                  transition={instantSnap ? { duration: 0 } : { duration: 0.78, ease: APPLE_EASE }}
                  className="relative shrink-0"
                >
                  {isCompact ? (
                    /* MOBILE-ONLY SPLIT CARD: Clean unobstructed 16:9 video/cover on top + legible info card below */
                    <div
                      className={`group relative overflow-hidden rounded-[20px] border bg-card transition-shadow duration-500 ${
                        isActive
                          ? "border-border/80 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)] dark:border-white/15"
                          : "border-border/40 shadow-none"
                      }`}
                    >
                      {isThisPlaying ? (
                        <div className="relative aspect-[16/9] w-full bg-black">
                          <video
                            src={project.videoSrc}
                            poster={getImageSource(project)}
                            controls
                            autoPlay
                            playsInline
                            className="h-full w-full bg-black object-contain"
                          >
                            您的浏览器不支持 HTML5 视频播放。
                          </video>
                          <button
                            type="button"
                            onClick={() => setPlayingSlug(null)}
                            aria-label="退出播放"
                            className="absolute right-2.5 top-2.5 z-20 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/75 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md active:scale-95"
                          >
                            <X className="size-3" />
                            退出
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => (isActive ? handleActivateMedia(project) : stepBy(index - virtualIndex))}
                          aria-label={
                            isActive
                              ? project.videoSrc
                                ? `原地播放 ${project.title}`
                                : `查看大图 ${project.title}`
                              : `切换到 ${project.title}`
                          }
                          className="relative block aspect-[16/9] w-full overflow-hidden bg-neutral-950 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <img
                            src={getImageSource(project)}
                            alt={project.images[0].alt}
                            draggable={false}
                            className="h-full w-full object-cover"
                            loading={distance <= 1 ? "eager" : "lazy"}
                            decoding="async"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/25" />

                          {/* Compact top metadata pills only — zero bottom overlay clutter */}
                          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                            <span className="rounded-full border border-white/20 bg-black/55 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                              {project.category}
                            </span>
                            <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur-md">
                              {project.dateLabel || project.year}
                            </span>
                          </div>

                          {/* Centered unobstructed Play/Expand button */}
                          {isActive && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                              <span className="flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/92 text-black shadow-xl backdrop-blur-md">
                                {project.videoSrc ? (
                                  <Play className="ml-0.5 size-5 fill-black" aria-hidden="true" />
                                ) : (
                                  <Expand className="size-4" aria-hidden="true" />
                                )}
                              </span>
                            </div>
                          )}
                        </button>
                      )}

                      {/* Dedicated mobile footer info area — zero overlap with image or play button */}
                      <div className="p-4">
                        <p className="truncate text-[11px] font-medium text-muted-foreground">
                          {project.client || "商业合作项目"}
                          {project.deliverables ? ` · ${project.deliverables}` : ""}
                        </p>
                        <h3 className="mt-1 truncate text-base font-semibold tracking-tight text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>

                        <div className="mt-3.5 flex items-center justify-between border-t border-border/60 pt-3">
                          <span className="text-xs font-medium text-muted-foreground">
                            {project.role}
                          </span>
                          <a
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            查看详情
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* DESKTOP APPLE CINEMA CARD — untouched */
                    <div
                      className={`group relative overflow-hidden rounded-[24px] border bg-neutral-950 transition-shadow duration-700 ${
                        isActive
                          ? "border-border/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] dark:border-white/15 dark:shadow-[0_36px_100px_-24px_rgba(0,0,0,0.9)]"
                          : "border-border/40 shadow-none"
                      }`}
                    >
                      {isThisPlaying ? (
                        <div className="relative aspect-[16/9] w-full bg-black">
                          <video
                            src={project.videoSrc}
                            poster={getImageSource(project)}
                            controls
                            autoPlay
                            playsInline
                            className="h-full w-full bg-black object-contain"
                          >
                            您的浏览器不支持 HTML5 视频播放。
                          </video>
                          <button
                            type="button"
                            onClick={() => setPlayingSlug(null)}
                            aria-label="退出播放"
                            className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/90 active:scale-95"
                          >
                            <X className="size-3.5" />
                            退出播放
                          </button>
                        </div>
                      ) : isActive ? (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleActivateMedia(project)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              handleActivateMedia(project)
                            }
                          }}
                          aria-label={project.videoSrc ? `原地播放 ${project.title}` : `查看大图 ${project.title}`}
                          className="relative block aspect-[16/9] w-full cursor-pointer overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                          <img
                            src={getImageSource(project)}
                            alt={project.images[0].alt}
                            draggable={false}
                            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                            loading={distance <= 1 ? "eager" : "lazy"}
                            decoding="async"
                          />

                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.04)_36%,rgba(0,0,0,0.72)_76%,rgba(0,0,0,0.92)_100%)]" />

                          <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                                {project.role}
                              </span>
                              <span className="rounded-full border border-white/15 bg-white/12 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                                {project.category}
                              </span>
                            </div>
                            <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[11px] text-white/85 backdrop-blur-md">
                              {project.dateLabel || project.year}
                            </span>
                          </div>

                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-white/90 text-black shadow-2xl backdrop-blur-md transition duration-500 ease-out group-hover:scale-110">
                              {project.videoSrc ? (
                                <Play className="ml-0.5 size-6 fill-black" aria-hidden="true" />
                              ) : (
                                <Expand className="size-5" aria-hidden="true" />
                              )}
                            </span>
                          </div>

                          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-8">
                            <div className="max-w-xl">
                              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
                                {project.client || "商业合作项目"}
                                {project.deliverables ? ` · ${project.deliverables}` : ""}
                              </p>
                              <h3 className="mt-1.5 text-3xl font-semibold tracking-tight text-white">
                                {project.title}
                              </h3>
                              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                                {project.description}
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center">
                              <a
                                href={`/projects/${project.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                              >
                                查看详情
                                <ArrowUpRight className="size-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => stepBy(index - virtualIndex)}
                          aria-label={`切换到 ${project.title}`}
                          className="relative block aspect-[16/9] w-full cursor-pointer overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <img
                            src={getImageSource(project)}
                            alt={project.images[0].alt}
                            draggable={false}
                            className="h-full w-full object-cover"
                            loading={distance <= 2 ? "eager" : "lazy"}
                            decoding="async"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-black/35 transition duration-500 hover:bg-black/20" />
                          <div className="absolute inset-x-5 bottom-5">
                            <p className="truncate text-lg font-semibold text-white/90">
                              {project.title}
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </motion.article>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Dock: Mobile includes compact Prev/Next alongside dots; Desktop keeps pure Apple Pill + Play/Pause */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="上一部精选作品"
            className="flex sm:hidden size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card/85 text-foreground shadow-sm backdrop-blur-2xl active:scale-95 dark:border-white/12 dark:bg-white/[0.08]"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/80 bg-card/85 px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm backdrop-blur-2xl dark:border-white/12 dark:bg-white/[0.08]"
            role="tablist"
            aria-label="选择精选作品幻灯片"
          >
            {projects.map((project, index) => {
              const isActive = index === activeIndex
              return (
                <motion.button
                  key={project.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`第 ${index + 1} 项：${project.title}`}
                  onClick={() => goToRealIndex(index)}
                  animate={{
                    width: isActive ? (isCompact ? 32 : 46) : isCompact ? 6 : 8,
                  }}
                  transition={
                    reducedMotion
                      ? { duration: 0.15 }
                      : { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }
                  }
                  className={`relative h-1.5 sm:h-2 overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "bg-foreground/15 dark:bg-white/20"
                      : "bg-foreground/25 hover:bg-foreground/50 dark:bg-white/30 dark:hover:bg-white/60 transition-colors duration-300"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 origin-left rounded-full bg-foreground dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.55)] will-change-transform"
                      style={{
                        transform: `scaleX(${
                          isInlineMediaActive || !isPlayingAuto || reducedMotion
                            ? Math.max(0.28, progress)
                            : Math.max(0.06, progress)
                        })`,
                      }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="下一部精选作品"
            className="flex sm:hidden size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card/85 text-foreground shadow-sm backdrop-blur-2xl active:scale-95 dark:border-white/12 dark:bg-white/[0.08]"
          >
            <ChevronRight className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlayingAuto((prev) => !prev)}
            aria-label={isPlayingAuto ? "暂停自动轮播" : "恢复自动轮播"}
            aria-pressed={!isPlayingAuto}
            className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card/85 text-foreground shadow-sm backdrop-blur-2xl transition duration-300 hover:scale-105 hover:bg-secondary active:scale-95 dark:border-white/12 dark:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isPlayingAuto ? <Pause className="size-3.5" /> : <Play className="ml-0.5 size-3.5" />}
          </button>
        </div>
      </div>

      {/* In-place Poster Gallery Lightbox for image-only AIGC works */}
      <AnimatePresence>
        {posterGalleryProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={posterGalleryProject.title}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setPosterGalleryProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: APPLE_EASE }}
              className="relative w-full max-w-5xl rounded-2xl border border-white/15 bg-neutral-950 p-4 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm sm:text-base font-semibold text-white">
                    {posterGalleryProject.title}
                  </h3>
                  <p className="text-xs text-white/60">
                    第 {posterIndex + 1} / {posterGalleryProject.images.length} 张 · {posterGalleryProject.deliverables}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={`/projects/${posterGalleryProject.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/90 hover:bg-white/10 transition"
                  >
                    项目详情
                    <ArrowUpRight className="size-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setPosterGalleryProject(null)}
                    aria-label="关闭大图预览"
                    className="rounded-full border border-white/20 p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl bg-black">
                <img
                  src={getImageSource(posterGalleryProject, posterIndex)}
                  alt={posterGalleryProject.images[posterIndex]?.alt || posterGalleryProject.title}
                  className="max-h-[72vh] w-full object-contain"
                />
              </div>

              {posterGalleryProject.images.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {posterGalleryProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPosterIndex(idx)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                        idx === posterIndex
                          ? "bg-white text-black"
                          : "border border-white/20 text-white/75 hover:bg-white/10"
                      }`}
                    >
                      版本 {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
