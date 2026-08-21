import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"

import type { PortfolioProject } from "@/data/projects"

interface PortfolioGridProps {
  projects: PortfolioProject[]
  showFilter?: boolean
}

function getImageSource(project: PortfolioProject) {
  const image = project.images[0]
  return typeof image.src === "string" ? image.src : image.src.src
}

const CATEGORIES = ["全部", "商业 TVC", "机器人 / 硬件", "界面动效", "品牌影像"] as const

export function PortfolioGrid({ projects, showFilter = true }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("全部")

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "全部") {
      return projects
    }
    return projects.filter((project) => project.category === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <div className="space-y-10">
      {/* Category Tabs Filter */}
      {showFilter && (
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2">
          {CATEGORIES.map((category) => {
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
                className={`relative px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
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
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
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

      {/* Projects Grid: 2 columns on mobile (Bilibili style), 2 on tablet, 3 on desktop */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3"
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
                className="group relative flex flex-col overflow-hidden rounded-lg bg-card/75 border border-border/80 hover:border-foreground/30 hover:shadow-2xl transition-all duration-300"
              >
                <a
                  href={`/projects/${project.slug}`}
                  aria-label={`打开 ${project.title} 详情页`}
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-secondary/80 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <img
                    src={getImageSource(project)}
                    alt={project.images[0].alt}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Badge: Category & Year */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1">
                    <span className="rounded-full bg-black/65 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-medium text-white/90 border border-white/10 shadow-sm">
                      {project.role}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className="rounded-full bg-black/65 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[11px] font-mono text-white/80 border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  {/* Center Play Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                    <span className="flex size-9 sm:size-13 items-center justify-center rounded-full bg-white/95 text-black shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 size-3.5 sm:size-5 fill-black" aria-hidden="true" />
                    </span>
                  </div>
                </a>

                {/* Card Content Footer */}
                <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4 md:p-5">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
                        {project.client || "Commercial"}
                      </p>
                      {project.tools?.[0] && (
                        <span className="hidden sm:inline-block text-[10px] font-mono text-muted-foreground/80 bg-secondary px-1.5 py-0.5 rounded border border-border/50">
                          {project.tools[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-1 text-xs sm:text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="mt-2.5 sm:mt-4 flex items-center justify-between border-t border-border/60 pt-2 sm:pt-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 1).map((tag) => (
                        <span key={tag} className="text-[9px] sm:text-[10px] text-muted-foreground/90">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold text-foreground hover:text-primary transition-colors group/link"
                    >
                      详情
                      <ArrowUpRight className="size-3 sm:size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
