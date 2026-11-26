export interface ExperienceItem {
  period: string
  company: string
  role: string
  location: string
  summary: string
  highlights: string[]
}

export interface CoreStrengthItem {
  index: string
  title: string
  subtitle: string
  description: string
  metric: string
}

export interface SkillPipelineItem {
  title: string
  englishTitle: string
  summary: string
  items: string[]
}

export const PROFILE = {
  name: "Yang Zongye",
  title: "三维产品动态设计师 / 视频创意主导",
  location: "广州 / 支持远程与异地协作",
  wechat: "yzy18476923155",
  email: "2872594253@qq.com",
  xiaohongshuId: "1423352552",
  /**
   * Showreel 配置：
   * 剪完 90s 完整版 Showreel 后，直接放至 public/videos/showreel.mp4 并把 ready 改为 true 即可无缝切换。
   */
  showreel: {
    ready: false,
    src: "/videos/showreel.mp4",
    previewLoopSrc: "/videos/hero-loop.mp4",
    posterSrc: "/thumbnails/hero-poster.jpg",
    durationLabel: "90s",
  },
  /**
   * 简历配置：
   * 如有自定义排版 PDF，直接放入 public/resume.pdf 并改为 "/resume.pdf"，
   * 目前默认指向在线可打印 / 一键导出 PDF 的简历页 "/resume"。
   */
  resumeHref: "/resume",
  footerPipeline: "Cinema 4D / Redshift / PFTrack / After Effects / DaVinci Resolve / 3D + AI Workflow",
} as const

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2023.06 - 至今",
    company: "广州菲亚兰德科技股份有限公司",
    role: "三维视频设计师 / 视频创意主导",
    location: "广州",
    summary:
      "主导 Fairland / iGarden / Aquark 出海智能硬件新品发布片与国际展会主视觉全链路制作，对接工业设计部门模型，独立完成动画、灯光材质、渲染与后期合成。",
    highlights: [
      "独立统筹并交付 10+ 款全球新品首发宣传片（泳池热泵、暖通热泵、水下机器人、割草机器人、中控系统）及 CES / IEW 等国际展会主视觉",
      "主导多个吉尼斯世界纪录产品视觉发布片，精准可视化 COP 39 能效、40 小时续航、超静音风道与内部压缩机解构",
      "跑通「AI 拟真场景/人物生成 + PFTrack 空间反求跟踪 + 工业产品渲染合成」工作流，制作周期缩短 40% 以上",
    ],
  },
  {
    period: "2022.06 - 2023.06",
    company: "顺德陆叁陆创意文化有限公司",
    role: "三维动态设计师",
    location: "佛山 · 顺德",
    summary:
      "负责商业产品三维广告、工业结构演示与品牌动态视觉制作，夯实产品棚拍布光、材质表现与后期合成管线能力。",
    highlights: [
      "参与多品类工业及消费硬件三维产品宣传片制作，负责镜头动态设计、材质着色、灯光渲染与后期合成",
      "积累完整的商业广告镜头节奏、分镜执行与多规格交付经验",
    ],
  },
]

export const CORE_STRENGTHS: CoreStrengthItem[] = [
  {
    index: "01",
    title: "全链路 Solo 创意与技术闭环",
    subtitle: "End-to-End Solo Ownership",
    description:
      "近 4 年出海智能硬件领域全流程视频主导经验，独立统筹并交付 10+ 款全球新品首发宣传片与国际展会主视觉视频，具备极高的人效与项目推进自驱力。",
    metric: "10+ 全球新品首发 PV",
  },
  {
    index: "02",
    title: "3D + AI 实拍级混合工作流",
    subtitle: "AI + PFTrack + 3D Compositing",
    description:
      "跑通「AI 拟真场景/人物生成 + PFTrack 空间反求跟踪 + 工业产品渲染合成」工作流，彻底解决传统三维人物/生活方式塑料感强与海外高昂实拍成本痛点。",
    metric: "制作周期缩短 40%+",
  },
  {
    index: "03",
    title: "硬核工业视效与美学把控",
    subtitle: "Mechanical Deconstruction & Pacing",
    description:
      "精通高精度电机/压缩机机械解构爆炸图与内部原理可视化，兼具海外主流社媒的高燃叙事与视听节奏感。",
    metric: "近 4 年硬件视效沉淀",
  },
]

export const SKILL_PIPELINES: SkillPipelineItem[] = [
  {
    title: "三维视效与材质渲染",
    englishTitle: "3D Lookdev & Rendering",
    summary: "模型资产轻量化处理、高精工业材质着色与写实光影表现",
    items: ["Cinema 4D", "Redshift", "粒子模拟", "模型资产轻量化", "高精材质着色"],
  },
  {
    title: "3D + AI 前沿工作流",
    englishTitle: "Generative 3D + AI Pipeline",
    summary: "以 AI 补齐人物实拍与概念分镜短板，实现低成本实拍级画面延展",
    items: ["Midjourney", "视频生成模型", "Topaz", "AI 概念分镜生成", "AI 实拍级场景延展", "微表面材质重绘"],
  },
  {
    title: "镜头反求与影视后期",
    englishTitle: "Matchmove & Post-Production",
    summary: "三维产品与实拍/AI 镜头无缝空间匹配、调色与动态信息包装",
    items: ["PFTrack（摄像机反求跟踪）", "After Effects（合成 / 调色 / 动效）", "DaVinci Resolve"],
  },
  {
    title: "全案创意与导演叙事",
    englishTitle: "Creative Direction & Delivery",
    summary: "面向出海市场的新品发布叙事编导与多终端大屏交付",
    items: ["出海新品分镜脚本编导", "工业机械视听节奏把控", "海外多语种社媒适配", "国际展会大屏工程"],
  },
]
