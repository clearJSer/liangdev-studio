"use client";

/**
 * 职责：在项目页渲染基于 ECharts GL 的全球航线 3D 可视化实验。
 */

import { useEffect, useRef, useState } from "react";

type Airport = [string, string, string, number | null, number | null];

type FlightRoute = [number, number, number];

type FlightsData = {
  airports: Airport[];
  routes: FlightRoute[];
};

type RouteLine = [[number, number], [number, number]];

type GlobeVariant = "project" | "home";

type ProjectsFlightsGlobeProps = {
  variant?: GlobeVariant;
};

type FlightsGlobeCanvasProps = {
  className: string;
  showStatus?: boolean;
  variant: GlobeVariant;
};

const FLIGHTS_DATA_URL = "/data/echarts/flights.json";
const WORLD_MAP_URL = "/data/echarts/world.json";
const HOME_ROUTE_LIMIT = 900;

/**
 * 判断未知值是否为航班机场坐标。
 */
function isAirport(value: unknown): value is Airport {
  return (
    Array.isArray(value) &&
    typeof value[0] === "string" &&
    typeof value[1] === "string" &&
    typeof value[2] === "string" &&
    (typeof value[3] === "number" || value[3] === null) &&
    (typeof value[4] === "number" || value[4] === null)
  );
}

/**
 * 判断未知值是否为航线索引。
 */
function isFlightRoute(value: unknown): value is FlightRoute {
  return (
    Array.isArray(value) &&
    typeof value[0] === "number" &&
    typeof value[1] === "number" &&
    typeof value[2] === "number"
  );
}

/**
 * 判断未知值是否为本地航线数据结构。
 */
function isFlightsData(value: unknown): value is FlightsData {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<Record<keyof FlightsData, unknown>>;

  return (
    Array.isArray(candidate.airports) &&
    candidate.airports.every(isAirport) &&
    Array.isArray(candidate.routes) &&
    candidate.routes.every(isFlightRoute)
  );
}

/**
 * 从本地 JSON 接口读取并校验响应。
 */
