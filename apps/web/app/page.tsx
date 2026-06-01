import Link from "next/link";
import { ForgeCore } from "../components/ForgeCore";
import { SiteShell } from "../components/site-shell";
import { siteContent } from "../content";
import type { HomeAction, HomeFeature, HomeProject } from "../content/site";

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
 * 渲染官网首页，包含首屏、构建方向、理念、实验、构建日志和联系入口。
 */
export default function Home() {
  const home = siteContent.home;

  return (
    <SiteShell>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-content">
          <p className="eyebrow eyebrow-pill">{home.eyebrow}</p>
          <h1 id="home-title">
            在 <span>AI</span> 时代，
            <br />
            锻造有价值的产品与工具
          </h1>
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
          <p className="hero-caption">Built with AI · For the Future</p>
        </div>

        <div className="hero-visual">
          <ForgeCore />
        </div>
      </section>

      <section className="home-section build-section" aria-labelledby="build-title">
        <div className="section-row section-row-split">
          <div>
            <p className="eyebrow">{home.build.eyebrow}</p>
            <h2 id="build-title">{home.build.title}</h2>
          </div>
          <p>{home.build.description}</p>
          <Link className="text-link" href="/projects">
            查看全部项目
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
          <Link className="text-link" href="/about">
            了解更多
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
          <Link className="text-link" href="/projects">
            查看全部实验
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
          <Link className="text-link" href="/blog">
            阅读更多
          </Link>
        </div>
        <div className="writing-grid">
          {home.writing.items.map((item) => (
            <article className="writing-card" key={item.title}>
              <time>{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link className="text-link" href="/blog">
                阅读文章
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
