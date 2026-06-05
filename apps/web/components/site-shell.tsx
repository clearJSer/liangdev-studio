/**
 * 职责：提供官网通用页面外壳、顶部导航和基础页面占位布局。
 */

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { siteContent } from "../content";
import type { PageContent } from "../content/site";
import { SiteNavLinks } from "./site-nav-links";

type SiteShellProps = {
  children: ReactNode;
};

type PageIntroProps = {
  children?: ReactNode;
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
          <Image
            alt=""
            aria-hidden="true"
            className="brand-mark"
            height={470}
            priority
            src="/brand/logo-icon.svg"
            width={590}
          />
          <Image
            alt="YiForge Studio"
            className="brand-wordmark"
            height={84}
            priority
            src="/brand/yi-forge-studio-outline-transparent.png"
            width={485}
          />
        </Link>
        <nav className="site-nav" aria-label="主导航">
          <SiteNavLinks items={siteContent.navigation} />
        </nav>
        <details className="mobile-menu">
          <summary aria-label="打开导航菜单">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>
          <nav className="mobile-nav" aria-label="移动端导航">
            <SiteNavLinks items={siteContent.navigation} />
          </nav>
        </details>
        <div className="header-spacer" aria-hidden="true" />
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="footer-brand">
          <Image
            alt="YiForge Studio"
            className="brand-logo"
            height={150}
            src="/brand/yi-forge-studio-outline-transparent.png"
            width={760}
          />
          <p>一个持续创造 AI-native 产品、工作流和开发者工具的独立工作室。</p>
          <span>Always building.</span>
        </div>
        <div className="footer-links" aria-label="页脚导航">
          <div>
            <strong>Navigation</strong>
            <Link href="/projects">项目</Link>
            <Link href="/blog">构建记录</Link>
            <Link href="/about">关于</Link>
          </div>
          <div>
            <strong>Connect</strong>
            <Link href={`mailto:${siteContent.email}`}>Email</Link>
            <Link href="/contact">联系页面</Link>
            <Link href="/projects">项目方向</Link>
          </div>
          <div>
            <strong>Contact</strong>
            <span>{siteContent.email}</span>
            <span>Remote / Worldwide</span>
          </div>
        </div>
        <div className="footer-cta">
          <strong>有兴趣的想法或合作机会？</strong>
          <Link className="button button-secondary" href="/contact">
            联系我
          </Link>
        </div>
      </footer>
    </div>
  );
}

/**
 * 渲染二级页面的统一标题区，页面正文后续逐步补齐。
 */
export function PageIntro({ children, content }: PageIntroProps) {
  return (
    <section className="page-intro" aria-labelledby="page-title">
      <div className="page-intro-copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="page-title">{content.title}</h1>
        <p>{content.description}</p>
      </div>
      {children ? <div className="page-intro-panel">{children}</div> : null}
    </section>
  );
}
