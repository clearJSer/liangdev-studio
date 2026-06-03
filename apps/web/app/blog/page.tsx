/**
 * 职责：提供构建记录页面路由，承载首版文章摘要列表。
 */

import type { Metadata } from "next";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";

export const metadata: Metadata = {
  title: siteContent.seo.blog.title,
  description: siteContent.seo.blog.description,
  alternates: {
    canonical: "/blog",
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
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.blog} />
      <section className="page-section writing-list" aria-label="构建记录列表">
        {siteContent.home.writing.items.map((item) => (
          <article className="writing-card" key={item.title}>
            <time>{item.date}</time>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
