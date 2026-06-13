/**
 * 职责：提供 YiForge Studio 官网英文版静态页面内容。
 */

import type { SiteContent } from "./site";

export const enContent: SiteContent = {
  locale: "en",
  name: "YiForge Studio",
  domain: "liucodex.com",
  email: "clearjs@163.com",
  description:
    "YiForge Studio is an independent AI Native Builder Studio focused on AI workflows, automation tools, and shippable digital products.",
  navigation: [
    { href: "/en", label: "Home" },
    { href: "/en/projects", label: "Projects" },
    { href: "/en/blog", label: "Build Notes" },
    { href: "/en/about", label: "About" },
    { href: "/en/contact", label: "Contact" },
  ],
  contactLinks: [
    {
      href: "mailto:clearjs@163.com",
      label: "clearjs@163.com",
      description: "Best for collaborations, AI workflows, prototypes, and technical consulting.",
    },
    {
      href: "/en/projects",
      label: "View projects",
      description: "Explore what YiForge Studio is currently building.",
    },
  ],
  seo: {
    home: {
      title: "YiForge Studio | AI Native Builder Studio",
      description:
        "YiForge Studio is an independent AI Native Builder Studio focused on AI workflows, automation tools, and shippable digital products.",
      keywords: [
        "YiForge Studio",
        "AI Native Builder Studio",
        "AI workflow automation",
        "AI developer tools",
        "independent AI studio",
        "shippable digital products",
        "creative automation tools",
      ],
    },
    projects: {
      title: "Projects",
      description:
        "Explore AI products, automation workflows, and developer tool experiments from YiForge Studio.",
      keywords: [
        "YiForge Studio projects",
        "AI product experiments",
        "automation workflow projects",
        "developer tool experiments",
        "AI image workflow",
        "AI workflow engine",
      ],
    },
    blog: {
      title: "Build Notes",
      description:
        "Notes from YiForge Studio on AI workflows, agent systems, independent development, and engineering practice.",
      keywords: [
        "AI build notes",
        "AI workflow writing",
        "agent systems",
        "independent development",
        "AI native development",
        "software engineering notes",
      ],
    },
    about: {
      title: "About",
      description:
        "Learn about YiForge Studio, its working style, and its AI-native product philosophy.",
      keywords: [
        "about YiForge Studio",
        "AI native product philosophy",
        "personal AI studio",
        "independent builder",
        "build in public",
        "AI collaboration workflow",
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Contact YiForge Studio about AI tools, automation workflows, prototypes, and technical consulting.",
      keywords: [
        "contact YiForge Studio",
        "AI workflow consulting",
        "AI prototype development",
        "automation tool development",
        "Next.js consulting",
        "technical consulting",
      ],
    },
  },
  home: {
    eyebrow: "AI NATIVE BUILDER STUDIO",
    title: "Building AI-native products, workflows, and developer tools",
    description:
      "YiForge Studio turns AI workflows, software engineering, and product thinking into shippable digital products and custom tools.",
    actions: [
      { href: "/en/contact", label: "Start a conversation", variant: "primary" },
      { href: "/en/projects", label: "View projects", variant: "secondary" },
    ],
    intro: {
      eyebrow: "About YiForge Studio",
      title: "A small, real studio for AI-native building.",
      description:
        "YiForge Studio is not a traditional agency or a marketing site. It is a long-term workspace for products, experiments, build notes, and practical AI workflows.",
    },
    build: {
      eyebrow: "Product Pipeline",
      title: "Current Build Pipeline",
      description:
        "The studio website is live and evolving, while several AI workflow and creative automation tools are moving from experiments toward usable products.",
      items: [
        {
          title: "YiForge Studio Website",
          description:
            "The first public project of the studio, used to publish projects, build notes, and the AI-native working process.",
          status: "Live / Iterating",
          links: [
            {
              href: "/projects/yiforge-studio-website",
              label: "Project case",
            },
            {
              href: "/blog/building-studio-website-with-ai",
              label: "Build note",
            },
          ],
          tone: "violet",
        },
        {
          title: "AI Image Outpainting Tool",
          description:
            "A creative automation workflow for extending images into target sizes for platforms, campaigns, and content production.",
          status: "In development",
          tone: "blue",
        },
        {
          title: "AI Style Transfer Workflow",
          description:
            "Reusable visual workflows for image restoration, style transfer, and creative processing.",
          status: "In development",
          tone: "mint",
        },
        {
          title: "Family Portrait Generation",
          description:
            "Experiments around more natural portrait synthesis and family-image generation for real delivery scenarios.",
          status: "In development",
          tone: "orange",
        },
        {
          title: "AI Workflow Engine",
          description:
            "A task pipeline that combines prompts, agents, code execution, and human review into observable workflows.",
          status: "In development",
          tone: "neutral",
        },
      ],
    },
    philosophy: {
      eyebrow: "Our Philosophy",
      title: "AI is not just a tool. It is a new way to build.",
      description:
        "The studio focuses on small but real products, practical systems, and durable engineering habits instead of short-lived hype.",
      items: [
        {
          title: "AI Native",
          description:
            "Treat AI as part of the product and workflow, not as a decorative add-on.",
        },
        {
          title: "Small but Real",
          description:
            "Ship usable pieces, validate them in practice, and keep improving them.",
        },
        {
          title: "System over Hype",
          description:
            "Prefer repeatable workflows, clear constraints, and long-term compounding value.",
        },
        {
          title: "Build in Public",
          description:
            "Turn projects, decisions, and lessons into visible artifacts over time.",
        },
      ],
    },
    projects: {
      eyebrow: "Experiments",
      title: "Active Experiments",
      description:
        "A collection of AI product ideas and workflow experiments that are being tested, refined, and prepared for public case studies.",
      items: [
        {
          name: "AI Image Outpainting",
          status: "Image Workflow",
          description:
            "Extending images into specific ratios and sizes for platforms and content workflows.",
          tags: ["AI Image", "Automation"],
          tone: "landscape",
        },
        {
          name: "Photo to Anime Style",
          status: "Style Transfer",
          description:
            "Exploring automated creative processing around image repair, completion, and stylization.",
          tags: ["Image Workflow", "Creative AI"],
          tone: "portrait",
        },
        {
          name: "Family Portrait Generation",
          status: "Image Generation",
          description:
            "Testing more polished family-image generation and portrait synthesis workflows.",
          tags: ["Creative AI", "Visual Product"],
          tone: "family",
        },
        {
          name: "AI Workflow Visualization",
          status: "Workflow",
          description:
            "Breaking complex tasks into observable and reusable AI workflow steps.",
          tags: ["Agent", "Workflow"],
          tone: "flow",
        },
      ],
    },
    writing: {
      eyebrow: "Build Notes",
      title: "Writing as a build artifact",
      description:
        "Notes on AI workflows, product experiments, independent development, and the actual process of building the studio.",
      items: [],
    },
    contact: {
      eyebrow: "Stay Connected",
      title: "Start from a concrete problem.",
      description:
        "If you are exploring AI tools, automation workflows, prototypes, or technical consulting, send a short email and we can begin with the real use case.",
      actions: [
        { href: "mailto:clearjs@163.com", label: "Email" },
        { href: "/en/projects", label: "View projects" },
      ],
    },
  },
  pages: {
    projects: {
      eyebrow: "Selected Projects",
      title: "Projects",
      description:
        "AI products, automation workflows, and developer-tool experiments from YiForge Studio.",
    },
    blog: {
      eyebrow: "Latest Writing",
      title: "Build Notes",
      description:
        "Practical notes on AI workflows, agent systems, independent development, and engineering decisions.",
    },
    about: {
      eyebrow: "About YiForge",
      title: "A personal AI-native builder studio.",
      description:
        "YiForge Studio is a long-term container for software products, AI experiments, build notes, and practical workflows.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact",
      description:
        "Reach out about AI tools, automation workflows, product prototypes, or technical consulting.",
    },
  },
};
