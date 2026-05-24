/**
 * 职责：提供博客页面路由，后续承载文章列表和构建记录。
 */

import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";

/**
 * 渲染博客页面的首版占位结构。
 */
export default function BlogPage() {
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.blog} />
    </SiteShell>
  );
}
