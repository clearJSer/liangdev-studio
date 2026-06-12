import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteContent } from "../content";
import "./globals.css";
import "./site.css";
import "./browser-compat.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  display: "swap",
  fallback: [
    "PingFang SC",
    "Microsoft YaHei",
    "Noto Sans SC",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "sans-serif",
  ],
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  display: "swap",
  fallback: [
    "SFMono-Regular",
    "Consolas",
    "Liberation Mono",
    "Menlo",
    "Monaco",
    "monospace",
  ],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteContent.domain}`),
  title: {
    default: siteContent.seo.home.title,
    template: `%s | ${siteContent.name}`,
  },
  description: siteContent.seo.home.description,
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
  },
  icons: {
    icon: "/brand/logo-icon.svg",
    shortcut: "/brand/logo-icon.svg",
  },
  openGraph: {
    title: siteContent.seo.home.title,
    description: siteContent.seo.home.description,
    url: "/",
    siteName: siteContent.name,
    images: [
      {
        url: "/brand/og-yiforge-studio.png",
        width: 1200,
        height: 630,
        alt: siteContent.name,
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.home.title,
    description: siteContent.seo.home.description,
    images: ["/brand/og-yiforge-studio.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * 渲染应用根布局，设置默认中文语言和全站字体变量。
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
