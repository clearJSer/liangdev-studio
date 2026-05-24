/**
 * 职责：提供联系页面路由，后续承载联系方式和合作入口。
 */

import { PageIntro, SiteShell } from "../../components/site-shell";
import { siteContent } from "../../content";

/**
 * 渲染联系页面的首版占位结构。
 */
export default function ContactPage() {
  return (
    <SiteShell>
      <PageIntro content={siteContent.pages.contact} />
    </SiteShell>
  );
}
