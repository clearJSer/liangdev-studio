/**
 * 职责：在纯静态部署下根据用户偏好和浏览器语言自动选择首页语言。
 */

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { readLocalePreference } from "./locale-preference";

/**
 * 判断浏览器语言是否更偏向英文。
 */
function shouldPreferEnglish(languageValues: readonly string[]) {
  const normalizedLanguages = languageValues.map((language) =>
    language.toLowerCase(),
  );

  const firstLanguage = normalizedLanguages[0] ?? "";

  if (
    firstLanguage.startsWith("zh") ||
    firstLanguage.startsWith("yue") ||
    firstLanguage.startsWith("cmn")
  ) {
    return false;
  }

  return firstLanguage.startsWith("en");
}

/**
 * 只在根路径自动跳转英文首页，避免影响已分享的中文详情链接。
 */
export function LocaleAutoRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const preferredLocale = readLocalePreference();

    if (preferredLocale === "en") {
      router.replace("/en");
      return;
    }

    if (preferredLocale === "zh") {
      return;
    }

    const browserLanguages =
      navigator.languages.length > 0 ? navigator.languages : [navigator.language];

    if (shouldPreferEnglish(browserLanguages)) {
      router.replace("/en");
    }
  }, [pathname, router]);

  return null;
}
