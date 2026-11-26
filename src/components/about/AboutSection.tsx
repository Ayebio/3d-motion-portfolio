import { ArrowUpRight, Briefcase, Cpu, Download, Layers, Sparkles } from "lucide-react"

import { CORE_STRENGTHS, EXPERIENCES, PROFILE, SKILL_PIPELINES } from "@/data/profile"

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border/60 py-14 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
              About & Pipeline / 关于我与工作流
            </p>
            <h2 className="mt-2.5 text-balance text-2xl leading-tight font-semibold tracking-tight text-foreground sm:mt-4 sm:text-5xl">
              从工业结构解构到 3D + AI 实拍级合成
            </h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
              近 4 年出海智能硬件三维视觉经验。商业项目对接工业设计部门模型，独立完成动画、灯光材质、渲染与后期合成全流程交付。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={PROFILE.resumeHref}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98]"
            >
              <Download className="size-3.5" aria-hidden="true" />
              查看 / 下载简历
            </a>
            <a
              href="/contact"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card/85 px-5 text-xs font-medium text-foreground hover:bg-secondary active:scale-[0.98]"
            >
              面试邀约 / 合作联系
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Core Strengths (3 pillars) */}
        <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-3 sm:gap-5">
          {CORE_STRENGTHS.map((item) => (
            <div
              key={item.index}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card/85 p-5 sm:p-6 shadow-sm backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {item.index}
                  </span>
                  <span className="rounded-full border border-border/80 bg-secondary/80 px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                    {item.metric}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline + Skill Pipelines */}
        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[1.05fr_1.15fr] lg:items-start">
          {/* Career Experience */}
          <div className="rounded-2xl border border-border/80 bg-card/85 p-5 sm:p-7 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-foreground" aria-hidden="true" />
              <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                从业经历 · Work Experience
              </h3>
            </div>

            <div className="mt-6 space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={exp.company}
                  className={`relative pl-5 ${
                    idx < EXPERIENCES.length - 1 ? "border-l border-border pb-6" : "border-l border-border/50"
                  }`}
                >
                  <span
                    className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background ${
                      idx === 0 ? "bg-emerald-500" : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {exp.period}
                    </span>
                    <span className="rounded-full border border-border/70 bg-secondary/70 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                      {exp.location}
                    </span>
                  </div>
                  <h4 className="mt-1.5 text-base font-semibold text-foreground">{exp.company}</h4>
                  <p className="text-xs font-medium text-foreground/85">{exp.role}</p>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                    {exp.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted-foreground list-disc pl-4">
                    {exp.highlights.map((hl) => (
                      <li key={hl}>{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Professional Skill Pipelines */}
          <div className="rounded-2xl border border-border/80 bg-card/85 p-5 sm:p-7 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-foreground" aria-hidden="true" />
                <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  专业技能与工具管线 · Technical Pipeline
                </h3>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Sparkles className="size-3" />
                3D + AI Hybrid
              </span>
            </div>

            <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {SKILL_PIPELINES.map((group) => (
                <div
                  key={group.title}
                  className="rounded-xl border border-border/70 bg-secondary/35 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{group.title}</h4>
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {group.englishTitle}
                      </p>
                    </div>
                    <Cpu className="size-3.5 shrink-0 text-muted-foreground mt-0.5" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {group.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border/70 bg-background/80 px-2 py-0.5 text-[11px] font-medium text-foreground/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
