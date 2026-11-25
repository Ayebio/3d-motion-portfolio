import { resolveMediaUrl } from "@/lib/media"

export interface PortfolioImage {
  src: ImageMetadata | string
  alt: string
  width: number
  height: number
}

export interface PortfolioProject {
  title: string
  slug: string
  role: string
  category: string
  featured?: boolean
  dateLabel?: string
  client?: string
  tools: string[]
  deliverables?: string
  year: string
  videoUrl: string
  bilibiliUrl?: string
  videoSrc?: string
  description: string
  highlights?: string[]
  tags: string[]
  images: PortfolioImage[]
}

interface PortfolioVideo {
  id: string
  rawTitle: string
  displayTitle: string
  year: string
  category?: string
  featured?: boolean
  videoUrl: string
  bilibiliUrl?: string
  thumbnailWidth: number
  thumbnailHeight: number
}

const portfolioVideos: PortfolioVideo[] = [
  { id: "senw5VrE0z4", rawTitle: "230613_Jumbo热泵", displayTitle: "Jumbo 热泵", year: "2023", videoUrl: "https://youtu.be/senw5VrE0z4", bilibiliUrl: "https://www.bilibili.com/video/BV1LSLw6rE2u", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "HVWFA1Y2ed8", rawTitle: "230703_InverEco水泵", displayTitle: "InverEco 水泵", year: "2023", videoUrl: "https://youtu.be/HVWFA1Y2ed8", bilibiliUrl: "https://www.bilibili.com/video/BV1jRLK69Ey2", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "Cf2fGJo0SOc", rawTitle: "230726_Prefect热泵", displayTitle: "Prefect 热泵", year: "2023", videoUrl: "https://youtu.be/Cf2fGJo0SOc", bilibiliUrl: "https://www.bilibili.com/video/BV1hbLM6JEhG", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "qyhym-Ghnu8", rawTitle: "230817_一体机热泵", displayTitle: "一体机热泵", year: "2023", videoUrl: "https://youtu.be/qyhym-Ghnu8", bilibiliUrl: "https://www.bilibili.com/video/BV1yqLB6xEYp", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "c0d6gls0Ib4", rawTitle: "230906_X-Warrior水下机器人", displayTitle: "X-Warrior 水下机器人", year: "2023", featured: true, videoUrl: "https://youtu.be/c0d6gls0Ib4", bilibiliUrl: "https://www.bilibili.com/video/BV1o8Lq63Edv", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "dGm1MYww7Lc", rawTitle: "230922_X20热泵", displayTitle: "X20 热泵", year: "2023", videoUrl: "https://youtu.be/dGm1MYww7Lc", bilibiliUrl: "https://www.bilibili.com/video/BV1otLq6kE9A", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "0PpaLPon3PU", rawTitle: "231009_Aquark Igarden", displayTitle: "Aquark Igarden", year: "2023", videoUrl: "https://youtu.be/0PpaLPon3PU", bilibiliUrl: "https://www.bilibili.com/video/BV1g1Lq6wEKk", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "irNQLLKmoCo", rawTitle: "231027_Aquark Igarden-02", displayTitle: "Aquark Igarden 02", year: "2023", videoUrl: "https://youtu.be/irNQLLKmoCo", bilibiliUrl: "https://www.bilibili.com/video/BV18CLq6YEXX", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "1tnOPYVuoEE", rawTitle: "231114_吉尼斯水下机器人-01", displayTitle: "吉尼斯水下机器人 01", year: "2023", videoUrl: "https://youtu.be/1tnOPYVuoEE", bilibiliUrl: "https://www.bilibili.com/video/BV1MULq6FEvc", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "6VGydJbip1s", rawTitle: "231211_Aquark中控", displayTitle: "Aquark 中控系统", year: "2023", featured: true, videoUrl: "https://youtu.be/6VGydJbip1s", bilibiliUrl: "https://www.bilibili.com/video/BV1u2Lq6hEPG", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "42ClSeIV4js", rawTitle: "240130_吉尼斯水下机器人-02", displayTitle: "吉尼斯水下机器人 02", year: "2024", videoUrl: "https://youtu.be/42ClSeIV4js", bilibiliUrl: "https://www.bilibili.com/video/BV1VzLq6KEMh", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "VbcW7ioOVVw", rawTitle: "240219_吉尼斯热泵-01", displayTitle: "吉尼斯热泵 01", year: "2024", videoUrl: "https://youtu.be/VbcW7ioOVVw", bilibiliUrl: "https://www.bilibili.com/video/BV1XzLq6NEWn", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "WEZo1cDnUBc", rawTitle: "240326_吉尼斯热泵-02", displayTitle: "吉尼斯热泵 02", year: "2024", videoUrl: "https://youtu.be/WEZo1cDnUBc", bilibiliUrl: "https://www.bilibili.com/video/BV1GzLq6KEJr", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "ki6b6e-i_sE", rawTitle: "240405_吉尼斯割草机器人-01", displayTitle: "吉尼斯割草机器人 01", year: "2024", videoUrl: "https://youtu.be/ki6b6e-i_sE", bilibiliUrl: "https://www.bilibili.com/video/BV1VqLq6qEiN", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "iZniQWRyigA", rawTitle: "240430 Fairland Igarden-01", displayTitle: "Fairland Igarden 01", year: "2024", videoUrl: "https://youtu.be/iZniQWRyigA", bilibiliUrl: "https://www.bilibili.com/video/BV1Q6Lq6eEyb", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "NrYIxH9fVyw", rawTitle: "240513_超跑Igarden", displayTitle: "超跑 Igarden", year: "2024", videoUrl: "https://youtu.be/NrYIxH9fVyw", bilibiliUrl: "https://www.bilibili.com/video/BV1TMLq64ELc", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "eumcOho7TVk", rawTitle: "240527_InverX水下机器人", displayTitle: "InverX 水下机器人", year: "2024", videoUrl: "https://youtu.be/eumcOho7TVk", bilibiliUrl: "https://www.bilibili.com/video/BV1MKLq6ZEhj", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "ItI2-Q-3TDk", rawTitle: "240701_企业宣传", displayTitle: "品牌企业宣传片", year: "2024", featured: true, videoUrl: "https://youtu.be/ItI2-Q-3TDk", bilibiliUrl: "https://www.bilibili.com/video/BV1K3Lq6sEqa", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "yWSxNQVz-wo", rawTitle: "240802_吉尼斯割草机器人-02", displayTitle: "吉尼斯割草机器人 02", year: "2024", videoUrl: "https://youtu.be/yWSxNQVz-wo", bilibiliUrl: "https://www.bilibili.com/video/BV1SMLz6NEpy", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "GGaCdA6-Jh4", rawTitle: "240903_Fairland中控", displayTitle: "Fairland 中控系统", year: "2024", featured: true, videoUrl: "https://youtu.be/GGaCdA6-Jh4", bilibiliUrl: "https://www.bilibili.com/video/BV1gKLz6iEax", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "H6KBnHvM4ok", rawTitle: "240918_BIO盐机", displayTitle: "BIO 盐机", year: "2024", videoUrl: "https://youtu.be/H6KBnHvM4ok", bilibiliUrl: "https://www.bilibili.com/video/BV1wpLz6RE7M", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "BdproiyjRHw", rawTitle: "241118_N机热泵", displayTitle: "N机热泵", year: "2024", videoUrl: "https://youtu.be/BdproiyjRHw", bilibiliUrl: "https://www.bilibili.com/video/BV1wsLz6WEgd", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "H3qqhwwCsSs", rawTitle: "241217_CES", displayTitle: "CES 展会主视觉", year: "2024", videoUrl: "https://youtu.be/H3qqhwwCsSs", bilibiliUrl: "https://www.bilibili.com/video/BV1C6LB6WEtG", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "Jg4NlfRlo8w", rawTitle: "241231_Power热泵", displayTitle: "Power 热泵", year: "2024", videoUrl: "https://youtu.be/Jg4NlfRlo8w", bilibiliUrl: "https://www.bilibili.com/video/BV1CBLB6REXk", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "zGIfQZ3O5FU", rawTitle: "250204_RTK视觉割草机", displayTitle: "RTK 视觉割草机", year: "2025", videoUrl: "https://youtu.be/zGIfQZ3O5FU", bilibiliUrl: "https://www.bilibili.com/video/BV1CBLB6REYK", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "-ySnmqpeko4", rawTitle: "250219_Lifestyle", displayTitle: "Lifestyle 庭院概念片", year: "2025", videoUrl: "https://youtu.be/-ySnmqpeko4", bilibiliUrl: "https://www.bilibili.com/video/BV1rCLB6HE2Q", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "NwEumpzzvRI", rawTitle: "250303_暖通热泵-01", displayTitle: "暖通热泵 01", year: "2025", videoUrl: "https://youtu.be/NwEumpzzvRI", bilibiliUrl: "https://www.bilibili.com/video/BV1BjLk6xEKQ", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "82qjZGJv_Mk", rawTitle: "250409_勒芒-01", displayTitle: "勒芒概念片 01", year: "2025", videoUrl: "https://youtu.be/82qjZGJv_Mk", bilibiliUrl: "https://www.bilibili.com/video/BV1ruLk6cEDp", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "f18Cvt1J70k", rawTitle: "250424_IEW合集-01", displayTitle: "IEW 作品合集 01", year: "2025", videoUrl: "https://youtu.be/f18Cvt1J70k", bilibiliUrl: "https://www.bilibili.com/video/BV1kTLk6aEeo", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "JopwBrujYL0", rawTitle: "250429_勒芒热泵", displayTitle: "勒芒热泵", year: "2025", videoUrl: "https://youtu.be/JopwBrujYL0", bilibiliUrl: "https://www.bilibili.com/video/BV1cGLk6FEAs", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "xLh884PvWGQ", rawTitle: "250516_激光雷达割草机器人", displayTitle: "激光雷达割草机器人", year: "2025", featured: true, videoUrl: "https://youtu.be/xLh884PvWGQ", bilibiliUrl: "https://www.bilibili.com/video/BV1z3Lk6fE2d", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "OWM6lq4wf6s", rawTitle: "250613_木纹热泵", displayTitle: "木纹热泵", year: "2025", videoUrl: "https://youtu.be/OWM6lq4wf6s", bilibiliUrl: "https://www.bilibili.com/video/BV1wBLs6EEEW", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "fZ_4P0n0TKs", rawTitle: "250707_TSTB热泵", displayTitle: "TSTB 热泵", year: "2025", videoUrl: "https://youtu.be/fZ_4P0n0TKs", bilibiliUrl: "https://www.bilibili.com/video/BV1ZXLb6WErC", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "ildUoVK9Z9s", rawTitle: "250723_N4水下机器人", displayTitle: "N4 水下机器人", year: "2025", videoUrl: "https://youtu.be/ildUoVK9Z9s", bilibiliUrl: "https://www.bilibili.com/video/BV1zDLb6REVi", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "7llZUvmVtqI", rawTitle: "250824_CF N4水下机器人", displayTitle: "CF N4 水下机器人", year: "2025", videoUrl: "https://youtu.be/7llZUvmVtqI", bilibiliUrl: "https://www.bilibili.com/video/BV1BDLb6RE9z", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "3ZJdMOC3Uz4", rawTitle: "250903_暖通热泵", displayTitle: "暖通热泵", year: "2025", videoUrl: "https://youtu.be/3ZJdMOC3Uz4", bilibiliUrl: "https://www.bilibili.com/video/BV1odLb6HELu", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "GHSxftOKDvk", rawTitle: "250922_CF N3水下机器人", displayTitle: "CF N3 水下机器人", year: "2025", featured: true, videoUrl: "https://youtu.be/GHSxftOKDvk", bilibiliUrl: "https://www.bilibili.com/video/BV1GVG46aEy5", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "siKaN6rGN0I", rawTitle: "251121_Oasis热泵", displayTitle: "Oasis 热泵", year: "2025", featured: true, videoUrl: "https://youtu.be/siKaN6rGN0I", bilibiliUrl: "https://www.bilibili.com/video/BV1brGx6WEAN", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "2vkjldJEUMY", rawTitle: "251210_XP26热泵", displayTitle: "XP26 热泵", year: "2025", featured: true, videoUrl: "https://youtu.be/2vkjldJEUMY", bilibiliUrl: "https://www.bilibili.com/video/BV1brGx6WEKf", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "B-Vwlw6snrk", rawTitle: "260109_XP16热泵", displayTitle: "XP16 热泵", year: "2026", featured: true, videoUrl: "https://youtu.be/B-Vwlw6snrk", bilibiliUrl: "https://www.bilibili.com/video/BV1trGx6WEdq", thumbnailWidth: 1280, thumbnailHeight: 720 },
]

