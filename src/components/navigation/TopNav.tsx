import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "首页" },
  { href: "/#work", label: "精选作品" },
  { href: "/archive", label: "全部归档" },
  { href: "/contact", label: "联系合作" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

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
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between rounded-md border border-white/10 bg-background/80 px-3 backdrop-blur-2xl dark:bg-black/55 shadow-sm">
        <a
          href="/"
          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold tracking-tight text-foreground outline-none hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95"
          aria-label="返回首页"
        >
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Motion Portfolio
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden items-center gap-5 sm:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("/#")
                ? pathname === "/"
                : pathname.startsWith(item.href)

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

        {/* Actions (Desktop + Mobile Toggle) */}
        <div className="flex items-center gap-2">
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
            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground outline-none hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-95"
          >
            开始合作
            <ArrowUpRight className="size-3" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-secondary active:scale-95 sm:hidden"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-md border border-border bg-card/95 p-4 shadow-xl backdrop-blur-2xl sm:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary active:scale-[0.98]"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </a>
              ))}
              <div className="mt-2 border-t border-border pt-3">
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground outline-none active:scale-[0.98]"
                >
                  开始合作
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
