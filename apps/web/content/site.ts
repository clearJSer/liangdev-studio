/**
 * 职责：定义官网页面、导航和 SEO 会复用的结构化内容类型。
 */

export type Locale = "zh" | "en";

export type NavigationItem = {
  href: string;
  label: string;
};

export type PageContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type SiteContent = {
  locale: Locale;
  name: string;
  domain: string;
  description: string;
  navigation: NavigationItem[];
  home: PageContent & {
    primaryAction: NavigationItem;
    secondaryAction: NavigationItem;
  };
  pages: {
    projects: PageContent;
    blog: PageContent;
    about: PageContent;
    contact: PageContent;
  };
};
