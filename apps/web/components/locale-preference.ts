/**
 * 职责：维护静态站中客户端语言偏好的存取逻辑。
 */

import type { Locale } from "../content/site";

export const localeCookieName = "NEXT_LOCALE";
export const localeStorageKey = "yiforge-preferred-locale";

const cookieMaxAge = 60 * 60 * 24 * 365;

/**
 * 将语言偏好写入 localStorage 和 cookie，便于当前静态站与未来边缘重定向复用。
 */
export function saveLocalePreference(locale: Locale) {
  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Cookie 仍可作为静态站语言偏好的降级存储。
  }

  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
}

/**
 * 从 localStorage 或 cookie 读取用户已经手动选择过的语言。
 */
export function readLocalePreference() {
  let storedLocale: string | null = null;

  try {
    storedLocale = window.localStorage.getItem(localeStorageKey);
  } catch {
    storedLocale = null;
  }

  if (storedLocale === "zh" || storedLocale === "en") {
    return storedLocale;
  }

  const cookieLocale = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${localeCookieName}=`))
    ?.split("=")[1];

  if (cookieLocale === "zh" || cookieLocale === "en") {
    return cookieLocale;
  }

  return null;
}
