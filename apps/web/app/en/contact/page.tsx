/**
 * 职责：提供英文联系页面，承载合作入口和适合讨论的主题。
 */

import Link from "next/link";
import { PageIntro, SiteShell } from "../../../components/site-shell";
import { enContent } from "../../../content/en";
import { createEnglishMetadata } from "../metadata";

export const metadata = createEnglishMetadata({
  path: "/en/contact",
  seo: enContent.seo.contact,
  zhPath: "/contact",
});

/**
 * 渲染英文联系页面。
 */
export default function EnglishContactPage() {
  return (
    <SiteShell content={enContent}>
      <PageIntro content={enContent.pages.contact}>
        <div className="page-stat-grid" aria-label="Contact summary">
          <span>
            <strong>{enContent.contactLinks.length}</strong>
            Contact paths
          </span>
          <span>
            <strong>Remote</strong>
            Working mode
          </span>
        </div>
        <Link className="page-intro-link" href={`mailto:${enContent.email}`}>
          {enContent.email}
        </Link>
      </PageIntro>
      <section className="page-section contact-detail" aria-label="Contact details">
        <div className="contact-panel contact-panel-wide">
          {enContent.contactLinks.map((item) => (
            <Link className="contact-link-card" href={item.href} key={item.href}>
              <span>{item.label}</span>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
        <div className="contact-note">
          <strong>Good topics to discuss</strong>
          <p>
            AI product prototypes, automation workflows, developer tools,
            Next.js applications, and turning an idea into a small but real MVP.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
