import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "首页" },
  { href: "/#work", label: "作品" },
  { href: "/contact", label: "联系" },
]

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark"
  }

  return window.localStorage.getItem("theme") === "light" ? "light" : "dark"
}

export function TopNav() {
  const [theme, setTheme] = React.useState(getInitialTheme)
  const [pathname, setPathname] = React.useState("/")

  React.useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.dataset.theme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between rounded-md border border-white/10 bg-background/70 px-3 backdrop-blur-2xl dark:bg-black/45">
        <a
          href="/"
          className="rounded-md px-2 py-2 text-sm font-medium tracking-tight text-foreground outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95"
          aria-label="返回首页"
        >
          Motion Atelier
        </a>

        <div className="flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.replace("/#", "/"))

            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "hidden rounded-md px-1 py-2 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95 sm:inline-flex",
                  isActive && "text-foreground"
                )}
              >
                {item.label}
              </a>
            )
          })}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
            aria-pressed={theme === "dark"}
            className="rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground active:scale-95"
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>
          <a
            href="/contact"
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground outline-none hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95"
          >
            开始合作
          </a>
        </div>
      </nav>
    </header>
  )
}
