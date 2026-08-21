import * as React from "react"
import { Check, Copy, Mail, MessageSquare, MapPin, Clock, Video, ExternalLink } from "lucide-react"

export function ContactInfo() {
  const [copiedType, setCopiedType] = React.useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2500)
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">Contact & Booking</p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          让新产品建立清晰的第一印象。
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          承接商业 3D 产品 TVC 影像、发布会主视觉、官网首屏视频、工业结构解构动效与智能硬件界面动效。
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Email Card */}
        <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-xl transition hover:border-foreground/30">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Mail className="size-3.5" />
              电子邮箱
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard("2872594253@qq.com", "email")}
              className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 transition"
            >
              {copiedType === "email" ? (
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
          <a
            href="mailto:2872594253@qq.com"
            className="mt-3 text-sm font-semibold text-foreground hover:underline"
          >
            2872594253@qq.com
          </a>
        </div>

        {/* WeChat Card */}
        <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-xl transition hover:border-foreground/30">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MessageSquare className="size-3.5" />
              微信沟通
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard("2872594253", "wechat")}
              className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 transition"
            >
              {copiedType === "wechat" ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span className="text-emerald-500">已复制微信号</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  复制微信号
                </>
              )}
            </button>
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground font-mono">
            2872594253
          </p>
        </div>
      </div>

      {/* Meta Specs */}
      <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <MapPin className="size-4 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-foreground">工作地点</p>
            <p className="mt-0.5">广州 / 全球远程协作</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="size-4 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-foreground">需求响应</p>
            <p className="mt-0.5">1-2 个工作日内回复报价与周期</p>
          </div>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="border-t border-border/60 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Channels & Portals
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition"
          >
            <Video className="size-3.5 text-red-500" />
            YouTube
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>
          <a
            href="https://www.bilibili.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition"
          >
            Bilibili
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>
          <a
            href="https://www.behance.net"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition"
          >
            Behance
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  )
}
