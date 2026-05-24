/**
 * 职责：提供关于页面路由，后续承载工作室背景和 Builder 叙事。
 */

import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";

/**
 * 渲染关于页面的首版占位结构。
 */
export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.about} />
    </SiteShell>
  );
}
