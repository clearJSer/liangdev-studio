/**
 * 职责：提供项目页面路由，承载首版项目列表和实验方向。
 */

import type { Metadata } from "next";
import { PageIntro, SiteShell } from "../../components/site-shell";
import { ProjectsFlightsGlobe } from "../../components/ProjectsFlightsGlobe";
import { siteContent } from "../../content";

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
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.projects} />
      <section className="page-section project-list" aria-label="项目列表">
        {siteContent.home.projects.items.map((project) => (
          <article className="project-row" key={project.name}>
            <div>
              <span>{project.status}</span>
              <h2>{project.name}</h2>
            </div>
            <p>{project.description}</p>
            <ul aria-label={`${project.name} 标签`}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <ProjectsFlightsGlobe />
    </SiteShell>
  );
}
