import * as React from "react"
import { motion } from "framer-motion"
import { Check, Copy, X, ZoomIn } from "lucide-react"

interface QrItem {
  id: "wechat" | "xiaohongshu"
  title: string
  subtitle: string
  badge: string
  accentDotClass: string
  accountLabel: string
  accountValue: string
  hint: string
  src: string
}

const QR_ITEMS: QrItem[] = [
  {
    id: "wechat",
    title: "微信扫码添加好友",
    subtitle: "面试邀约 / 商务合作直连",
    badge: "WeChat",
    accentDotClass: "bg-emerald-500",
    accountLabel: "微信号",
    accountValue: "yzy18476923155",
    hint: "添加请备注「面试邀约」或「项目合作」",
    src: "/qr/wechat-qr.jpg",
  },
  {
    id: "xiaohongshu",
    title: "小红书扫码添加 / 关注",
    subtitle: "项目记录 / 学习分享 / 商业合作",
    badge: "小红书",
    accentDotClass: "bg-rose-500",
    accountLabel: "小红书号",
    accountValue: "1423352552",
    hint: "小红书扫码查看主页或私信联系",
    src: "/qr/xiaohongshu-qr.jpg",
  },
]

function QrCard({
  item,
  onZoom,
}: {
  item: QrItem
  onZoom: (payload: { src: string; title: string; hint: string }) => void
}) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(item.accountValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card/85 p-5 shadow-sm backdrop-blur-xl transition hover:border-foreground/25">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border/80 bg-secondary/70 px-2.5 text-[11px] leading-none font-medium text-foreground">
            <span className={`size-2 rounded-full ${item.accentDotClass}`} />
            {item.badge}
          </span>
          <button
            type="button"
            onClick={() => onZoom({ src: item.src, title: item.title, hint: item.hint })}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition"
            aria-label={`放大查看${item.title}`}
          >
            <ZoomIn className="size-3.5" />
            放大
          </button>
        </div>

        <h3 className="mt-3.5 text-base font-semibold tracking-tight text-foreground">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>

        {/* Portrait card frame with white background so both full cards scan cleanly in Dark & Light mode */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => onZoom({ src: item.src, title: item.title, hint: item.hint })}
            className="group relative mx-auto block aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-xl border border-black/10 bg-white p-2 shadow-sm transition hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`点击放大${item.title}`}
          >
            <img
              src={item.src}
              alt={`${item.title}二维码`}
              className="h-full w-full rounded-lg object-contain"
              loading="eager"
            />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2.5 border-t border-border/60 pt-4">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border/70 bg-secondary/50 px-3 py-2">
          <div className="min-w-0">
            <span className="block text-[10px] text-muted-foreground">{item.accountLabel}</span>
            <span className="block truncate font-mono text-xs font-semibold text-foreground">
              {item.accountValue}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border/70 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-secondary transition"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-500" />
                <span className="text-emerald-500">已复制</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                复制
              </>
            )}
          </button>
        </div>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          {item.hint}
        </p>
      </div>
    </div>
  )
}

export function ContactQrCards() {
  const [zoomed, setZoomed] = React.useState<{
    src: string
    title: string
    hint: string
  } | null>(null)

  React.useEffect(() => {
    if (!zoomed) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [zoomed])

  return (
    <>
      <motion.div
        className="surface-light rounded-2xl p-5 sm:p-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Scan to Connect / 扫码添加好友
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
            微信与小红书二维码
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            手机端可长按识别或截图扫码，桌面端点击图片可放大扫描。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {QR_ITEMS.map((item) => (
            <QrCard key={item.id} item={item} onZoom={setZoomed} />
          ))}
        </div>
      </motion.div>

      {/* Lightbox modal for enlarged QR scanning */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setZoomed(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomed(null)}
              aria-label="关闭二维码放大窗口"
              className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
            >
              <X className="size-4" />
            </button>
            <h3 className="text-base font-semibold text-foreground">{zoomed.title}</h3>
            <div className="mx-auto mt-4 max-h-[70vh] w-full overflow-hidden rounded-xl bg-white p-3 shadow-sm">
              <img
                src={zoomed.src}
                alt={`${zoomed.title}二维码放大图`}
                className="mx-auto max-h-[64vh] w-full object-contain"
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{zoomed.hint}</p>
          </div>
        </div>
      )}
    </>
  )
}