function getRole(title: string) {
  if (title.includes("热泵") || title.includes("水泵") || title.includes("盐机")) {
    return "Product TVC"
  }

  if (title.includes("水下机器人") || title.includes("割草")) {
    return "Robotics Film"
  }

  if (title.includes("中控") || title.includes("Igarden")) {
    return "Interface Motion"
  }

  if (title.includes("企业宣传") || title.includes("Lifestyle") || title.includes("CES") || title.includes("合集")) {
    return "Brand Film"
  }

  return "Commercial 3D Motion"
}

function getCategory(title: string) {
  if (title.includes("水下机器人") || title.includes("割草")) {
    return "机器人 / 硬件"
  }
  if (title.includes("中控") || title.includes("Igarden")) {
    return "界面动效"
  }
  if (title.includes("企业宣传") || title.includes("Lifestyle") || title.includes("CES") || title.includes("合集")) {
    return "品牌影像"
  }
  return "商业 TVC"
}

function getClient(title: string) {
  if (title.includes("Aquark")) return "Aquark"
  if (title.includes("Fairland")) return "Fairland"
  if (title.includes("吉尼斯")) return "Fairland / 吉尼斯项目"
  if (title.includes("CES")) return "CES 展会项目"
  return "商业合作项目"
}

function getTools(title: string) {
  if (title.includes("水下机器人") || title.includes("割草")) {
    return ["Cinema 4D", "Octane Render", "Houdini", "After Effects", "Substance 3D"]
  }
  if (title.includes("中控") || title.includes("Igarden")) {
    return ["Cinema 4D", "After Effects", "Figma", "Redshift"]
  }
  if (title.includes("企业宣传") || title.includes("Lifestyle") || title.includes("合集")) {
    return ["Cinema 4D", "Octane Render", "Premiere Pro", "DaVinci Resolve"]
  }
  return ["Cinema 4D", "Octane Render", "After Effects", "Photoshop"]
}

