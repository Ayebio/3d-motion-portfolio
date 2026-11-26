export const PROJECT_CATEGORIES = ["全部", "泳池热泵", "水下机器人", "庭院割草机", "AIGC", "其他"] as const

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
  xiaohongshuUrl?: string
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
  featured?: boolean
  role?: string
  category?: string
  client?: string
  tools?: string[]
  deliverables: string
  description: string
  highlights: string[]
  videoUrl: string
  bilibiliUrl?: string
  xiaohongshuUrl?: string
  hasVideo?: boolean
  extraImages?: PortfolioImage[]
  thumbnailWidth: number
  thumbnailHeight: number
}

const portfolioVideos: PortfolioVideo[] = [
  {
    id: "senw5VrE0z4",
    rawTitle: "230613_Jumbo热泵",
    displayTitle: "Jumbo 热泵",
    year: "2023",
    client: "Fairland",
    deliverables: "1920×1080 · 24fps · 31s",
    description: "Fairland Jumbo 商用大功率泳池热泵三维产品片，通过雪地耐候场景、双系统芯片解构与静音风扇暗调特写，呈现全天候稳定制热能力。",
    highlights: [
      "极端环境表现：冰雪泳池场景直观呈现 -20°C 至 43°C 宽温域运行能力",
      "双系统核心解构：Fairland TurboSilence 主板与双芯片微距拆解，突出最高 120KW 输出",
      "静音与建筑融合：暗调蓝色扇叶特写强化 15 倍静音卖点，衔接现代石材泳池庭院整机镜头",
    ],
    videoUrl: "https://youtu.be/senw5VrE0z4",
    bilibiliUrl: "https://www.bilibili.com/video/BV1LSLw6rE2u",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "HVWFA1Y2ed8",
    rawTitle: "230703_InverEco水泵",
    displayTitle: "InverEco 水泵",
    year: "2023",
    deliverables: "1920×1080 · 24fps · 33s",
    description: "InverEco 变频泳池水泵三维发布片，围绕天井水景空间开场、功耗数显面板、IE4 直流无刷电机拆解与 36dBA 静音家居场景展开。",
    highlights: [
      "空间视觉开场：圆形天井水池与巨幅 INVERTER 立体字景深构图，建立极简工业调性",
      "操控与能耗直显：顶部圆形触控屏微距呈现 430W 实时功耗读数与档位切换",
      "电机解构与静音场景：IE4 无刷电机转子金属微距拆解，搭配落地窗海景客厅诠释 36dBA 低噪体验",
    ],
    videoUrl: "https://youtu.be/HVWFA1Y2ed8",
    bilibiliUrl: "https://www.bilibili.com/video/BV1jRLK69Ey2",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "Cf2fGJo0SOc",
    rawTitle: "230726_Prefect热泵",
    displayTitle: "Prefect 热泵",
    year: "2023",
    deliverables: "1920×1080 · 24fps · 46s",
    description: "荣获 2023 iF 设计奖的 Prefect 泳池热泵产品片，以航空涡轮灵感切入，展示菱形触控界面与无机械噪音风道结构。",
    highlights: [
      "航空涡轮灵感：暗场聚光揭示 INVERPAD TURBO 涡轮扇叶，传递空气动力学美学",
      "工业设计细节：菱形黑晶触控面板微距呈现 26.5°C/28.0°C 界面与 2023 iF 设计奖背书",
      "风道与庭院定格：雕塑感金属风道曲面诠释零机械噪音，落幅现代极简别墅泳池全景",
    ],
    videoUrl: "https://youtu.be/Cf2fGJo0SOc",
    bilibiliUrl: "https://www.bilibili.com/video/BV1hbLM6JEhG",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "qyhym-Ghnu8",
    rawTitle: "230817_一体机热泵",
    displayTitle: "一体机热泵",
    year: "2023",
    deliverables: "1920×1080 · 24fps · 43s",
    description: "集加热与循环水泵于一体的泳池热泵三维影片，以日食意象开篇，通过半透明机箱透视完整拆解内部水循环系统。",
    highlights: [
      "概念光影开场：暗夜日食光环与地平线暖光渲染，营造静谧克制的视觉基调",
      "一体化透视拆解：透明外壳结构清晰呈现内置循环水泵与加热管路 All-in-One 集成布局",
      "静音质感定格：暖金色旋转核心特写与银白圆角铝合金机身泳池实景，强化 20 倍静音体验",
    ],
    videoUrl: "https://youtu.be/qyhym-Ghnu8",
    bilibiliUrl: "https://www.bilibili.com/video/BV1yqLB6xEYp",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "c0d6gls0Ib4",
    rawTitle: "230906_X-Warrior水下机器人",
    displayTitle: "X-Warrior 水下机器人",
    year: "2023",
    featured: true,
    deliverables: "1920×1080 · 24fps · 62s",
    description: "X-Warrior 无线泳池清洁机器人商业三维影片，结合红光赛博隧道阵列登场、高速疾驰动态与真实水下焦散巡航清洁镜头。",
    highlights: [
      "超跑级阵列亮相：红光网格隧道中三机编队登场，配合发光灯带强化硬核机械辨识度",
      "水下流体与焦散：水下瓷砖巡航、气泡上浮与正面双滚刷吸口微距，还原逼真水体折射质感",
      "速度感运镜切换：隧道动态模糊疾驰镜头与泳池实景交叉剪辑，节奏凌厉紧凑",
    ],
    videoUrl: "https://youtu.be/c0d6gls0Ib4",
    bilibiliUrl: "https://www.bilibili.com/video/BV1o8Lq63Edv",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "dGm1MYww7Lc",
    rawTitle: "230922_X20热泵",
    displayTitle: "X20 热泵",
    year: "2023",
    deliverables: "1920×1080 · 24fps · 35s",
    description: "X20 绯红配色蜂窝格栅泳池热泵产品片，以冷暖双色气流光轨可视化 COP20 高能效特性，兼具力量感与建筑美学。",
    highlights: [
      "标志性配色与材质：暗场光影勾勒绯红蜂窝冲孔机身与高亮数显屏，对比度强烈",
      "热交换气流可视化：暖金涡轮核心特写衔接红蓝双向气流光束，直观演绎 COP20 制热效率",
      "先锋建筑构图：整机悬浮倾斜置入极简混凝土泳池庭院，形成强烈视觉记忆点",
    ],
    videoUrl: "https://youtu.be/dGm1MYww7Lc",
    bilibiliUrl: "https://www.bilibili.com/video/BV1otLq6kE9A",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "0PpaLPon3PU",
    rawTitle: "231009_Aquark Igarden",
    displayTitle: "Aquark Igarden",
    year: "2023",
    client: "Aquark",
    deliverables: "1920×1080 · 24fps · 22s",
    description: "Aquark iGarden 智慧庭院生态短片，串联草坪 AR 扫描网格、MR.PURE 水质监测仪与墙面中控屏，呈现一体化庭院智控场景。",
    highlights: [
      "AR 庭院测绘视觉：现代白墙别墅草坪叠加发光网格扫描，引出割草机智能作业路径",
      "水质与温控界面：特写 MR.PURE 监测面板（ORP 690 / pH 7.4）与墙面中控触控交互",
      "全院生态联动：宽幅镜头统一呈现泳池、热泵、割草机与中控墙面的协同运行状态",
    ],
    videoUrl: "https://youtu.be/0PpaLPon3PU",
    bilibiliUrl: "https://www.bilibili.com/video/BV1g1Lq6wEKk",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "irNQLLKmoCo",
    rawTitle: "231027_Aquark Igarden-02",
    displayTitle: "Aquark Igarden 02",
    year: "2023",
    client: "Aquark",
    deliverables: "1920×1080 · 24fps · 25s",
    description: "Mr. iGarden 智慧庭院全景演示片，结合墙面黑晶中控、草坪 AR 天气与水深数据浮窗及机房剖面透视，展示全院设备互联。",
    highlights: [
      "中控面板质感：高反光玻璃屏与建筑墙面光影结合，呈现 All in One All in Hand 操控体验",
      "实景 AR 数据包装：割草机特写叠加巴塞罗那实时天气与 1.2m 泳池水位浮动信息 HUD",
      "建筑剖面联动：别墅外景同步透视设备机房、热泵与水下机器人，完整交代系统架构",
    ],
    videoUrl: "https://youtu.be/irNQLLKmoCo",
    bilibiliUrl: "https://www.bilibili.com/video/BV18CLq6YEXX",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "1tnOPYVuoEE",
    rawTitle: "231114_吉尼斯水下机器人-01",
    displayTitle: "吉尼斯水下机器人 01",
    year: "2023",
    client: "Fairland / 吉尼斯项目",
    deliverables: "1920×1080 · 24fps · 37s",
    description: "创下 40 小时最长续航吉尼斯世界纪录的无线水下机器人发布片，以半透明 X 光电池透视与泳池水下剖面展现旗舰实力。",
    highlights: [
      "吉尼斯纪录舞台感：官方 Record Holder 徽章与 40 HOURS 核心数字配合蓝红双色灯柱亮相",
      "X 光续航结构透视：半透明外壳呈现内部发光绿色高密度电池组，直观支撑超长续航卖点",
      "泳池剖面实景演示：暗调跑道疾驰衔接清澈马赛克泳池半水面剖视，凸显机身金属漆质感",
    ],
    videoUrl: "https://youtu.be/1tnOPYVuoEE",
    bilibiliUrl: "https://www.bilibili.com/video/BV1MULq6FEvc",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "6VGydJbip1s",
    rawTitle: "231211_Aquark中控",
    displayTitle: "Aquark 中控系统",
    year: "2023",
    client: "Aquark",
    deliverables: "1920×1080 · 24fps · 37s",
    description: "Mr. iGarden 庭院智能中控屏三维产品与交互动效片，聚焦倒角金属工艺、实时水质能耗触控界面及分层式 OTA 升级动画。",
    highlights: [
      "极简工业工艺特写：暗调轮廓光勾勒阳极氧化倒角边框与玻璃面板细节",
      "多维数据触控交互：实拍手感触发屏幕界面，动态展示温度、ORP、pH、流量与实时能耗读数",
      "OTA 分层立体动效：多层玻璃 UI 浮空展开演示系统无线升级能力，衔接现代庭院上墙实景",
    ],
    videoUrl: "https://youtu.be/6VGydJbip1s",
    bilibiliUrl: "https://www.bilibili.com/video/BV1u2Lq6hEPG",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "42ClSeIV4js",
    rawTitle: "240130_吉尼斯水下机器人-02",
    displayTitle: "吉尼斯水下机器人 02",
    year: "2024",
    client: "Fairland / 吉尼斯项目",
    deliverables: "1920×1080 · 24fps · 15s",
    description: "Fairland 吉尼斯 40 小时水下机器人精炼预告短片，运用布料揭幕模拟与精密金属齿轮组拆解，15 秒内浓缩硬核机械张力。",
    highlights: [
      "布料揭幕流体模拟：暗黑丝绸随风掠过机身，缓缓显露玫瑰金外壳与红色灯带",
      "精密传动机构拆解：高精度啮合齿轮组与电机驱动仓微距动态演示，强化机械工程美感",
      "高对比纪录定版：红色地面反光映衬半透明透视机身与吉尼斯 40 小时荣誉标识",
    ],
    videoUrl: "https://youtu.be/42ClSeIV4js",
    bilibiliUrl: "https://www.bilibili.com/video/BV1VzLq6KEMh",
    thumbnailWidth: 480,
    thumbnailHeight: 360,
  },
  {
    id: "VbcW7ioOVVw",
    rawTitle: "240219_吉尼斯热泵-01",
    displayTitle: "吉尼斯热泵 01",
    year: "2024",
    client: "Fairland / 吉尼斯项目",
    deliverables: "1920×1080 · 24fps · 34s",
    description: "挑战最高能效 COP 39 吉尼斯世界纪录的泳池热泵概念片，以暗调琥珀光效热核与高速热流穿越镜头点燃视觉悬念。",
    highlights: [
      "悬念氛围营造：暗黑空间中「READY FOR A COP MIRACLE?」引出玻璃腔体内炽热发光核心",
      "热流穿梭动态转场：高速第一视角穿越暖橙色旋涡通道，具象化极致热转换效率",
      "绯红机身纪录定格：金属红棱角轮廓光与 COP 39 吉尼斯徽章形成强烈视觉冲击",
    ],
    videoUrl: "https://youtu.be/VbcW7ioOVVw",
    bilibiliUrl: "https://www.bilibili.com/video/BV1XzLq6NEWn",
    thumbnailWidth: 480,
    thumbnailHeight: 360,
  },
  {
    id: "WEZo1cDnUBc",
    rawTitle: "240326_吉尼斯热泵-02",
    displayTitle: "吉尼斯热泵 02",
    year: "2024",
    client: "Fairland / 吉尼斯项目",
    deliverables: "1920×1080 · 24fps · 40s",
    description: "29.69 dB(A) 超静音吉尼斯纪录泳池热泵三维影片，结合消声室背景与金色 INVERPAD TURBO 涡轮爆炸拆解凸显静音科技。",
    highlights: [
      "声波材质抽象开篇：暗黑丝滑金属波纹隐喻极静气流，奠定高级声学美学基调",
      "黄金涡轮爆炸拆解：层叠呈现 INVERPAD TURBO 静音扇叶与精密齿轮盘机械细节",
      "消声室纪录视觉：在专业吸音尖劈背景中点亮香槟金样机与 29.69 dB(A) 吉尼斯认证",
    ],
    videoUrl: "https://youtu.be/WEZo1cDnUBc",
    bilibiliUrl: "https://www.bilibili.com/video/BV1GzLq6KEJr",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "ki6b6e-i_sE",
    rawTitle: "240405_吉尼斯割草机器人-01",
    displayTitle: "吉尼斯割草机器人 01",
    year: "2024",
    client: "Fairland / 吉尼斯项目",
    deliverables: "1920×1080 · 24fps · 37s",
    description: "超跑造型割草机器人三维发布片，通过金色空气动力学光轨、机身工艺细节与极光夜色草坪镜头，诠释 10+ 小时超长续航。",
    highlights: [
      "超跑风洞光轨表现：金色能量粒子沿流线车身勾勒轮廓，突出 Supercar Design 设计语言",
      "工业细节微距特写：高光红漆面、哑光顶盖与红色 STOP 安全按键清晰展现材质工艺",
      "极光夜色氛围定版：绿色极光映照下的草坪静帧与 10+ HOUR ENDURANCE 视觉排版浑然一体",
    ],
    videoUrl: "https://youtu.be/ki6b6e-i_sE",
    bilibiliUrl: "https://www.bilibili.com/video/BV1VqLq6qEiN",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "iZniQWRyigA",
    rawTitle: "240430 Fairland Igarden-01",
    displayTitle: "Fairland Igarden 01",
    year: "2024",
    client: "Fairland",
    deliverables: "1920×960 · 24fps · 61s",
    description: "2:1 宽银幕比例的 Fairland iGarden 生态宣传片，以发光蓝能光流穿越建筑门廊开场，串联泳池清洁、热交换核心与户用储能系统。",
    highlights: [
      "电影宽画幅叙事：蓝色发光能量流穿过暗调建筑之门进入庭院，打开智慧户外生活篇章",
      "水下清洁与热核特写：水下机器人马赛克池底作业衔接螺旋金属热交换盘管暖光微距",
      "光储一体场景落地：石墙木饰现代住宅中展示户用储能电池柜与逆变器实景融合",
    ],
    videoUrl: "https://youtu.be/iZniQWRyigA",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Q6Lq6eEyb",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "NrYIxH9fVyw",
    rawTitle: "240513_超跑Igarden",
    displayTitle: "超跑 Igarden",
    year: "2024",
    client: "Fairland / iGarden",
    deliverables: "1920×1080 · 24fps · 82s",
    description: "以超跑动力隐喻串联 iGarden 全系产品的概念大片，将 30 小时续航割草机、内燃机活塞炽焰与智能水质中控融于暗黑电影质感。",
    highlights: [
      "超跑棚拍与雾效疾驰：暗场轮廓光雕琢鲜红流线机身，配合烟雾地面疾驰强化 30 小时续航",
      "引擎动力视觉隐喻：炽热发光缸体与活塞高速往复特效，赋予庭院硬件澎湃性能联想",
      "全系黑晶智控收束：悬浮暗调水质控制器（ORP/pH/温度）将画面从性能拉回智能管理",
    ],
    videoUrl: "https://youtu.be/NrYIxH9fVyw",
    bilibiliUrl: "https://www.bilibili.com/video/BV1TMLq64ELc",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "eumcOho7TVk",
    rawTitle: "240527_InverX水下机器人",
    displayTitle: "InverX 水下机器人",
    year: "2024",
    deliverables: "1920×1080 · 24fps · 51s",
    description: "InverX 无线泳池机器人三维产品片，通过粗野主义空间 X 标识开场、蓝光电池阵列、池底强劲吸污与爬壁水纹镜头展示核心性能。",
    highlights: [
      "标志性空间亮相：暗黑水泥建筑大厅上方悬置发光橙色 X 徽标，凸显银黑机身硬朗气质",
      "续航与吸力可视化：蓝光多电芯阵列直观表达 7 小时续航，池底吸入落叶微距诠释强劲吸力",
      "水体光影与爬壁：通透泳池波纹焦散中呈现机器人攀爬池壁的流畅作业姿态",
    ],
    videoUrl: "https://youtu.be/eumcOho7TVk",
    bilibiliUrl: "https://www.bilibili.com/video/BV1MKLq6ZEhj",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "ItI2-Q-3TDk",
    rawTitle: "240701_企业宣传",
    displayTitle: "品牌企业宣传片",
    year: "2024",
    client: "Fairland",
    deliverables: "1920×1080 · 24fps · 112s",
    description: "Fairland 品牌企业宣传片，将虚拟科技展厅「科技联盟乌托邦」、自动化智造产线、实验室声学检测与人文温度画面有机结合。",
    highlights: [
      "虚拟科技展厅构建：大尺度极简白调未来空间「INNOVATION UTOPIA」集中陈列旗舰产品线",
      "精密智造与研发实证：自动化机械臂加工特写与频谱曲线实验室测试画面，夯实制造实力",
      "品牌温度叙事收尾：由硬核工业制造过渡至 Fairland 熊猫伴手礼人文特写，呼应「共建乐土」主题",
    ],
    videoUrl: "https://youtu.be/ItI2-Q-3TDk",
    bilibiliUrl: "https://www.bilibili.com/video/BV1K3Lq6sEqa",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "yWSxNQVz-wo",
    rawTitle: "240802_吉尼斯割草机器人-02",
    displayTitle: "吉尼斯割草机器人 02",
    year: "2024",
    client: "Fairland / 吉尼斯项目",
    deliverables: "1920×1080 · 24fps · 65s",
    description: "吉尼斯割草机器人与庭院产品联袂演示片，融合俯拍高速隧道尾灯轨迹、水下机器人爬壁与现代草坪热泵庭院全景。",
    highlights: [
      "俯拍高速动感转场：顶视角水泥通道中红色超跑割草机拖出绯红尾灯光轨，速度张力十足",
      "水陆双机协同展现：衔接泳池内无线水下机器人翻越池壁的清澈水纹动态镜头",
      "庭院建筑整合落版：阳光斜照草坪与深灰极简泳池热泵实景收尾，统一品牌视觉风格",
    ],
    videoUrl: "https://youtu.be/yWSxNQVz-wo",
    bilibiliUrl: "https://www.bilibili.com/video/BV1SMLz6NEpy",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "GGaCdA6-Jh4",
    rawTitle: "240903_Fairland中控",
    displayTitle: "Fairland 中控系统",
    year: "2024",
    featured: true,
    client: "Fairland",
    deliverables: "1920×1080 · 24fps · 30s",
    description: "Fairland 智慧庭院中控系统视觉短片，以暗调岩石光影揭示 OLED 交互屏，再通过日夜光影流转展现全庭院设备联动。",
    highlights: [
      "雕塑光影开场：岩石肌理与高对比明暗缝隙中浮现超薄黑晶屏幕，强化高端科技质感",
      "极简 OLED 交互特写：大斜角微距呈现 24°C 温控圆环与 ORP/pH 实时数值动效",
      "日夜庭院场景转换：从夜景暖光别墅无缝过渡至日光泳池庭院，展现中控统筹全院硬件",
    ],
    videoUrl: "https://youtu.be/GGaCdA6-Jh4",
    bilibiliUrl: "https://www.bilibili.com/video/BV1gKLz6iEax",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "H6KBnHvM4ok",
    rawTitle: "240918_BIO盐机",
    displayTitle: "BIO 盐机",
    year: "2024",
    deliverables: "1920×1080 · 24fps · 40s",
    description: "BIO 泳池盐氯机三维商业片，运用灵动水花流体包裹机身、蔚蓝水冠涟漪特写与 BIO/Party/Soft 多模式 UI 演绎亲肤净水体验。",
    highlights: [
      "流体水花包裹特效：金属银白机身在动态飞溅水流与蓝调水冠波纹中亮相，呼应净水属性",
      "水质监控 UI 动效：平板历史曲线与暗黑仪表盘清晰演示 ORP、pH、温度及三大运行模式切换",
      "亲肤健康情绪表达：尾段衔接泳池人物实景微笑特写，具象传递柔和舒适的泳池水质体验",
    ],
    videoUrl: "https://youtu.be/H6KBnHvM4ok",
    bilibiliUrl: "https://www.bilibili.com/video/BV1wpLz6RE7M",
    thumbnailWidth: 480,
    thumbnailHeight: 360,
  },
  {
    id: "BdproiyjRHw",
    rawTitle: "241118_N机热泵",
    displayTitle: "N机热泵",
    year: "2024",
    deliverables: "1920×1080 · 24fps · 29s",
    description: "N 系列变频泳池热泵产品片，通过半透机身结构展示、螺旋钛管水流模拟与电费账单双机对比，直击高能效省电核心诉求。",
    highlights: [
      "半透明结构透视：庭院实景中直接透视机身内部压缩机与管路排布，结构逻辑清晰",
      "螺旋换热流体微距：暗场金属螺旋管内流动液体折射质感细腻，直观呈现热交换效率",
      "电费账单对比包装：双机同框叠加悬浮电费对比（$411.6 vs $520.2），数据说服力直接明确",
    ],
    videoUrl: "https://youtu.be/BdproiyjRHw",
    bilibiliUrl: "https://www.bilibili.com/video/BV1wsLz6WEgd",
    thumbnailWidth: 480,
    thumbnailHeight: 360,
  },
  {
    id: "H3qqhwwCsSs",
    rawTitle: "241217_CES",
    displayTitle: "CES 展会主视觉",
    year: "2024",
    client: "CES 展会项目",
    deliverables: "1920×1080 · 24fps · 80s",
    description: "面向 CES 国际消费电子展打造的 iGarden 旗舰矩阵宣传片，高密度集结水下机器人、超跑割草机、COP 39 热泵与光储一体系统。",
    highlights: [
      "多品类旗舰联展：红黑水下机器人水底气泡巡航、高速超跑竞速转场，适配展会大屏吸睛需求",
      "明星技术高光定格：重点突出 iGarden COP 39 热泵发光玻璃热核与极致节能标签",
      "光储新能源延伸：实景展示 iGarden All-in-One 太阳能储能系统（INVERX），拓宽品牌生态版图",
    ],
    videoUrl: "https://youtu.be/H3qqhwwCsSs",
    bilibiliUrl: "https://www.bilibili.com/video/BV1C6LB6WEtG",
    thumbnailWidth: 480,
    thumbnailHeight: 360,
  },
  {
    id: "Jg4NlfRlo8w",
    rawTitle: "241231_Power热泵",
    displayTitle: "Power 热泵",
    year: "2024",
    deliverables: "1920×1080 · 24fps · 29s",
    description: "Power 系列泳池热泵三维产品片，以黑色火山石肌理开篇，结合橙金科幻 HUD 读数与圆形 LED 控制屏微距演绎 COP 16 澎湃能效。",
    highlights: [
      "自然肌理视觉引入：暗调火山鹅卵石微距质感过渡至整机，营造沉稳厚重的工业气质",
      "COP 能量 HUD 包装：暗场悬浮橙色环形科技仪表动态跳动，直观突出 COP UP TO 16",
      "面板细节与弧形庭院：圆形数显屏（26.5°C/28°C · 1.10kW）特写衔接弧形现代泳池全景",
    ],
    videoUrl: "https://youtu.be/Jg4NlfRlo8w",
    bilibiliUrl: "https://www.bilibili.com/video/BV1CBLB6REXk",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "zGIfQZ3O5FU",
    rawTitle: "250204_RTK视觉割草机",
    displayTitle: "RTK 视觉割草机",
    year: "2025",
    deliverables: "1920×1080 · 24fps · 51s",
    description: "RTK 三目视觉割草机器人三维发布片，重点拆解光学镜头组与 TurboSilence 动力核心，并融入儿童宠物草坪安全避障实景。",
    highlights: [
      "三目视觉光学拆解：高精密玻璃镜片组悬浮展开，直观呈现 Triple-Lens Vision System 感知结构",
      "静音驱动核心可视化：琥珀光效 TurboSilence 电机与涡轮齿轮微距旋转，质感通透锐利",
      "家庭安全场景共情：将低角度金属轮毂草坪行驶与孩童萌宠互动画面结合，强化智能避障信任感",
    ],
    videoUrl: "https://youtu.be/zGIfQZ3O5FU",
    bilibiliUrl: "https://www.bilibili.com/video/BV1CBLB6REYK",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "-ySnmqpeko4",
    rawTitle: "250219_Lifestyle",
    displayTitle: "Lifestyle 庭院概念片",
    year: "2025",
    deliverables: "1920×1080 · 24fps · 51s",
    description: "面向未来户外生活方式的品牌概念短片，跨越破晓群山、逆光草叶露珠、造浪池冲浪与云端座舱 HUD 视角，构建宏大品牌想象力。",
    highlights: [
      "自然诗意氛围铺陈：暮色山峦与逆光草叶微距镜头交替，营造沉浸式户外情绪张力",
      "活力水景实拍融合：高速动态抓拍造浪池冲浪浪花，传递自由畅快的庭院玩水理念",
      "未来感座舱视角收尾：穿越云海的飞行器仪表 HUD 画面，点题「未来户外生活」品牌愿景",
    ],
    videoUrl: "https://youtu.be/-ySnmqpeko4",
    bilibiliUrl: "https://www.bilibili.com/video/BV1rCLB6HE2Q",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "NwEumpzzvRI",
    rawTitle: "250303_暖通热泵-01",
    displayTitle: "暖通热泵 01",
    year: "2025",
    client: "Fairland",
    deliverables: "1920×1080 · 24fps · 36s",
    description: "Fairland TurboSilence ATW 暖通热泵三维商业片，展示立式金属机身、蓝光边缘氛围灯与海景现代别墅的 6 倍节能居住美学。",
    highlights: [
      "极简金属光影转场：拉丝金属几何折射开篇，快速建立精密家电视觉格调",
      "立式外观与氛围灯效：竖向银灰机身搭配侧边冷蓝灯带，在绿茵与现代建筑前辨识度极高",
      "海景家居生活延展：穿插海景木质露台度假空间，自然引出 6X Energy Saving 节能主题",
    ],
    videoUrl: "https://youtu.be/NwEumpzzvRI",
    bilibiliUrl: "https://www.bilibili.com/video/BV1BjLk6xEKQ",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "82qjZGJv_Mk",
    rawTitle: "250409_勒芒-01",
    displayTitle: "勒芒概念片 01",
    year: "2025",
    deliverables: "1920×1080 · 24fps · 30s",
    description: "以勒芒 24 小时耐力赛为灵感的品牌跨界概念片，将水下机器人与割草机置入赛道双车竞速，最终无缝衔接泳池赛道红热泵。",
    highlights: [
      "勒芒赛道大场景还原：航拍 LE MANS 经典弯道与看台，借耐力赛基因背书产品持久性能",
      "双机赛道竞速演艺：夕阳逆光下水下机器人与红色超跑割草机并驾齐驱，光影速度感拉满",
      "红蓝视觉跨界收束：由赛道竞速转场至泳池畔赛道红热泵，实现概念张力与产品落地平衡",
    ],
    videoUrl: "https://youtu.be/82qjZGJv_Mk",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ruLk6cEDp",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "f18Cvt1J70k",
    rawTitle: "250424_IEW合集-01",
    displayTitle: "IEW 作品合集 01",
    year: "2025",
    deliverables: "1920×754 · 24fps · 62s",
    description: "超宽画幅定制的 IEW 展会能源管理合集片，以动感字体转场串联智能割草、家庭储能与泳池温控，适配展会巨幕视觉播放。",
    highlights: [
      "超宽展幕比例设计：1920×754 宽幅构图专门适配展会拼接大屏，空间延展感突出",
      "动能文字与生态切换：醒目红白「Energy Management」字体动效衔接草坪作业与澄澈水纹",
      "暮色庭院 HUD 联动：黄昏住宅实景叠加 17:16 / 10 KW 制热功率浮窗与储能光柱连线",
    ],
    videoUrl: "https://youtu.be/f18Cvt1J70k",
    bilibiliUrl: "https://www.bilibili.com/video/BV1kTLk6aEeo",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "JopwBrujYL0",
    rawTitle: "250429_勒芒热泵",
    displayTitle: "勒芒热泵",
    year: "2025",
    client: "iGarden",
    deliverables: "1920×1080 · 24fps · 31s",
    description: "iGarden 勒芒联名配色热泵商业短片，从红金赛车尾翼无缝过渡至赛道红白路肩上的整机，突出 130% TurboSilence 爆发力与 ECO 节能。",
    highlights: [
      "赛车基因直觉转场：红金涂装赛车尾翼微距切入，直接将鲜红冲孔热泵置于勒芒赛道直道",
      "炽热核心芯片解构：铜橙色发光 TurboSilence 芯片微距呈现 Best 130% 强劲变频输出",
      "触控能耗直显收尾：亮黑面板特写展示 23°C/26°C 与 0.28kW 低功耗读数，呼应 Best ECO",
    ],
    videoUrl: "https://youtu.be/JopwBrujYL0",
    bilibiliUrl: "https://www.bilibili.com/video/BV1cGLk6FEAs",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "xLh884PvWGQ",
    rawTitle: "250516_激光雷达割草机器人",
    displayTitle: "激光雷达割草机器人",
    year: "2025",
    featured: true,
    deliverables: "1920×1080 · 24fps · 48s",
    description: "AI + LiDAR 激光雷达割草机器人商业三维片，以倾斜赛道速度感开场，重点展示复杂草坪全地形覆盖与足球障碍智能识别规划。",
    highlights: [
      "赛道动感过渡入场：大倾角赛道弯道极速镜头转入庭院草坪，赋予割草机器人敏捷操控感",
      "全地形作业表现：低机位穿梭于光影斑驳的庭院草坪与落叶间，阐释 All-terrain solutions",
      "AI 激光雷达避障实景：前景足球静物与后台规划路径同框，直观呈现 AI plus Lidar 智能识别",
    ],
    videoUrl: "https://youtu.be/xLh884PvWGQ",
    bilibiliUrl: "https://www.bilibili.com/video/BV1z3Lk6fE2d",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "OWM6lq4wf6s",
    rawTitle: "250613_木纹热泵",
    displayTitle: "木纹热泵",
    year: "2025",
    deliverables: "1920×1080 · 24fps · 60s",
    description: "主打自然木纹饰面与近零 GWP 环保冷媒的泳池热泵发布片，融合温润木质工艺、透明压缩机解构与蜂鸟栖息的生态治愈画面。",
    highlights: [
      "自然木纹工艺质感：精细木纹肌理搭配翠绿背光圆形触控环，让工业设备融入庭院美学",
      "30 倍节能核心透视：双缸透明玻璃压缩机与金属盘管特写，清晰诠释 COP up to 30",
      "零碳生态意象表达：蓝羽蜂鸟轻落木纹机身顶角呼应 ≈ 0 GWP 环保理念，衔接阳光泳池人像",
    ],
    videoUrl: "https://youtu.be/OWM6lq4wf6s",
    bilibiliUrl: "https://www.bilibili.com/video/BV1wBLs6EEEW",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "fZ_4P0n0TKs",
    rawTitle: "250707_TSTB热泵",
    displayTitle: "TSTB 热泵",
    year: "2025",
    client: "Fairland",
    deliverables: "1920×1080 · 24fps · 50s",
    description: "Fairland 西班牙语海外市场热泵商业片，涵盖金属铭牌精工细节、自研 AI 控温芯片可视化及雪景泳池 16 倍节能体验。",
    highlights: [
      "海外本地化商业包装：全片采用西班牙语卖点字幕，精准面向拉美与欧洲市场传播",
      "自研 AI 芯片与面板特写：拉丝金属铭牌衔接发光金色 FAIRLAND AI 芯片阵列及 25°C/28°C 屏显",
      "冬日恒温泳池反差：皑皑白雪别墅院落中畅游温水泳池，强力印证 COP 16.6 高效制热",
    ],
    videoUrl: "https://youtu.be/fZ_4P0n0TKs",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ZXLb6WErC",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "ildUoVK9Z9s",
    rawTitle: "250723_N4水下机器人",
    displayTitle: "N4 水下机器人",
    year: "2025",
    deliverables: "1920×1080 · 24fps · 44s",
    description: "N4 小巧机身全变频水下机器人产品片，结合三维尺寸线框、内部旋涡水泵透视与顶置旋钮 HUD，呈现轻松免维护的洁净泳池体验。",
    highlights: [
      "紧凑机身线框示意：白黑黄撞色机身叠加三维包围盒线框，直观突出 Small Body 轻巧体态",
      "全变频水泵旋涡拆解：暗调透明叶轮与高速水流柱特写，清晰演示 Full-inverter 强劲吸力",
      "顶置旋钮交互动效：发光蓝色环形刻度配合 1h/1.5h/2h/Max 档位切换，落地别墅泳池全景",
    ],
    videoUrl: "https://youtu.be/ildUoVK9Z9s",
    bilibiliUrl: "https://www.bilibili.com/video/BV1zDLb6REVi",
    thumbnailWidth: 480,
    thumbnailHeight: 360,
  },
  {
    id: "7llZUvmVtqI",
    rawTitle: "250824_CF N4水下机器人",
    displayTitle: "CF N4 水下机器人",
    year: "2025",
    client: "CF",
    deliverables: "1920×1080 · 24fps · 53s",
    description: "CF ZEN 系列 N4 水下清洁机器人产品功能演示片，清晰呈现泳池池底巡航、单机/App 便捷操控以及池底/池壁/水线双清洁模式。",
    highlights: [
      "清澈池底巡航演示：自然日光焦散下展示白蓝配色 CF ZEN 机器人流畅清扫池底轨迹",
      "多端操控流程说明：结合机身按键与 App 切换周期的功能展示，强调上手零门槛",
      "翻越池壁与水线清洁：多角度展现机器人攀爬直角池壁与水线刷洗的双模式实用表现",
    ],
    videoUrl: "https://youtu.be/7llZUvmVtqI",
    bilibiliUrl: "https://www.bilibili.com/video/BV1BDLb6RE9z",
    thumbnailWidth: 480,
    thumbnailHeight: 360,
  },
  {
    id: "3ZJdMOC3Uz4",
    rawTitle: "250903_暖通热泵",
    displayTitle: "暖通热泵",
    year: "2025",
    client: "iGarden",
    deliverables: "1920×1080 · 24fps · 71s",
    description: "iGarden 家庭暖通热泵深度解构宣传片，围绕首创多孔格栅工业设计、内部多层爆炸拆解与全屋热水/采暖分时能耗 HUD 展开。",
    highlights: [
      "首创多孔格栅微距：金属质感特写突出 1st multi hole design 独特声学与散热冲孔美学",
      "整机内部爆炸拆解：暗场逐层展开外壳、风扇、冷暖管路与核心组件，工程感扎实",
      "全屋分时能耗可视化：将 19:00 淋浴（65°C / 4.05 KW）与 16:38 住宅采暖（9 KW）以毛玻璃 HUD 串联",
    ],
    videoUrl: "https://youtu.be/3ZJdMOC3Uz4",
    bilibiliUrl: "https://www.bilibili.com/video/BV1odLb6HELu",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "GHSxftOKDvk",
    rawTitle: "250922_CF N3水下机器人",
    displayTitle: "CF N3 水下机器人",
    year: "2025",
    featured: true,
    client: "CF",
    deliverables: "1920×1080 · 24fps · 56s",
    description: "CF N3 无线水下机器人商业三维片，运用高空泳池 1H 投影创意排版、暗调全变频水流转场与水线贴壁清扫特写展现高效续航。",
    highlights: [
      "泳池立体字创意构图：二楼阳台俯拍视角将 1H 大字融入泳池水面，直观传达 2 小时续航效率",
      "全变频暗场动力转场：微距流体冲刷过渡突出 Full-Inverter Technology 稳定动力输出",
      "水线贴壁洁净特写：水面波纹微距定格机器人沿池边水线精密刷洗，兼顾池底与池壁模式",
    ],
    videoUrl: "https://youtu.be/GHSxftOKDvk",
    bilibiliUrl: "https://www.bilibili.com/video/BV1GVG46aEy5",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "siKaN6rGN0I",
    rawTitle: "251121_Oasis热泵",
    displayTitle: "Oasis 热泵",
    year: "2025",
    client: "iGarden",
    deliverables: "1920×1080 · 24fps · 64s",
    description: "Oasis 系列泳池热泵三维产品片，通过半透涡轮冷暖气流可视化、iGarden AI 语音对话交互界面与冬日雪景亲子戏水场景展现全季温暖。",
    highlights: [
      "突破性涡轮风道拆解：半透明机箱内呈现 Groundbreaking Turbofan 蓝进橙出双色强效气流",
      "AI 语音智控交互演绎：手机端 iGarden AI 对话界面与庭院实景融合，呈现语音控温与故障诊断",
      "冬日雪景亲子场景：积雪环绕的温水泳池中一家人尽情划水玩乐，强化全季恒温情绪共鸣",
    ],
    videoUrl: "https://youtu.be/siKaN6rGN0I",
    bilibiliUrl: "https://www.bilibili.com/video/BV1brGx6WEAN",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "2vkjldJEUMY",
    rawTitle: "251210_XP26热泵",
    displayTitle: "XP26 热泵",
    year: "2025",
    client: "Fairland",
    deliverables: "1920×1080 · 24fps · 61s",
    description: "Fairland XP26 哑黑蜂窝热泵商业大片，以棚拍斜光造型、黄金闪电热交换水流微距与水下悬浮 130% 提速界面展现旗舰制热速度。",
    highlights: [
      "极简暗调棚拍质感：斜射光束雕塑全黑蜂窝机身与 Fairland 标识，凸显旗舰工业设计",
      "闪电换热流体微距：螺旋管内旋转金色流体特效直观演绎 30% 更高热交换效率",
      "水下悬浮界面与实景：清澈台阶水波中浮现 130% Turbo 提速与 27°C/28°C 读数，落幅欢快戏水浪花",
    ],
    videoUrl: "https://youtu.be/2vkjldJEUMY",
    bilibiliUrl: "https://www.bilibili.com/video/BV1brGx6WEKf",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "B-Vwlw6snrk",
    rawTitle: "260109_XP16热泵",
    displayTitle: "XP16 热泵",
    year: "2026",
    client: "Fairland",
    deliverables: "1920×1080 · 24fps · 46s",
    description: "Fairland XP16 泳池热泵 2026 新品发布片，融合全息蓝光触控层叠动效、玻璃建筑线框夜景发光暖池与山景木质露台整机定格。",
    highlights: [
      "全息智能控温包装：机身面板延展出多层蓝光悬浮触控界面，强化 AI TurboSilence 智控科技感",
      "线框别墅暖池视觉：暗夜半透明线框建筑与炙热橙光泳池形成冷暖撞色，强力突出 COP 16 制热力",
      "山景庭院实景落地：木质泳池甲板与青山背景衬托哑黑蜂窝整机，自然收束高端居家氛围",
    ],
    videoUrl: "https://youtu.be/B-Vwlw6snrk",
    bilibiliUrl: "https://www.bilibili.com/video/BV1trGx6WEdq",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "igarden-x26",
    rawTitle: "260615_iGarden X26热泵",
    displayTitle: "iGarden X26 热泵",
    year: "2026",
    featured: true,
    role: "Product PV",
    category: "泳池热泵",
    client: "iGarden",
    deliverables: "1920×1080 · 24fps · 65s",
    description: "2026 年 6 月 iGarden X26 智能变频泳池热泵商业发布片，融合实景庭院光影、铝合金冲孔机身外观表现、TurboSilence AI 芯片与内部热交换结构解构，以及 AI Eco Mode 实时电价交互动效。",
    highlights: [
      "外观与场景质感：蓝色冲孔铝合金机身与户外泳池庭院自然融合，突出工业设计细节",
      "核心硬件解构：TurboSilence AI 芯片、双转子直流变频压缩机与 COP30 热交换管路三维可视化",
      "智能交互动效：App 语音控温与 AI Eco Mode 实时电价节能曲线 HUD 动态包装",
    ],
    videoUrl: "",
    thumbnailWidth: 1920,
    thumbnailHeight: 1080,
  },
  {
    id: "aigc-drone",
    rawTitle: "260201_AIGC无人机组装穿梭",
    displayTitle: "AIGC 无人机林间组装穿梭",
    year: "2026",
    featured: true,
    role: "AIGC Film",
    category: "AIGC",
    client: "个人 AIGC 创作",
    tools: ["Seedance", "After Effects", "Premiere Pro"],
    deliverables: "1280×720 · 24fps · 14s",
    description: "全流程 AI 生成的无人机空中爆炸组装与林间高速穿梭短片，在金属机械零件质感、光学双摄云台结构与晨雾针叶林光影之间实现电影级动态呈现。",
    highlights: [
      "空中爆炸组装镜头：机身外壳、无刷电机、主控 PCB 与双摄云台镜组在半空精准聚合，机械质感细腻",
      "林间低空高速穿梭：晨雾针叶林与蕨类植被间高速跟拍，配合自然动态模糊与机臂绿/橙导航灯效",
      "AIGC 产品动效落地：验证生成式视频在硬核数码产品结构拆解与实景光影融合中的商业表现力",
    ],
    videoUrl: "",
    xiaohongshuUrl: "https://www.xiaohongshu.com/discovery/item/697ef3c0000000001a02d358?source=webshare&xhsshare=pc_web&xsec_token=ABaKIhSD9F_FyA740o3-GEa011D8anvPHthmMTx84HsLA=&xsec_source=pc_share",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  {
    id: "aigc-lion-dance",
    rawTitle: "260127_AIGC醒狮报喜2026",
    displayTitle: "醒狮报喜 · 2026 祥瑞迎春",
    year: "2026",
    featured: true,
    role: "AIGC Visual",
    category: "AIGC",
    client: "个人 AIGC 创作",
    tools: ["Seedance", "After Effects"],
    deliverables: "2546×1080 · 2.35:1 动态视觉海报",
    description: "2026 新春主题 AIGC 国风动态海报系列「祥瑞迎春」，以低机位超广角电影构图塑造气势磅礴的红金醒狮与舞狮群像。",
    highlights: [
      "电影宽银幕视觉张力：2.35:1 超广角仰拍配合漫天飞舞落叶动态模糊，强化醒狮腾跃而出的冲击感",
      "国风材质与双氛围光影：精细还原狮头绒毛、刺绣纹样与红金彩绘，涵盖晴空日光与暖调灯影双版视觉",
      "节庆视觉整体包装：金色书法「祥瑞迎春 / AUSPICIOUSSPRING」与 CG 级场景自然融合，适配新春主视觉",
    ],
    videoUrl: "",
    xiaohongshuUrl: "https://www.xiaohongshu.com/discovery/item/6974dfbe000000000a02cf53?source=webshare&xhsshare=pc_web&xsec_token=ABmUJTopgLpTwOjqaQ617Odb66aWYn3agjFa5QTk5csI4=&xsec_source=pc_share",
    hasVideo: false,
    extraImages: [
      {
        src: "/thumbnails/work-43-2.jpg",
        alt: "醒狮报喜 · 2026 祥瑞迎春 暖光特写版视觉海报",
        width: 2208,
        height: 936,
      },
    ],
    thumbnailWidth: 2546,
    thumbnailHeight: 1080,
  },
  {
    id: "igarden-hvac-2610",
    rawTitle: "261021_iGarden暖通热泵",
    displayTitle: "iGarden 暖通热泵",
    year: "2026",
    featured: true,
    role: "Product PV",
    category: "泳池热泵",
    client: "iGarden",
    deliverables: "1920×1080 · 24fps · 76s",
    description: "2026 年 10 月 iGarden 全铝合金工业设计暖通热泵商业发布片，涵盖首创多孔金属机身、1kW=7kW 内部管路能效拆解、-10°C 雪景满载制热与 Dual A+++ 全屋热水体验。",
    highlights: [
      "首创铝合金 ID 工艺：暗调蓝光环绕曲面搭配高精多孔金属格栅，奠定高端暖通工业美学",
      "硬核能效结构可视化：透视机箱内部压缩机与蓝光管路流向，清晰表达 1kW=7kW 高能效比",
      "冬日全屋场景包装：晚霞雪景别墅地面光轨（-10°C 100% 制热 / 11.26 KW）衔接室内双 A+++ 热水交互 HUD",
    ],
    videoUrl: "",
    thumbnailWidth: 1920,
    thumbnailHeight: 1080,
  },
  {
    id: "mr-wow-heat-pump",
    rawTitle: "261113_MrWow泳池热泵",
    displayTitle: "Mr. Wow 泳池热泵",
    year: "2026",
    featured: true,
    role: "Product PV",
    category: "泳池热泵",
    client: "Aquark / iGarden",
    deliverables: "1920×1080 · 24fps · 63s",
    description: "2026 年 11 月 INVERPAD TURBO 系列 Mr. Wow 旗舰泳池热泵发布片，融合地中海阳光庭院氛围、电价曲线智能排程、COP 30.5 透明压缩机拆解与 36.2 dB(A) 落叶级静音意象。",
    highlights: [
      "地中海松弛氛围与机身质感：绯红金属倒角机身配底部冰蓝灯带，在橄榄树与阳光泳池间极具辨识度",
      "COP 30.5 透明核芯拆解：微距透视双缸压缩机与铜管换热腔，配合实景电价面积图展示 AI 智能排程加热",
      "30 倍静音诗意表达：秋叶轻落机身与翠绿数显环特写，以电影级细节诠释 36.2 dB(A) 耳语级静谧体验",
    ],
    videoUrl: "",
    thumbnailWidth: 1920,
    thumbnailHeight: 1080,
  },
]

function getRole(title: string) {
  if (title.includes("热泵") || title.includes("水泵") || title.includes("盐机")) {
    return "Product PV"
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
  if (title.includes("热泵")) {
    return "泳池热泵"
  }
  if (title.includes("水下机器人")) {
    return "水下机器人"
  }
  if (title.includes("割草")) {
    return "庭院割草机"
  }
  if (title.toUpperCase().includes("AIGC")) {
    return "AIGC"
  }
  return "其他"
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
    return ["Cinema 4D", "Redshift", "Houdini", "After Effects", "Substance 3D", "Seedance"]
  }
  if (title.includes("中控") || title.includes("Igarden")) {
    return ["Cinema 4D", "Redshift", "After Effects", "Figma", "Seedance"]
  }
  if (title.includes("企业宣传") || title.includes("Lifestyle") || title.includes("CES") || title.includes("合集")) {
    return ["Cinema 4D", "Redshift", "Premiere Pro", "DaVinci Resolve", "Seedance"]
  }
  return ["Cinema 4D", "Redshift", "After Effects", "Seedance"]
}

function getTags(title: string) {
  if (title.toUpperCase().includes("AIGC")) {
    const tags = ["AIGC", "AI 视觉"]
    if (title.includes("无人机")) {
      tags.push("无人机", "产品动画")
    } else if (title.includes("醒狮")) {
      tags.push("国风醒狮", "动态海报")
    }
    return tags
  }

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
    role: video.role || getRole(video.rawTitle),
    category,
    featured: Boolean(video.featured),
    dateLabel: formatDateLabel(video.rawTitle, video.year),
    client: video.client || getClient(video.rawTitle),
    tools: video.tools || getTools(video.rawTitle),
    deliverables: video.deliverables,
    year: video.year,
    videoUrl: video.videoUrl,
    bilibiliUrl: video.bilibiliUrl,
    xiaohongshuUrl: video.xiaohongshuUrl,
    videoSrc: video.hasVideo === false ? undefined : `/videos/work-${String(originalIndex + 1).padStart(2, "0")}.mp4`,
    description: video.description,
    highlights: video.highlights,
    tags: getTags(video.rawTitle),
    images: [
      {
        src: `/thumbnails/work-${String(originalIndex + 1).padStart(2, "0")}.jpg`,
        alt: `${video.displayTitle} 视频封面`,
        width: video.thumbnailWidth,
        height: video.thumbnailHeight,
      },
      ...(video.extraImages || []),
    ],
  }
})
