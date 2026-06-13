/**
 * 职责：集中生成英文版页面的 SEO metadata，保持 canonical、语言替代和社交卡片一致。
 */

import type { Metadata } from "next";
import { enContent } from "../../content/en";
import type { SeoContent } from "../../content/site";

type EnglishMetadataOptions = {
  absoluteTitle?: boolean;
  path: string;
  seo: SeoContent;
  zhPath: string;
};

/**
 * 生成英文静态页面可复用的 Next.js metadata。
 */
export function createEnglishMetadata({
  absoluteTitle = false,
  path,
  seo,
  zhPath,
}: EnglishMetadataOptions): Metadata {
  return {
    applicationName: enContent.name,
    authors: [{ name: enContent.name, url: "/" }],
    category: "technology",
    creator: enContent.name,
    title: absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    publisher: enContent.name,
    alternates: {
      canonical: path,
      languages: {
        "zh-CN": zhPath,
        en: path,
        "x-default": zhPath,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: path,
      siteName: enContent.name,
      images: [
        {
          url: "/brand/og-yiforge-studio.png",
          width: 1200,
          height: 630,
          alt: enContent.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/brand/og-yiforge-studio.png"],
    },
    other: {
      "content-language": "en",
    },
  };
}
