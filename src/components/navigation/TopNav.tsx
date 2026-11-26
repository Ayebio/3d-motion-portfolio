import * as React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Clapperboard, Home, LayoutGrid, MessageCircle, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "首页", mobileLabel: "首页", icon: Home },
  { href: "/#work", label: "精选作品", mobileLabel: "精选", icon: Clapperboard },
  { href: "/archive", label: "全部归档", mobileLabel: "归档", icon: LayoutGrid },
  { href: "/contact", label: "联系合作", mobileLabel: "联系", icon: MessageCircle },
]

function getClientTheme(): "light" | "dark" {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark") ? "dark" : "light"
  }
  return "dark"
}

export function TopNav() {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark")
  const [mounted, setMounted] = React.useState(false)
  const [locationState, setLocationState] = React.useState({ pathname: "/", hash: "" })
  const [isInWorkSection, setIsInWorkSection] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setTheme(getClientTheme())

    const syncWorkScroll = () => {
      if (window.location.pathname !== "/") {
        setIsInWorkSection(false)
        return
      }
      const workEl = document.getElementById("work")
      if (!workEl) {
        setIsInWorkSection(false)
        return
      }
      const rect = workEl.getBoundingClientRect()
      setIsInWorkSection(rect.top <= window.innerHeight * 0.45)
    }

    const syncLocation = () => {
      setLocationState({
        pathname: window.location.pathname,
        hash: window.location.hash,
      })
      setTheme(getClientTheme())
      syncWorkScroll()
    }

    syncLocation()
    document.addEventListener("astro:page-load", syncLocation)
    window.addEventListener("hashchange", syncLocation)
    window.addEventListener("scroll", syncWorkScroll, { passive: true })

    return () => {
      document.removeEventListener("astro:page-load", syncLocation)
      window.removeEventListener("hashchange", syncLocation)
      window.removeEventListener("scroll", syncWorkScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark"
      const root = document.documentElement
      root.classList.toggle("dark", next === "dark")
      root.dataset.theme = next
      window.localStorage.setItem("theme", next)
      return next
    })
  }

  const getIsActive = (href: string) => {
    const { pathname, hash } = locationState
    if (href === "/") {
      return pathname === "/" && !isInWorkSection && hash !== "#work"
    }
    if (href === "/#work") {
      return (pathname === "/" && (isInWorkSection || hash === "#work")) || pathname.startsWith("/projects/")
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3.5 pt-3 sm:px-4">
        <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between rounded-full border border-border/80 bg-background/85 px-3 backdrop-blur-2xl dark:bg-black/65 shadow-sm sm:rounded-md">
          <a
            href="/"
            className="flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold tracking-tight text-foreground outline-none hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95 sm:rounded-md sm:py-2"
            aria-label="返回首页"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Yang Zongye</span>
            <span className="hidden sm:inline text-xs font-normal text-muted-foreground">· 3D Motion</span>
          </a>

          {/* Desktop Nav Items (unchanged) */}
          <div className="hidden items-center gap-5 sm:flex">
            {navItems.map((item) => {
              const isActive = getIsActive(item.href)

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-1 py-1.5 text-xs font-medium text-muted-foreground outline-none hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95",
                    isActive && "text-foreground font-semibold"
                  )}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Actions: clean theme toggle on mobile (no hamburger); theme toggle + CTA on desktop */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={mounted && theme === "light" ? "切换到深色模式" : "切换到浅色模式"}
              aria-pressed={mounted ? theme === "dark" : undefined}
              className="rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-95 sm:rounded-md"
              onClick={toggleTheme}
            >
              {mounted && theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground outline-none hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95"
            >
              联系合作
              <ArrowUpRight className="size-3" />
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Floating iOS Frosted-Glass Bottom Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:hidden">
        <nav
          aria-label="移动端主导航"
          className="pointer-events-auto mx-auto grid max-w-[344px] grid-cols-4 items-center gap-1 rounded-full border border-border/85 bg-background/85 p-1.5 shadow-[0_18px_48px_-12px_rgba(0,0,0,0.4)] backdrop-blur-2xl dark:border-white/15 dark:bg-neutral-950/85 dark:shadow-[0_22px_54px_-10px_rgba(0,0,0,0.88)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = getIsActive(item.href)

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[10px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobileDockActivePill"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-primary shadow-sm"
                  />
                )}
                <Icon className="relative z-10 size-4" aria-hidden="true" />
                <span className="relative z-10 leading-none">{item.mobileLabel}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </>
  )
}
