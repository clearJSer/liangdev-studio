import Link from "next/link";
import { SiteShell } from "../components/site-shell";
import { siteContent } from "../content";

/**
 * 渲染官网中文首页首屏和主导航入口。
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
            <Link className="button button-primary" href={home.primaryAction.href}>
              {home.primaryAction.label}
            </Link>
            <Link
              className="button button-secondary"
              href={home.secondaryAction.href}
            >
              {home.secondaryAction.label}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
