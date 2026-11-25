"use client";

/**
 * 职责：按选定时间范围展示已归档的 BTC 指标，并提供等价的文本数据表。
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { LineChart, type LineSeriesOption } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  type GridComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import { init, use as registerChartModules, type ComposeOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import styles from "./dashboard.module.css";

registerChartModules([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

type MarketPoint = {
  date: string;
  price: number;
  realized: number | null;
  g200: number | null;
  w200: number | null;
};

type ChartOption = ComposeOption<
  GridComponentOption | TooltipComponentOption | LineSeriesOption
>;

const series = [
  { field: "price", label: "BTC 价格", color: "#5646e8", style: "solid" },
  { field: "realized", label: "链上实现价格", color: "#197869", style: "dashed" },
  { field: "g200", label: "200 日几何均价", color: "#9d5a15", style: "dotted" },
  { field: "w200", label: "200 周均线", color: "#526a95", style: "dashed" },
] as const;

const ranges = [
  { label: "近 12 个月", months: 12 },
  { label: "近 36 个月", months: 36 },
  { label: "全部", months: 0 },
] as const;

const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const tableUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const fractionalUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

/** 将图表的价格轴标签格式化为简洁的美元金额。 */
function formatAxisPrice(value: number) {
  return value < 1 ? fractionalUsd.format(value) : compactUsd.format(value);
}

/** 保留缺失值的语义，并格式化已知的美元金额。 */
function formatPrice(value: number | null) {
  if (value === null) return "—";
  return value < 1 ? fractionalUsd.format(value) : tableUsd.format(value);
}

/** 生成当前历史时间范围的折线图配置。 */
function createChartOption(points: MarketPoint[]): ChartOption {
  return {
    animation: false,
    grid: { top: 22, right: 18, bottom: 40, left: 58 },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: points.map((point) => point.date),
      axisLabel: {
        hideOverlap: true,
        formatter: formatMonth,
        color: "#596680",
      },
    },
    yAxis: {
      type: "log",
      axisLabel: { formatter: formatAxisPrice, color: "#596680" },
      splitLine: { lineStyle: { color: "#e8ecf7" } },
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      renderMode: "richText",
      valueFormatter: formatTooltipPrice,
    },
    series: series.map(({ field, label, color, style }) => ({
      type: "line",
      name: label,
      data: points.map((point) => point[field]),
      showSymbol: false,
      connectNulls: false,
      lineStyle: { color, type: style, width: field === "price" ? 3 : 2 },
      itemStyle: { color },
    })),
  };
}

/** 缩短横轴日期，悬停详情和数据表仍保留具体日期。 */
function formatMonth(value: string) {
  return value.slice(0, 7);
}

/** 在提示框中显示价格，数据缺失时保留占位。 */
function formatTooltipPrice(value: unknown) {
  return formatPrice(typeof value === "number" ? value : null);
}

/** 渲染可切换时间范围的历史图表，并保留键盘可访问的数据表。 */
export function MarketChart({ points }: { points: MarketPoint[] }) {
  const [months, setMonths] = useState<number>(36);
  const chartElement = useRef<HTMLDivElement>(null);
  const visiblePoints = useMemo(
    () => (months ? points.slice(-months) : points),
    [months, points],
  );

  useEffect(() => {
    const container = chartElement.current;
    if (!container) return;

    const chart = init(container, undefined, { renderer: "canvas" });
    chart.setOption(createChartOption(visiblePoints));

    /** 容器在窄屏或视口变化后保持清晰且贴合版心。 */
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(container);

    /** 释放图表实例和容器观察器。 */
    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [visiblePoints]);

  const firstDate = visiblePoints[0]?.date;
  const lastDate = visiblePoints.at(-1)?.date;

  return (
    <section className={styles.chartPanel} aria-labelledby="btc-chart-title">
      <div className={styles.toolbar}>
        <div>
          <h2 id="btc-chart-title">价格与参考线</h2>
          <p id="btc-chart-range" className={styles.range} aria-live="polite">
            {firstDate} 至 {lastDate}（UTC）
          </p>
        </div>
        <div className={styles.rangeButtons} role="group" aria-label="图表时间范围">
          {ranges.map((range) => (
            <button
              key={range.months}
              type="button"
              aria-pressed={months === range.months}
              onClick={() => setMonths(range.months)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <ul className={styles.legend} aria-label="图例">
        {series.map(({ field, label, color, style }) => (
          <li key={field}>
            <span
              aria-hidden="true"
              style={{ borderTopColor: color, borderTopStyle: style }}
            />
            {label}
          </li>
        ))}
      </ul>
      <div
        className={styles.chart}
        ref={chartElement}
        role="img"
        aria-label="BTC 价格与参考线走势图，完整样本见下方数据表"
        aria-describedby="btc-chart-range btc-chart-scale"
      />
      <p className={styles.scale} id="btc-chart-scale">
        单位为美元。纵轴为对数刻度，相同的垂直距离表示相同的变化倍数。
      </p>

      <details className={styles.details}>
        <summary>查看抽样数据（{visiblePoints.length} 个月）</summary>
        <div className={styles.tableScroll} role="region" aria-label="月度抽样数据" tabIndex={0}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">日期（UTC）</th>
                {series.map(({ field, label }) => (
                  <th scope="col" key={field}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visiblePoints.map((point) => (
                <tr key={point.date}>
                  <th scope="row"><time dateTime={point.date}>{point.date}</time></th>
                  {series.map(({ field }) => (
                    <td key={field}>{formatPrice(point[field])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
