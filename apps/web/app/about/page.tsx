/**
 * 职责：提供关于页面路由，承载工作室背景和 Builder 叙事。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";
import { getProjectBySlug } from "../../content/projects";

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
  const websiteProject = getProjectBySlug("yiforge-studio-website");

  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.about}>
        <div className="page-stat-grid" aria-label="工作方式摘要">
          <span>
            <strong>{principles.length}</strong>
            构建原则
          </span>
          <span>
            <strong>{siteContent.home.philosophy.items.length}</strong>
            长期理念
          </span>
        </div>
        <div className="page-chip-list" aria-label="工作室关键词">
          {siteContent.home.philosophy.items.map((item) => (
            <span key={item.title}>{item.title}</span>
          ))}
        </div>
      </PageIntro>
      <section className="page-section simple-grid" aria-label="工作室理念">
        {principles.map((item) => (
          <article className="simple-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
      {websiteProject ? (
        <section className="page-section about-feature" aria-label="工作室官网项目">
          <div>
            <p className="eyebrow">First Project</p>
            <h2>{websiteProject.title}</h2>
            <p>{websiteProject.summary}</p>
          </div>
          <Link className="text-link" href={`/projects/${websiteProject.slug}`}>
            查看第一个项目
          </Link>
        </section>
      ) : null}
    </SiteShell>
  );
}
