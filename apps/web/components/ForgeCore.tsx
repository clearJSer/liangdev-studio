"use client";

/**
 * 职责：提供 YiForge Studio 首页 Hero 的 Flow → Forge → Yi 抽象品牌主视觉。
 */

import { useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import styles from "./ForgeCore.module.css";

type ForgeCoreProps = {
  logoSrc?: string;
};

type ForgeCoreStyle = CSSProperties & {
  "--forge-x": string;
  "--forge-y": string;
  "--forge-rx": string;
  "--forge-ry": string;
};

type FlowPath = {
  className: string;
  d: string;
};

const FLOW_PATHS: FlowPath[] = [
  {
    className: "flowPathA",
    d: "M20 72 C148 58 202 118 300 210",
  },
  {
    className: "flowPathB",
    d: "M42 118 C158 100 224 136 310 214",
  },
  {
    className: "flowPathC",
    d: "M64 172 C164 158 218 178 292 214",
  },
  {
    className: "flowPathD",
    d: "M26 310 C132 304 210 272 300 220",
  },
  {
    className: "flowPathE",
    d: "M82 366 C174 340 224 286 310 224",
  },
  {
    className: "flowPathF",
    d: "M164 398 C216 348 252 286 316 226",
  },
  {
    className: "flowPathG",
    d: "M600 70 C486 64 412 118 320 210",
  },
  {
    className: "flowPathH",
    d: "M574 126 C478 112 410 144 314 214",
  },
  {
    className: "flowPathI",
    d: "M548 178 C448 166 398 184 328 216",
  },
  {
    className: "flowPathJ",
    d: "M594 310 C484 298 414 268 320 220",
  },
  {
    className: "flowPathK",
    d: "M536 366 C450 340 398 286 310 224",
  },
  {
    className: "flowPathL",
    d: "M454 398 C404 346 368 286 304 226",
  },
  {
    className: "flowPathM",
    d: "M110 40 C190 82 238 140 306 206",
  },
  {
    className: "flowPathN",
    d: "M510 40 C430 84 382 142 314 206",
  },
  {
    className: "flowPathO",
    d: "M112 392 C196 330 244 276 306 226",
  },
  {
    className: "flowPathP",
    d: "M508 392 C424 330 376 276 314 226",
  },
];

const OUTPUT_PATHS: FlowPath[] = [
  {
    className: "outputPathA",
    d: "M316 210 C380 186 458 162 582 154",
  },
  {
    className: "outputPathB",
    d: "M318 218 C402 226 478 252 594 310",
  },
  {
    className: "outputPathC",
    d: "M304 218 C222 226 148 254 36 312",
  },
  {
    className: "outputPathD",
    d: "M304 208 C232 184 154 158 36 146",
  },
];

/**
 * 将数值限制在视差允许范围内。
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 渲染一条汇聚或输出路径。
 */
function renderPath(path: FlowPath, index: number) {
  return (
    <path
      className={`${styles.path} ${styles[path.className]}`}
      d={path.d}
      key={`${path.className}-${index}`}
      pathLength="1"
    />
  );
}

/**
 * 渲染 Flow → Forge → Yi 首页主视觉。
 */
export function ForgeCore({ logoSrc = "/brand/yiforge-yi-mark-v2.svg" }: ForgeCoreProps) {
  const [style, setStyle] = useState<ForgeCoreStyle>({
    "--forge-x": "0px",
    "--forge-y": "0px",
    "--forge-rx": "0deg",
    "--forge-ry": "0deg",
  });

  /**
   * 根据鼠标位置计算克制的视差偏移。
   */
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    setStyle({
      "--forge-x": `${clamp(x * 16, -8, 8).toFixed(2)}px`,
      "--forge-y": `${clamp(y * 16, -8, 8).toFixed(2)}px`,
      "--forge-rx": `${clamp(y * -4, -2, 2).toFixed(2)}deg`,
      "--forge-ry": `${clamp(x * 4, -2, 2).toFixed(2)}deg`,
    });
  }

  /**
   * 鼠标离开后让主视觉回到安静的中心状态。
   */
  function handlePointerLeave() {
    setStyle({
      "--forge-x": "0px",
      "--forge-y": "0px",
      "--forge-rx": "0deg",
      "--forge-ry": "0deg",
    });
  }

  return (
    <div
      aria-label="Flow to Forge to Yi brand visual"
      className={styles.forgeCore}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      role="img"
      style={style}
    >
      <div className={styles.stage}>
        <span className={styles.backgroundGlow} />

        <svg
          aria-hidden="true"
          className={styles.flowSvg}
          focusable="false"
          viewBox="0 0 620 420"
        >
          <defs>
            <linearGradient id="forge-flow-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#60A5FA" stopOpacity="0.1" />
              <stop offset="0.48" stopColor="#8B5CF6" stopOpacity="0.34" />
              <stop offset="1" stopColor="#22D3EE" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id="forge-output-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.26" />
              <stop offset="1" stopColor="#60A5FA" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <g className={styles.flowGroup}>{FLOW_PATHS.map(renderPath)}</g>
          <g className={styles.outputGroup}>{OUTPUT_PATHS.map(renderPath)}</g>
        </svg>

        <span className={`${styles.particle} ${styles.particleOne}`} />
        <span className={`${styles.particle} ${styles.particleTwo}`} />
        <span className={`${styles.particle} ${styles.particleThree}`} />
        <span className={`${styles.particle} ${styles.particleFour}`} />
        <span className={`${styles.particle} ${styles.particleFive}`} />
        <span className={`${styles.particle} ${styles.particleSix}`} />
        <span className={`${styles.particle} ${styles.particleSeven}`} />
        <span className={`${styles.particle} ${styles.particleEight}`} />
        <span className={`${styles.particle} ${styles.particleNine}`} />
        <span className={`${styles.particle} ${styles.particleTen}`} />

        <div className={styles.forgeField} aria-hidden="true">
          <span className={`${styles.orbit} ${styles.orbitOne}`} />
          <span className={`${styles.orbit} ${styles.orbitTwo}`} />
          <span className={`${styles.orbit} ${styles.orbitThree}`} />
        </div>

        <div className={styles.logoCore}>
          <span className={styles.logoAura} />
          <Image
            alt=""
            className={styles.logo}
            draggable="false"
            height={108}
            src={logoSrc}
            width={108}
          />
        </div>
      </div>
    </div>
  );
}
