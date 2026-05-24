/**
 * 职责：生成官网基础 sitemap，帮助搜索引擎发现首版页面。
 */

import type { MetadataRoute } from "next";
import { siteContent } from "../content";

const routes = ["", "/projects", "/blog", "/about", "/contact"] as const;

/**
 * 生成 YiForge Studio 官网静态页面的 sitemap。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${siteContent.domain}`;

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
