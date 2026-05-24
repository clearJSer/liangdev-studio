/**
 * 职责：提供 YiForge Studio 官网首版中文内容。
 */

import type { SiteContent } from "./site";

export const zhContent: SiteContent = {
  locale: "zh",
  name: "YiForge Studio",
  domain: "liucodex.com",
  description:
    "YiForge Studio 是一个独立 AI Native Builder Studio，专注探索 AI 工作流、自动化工具和数字产品。",
  navigation: [
    { href: "/", label: "首页" },
    { href: "/projects", label: "项目" },
    { href: "/blog", label: "博客" },
    { href: "/about", label: "关于" },
    { href: "/contact", label: "联系" },
  ],
  home: {
    eyebrow: "AI Native Builder Studio",
    title: "构建 AI 工作流、创意自动化工具和数字产品。",
    description:
      "YiForge Studio 是一个持续演化的独立开发工作室，关注真实可用的 AI Native 系统、开发者工具和长期复利型产品。",
    primaryAction: { href: "/projects", label: "查看项目" },
    secondaryAction: { href: "/contact", label: "联系合作" },
  },
  pages: {
    projects: {
      eyebrow: "Selected Projects",
      title: "项目",
      description: "这里会逐步沉淀真实项目、技术实验和小型 Case Study。",
    },
    blog: {
      eyebrow: "Latest Writing",
      title: "博客",
      description: "这里会记录 AI Workflow、Agent 系统、独立开发和工程实践。",
    },
    about: {
      eyebrow: "About YiForge",
      title: "关于",
      description: "这里会介绍 YiForge Studio 的背景、理念和正在探索的方向。",
    },
    contact: {
      eyebrow: "Contact",
      title: "联系",
      description: "这里会放置邮箱、GitHub、X / Twitter 和后续合作入口。",
    },
  },
};
