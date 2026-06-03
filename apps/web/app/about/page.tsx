/**
 * 职责：提供关于页面路由，承载工作室背景和 Builder 叙事。
 */

import type { Metadata } from "next";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";

const principles = [
  {
    title: "从真实问题开始",
    description:
      "先确认工作流、用户场景和交付目标，再决定要不要使用 AI、自动化或更复杂的系统。",
  },
  {
    title: "快速做出可用版本",
    description:
      "优先把产品推到真实环境中验证，随后根据反馈继续打磨信息架构、体验和工程质量。",
  },
  {
    title: "把 AI 当成构建方式",
    description:
      "不仅把 AI 放进功能里，也用 AI 改善需求梳理、开发、测试、内容生产和运营流程。",
  },
] as const;

export const metadata: Metadata = {
  title: siteContent.seo.about.title,
  description: siteContent.seo.about.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: siteContent.seo.about.title,
    description: siteContent.seo.about.description,
    url: "/about",
  },
};

/**
 * 渲染关于页面的首版可用结构。
 */
export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.about} />
      <section className="page-section simple-grid" aria-label="工作室理念">
        {principles.map((item) => (
          <article className="simple-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
