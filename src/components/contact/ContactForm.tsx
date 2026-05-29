import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
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
    .min(20, "请至少描述 20 个字符，方便判断项目范围。")
    .max(800, "项目描述不能超过 800 个字符。"),
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

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(values: ContactFormValues) {
    setSubmitted(true)
    console.info("Contact request ready for backend integration:", values)
    reset(defaultValues)
  }

  return (
    <motion.div
      className="surface-light rounded-md p-5 sm:p-7"
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
                姓名
                <Input
                  placeholder="你的名字"
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
                  placeholder="name@studio.com"
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
                  placeholder="项目所属品牌"
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
                placeholder="产品类型、片长、交付时间、是否需要建模/材质/分镜/剪辑。"
                className="min-h-36 resize-none"
                aria-invalid={Boolean(errors.message)}
                required
                minLength={20}
                maxLength={800}
                {...field}
              />
              <span className="text-xs font-normal text-muted-foreground">
                当前为前端验证演示，后续可接入邮件、CRM 或 Contentful 表单流。
              </span>
              <FieldError message={errors.message?.message} />
            </label>
          )}
        />

        {submitted && (
          <motion.p
            className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            已通过前端校验，消息已准备好接入后端发送。
          </motion.p>
        )}

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:opacity-88 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-[0.98]"
        >
          <Send className="size-4" aria-hidden="true" />
          发送项目需求
        </button>
      </form>
    </motion.div>
  )
}
