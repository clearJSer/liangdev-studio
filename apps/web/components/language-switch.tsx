/**
 * 职责：根据当前路由生成中英文页面之间的切换入口。
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "../content/site";
import { saveLocalePreference } from "./locale-preference";

type LanguageSwitchProps = {
  locale: Locale;
};

/**
 * 将当前中文路径映射到对应英文路径。
 */
function getEnglishPath(pathname: string) {
  if (pathname === "/") {
    return "/en";
  }

  if (pathname === "/projects" || pathname.startsWith("/projects/")) {
    return "/en/projects";
  }

  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return "/en/blog";
  }

  if (pathname === "/about") {
    return "/en/about";
  }

  if (pathname === "/contact") {
    return "/en/contact";
  }

  return `/en${pathname}`;
}

/**
 * 将当前英文路径映射到对应中文路径。
 */
function getChinesePath(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  if (pathname === "/en/projects") {
    return "/projects";
  }

  if (pathname === "/en/blog") {
    return "/blog";
  }

  if (pathname === "/en/about") {
    return "/about";
  }

  if (pathname === "/en/contact") {
    return "/contact";
  }

  return pathname.replace(/^\/en/, "") || "/";
}

/**
 * 渲染语言切换链接。
 */
export function LanguageSwitch({ locale }: LanguageSwitchProps) {
  const pathname = usePathname();
  const isEnglish = locale === "en";
  const targetLocale: Locale = isEnglish ? "zh" : "en";
  const targetHref = isEnglish ? getChinesePath(pathname) : getEnglishPath(pathname);

  return (
    <Link
      aria-label={isEnglish ? "切换到中文版" : "Switch to English version"}
      className="language-switch"
      href={targetHref}
      onClick={() => {
        saveLocalePreference(targetLocale);
      }}
    >
      {isEnglish ? "中文" : "EN"}
    </Link>
  );
}
