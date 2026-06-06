/**
 * 职责：提供项目页面路由，承载首版项目列表和实验方向。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";
import { getAllProjects } from "../../content/projects";

export const metadata: Metadata = {
  title: siteContent.seo.projects.title,
  description: siteContent.seo.projects.description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: siteContent.seo.projects.title,
    description: siteContent.seo.projects.description,
    url: "/projects",
  },
};

/**
 * 渲染项目页面的首版可用结构。
 */
export default function ProjectsPage() {
  const projects = getAllProjects();
  const projectTags = [...new Set(projects.flatMap((project) => project.tags))];

  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.projects}>
        <div className="page-stat-grid" aria-label="项目摘要">
          <span>
            <strong>{projects.length}</strong>
            项目
          </span>
          <span>
            <strong>{projectTags.length}</strong>
            技术标签
          </span>
        </div>
        <div className="page-chip-list" aria-label="项目标签摘要">
          {projectTags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </PageIntro>
      <section className="page-section project-list" aria-label="项目列表">
        {projects.map((project, index) => (
          <Link
            className="project-row project-row-link"
            href={`/projects/${project.slug}`}
            key={project.slug}
          >
            <div className="project-row-number" aria-label={`项目 ${index + 1}`}>
              <span>项目</span>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
            </div>
            <div className="project-row-heading">
              <h2>{project.title}</h2>
              <span>{project.status}</span>
            </div>
            <div>
              <p>{project.summary}</p>
              <span className="text-link">查看项目详情</span>
            </div>
            <div className="project-row-meta">
              <ul aria-label={`${project.title} 标签`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
        <aside className="project-coming-soon" aria-label="后续项目提示">
          <div className="project-coming-soon-mark" aria-hidden="true">
            Next
          </div>
          <div>
            <h2>更多项目正在构建中</h2>
            <p>
              YiForge Studio 会持续把新的 AI 工具、产品实验和构建记录沉淀到这里。
            </p>
          </div>
          <span>敬请期待</span>
        </aside>
      </section>
    </SiteShell>
  );
}
