/**
 * 职责：生成官网基础 sitemap，帮助搜索引擎发现首版页面。
 */

import type { MetadataRoute } from "next";
import { siteContent } from "../content";
import { getAllProjects } from "../content/projects";
import { getAllWritingSummaries } from "../content/writings";

export const dynamic = "force-static";

const routes = ["", "/projects", "/blog", "/about", "/contact"] as const;
const englishRoutes = ["/en", "/en/projects", "/en/blog", "/en/about", "/en/contact"] as const;

/**
 * 生成 YiForge Studio 官网静态页面的 sitemap。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${siteContent.domain}`;
  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.7,
  }));
  const englishStaticRoutes = englishRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/en" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "/en" ? 0.9 : 0.65,
  }));
  const projectRoutes = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const writingRoutes = getAllWritingSummaries().map((writing) => ({
    url: `${baseUrl}/blog/${writing.slug}`,
    lastModified: new Date(writing.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...englishStaticRoutes, ...projectRoutes, ...writingRoutes];
}
