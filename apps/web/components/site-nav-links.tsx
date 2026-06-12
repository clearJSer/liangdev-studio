/**
 * 职责：根据当前路由渲染桌面端和移动端导航链接的选中状态。
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "../content/site";

type SiteNavLinksProps = {
  items: NavigationItem[];
};

/**
 * 判断导航项是否匹配当前路由。
 */
function isActiveNavigationItem(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/en") {
    return pathname === "/en";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * 渲染带当前页语义的导航链接。
 */
export function SiteNavLinks({ items }: SiteNavLinksProps) {
  const pathname = usePathname();

  return items.map((item) => {
    const isActive = isActiveNavigationItem(pathname, item.href);

    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        href={item.href}
        key={item.href}
      >
        {item.label}
      </Link>
    );
  });
}
