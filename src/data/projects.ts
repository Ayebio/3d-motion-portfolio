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
  year: string
  videoUrl: string
  description: string
  tags: string[]
  images: PortfolioImage[]
}

interface PortfolioVideo {
  id: string
  title: string
  year: string
  videoUrl: string
  thumbnailWidth: number
  thumbnailHeight: number
}

const portfolioVideos: PortfolioVideo[] = [
  { id: "senw5VrE0z4", title: "230613_Jumbo热泵", year: "2023", videoUrl: "https://youtu.be/senw5VrE0z4", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "HVWFA1Y2ed8", title: "230703_InverEco水泵", year: "2023", videoUrl: "https://youtu.be/HVWFA1Y2ed8", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "Cf2fGJo0SOc", title: "230726_Prefect热泵", year: "2023", videoUrl: "https://youtu.be/Cf2fGJo0SOc", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "qyhym-Ghnu8", title: "230817_一体机热泵", year: "2023", videoUrl: "https://youtu.be/qyhym-Ghnu8", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "c0d6gls0Ib4", title: "230906_X-Warrior水下机器人", year: "2023", videoUrl: "https://youtu.be/c0d6gls0Ib4", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "dGm1MYww7Lc", title: "230922_X20热泵", year: "2023", videoUrl: "https://youtu.be/dGm1MYww7Lc", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "0PpaLPon3PU", title: "231009_Aquark Igarden", year: "2023", videoUrl: "https://youtu.be/0PpaLPon3PU", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "irNQLLKmoCo", title: "231027_Aquark Igarden-02", year: "2023", videoUrl: "https://youtu.be/irNQLLKmoCo", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "1tnOPYVuoEE", title: "231114_吉尼斯水下机器人-01", year: "2023", videoUrl: "https://youtu.be/1tnOPYVuoEE", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "6VGydJbip1s", title: "231211_Aquark中控", year: "2023", videoUrl: "https://youtu.be/6VGydJbip1s", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "42ClSeIV4js", title: "240130_吉尼斯水下机器人-02", year: "2024", videoUrl: "https://youtu.be/42ClSeIV4js", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "VbcW7ioOVVw", title: "240219_吉尼斯热泵-01", year: "2024", videoUrl: "https://youtu.be/VbcW7ioOVVw", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "WEZo1cDnUBc", title: "240326_吉尼斯热泵-02", year: "2024", videoUrl: "https://youtu.be/WEZo1cDnUBc", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "ki6b6e-i_sE", title: "240405_吉尼斯割草机器人-01", year: "2024", videoUrl: "https://youtu.be/ki6b6e-i_sE", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "iZniQWRyigA", title: "240430 Fairland Igarden-01", year: "2024", videoUrl: "https://youtu.be/iZniQWRyigA", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "NrYIxH9fVyw", title: "240513_超跑Igarden", year: "2024", videoUrl: "https://youtu.be/NrYIxH9fVyw", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "eumcOho7TVk", title: "240527_InverX水下机器人", year: "2024", videoUrl: "https://youtu.be/eumcOho7TVk", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "ItI2-Q-3TDk", title: "240701_企业宣传", year: "2024", videoUrl: "https://youtu.be/ItI2-Q-3TDk", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "yWSxNQVz-wo", title: "240802_吉尼斯割草机器人-02", year: "2024", videoUrl: "https://youtu.be/yWSxNQVz-wo", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "GGaCdA6-Jh4", title: "240903_Fairland中控", year: "2024", videoUrl: "https://youtu.be/GGaCdA6-Jh4", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "H6KBnHvM4ok", title: "240918_BIO盐机", year: "2024", videoUrl: "https://youtu.be/H6KBnHvM4ok", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "BdproiyjRHw", title: "241118_N机热泵", year: "2024", videoUrl: "https://youtu.be/BdproiyjRHw", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "H3qqhwwCsSs", title: "241217_CES", year: "2024", videoUrl: "https://youtu.be/H3qqhwwCsSs", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "Jg4NlfRlo8w", title: "241231_Power热泵", year: "2024", videoUrl: "https://youtu.be/Jg4NlfRlo8w", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "zGIfQZ3O5FU", title: "250204_RTK视觉割草机", year: "2025", videoUrl: "https://youtu.be/zGIfQZ3O5FU", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "-ySnmqpeko4", title: "250219_Lifestyle", year: "2025", videoUrl: "https://youtu.be/-ySnmqpeko4", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "NwEumpzzvRI", title: "230303_暖通热泵-01", year: "2023", videoUrl: "https://youtu.be/NwEumpzzvRI", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "82qjZGJv_Mk", title: "250409_勒芒-01", year: "2025", videoUrl: "https://youtu.be/82qjZGJv_Mk", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "f18Cvt1J70k", title: "250424_IEW合集-01", year: "2025", videoUrl: "https://youtu.be/f18Cvt1J70k", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "JopwBrujYL0", title: "250429_勒芒热泵", year: "2025", videoUrl: "https://youtu.be/JopwBrujYL0", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "xLh884PvWGQ", title: "250516_激光雷达割草机器人", year: "2025", videoUrl: "https://youtu.be/xLh884PvWGQ", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "OWM6lq4wf6s", title: "250613_木纹热泵", year: "2025", videoUrl: "https://youtu.be/OWM6lq4wf6s", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "fZ_4P0n0TKs", title: "250707_TSTB热泵", year: "2025", videoUrl: "https://youtu.be/fZ_4P0n0TKs", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "ildUoVK9Z9s", title: "250723_N4水下机器人", year: "2025", videoUrl: "https://youtu.be/ildUoVK9Z9s", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "7llZUvmVtqI", title: "250824_CF N4水下机器人", year: "2025", videoUrl: "https://youtu.be/7llZUvmVtqI", thumbnailWidth: 480, thumbnailHeight: 360 },
  { id: "3ZJdMOC3Uz4", title: "250903_暖通热泵", year: "2025", videoUrl: "https://youtu.be/3ZJdMOC3Uz4", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "GHSxftOKDvk", title: "250922_CF N3水下机器人", year: "2025", videoUrl: "https://youtu.be/GHSxftOKDvk", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "siKaN6rGN0I", title: "251121_Oasis热泵", year: "2025", videoUrl: "https://youtu.be/siKaN6rGN0I", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "2vkjldJEUMY", title: "251210_XP26热泵", year: "2025", videoUrl: "https://youtu.be/2vkjldJEUMY", thumbnailWidth: 1280, thumbnailHeight: 720 },
  { id: "B-Vwlw6snrk", title: "260109_XP16热泵", year: "2026", videoUrl: "https://youtu.be/B-Vwlw6snrk", thumbnailWidth: 1280, thumbnailHeight: 720 },
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

function getTags(title: string) {
  const tags = ["3D 动效", "TVC 影像"]

  if (title.includes("热泵")) {
    tags.push("热泵", "工业产品")
  } else if (title.includes("水泵")) {
    tags.push("水泵", "产品渲染")
  } else if (title.includes("水下机器人")) {
    tags.push("水下机器人", "硬核功能解构")
  } else if (title.includes("割草")) {
    tags.push("割草机器人", "智能硬件")
  } else if (title.includes("中控") || title.includes("Igarden")) {
    tags.push("交互动效", "控制系统")
  } else if (title.includes("企业宣传") || title.includes("Lifestyle") || title.includes("CES") || title.includes("合集")) {
    tags.push("品牌影像", "商业发布")
  } else {
    tags.push("产品渲染", "动态视觉")
  }

  return tags
}

function getDescription(title: string) {
  return `${title} 的商业3D产品动效与 TVC 影像，围绕产品结构、核心功能、材质光影和品牌调性组织镜头。`
}

function getSlug(video: PortfolioVideo, index: number) {
  return `work-${String(index + 1).padStart(2, "0")}-${video.id.toLowerCase()}`
}

function getDateCode(title: string) {
  const match = title.match(/^(\d{6})/)
  return match ? Number(match[1]) : 0
}

const orderedPortfolioVideos = portfolioVideos
  .map((video, originalIndex) => ({ video, originalIndex }))
  .sort((a, b) => getDateCode(b.video.title) - getDateCode(a.video.title))

export const fallbackProjects: PortfolioProject[] = orderedPortfolioVideos.map(({ video, originalIndex }) => ({
  title: video.title,
  slug: getSlug(video, originalIndex),
  role: getRole(video.title),
  year: video.year,
  videoUrl: video.videoUrl,
  description: getDescription(video.title),
  tags: getTags(video.title),
  images: [
    {
      src: `/thumbnails/work-${String(originalIndex + 1).padStart(2, "0")}.jpg`,
      alt: `${video.title} 视频静帧封面`,
      width: video.thumbnailWidth,
      height: video.thumbnailHeight,
    },
  ],
}))
