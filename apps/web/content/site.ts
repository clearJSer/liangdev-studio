/**
 * 职责：定义官网页面、导航和 SEO 会复用的结构化内容类型。
 */

export type Locale = "zh" | "en";

export type NavigationItem = {
  href: string;
  label: string;
};

export type ContactLink = NavigationItem & {
  description: string;
};

export type SeoContent = {
  title: string;
  description: string;
};

export type HomeAction = NavigationItem & {
  variant: "primary" | "secondary" | "ghost";
};

export type PageContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HomeFeature = {
  title: string;
  description: string;
  status: string;
  tone: "violet" | "blue" | "mint" | "orange" | "neutral";
};

export type HomePrinciple = {
  title: string;
  description: string;
};

export type HomeProject = {
  name: string;
  status: string;
  description: string;
  tags: string[];
  tone: "landscape" | "portrait" | "family" | "flow";
};

export type HomeWriting = {
  title: string;
  description: string;
  date: string;
};

export type SiteContent = {
  locale: Locale;
  name: string;
  domain: string;
  description: string;
  email: string;
  navigation: NavigationItem[];
  contactLinks: ContactLink[];
  seo: {
    home: SeoContent;
    projects: SeoContent;
    blog: SeoContent;
    about: SeoContent;
    contact: SeoContent;
  };
  home: PageContent & {
    actions: HomeAction[];
    intro: PageContent;
    build: PageContent & {
      items: HomeFeature[];
    };
    philosophy: PageContent & {
      items: HomePrinciple[];
    };
    projects: PageContent & {
      items: HomeProject[];
    };
    writing: PageContent & {
      items: HomeWriting[];
    };
    contact: PageContent & {
      actions: NavigationItem[];
    };
  };
  pages: {
    projects: PageContent;
    blog: PageContent;
    about: PageContent;
    contact: PageContent;
  };
};
