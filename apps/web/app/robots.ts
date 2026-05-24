/**
 * 职责：生成官网 robots 配置，允许搜索引擎抓取公开页面。
 */

import type { MetadataRoute } from "next";
import { siteContent } from "../content";

/**
 * 生成 YiForge Studio 官网 robots.txt。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${siteContent.domain}/sitemap.xml`,
  };
}
