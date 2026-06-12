/**
 * 职责：提供英文项目列表页面，展示工作室项目入口和当前案例状态。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../../components/site-shell";
import { enContent } from "../../../content/en";
import { getAllProjects } from "../../../content/projects";

export const metadata: Metadata = {
  title: enContent.seo.projects.title,
  description: enContent.seo.projects.description,
  alternates: {
    canonical: "/en/projects",
    languages: {
      "zh-CN": "/projects",
      en: "/en/projects",
    },
  },
  openGraph: {
    title: enContent.seo.projects.title,
    description: enContent.seo.projects.description,
    url: "/en/projects",
    locale: "en_US",
  },
};

/**
 * 渲染英文项目页，先桥接现有中文项目详情。
 */
export default function EnglishProjectsPage() {
  const projects = getAllProjects();
  const projectTags = [...new Set(projects.flatMap((project) => project.stack))];

  return (
    <SiteShell content={enContent}>
      <PageIntro content={enContent.pages.projects}>
        <div className="page-stat-grid" aria-label="Project summary">
          <span>
            <strong>{projects.length}</strong>
            Projects
          </span>
          <span>
            <strong>{projectTags.length}</strong>
            Stack items
          </span>
        </div>
        <p className="page-intro-note">
          English case studies will be added gradually. Current detail pages are
          available in Chinese.
        </p>
      </PageIntro>
      <section className="page-section project-list" aria-label="Project list">
        {projects.map((project, index) => (
          <Link
            className="project-row project-row-link"
            href={`/projects/${project.slug}`}
            key={project.slug}
          >
            <div className="project-row-number" aria-label={`Project ${index + 1}`}>
              <span>Project</span>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
            </div>
            <div className="project-row-heading">
              <h2>{project.title}</h2>
              <span>{project.status}</span>
            </div>
            <div>
              <p>{project.summary}</p>
              <span className="text-link">Open Chinese case study</span>
            </div>
            <div className="project-row-meta">
              <ul aria-label={`${project.title} tags`}>
                {project.stack.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
        <aside className="project-coming-soon" aria-label="Upcoming projects">
          <div className="project-coming-soon-mark" aria-hidden="true">
            Next
          </div>
          <div>
            <h2>More AI-native projects are being built</h2>
            <p>
              New tools, workflow experiments, and build notes will be published
              here as they become usable.
            </p>
          </div>
          <span>Coming soon</span>
        </aside>
      </section>
    </SiteShell>
  );
}
