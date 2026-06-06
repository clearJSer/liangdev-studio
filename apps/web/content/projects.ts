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
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: string;
  year: string;
  type: string;
  tags: string[];
  stack: string[];
  links: ProjectLink[];
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
