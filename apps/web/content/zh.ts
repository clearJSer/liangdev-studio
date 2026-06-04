/**
 * 职责：提供 YiForge Studio 官网首版中文内容。
 */

import type { SiteContent } from "./site";

export const zhContent: SiteContent = {
  locale: "zh",
  name: "YiForge Studio",
  domain: "liucodex.com",
  email: "clearjs@163.com",
  description:
    "YiForge Studio 是深耕 AI-Native 体系的独立研发工作室，交付可商业化上线的软件与定制化工具。",
  navigation: [
    { href: "/", label: "首页" },
    { href: "/projects", label: "项目" },
    { href: "/blog", label: "构建记录" },
    { href: "/about", label: "关于" },
    { href: "/contact", label: "联系" },
  ],
  contactLinks: [
    {
      href: "mailto:clearjs@163.com",
      label: "clearjs@163.com",
      description: "适合项目合作、产品原型、AI 工作流和技术咨询。",
    },
    {
      href: "/projects",
      label: "查看项目",
      description: "先了解 YiForge Studio 正在构建和探索的方向。",
    },
  ],
  seo: {
    home: {
      title: "YiForge Studio | AI Native Builder Studio",
      description:
        "YiForge Studio 是深耕 AI-Native 体系的独立研发工作室，交付可商业化上线的软件与定制化工具。",
    },
    projects: {
      title: "项目",
      description:
        "查看 YiForge Studio 正在构建的 AI 产品、自动化工作流和开发者工具实验。",
    },
    blog: {
      title: "构建记录",
      description:
        "记录 YiForge Studio 关于 AI Workflow、Agent 系统、独立开发和工程实践的思考。",
    },
    about: {
      title: "关于",
      description:
        "了解 YiForge Studio 的定位、工作方式和 AI-native 产品构建理念。",
    },
    contact: {
      title: "联系",
      description:
        "联系 YiForge Studio，讨论 AI 工具、自动化工作流、产品原型和技术咨询合作。",
    },
  },
  home: {
    eyebrow: "AI NATIVE BUILDER STUDIO",
    title: "立足 AI 新世代，以 AI-Native 范式锻造产品与工具",
    description:
      "YiForge Studio 是深耕 AI-Native 体系的独立研发工作室。我们跳出传统软件工程的固有范式，依托全链路 AI 工作流，将智能能力锚定真实业务链路，交付可商业化上线的软件与定制化工具。",
    actions: [
      { href: "/contact", label: "联系合作", variant: "primary" },
      { href: "/projects", label: "范式案例", variant: "secondary" },
    ],
    intro: {
      eyebrow: "关于 YiForge Studio",
      title: "一个正在生长的个人 AI 工作室。",
      description:
        "它不是传统软件公司，也不是单纯的个人博客。它更像一个长期创作容器，用来放置我正在构建的软件作品、AI 实验、项目复盘和未来产品。",
    },
    build: {
      eyebrow: "Currently Building",
      title: "正在探索与构建",
      description:
        "我们正在构建一系列 AI-native 的产品与工具，解决真实世界的问题。",
      items: [
        {
          title: "图片自动延展",
          description: "用 AI 智能扩展图片边界，适配不同尺寸需求。",
          status: "In Progress",
          tone: "violet",
        },
        {
          title: "AI 风格转换",
          description: "将图片转换为多种风格，让创意表达更自由。",
          status: "Exploring",
          tone: "blue",
        },
        {
          title: "全家福生成",
          description: "根据碎片生成更自然的全家福，保留每个人的独特特征。",
          status: "Concepting",
          tone: "mint",
        },
        {
          title: "AI 工作流引擎",
          description: "构建可复用的 AI 工作流，提升开发与创作效率。",
          status: "Building",
          tone: "orange",
        },
        {
          title: "更多实验",
          description: "更多有趣的想法正在孵化中。",
          status: "Coming Soon",
          tone: "neutral",
        },
      ],
    },
    philosophy: {
      eyebrow: "Our Philosophy",
      title: "我们的理念",
      description: "我们相信，AI 不是工具，而是一种新的构建方式。",
      items: [
        {
          title: "AI Native",
          description: "以 AI 为核心，让智能成为产品与工作流的一部分。",
        },
        {
          title: "长期创造",
          description: "持续构建，长期迭代，创造真正有价值的工具。",
        },
        {
          title: "极致专注",
          description: "聚焦解决真实问题，追求产品的完整体验。",
        },
        {
          title: "开放协作",
          description: "开放透明，乐于分享，期待与优秀的人合作。",
        },
      ],
    },
    projects: {
      eyebrow: "Experiments",
      title: "实验探索",
      description:
        "一些正在进行的实验与探索，记录 AI 创造的无限可能。",
      items: [
        {
          name: "图片自动延展",
          status: "AI 图像扩展",
          description:
            "探索用 AI 将图片扩展到指定像素比例，适配 App、平台和上传场景中的固定尺寸要求。",
          tags: ["AI Image", "Node", "Gemini"],
          tone: "landscape",
        },
        {
          name: "照片转动漫风格",
          status: "AI 风格转换",
          description:
            "围绕图像修复、内容补全和创意处理流程，探索更自动化的图片处理工具。",
          tags: ["Image Workflow", "Automation"],
          tone: "portrait",
        },
        {
          name: "全家福质感生成",
          status: "AI 图像生成",
          description:
            "尝试把真实照片转成更具质感的家庭影像、动漫风格或其他创意表达。",
          tags: ["Creative AI", "Visual Product"],
          tone: "family",
        },
        {
          name: "AI 工作流可视化",
          status: "Workflow",
          description:
            "把复杂任务拆解成可观察、可复用、可迭代的 AI 工作流。",
          tags: ["Agent", "Workflow"],
          tone: "flow",
        },
      ],
    },
    writing: {
      eyebrow: "Thoughts",
      title: "构建记录",
      description:
        "记录思考、实践与复盘，探索 AI 开发的更多可能性。",
      items: [
        {
          title: "AI 协作开发的一些经验",
          description: "整理使用 AI 参与需求、代码、调试和工程决策的真实经验。",
          date: "2025 / 05 / 18",
        },
        {
          title: "图片自动延展的技术思路",
          description: "记录从业务问题到 AI 图片工作流原型的探索过程。",
          date: "2025 / 05 / 10",
        },
        {
          title: "Prompt Engineering 实战指南",
          description: "构建更高效的 Prompt，让 AI 更好地理解你的意图。",
          date: "2025 / 05 / 02",
        },
        {
          title: "AI-native 开发的新范式",
          description: "持续观察 AI 工具如何改变个人开发者的产品构建方式。",
          date: "2025 / 04 / 25",
        },
      ],
    },
    contact: {
      eyebrow: "Stay Connected",
      title: "保持联系",
      description:
        "如果你正在评估 AI 工具、自动化工作流、产品原型或技术咨询，可以先发一封简短邮件，我们从具体问题聊起。",
      actions: [
        { href: "mailto:clearjs@163.com", label: "发送邮件" },
        { href: "/projects", label: "查看项目" },
      ],
    },
  },
  pages: {
    projects: {
      eyebrow: "Selected Projects",
      title: "项目",
      description:
        "这里沉淀 YiForge Studio 正在构建的 AI 产品、自动化工作流和开发者工具实验。",
    },
    blog: {
      eyebrow: "Latest Writing",
      title: "构建记录",
      description:
        "这里记录 AI Workflow、Agent 系统、独立开发和工程实践中的真实思考。",
    },
    about: {
      eyebrow: "About YiForge",
      title: "关于",
      description:
        "YiForge Studio 是一个专注 AI-native 产品与工作流的独立构建工作室。",
    },
    contact: {
      eyebrow: "Contact",
      title: "联系",
      description:
        "如果你想讨论 AI 工具、自动化工作流、产品原型或技术咨询，可以从一封邮件开始。",
    },
  },
};