async function readJson(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${url}`);
  }

  return response.json() as Promise<unknown>;
}

/**
 * 将航班索引数据转换为 ECharts lines3D 可用的经纬度线段。
 */
function createRouteLines(data: FlightsData) {
  function getAirportCoord(index: number): [number, number] | null {
    const airport = data.airports[index];

    if (!airport) {
      return null;
    }

    if (airport[3] === null || airport[4] === null) {
      return null;
    }

    return [airport[3], airport[4]];
  }

  return data.routes.reduce<RouteLine[]>((routes, route) => {
    const from = getAirportCoord(route[1]);
    const to = getAirportCoord(route[2]);

    if (from && to) {
      routes.push([from, to]);
    }

    return routes;
  }, []);
}

/**
 * 为首页抽样航线，降低视觉密度并避免品牌模块变成数据大屏。
 */
function selectRouteLines(routes: RouteLine[], variant: GlobeVariant) {
  if (variant === "project" || routes.length <= HOME_ROUTE_LIMIT) {
    return routes;
  }

  const step = routes.length / HOME_ROUTE_LIMIT;

  return Array.from({ length: HOME_ROUTE_LIMIT }, (_, index) => {
    return routes[Math.floor(index * step)] ?? routes[0];
  }).filter((route): route is RouteLine => Boolean(route));
}

/**
 * 根据页面场景返回不同的 ECharts GL 配置片段。
 */
function getGlobeOption(variant: GlobeVariant, routes: RouteLine[]) {
  if (variant === "home") {
    return {
      geo3D: {
        map: "world",
        shading: "lambert",
        silent: true,
        environment: "#eef6ff",
        postEffect: {
          enable: true,
          bloom: {
            enable: false,
          },
        },
        groundPlane: {
          show: false,
        },
        light: {
          main: {
            intensity: 1.22,
            alpha: 46,
            beta: 18,
          },
          ambient: {
            intensity: 0.78,
          },
        },
        viewControl: {
          distance: 82,
          alpha: 82,
          panMouseButton: "left",
          rotateMouseButton: "right",
        },
        itemStyle: {
          color: "#9fb6e8",
          borderColor: "rgba(58, 77, 145, 0.68)",
          borderWidth: 0.64,
          opacity: 1,
        },
        emphasis: {
          itemStyle: {
            color: "#93aae0",
          },
        },
        regionHeight: 0.45,
      },
      series: [
        {
          type: "lines3D",
          coordinateSystem: "geo3D",
          effect: {
            show: true,
            trailWidth: 2,
            trailOpacity: 0.58,
            trailLength: 0.24,
            constantSpeed: 3.8,
          },
          blendMode: "source-over",
          lineStyle: {
            color: "#1e40af",
            width: 0.18,
            opacity: 0.16,
          },
          data: routes,
        },
        {
          type: "lines3D",
          coordinateSystem: "geo3D",
          effect: {
            show: true,
            trailWidth: 5.2,
            trailOpacity: 0.96,
            trailLength: 0.06,
            constantSpeed: 5.8,
          },
          blendMode: "source-over",
          lineStyle: {
            color: "#172554",
            width: 0.34,
            opacity: 0.42,
          },
          data: routes.filter((_, index) => index % 9 === 0),
        },
      ],
    };
  }

  return {
    geo3D: {
      map: "world",
      shading: "lambert",
      silent: true,
      environment: "#07101f",
      postEffect: {
        enable: true,
        bloom: {
          enable: true,
          intensity: 0.12,
        },
      },
      groundPlane: {
        show: false,
      },
      light: {
        main: {
          intensity: 1.35,
          alpha: 44,
          beta: 24,
        },
        ambient: {
          intensity: 0.62,
        },
      },
      viewControl: {
        distance: 76,
        alpha: 82,
        panMouseButton: "left",
        rotateMouseButton: "right",
      },
      itemStyle: {
        color: "#15213a",
        borderColor: "rgba(126, 166, 255, 0.46)",
        borderWidth: 0.55,
        opacity: 0.96,
      },
      emphasis: {
        itemStyle: {
          color: "#1e2b4a",
        },
      },
      regionHeight: 0.9,
    },
    series: [
      {
        type: "lines3D",
        coordinateSystem: "geo3D",
        effect: {
          show: true,
          trailWidth: 1,
          trailOpacity: 0.32,
          trailLength: 0.16,
          constantSpeed: 5,
        },
        blendMode: "lighter",
        lineStyle: {
          color: "#8db7ff",
          width: 0.18,
          opacity: 0.035,
        },
        data: routes,
      },
    ],
  };
}

/**
 * 渲染可复用的 ECharts GL 全球航线画布。
 */
function FlightsGlobeCanvas({
  className,
  showStatus = true,
  variant,
}: FlightsGlobeCanvasProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading global routes");

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    /**
     * 初始化 ECharts GL 图表，并绑定窗口事件。
     */
    async function mountChart() {
      const container = chartRef.current;

      if (!container) {
        return;
      }

      const echarts = await import("echarts");
      await import("echarts-gl");

      const [worldData, flightsData] = await Promise.all([
        readJson(WORLD_MAP_URL),
        readJson(FLIGHTS_DATA_URL),
      ]);

      if (!isFlightsData(flightsData)) {
        throw new Error("Invalid flights data");
      }

      if (disposed) {
        return;
      }

      echarts.registerMap(
        "world",
        worldData as Parameters<typeof echarts.registerMap>[1],
      );

      const chart = echarts.init(container);
      const allRoutes = createRouteLines(flightsData);
      const routes = selectRouteLines(allRoutes, variant);
      const option = getGlobeOption(variant, routes);

      chart.setOption(option as Parameters<typeof chart.setOption>[0]);
      setStatus(
        variant === "home"
          ? "Global AI Flow"
          : `${routes.length.toLocaleString("en-US")} routes rendered`,
      );

      /**
       * 响应容器尺寸变化，保持图表铺满画布。
       */
      function handleResize() {
        chart.resize();
      }

      /**
       * 按键时切换 lines3D 的流动效果，复刻官方示例交互。
       */
      function handleKeyDown() {
        chart.dispatchAction({
          type: "lines3DToggleEffect",
          seriesIndex: 0,
        });
      }

      window.addEventListener("resize", handleResize);
      window.addEventListener("keydown", handleKeyDown);

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleKeyDown);
        chart.dispose();
      };
    }

    mountChart().catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to load chart";
      setStatus(message);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [variant]);

  return (
    <div className={className}>
      <div className="projects-globe-chart" ref={chartRef} />
      {showStatus ? <div className="projects-globe-status">{status}</div> : null}
    </div>
  );
}

/**
 * 渲染首页 Hero 背景中的全球 AI Flow 动效。
 */
export function HomeFlightsGlobeBackground() {
  return (
    <div className="hero-flow-background" aria-hidden="true">
      <FlightsGlobeCanvas
        className="hero-flow-background-canvas"
        showStatus={false}
        variant="home"
      />
    </div>
  );
}

/**
 * 渲染项目页的 3D 全球航线图。
 */
export function ProjectsFlightsGlobe({
  variant = "project",
}: ProjectsFlightsGlobeProps) {
  return (
    <section
      className={`projects-globe-section projects-globe-section-${variant}`}
      aria-labelledby={`${variant}-globe-title`}
    >
      <div className="projects-globe-copy">
        <p className="eyebrow">
          {variant === "home" ? "Global AI Flow" : "Global Workflow Map"}
        </p>
        <h2 id={`${variant}-globe-title`}>
          {variant === "home" ? "世界范围的 AI 工作流" : "AI-native 项目网络"}
        </h2>
        <p>
          {variant === "home"
            ? "让想法、上下文与工具调用在全球协作中流动，最终被锻造成真实产品。"
            : "用 3D 航线图表达 YiForge Studio 正在连接工具、工作流与全球化协作方式。"}
        </p>
      </div>
      <FlightsGlobeCanvas className="projects-globe-panel" variant={variant} />
    </section>
  );
}
