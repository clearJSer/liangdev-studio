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
    title: "YiForge Studio",
    description:
      "一个持续创造 AI-native 产品、工作流和开发者工具的独立开发工作室。",
    actions: [
      { href: "/projects", label: "查看项目", variant: "primary" },
      { href: "/blog", label: "阅读博客", variant: "secondary" },
      { href: "/contact", label: "联系我", variant: "ghost" },
    ],
    intro: {
      eyebrow: "关于 YiForge Studio",
      title: "一个正在生长的个人 AI 工作室。",
      description:
        "它不是传统软件公司，也不是单纯的个人博客。它更像一个长期创作容器，用来放置我正在构建的软件作品、AI 实验、项目复盘和未来产品。",
    },
    build: {
      eyebrow: "What I Build",
      title: "我正在构建什么",
      description:
        "当前不限定平台、语言或产品形态，重点围绕 AI Native、自动化、创意工作流和开发者效率持续探索。",
      items: [
        {
          title: "AI Native Products",
          description: "用 AI 协作方式构建更快、更灵活的软件产品。",
        },
        {
          title: "Creative Automation",
          description: "探索图片、内容和创意生产流程的自动化。",
        },
        {
          title: "Agent Workflows",
          description: "尝试把复杂任务拆解成可执行、可迭代的 AI 工作流。",
        },
        {
          title: "Developer Tools",
          description: "沉淀提高开发效率的小工具、脚手架和工程实践。",
        },
      ],
    },
    projects: {
      eyebrow: "Projects Preview",
      title: "正在孵化的项目",
      description:
        "项目还在持续孵化中。第一批内容会围绕 AI 图片处理、创意自动化和 AI 协作开发展开。",
      items: [
        {
          name: "图片自动延展",
          status: "Prototype",
          description:
            "探索用 AI 将图片扩展到指定像素比例，适配 App、平台和上传场景中的固定尺寸要求。",
          tags: ["AI Image", "Node", "Gemini"],
        },
        {
          name: "图片去水印探索",
          status: "Exploring",
          description:
            "围绕图像修复、内容补全和创意处理流程，探索更自动化的图片处理工具。",
          tags: ["Image Workflow", "Automation"],
        },
        {
          name: "照片风格生成",
          status: "Planned",
          description:
            "尝试把真实照片转成更具质感的家庭影像、动漫风格或其他创意表达。",
          tags: ["Creative AI", "Visual Product"],
        },
      ],
    },
    writing: {
      eyebrow: "Build Notes",
      title: "构建记录",
      description:
        "我会记录项目开发过程、AI 协作经验、工具使用方法，以及从前端开发转向 AI Native 开发过程中的思考。",
      items: [
        {
          title: "AI 协作开发的一些经验",
          description: "整理使用 AI 参与需求、代码、调试和工程决策的真实经验。",
        },
        {
          title: "图片自动延展的产品与技术思路",
          description: "记录从业务问题到 AI 图片工作流原型的探索过程。",
        },
        {
          title: "AI 开发新范式的个人观察",
          description: "持续观察 AI 工具如何改变个人开发者的产品构建方式。",
        },
      ],
    },
    contact: {
      eyebrow: "Stay Connected",
      title: "保持联系",
      description:
        "如果你对 AI 工具、自动化工作流、软件产品或我的项目感兴趣，可以通过下面的入口继续了解 YiForge Studio。",
      actions: [
        { href: "/contact", label: "联系页面" },
        { href: "/projects", label: "查看项目" },
      ],
    },
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
