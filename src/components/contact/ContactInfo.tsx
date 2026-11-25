import * as React from "react"
import { Check, Copy, Mail, MessageSquare, MapPin, Clock } from "lucide-react"

const WECHAT_ID = "yzy18476923155"
const EMAIL = "2872594253@qq.com"

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
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Yang Zongye · 三维产品动态设计师
        </p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-[1.15]">
          期待新的工作机会，
          <br />
          也欢迎商业项目合作。
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          目前正在寻找三维产品动态设计全职或远程岗位，欢迎 HR 与设计团队随时联系交流、邀约面试；同时也承接商业 3D 产品 TVC、发布会主视觉、官网首屏视频及硬件结构/界面演示项目。
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* WeChat Card */}
        <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-4 backdrop-blur-xl transition hover:border-foreground/30">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MessageSquare className="size-3.5 text-emerald-500" />
              微信直连
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(WECHAT_ID, "wechat")}
              className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 transition"
            >
              {copiedType === "wechat" ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span className="text-emerald-500">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  复制微信号
                </>
              )}
            </button>
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground font-mono break-all">
            {WECHAT_ID}
          </p>
        </div>

        {/* Email Card */}
        <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-4 backdrop-blur-xl transition hover:border-foreground/30">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Mail className="size-3.5" />
              电子邮箱
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(EMAIL, "email")}
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
                  复制邮箱
                </>
              )}
            </button>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-3 text-sm font-semibold text-foreground hover:underline break-all"
          >
            {EMAIL}
          </a>
        </div>
      </div>

      {/* Meta Specs */}
      <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <MapPin className="size-4 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-foreground">所在城市 / 期望方式</p>
            <p className="mt-0.5">广州 / 支持远程与异地沟通</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="size-4 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-foreground">消息回复</p>
            <p className="mt-0.5">工作日 24 小时内及时回复</p>
          </div>
        </div>
      </div>
    </div>
  )
}
