import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteContent } from "../content";
import "./globals.css";
import "./site.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteContent.domain}`),
  title: {
    default: `${siteContent.name} | AI Native Builder Studio`,
    template: `%s | ${siteContent.name}`,
  },
  description: siteContent.description,
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
    },
  },
  openGraph: {
    title: `${siteContent.name} | AI Native Builder Studio`,
    description: siteContent.description,
    url: "/",
    siteName: siteContent.name,
    locale: "zh_CN",
    type: "website",
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
