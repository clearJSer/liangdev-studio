/**
 * 职责：预留 YiForge Studio 官网英文内容结构，后续再填充正式英文文案。
 */

import type { SiteContent } from "./site";

export const enContent: SiteContent = {
  locale: "en",
  name: "YiForge Studio",
  domain: "liucodex.com",
  email: "hello@liucodex.com",
  description:
    "YiForge Studio is an independent AI Native Builder Studio focused on AI workflows, automation tools, and shippable digital products.",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Notes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  contactLinks: [
    {
      href: "mailto:hello@liucodex.com",
      label: "hello@liucodex.com",
      description: "Best for collaborations, AI workflows, prototypes, and technical consulting.",
    },
    {
      href: "/projects",
      label: "View projects",
      description: "Explore what YiForge Studio is currently building.",
    },
  ],
  seo: {
    home: {
      title: "YiForge Studio | AI Native Builder Studio",
      description:
        "YiForge Studio is an independent AI Native Builder Studio focused on AI workflows, automation tools, and shippable digital products.",
    },
    projects: {
      title: "Projects",
      description:
        "Explore AI products, automation workflows, and developer tool experiments from YiForge Studio.",
    },
    blog: {
      title: "Build Notes",
      description:
        "Notes from YiForge Studio on AI workflows, agent systems, independent development, and engineering practice.",
    },
    about: {
      title: "About",
      description:
        "Learn about YiForge Studio, its working style, and its AI-native product philosophy.",
    },
    contact: {
      title: "Contact",
      description:
        "Contact YiForge Studio about AI tools, automation workflows, prototypes, and technical consulting.",
    },
  },
  home: {
    eyebrow: "",
    title: "",
    description: "",
    actions: [
      { href: "/projects", label: "", variant: "primary" },
      { href: "/blog", label: "", variant: "secondary" },
      { href: "/contact", label: "", variant: "ghost" },
    ],
    intro: {
      eyebrow: "",
      title: "",
      description: "",
    },
    build: {
      eyebrow: "",
      title: "",
      description: "",
      items: [],
    },
    philosophy: {
      eyebrow: "",
      title: "",
      description: "",
      items: [],
    },
    projects: {
      eyebrow: "",
      title: "",
      description: "",
      items: [],
    },
    writing: {
      eyebrow: "",
      title: "",
      description: "",
      items: [],
    },
    contact: {
      eyebrow: "",
      title: "",
      description: "",
      actions: [],
    },
  },
  pages: {
    projects: {
      eyebrow: "",
      title: "",
      description: "",
    },
    blog: {
      eyebrow: "",
      title: "",
      description: "",
    },
    about: {
      eyebrow: "",
      title: "",
      description: "",
    },
    contact: {
      eyebrow: "",
      title: "",
      description: "",
    },
  },
};
