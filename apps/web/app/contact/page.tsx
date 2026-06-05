/**
 * 职责：提供联系页面路由，承载官网首版可用的合作入口。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";

export const metadata: Metadata = {
  title: siteContent.seo.contact.title,
  description: siteContent.seo.contact.description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: siteContent.seo.contact.title,
    description: siteContent.seo.contact.description,
    url: "/contact",
  },
};

/**
 * 渲染联系页面的首版可用结构。
 */
export default function ContactPage() {
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.contact}>
        <div className="page-stat-grid" aria-label="联系摘要">
          <span>
            <strong>{siteContent.contactLinks.length}</strong>
            联系入口
          </span>
          <span>
            <strong>Remote</strong>
            协作方式
          </span>
        </div>
        <Link className="page-intro-link" href={`mailto:${siteContent.email}`}>
          {siteContent.email}
        </Link>
      </PageIntro>
      <section className="page-section contact-detail" aria-label="联系方式">
        <div className="contact-panel contact-panel-wide">
          {siteContent.contactLinks.map((item) => (
            <Link className="contact-link-card" href={item.href} key={item.href}>
              <span>{item.label}</span>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
        <div className="contact-note">
          <strong>适合聊什么</strong>
          <p>
            AI 产品原型、自动化工作流、开发者工具、Next.js 应用、从想法到 MVP
            的技术落地。
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
