/**
 * 职责：集中导出当前官网默认语言内容和未来可切换的语言内容。
 */

import { enContent } from "./en";
import type { Locale, SiteContent } from "./site";
import { zhContent } from "./zh";

export const defaultLocale: Locale = "zh";

export const siteContents: Record<Locale, SiteContent> = {
  zh: zhContent,
  en: enContent,
};

export const siteContent = siteContents[defaultLocale];
