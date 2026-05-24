/**
 * 职责：提供官网通用页面外壳、顶部导航和基础页面占位布局。
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { siteContent } from "../content";
import type { PageContent } from "../content/site";

type SiteShellProps = {
  children: ReactNode;
};

type PageIntroProps = {
  content: PageContent;
};

/**
 * 渲染官网所有页面共享的导航、主体和页脚结构。
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="YiForge Studio 首页">
          <span className="brand-mark" aria-hidden="true">
            YF
          </span>
          <span>{siteContent.name}</span>
        </Link>
        <nav className="site-nav" aria-label="主导航">
          {siteContent.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <span>{siteContent.name}</span>
        <span>{siteContent.domain}</span>
      </footer>
    </div>
  );
}

/**
 * 渲染二级页面的统一标题区，页面正文后续逐步补齐。
 */
export function PageIntro({ content }: PageIntroProps) {
  return (
    <section className="page-intro" aria-labelledby="page-title">
      <p className="eyebrow">{content.eyebrow}</p>
      <h1 id="page-title">{content.title}</h1>
      <p>{content.description}</p>
    </section>
  );
}
