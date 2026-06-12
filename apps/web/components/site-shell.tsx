/**
 * 职责：提供官网通用页面外壳、顶部导航和基础页面占位布局。
 */

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { siteContent } from "../content";
import type { PageContent, SiteContent } from "../content/site";
import { LanguageSwitch } from "./language-switch";
import { SiteNavLinks } from "./site-nav-links";

type SiteShellProps = {
  children: ReactNode;
  content?: SiteContent;
};

type PageIntroProps = {
  children?: ReactNode;
  content: PageContent;
};

/**
 * 根据语言内容生成页面外壳里不可复用到内容文件的标签。
 */
function getShellLabels(content: SiteContent) {
  if (content.locale === "en") {
    return {
      brandLabel: "YiForge Studio home",
      contactCta: "Have an idea or collaboration in mind?",
      contactPage: "Contact page",
      footerDescription:
        "An independent studio building AI-native products, workflows, and developer tools.",
      footerProjectLink: "Project direction",
      footerProjects: "Projects",
      footerWriting: "Build Notes",
      footerAbout: "About",
      footerNavLabel: "Footer navigation",
      navLabel: "Primary navigation",
      mobileMenuLabel: "Open navigation menu",
      mobileNavLabel: "Mobile navigation",
      primaryAction: "Contact",
    };
  }

  return {
    brandLabel: "YiForge Studio 首页",
    contactCta: "有兴趣的想法或合作机会？",
    contactPage: "联系页面",
    footerDescription: "一个持续创造 AI-native 产品、工作流和开发者工具的独立工作室。",
    footerProjectLink: "项目方向",
    footerProjects: "项目",
    footerWriting: "构建记录",
    footerAbout: "关于",
    footerNavLabel: "页脚导航",
    navLabel: "主导航",
    mobileMenuLabel: "打开导航菜单",
    mobileNavLabel: "移动端导航",
    primaryAction: "联系我",
  };
}

/**
 * 渲染官网所有页面共享的导航、主体和页脚结构。
 */
export function SiteShell({ children, content = siteContent }: SiteShellProps) {
  const shellLabels = getShellLabels(content);
  const homeHref = content.locale === "en" ? "/en" : "/";
  const projectsHref = content.locale === "en" ? "/en/projects" : "/projects";
  const blogHref = content.locale === "en" ? "/en/blog" : "/blog";
  const aboutHref = content.locale === "en" ? "/en/about" : "/about";
  const contactHref = content.locale === "en" ? "/en/contact" : "/contact";

  return (
    <div className="site-shell" lang={content.locale === "en" ? "en" : "zh-CN"}>
      <header className="site-header">
        <Link className="brand" href={homeHref} aria-label={shellLabels.brandLabel}>
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
        <nav className="site-nav" aria-label={shellLabels.navLabel}>
          <SiteNavLinks items={content.navigation} />
        </nav>
        <div className="header-actions">
          <LanguageSwitch locale={content.locale} />
        </div>
        <details className="mobile-menu">
          <summary aria-label={shellLabels.mobileMenuLabel}>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>
          <nav className="mobile-nav" aria-label={shellLabels.mobileNavLabel}>
            <SiteNavLinks items={content.navigation} />
            <LanguageSwitch locale={content.locale} />
          </nav>
        </details>
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
          <p>{shellLabels.footerDescription}</p>
          <span>Always building.</span>
        </div>
        <div className="footer-links" aria-label={shellLabels.footerNavLabel}>
          <div>
            <strong>Navigation</strong>
            <Link href={projectsHref}>{shellLabels.footerProjects}</Link>
            <Link href={blogHref}>{shellLabels.footerWriting}</Link>
            <Link href={aboutHref}>{shellLabels.footerAbout}</Link>
          </div>
          <div>
            <strong>Connect</strong>
            <Link href={`mailto:${content.email}`}>Email</Link>
            <Link href={contactHref}>{shellLabels.contactPage}</Link>
            <Link href={projectsHref}>{shellLabels.footerProjectLink}</Link>
          </div>
          <div>
            <strong>Contact</strong>
            <span>{content.email}</span>
            <span>Remote / Worldwide</span>
          </div>
        </div>
        <div className="footer-cta">
          <strong>{shellLabels.contactCta}</strong>
          <Link className="button button-secondary" href={contactHref}>
            {shellLabels.primaryAction}
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
