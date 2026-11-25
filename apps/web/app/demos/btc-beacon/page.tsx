/**
 * 职责：呈现 BTC Beacon 作品的公开历史数据演示与来源说明。
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "../../../components/site-shell";
import { MarketChart } from "./market-chart";
import snapshot from "./market-snapshot.json";
import styles from "./dashboard.module.css";

const description =
  "把 BTC 历史价格、长期均线和链上实现价格放在同一时间轴上，观察不同阶段的涨跌与波动。";

export const metadata: Metadata = {
  title: "BTC Beacon · 比特币历史价格看板",
  description,
  alternates: {
    canonical: "/demos/btc-beacon",
  },
};

/** 渲染 BTC Beacon 历史快照页面。 */
export default function BtcBeaconDemoPage() {
  return (
    <SiteShell>
      <PageIntro
        content={{
          eyebrow: "BTC Beacon",
          title: "比特币历史价格看板",
          description,
        }}
      >
        <div className="page-stat-grid">
          <span>
            <strong>
              <time dateTime={snapshot.through}>{snapshot.through}</time>
            </strong>
            快照截至（UTC）
          </span>
          <span>
            <strong>{snapshot.points.length}</strong>
            月度样本
          </span>
        </div>
        <Link className="page-intro-link" href="/projects/btc-beacon">
          返回项目详情
        </Link>
      </PageIntro>

      <section className={`page-section ${styles.dashboard}`} aria-label="BTC 历史数据">
        <MarketChart points={snapshot.points} />
        <section className={styles.sources} aria-labelledby="btc-source-title">
          <h2 id="btc-source-title">数据来源与采样</h2>
          <p>
            此页展示固定历史快照。基础市场数据来自 {snapshot.source.creator} 的社区数据，由 BTC Beacon 计算参考线，再按月抽样。每个 UTC 月保留最后一条含价格的日线，快照所在月份取截至日数据。缺少的指标在图中留空。
          </p>
          <p>链上实现价格由 BTC 价格除以同日 MVRV 得出，200 日参考线使用几何平均。</p>
          <ul>
            <li>
              <a href="https://docs.coinmetrics.io/network-data/network-data-overview/market/market-capitalization">
                Coin Metrics · 市值口径与 MVRV
              </a>
            </li>
            <li>
              <a href={snapshot.source.url}>{snapshot.source.name}</a>
            </li>
            <li>
              <a href={snapshot.source.licenseUrl}>
                数据许可 · {snapshot.source.license}
              </a>
            </li>
          </ul>
        </section>
      </section>
    </SiteShell>
  );
}
