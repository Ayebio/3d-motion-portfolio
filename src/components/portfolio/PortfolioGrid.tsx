import { ArrowUpRight, Play } from "lucide-react"

import type { PortfolioProject } from "@/data/projects"

interface PortfolioGridProps {
  projects: PortfolioProject[]
}

function getImageSource(project: PortfolioProject) {
  const image = project.images[0]
  return typeof image.src === "string" ? image.src : image.src.src
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => {
        return (
          <article
            key={project.slug}
            className="group overflow-hidden rounded-md bg-card ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:ring-foreground/24 active:scale-[0.99]"
          >
            <a
              href={`/projects/${project.slug}`}
              aria-label={`打开 ${project.title} 详情页`}
              className="relative block aspect-[16/11] overflow-hidden bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <img
                src={getImageSource(project)}
                alt={project.images[0].alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/12 opacity-0 transition group-hover:opacity-100">
                <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-black shadow-soft">
                  <Play className="ml-0.5 size-5" aria-hidden="true" />
                </span>
              </div>
            </a>

            <div className="flex items-end justify-between gap-4 px-4 py-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.year}</p>
              </div>
                <a
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground outline-none hover:opacity-86 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95"
                >
                  详情
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
            </div>
          </article>
        )
      })}
    </div>
  )
}
