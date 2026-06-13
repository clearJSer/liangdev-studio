/**
 * 职责：提供构建记录页面路由，承载首版文章摘要列表。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";
import { getProjectBySlug } from "../../content/projects";
import { getAllWritingSummaries } from "../../content/writings";

export const metadata: Metadata = {
  title: siteContent.seo.blog.title,
  description: siteContent.seo.blog.description,
  keywords: siteContent.seo.blog.keywords,
  alternates: {
    canonical: "/blog",
    languages: {
      "zh-CN": "/blog",
      en: "/en/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: siteContent.seo.blog.title,
    description: siteContent.seo.blog.description,
    url: "/blog",
  },
};

/**
 * 渲染构建记录页面的首版可用结构。
 */
export default function BlogPage() {
  const writingItems = getAllWritingSummaries();
  const latestWriting = writingItems[0];

  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.blog}>
        <div className="page-stat-grid" aria-label="构建记录摘要">
          <span>
            <strong>{writingItems.length}</strong>
            篇记录
          </span>
          <span>
            <strong>{latestWriting?.date}</strong>
            最近更新
          </span>
        </div>
        <p className="page-intro-note">
          {latestWriting?.title}
        </p>
      </PageIntro>
      <section className="page-section writing-list" aria-label="构建记录列表">
        {writingItems.map((item) => (
          <Link
            className="writing-card writing-card-link"
            href={`/blog/${item.slug}`}
            key={item.slug}
          >
            <time dateTime={item.date}>{item.date}</time>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="writing-card-meta" aria-label={`${item.title} 标签`}>
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="writing-card-project">
              所属项目：{getProjectBySlug(item.projectSlug)?.title ?? "未关联项目"}
            </p>
            <span className="text-link">阅读全文</span>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
