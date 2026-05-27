import Link from "next/link";
import { SiteShell } from "../components/site-shell";
import { siteContent } from "../content";
import type { HomeAction } from "../content/site";

/**
 * 将首页行动入口映射为对应的按钮样式。
 */
function getActionClassName(action: HomeAction) {
  return `button button-${action.variant}`;
}

/**
 * 渲染官网中文首页 V0，包含首屏、工作室介绍、构建方向、项目预览、构建记录和联系入口。
 */
export default function Home() {
  const home = siteContent.home;

  return (
    <SiteShell>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-content">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1 id="home-title">{home.title}</h1>
          <p>{home.description}</p>
          <div className="hero-actions" aria-label="首页操作">
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
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="signal-panel">
            <div className="signal-ring signal-ring-outer" />
            <div className="signal-ring signal-ring-inner" />
            <span className="signal-flow signal-flow-one" />
            <span className="signal-flow signal-flow-two" />
            <span className="signal-flow signal-flow-three" />
            <span className="signal-node signal-node-input" />
            <span className="signal-node signal-node-agent" />
            <span className="signal-node signal-node-tool" />
            <span className="signal-node signal-node-output" />
            <span className="signal-label signal-label-one">AI Workflow</span>
            <span className="signal-label signal-label-two">Agent</span>
            <span className="signal-label signal-label-three">Automation</span>
            <span className="signal-core">
              <span>YF</span>
              <small>Studio Core</small>
            </span>
          </div>
        </div>
      </section>

      <section className="home-section intro-section" aria-labelledby="intro-title">
        <p className="eyebrow">{home.intro.eyebrow}</p>
        <div className="section-heading">
          <h2 id="intro-title">{home.intro.title}</h2>
          <p>{home.intro.description}</p>
        </div>
      </section>

      <section className="home-section" aria-labelledby="build-title">
        <p className="eyebrow">{home.build.eyebrow}</p>
        <div className="section-heading">
          <h2 id="build-title">{home.build.title}</h2>
          <p>{home.build.description}</p>
        </div>
        <div className="feature-grid">
          {home.build.items.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="projects-title">
        <div className="section-row">
          <div>
            <p className="eyebrow">{home.projects.eyebrow}</p>
            <div className="section-heading">
              <h2 id="projects-title">{home.projects.title}</h2>
              <p>{home.projects.description}</p>
            </div>
          </div>
          <Link className="button button-secondary" href="/projects">
            查看全部
          </Link>
        </div>
        <div className="project-grid">
          {home.projects.items.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="card-meta">
                <span>{project.status}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tag-list" aria-label={`${project.name} 技术标签`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="writing-title">
        <p className="eyebrow">{home.writing.eyebrow}</p>
        <div className="section-heading">
          <h2 id="writing-title">{home.writing.title}</h2>
          <p>{home.writing.description}</p>
        </div>
        <div className="writing-list">
          {home.writing.items.map((item) => (
            <article className="writing-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section contact-section" aria-labelledby="contact-title">
        <p className="eyebrow">{home.contact.eyebrow}</p>
        <div className="section-heading">
          <h2 id="contact-title">{home.contact.title}</h2>
          <p>{home.contact.description}</p>
        </div>
        <div className="hero-actions" aria-label="联系入口">
          {home.contact.actions.map((action) => (
            <Link className="button button-secondary" href={action.href} key={action.href}>
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
