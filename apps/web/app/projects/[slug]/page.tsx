/**
 * 职责：提供项目详情页路由，静态展示项目案例、技术取舍和关联构建记录。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, SiteShell } from "../../../components/site-shell";
import { getAllProjects, getProjectBySlug } from "../../../content/projects";
import { getWritingSummariesByProject } from "../../../content/writings";

export const dynamicParams = false;

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * 生成静态导出需要的项目详情页路径。
 */
export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

/**
 * 生成项目详情页 SEO metadata。
 */
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    keywords: [
      project.title,
      ...project.tags,
      ...project.stack,
      "YiForge Studio",
      "AI Native",
    ],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

/**
 * 渲染项目详情页。
 */
export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedWritings = getWritingSummariesByProject(project.slug);
  const latestRelatedWriting = relatedWritings[0];

  return (
    <SiteShell>
      <PageIntro
        content={{
          eyebrow: "Project Case",
          title: project.title,
          description: project.summary,
        }}
      >
        <div className="page-stat-grid" aria-label="项目基础信息">
          <span>
            <strong>{project.year}</strong>
            上线年份
          </span>
          <span>
            <strong>{relatedWritings.length}</strong>
            构建记录
          </span>
        </div>
        <div className="page-chip-list" aria-label="项目标签">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </PageIntro>

      <section className="page-section detail-layout" aria-label="项目详情">
        <aside className="detail-sidebar" aria-label="项目概览">
          <div className="detail-panel">
            <h2>项目概览</h2>
            <dl className="detail-facts">
              <div>
                <dt>状态</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt>类型</dt>
                <dd>{project.type}</dd>
              </div>
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="detail-actions">
              {project.links.map((link) => (
                <Link className="page-intro-link" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              {latestRelatedWriting ? (
                <Link
                  className="page-intro-link"
                  href={`/blog/${latestRelatedWriting.slug}`}
                >
                  阅读构建记录
                </Link>
              ) : null}
            </div>
          </div>

          <div className="detail-panel">
            <h2>技术栈</h2>
            <div className="detail-tags" aria-label="技术栈">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </aside>

        <div className="detail-content">
          <section className="detail-panel" aria-labelledby="project-summary-title">
            <h2 id="project-summary-title">项目亮点</h2>
            <ul className="detail-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          {project.sections.map((section) => (
            <section className="detail-panel" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="detail-panel" aria-labelledby="related-writing-title">
            <h2 id="related-writing-title">关联构建记录</h2>
            {relatedWritings.length > 0 ? (
              <div className="related-list">
                {relatedWritings.map((writing) => (
                  <Link
                    className="related-card"
                    href={`/blog/${writing.slug}`}
                    key={writing.slug}
                  >
                    <time dateTime={writing.date}>{writing.date}</time>
                    <strong>{writing.title}</strong>
                    <span>{writing.summary}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p>这个项目的构建记录会在后续迭代中补齐。</p>
            )}
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
