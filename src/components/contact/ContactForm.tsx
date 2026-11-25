import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Check, Copy, Mail, Send } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactSchema = z.object({
  name: z.string().trim().min(2, "请至少输入 2 个字符。").max(40, "姓名不能超过 40 个字符。"),
  email: z.string().trim().email("请输入有效的邮箱地址。"),
  company: z.string().trim().max(80, "公司名称不能超过 80 个字符。").optional(),
  budget: z.string().trim().min(2, "请填写预算范围或项目级别。").max(80, "预算说明不能超过 80 个字符。"),
  message: z
    .string()
    .trim()
    .min(10, "请至少输入 10 个字符的项目说明。")
    .max(800, "项目说明不能超过 800 个字符。"),
})

type ContactFormValues = z.infer<typeof contactSchema>

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }

  return <p className="text-xs font-medium text-destructive">{message}</p>
}

function buildInquirySummary(values: ContactFormValues) {
  return [
    `联系人：${values.name}`,
    `联系邮箱：${values.email}`,
    `品牌 / 公司：${values.company || "未填写"}`,
    `预算 / 项目级别：${values.budget}`,
    "",
    "项目简述：",
    values.message,
  ].join("\n")
}

export function ContactForm() {
  const [preparedMail, setPreparedMail] = React.useState<{
    mailtoHref: string
    summary: string
    remoteSent: boolean
  } | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true)
    setSubmitError(null)

    const summary = buildInquirySummary(values)
    const subject = `[项目合作] ${values.company ? `${values.company} - ` : ""}${values.name}`
    const mailtoHref = `mailto:2872594253@qq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`

    const endpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT as string | undefined
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        })
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        setPreparedMail({ mailtoHref, summary, remoteSent: true })
        setSubmitting(false)
        return
      } catch {
        setSubmitError("在线接口发送失败，已为你生成邮件与微信文本，请点击下方按钮发送。")
      }
    }

    setPreparedMail({ mailtoHref, summary, remoteSent: false })
    setSubmitting(false)
  }

  const copySummary = () => {
    if (!preparedMail) return
    navigator.clipboard.writeText(preparedMail.summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <motion.div
      className="surface-light rounded-xl p-5 sm:p-7"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <label className="grid gap-2 text-sm font-medium text-foreground">
                姓名 / 称呼
                <Input
                  placeholder="您的名字"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  required
                  minLength={2}
                  maxLength={40}
                  {...field}
                />
                <FieldError message={errors.name?.message} />
              </label>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <label className="grid gap-2 text-sm font-medium text-foreground">
                邮箱
                <Input
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  required
                  {...field}
                />
                <FieldError message={errors.email?.message} />
              </label>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="company"
            render={({ field }) => (
              <label className="grid gap-2 text-sm font-medium text-foreground">
                品牌 / 公司
                <Input
                  placeholder="项目所属品牌或公司"
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.company)}
                  maxLength={80}
                  {...field}
                />
                <FieldError message={errors.company?.message} />
              </label>
            )}
          />

          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <label className="grid gap-2 text-sm font-medium text-foreground">
                预算 / 项目级别
                <Input
                  placeholder="例如：官网首屏视频 / 30 秒发布片"
                  aria-invalid={Boolean(errors.budget)}
                  required
                  minLength={2}
                  maxLength={80}
                  {...field}
                />
                <FieldError message={errors.budget?.message} />
              </label>
            )}
          />
        </div>

        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <label className="grid gap-2 text-sm font-medium text-foreground">
              项目简述
              <Textarea
                placeholder="产品类型、片长、交付时间、是否需要建模/材质/分镜/剪辑或 AIGC 探索。"
                className="min-h-32 resize-none"
                aria-invalid={Boolean(errors.message)}
                required
                minLength={10}
                maxLength={800}
                {...field}
              />
              <FieldError message={errors.message?.message} />
            </label>
          )}
        />

        {submitError && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {submitError}
          </p>
        )}

        {preparedMail && (
          <motion.div
            className="space-y-3 rounded-lg border border-border bg-secondary/70 p-4 text-sm text-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-medium">
              {preparedMail.remoteSent
                ? "合作需求已发送至服务端，你也可以通过以下方式同步确认："
                : "已整理好合作需求，请选择以下任意一种方式直接发送给 Yang Zongye："}
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={preparedMail.mailtoHref}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition"
              >
                <Mail className="size-3.5" />
                打开邮箱客户端发送
              </a>
              <button
                type="button"
                onClick={copySummary}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-background transition"
              >
                {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                {copied ? "已复制内容（可粘贴发微信 2872594253）" : "复制内容发微信"}
              </button>
            </div>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:opacity-88 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-[0.98] disabled:opacity-50"
        >
          <Send className="size-4" aria-hidden="true" />
          {submitting ? "正在处理..." : "生成并发送合作需求"}
        </button>
      </form>
    </motion.div>
  )
}
