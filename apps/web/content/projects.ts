/**
 * 职责：维护官网项目案例的结构化内容，并提供静态详情页需要的读取方法。
 */

export type ProjectLink = {
  href: string;
  label: string;
};

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectSection = {
  title: string;
  body: string[];
  items?: ProjectFact[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: string;
  year: string;
  yearLabel?: string;
  type: string;
  tags: string[];
  stack: string[];
  links: ProjectLink[];
  demo?: ProjectLink;
  facts: ProjectFact[];
  highlights: string[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "yiforge-studio-website",
    title: "YiForge Studio 官网",
    summary:
      "YiForge Studio 官网是一个使用 Next.js 和静态导出构建的个人 AI 工作室官网，也是工作室第一个真实上线的 AI 协作开发案例。",
    description:
      "这个项目以 PC 端官网的形式承载工作室介绍、项目展示、构建记录、关于信息和联系方式，记录一次从想法、技术选型、开发、部署到内容系统规划的 AI Native 构建实践。",
    status: "已上线 / 持续迭代",
    year: "2026",
    type: "PC 端官网 / 个人 AI 工作室官网",
    tags: ["AI 协作开发", "PC 官网", "静态部署", "SEO / GEO"],
    stack: ["Next.js", "React", "TypeScript", "Turborepo", "pnpm", "Cloudflare"],
    links: [
      {
        href: "https://liucodex.com",
        label: "访问官网",
      },
    ],
    facts: [
      {
        label: "项目定位",
        value: "YiForge Studio 的第一个对外门面和 AI 协作开发案例",
      },
      {
        label: "部署方式",
        value: "静态导出与免费静态部署",
      },
      {
        label: "内容系统",
        value: "Typed 项目数据 + Markdown 构建记录",
      },
      {
        label: "核心目标",
        value: "展示 AI 协作开发能力，并沉淀工作室项目与文章",
      },
    ],
    highlights: [
      "从想法、技术选型、页面实现到部署上线，主要在 AI 协作开发范式下完成。",
      "使用 Next.js 支撑 SEO 友好的静态页面，而不是传统 SPA 单页应用。",
      "通过静态部署降低成本和运维复杂度，让官网适合长期免费维护。",
      "把官网本身定义为第一个作品案例，后续项目和构建记录会继续沉淀在这里。",
    ],
    sections: [
      {
        title: "为什么做这个项目",
        body: [
          "AI 时代让个人开发者的能力边界发生了明显变化。借助 AI 对话、AI 编程和 AI 辅助决策，一个前端开发者也可以更完整地参与产品思考、技术选型、页面实现、部署和内容运营。",
          "YiForge Studio 官网就是在这个背景下启动的。它不是一个单纯的静态页面，而是工作室的线上门面，用来展示项目、记录构建过程、表达 AI Native 开发理念，也让后续的产品和文章有一个长期稳定的入口。",
        ],
      },
      {
        title: "项目想解决什么问题",
        body: [
          "这个项目首先解决的是表达问题：把工作室的定位、AI 学习过程、技术能力和真实开发实践呈现出来，让访问者能看见一个正在持续构建的个人 AI 工作室。",
          "其次，它也解决了沉淀问题。项目介绍、构建记录、关于页面和联系方式会形成一个长期内容容器，帮助 YiForge Studio 把每一次开发经验都整理成可访问、可搜索、可被大模型理解的公开内容。",
        ],
      },
      {
        title: "已经完成的内容",
        body: [
          "项目已经完成基础仓库搭建、官网开发、域名购买、静态部署和自动化上线流程。当前站点包含首页、项目、构建记录、关于和联系页面。",
          "首页已经具备 AI 工作室的视觉表达和核心导航，后续重点会从占位内容转向真实项目、真实文章和更完整的内容系统。",
        ],
      },
      {
        title: "技术实现要点",
        body: [
          "项目采用 Turborepo 和 pnpm workspace 管理 monorepo，Web 应用使用 Next.js、React 和 TypeScript 开发。Next.js 的静态导出能力让官网可以生成纯静态页面，适合免费静态部署和长期维护。",
          "技术方案优先服务 SEO / GEO：页面需要清楚表达实体、项目事实、技术栈和构建结果，并通过 sitemap、metadata、稳定 slug 和内部链接帮助搜索引擎与大模型理解内容。",
        ],
      },
      {
        title: "AI 协作方式",
        body: [
          "这个项目是一次 AI Native 开发实践。人负责提出目标、补充真实背景、判断方案、验收页面和持续反馈；AI 参与需求澄清、技术选型、代码实现、样式打磨、文档整理和问题修复。",
          "项目中的大量实现都由 AI 协作完成，人的核心价值从逐行手写代码转向提供上下文、做取舍、定义验收标准和推动迭代。",
        ],
      },
      {
        title: "关键取舍",
        body: [
          "2018 年曾经使用 SPA 单页应用做官网，后来发现 SEO 优化成本很高。这次重新做 PC 官网时，优先选择支持静态页面生成和 SEO metadata 的 Next.js。",
          "过去也尝试过服务器、容器和 Nginx 的部署方式，但访问速度和运维成本并不理想。本次选择 Cloudflare 相关的域名和静态部署能力，优先保证访问速度、成本和维护体验。",
        ],
      },
      {
        title: "后续计划",
        body: [
          "下一步会把项目页和构建记录页从占位内容改造成真实内容系统，并逐步补充更多工作室研发成果。",
          "后续还会继续开发能解决现实问题的小工具或产品，并把每一次构建过程整理成项目案例和构建记录，让 YiForge Studio 成为持续表达、持续实践和持续迭代的 AI 工作室。",
        ],
      },
    ],
  },
  {
    slug: "gold-treasury-observatory",
    title: "金债比 · 黄金周期观察",
    summary:
      "用月度历史数据观察全球黄金估算市值与美国债务的相对规模，切换两种债务口径，并对照同期金价。",
    description:
      "一个从研究问题出发构建的交互看板，把数据整理、口径说明、历史比较和 CSV 下载放在同一个站点里。",
    status: "已上线 / 可体验",
    year: "2026",
    type: "数据研究 / 交互看板",
    tags: ["黄金", "美国国债", "数据可视化"],
    stack: ["Codex", "ChatGPT Sites", "JavaScript", "CSV"],
    demo: {
      href: "/demos/gold-treasury-observatory/index.html",
      label: "打开交互演示",
    },
    links: [
      {
        href: "https://gold-treasury-observatory-liu-2026.fairygame.chatgpt.site",
        label: "访问原站",
      },
    ],
    facts: [
      {
        label: "历史样本",
        value: "1971 年 8 月至 2026 年 8 月，共 661 个月度观测点",
      },
      { label: "债务口径", value: "联邦债务总额（面值）与可交易美国国债市值" },
      { label: "数据更新方式", value: "历史数据快照" },
    ],
    highlights: [
      "切换债务口径和时间范围，查看金债比在历史样本中的百分位。",
      "在同一时间轴上对照金债比和同期金价，观察两者的变化。",
      "在页面上查看公式、数据来源与估算方式，并下载 CSV 供进一步核对。",
    ],
    sections: [
      {
        title: "为什么观察这个比率",
        body: [
          "黄金价格描述的是每盎司黄金的价格。把它与全球地上黄金存量相乘，可以估算黄金的整体价值，再观察它与美国债务的相对规模如何随时间变化。",
        ],
      },
      {
        title: "两种分母，两个问题",
        body: [
          "以联邦债务总额为分母，回答黄金估值相当于多少美国联邦债务余额。以可交易美国国债市值为分母，回答黄金估值与可交易国债按市场价格计量的价值有多接近。",
          "黄金历史存量采用重建估计。看板使用月度历史数据，历史百分位用来描述比率在样本中的位置。",
        ],
      },
      {
        title: "从图表回到数据",
        body: [
          "先选择口径和时间范围，再把比率走势与同一时期的金价放在一起观察。遇到值得追问的区间，可以回到公式与数据来源，或下载数据用自己的方法复核。",
        ],
      },
    ],
  },
  {
    slug: "btc-beacon",
    title: "BTC Beacon · 比特币价格观察",
    summary:
      "用 AI 辅助整理和核对公开的 BTC 行情，观察不同时期的涨跌与波动，并与链上实现价格和长期均线对照。",
    description:
      "从公开市场数据出发，研究比特币的长期价格表现、波动风险和潜在投资价值。",
    status: "已上线 / 可体验",
    year: "2026",
    type: "价格研究 / 交互看板",
    tags: ["比特币", "价格研究", "数据可视化", "AI 协作"],
    stack: ["Codex", "ChatGPT Sites", "公开市场数据"],
    demo: {
      href: "/demos/btc-beacon",
      label: "打开历史价格看板",
    },
    links: [],
    facts: [
      { label: "数据频率", value: "公开日线行情，历史看板按月抽样" },
      { label: "核心参考", value: "链上实现价格、200 日几何均价、200 周简单均线" },
      { label: "观察重点", value: "历史涨跌、价格波动、与长期参考线的偏离" },
    ],
    highlights: [
      "把 BTC 价格和几个长期基准对齐到同一时间轴，方便逐期对照。",
      "切换近 12 个月、近 36 个月和全部历史，观察不同阶段的价格变化。",
      "用 AHR999、MVRV 和 200 周均线标注符合价格条件的历史样本。",
      "保留观测日期、数据来源、抽样方法和缺失值说明，方便复核。",
    ],
    sections: [
      {
        title: "为什么跟踪 BTC 价格",
        body: [
          "我想看清 BTC 在不同历史阶段是怎么涨、怎么跌的。把短期波动放到更长的时间里对照，再看过去下跌的幅度和持续时间，能给我研究它的潜在投资价值提供一部分依据。",
        ],
      },
      {
        title: "怎样对照长期参考线",
        body: [
          "链上实现价格近似反映代币最后一次链上移动时的价格。200 日几何均价和 200 周简单均线从两个时间尺度描述价格走势。把这些参考线和 BTC 行情放在一起，可以看出同一时期的价格偏离和变化方向。",
        ],
      },
      {
        title: "AI 怎么参与研究",
        body: [
          "我用 Codex 和 ChatGPT Sites 整理公开行情、核对指标定义，并把数据做成可切换时间范围的图表。想复核某段走势时，可以打开抽样数据表，对照观测日期、数值和来源。",
          "当前看板展示带日期的历史快照。观察日内或逐日波动时，需要回到更细粒度的行情数据。",
        ],
      },
    ],
  },
  {
    slug: "my-life-context",
    title: "个人上下文 · AI 决策框架",
    summary:
      "把健康、财务、学习与工作等长期记录整理成可更新、可按需提供给 AI 的上下文，让每次讨论都能从真实约束出发。",
    description:
      "我正在实践的一套个人决策方法。它围绕具体问题组织信息，让 AI 辅助比较方案、找出假设与信息缺口，再由我做出选择并复盘。",
    status: "个人实践 / 持续迭代",
    year: "2026",
    yearLabel: "实践年份",
    type: "个人知识管理 / AI 决策辅助",
    tags: ["个人上下文", "AI 决策辅助", "隐私设计"],
    stack: ["Markdown", "版本管理", "AI 对话"],
    links: [],
    facts: [
      { label: "展示内容", value: "上下文框架、协作流程与虚构案例" },
      { label: "使用场景", value: "学习投入、职业规划与其他需要权衡的个人选择" },
    ],
    highlights: [
      "把相对稳定的背景与会变化的状态分开维护，保留信息的来源、更新时间和确认状态。",
      "按当次问题挑选需要提供给 AI 的字段，让建议围绕具体目标和现实限制展开。",
      "记录当时的判断依据与实际结果，下一次遇到类似问题时可以回看。",
    ],
    sections: [
      {
        title: "上下文包含什么",
        body: [
          "每条记录可以附上来源、记录日期、确认状态和敏感程度。需要时区分可核对的记录、个人自述和待确认的信息。",
        ],
        items: [
          {
            label: "身份与文化背景",
            value: "出生背景、自我叙事与八字等传统文化兴趣。八字用于文化视角下的自我反思。",
          },
          {
            label: "健康与日常状态",
            value: "睡眠、活动和体检指标，随记录保留日期、单位和来源。",
          },
          {
            label: "财务与资源",
            value: "预算、固定支出、资金与时间约束，随实际情况更新。",
          },
          {
            label: "学习与工作",
            value: "学习背景、技能、项目经历、当前职责和正在积累的方向。",
          },
          {
            label: "目标与偏好",
            value: "近期目标、长期方向，以及做决定时在意的取舍。",
          },
        ],
      },
      {
        title: "一次决策如何进行",
        body: [
          "先写下要做的决定、截止时间，以及什么样的结果才算合适。再从上下文中抽取与问题直接相关的信息，标记过期记录和未知项。",
          "让 AI 比较可行方案，逐项说明依据、假设、代价和待确认的问题。由本人做决定，约定一个回顾时间，再把实际结果补回上下文。",
        ],
      },
      {
        title: "虚构示例 · 如何安排接下来的学习",
        body: [
          "一位全职工作者想在三个月内做出一个可演示的小工具，正在比较带作业的系统课和每周推进一个个人项目。",
        ],
        items: [
          {
            label: "本次提供的上下文",
            value: "每周能安排四小时，希望有作品可以演示，同时希望控制开销。",
          },
          {
            label: "交给 AI 的问题",
            value: "比较两种方式的时间成本、反馈频率和阶段成果，列出还需要确认的课程负担与项目范围。",
          },
          {
            label: "本人选择与复盘",
            value: "先试做两周，记录实际用时和完成度，再决定是否需要课程提供节奏与反馈。",
          },
        ],
      },
      {
        title: "公开展示与实际使用",
        body: [
          "公开作品展示字段、流程和虚构案例。原始资料由本人维护，每次对话由本人选择提供哪些信息；需要补充依据时，再明确缺少的字段。",
        ],
      },
    ],
  },
];

/**
 * 获取全部项目，并保持内容文件中定义的展示顺序。
 */
export function getAllProjects() {
  return projects;
}

/**
 * 根据 slug 查找项目详情。
 */
export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
