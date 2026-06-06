/**
 * 职责：提供项目页面路由，承载首版项目列表和实验方向。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { ProjectsFlightsGlobe } from "../../components/ProjectsFlightsGlobe";
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
            实验方向
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
        {projects.map((project) => (
          <article className="project-row" key={project.slug}>
            <div>
              <span>{project.status}</span>
              <h2>{project.title}</h2>
            </div>
            <div>
              <p>{project.summary}</p>
              <Link className="text-link" href={`/projects/${project.slug}`}>
                查看项目详情
              </Link>
            </div>
            <div className="project-row-meta">
              <ul aria-label={`${project.title} 标签`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <ProjectsFlightsGlobe />
    </SiteShell>
  );
}
