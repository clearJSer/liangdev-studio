/**
 * 职责：提供关于页面路由，表达工作室初心、主理人定位和 AI Native 构建方式。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";
import { aboutContent } from "../../content/about";

export const metadata: Metadata = {
  title: "关于",
  description:
    "了解 YiForge Studio 的初心、主理人定位、AI Native 协作方式，以及这个个人 AI 工作室如何持续构建真实项目。",
  keywords: siteContent.seo.about.keywords,
  alternates: {
    canonical: "/about",
    languages: {
      "zh-CN": "/about",
      en: "/en/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "关于",
    description:
      "了解 YiForge Studio 的初心、主理人定位、AI Native 协作方式，以及这个个人 AI 工作室如何持续构建真实项目。",
    url: "/about",
  },
};

/**
 * 渲染关于页，连接工作室初心、主理人定位和 AI 协作方式。
 */
export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro content={aboutContent.hero}>
        <dl className="about-fact-grid" aria-label="工作室摘要">
          {aboutContent.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageIntro>

      <section className="page-section about-origin" aria-labelledby="about-origin-title">
        <div className="about-section-copy">
          <p className="eyebrow">{aboutContent.origin.eyebrow}</p>
          <h2 id="about-origin-title">{aboutContent.origin.title}</h2>
          {aboutContent.origin.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-keyword-list" aria-label="初心关键词">
          {aboutContent.keywords.map((keyword) => (
            <article className="about-keyword-card" key={keyword.title}>
              <h3>{keyword.title}</h3>
              <p>{keyword.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="page-section about-definition"
        aria-labelledby="about-definition-title"
      >
        <div className="about-section-copy">
          <p className="eyebrow">{aboutContent.definition.eyebrow}</p>
          <h2 id="about-definition-title">{aboutContent.definition.title}</h2>
          {aboutContent.definition.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="about-contrast-list" aria-label="工作室边界">
          {aboutContent.definition.contrasts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="about-direction-inline">
          <p className="eyebrow">{aboutContent.directions.eyebrow}</p>
          <h3>{aboutContent.directions.title}</h3>
          <p>{aboutContent.directions.description}</p>
          <ul aria-label="长期构建方向">
            {aboutContent.directions.items.map((item) => (
              <li key={item.title}>{item.title}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section about-workflow" aria-labelledby="about-workflow-title">
        <div className="about-section-heading">
          <p className="eyebrow">{aboutContent.workflow.eyebrow}</p>
          <h2 id="about-workflow-title">{aboutContent.workflow.title}</h2>
          <p>{aboutContent.workflow.description}</p>
        </div>
        <ol className="about-workflow-list" aria-label="AI 协作流程">
          {aboutContent.workflow.steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="page-section about-ledger" aria-labelledby="about-ledger-title">
        <div className="about-section-copy">
          <p className="eyebrow">{aboutContent.ledger.eyebrow}</p>
          <h2 id="about-ledger-title">{aboutContent.ledger.title}</h2>
          <p>{aboutContent.ledger.description}</p>
        </div>
        <dl className="about-ledger-list" aria-label="工作室成本账单">
          {aboutContent.ledger.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                <strong>{item.value}</strong>
                <span>{item.year}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="page-section about-contact-note" aria-label="联系入口">
        <p>{aboutContent.contact.text}</p>
        <Link className="text-link" href={aboutContent.contact.href}>
          {aboutContent.contact.label}
        </Link>
      </section>
    </SiteShell>
  );
}
