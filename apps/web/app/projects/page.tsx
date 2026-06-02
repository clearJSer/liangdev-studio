/**
 * 职责：提供项目页面路由，后续承载项目列表和 Case Study。
 */

import { PageIntro, SiteShell } from "../../components/site-shell";
import { ProjectsFlightsGlobe } from "../../components/ProjectsFlightsGlobe";
import { siteContent } from "../../content";

/**
 * 渲染项目页面的首版占位结构。
 */
export default function ProjectsPage() {
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.projects} />
      <ProjectsFlightsGlobe />
    </SiteShell>
  );
}
