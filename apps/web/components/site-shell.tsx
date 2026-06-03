/**
 * 职责：提供官网通用页面外壳、顶部导航和基础页面占位布局。
 */

import Link from "next/link";
import Image from "next/image";
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
          {siteContent.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-spacer" aria-hidden="true" />
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="footer-brand">
          <Image
            alt="YiForge Studio"
            className="brand-logo"
            height={150}
            src="/brand/YiForgeStudio-wordmark-vector.svg"
            width={760}
          />
          <p>一个持续创造 AI-native 产品、工作流和开发者工具的独立工作室。</p>
          <span>Always building.</span>
        </div>
        <div className="footer-links" aria-label="页脚导航">
          <div>
            <strong>Navigation</strong>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Thoughts</Link>
            <Link href="/about">About</Link>
          </div>
          <div>
            <strong>Connect</strong>
            <Link href="/contact">GitHub</Link>
            <Link href="/contact">X / Twitter</Link>
            <Link href="/contact">Email</Link>
          </div>
          <div>
            <strong>Contact</strong>
            <span>hello@yiforgestudio.com</span>
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
export function PageIntro({ content }: PageIntroProps) {
  return (
    <section className="page-intro" aria-labelledby="page-title">
      <p className="eyebrow">{content.eyebrow}</p>
      <h1 id="page-title">{content.title}</h1>
      <p>{content.description}</p>
    </section>
  );
}