function getTags(title: string) {
  const tags = ["3D 动效", "商业影像"]

  if (title.includes("热泵")) {
    tags.push("热泵", "工业产品")
  } else if (title.includes("水泵")) {
    tags.push("水泵", "产品渲染")
  } else if (title.includes("水下机器人")) {
    tags.push("水下机器人", "功能解构")
  } else if (title.includes("割草")) {
    tags.push("割草机器人", "智能硬件")
  } else if (title.includes("中控") || title.includes("Igarden")) {
    tags.push("交互动效", "控制系统")
  } else if (title.includes("企业宣传") || title.includes("Lifestyle") || title.includes("CES") || title.includes("合集")) {
    tags.push("品牌影片", "商业发布")
  } else {
    tags.push("产品渲染", "动态视觉")
  }

  return tags
}

function getDescription(displayTitle: string, category: string, year: string) {
  return `${year} 年商业三维产品动态作品，属于「${category}」方向，展示 ${displayTitle} 的产品外观质感、结构细节与功能动态演示。`
}

function getSlug(video: PortfolioVideo, index: number) {
  return `work-${String(index + 1).padStart(2, "0")}-${video.id.toLowerCase()}`
}

function getDateCode(rawTitle: string) {
  const match = rawTitle.match(/^(\d{6})/)
  return match ? Number(match[1]) : 0
}

