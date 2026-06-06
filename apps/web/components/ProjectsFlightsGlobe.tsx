"use client";

/**
 * 职责：在首页 Hero 背景中渲染基于 ECharts GL 的全球 AI Flow 动效。
 */

import { useEffect, useRef, useState } from "react";

type Airport = [string, string, string, number | null, number | null];

type FlightRoute = [number, number, number];

type FlightsData = {
  airports: Airport[];
  routes: FlightRoute[];
};

type RouteLine = [[number, number], [number, number]];

const FLIGHTS_DATA_URL = "/data/echarts/flights.json";
const WORLD_MAP_URL = "/data/echarts/world.json";
const HOME_ROUTE_LIMIT = 900;
const HOME_GLOBE_DELAY_MS = 1600;

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
function selectRouteLines(routes: RouteLine[]) {
  if (routes.length <= HOME_ROUTE_LIMIT) {
    return routes;
  }

  const step = routes.length / HOME_ROUTE_LIMIT;

  return Array.from({ length: HOME_ROUTE_LIMIT }, (_, index) => {
    return routes[Math.floor(index * step)] ?? routes[0];
  }).filter((route): route is RouteLine => Boolean(route));
}

/**
 * 延迟首页背景图表初始化，把首屏 LCP 资源优先留给标题、字体和关键图片。
 */
function scheduleChartMount(callback: () => void) {
  const timer = window.setTimeout(callback, HOME_GLOBE_DELAY_MS);

  return () => {
    window.clearTimeout(timer);
  };
}

/**
 * 判断当前环境是否需要加载首页 globe 动效资源。
 */
function shouldMountHomeGlobe() {
  return !window.matchMedia(
    "(max-width: 720px), (prefers-reduced-motion: reduce)",
  ).matches;
}

/**
 * 返回首页 AI Flow 的 ECharts GL 配置。
 */
function getGlobeOption(routes: RouteLine[]) {
  return {
    backgroundColor: "transparent",
    geo3D: {
      map: "world",
      shading: "lambert",
      silent: true,
      environment: "#f7fbff",
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
        opacity: 0.86,
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

/**
 * 渲染可复用的 ECharts GL 全球航线画布。
 */
function FlightsGlobeCanvas() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    if (!shouldMountHomeGlobe()) {
      return () => {};
    }

    let disposed = false;
    let cleanup = () => {};
    let cancelScheduledMount = () => {};
    let readyFrame = 0;

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
      const routes = selectRouteLines(allRoutes);
      const option = getGlobeOption(routes);

      chart.setOption(option as Parameters<typeof chart.setOption>[0]);
      readyFrame = window.requestAnimationFrame(() => {
        if (!disposed) {
          setIsChartReady(true);
        }
      });

      /**
       * 响应容器尺寸变化，保持图表铺满画布。
       */
      function handleResize() {
        chart.resize();
      }

      window.addEventListener("resize", handleResize);

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }

    cancelScheduledMount = scheduleChartMount(() => {
      mountChart().catch(() => {});
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(readyFrame);
      cancelScheduledMount();
      cleanup();
    };
  }, []);

  return (
    <div className={`hero-flow-background-canvas${isChartReady ? " is-ready" : ""}`}>
      <div className="projects-globe-chart" ref={chartRef} />
    </div>
  );
}

/**
 * 渲染首页 Hero 背景中的全球 AI Flow 动效。
 */
export function HomeFlightsGlobeBackground() {
  return (
    <div className="hero-flow-background" aria-hidden="true">
      <FlightsGlobeCanvas />
    </div>
  );
}
