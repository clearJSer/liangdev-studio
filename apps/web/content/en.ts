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
    primaryAction: { href: "/projects", label: "" },
    secondaryAction: { href: "/contact", label: "" },
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