function formatDateLabel(rawTitle: string, year: string) {
  const match = rawTitle.match(/^(\d{2})(\d{2})\d{2}/)
  return match ? `20${match[1]}.${match[2]}` : year
}

const orderedPortfolioVideos = portfolioVideos
  .map((video, originalIndex) => ({ video, originalIndex }))
  .sort((a, b) => getDateCode(b.video.rawTitle) - getDateCode(a.video.rawTitle))

export const fallbackProjects: PortfolioProject[] = orderedPortfolioVideos.map(({ video, originalIndex }) => {
  const category = video.category || getCategory(video.rawTitle)
  return {
    title: video.displayTitle,
    slug: getSlug(video, originalIndex),
    role: getRole(video.rawTitle),
    category,
    featured: Boolean(video.featured),
    dateLabel: formatDateLabel(video.rawTitle, video.year),
    client: getClient(video.rawTitle),
    tools: getTools(video.rawTitle),
    year: video.year,
    videoUrl: video.videoUrl,
    bilibiliUrl: video.bilibiliUrl,
    videoSrc: resolveMediaUrl(`/videos/work-${String(originalIndex + 1).padStart(2, "0")}.mp4`),
    description: getDescription(video.displayTitle, category, video.year),
    tags: getTags(video.rawTitle),
    images: [
      {
        src: resolveMediaUrl(`/thumbnails/work-${String(originalIndex + 1).padStart(2, "0")}.jpg`),
        alt: `${video.displayTitle} 视频封面`,
        width: video.thumbnailWidth,
        height: video.thumbnailHeight,
      },
    ],
  }
})
