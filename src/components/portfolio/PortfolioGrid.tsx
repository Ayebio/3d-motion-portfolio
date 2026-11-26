import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"

import { PROJECT_CATEGORIES, type PortfolioProject } from "@/data/projects"

interface PortfolioGridProps {
  projects: PortfolioProject[]
  showFilter?: boolean
}

function getImageSource(project: PortfolioProject) {
  const image = project.images[0]
  return typeof image.src === "string" ? image.src : image.src.src
}

export function PortfolioGrid({ projects, showFilter = true }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("全部")

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "全部") {
      return projects
    }
    return projects.filter((project) => project.category === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <div className="space-y-7 sm:space-y-10">
      {/* Category Tabs Filter: horizontal swipe bar on mobile, centered wrap on desktop */}
      {showFilter && (
        <div className="flex flex-nowrap items-center justify-start gap-2 overflow-x-auto pb-1 -mx-3.5 px-3.5 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:justify-center">
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category
            const count =
              category === "全部"
                ? projects.length
                : projects.filter((p) => p.category === category).length

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`relative shrink-0 whitespace-nowrap px-3.5 sm:px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                  isSelected
                    ? "text-primary-foreground font-semibold shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {category}
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Projects Grid: 2 columns on mobile (Bilibili App style), 2 on tablet, 3 on desktop */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/60 px-6 py-16 text-center">
          <p className="text-sm font-medium text-foreground">
            「{selectedCategory}」分类作品整理中，即将上线
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            后续上传的新作品将自动归入该分类展示。
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("全部")}
            className="mt-5 inline-flex h-9 items-center rounded-md border border-border bg-secondary/70 px-4 text-xs font-medium text-foreground hover:bg-secondary transition"
          >
            查看全部作品
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              return (
                <motion.article
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative flex flex-col overflow-hidden rounded-lg sm:rounded-xl bg-card/85 border border-border/80 hover:border-foreground/30 hover:shadow-2xl transition-all duration-300"
                >
                  <a
                    href={`/projects/${project.slug}`}
                    aria-label={`查看 ${project.title} 作品详情`}
                    className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <div className="relative block aspect-video w-full overflow-hidden bg-secondary/80">
                      <img
                        src={getImageSource(project)}
                        alt={project.images[0].alt}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Mobile Bilibili-style subtle bottom vignette for date/category legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent sm:hidden" />

                      {/* Desktop hover gradient shadow overlay */}
                      <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Mobile bottom overlay meta (Bilibili App style) */}
                      <div className="absolute inset-x-2 bottom-1.5 flex items-center justify-between gap-1 text-[10px] text-white/95 sm:hidden">
                        <span className="truncate font-medium">{project.category}</span>
                        <span className="shrink-0 font-mono text-white/85">
                          {project.dateLabel || project.year}
                        </span>
                      </div>

                      {/* Desktop Top Badges: Role & Year */}
                      <div className="hidden sm:flex absolute top-3 left-3 items-center gap-1">
                        <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white/95 border border-white/15 shadow-sm">
                          {project.role}
                        </span>
                      </div>

                      <div className="hidden sm:block absolute top-3 right-3">
                        <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-white/90 border border-white/15">
                          {project.dateLabel || project.year}
                        </span>
                      </div>

                      {/* Center Play Indicator (Desktop hover) */}
                      <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                        <span className="flex size-12 items-center justify-center rounded-full bg-white/95 text-black shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-0.5 size-5 fill-black" aria-hidden="true" />
                        </span>
                      </div>
                    </div>

                    {/* Card Content Footer */}
                    <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-5">
                      <div>
                        <div className="hidden sm:flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-muted-foreground truncate">
                            {project.client || "商业合作项目"}
                          </p>
                          {project.tools?.[0] && (
                            <span className="inline-block shrink-0 text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border/60">
                              {project.tools[0]}
                            </span>
                          )}
                        </div>
                        <h3 className="line-clamp-2 sm:mt-2 sm:line-clamp-1 text-[13px] leading-snug sm:text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      {/* Mobile clean 1-line client/role sub-meta (Bilibili style) */}
                      <div className="mt-2 flex items-center justify-between gap-1 text-[11px] text-muted-foreground sm:hidden">
                        <span className="truncate">{project.client || "商业项目"}</span>
                        <span className="shrink-0 text-[10px] text-muted-foreground/80">{project.role}</span>
                      </div>

                      {/* Desktop bottom row */}
                      <div className="hidden sm:flex mt-4 items-center justify-between border-t border-border/60 pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-xs text-muted-foreground">
                            {project.category}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          查看案例
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
