/**
 * 职责：提供 YiForge Studio 英文首页路由，承载英文首屏、项目管线和联系入口。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ForgeCore } from "../../components/ForgeCore";
import { HomeFlightsGlobeBackground } from "../../components/ProjectsFlightsGlobe";
import { SiteShell } from "../../components/site-shell";
import { enContent } from "../../content/en";
import type { HomeAction, HomeFeature, HomeProject } from "../../content/site";
import { getAllWritingSummaries } from "../../content/writings";

export const metadata: Metadata = {
  title: {
    absolute: enContent.seo.home.title,
  },
  description: enContent.seo.home.description,
  alternates: {
    canonical: "/en",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: enContent.seo.home.title,
    description: enContent.seo.home.description,
    url: "/en",
    locale: "en_US",
  },
};

/**
 * 将首页行动入口映射为对应的按钮样式。
 */
function getActionClassName(action: HomeAction) {
  return `button button-${action.variant}`;
}

/**
 * 将构建中项目的视觉色调映射为卡片类名。
 */
function getFeatureToneClassName(item: HomeFeature) {
  return `build-card build-card-${item.tone}`;
}

/**
 * 将实验项目的视觉占位图色调映射为类名。
 */
function getProjectMediaClassName(project: HomeProject) {
  return `experiment-media experiment-media-${project.tone}`;
}

/**
 * 渲染英文首页，复用中文站的视觉结构并接入英文内容。
 */
export default function EnglishHomePage() {
  const home = enContent.home;
  const writingItems = getAllWritingSummaries();

  return (
    <SiteShell content={enContent}>
      <section className="hero" aria-labelledby="home-title">
        <HomeFlightsGlobeBackground />

        <div className="hero-inner">
          <div className="hero-content">
            <p className="eyebrow eyebrow-pill">{home.eyebrow}</p>
            <h1 id="home-title">
              <span className="hero-title-desktop">
                Building AI-native
                <br />
                products, workflows,
                <br />
                and developer tools
              </span>
              <span className="hero-title-mobile">
                Building AI-native
                <br />
                products and tools
              </span>
            </h1>
            <p className="hero-description hero-description-desktop">
              {home.description}
            </p>
            <p className="hero-description hero-description-mobile">
              AI workflows, engineering practice, and product thinking turned
              into shippable software.
            </p>
            <div className="hero-actions" aria-label="Home actions">
              {home.actions.map((action) => (
                <Link
                  className={getActionClassName(action)}
                  href={action.href}
                  key={action.href}
                >
                  {action.label}
                </Link>
              ))}
            </div>
            <p className="hero-caption">
              Built with AI-Native · Shaping Next Development
            </p>
          </div>

          <div className="studio-os-panel" aria-label="AI Studio OS product pipeline">
            <div className="studio-panel-head">
              <div>
                <span>YiForge Studio OS</span>
                <strong>Live product pipeline</strong>
              </div>
              <em>Alpha</em>
            </div>
            <div className="studio-panel-grid" aria-hidden="true">
              <span>Prompt</span>
              <span>Agent</span>
              <span>Code</span>
            </div>
            <div className="studio-panel-body">
              <div className="studio-core-wrap" aria-hidden="true">
                <ForgeCore />
                <span className="stage-node stage-node-idea">Idea</span>
                <span className="stage-node stage-node-workflow">Workflow</span>
                <span className="stage-node stage-node-agent">Agent</span>
                <span className="stage-node stage-node-launch">Launch</span>
              </div>
              <div className="studio-pipeline" aria-hidden="true">
                <span>
                  <strong>01</strong>
                  Idea
                </span>
                <span>
                  <strong>02</strong>
                  Workflow
                </span>
                <span>
                  <strong>03</strong>
                  Prototype
                </span>
                <span>
                  <strong>04</strong>
                  Launch
                </span>
              </div>
            </div>
            <div className="studio-panel-tags" aria-hidden="true">
              <span>Workflow</span>
              <span>Agent</span>
              <span>Product</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section build-section" aria-labelledby="build-title">
        <div className="section-row section-row-split">
          <div>
            <p className="eyebrow">{home.build.eyebrow}</p>
            <h2 id="build-title">{home.build.title}</h2>
          </div>
          <p>{home.build.description}</p>
          <Link className="text-link" href="/en/projects">
            View all projects
          </Link>
        </div>
        <div className="build-grid">
          {home.build.items.map((item, index) => (
            <article className={getFeatureToneClassName(item)} key={item.title}>
              <span className="build-icon" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.links ? (
                <div className="build-card-links">
                  {item.links.map((link) => (
                    <Link className="text-link" href={link.href} key={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
              <span className="build-status">{item.status}</span>
              <span className="progress-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-section philosophy-section"
        aria-labelledby="philosophy-title"
      >
        <div className="section-intro">
          <p className="eyebrow">{home.philosophy.eyebrow}</p>
          <h2 id="philosophy-title">{home.philosophy.title}</h2>
          <p>{home.philosophy.description}</p>
          <Link className="text-link" href="/en/about">
            Learn more
          </Link>
        </div>
        <div className="principle-grid">
          {home.philosophy.items.map((item, index) => (
            <article className="principle-item" key={item.title}>
              <span aria-hidden="true">{`0${index + 1}`}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-section experiments-section"
        aria-labelledby="projects-title"
      >
        <div className="section-intro">
          <p className="eyebrow">{home.projects.eyebrow}</p>
          <h2 id="projects-title">{home.projects.title}</h2>
          <p>{home.projects.description}</p>
          <Link className="text-link" href="/en/projects">
            View all experiments
          </Link>
        </div>
        <div className="experiment-grid">
          {home.projects.items.map((project) => (
            <article className="experiment-card" key={project.name}>
              <div className={getProjectMediaClassName(project)}>
                <span />
              </div>
              <h3>{project.name}</h3>
              <span className="experiment-status">{project.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-section thoughts-section"
        aria-labelledby="writing-title"
      >
        <div className="section-intro">
          <p className="eyebrow">{home.writing.eyebrow}</p>
          <h2 id="writing-title">{home.writing.title}</h2>
          <p>{home.writing.description}</p>
          <Link className="text-link" href="/en/blog">
            Read more
          </Link>
        </div>
        <div className="writing-grid">
          {writingItems.map((item) => (
            <article className="writing-card" key={item.slug}>
              <time dateTime={item.date}>{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <Link className="text-link" href={`/blog/${item.slug}`}>
                Read Chinese note
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-section contact-section"
        aria-labelledby="home-contact-title"
      >
        <div className="section-intro">
          <p className="eyebrow">{home.contact.eyebrow}</p>
          <h2 id="home-contact-title">{home.contact.title}</h2>
          <p>{home.contact.description}</p>
        </div>
        <div className="contact-panel">
          {enContent.contactLinks.map((item) => (
            <Link className="contact-link-card" href={item.href} key={item.href}>
              <span>{item.label}</span>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
