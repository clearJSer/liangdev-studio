/**
 * 职责：提供英文构建记录列表页面，展示当前文章入口和后续英文内容说明。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../../components/site-shell";
import { enContent } from "../../../content/en";
import { getProjectBySlug } from "../../../content/projects";
import { getAllWritingSummaries } from "../../../content/writings";

export const metadata: Metadata = {
  title: enContent.seo.blog.title,
  description: enContent.seo.blog.description,
  alternates: {
    canonical: "/en/blog",
    languages: {
      "zh-CN": "/blog",
      en: "/en/blog",
    },
  },
  openGraph: {
    title: enContent.seo.blog.title,
    description: enContent.seo.blog.description,
    url: "/en/blog",
    locale: "en_US",
  },
};

/**
 * 渲染英文构建记录页，先桥接现有中文文章。
 */
export default function EnglishBlogPage() {
  const writingItems = getAllWritingSummaries();
  const latestWriting = writingItems[0];

  return (
    <SiteShell content={enContent}>
      <PageIntro content={enContent.pages.blog}>
        <div className="page-stat-grid" aria-label="Build note summary">
          <span>
            <strong>{writingItems.length}</strong>
            Notes
          </span>
          <span>
            <strong>{latestWriting?.date}</strong>
            Latest update
          </span>
        </div>
        <p className="page-intro-note">
          English notes will be published gradually. Current articles are
          available in Chinese.
        </p>
      </PageIntro>
      <section className="page-section writing-list" aria-label="Build note list">
        {writingItems.map((item) => (
          <Link
            className="writing-card writing-card-link"
            href={`/blog/${item.slug}`}
            key={item.slug}
          >
            <time dateTime={item.date}>{item.date}</time>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="writing-card-meta" aria-label={`${item.title} tags`}>
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="writing-card-project">
              Linked project:{" "}
              {getProjectBySlug(item.projectSlug)?.title ?? "Unlinked project"}
            </p>
            <span className="text-link">Read Chinese note</span>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
