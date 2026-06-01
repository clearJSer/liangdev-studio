/**
 * 职责：预留 YiForge Studio 官网英文内容结构，后续再填充正式英文文案。
 */

import type { SiteContent } from "./site";

export const enContent: SiteContent = {
  locale: "en",
  name: "YiForge Studio",
  domain: "liucodex.com",
  description: "",
  navigation: [
    { href: "/", label: "" },
    { href: "/projects", label: "" },
    { href: "/blog", label: "" },
    { href: "/about", label: "" },
    { href: "/contact", label: "" },
  ],
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
