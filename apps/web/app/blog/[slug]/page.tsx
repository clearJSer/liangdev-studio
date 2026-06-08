/**
 * 职责：提供构建记录详情页路由，静态展示 Markdown 文章正文和项目关联。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, SiteShell } from "../../../components/site-shell";
import { getProjectBySlug } from "../../../content/projects";
import {
  getAllWritingSlugs,
  getWritingBySlug,
  type MarkdownBlock,
} from "../../../content/writings";

export const dynamicParams = false;

type WritingDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * 生成静态导出需要的文章详情页路径。
 */
export function generateStaticParams() {
  return getAllWritingSlugs().map((slug) => ({
    slug,
  }));
}

/**
 * 生成构建记录详情页 SEO metadata。
 */
export async function generateMetadata({
  params,
}: WritingDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);

  if (!writing) {
    return {};
  }

  return {
    title: writing.title,
    description: writing.summary,
    alternates: {
      canonical: `/blog/${writing.slug}`,
    },
    openGraph: {
      title: writing.title,
      description: writing.summary,
      url: `/blog/${writing.slug}`,
    },
  };
}

/**
 * 渲染受控 Markdown 内容块。
 */
function renderMarkdownBlock(block: MarkdownBlock) {
  if (block.type === "heading") {
    if (block.level === 2) {
      return <h2 key={block.text}>{block.text}</h2>;
    }

    return <h3 key={block.text}>{block.text}</h3>;
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";

    return (
      <ListTag key={block.items.join("-")}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    );
  }

  if (block.type === "quote") {
    return <blockquote key={block.text}>{block.text}</blockquote>;
  }

  return <p key={block.text}>{block.text}</p>;
}

/**
 * 渲染构建记录详情页。
 */
export default async function WritingDetailPage({
  params,
}: WritingDetailPageProps) {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);

  if (!writing) {
    notFound();
  }

  const project = getProjectBySlug(writing.projectSlug);

  return (
    <SiteShell>
      <PageIntro
        content={{
          eyebrow: "Build Note",
          title: writing.title,
          description: writing.summary,
        }}
      >
        <div className="page-stat-grid" aria-label="文章摘要">
          <span>
            <strong>{writing.date}</strong>
            发布日期
          </span>
          <span>
            <strong>{writing.tags.length}</strong>
            标签
          </span>
        </div>
        <div className="page-chip-list" aria-label="文章标签">
          {writing.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project ? (
          <Link className="page-intro-link" href={`/projects/${project.slug}`}>
            所属项目：{project.title}
          </Link>
        ) : null}
      </PageIntro>

      <article className="page-section article-layout">
        <div className="article-meta">
          <time dateTime={writing.date}>{writing.date}</time>
          {project ? (
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          ) : null}
        </div>
        <div className="article-content">
          {writing.blocks.map((block) => renderMarkdownBlock(block))}
          {project ? (
            <aside className="article-project-cta" aria-label="关联项目">
              <span>Linked Project</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <Link className="page-intro-link" href={`/projects/${project.slug}`}>
                查看项目详情
              </Link>
            </aside>
          ) : null}
        </div>
      </article>
    </SiteShell>
  );
}
