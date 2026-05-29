import auroraCore from "@/assets/aurora-core.svg"
import haloInterface from "@/assets/halo-interface.svg"
import vertexDrone from "@/assets/vertex-drone.svg"

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

const imagePool: PortfolioImage[][] = [
  [
    {
      src: auroraCore,
      alt: "Aurora Core 产品渲染主视觉",
      width: 1600,
      height: 1000,
    },
    {
      src: haloInterface,
      alt: "Aurora Core 制作过程中的界面与灯光探索",
      width: 1600,
      height: 1000,
    },
  ],
  [
    {
      src: vertexDrone,
      alt: "Vertex Drone 飞行器产品渲染",
      width: 1600,
      height: 1000,
    },
    {
      src: auroraCore,
      alt: "Vertex Drone 结构拆解与运动路径",
      width: 1600,
      height: 1000,
    },
  ],
  [
    {
      src: haloInterface,
      alt: "Halo Interface 界面动效渲染",
      width: 1600,
      height: 1000,
    },
    {
      src: vertexDrone,
      alt: "Halo Interface 制作视角与运动路径",
      width: 1600,
      height: 1000,
    },
  ],
]

const projectSeeds = [
  ["Aurora Core", "aurora-core", "Launch Film", "2026", "为高性能计算核心设计的发布级产品短片，重点呈现金属结构、冷光边缘和微距镜头节奏。", ["产品动画", "硬表面", "材质灯光", "官网首屏"]],
  ["Vertex Drone", "vertex-drone", "Product Visualization", "2026", "面向飞行设备的产品视觉系统，覆盖英雄镜头、结构拆解、空气动力学线框和短片交付。", ["飞行器", "拆解动画", "硬件发布", "动态系统"]],
  ["Halo Interface", "halo-interface", "Interface Motion", "2026", "为智能设备界面制作的动态视觉实验，强调克制的玻璃层级、清晰状态变化和品牌化转场。", ["界面动效", "玻璃层级", "智能设备", "Design System"]],
  ["Atlas Wearable", "atlas-wearable", "Wearable Launch", "2025", "智能穿戴产品的发布视觉，围绕佩戴状态、传感器结构和 UI 信息层级建立镜头语言。", ["可穿戴", "发布片", "UI Motion", "产品 KV"]],
  ["Nova Console", "nova-console", "Gaming Hardware", "2025", "游戏硬件的暗场产品动画，强调散热结构、灯光状态和高速转场。", ["游戏硬件", "散热结构", "暗场渲染", "短片"]],
  ["Lumen Speaker", "lumen-speaker", "Consumer Tech", "2025", "桌面音箱产品视觉，突出声波路径、织物材质、金属旋钮和生活场景切换。", ["消费电子", "声波可视化", "材质", "场景动画"]],
  ["Orbit Camera", "orbit-camera", "Camera System", "2025", "影像设备的产品演示，包含镜头组拆解、传感器细节和稳定器运动。", ["影像设备", "镜头拆解", "稳定器", "官网视频"]],
  ["Pulse Router", "pulse-router", "Network Device", "2025", "网络硬件的产品动画，用简洁线性数据流表达性能和覆盖范围。", ["网络设备", "数据流", "科技视觉", "产品短片"]],
  ["Tera Dock", "tera-dock", "Accessory Film", "2024", "扩展坞产品的功能演示，将接口、散热、桌面秩序和材质细节做成连续镜头。", ["配件", "功能演示", "桌面科技", "硬表面"]],
  ["Arc Tablet", "arc-tablet", "Tablet Motion", "2024", "平板设备的官网首屏视频，重点呈现边框、屏幕层级和多任务界面过渡。", ["平板", "官网首屏", "界面过渡", "产品渲染"]],
  ["Signal Watch", "signal-watch", "Watch UI Film", "2024", "智能手表视觉系统，结合表盘动效、健康数据和传感器结构。", ["手表", "表盘动效", "健康数据", "UI 系统"]],
  ["Prism Headset", "prism-headset", "Spatial Product", "2024", "空间计算设备的视觉探索，以镜片反射、头显结构和沉浸式 UI 为核心。", ["头显", "空间计算", "镜片", "沉浸界面"]],
  ["Forge Laptop", "forge-laptop", "Laptop Launch", "2024", "高性能笔记本发布动画，围绕屏幕展开、键盘背光、芯片模块和散热路径组织镜头。", ["笔记本", "芯片", "散热", "Launch Film"]],
  ["Motive Bike", "motive-bike", "Mobility Film", "2024", "电助力自行车产品片，强调车架线条、电机结构和城市通勤镜头。", ["出行产品", "车架", "电机", "城市镜头"]],
  ["Ion Charger", "ion-charger", "Charging System", "2023", "充电设备系列视觉，用统一的光线和布局表达速度、安全与模块化。", ["充电设备", "系列化", "模块", "产品 KV"]],
  ["Rift Monitor", "rift-monitor", "Display Launch", "2023", "显示器产品动画，呈现屏幕曲率、接口区域、支架结构和色彩状态。", ["显示器", "屏幕", "支架", "发布视觉"]],
  ["Flux Keyboard", "flux-keyboard", "Input Device", "2023", "机械键盘产品片，突出键帽材质、轴体结构、背光状态和桌面组合。", ["键盘", "机械结构", "背光", "桌面科技"]],
  ["Vela Lamp", "vela-lamp", "Smart Home", "2023", "智能灯具动态视觉，使用柔和明暗变化呈现光域、控制界面和材质过渡。", ["智能家居", "灯光", "控制界面", "产品动画"]],
  ["Core Mini", "core-mini", "Compact Device", "2023", "小型计算设备的产品短片，强调紧凑结构、接口布局和高性能暗示。", ["迷你主机", "接口", "结构", "官网视频"]],
  ["Aero Station", "aero-station", "Industrial Design", "2023", "工业风工作站视觉，结合金属外壳、模块插拔和工作流场景。", ["工作站", "工业设计", "模块化", "产品展示"]],
] as const

export const fallbackProjects: PortfolioProject[] = projectSeeds.map((project, index) => ({
  title: project[0],
  slug: project[1],
  role: project[2],
  year: project[3],
  videoUrl: `https://www.youtube.com/watch?v=VIDEOID${String(index + 1).padStart(4, "0")}`,
  description: project[4],
  tags: [...project[5]],
  images: imagePool[index % imagePool.length],
}))
