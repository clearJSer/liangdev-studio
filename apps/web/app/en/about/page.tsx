/**
 * 职责：提供英文关于页面，说明工作室定位、工作方式和长期方向。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../../components/site-shell";
import { enContent } from "../../../content/en";

export const metadata: Metadata = {
  title: enContent.seo.about.title,
  description: enContent.seo.about.description,
  alternates: {
    canonical: "/en/about",
    languages: {
      "zh-CN": "/about",
      en: "/en/about",
    },
  },
  openGraph: {
    title: enContent.seo.about.title,
    description: enContent.seo.about.description,
    url: "/en/about",
    locale: "en_US",
  },
};

const facts = [
  { label: "Studio", value: "YiForge Studio" },
  { label: "Role", value: "Builder / Maintainer" },
  { label: "Mode", value: "AI Native" },
  { label: "Status", value: "Actively building" },
] as const;

const principles = [
  {
    title: "A personal studio",
    description:
      "YiForge Studio is small by design. It gives ongoing projects, build notes, and tools a stable public home.",
  },
  {
    title: "AI-native development",
    description:
      "AI participates in research, specs, implementation, writing, debugging, and review while human judgment stays in control.",
  },
  {
    title: "Products before polish",
    description:
      "The studio favors useful, shippable artifacts over oversized plans or empty positioning.",
  },
] as const;

const workflowSteps = [
  {
    title: "Define the problem",
    description:
      "Clarify the real scenario, user, success criteria, and constraints before deciding where AI should help.",
  },
  {
    title: "Build the context",
    description:
      "Use specs, references, code, examples, and questions to make AI collaboration grounded and repeatable.",
  },
  {
    title: "Ship and review",
    description:
      "Turn the work into visible pages, tools, notes, and tests so each iteration can be inspected and improved.",
  },
] as const;

/**
 * 渲染英文关于页。
 */
export default function EnglishAboutPage() {
  return (
    <SiteShell content={enContent}>
      <PageIntro content={enContent.pages.about}>
        <dl className="about-fact-grid" aria-label="Studio facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageIntro>

      <section className="page-section about-origin" aria-labelledby="about-origin-title">
        <div className="about-section-copy">
          <p className="eyebrow">Origin</p>
          <h2 id="about-origin-title">Why this studio exists</h2>
          <p>
            AI is changing what an individual builder can create. Work that once
            required a full team across product, engineering, writing, and
            deployment can now be explored step by step with AI collaboration.
          </p>
          <p>
            YiForge Studio is my response to that shift: a place to build real
            products, document the process, and turn practical AI workflows into
            reusable systems.
          </p>
        </div>
        <div className="about-keyword-list" aria-label="Studio principles">
          {principles.map((principle) => (
            <article className="about-keyword-card" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section about-workflow" aria-labelledby="about-workflow-title">
        <div className="about-section-heading">
          <p className="eyebrow">Working Mode</p>
          <h2 id="about-workflow-title">The AI-native workflow</h2>
          <p>
            The studio treats AI collaboration as a full development process:
            define the problem, prepare context, implement carefully, verify the
            result, and publish what was learned.
          </p>
        </div>
        <ol className="about-workflow-list" aria-label="AI-native workflow">
          {workflowSteps.map((step, index) => (
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

      <section className="page-section about-contact-note" aria-label="Contact link">
        <p>
          If you want to understand the studio through current work, start with
          the project page or send a short email.
        </p>
        <Link className="text-link" href="/en/contact">
          Go to contact
        </Link>
      </section>
    </SiteShell>
  );
}
