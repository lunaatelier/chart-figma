import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import * as echarts from "echarts";
import { ChevronDown, ChevronUp, Plus, X, Trash2, Download, RefreshCw, Shuffle, Edit2, Check, Sun, Moon, Info } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type SizePreset = "S" | "M" | "L" | "Custom";
interface Dataset { id: string; name: string; data: number[]; color: string; }

// ─── Colors ───────────────────────────────────────────────────────────────────
function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / d + 2) / 6 : ((r - g) / d + 4) / 6;
  return { h: h * 360, s, l };
}
function hslToHex(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  return `#${[r, g, b].map(n => Math.round((n + m) * 255).toString(16).padStart(2, "0")).join("")}`;
}
function generatePalette(hex: string): string[] {
  try {
    const { h, s, l } = hexToHsl(hex);
    return [0, 51, 102, 153, 204, 255, 306].map((o, i) => hslToHex(h + o, Math.min(1, Math.max(0.4, s + (i % 2 ? -0.1 : 0))), Math.min(0.7, Math.max(0.35, l + (i % 3 === 1 ? 0.12 : i % 3 === 2 ? -0.1 : 0)))));
  } catch { return ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#06b6d4", "#8b5cf6", "#f97316"]; }
}
const isValidHex = (h: string) => /^#[0-9A-Fa-f]{6}$/.test(h);
const baseRand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

// Deterministic PRNG (mulberry32) seeded from a chart id — so a "static demo" chart's fake
// data stays put across re-renders that shouldn't change it (theme toggle, resize, SVG
// export re-invoking buildEChartsOption), instead of reshuffling on every call.
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashSeed(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function createSeededRand(key: string) {
  const random = mulberry32(hashSeed(key));
  const rand = (a: number, b: number) => Math.floor(random() * (b - a + 1)) + a;
  return { random, rand };
}

// ─── Size Presets ─────────────────────────────────────────────────────────────
const SIZE_PRESETS: Record<SizePreset, { w: number; h: number }> = {
  S: { w: 300, h: 200 }, M: { w: 800, h: 500 }, L: { w: 1200, h: 700 }, Custom: { w: 800, h: 500 },
};

// ─── ECharts Chart Catalogue ──────────────────────────────────────────────────
export const ECHARTS_CATALOGUE = [
  {
    cat: "Line", items: [
      { id: "line-basic", label: "Basic Line" },
      { id: "line-area-stacked", label: "Stacked Area" },
      { id: "line-bump", label: "Bump Chart" },
      { id: "line-confidence", label: "Confidence Band" },
      { id: "line-step", label: "Step Line" },
      { id: "line-area-time", label: "Area + Time" },
      { id: "line-multiple-x", label: "Multiple X Axes" },
      { id: "line-rainfall", label: "Rainfall vs Evaporation" },
      { id: "line-datazoom", label: "DataZoom" },
      { id: "line-dynamic", label: "Dynamic Data" },
      { id: "line-aqi", label: "Beijing AQI" },
      { id: "large-scale-area", label: "Large Scale Area" },
      { id: "area-rainfall", label: "Rainfall" },
      { id: "line-race", label: "Line Race" },
    ],
  },
  {
    cat: "Bar", items: [
      { id: "bar-basic", label: "Basic Bar" },
      { id: "bar-background", label: "Bar Background" },
      { id: "bar-negative", label: "Negative Values" },
      { id: "bar-stacked", label: "Stacked Bar" },
      { id: "bar-stacked-norm", label: "Stacked 100%" },
      { id: "bar-horizontal", label: "Horizontal Bar" },
      { id: "bar-mixed", label: "Mixed Line+Bar" },
      { id: "bar-waterfall", label: "Waterfall" },
      { id: "bar-race", label: "Bar Race" },
      { id: "bar-world-pop", label: "World Population" },
      { id: "bar-animation", label: "Animation Delay" },
      { id: "bar-brush", label: "Brush Select" },
      { id: "bar-multi-y", label: "Multiple Y Axes" },
      { id: "bar-encode", label: "Simple Encode" },
      { id: "bar-watermark", label: "Watermark" },
      { id: "bar-polar", label: "Bar on Polar" },
      { id: "bar-polar-round", label: "Rounded Polar" },
      { id: "bar-polar-stack", label: "Stacked Polar" },
      { id: "bar-polar-stack-radial", label: "Stacked Polar (Radial)" },
    ],
  },
  {
    cat: "Pie", items: [
      { id: "pie-basic", label: "Basic Pie" },
      { id: "pie-doughnut", label: "Doughnut" },
      { id: "pie-half", label: "Half Doughnut" },
      { id: "pie-rose", label: "Nightingale" },
      { id: "pie-scrollable", label: "Scrollable Legend" },
      { id: "pie-label-adjust", label: "Label Adjust" },
      { id: "pie-referer", label: "Referer" },
    ],
  },
  {
    cat: "Scatter", items: [
      { id: "scatter-basic", label: "Basic Scatter" },
      { id: "scatter-bubble", label: "Bubble" },
      { id: "scatter-distribution", label: "Distribution" },
      { id: "scatter-single", label: "Single Axis" },
      { id: "scatter-jitter", label: "Jittering" },
    ],
  },
  {
    cat: "Candlestick", items: [
      { id: "candle-basic", label: "Basic Candle" },
      { id: "candle-large", label: "Large Scale" },
    ],
  },
  {
    cat: "Radar", items: [
      { id: "radar-basic", label: "Basic Radar" },
      { id: "radar-browsers", label: "Browsers" },
      { id: "radar-aqi", label: "AQI Radar" },
    ],
  },
  {
    cat: "Heatmap", items: [
      { id: "heat-cartesian", label: "Cartesian" },
      { id: "heat-calendar", label: "Calendar" },
      { id: "heat-large", label: "Large Data (10K)" },
    ],
  },
  {
    cat: "Gauge", items: [
      { id: "gauge-simple", label: "Simple" },
      { id: "gauge-speed", label: "Speed" },
      { id: "gauge-progress", label: "Progress" },
    ],
  },
  {
    cat: "Tree / Graph", items: [
      { id: "tree-lr", label: "Tree (L→R)" },
      { id: "treemap-basic", label: "Treemap" },
      { id: "treemap-sunburst", label: "Sunburst" },
      { id: "sankey-basic", label: "Sankey" },
      { id: "sankey-gradient", label: "Sankey Gradient" },
      { id: "funnel-basic", label: "Funnel" },
      { id: "graph-les-mis", label: "Force Graph" },
      { id: "graph-hide-overlap", label: "Hide Overlapped Label" },
      { id: "graph-gradient-edge", label: "Gradient Edge" },
    ],
  },
  {
    cat: "Special", items: [
      { id: "pictorial-bar", label: "Pictorial Bar" },
      { id: "share-dataset", label: "Share Dataset" },
    ],
  },
];

// Chart types that render fixed preset/random data and ignore Data Input entirely
const STATIC_DEMO_CHARTS = new Set([
  "line-dynamic", "line-aqi",
  "bar-waterfall", "bar-race", "bar-world-pop",
  "pie-referer",
  "candle-basic", "candle-large",
  "heat-cartesian", "heat-calendar",
  "radar-browsers",
  "tree-lr", "treemap-sunburst", "sankey-basic", "sankey-gradient",
  "scatter-distribution", "scatter-single", "scatter-jitter",
  "large-scale-area", "area-rainfall", "line-race",
  "radar-aqi", "heat-large", "graph-les-mis", "graph-hide-overlap", "graph-gradient-edge",
]);
// Chart types that only ever read datasets[0] — extra datasets are silently ignored
const FIRST_DATASET_ONLY_CHARTS = new Set([
  "pie-basic", "pie-doughnut", "pie-half", "pie-rose", "pie-label-adjust",
  "treemap-basic", "funnel-basic", "pictorial-bar",
  "bar-encode", "bar-polar-round",
]);
// Gauge charts read a single number (data[0]), not the full label/value grid
const SINGLE_VALUE_CHARTS = new Set(["gauge-simple", "gauge-speed"]);
const MULTI_SINGLE_VALUE_CHARTS = new Set(["gauge-progress"]);
// Charts where the shared `labels` state feeds the Y axis (category) instead of X — panel copy should flip
const Y_AXIS_CATEGORY_CHARTS = new Set(["bar-negative", "bar-horizontal", "pictorial-bar"]);

// ─── Sample Data Generators ───────────────────────────────────────────────────
function genDates(count: number, startYear = 2024) {
  const dates: string[] = [];
  let d = new Date(startYear, 0, 1);
  for (let i = 0; i < count; i++) {
    dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function genOHLC(count: number, rand: (a: number, b: number) => number = baseRand) {
  const data: [string, number, number, number, number][] = [];
  let price = 100;
  const start = new Date(2024, 0, 1);
  for (let i = 0; i < count; i++) {
    const d = new Date(start); d.setDate(d.getDate() + i);
    const o = price + rand(-5, 5), c = o + rand(-8, 8);
    const h = Math.max(o, c) + rand(1, 6), l = Math.min(o, c) - rand(1, 6);
    price = c;
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    data.push([ds, o, c, l, h]);
  }
  return data;
}

// A small hub-and-spoke network with a bit of random extra wiring — reused across the
// force-layout graph demos (Les Miserables / Hide Overlapped Label / Gradient Edge)
// instead of fetching the official examples' external les-miserables.json dataset.
function genGraphData(n = 40, rand: (a: number, b: number) => number = baseRand, random: () => number = Math.random) {
  const categoryNames = ["Core", "Support", "Fringe"];
  const nodes = Array.from({ length: n }, (_, i) => {
    const isHub = i < 3;
    const category = isHub ? i : rand(0, 2);
    const symbolSize = isHub ? rand(34, 48) : rand(8, 22);
    return { id: String(i), name: `Node ${i}`, symbolSize, category, value: symbolSize };
  });
  const links: { source: string; target: string }[] = [];
  for (let i = 3; i < n; i++) {
    links.push({ source: String(i), target: String(rand(0, 2)) });
    if (random() < 0.3) links.push({ source: String(i), target: String(rand(3, n - 1)) });
  }
  return { nodes, links, categories: categoryNames.map(name => ({ name })) };
}

// ─── ECharts Option Builder ───────────────────────────────────────────────────
function buildEChartsOption(
  chartId: string,
  labels: string[],
  datasets: Dataset[],
  palette: string[],
  theme: "light" | "dark",
  title: string,
  size: { w: number; h: number },
  autoResponsive: boolean,
  smoothLine: boolean,
): echarts.EChartsOption {
  // Static-demo charts ignore Data Input and fabricate their own numbers — but this
  // function gets re-invoked on every theme toggle, resize, and SVG export, so without a
  // fixed seed those charts would silently reshuffle on unrelated interactions and could
  // render different data on screen vs. in an exported SVG (which rebuilds the option).
  const isStaticDemo = STATIC_DEMO_CHARTS.has(chartId);
  const seeded = isStaticDemo ? createSeededRand(chartId) : null;
  const rand = seeded ? seeded.rand : baseRand;
  const random = seeded ? seeded.random : Math.random;

  const bg = theme === "dark" ? "#1E1E2E" : "#ffffff";
  const fg = theme === "dark" ? "#d1d5db" : "#374151";
  const axisC = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)";
  const w = size.w;
  const isSmall = autoResponsive && w <= 400;
  const isMid = autoResponsive && w > 400 && w <= 800;
  const titleSz = isSmall ? 12 : isMid ? 16 : 20;
  const legendBottom = isSmall || isMid;
  const axisFontSz = isSmall ? 9 : 11;

  const axisTick = { axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz }, axisLine: { lineStyle: { color: axisC } }, splitLine: { lineStyle: { color: axisC } } };
  const titleCfg: echarts.TitleComponentOption | undefined = title
    ? { text: title, left: "center", top: 6, textStyle: { color: fg, fontSize: titleSz, fontFamily: "Inter", fontWeight: "bold" } } : undefined;
  const legend: echarts.LegendComponentOption = {
    show: !isSmall,
    ...(legendBottom
      ? { bottom: 4, left: "center" }
      : { right: 8, top: "middle", orient: "vertical" as const }),
    itemGap: 16,
    textStyle: { color: fg, fontFamily: "Inter", fontSize: isSmall ? 10 : 12 },
  };
  const topPad = title ? (isSmall ? 36 : 52) : (isSmall ? 12 : 20);
  const gridL = isSmall ? 8 : 48;
  const grid = { left: gridL, right: legendBottom ? 8 : 96, top: topPad, bottom: isMid ? 60 : 28, containLabel: true };
  const gridFull = { left: gridL, right: isSmall ? 8 : 12, top: topPad, bottom: 28, containLabel: true };
  const tooltip: echarts.TooltipComponentOption = { trigger: "axis", backgroundColor: theme === "dark" ? "#1f2937" : "#fff", borderColor: axisC, textStyle: { color: fg, fontFamily: "Inter", fontSize: 12 } };
  // A second/opposite value yAxis needs room reserved on the right regardless of legend width —
  // "named" (has its own name label) needs more than a bare tick-only axis.
  const dualAxisNameRight = isSmall ? 46 : 64;
  const dualAxisTickRight = isSmall ? 28 : 40;
  const withMinRight = (g: { right: number } & Record<string, unknown>, min: number) => ({ ...g, right: Math.max(g.right, min) });
  // Charts with a right-side value axis put the legend at the bottom regardless of width,
  // since a vertical right-aligned legend would collide with that axis's name/ticks.
  const legendAxisSafe: echarts.LegendComponentOption = { show: !isSmall, bottom: 4, left: "center", itemGap: 16, textStyle: { color: fg, fontFamily: "Inter", fontSize: isSmall ? 10 : 12 } };
  // Right margin sized to the longest end-of-line label text instead of a guessed constant.
  const endLabelRight = (labelsArr: string[], fontSz = 11) => Math.max(...labelsArr.map(l => l.length)) * fontSz * 0.62 + 24;

  // ── helpers ──
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const userLabels = labels.length ? labels : months;
  const userVals = (i = 0) => datasets[i]?.data ?? Array.from({ length: userLabels.length }, () => rand(20, 100));

  // ══════════════════════════════════════════════════════════════════════════
  switch (chartId) {

    // ── LINE ──────────────────────────────────────────────────────────────
    case "line-basic":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "line", data: ds.data, smooth: smoothLine,
          symbol: "circle", symbolSize: 6, lineStyle: { width: 2.5 },
          itemStyle: { color: palette[i % palette.length] },
        })),
      };

    case "line-area-stacked":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip, grid,
        xAxis: { type: "category", data: userLabels, boundaryGap: false, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "line", stack: "total",
          areaStyle: { opacity: 0.6 }, smooth: smoothLine, data: ds.data,
          lineStyle: { width: 2 }, itemStyle: { color: palette[i % palette.length] },
        })),
      };

    case "line-bump": {
      const teams = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];
      const bumData = teams.map((t, i) => {
        let rank = i + 1;
        const vals = userLabels.map(() => { rank = Math.max(1, Math.min(teams.length, rank + rand(-1, 1))); return rank; });
        return { name: t, type: "line" as const, data: vals, smooth: false, symbolSize: 8, lineStyle: { width: 2.5 }, itemStyle: { color: palette[i % palette.length] } };
      });
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", inverse: true, min: 1, max: teams.length, interval: 1, ...axisTick },
        series: bumData,
      };
    }

    case "line-confidence": {
      const base = userVals(0);
      const upper = base.map(v => +(v + rand(5, 15)).toFixed(1));
      const lower = base.map(v => +(v - rand(5, 15)).toFixed(1));
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: [
          { name: "Lower", type: "line", data: lower, lineStyle: { opacity: 0 }, stack: "confidence-band", symbol: "none" },
          { name: "Upper", type: "line", data: upper.map((v, i) => +(v - lower[i]).toFixed(1)), lineStyle: { opacity: 0 }, areaStyle: { color: palette[0] + "40" }, stack: "confidence-band", symbol: "none" },
          { name: datasets[0]?.name ?? "Value", type: "line", data: base, smooth: smoothLine, lineStyle: { width: 2.5 }, itemStyle: { color: palette[0] }, symbolSize: 5 },
        ],
        legend: { ...legend, data: [datasets[0]?.name ?? "Value"] },
      };
    }

    case "line-step":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "line", step: ["start", "middle", "end"][i % 3] as any,
          data: ds.data, lineStyle: { width: 2.5 }, itemStyle: { color: palette[i % palette.length] },
        })),
      };

    case "line-area-time": {
      const dates = genDates(userLabels.length || 30).slice(0, userLabels.length || 30);
      const vals = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip: { ...tooltip, trigger: "axis" }, grid,
        xAxis: { type: "time", ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: [{
          name: datasets[0]?.name ?? "Value", type: "line", smooth: smoothLine,
          data: dates.map((d, i) => [d, vals[i] ?? rand(20, 100)]),
          areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: palette[0] + "CC" }, { offset: 1, color: palette[0] + "00" }] } },
          lineStyle: { color: palette[0], width: 2.5 },
          itemStyle: { color: palette[0] }, symbol: "none",
        }],
        dataZoom: [{ type: "inside", start: 0, end: 100 }, { start: 0, end: 100 }],
      };
    }

    case "line-multiple-x": {
      const v1 = userVals(0), v2 = userVals(1);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip, grid: { ...grid, top: title ? 70 : 40 },
        xAxis: [
          { type: "category", data: userLabels, ...axisTick },
          { type: "category", data: userLabels, position: "top", ...axisTick },
        ],
        yAxis: { type: "value", ...axisTick },
        series: [
          { name: datasets[0]?.name ?? "Series 1", type: "line", xAxisIndex: 0, data: v1, smooth: smoothLine, lineStyle: { width: 2.5 }, itemStyle: { color: palette[0] } },
          { name: datasets[1]?.name ?? "Series 2", type: "line", xAxisIndex: 1, data: v2, smooth: smoothLine, lineStyle: { width: 2.5, type: "dashed" }, itemStyle: { color: palette[1] } },
        ],
      };
    }

    case "line-rainfall": {
      const evap = userLabels.map(() => rand(10, 60));
      const precip = userLabels.map(() => rand(20, 120));
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { ...tooltip, trigger: "axis", axisPointer: { type: "cross" } },
        legend: { ...legendAxisSafe, data: ["Evaporation", "Precipitation"] },
        grid: withMinRight(grid, dualAxisNameRight),
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: [
          { type: "value", name: "Evap (ml)", nameTextStyle: { color: fg, fontFamily: "Inter", fontSize: 11 }, ...axisTick },
          { type: "value", name: "Precip (ml)", nameTextStyle: { color: fg, fontFamily: "Inter", fontSize: 11 }, opposite: true, splitLine: { show: false } },
        ],
        series: [
          { name: "Evaporation", type: "bar", data: evap, itemStyle: { color: palette[0] }, barMaxWidth: 30 },
          { name: "Precipitation", type: "line", yAxisIndex: 1, data: precip, smooth: smoothLine, lineStyle: { color: palette[1], width: 2.5 }, itemStyle: { color: palette[1] } },
        ],
      };
    }

    case "line-datazoom":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip, grid: { ...grid, bottom: legendBottom ? 90 : 60 },
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        dataZoom: [{ type: "slider", bottom: legendBottom ? 52 : 24, height: 20 }, { type: "inside" }],
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "line", data: ds.data, smooth: smoothLine,
          lineStyle: { width: 2 }, itemStyle: { color: palette[i % palette.length] },
        })),
      };

    case "line-dynamic": {
      const dyn = Array.from({ length: 20 }, () => rand(20, 100));
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip, grid,
        xAxis: { type: "category", data: Array.from({ length: 20 }, (_, i) => `T${i + 1}`), ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: [{ name: "Value", type: "line", data: dyn, smooth: smoothLine, lineStyle: { color: palette[0], width: 2.5 }, itemStyle: { color: palette[0] }, areaStyle: { color: palette[0] + "30" } }],
      };
    }

    case "line-aqi": {
      const aqiData = Array.from({ length: 72 }, () => rand(30, 300));
      const xData = Array.from({ length: 72 }, (_, i) => `${String(Math.floor(i / 3)).padStart(2, "0")}:${["00", "20", "40"][i % 3]}`);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip,
        visualMap: { show: false, type: "piecewise", pieces: [{ gt: 0, lte: 50, color: palette[2] ?? "#10b981" }, { gt: 50, lte: 150, color: palette[3] ?? "#f59e0b" }, { gt: 150, lte: 300, color: palette[3] ?? "#ef4444" }], seriesIndex: 0 },
        grid: { ...grid, bottom: 40 },
        xAxis: { type: "category", data: xData, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: [{ name: "AQI", type: "line", data: aqiData, smooth: smoothLine, symbol: "none", lineStyle: { width: 2 }, markLine: { silent: true, lineStyle: { color: axisC }, data: [{ yAxis: 50 }, { yAxis: 150 }, { yAxis: 200 }] } }],
      };
    }

    case "large-scale-area": {
      const n = 1500;
      const oneDay = 24 * 3600 * 1000;
      let t = +new Date(2020, 0, 1);
      const ldata: [number, number][] = [[t, rand(80, 160)]];
      for (let i = 1; i < n; i++) { t += oneDay; ldata.push([t, Math.max(0, ldata[i - 1][1] + rand(-12, 12))]); }
      return {
        backgroundColor: bg, title: titleCfg || { text: "Large-Scale Area Chart", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "axis", axisPointer: { type: "line" } },
        grid: gridFull,
        xAxis: { type: "time", boundaryGap: false, ...axisTick },
        yAxis: { type: "value", boundaryGap: [0, "100%"], ...axisTick },
        dataZoom: [{ type: "inside", start: 0, end: 12 }, { start: 0, end: 12, height: 16, bottom: 6 }],
        series: [{ type: "line", smooth: true, symbol: "none", areaStyle: { color: palette[0] + "55" }, lineStyle: { color: palette[0], width: 1.5 }, data: ldata }],
        legend: { show: false },
      };
    }

    case "area-rainfall": {
      const hours = 240;
      const rdates = Array.from({ length: hours }, (_, i) => { const d = new Date(2024, 5, 1); d.setHours(d.getHours() + i); return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:00`; });
      let flow = 0.6;
      const flowData = rdates.map(() => { flow = Math.max(0.2, flow + rand(-10, 10) / 100); return +flow.toFixed(2); });
      const rainData = rdates.map(() => (random() < 0.12 ? +(random() * 3).toFixed(2) : 0));
      return {
        backgroundColor: bg, title: titleCfg || { text: "Rainfall and Flow Relationship", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        // extra bottom room stacks: xAxis labels, then legend, then the dataZoom slider
        grid: withMinRight({ ...gridFull, bottom: 88 }, dualAxisNameRight),
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        legend: { ...legendAxisSafe, bottom: 34, data: ["Flow", "Rainfall"] },
        dataZoom: [{ show: true, start: 40, end: 70, bottom: 8 }, { type: "inside", start: 40, end: 70 }],
        xAxis: { type: "category", boundaryGap: false, data: rdates, axisLine: { onZero: false, lineStyle: { color: axisC } }, axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz } },
        yAxis: [
          { type: "value", name: "Flow", nameTextStyle: { color: fg, fontFamily: "Inter" }, ...axisTick },
          { type: "value", name: "Rainfall", nameLocation: "start", inverse: true, ...axisTick },
        ],
        series: [
          { name: "Flow", type: "line", areaStyle: { opacity: 0.5 }, lineStyle: { width: 1, color: palette[0] }, itemStyle: { color: palette[0] }, symbol: "none", data: flowData },
          { name: "Rainfall", type: "line", yAxisIndex: 1, areaStyle: { opacity: 0.5 }, lineStyle: { width: 1, color: palette[1] }, itemStyle: { color: palette[1] }, symbol: "none", data: rainData },
        ],
      };
    }

    case "line-race": {
      const countries = ["Finland", "France", "Germany", "Norway", "Poland", "Portugal"];
      const years = Array.from({ length: 8 }, (_, i) => String(1950 + i * 10));
      const raceSeries = countries.map((name, ci) => {
        let v = rand(800, 2000);
        const data = years.map(() => { v = Math.max(500, v + rand(-50, 400)); return v; });
        return {
          type: "line" as const, name, showSymbol: false, data,
          endLabel: { show: true, formatter: "{a}", color: fg, fontFamily: "Inter", fontSize: 11 },
          labelLayout: { moveOverlap: "shiftY" as const },
          emphasis: { focus: "series" as const },
          lineStyle: { width: 2.5, color: palette[ci % palette.length] },
          itemStyle: { color: palette[ci % palette.length] },
        };
      });
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Income Growth by Country", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "axis" },
        grid: { ...grid, right: endLabelRight(countries, 11) },
        xAxis: { type: "category", data: years, ...axisTick },
        yAxis: { type: "value", name: "Income", nameTextStyle: { color: fg, fontFamily: "Inter" }, ...axisTick },
        series: raceSeries,
        legend: { show: false },
        animationDuration: 4000,
      };
    }

    // ── BAR ───────────────────────────────────────────────────────────────
    case "bar-basic":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis" }, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar", data: ds.data,
          itemStyle: { color: palette[i % palette.length], borderRadius: [4, 4, 0, 0] }, barMaxWidth: 40,
        })),
      };

    case "bar-background": {
      const maxVal = Math.max(...userVals(0)) * 1.3;
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip, grid: gridFull,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", max: maxVal, ...axisTick },
        series: [
          { type: "bar", data: Array(userLabels.length).fill(maxVal), barMaxWidth: 40, itemStyle: { color: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", borderRadius: [4, 4, 0, 0] }, silent: true },
          { name: datasets[0]?.name ?? "Value", type: "bar", data: userVals(0), barMaxWidth: 40, barGap: "-100%", itemStyle: { color: palette[0], borderRadius: [4, 4, 0, 0] }, label: { show: true, position: "top", color: fg, fontSize: 11, fontFamily: "Inter" } },
        ],
        legend: { show: false },
      };
    }

    case "bar-negative": {
      const neg = userLabels.map(() => rand(-80, 80));
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip, grid: gridFull,
        xAxis: { type: "value", ...axisTick },
        yAxis: { type: "category", data: userLabels, ...axisTick },
        series: [{
          name: datasets[0]?.name ?? "Profit/Loss", type: "bar", data: neg,
          barMaxWidth: 30,
          itemStyle: { color: (params: any) => params.value >= 0 ? palette[2] ?? "#10b981" : palette[3] ?? "#ef4444", borderRadius: (params: any) => params.value >= 0 ? [0, 4, 4, 0] : [4, 0, 0, 4] } as any,
        }],
      };
    }

    case "bar-stacked":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis", axisPointer: { type: "shadow" } }, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar", stack: "total", data: ds.data,
          itemStyle: { color: palette[i % palette.length] }, barMaxWidth: 50,
        })),
      };

    case "bar-stacked-norm": {
      const totals = userLabels.map((_, li) => datasets.reduce((s, ds) => s + (ds.data[li] ?? 0), 0) || 1);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis", axisPointer: { type: "shadow" } }, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", max: 100, axisLabel: { formatter: "{value}%", color: fg, fontFamily: "Inter", fontSize: 11 }, splitLine: { lineStyle: { color: axisC } } },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar", stack: "norm",
          data: ds.data.map((v, li) => +((v / totals[li]) * 100).toFixed(1)),
          itemStyle: { color: palette[i % palette.length] }, barMaxWidth: 50,
        })),
      };
    }

    case "bar-horizontal":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { ...grid, left: 80 },
        xAxis: { type: "value", ...axisTick },
        yAxis: { type: "category", data: [...userLabels].reverse(), ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar", data: [...ds.data].reverse(),
          itemStyle: { color: palette[i % palette.length], borderRadius: [0, 4, 4, 0] }, barMaxWidth: 30,
        })),
      };

    case "bar-mixed": {
      const v1 = userVals(0), v2 = userVals(1);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis", axisPointer: { type: "cross" } }, grid: withMinRight(grid, dualAxisTickRight),
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: [{ type: "value", ...axisTick }, { type: "value", splitLine: { show: false }, axisLabel: { color: fg, fontFamily: "Inter", fontSize: 11 } }],
        series: [
          { name: datasets[0]?.name ?? "Bar", type: "bar", data: v1, itemStyle: { color: palette[0], borderRadius: [4, 4, 0, 0] }, barMaxWidth: 40 },
          { name: datasets[1]?.name ?? "Line", type: "line", yAxisIndex: 1, data: v2, smooth: smoothLine, lineStyle: { color: palette[1], width: 2.5 }, itemStyle: { color: palette[1] } },
        ],
      };
    }

    case "bar-waterfall": {
      const items = ["Total\nIncome", "Rent", "Utility", "Transport", "Meals", "Phone", "Savings"];
      const raw = [2000, -400, -150, -200, -300, -100, 850];
      let running = 0;
      const placeholder: number[] = [], bar: number[] = [];
      raw.forEach((v, i) => {
        if (i === 0 || i === raw.length - 1) { placeholder.push(0); bar.push(v); running = i === 0 ? v : running; }
        else { placeholder.push(running); bar.push(v); running += v; }
      });
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip: { ...tooltip, formatter: (p: any) => Array.isArray(p) ? "" : `${p.name}: ${p.data < 0 ? "-" : "+"}${Math.abs(p.data)}` }, grid: gridFull,
        xAxis: { type: "category", data: items, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: [
          { type: "bar", stack: "total", data: placeholder, itemStyle: { borderColor: "transparent", color: "transparent" }, emphasis: { itemStyle: { borderColor: "transparent", color: "transparent" } }, silent: true },
          { name: "Amount", type: "bar", stack: "total", data: bar.map((v, i) => ({ value: v, itemStyle: { color: v >= 0 ? palette[2] ?? "#10b981" : palette[3] ?? "#ef4444", borderRadius: v >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4] } })), barMaxWidth: 40 },
        ],
        legend: { show: false },
      };
    }

    case "bar-race": {
      // A real race needs values that change over time, not one static snapshot — ECharts'
      // timeline feature drives that: each timeline entry is a frame, autoPlay steps through
      // them, and realtimeSort animates the bars reordering as values change between frames.
      const countries = ["🇺🇸 USA", "🇨🇳 China", "🇯🇵 Japan", "🇩🇪 Germany", "🇬🇧 UK", "🇫🇷 France", "🇮🇳 India"];
      const years = Array.from({ length: 10 }, (_, i) => String(2015 + i));
      let vals = countries.map(() => rand(20, 100));
      const frames = years.map(() => { vals = vals.map(v => Math.max(10, v + rand(-8, 15))); return [...vals]; });
      return {
        baseOption: {
          backgroundColor: bg, color: palette, title: { ...titleCfg, text: title || "Bar Race" },
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          grid: { ...grid, left: 110, right: 60 },
          xAxis: { max: "dataMax", ...axisTick },
          yAxis: { type: "category", data: countries, inverse: true, animationDuration: 300, animationDurationUpdate: 800, ...axisTick },
          series: [{ realtimeSort: true, type: "bar", label: { show: true, position: "right", color: fg, fontFamily: "Inter", fontSize: 11 }, itemStyle: { color: (p: any) => palette[p.dataIndex % palette.length] }, barMaxWidth: 36 }],
          animationDuration: 0, animationDurationUpdate: 800, animationEasing: "linear", animationEasingUpdate: "linear",
        },
        timeline: { show: false, autoPlay: true, playInterval: 1300, loop: true, data: years },
        options: frames.map((f, i) => ({
          series: [{ data: f }],
          graphic: { elements: [{ type: "text", right: 60, bottom: 24, style: { text: years[i], font: "bold 26px Inter", fill: axisC } }] },
        })),
      };
    }

    case "bar-world-pop": {
      const regions = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
      const pops = [4700, 1400, 750, 1000, 45];
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip,
        grid: { ...gridFull, left: 80 },
        xAxis: { type: "value", axisLabel: { formatter: (v: number) => `${v}M`, color: fg, fontFamily: "Inter", fontSize: 11 }, splitLine: { lineStyle: { color: axisC } } },
        yAxis: { type: "category", data: regions, ...axisTick },
        series: [{ type: "bar", data: pops.map((v, i) => ({ value: v, itemStyle: { color: palette[i % palette.length] } })), label: { show: true, position: "right", color: fg, fontFamily: "Inter", fontSize: 11, formatter: (p: any) => `${p.value}M` }, barMaxWidth: 32, itemStyle: { borderRadius: [0, 4, 4, 0] } }],
        legend: { show: false },
      };
    }

    case "bar-animation":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip, grid: gridFull,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar", data: ds.data.map((v, j) => ({ value: v, itemStyle: { color: palette[(i + j) % palette.length] } })),
          emphasis: { focus: "series" as const },
          animationDelay: (idx: number) => idx * 80 + i * 300,
          barMaxWidth: 40, itemStyle: { borderRadius: [4, 4, 0, 0] },
        })),
        animationEasing: "elasticOut", animationDelayUpdate: (idx: number) => idx * 5,
      };

    case "bar-brush":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis" }, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        brush: { toolbox: ["rect", "polygon", "clear"], brushLink: "all" },
        toolbox: { feature: { brush: { type: ["rect", "polygon", "clear"] } } },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar", data: ds.data,
          itemStyle: { color: palette[i % palette.length], borderRadius: [4, 4, 0, 0] }, barMaxWidth: 40,
        })),
      };

    case "bar-multi-y": {
      // One value axis per dataset (first on the left, the rest stacked on the right via
      // offset) so each series keeps its own scale — the last series renders as a line to
      // visually distinguish it, matching the official "Multiple Y Axes" example's shape.
      const rightCount = Math.max(0, datasets.length - 1);
      const multiYRight = rightCount <= 1 ? 60 : 60 + (rightCount - 1) * 68;
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        legend: { ...legendAxisSafe, data: datasets.map(d => d.name) },
        grid: withMinRight(grid, multiYRight),
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: datasets.map((ds, i) => ({
          type: "value" as const, name: ds.name, position: (i === 0 ? "left" : "right") as const,
          offset: i <= 1 ? 0 : (i - 1) * 68, alignTicks: true,
          nameTextStyle: { color: fg, fontFamily: "Inter", fontSize: 11 },
          axisLine: { show: true, lineStyle: { color: palette[i % palette.length] } },
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz },
          splitLine: { show: i === 0, lineStyle: { color: axisC } },
        })),
        series: datasets.map((ds, i) => ({
          name: ds.name, type: (i === datasets.length - 1 && datasets.length > 1 ? "line" : "bar") as const,
          yAxisIndex: i, data: ds.data, smooth: smoothLine, barMaxWidth: 30,
          itemStyle: { color: palette[i % palette.length] },
          lineStyle: { color: palette[i % palette.length], width: 2.5 },
        })),
      };
    }

    case "bar-encode": {
      // "Encode" means mapping one data dimension to a visual channel (here: bar value →
      // color) instead of hand-picking colors — visualMap reads straight off the bar's
      // own value, no separate second dimension needed.
      const v = userVals(0);
      const lo = Math.min(...v), hi = Math.max(...v);
      return {
        backgroundColor: bg, title: titleCfg || { text: "Simple Encode", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { ...gridFull, left: Math.max(...userLabels.map(l => l.length)) * 7 + (isSmall ? 16 : 24), bottom: 56 },
        xAxis: { type: "value", ...axisTick },
        yAxis: { type: "category", data: userLabels, ...axisTick },
        visualMap: {
          orient: "horizontal", left: "center", bottom: 4, calculable: true, dimension: 0,
          min: lo, max: hi, text: ["High", "Low"], textStyle: { color: fg, fontFamily: "Inter", fontSize: 11 },
          inRange: { color: [palette[3] ?? "#FD665F", palette[2] ?? "#FFCE34", palette[0] ?? "#65B581"] },
        },
        series: [{ type: "bar", data: v, label: { show: true, position: "right", color: fg, fontFamily: "Inter", fontSize: 11 } }],
        legend: { show: false },
      };
    }

    case "bar-watermark": {
      // Demonstrates the tiled-canvas-pattern watermark technique from the official
      // example, applied to a plain Data-Input-driven bar+line combo instead of the
      // original's hardcoded download-stats dashboard.
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.height = 100;
      if (ctx) {
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.globalAlpha = theme === "dark" ? 0.06 : 0.05;
        ctx.font = "20px Inter";
        ctx.translate(50, 50); ctx.rotate(-Math.PI / 4);
        ctx.fillStyle = fg; ctx.fillText("CHARTPRO", 0, 0);
      }
      return {
        backgroundColor: { type: "pattern", image: canvas, repeat: "repeat" } as any,
        color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis" }, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar", data: ds.data,
          itemStyle: { color: palette[i % palette.length], borderRadius: [4, 4, 0, 0] }, barMaxWidth: 40,
        })),
      };
    }

    case "bar-polar": {
      // radiusAxis carries the categories (each label becomes a concentric ring),
      // angleAxis carries the value — the official "Bar Chart on Polar" layout.
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis" },
        legend: { ...legendAxisSafe, data: datasets.map(d => d.name) },
        polar: { radius: isSmall ? "58%" : "70%", center: ["50%", title ? "56%" : "52%"] },
        angleAxis: { ...axisTick },
        radiusAxis: { type: "category", data: userLabels, z: 10, ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar" as const, coordinateSystem: "polar" as const, data: ds.data,
          itemStyle: { color: palette[i % palette.length] },
        })),
      };
    }

    case "bar-polar-round": {
      // Same values rendered twice — once square-cornered, once with roundCap — so the
      // two sit side by side per ring and the cap difference is easy to compare directly.
      const v = userVals(0);
      return {
        backgroundColor: bg, title: titleCfg || { text: "Rounded Bar on Polar", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "axis" },
        legend: { ...legendAxisSafe, data: ["Square Cap", "Round Cap"] },
        polar: { radius: isSmall ? "58%" : "70%", center: ["50%", "52%"] },
        angleAxis: { startAngle: 90, ...axisTick },
        radiusAxis: { type: "category", data: userLabels, z: 10, ...axisTick },
        series: [
          { name: "Square Cap", type: "bar", coordinateSystem: "polar", data: v, itemStyle: { color: palette[0], opacity: 0.85 } },
          { name: "Round Cap", type: "bar", coordinateSystem: "polar", data: v, roundCap: true, itemStyle: { color: palette[1] ?? palette[0] } },
        ],
      };
    }

    case "bar-polar-stack": {
      // angleAxis is the value axis here, so each radiusAxis ring is a stacked wedge —
      // the polar equivalent of a stacked bar chart.
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis" },
        legend: { ...legendAxisSafe, data: datasets.map(d => d.name) },
        polar: { radius: isSmall ? "58%" : "70%", center: ["50%", title ? "56%" : "52%"] },
        angleAxis: { ...axisTick },
        radiusAxis: { type: "category", data: userLabels, z: 10, ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar" as const, coordinateSystem: "polar" as const, stack: "polar-stack", data: ds.data,
          emphasis: { focus: "series" as const }, itemStyle: { color: palette[i % palette.length] },
        })),
      };
    }

    case "bar-polar-stack-radial": {
      // Axis roles swapped from bar-polar-stack: angleAxis carries the categories (each
      // label is a spoke), radiusAxis is the value — stacked bars radiate outward instead
      // of stacking around a ring.
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis" },
        legend: { ...legendAxisSafe, data: datasets.map(d => d.name) },
        polar: { radius: isSmall ? "58%" : "70%", center: ["50%", title ? "56%" : "52%"] },
        angleAxis: { type: "category", data: userLabels, ...axisTick },
        radiusAxis: { ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "bar" as const, coordinateSystem: "polar" as const, stack: "polar-stack-radial", data: ds.data,
          emphasis: { focus: "series" as const }, itemStyle: { color: palette[i % palette.length] },
        })),
      };
    }

    // ── PIE ───────────────────────────────────────────────────────────────
    case "pie-basic": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend,
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [{ type: "pie", radius: "60%", center: ["50%", "55%"], data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), itemStyle: { borderRadius: 6, borderColor: bg, borderWidth: 2 }, label: { color: fg, fontFamily: "Inter", fontSize: 11 }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.3)" } } }],
      };
    }

    case "pie-doughnut": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend,
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [{ type: "pie", radius: ["40%", "68%"], center: ["50%", "55%"], data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), itemStyle: { borderRadius: 8, borderColor: bg, borderWidth: 3 }, label: { color: fg, fontFamily: "Inter", fontSize: 11 }, emphasis: { itemStyle: { shadowBlur: 12, shadowColor: "rgba(0,0,0,0.3)" } } }],
      };
    }

    case "pie-half": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend: { ...legend, bottom: 0 },
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [{ type: "pie", radius: ["40%", "70%"], center: ["50%", "65%"], startAngle: 180, endAngle: 360, data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 }, label: { color: fg, fontFamily: "Inter", fontSize: 11 } }],
      };
    }

    case "pie-rose": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend,
        tooltip: { trigger: "item", formatter: "{b}: {c}" },
        series: [{ type: "pie", radius: ["15%", "65%"], center: ["50%", "55%"], roseType: "area" as any, data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), label: { color: fg, fontFamily: "Inter", fontSize: 10 }, itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 } }],
      };
    }

    case "pie-scrollable": {
      const items = [...userLabels, ...["Extra A", "Extra B", "Extra C", "Extra D"]];
      const v = items.map(() => rand(10, 100));
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        legend: { type: "scroll", orient: "vertical", right: 12, top: title ? 52 : 16, bottom: 20, textStyle: { color: fg, fontFamily: "Inter", fontSize: 11 } },
        tooltip: { trigger: "item", formatter: "{b}: {d}%" },
        series: [{ type: "pie", radius: "60%", center: ["40%", "55%"], data: items.map((l, i) => ({ name: l, value: v[i] })), itemStyle: { borderRadius: 6, borderColor: bg, borderWidth: 2 }, label: { show: false } }],
      };
    }

    case "pie-label-adjust": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "item", formatter: "{b}: {d}%" },
        series: [{ type: "pie", radius: "52%", center: ["50%", "55%"], data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), label: { color: fg, fontFamily: "Inter", fontSize: 11, alignTo: "labelLine" as any }, labelLine: { length: 15, length2: 10 }, itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 } }],
        legend: { show: false },
      };
    }

    case "pie-referer": {
      const refs = [{ name: "Direct", value: 335 }, { name: "Mail", value: 310 }, { name: "Affiliate", value: 274 }, { name: "Video", value: 235 }, { name: "Search", value: 400 }];
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Referer of Website", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        legend: { show: false },
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [
          { type: "pie", radius: ["0%", "30%"], label: { position: "inner", color: "#fff", fontSize: 10, fontFamily: "Inter" }, data: [{ name: "Direct+Affiliate", value: 335 + 274, itemStyle: { color: palette[0] } }, { name: "Indirect", value: 310 + 235 + 400, itemStyle: { color: palette[1] } }], itemStyle: { borderColor: bg, borderWidth: 2 } },
          { type: "pie", radius: ["35%", "60%"], label: { color: fg, fontFamily: "Inter", fontSize: 11 }, data: refs.map((r, i) => ({ ...r, itemStyle: { color: palette[i % palette.length] } })), itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 } },
        ],
      };
    }

    // ── SCATTER ───────────────────────────────────────────────────────────
    case "scatter-basic":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { trigger: "item" }, grid,
        xAxis: { type: "value", ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "scatter",
          data: ds.data.map((v, j) => [j + rand(0, 3), v + rand(-5, 5)]),
          symbolSize: 12, itemStyle: { color: palette[i % palette.length], opacity: 0.8 },
        })),
      };

    case "scatter-bubble":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { trigger: "item" }, grid,
        // boundaryGap pads the value-axis domain so the largest bubbles (and the last
        // category's axis label) don't get clipped right at the plot edge.
        xAxis: { type: "value", boundaryGap: ["8%", "8%"], ...axisTick },
        yAxis: { type: "value", boundaryGap: ["8%", "8%"], ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "scatter",
          data: ds.data.map((v, j) => [j + 1, v, Math.max(8, v * 0.4)]),
          symbolSize: (d: number[]) => d[2],
          itemStyle: { color: palette[i % palette.length], opacity: 0.7 },
        })),
      };

    case "scatter-distribution": {
      const heights = Array.from({ length: 60 }, () => rand(150, 200));
      const weights = heights.map(h => Math.round(h * 0.45 - 20 + rand(-8, 8)));
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Height vs Weight", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "item", formatter: (p: any) => `Height: ${p.data[0]}cm<br/>Weight: ${p.data[1]}kg` }, grid: gridFull,
        xAxis: { type: "value", name: "Height (cm)", nameTextStyle: { color: fg, fontFamily: "Inter" }, min: 145, max: 205, ...axisTick },
        yAxis: { type: "value", name: "Weight (kg)", nameTextStyle: { color: fg, fontFamily: "Inter" }, ...axisTick },
        series: [{ name: "Person", type: "scatter", data: heights.map((h, i) => [h, weights[i]]), symbolSize: 8, itemStyle: { color: palette[0], opacity: 0.7 } }],
        legend: { show: false },
      };
    }

    case "scatter-single": {
      const hours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const data = days.flatMap((_, di) => Array.from({ length: rand(3, 8) }, () => [rand(0, 23), di, rand(1, 10)]));
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip: { trigger: "item" },
        grid: { ...gridFull, top: title ? 60 : 40, bottom: 60, left: Math.max(...days.map(d => d.length)) * 7 + (isSmall ? 16 : 24) },
        xAxis: { type: "category", data: hours, ...axisTick, splitLine: { show: true, lineStyle: { color: axisC } } },
        yAxis: { type: "category", data: days, ...axisTick, splitLine: { show: true, lineStyle: { color: axisC } } },
        series: [{ type: "scatter", data: data.map(([h, d, s]) => ({ value: [h, d], symbolSize: s * 4, itemStyle: { color: palette[d % palette.length], opacity: 0.7 } })) }],
        legend: { show: false },
      };
    }

    case "scatter-jitter": {
      // category-axis `jitter` (ECharts 6.0+) spreads overlapping points sideways within
      // their category band instead of letting them stack on the exact same x position.
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const data: [number, number][] = [];
      days.forEach((_, di) => { const n = rand(80, 150); for (let i = 0; i < n; i++) data.push([di, +(rand(0, 100) / 10).toFixed(1)]); });
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Scatter with Jittering", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "item" },
        grid: gridFull,
        xAxis: { type: "category", data: days, jitter: isSmall ? 12 : 24, ...axisTick },
        yAxis: { type: "value", min: 0, max: 10, ...axisTick },
        series: [{ name: "Sample", type: "scatter", data, colorBy: "data", symbolSize: 6, itemStyle: { opacity: 0.45 } }],
        legend: { show: false },
      };
    }

    // ── CANDLESTICK ───────────────────────────────────────────────────────
    case "candle-basic":
    case "candle-large": {
      const count = chartId === "candle-large" ? 120 : 40;
      const ohlc = genOHLC(count, rand);
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        grid: { ...gridFull, bottom: 60 },
        xAxis: { type: "category", data: ohlc.map(d => d[0]), ...axisTick, min: "dataMin", max: "dataMax" },
        yAxis: { type: "value", scale: true, ...axisTick },
        dataZoom: [{ type: "inside", start: 70, end: 100 }, { type: "slider", bottom: 16, height: 20 }],
        series: [{
          type: "candlestick",
          data: ohlc.map(d => [d[1], d[2], d[3], d[4]]),
          itemStyle: {
            color: palette[2] ?? "#10b981", color0: palette[3] ?? "#ef4444",
            borderColor: palette[2] ?? "#10b981", borderColor0: palette[3] ?? "#ef4444",
          },
        }],
        legend: { show: false },
      };
    }

    // ── RADAR ─────────────────────────────────────────────────────────────
    case "radar-basic": {
      const maxV = Math.max(...datasets.flatMap(d => d.data)) * 1.2 || 100;
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: {},
        radar: { indicator: userLabels.map(l => ({ name: l, max: maxV })), axisName: { color: fg, fontFamily: "Inter", fontSize: 11 }, splitLine: { lineStyle: { color: axisC } }, splitArea: { areaStyle: { color: ["transparent"] } }, axisLine: { lineStyle: { color: axisC } } },
        series: [{ type: "radar", data: datasets.map((ds, i) => ({ name: ds.name, value: ds.data, itemStyle: { color: palette[i % palette.length] }, areaStyle: { opacity: 0.2 }, lineStyle: { width: 2 } })) }],
      };
    }

    case "radar-browsers": {
      const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Opera", "IE"];
      const share = [65.2, 15.4, 9.3, 4.8, 3.1, 2.2];
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Browser Market Share", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        radar: { indicator: browsers.map((b, i) => ({ name: `${b}\n${share[i]}%`, max: 70 })), axisName: { color: fg, fontFamily: "Inter", fontSize: 11 }, splitLine: { lineStyle: { color: axisC } }, splitArea: { areaStyle: { color: ["transparent"] } } },
        series: [{ type: "radar", data: [{ name: "Share (%)", value: share, itemStyle: { color: palette[0] }, areaStyle: { opacity: 0.25 }, lineStyle: { width: 2.5 } }] }],
        legend: { show: false },
      };
    }

    case "radar-aqi": {
      // Each city's series holds many daily readings (one radar polygon per day) instead
      // of a single shape — the overlapping translucent polygons show a month's variation
      // at a glance, matching the official "AQI - Radar" technique.
      const indicators = [{ name: "AQI", max: 300 }, { name: "PM2.5", max: 250 }, { name: "PM10", max: 300 }, { name: "CO", max: 5 }, { name: "NO2", max: 200 }, { name: "SO2", max: 100 }];
      const cities = ["Beijing", "Shanghai", "Guangzhou"];
      const genMonth = () => Array.from({ length: 24 }, () => [rand(20, 260), rand(5, 220), rand(20, 280), +(rand(3, 48) / 10).toFixed(1), rand(10, 120), rand(5, 70)]);
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "AQI by City", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        legend: { bottom: 4, left: "center", data: cities, itemGap: 20, textStyle: { color: fg, fontFamily: "Inter", fontSize: 12 }, selectedMode: "single" },
        radar: {
          indicator: indicators, shape: "circle", splitNumber: 5,
          axisName: { color: fg, fontFamily: "Inter", fontSize: 11 },
          splitLine: { lineStyle: { color: axisC } }, splitArea: { show: false }, axisLine: { lineStyle: { color: axisC } },
        },
        series: cities.map((city, i) => ({
          name: city, type: "radar" as const, symbol: "none",
          lineStyle: { width: 1, opacity: 0.5, color: palette[i % palette.length] },
          itemStyle: { color: palette[i % palette.length] },
          areaStyle: { opacity: 0.06 },
          data: genMonth().map(value => ({ value })),
        })),
      };
    }

    // ── HEATMAP ───────────────────────────────────────────────────────────
    case "heat-cartesian": {
      const days2 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const hrs = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      const hData = days2.flatMap((_, di) => hrs.map((_, hi) => [hi, di, rand(0, 100)]));
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { position: "top" },
        grid: { ...gridFull, left: 60, bottom: 40 },
        xAxis: { type: "category", data: hrs, splitArea: { show: true }, ...axisTick },
        yAxis: { type: "category", data: days2, splitArea: { show: true }, ...axisTick },
        visualMap: { min: 0, max: 100, calculable: true, orient: "horizontal", left: "center", bottom: 0, inRange: { color: [palette[0] + "20", palette[0]] }, textStyle: { color: fg } },
        series: [{ type: "heatmap", data: hData, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } } }],
        legend: { show: false },
      };
    }

    case "heat-calendar": {
      const year = 2024;
      const start = new Date(year, 0, 1), end = new Date(year, 11, 31);
      const calData: [string, number][] = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        calData.push([ds, rand(0, 1000)]);
      }
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: `Activity ${year}`, left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { formatter: (p: any) => `${p.data[0]}: ${p.data[1]}` },
        visualMap: { show: true, min: 0, max: 1000, calculable: true, orient: "horizontal", left: "center", bottom: 16, inRange: { color: [palette[0] + "20", palette[0]] }, textStyle: { color: fg } },
        calendar: { top: title ? 64 : 48, left: 32, right: 16, cellSize: ["auto", 14], range: year, itemStyle: { borderWidth: 1, borderColor: bg }, yearLabel: { show: false }, monthLabel: { color: fg, fontFamily: "Inter", fontSize: 11 }, dayLabel: { color: fg, fontFamily: "Inter", fontSize: 10 } },
        series: [{ type: "heatmap", coordinateSystem: "calendar", data: calData }],
        legend: { show: false },
      };
    }

    case "heat-large": {
      // ~10,000 cells generated from a few summed sine waves (a cheap stand-in for the
      // official example's Perlin noise) so the field reads as organic blobs rather than
      // pure static, while staying within this app's plain rand()-based generator style.
      const W = 100, H = 100;
      const hlData: number[][] = [];
      for (let i = 0; i <= W; i++) {
        for (let j = 0; j <= H; j++) {
          const v = Math.sin(i / 14) * Math.cos(j / 11) + Math.sin(i / 7 + j / 9) * 0.4 + rand(-8, 8) / 100;
          hlData.push([i, j, +Math.max(0, Math.min(1, (v + 1.4) / 2.8)).toFixed(2)]);
        }
      }
      return {
        backgroundColor: bg, title: titleCfg || { text: "Heatmap — 10K Cells", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        grid: { ...gridFull, bottom: 40 },
        xAxis: { type: "category", data: Array.from({ length: W + 1 }, (_, i) => i), show: false },
        yAxis: { type: "category", data: Array.from({ length: H + 1 }, (_, i) => i), show: false },
        visualMap: {
          min: 0, max: 1, calculable: true, realtime: false, orient: "horizontal", left: "center", bottom: 4,
          textStyle: { color: fg, fontFamily: "Inter", fontSize: 11 },
          inRange: { color: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"] },
        },
        series: [{ name: "Field", type: "heatmap", data: hlData, progressive: 1000, animation: false }],
        legend: { show: false },
      };
    }

    // ── GAUGE ─────────────────────────────────────────────────────────────
    case "gauge-simple": {
      const val = datasets[0]?.data[0] ?? 67;
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        series: [{
          type: "gauge", startAngle: 200, endAngle: -20, min: 0, max: 100,
          axisLine: { lineStyle: { width: 20, color: [[0.3, palette[0] + "88"], [0.7, palette[0] + "BB"], [1, palette[0]]] } },
          pointer: { itemStyle: { color: palette[0] } },
          axisTick: { distance: -24, length: 6, lineStyle: { color: "#fff", width: 2 } },
          splitLine: { distance: -28, length: 14, lineStyle: { color: "#fff", width: 3 } },
          axisLabel: { color: fg, distance: 4, fontSize: 11, fontFamily: "Inter" },
          detail: { valueAnimation: true, color: fg, fontSize: 26, fontFamily: "Inter", fontWeight: "bold", offsetCenter: [0, "70%"] },
          data: [{ value: val, name: datasets[0]?.name ?? "Score", title: { color: fg, fontFamily: "Inter", offsetCenter: [0, "90%"] } }],
        }],
        legend: { show: false },
      };
    }

    case "gauge-speed": {
      const val = datasets[0]?.data[0] ?? 80;
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        series: [{
          type: "gauge", min: 0, max: 240, splitNumber: 8,
          axisLine: { lineStyle: { width: 15, color: [[0.25, palette[2] ?? "#10b981"], [0.5, palette[3] ?? "#f59e0b"], [0.75, "#f97316"], [1, palette[3] ?? "#ef4444"]] } },
          pointer: { icon: "path://M12.8,0.7l12.3,42H0.5L12.8,0.7z", length: "12%", width: 20, offsetCenter: [0, "-60%"], itemStyle: { color: palette[0] } },
          axisTick: { length: 12, lineStyle: { color: "auto", width: 2 } },
          splitLine: { length: 20, lineStyle: { color: "auto", width: 5 } },
          axisLabel: { color: fg, fontSize: 11, fontFamily: "Inter", distance: -36 },
          title: { offsetCenter: [0, "-20%"], color: fg, fontFamily: "Inter", fontSize: 14 },
          detail: { fontSize: 32, fontWeight: "bold", color: fg, fontFamily: "Inter", formatter: "{value} km/h" },
          data: [{ value: val, name: "Speed" }],
        }],
        legend: { show: false },
      };
    }

    case "gauge-progress": {
      const vals = datasets.map((ds, i) => ({ value: ds.data[0] ?? rand(40, 95), name: ds.name, itemStyle: { color: palette[i % palette.length] } }));
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        series: [{
          type: "gauge", startAngle: 90, endAngle: -270,
          pointer: { show: false },
          progress: { show: true, overlap: false, roundCap: true, clip: false, itemStyle: { borderWidth: 1, borderColor: "auto" } },
          axisLine: { lineStyle: { width: 18 } },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          data: vals,
          title: { fontSize: 12, color: fg, fontFamily: "Inter" },
          detail: { width: 40, height: 12, fontSize: 13, color: "auto", borderRadius: 4, formatter: "{value}%", fontFamily: "Inter" },
        }],
        legend: { show: false },
      };
    }

    // ── TREE / GRAPH ──────────────────────────────────────────────────────
    case "tree-lr": {
      const treeData = {
        name: "Root", children: [
          { name: "Branch A", children: [{ name: "Leaf 1" }, { name: "Leaf 2" }, { name: "Leaf 3" }] },
          { name: "Branch B", children: [{ name: "Leaf 4" }, { name: "Leaf 5" }] },
          { name: "Branch C", children: [{ name: "Leaf 6" }, { name: "Leaf 7" }, { name: "Leaf 8" }, { name: "Leaf 9" }] },
        ],
      };
      return {
        backgroundColor: bg, title: titleCfg, tooltip: { trigger: "item", triggerOn: "mousemove" },
        series: [{
          type: "tree", data: [treeData], left: "5%", right: "15%", top: title ? "15%" : "8%", bottom: "8%",
          symbol: "emptyCircle", orient: "LR", expandAndCollapse: true,
          label: { position: "left", verticalAlign: "middle", align: "right", fontSize: 11, color: fg, fontFamily: "Inter" },
          leaves: { label: { position: "right", verticalAlign: "middle", align: "left" } },
          emphasis: { focus: "descendant" },
          animationDuration: 550, animationDurationUpdate: 750,
          itemStyle: { color: palette[0], borderColor: palette[0] }, lineStyle: { color: axisC },
        }],
        legend: { show: false },
      };
    }

    case "treemap-basic": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip: { formatter: (p: any) => `${p.name}: ${p.value}` },
        series: [{
          type: "treemap",
          data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? rand(10, 100), itemStyle: { color: palette[i % palette.length] } })),
          width: "96%", height: title ? "78%" : "88%", top: title ? 52 : 8,
          label: { show: true, color: "#fff", fontFamily: "Inter", fontSize: 12, fontWeight: "bold" },
          breadcrumb: { show: false }, roam: false,
        }],
        legend: { show: false },
      };
    }

    case "treemap-sunburst": {
      const sunData = [
        { name: "Category A", value: 40, children: [{ name: "A1", value: 20 }, { name: "A2", value: 20 }] },
        { name: "Category B", value: 60, children: [{ name: "B1", value: 25 }, { name: "B2", value: 35 }] },
        { name: "Category C", value: 30, children: [{ name: "C1", value: 15 }, { name: "C2", value: 15 }] },
        { name: "Category D", value: 50, children: [{ name: "D1", value: 30 }, { name: "D2", value: 20 }] },
      ];
      const coloredData = sunData.map((d, i) => ({
        ...d, itemStyle: { color: palette[i % palette.length] },
        children: d.children.map((c, j) => ({ ...c, itemStyle: { color: palette[(i + j + 1) % palette.length] + "CC" } })),
      }));
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip: { formatter: (p: any) => `${p.name}: ${p.value}` },
        series: [{ type: "sunburst", data: coloredData, radius: ["15%", "70%"], center: ["50%", "55%"], label: { color: "#fff", fontFamily: "Inter", fontSize: 11 }, itemStyle: { borderColor: bg, borderWidth: 2 }, levels: [{ r0: "15%", r: "30%" }, { r0: "32%", r: "68%", label: { rotate: "tangential" } }] }],
        legend: { show: false },
      };
    }

    case "sankey-basic": {
      const snNodes = ["A", "B", "C", "D", "E", "F"].map((n, i) => ({ name: n, itemStyle: { color: palette[i % palette.length] } }));
      const snLinks = [{ source: "A", target: "C", value: 40 }, { source: "A", target: "D", value: 30 }, { source: "B", target: "C", value: 20 }, { source: "B", target: "D", value: 50 }, { source: "B", target: "E", value: 15 }, { source: "C", target: "E", value: 35 }, { source: "C", target: "F", value: 25 }, { source: "D", target: "E", value: 45 }, { source: "D", target: "F", value: 35 }];
      // single-char labels: ~20px each side is enough
      const snLabelPad = (chars: number, fs = 12) => Math.ceil(chars * fs * 0.7) + 16;
      return {
        backgroundColor: bg, title: titleCfg, tooltip: { trigger: "item", triggerOn: "mousemove" },
        series: [{ type: "sankey", data: snNodes, links: snLinks, left: snLabelPad(1), right: snLabelPad(1), top: title ? 52 : 20, bottom: 20, nodeWidth: 16, nodeGap: 12, emphasis: { focus: "adjacency" }, lineStyle: { color: "gradient", opacity: 0.4 }, label: { color: fg, fontFamily: "Inter", fontSize: 12 } }],
        legend: { show: false },
      };
    }

    case "sankey-gradient": {
      const sgNodes = ["Coal", "Natural Gas", "Oil", "Electricity", "Heat", "Industry", "Buildings", "Transport"].map((n, i) => ({ name: n, itemStyle: { color: palette[i % palette.length] } }));
      const sgLinks = [{ source: "Coal", target: "Electricity", value: 50 }, { source: "Natural Gas", target: "Electricity", value: 30 }, { source: "Natural Gas", target: "Heat", value: 20 }, { source: "Oil", target: "Transport", value: 80 }, { source: "Oil", target: "Industry", value: 30 }, { source: "Electricity", target: "Industry", value: 40 }, { source: "Electricity", target: "Buildings", value: 35 }, { source: "Heat", target: "Buildings", value: 20 }];
      const sgLabelPad = (names: string[], fs = 11) => Math.ceil(Math.max(...names.map(n => n.length)) * fs * 0.7) + 16;
      const sgLeft = sgLabelPad(["Coal", "Natural Gas", "Oil"]);       // longest left node
      const sgRight = sgLabelPad(["Industry", "Buildings", "Transport"]); // longest right node
      return {
        backgroundColor: bg, title: titleCfg, tooltip: { trigger: "item" },
        series: [{ type: "sankey", data: sgNodes, links: sgLinks, left: sgLeft, right: sgRight, top: title ? 52 : 24, bottom: 16, nodeWidth: 18, nodeGap: 10, label: { color: fg, fontFamily: "Inter", fontSize: 11 }, lineStyle: { color: "gradient", opacity: 0.5 }, emphasis: { focus: "adjacency" } }],
        legend: { show: false },
      };
    }

    case "funnel-basic": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { trigger: "item" },
        series: [{
          type: "funnel", left: "10%", top: title ? 52 : 20, width: "80%",
          minSize: "0%", maxSize: "100%", sort: "descending", gap: 2,
          data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0, itemStyle: { color: palette[i % palette.length] } })),
          label: { show: true, position: "inside", color: "#fff", fontFamily: "Inter", fontSize: 12, fontWeight: "bold" },
        }],
      };
    }

    case "graph-les-mis": {
      const { nodes, links, categories } = genGraphData(40, rand, random);
      const styledNodes = nodes.map(n => ({ ...n, label: { show: n.symbolSize > 30 } }));
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Character Network", subtext: "Force Layout", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        legend: { bottom: 4, left: "center", data: categories.map(c => c.name), textStyle: { color: fg, fontFamily: "Inter", fontSize: 12 } },
        animationDuration: 1200, animationEasingUpdate: "quinticInOut",
        series: [{
          name: "Network", type: "graph", layout: "force",
          force: { repulsion: 120, edgeLength: 60 },
          data: styledNodes, links, categories, roam: true, legendHoverLink: false,
          label: { position: "right", formatter: "{b}", color: fg, fontFamily: "Inter", fontSize: 10 },
          lineStyle: { color: "source", curveness: 0.25, opacity: 0.5 },
          emphasis: { focus: "adjacency", lineStyle: { width: 6 } },
        }],
      };
    }

    case "graph-hide-overlap": {
      const { nodes, links, categories } = genGraphData(60, rand, random);
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Hide Overlapped Label", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        legend: { bottom: 4, left: "center", data: categories.map(c => c.name), textStyle: { color: fg, fontFamily: "Inter", fontSize: 12 } },
        series: [{
          name: "Network", type: "graph", layout: "force",
          force: { repulsion: 70, edgeLength: 36 },
          data: nodes, links, categories, roam: true,
          label: { show: true, position: "right", formatter: "{b}", color: fg, fontFamily: "Inter", fontSize: 10 },
          labelLayout: { hideOverlap: true },
          scaleLimit: { min: 0.4, max: 2 },
          lineStyle: { color: "source", curveness: 0.3, opacity: 0.35 },
        }],
      };
    }

    case "graph-gradient-edge": {
      const { nodes, links, categories } = genGraphData(40, rand, random);
      const catColor = categories.map((_, i) => palette[i % palette.length]);
      const nodeCat = new Map(nodes.map(n => [n.id, n.category]));
      const styledLinks = links.map(l => ({
        ...l,
        lineStyle: {
          width: 2, curveness: 0.2,
          color: { type: "linear" as const, x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: catColor[nodeCat.get(l.source) ?? 0] }, { offset: 1, color: catColor[nodeCat.get(l.target) ?? 0] }] },
        },
      }));
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Gradient Edge", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        legend: { bottom: 4, left: "center", data: categories.map(c => c.name), textStyle: { color: fg, fontFamily: "Inter", fontSize: 12 } },
        series: [{
          name: "Network", type: "graph", layout: "force",
          force: { repulsion: 100, edgeLength: 50 },
          data: nodes, links: styledLinks, categories, roam: true,
          label: { show: false },
          emphasis: { focus: "adjacency" },
        }],
      };
    }

    // ── SPECIAL ───────────────────────────────────────────────────────────
    case "pictorial-bar": {
      const symbols = ["circle", "rect", "roundRect", "triangle", "diamond"];
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip, grid: gridFull,
        xAxis: { type: "value", ...axisTick },
        yAxis: { type: "category", data: userLabels, ...axisTick },
        series: [{
          type: "pictorialBar",
          data: v.map((val, i) => ({
            value: val, symbol: symbols[i % symbols.length],
            symbolRepeat: true, symbolSize: ["50%", "50%"],
            itemStyle: { color: palette[i % palette.length] },
          })),
          label: { show: true, position: "right", color: fg, fontFamily: "Inter", fontSize: 11 },
        }],
        legend: { show: false },
      };
    }

    case "share-dataset": {
      // Pie (top) and the line series (bottom) both read the same `dataset` component —
      // the pie summarizes the first dataset's contribution across labels via `encode`,
      // the lines plot every dataset's trend across the same labels. No live cross-hover
      // linking (that needs a chart-instance event listener EChartsView doesn't expose yet).
      const firstDs = datasets[0]?.name ?? "Dataset 1";
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        legend: { ...legend, data: datasets.map(d => d.name) },
        dataset: { source: [["product", ...datasets.map(d => d.name)], ...userLabels.map((l, i) => [l, ...datasets.map(d => d.data[i] ?? 0)])] },
        grid: [{ left: 48, right: legendBottom ? 12 : 96, top: "58%", bottom: 28, containLabel: true }],
        xAxis: [{ type: "category", gridIndex: 0, ...axisTick }],
        yAxis: [{ gridIndex: 0, ...axisTick }],
        series: [
          { type: "pie", id: "share-pie", radius: isSmall ? "26%" : "30%", center: ["50%", isSmall ? "24%" : "27%"], encode: { itemName: "product", value: firstDs }, itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 }, label: { color: fg, fontFamily: "Inter", fontSize: 11, formatter: "{b}: {d}%" }, emphasis: { focus: "self" } },
          ...datasets.map((ds, i) => ({ type: "line" as const, seriesLayoutBy: "column", xAxisIndex: 0, yAxisIndex: 0, smooth: smoothLine, lineStyle: { color: palette[i % palette.length], width: 2 }, itemStyle: { color: palette[i % palette.length] } })),
        ],
      };
    }

    default:
      return { backgroundColor: bg, title: titleCfg, series: [] };
  }
}

// ─── Chart Type Icon ──────────────────────────────────────────────────────────
function ChartIcon({ type, color = "currentColor" }: { type: string; color?: string }) {
  const c = color;
  const dots = (pts: [number, number][], r = 1.2) => pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={r} fill={c} />);
  const map: Record<string, React.ReactNode> = {
    // ── LINE ──
    "line-basic": <><path d="M3 17l4-8 4 4 4-6 4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="3" cy="17" r="1.3" fill={c} /><circle cx="19" cy="11" r="1.3" fill={c} /></>,
    "line-area-stacked": <><path d="M3 19l4-4 4 2 4-3 4 2v5H3z" fill={c} opacity="0.55" /><path d="M3 14l4-6 4 3 4-5 4 3v9l-4-2-4 3-4-2-4 4z" fill={c} opacity="0.25" /><path d="M3 14l4-6 4 3 4-5 4 3" stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none" /></>,
    "line-bump": <><path d="M4 5c4 3 4 9 16 14" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M20 5c-4 3-4 9-16 14" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55" /></>,
    "line-confidence": <><path d="M3 14c5-8 13-8 18 0" stroke={c} strokeWidth="6" strokeLinecap="round" opacity="0.22" fill="none" /><path d="M3 14c5-8 13-8 18 0" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "line-step": <path d="M3 18h4v-4h4v-3h4v-5h4v3h2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    "line-area-time": <><path d="M3 15c3-6 6-6 9-2s6-4 9 1v6H3z" fill={c} opacity="0.3" /><path d="M3 15c3-6 6-6 9-2s6-4 9 1" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "line-multiple-x": <><path d="M3 4h18M3 20h18" stroke={c} strokeWidth="1.4" opacity="0.5" /><path d="M3 15l4-7 4 5 4-8 4 6" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "line-rainfall": <><rect x="4" y="13" width="3" height="7" fill={c} opacity="0.45" /><rect x="9.5" y="9" width="3" height="11" fill={c} opacity="0.45" /><rect x="15" y="15" width="3" height="5" fill={c} opacity="0.45" /><path d="M3 10l5 3 5-6 5 4 3-3" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "line-datazoom": <><path d="M3 13l4-6 4 4 4-5 4 3" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><rect x="3.5" y="18.5" width="17" height="3" rx="1.5" stroke={c} strokeWidth="1.4" fill="none" /><rect x="5.5" y="17.7" width="2" height="4.6" rx="1" fill={c} /><rect x="16.5" y="17.7" width="2" height="4.6" rx="1" fill={c} /></>,
    "line-dynamic": <><path d="M3 15l4-5 4 3 4-6 4 4" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><circle cx="19" cy="11" r="4" stroke={c} strokeWidth="1.2" opacity="0.4" fill="none" /><circle cx="19" cy="11" r="2" fill={c} /></>,
    "line-aqi": <><path d="M3 17c3 0 3-6 6-6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M9 11c3 0 2 5 5 5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M14 16c3 0 2-8 6-8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "large-scale-area": <><path d="M2 17l1-2 1 3 1-4 1 2 1-3 1 4 1-2 1 3 1-5 1 3 1-2 1 4 1-3 1 2 1-4 1 3v3H2z" fill={c} opacity="0.32" /><path d="M2 17l1-2 1 3 1-4 1 2 1-3 1 4 1-2 1 3 1-5 1 3 1-2 1 4 1-3 1 2 1-4 1 3" stroke={c} strokeWidth="1.1" strokeLinejoin="round" fill="none" /></>,
    "area-rainfall": <><path d="M3 14c3-5 6-3 9-6s6 1 9-3v13H3z" fill={c} opacity="0.3" /><path d="M3 14c3-5 6-3 9-6s6 1 9-3" stroke={c} strokeWidth="1.6" fill="none" /><rect x="5" y="18" width="1.2" height="3" fill={c} opacity="0.6" /><rect x="10.5" y="16" width="1.2" height="5" fill={c} opacity="0.6" /><rect x="16" y="19" width="1.2" height="2" fill={c} opacity="0.6" /></>,
    "line-race": <>
      <path d="M3 19c6-2 12-4 17-13" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M3 19c6-1 12-6 17-9" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M3 19c6 0 12-2 17-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.35" />
      <line x1="20" y1="6" x2="22" y2="6" stroke={c} strokeWidth="1.2" /><line x1="20" y1="10" x2="22" y2="10" stroke={c} strokeWidth="1.2" opacity="0.6" /><line x1="20" y1="15" x2="22" y2="15" stroke={c} strokeWidth="1.2" opacity="0.35" />
    </>,
    // ── BAR ──
    "bar-basic": <path d="M3 20h18M5 20V10M9 20V6M13 20V13M17 20V4" stroke={c} strokeWidth="2" strokeLinecap="round" />,
    "bar-background": <><rect x="6" y="4" width="5" height="16" rx="1" fill={c} opacity="0.15" /><rect x="6" y="11" width="5" height="9" rx="1" fill={c} /><rect x="14" y="4" width="5" height="16" rx="1" fill={c} opacity="0.15" /><rect x="14" y="8" width="5" height="12" rx="1" fill={c} /></>,
    "bar-negative": <><line x1="12" y1="3" x2="12" y2="21" stroke={c} strokeWidth="1.4" opacity="0.5" /><rect x="12" y="5" width="7" height="3" rx="1" fill={c} /><rect x="6" y="10.5" width="6" height="3" rx="1" fill={c} opacity="0.55" /><rect x="12" y="16" width="4" height="3" rx="1" fill={c} /></>,
    "bar-stacked": <><rect x="5" y="14" width="5" height="6" fill={c} /><rect x="5" y="8" width="5" height="6" fill={c} opacity="0.5" /><rect x="14" y="17" width="5" height="3" fill={c} /><rect x="14" y="11" width="5" height="6" fill={c} opacity="0.5" /><rect x="14" y="5" width="5" height="6" fill={c} opacity="0.25" /></>,
    "bar-stacked-norm": <>
      <rect x="4" y="4" width="4" height="16" fill={c} opacity="0.22" /><rect x="4" y="12" width="4" height="8" fill={c} opacity="0.55" /><rect x="4" y="16" width="4" height="4" fill={c} />
      <rect x="10" y="4" width="4" height="16" fill={c} opacity="0.22" /><rect x="10" y="8" width="4" height="12" fill={c} opacity="0.55" /><rect x="10" y="14" width="4" height="6" fill={c} />
      <rect x="16" y="4" width="4" height="16" fill={c} opacity="0.22" /><rect x="16" y="6" width="4" height="14" fill={c} opacity="0.55" /><rect x="16" y="10" width="4" height="10" fill={c} />
    </>,
    "bar-horizontal": <><path d="M3 4v18h18" stroke={c} strokeWidth="1.4" fill="none" opacity="0.5" /><rect x="4" y="6" width="14" height="3" rx="1" fill={c} /><rect x="4" y="11" width="9" height="3" rx="1" fill={c} opacity="0.7" /><rect x="4" y="16" width="12" height="3" rx="1" fill={c} opacity="0.5" /></>,
    "bar-mixed": <><rect x="4" y="13" width="3" height="7" fill={c} opacity="0.45" /><rect x="9.5" y="9" width="3" height="11" fill={c} opacity="0.45" /><rect x="15" y="15" width="3" height="5" fill={c} opacity="0.45" /><path d="M3 8l5 4 5-7 5 3 3-2" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "bar-waterfall": <><rect x="3" y="4" width="3" height="6" fill={c} /><rect x="8.5" y="10" width="3" height="4" fill={c} opacity="0.55" /><rect x="14" y="8" width="3" height="5" fill={c} opacity="0.55" /><rect x="19.5" y="6" width="2.5" height="10" fill={c} /><line x1="2" y1="20" x2="22" y2="20" stroke={c} strokeWidth="1.2" opacity="0.5" /></>,
    "bar-race": <><rect x="3" y="5" width="16" height="3" rx="1" fill={c} /><rect x="3" y="10.5" width="11" height="3" rx="1" fill={c} opacity="0.65" /><rect x="3" y="16" width="7" height="3" rx="1" fill={c} opacity="0.4" /><path d="M20 4.5l2.2 2-2.2 2" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
    "bar-world-pop": <><rect x="3" y="5" width="13" height="3" rx="1.5" fill={c} /><rect x="3" y="10.5" width="17" height="3" rx="1.5" fill={c} opacity="0.7" /><rect x="3" y="16" width="9" height="3" rx="1.5" fill={c} opacity="0.45" /></>,
    "bar-animation": <><path d="M4 5c2 2.2 4 2.2 6 0" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" /><rect x="5" y="10" width="4" height="10" rx="1" fill={c} /><rect x="11" y="6" width="4" height="14" rx="1" fill={c} opacity="0.7" /><rect x="17" y="13" width="4" height="7" rx="1" fill={c} opacity="0.45" /></>,
    "bar-brush": <><rect x="4" y="10" width="3" height="10" fill={c} opacity="0.35" /><rect x="9.5" y="6" width="3" height="14" fill={c} /><rect x="15" y="12" width="3" height="8" fill={c} /><rect x="20.5" y="8" width="2" height="12" fill={c} opacity="0.35" /><rect x="7.5" y="3" width="12" height="14" rx="1" stroke={c} strokeWidth="1.2" strokeDasharray="2 2" fill="none" /></>,
    "bar-multi-y": <><line x1="4" y1="3" x2="4" y2="20" stroke={c} strokeWidth="1.4" /><line x1="20" y1="3" x2="20" y2="20" stroke={c} strokeWidth="1.4" opacity="0.55" /><rect x="7" y="10" width="3" height="10" fill={c} /><rect x="12" y="6" width="3" height="14" fill={c} opacity="0.55" /></>,
    "bar-encode": <><rect x="3" y="4" width="18" height="3" rx="1" fill={c} opacity="0.25" /><rect x="3" y="9" width="10" height="3" rx="1" fill={c} opacity="0.55" /><rect x="3" y="14" width="14" height="3" rx="1" fill={c} opacity="0.85" /><rect x="3" y="20" width="18" height="1.5" rx="0.75" fill={c} opacity="0.4" /></>,
    "bar-watermark": <><rect x="5" y="10" width="3" height="10" fill={c} opacity="0.8" /><rect x="10.5" y="6" width="3" height="14" fill={c} opacity="0.8" /><rect x="16" y="13" width="3" height="7" fill={c} opacity="0.8" /><line x1="2" y1="4" x2="6" y2="8" stroke={c} strokeWidth="1" opacity="0.25" /><line x1="9" y1="2" x2="14" y2="7" stroke={c} strokeWidth="1" opacity="0.25" /><line x1="16" y1="3" x2="21" y2="8" stroke={c} strokeWidth="1" opacity="0.25" /></>,
    "bar-polar": <><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.2" opacity="0.3" fill="none" /><circle cx="12" cy="12" r="5.5" stroke={c} strokeWidth="1.2" opacity="0.3" fill="none" /><path d="M12 12L12 3A9 9 0 0 1 19.8 7.5Z" fill={c} opacity="0.75" /><path d="M12 12L12 6.5A5.5 5.5 0 0 1 16.8 9Z" fill={c} opacity="0.5" /></>,
    "bar-polar-round": <><path d="M6 16a8 8 0 0 1 8-12" stroke={c} strokeWidth="3" fill="none" opacity="0.4" /><path d="M9 19a8 8 0 0 1 8-15" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none" /></>,
    "bar-polar-stack": <><circle cx="12" cy="12" r="8.5" fill="none" stroke={c} strokeWidth="3" opacity="0.85" strokeDasharray="14 40" /><circle cx="12" cy="12" r="8.5" fill="none" stroke={c} strokeWidth="3" opacity="0.4" strokeDasharray="20 40" strokeDashoffset="-14" /><circle cx="12" cy="12" r="4.5" fill="none" stroke={c} strokeWidth="2.5" opacity="0.85" strokeDasharray="8 20" /><circle cx="12" cy="12" r="4.5" fill="none" stroke={c} strokeWidth="2.5" opacity="0.4" strokeDasharray="10 20" strokeDashoffset="-8" /></>,
    "bar-polar-stack-radial": <>{([[12, 3], [19.4, 7.5], [19.4, 16.5], [12, 20], [4.6, 16.5], [4.6, 7.5]] as [number, number][]).map(([x, y], i) => (
      <g key={i}><line x1="12" y1="12" x2={x} y2={y} stroke={c} strokeWidth="2.2" opacity="0.3" /><line x1="12" y1="12" x2={(12 + x) / 2} y2={(12 + y) / 2} stroke={c} strokeWidth="2.2" opacity="0.85" /></g>
    ))}</>,
    // ── PIE ──
    "pie-basic": <><path d="M12 2a10 10 0 1 0 10 10H12V2z" stroke={c} strokeWidth="2" fill="none" /><path d="M12 2a10 10 0 0 1 10 10" stroke={c} strokeWidth="2" fill="none" /></>,
    "pie-doughnut": <><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="4" stroke={c} strokeWidth="2" fill="none" /></>,
    "pie-half": <><path d="M3 14a9 9 0 0 1 18 0" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M7 14a5 5 0 0 1 10 0" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "pie-rose": <path d="M21 12L15.5 15.5L12 21L8.5 15.5L3 12L8.5 8.5L12 3L15.5 8.5Z" fill={c} opacity="0.7" stroke={c} strokeWidth="1" strokeLinejoin="round" />,
    "pie-scrollable": <><circle cx="9" cy="12" r="7" stroke={c} strokeWidth="2" fill="none" /><path d="M9 5a7 7 0 0 1 6 10.5" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><circle cx="19" cy="7" r="1" fill={c} /><circle cx="19" cy="12" r="1" fill={c} /><circle cx="19" cy="17" r="1" fill={c} /></>,
    "pie-label-adjust": <><circle cx="10" cy="12" r="7" stroke={c} strokeWidth="2" fill="none" /><path d="M10 5a7 7 0 0 1 4 12.9" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M16 18l3 1M16.5 6l3-1M4 9l-3-1" stroke={c} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" /></>,
    "pie-referer": <><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6" fill="none" opacity="0.5" /><circle cx="12" cy="12" r="5.2" stroke={c} strokeWidth="1.6" fill="none" opacity="0.5" /><path d="M12 3a9 9 0 0 1 7.8 4.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" /><path d="M12 6.8a5.2 5.2 0 0 1 4.3 2.4" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" /></>,
    // ── SCATTER ──
    "scatter-basic": <>{dots([[5, 17], [10, 8], [15, 13], [19, 6]], 1.6)}</>,
    "scatter-bubble": <><circle cx="6" cy="17" r="2" fill={c} opacity="0.7" /><circle cx="13" cy="9" r="4.5" fill={c} opacity="0.45" /><circle cx="18" cy="15" r="3" fill={c} opacity="0.6" /></>,
    "scatter-distribution": <>{dots([[8, 10], [11, 8], [13, 11], [9, 13], [15, 9], [12, 14], [16, 12], [10, 16], [14, 16], [12.5, 11.5]], 1.15)}</>,
    "scatter-single": <>
      <line x1="3" y1="7" x2="21" y2="7" stroke={c} strokeWidth="1" opacity="0.3" /><line x1="3" y1="12.5" x2="21" y2="12.5" stroke={c} strokeWidth="1" opacity="0.3" /><line x1="3" y1="18" x2="21" y2="18" stroke={c} strokeWidth="1" opacity="0.3" />
      {dots([[6, 7], [11, 7], [9, 12.5], [15, 12.5], [18, 12.5], [13, 18], [17, 18]], 1.2)}
    </>,
    "scatter-jitter": <>
      <line x1="7" y1="3" x2="7" y2="21" stroke={c} strokeWidth="1" opacity="0.25" /><line x1="13" y1="3" x2="13" y2="21" stroke={c} strokeWidth="1" opacity="0.25" /><line x1="19" y1="3" x2="19" y2="21" stroke={c} strokeWidth="1" opacity="0.25" />
      {dots([[3, 8], [4.5, 14], [2.5, 17], [6, 6], [8, 11], [9.5, 16], [7, 19], [11, 9], [13, 6], [15, 13], [12, 17], [14.5, 7], [17, 11], [20, 15], [18, 7], [21, 19], [16, 17]], 1)}
    </>,
    // ── CANDLESTICK ──
    "candle-basic": <><rect x="4" y="6" width="4" height="10" stroke={c} strokeWidth="1.5" fill="none" /><line x1="6" y1="3" x2="6" y2="6" stroke={c} strokeWidth="1.5" /><line x1="6" y1="16" x2="6" y2="20" stroke={c} strokeWidth="1.5" /><rect x="14" y="9" width="4" height="8" stroke={c} strokeWidth="1.5" fill="none" /><line x1="16" y1="4" x2="16" y2="9" stroke={c} strokeWidth="1.5" /><line x1="16" y1="17" x2="16" y2="21" stroke={c} strokeWidth="1.5" /></>,
    "candle-large": <>
      <rect x="3" y="8" width="2.4" height="6" fill={c} /><line x1="4.2" y1="5" x2="4.2" y2="8" stroke={c} strokeWidth="1.1" /><line x1="4.2" y1="14" x2="4.2" y2="17" stroke={c} strokeWidth="1.1" />
      <rect x="7.3" y="5" width="2.4" height="8" fill={c} opacity="0.55" /><line x1="8.5" y1="3" x2="8.5" y2="5" stroke={c} strokeWidth="1.1" /><line x1="8.5" y1="13" x2="8.5" y2="16" stroke={c} strokeWidth="1.1" />
      <rect x="11.6" y="10" width="2.4" height="5" fill={c} /><line x1="12.8" y1="7" x2="12.8" y2="10" stroke={c} strokeWidth="1.1" /><line x1="12.8" y1="15" x2="12.8" y2="18" stroke={c} strokeWidth="1.1" />
      <rect x="15.9" y="6" width="2.4" height="9" fill={c} opacity="0.55" /><line x1="17.1" y1="3" x2="17.1" y2="6" stroke={c} strokeWidth="1.1" /><line x1="17.1" y1="15" x2="17.1" y2="19" stroke={c} strokeWidth="1.1" />
      <rect x="20.2" y="9" width="2" height="5" fill={c} />
    </>,
    // ── RADAR ──
    "radar-basic": <><polygon points="12,3 21,8.5 21,15.5 12,21 3,15.5 3,8.5" stroke={c} strokeWidth="2" fill="none" /><polygon points="12,7 17,10 17,14 12,17 7,14 7,10" stroke={c} strokeWidth="1.5" fill="none" /></>,
    "radar-browsers": <><polygon points="12,4 20,9 20,16 12,21 4,16 4,9" stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.15" /></>,
    "radar-aqi": <>
      <polygon points="12,3 20,9 17,19 7,19 4,9" fill={c} opacity="0.1" />
      <polygon points="12,5 18,10 16,17 8,17 6,10" fill={c} opacity="0.18" />
      <polygon points="12,7 16,11 14,16 10,16 8,11" fill={c} opacity="0.3" />
    </>,
    // ── HEATMAP ──
    "heat-cartesian": <><rect x="3" y="3" width="4" height="4" rx="0.5" fill={c} opacity="0.4" /><rect x="10" y="3" width="4" height="4" rx="0.5" fill={c} opacity="0.7" /><rect x="17" y="3" width="4" height="4" rx="0.5" fill={c} opacity="1" /><rect x="3" y="10" width="4" height="4" rx="0.5" fill={c} opacity="0.6" /><rect x="10" y="10" width="4" height="4" rx="0.5" fill={c} opacity="0.9" /><rect x="17" y="10" width="4" height="4" rx="0.5" fill={c} opacity="0.3" /><rect x="3" y="17" width="4" height="4" rx="0.5" fill={c} opacity="0.8" /><rect x="10" y="17" width="4" height="4" rx="0.5" fill={c} opacity="0.35" /><rect x="17" y="17" width="4" height="4" rx="0.5" fill={c} opacity="0.65" /></>,
    "heat-calendar": <>
      {[0.15, 0.4, 0.7, 0.3, 0.55, 0.85, 0.2].map((o, i) => <rect key={"a" + i} x={3 + i * 2.7} y="4" width="2.2" height="2.2" rx="0.4" fill={c} opacity={o} />)}
      {[0.5, 0.2, 0.9, 0.4, 0.65, 0.3, 0.75].map((o, i) => <rect key={"b" + i} x={3 + i * 2.7} y="8" width="2.2" height="2.2" rx="0.4" fill={c} opacity={o} />)}
      {[0.35, 0.8, 0.25, 0.6, 0.15, 0.9, 0.45].map((o, i) => <rect key={"c" + i} x={3 + i * 2.7} y="12" width="2.2" height="2.2" rx="0.4" fill={c} opacity={o} />)}
      {[0.6, 0.3, 0.5, 0.85, 0.2, 0.4, 0.7].map((o, i) => <rect key={"d" + i} x={3 + i * 2.7} y="16" width="2.2" height="2.2" rx="0.4" fill={c} opacity={o} />)}
    </>,
    "heat-large": <>
      {Array.from({ length: 36 }).map((_, i) => {
        const x = i % 6, y = Math.floor(i / 6);
        const o = [0.2, 0.5, 0.8, 0.35, 0.65, 0.9][(x + y) % 6];
        return <rect key={i} x={2 + x * 3.3} y={2 + y * 3.3} width="2.8" height="2.8" rx="0.3" fill={c} opacity={o} />;
      })}
    </>,
    // ── GAUGE ──
    "gauge-simple": <><path d="M4 15a8 8 0 1 1 16 0" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M12 15l-3-5" stroke={c} strokeWidth="2" strokeLinecap="round" /></>,
    "gauge-speed": <>
      <path d="M4 16a8 8 0 1 1 16 0" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => {
        const ang = Math.PI * (1 - i / 6); const x1 = 12 + 8.5 * Math.cos(ang), y1 = 16 - 8.5 * Math.sin(ang), x2 = 12 + 6.5 * Math.cos(ang), y2 = 16 - 6.5 * Math.sin(ang);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1.2" opacity="0.6" />;
      })}
      <path d="M12 16l-2.5-5.5" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </>,
    "gauge-progress": <><circle cx="12" cy="12" r="8" stroke={c} strokeWidth="3" opacity="0.18" fill="none" /><path d="M12 4a8 8 0 0 1 5.6 13.6" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none" /></>,
    // ── TREE / GRAPH ──
    "tree-lr": <>
      <path d="M4 12h4M8 12L12 6M8 12L12 12M8 12L12 18M12 6h4M12 6L20 4M12 6L20 8M12 18h4M12 18L20 16M12 18L20 20" stroke={c} strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="4" cy="12" r="1.6" fill={c} /><circle cx="12" cy="6" r="1.4" fill={c} /><circle cx="12" cy="12" r="1.4" fill={c} /><circle cx="12" cy="18" r="1.4" fill={c} />
      <circle cx="20" cy="4" r="1.1" fill={c} opacity="0.7" /><circle cx="20" cy="8" r="1.1" fill={c} opacity="0.7" /><circle cx="20" cy="16" r="1.1" fill={c} opacity="0.7" /><circle cx="20" cy="20" r="1.1" fill={c} opacity="0.7" />
    </>,
    "treemap-basic": <><rect x="3" y="3" width="10" height="8" fill={c} opacity="0.7" /><rect x="14" y="3" width="7" height="5" fill={c} opacity="0.4" /><rect x="14" y="9" width="7" height="6" fill={c} opacity="0.6" /><rect x="3" y="12" width="6" height="9" fill={c} opacity="0.3" /><rect x="10" y="12" width="11" height="9" fill={c} opacity="0.5" /></>,
    "treemap-sunburst": <><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.4" opacity="0.45" fill="none" /><circle cx="12" cy="12" r="3.5" fill={c} opacity="0.8" /><path d="M12 12L12 3M12 12L19.8 8M12 12L20.5 15M12 12L14 20.8M12 12L6 19M12 12L3.5 10" stroke={c} strokeWidth="1.1" opacity="0.5" /></>,
    "sankey-basic": <>
      <rect x="3" y="4" width="2.4" height="6" fill={c} /><rect x="3" y="14" width="2.4" height="6" fill={c} opacity="0.6" />
      <rect x="18.6" y="3" width="2.4" height="5" fill={c} opacity="0.7" /><rect x="18.6" y="10" width="2.4" height="5" fill={c} /><rect x="18.6" y="17" width="2.4" height="4" fill={c} opacity="0.5" />
      <path d="M5.4 6c5 0 8-1 13-1.5M5.4 8c5 2 8 4 13 5M5.4 16c5 0 8-3 13-6.5M5.4 18c5 0 8 4 13 6" stroke={c} strokeWidth="1.2" opacity="0.35" fill="none" />
    </>,
    "sankey-gradient": <>
      <rect x="3" y="3" width="2.4" height="5" fill={c} opacity="0.8" /><rect x="3" y="10" width="2.4" height="4" fill={c} opacity="0.6" /><rect x="3" y="16" width="2.4" height="5" fill={c} opacity="0.4" />
      <rect x="18.6" y="4" width="2.4" height="4" fill={c} opacity="0.7" /><rect x="18.6" y="10" width="2.4" height="4" fill={c} /><rect x="18.6" y="16" width="2.4" height="5" fill={c} opacity="0.5" />
      <path d="M5.4 5.5c5 1 8 2 13 3M5.4 12c5 0 8-1 13-3M5.4 18c5 0 8 0 13-2" stroke={c} strokeWidth="1.4" opacity="0.5" fill="none" />
    </>,
    "funnel-basic": <path d="M4 4h16M6 9h12M8 14h8M10 19h4" stroke={c} strokeWidth="2" strokeLinecap="round" />,
    "graph-les-mis": <>
      <line x1="12" y1="12" x2="5" y2="5" stroke={c} strokeWidth="1" opacity="0.4" /><line x1="12" y1="12" x2="19" y2="5" stroke={c} strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="12" x2="5" y2="19" stroke={c} strokeWidth="1" opacity="0.4" /><line x1="12" y1="12" x2="19" y2="19" stroke={c} strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="12" x2="12" y2="4" stroke={c} strokeWidth="1" opacity="0.4" />
      <circle cx="12" cy="12" r="3" fill={c} />
      <circle cx="5" cy="5" r="1.4" fill={c} opacity="0.7" /><circle cx="19" cy="5" r="1.4" fill={c} opacity="0.7" />
      <circle cx="5" cy="19" r="1.4" fill={c} opacity="0.7" /><circle cx="19" cy="19" r="1.4" fill={c} opacity="0.7" />
      <circle cx="12" cy="4" r="1.4" fill={c} opacity="0.7" />
    </>,
    "graph-hide-overlap": <>
      {([[6, 6], [9, 5], [12, 7], [15, 5], [18, 7], [7, 10], [10, 10], [13, 10], [16, 10], [8, 14], [11, 14], [14, 14], [17, 14], [9, 18], [13, 18]] as [number, number][]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill={c} opacity={0.4 + (i % 3) * 0.2} />
      ))}
      <line x1="9" y1="18" x2="13" y2="10" stroke={c} strokeWidth="1" opacity="0.3" strokeDasharray="1 1.4" />
    </>,
    "graph-gradient-edge": <>
      <circle cx="5" cy="6" r="2.4" fill={c} />
      <circle cx="19" cy="18" r="2.4" fill={c} opacity="0.25" />
      {Array.from({ length: 10 }).map((_, i) => {
        const t = (i + 1) / 11; const x = 5 + t * 14, y = 6 + t * 12;
        return <circle key={i} cx={x} cy={y} r="1" fill={c} opacity={1 - t * 0.75} />;
      })}
    </>,
    // ── SPECIAL ──
    "pictorial-bar": <>
      <rect x="4" y="15" width="2.2" height="2.2" rx="0.5" fill={c} /><rect x="7.2" y="15" width="2.2" height="2.2" rx="0.5" fill={c} />
      <rect x="4" y="10" width="2.2" height="2.2" rx="0.5" fill={c} /><rect x="7.2" y="10" width="2.2" height="2.2" rx="0.5" fill={c} /><rect x="10.4" y="10" width="2.2" height="2.2" rx="0.5" fill={c} />
      <rect x="4" y="5" width="2.2" height="2.2" rx="0.5" fill={c} /><rect x="7.2" y="5" width="2.2" height="2.2" rx="0.5" fill={c} /><rect x="10.4" y="5" width="2.2" height="2.2" rx="0.5" fill={c} /><rect x="13.6" y="5" width="2.2" height="2.2" rx="0.5" fill={c} />
    </>,
    "share-dataset": <>
      <circle cx="12" cy="6.5" r="4.5" stroke={c} strokeWidth="1.4" fill="none" />
      <path d="M12 2a4.5 4.5 0 0 1 3.9 6.75" fill={c} opacity="0.55" />
      <line x1="2" y1="13" x2="22" y2="13" stroke={c} strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.5" />
      <path d="M4 19l4-3 4 2 4-4 4 2" stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>,
  };
  return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">{map[type] ?? map["bar-basic"]}</svg>;
}

// SVG export renders one DOM node per data point (unlike canvas/PNG, which just rasterizes
// pixels), so a chart with 10k+ points produces a huge/laggy SVG. Downsample large series
// for the SVG path only — PNG keeps the full dataset since it costs nothing extra there.
const SVG_POINT_LIMIT = 3000;
function downsampleForSvg(option: echarts.EChartsOption): { option: echarts.EChartsOption; truncated: boolean; originalCount: number } {
  let truncated = false;
  let originalCount = 0;
  const seriesArr = Array.isArray(option.series) ? option.series : option.series ? [option.series] : [];
  const newSeries = seriesArr.map((s: any) => {
    if (Array.isArray(s.data) && s.data.length > SVG_POINT_LIMIT) {
      truncated = true;
      originalCount = Math.max(originalCount, s.data.length);
      const step = Math.ceil(s.data.length / SVG_POINT_LIMIT);
      return { ...s, data: s.data.filter((_: unknown, i: number) => i % step === 0) };
    }
    return s;
  });
  return { option: truncated ? { ...option, series: newSeries } : option, truncated, originalCount };
}

// ─── ECharts Mount Hook ───────────────────────────────────────────────────────
function EChartsView({ option, size, theme, exportRef }: {
  option: echarts.EChartsOption; size: { w: number; h: number };
  theme: "light" | "dark"; exportRef: React.MutableRefObject<echarts.ECharts | null>;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  // A fresh echarts instance is created for every option/theme/size change instead of
  // reusing one via setOption(notMerge:true) — ECharts has a view-cache bug where a bar
  // series switching coordinateSystem (e.g. cartesian2d -> polar) on a *reused* instance
  // renders the old cartesian view on top of the new polar axes. Since notMerge:true
  // already discards all prior state on every update anyway, a full re-init costs little
  // and sidesteps the bug for this and any other future coordinate-system-switching chart.
  const optionKey = useMemo(() => JSON.stringify(option), [option]);
  useEffect(() => {
    const el = divRef.current; if (!el) return;
    instanceRef.current?.dispose();
    const inst = echarts.init(el, theme === "dark" ? "dark" : undefined);
    inst.resize({ width: size.w, height: size.h });
    inst.setOption(option, { notMerge: true, lazyUpdate: false });
    instanceRef.current = inst;
    exportRef.current = inst;
    return () => { inst.dispose(); if (instanceRef.current === inst) instanceRef.current = null; if (exportRef.current === inst) exportRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionKey, size.w, size.h, theme]);

  const bg = theme === "dark" ? "#1E1E2E" : "#ffffff";
  const previewPad = size.w <= 400 ? 20 : 40;
  return (
    <div style={{ padding: previewPad, background: bg, borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", display: "inline-block" }}>
      <div ref={divRef} style={{ width: size.w, height: size.h, borderRadius: 8, overflow: "hidden" }} />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function Section({ title, id, collapsed, onToggle, children, isDark }: {
  title: string; id: string; collapsed: boolean; onToggle: (id: string) => void;
  children: React.ReactNode; isDark: boolean;
}) {
  const border = isDark ? "#2D2D4E" : "#E5E7EB";
  return (
    <div style={{ borderBottom: `1px solid ${border}` }}>
      <button onClick={() => onToggle(id)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: isDark ? "#F9FAFB" : "#111827" }}>{title}</span>
        {collapsed ? <ChevronDown size={14} color="#9CA3AF" /> : <ChevronUp size={14} color="#9CA3AF" />}
      </button>
      {!collapsed && <div style={{ paddingBottom: 16 }}>{children}</div>}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [chartType, setChartType] = useState("bar-basic");
  const [labels, setLabels] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]);
  const [newLabel, setNewLabel] = useState("");
  const [datasets, setDatasets] = useState<Dataset[]>([
    { id: "1", name: "Dataset 1", data: [65, 59, 80, 81, 56, 72, 68], color: "#6366F1" },
    { id: "2", name: "Dataset 2", data: [40, 75, 55, 62, 88, 48, 77], color: "#f59e0b" },
  ]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [hexInput, setHexInput] = useState("#6366F1");
  const [palette, setPalette] = useState(() => generatePalette("#6366F1"));
  const [manualPalette, setManualPalette] = useState<string[]>([]);
  const [sizePreset, setSizePreset] = useState<SizePreset>("M");
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(500);
  const [autoResponsive, setAutoResponsive] = useState(true);
  const [smoothLine, setSmoothLine] = useState(true);
  const [chartTitle, setChartTitle] = useState("Monthly Revenue Growth 2024");
  const [editingTitle, setEditingTitle] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const echartsExportRef = useRef<echarts.ECharts | null>(null);

  const effectivePalette = palette.map((c, i) => manualPalette[i] || c);
  const chartSize = sizePreset === "Custom" ? { w: customWidth, h: customHeight } : SIZE_PRESETS[sizePreset];

  useEffect(() => {
    setDatasets(prev => prev.map(ds => ({ ...ds, data: labels.map((_, i) => ds.data[i] ?? baseRand(20, 100)) })));
  }, [labels.length]);

  useEffect(() => {
    if (isValidHex(primaryColor)) { setPalette(generatePalette(primaryColor)); setManualPalette([]); }
  }, [primaryColor]);

  const toggleSection = useCallback((id: string) => {
    setCollapsed(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const randomizeData = () => setDatasets(prev => prev.map(ds => ({ ...ds, data: labels.map(() => baseRand(10, 100)) })));
  const addDataset = () => setDatasets(prev => [...prev, { id: Date.now().toString(), name: `Dataset ${prev.length + 1}`, data: labels.map(() => baseRand(20, 100)), color: effectivePalette[prev.length % effectivePalette.length] }]);
  const handlePrimaryColor = (hex: string) => { setHexInput(hex); if (isValidHex(hex)) setPrimaryColor(hex); };

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<"png" | "svg" | null>(null);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openMenu]);

  const flashCopied = (key: string) => { setCopiedKey(key); setTimeout(() => setCopiedKey(null), 1800); };

  // modal state for copy preview
  const [previewModal, setPreviewModal] = useState<{ type: "png" | "svg"; content: string } | null>(null);

  // Shown when getSvgString() had to downsample a large-data chart for SVG export.
  const [svgNotice, setSvgNotice] = useState<string | null>(null);
  const flashSvgNotice = (msg: string) => { setSvgNotice(msg); setTimeout(() => setSvgNotice(null), 3500); };

  const EXPORT_PAD = 40;
  const exportBg = theme === "dark" ? "#1E1E2E" : "#ffffff";

  const getPngDataUrl = (): Promise<string | null> => {
    if (!echartsExportRef.current) return Promise.resolve(null);
    const chartUrl = echartsExportRef.current.getDataURL({ type: "png", pixelRatio: 2, backgroundColor: exportBg });
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const pad = EXPORT_PAD * 2; // match pixelRatio=2
        const off = document.createElement("canvas");
        off.width = img.width + pad * 2;
        off.height = img.height + pad * 2;
        const ctx = off.getContext("2d")!;
        ctx.fillStyle = exportBg;
        ctx.fillRect(0, 0, off.width, off.height);
        ctx.drawImage(img, pad, pad);
        resolve(off.toDataURL("image/png"));
      };
      img.onerror = () => resolve(chartUrl); // fallback: return without padding
      img.src = chartUrl;
    });
  };

  const getSvgString = (): { svg: string; truncated: boolean; originalCount: number } | null => {
    // Reuse the same option object already on screen (echartsOption) instead of calling
    // buildEChartsOption() again — for static-demo charts that build fresh random data,
    // a second call used to produce a different dataset than what's actually rendered.
    const { option: dsOption, truncated, originalCount } = downsampleForSvg(echartsOption);
    const exportOption = { ...dsOption, animation: false, animationDuration: 0 };
    const inst = echarts.init(document.createElement("div"), theme === "dark" ? "dark" : undefined, { renderer: "svg", width: chartSize.w, height: chartSize.h });
    inst.setOption(exportOption, { notMerge: true, silent: true });
    const inner = inst.renderToSVGString();
    inst.dispose();
    const pw = chartSize.w + EXPORT_PAD * 2;
    const ph = chartSize.h + EXPORT_PAD * 2;
    // Wrap with padded outer SVG, translate inner chart by pad
    const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}" viewBox="0 0 ${pw} ${ph}">
  <rect width="${pw}" height="${ph}" fill="${exportBg}"/>
  <g transform="translate(${EXPORT_PAD},${EXPORT_PAD})">${inner}</g>
</svg>`;
    return { svg: wrapped, truncated, originalCount };
  };

  const downloadPng = async () => {
    const url = await getPngDataUrl(); if (!url) return;
    const a = document.createElement("a"); a.download = "chart.png"; a.href = url; a.click();
    setOpenMenu(null);
  };

  const copyPng = async () => {
    const url = await getPngDataUrl(); if (!url) return;
    setOpenMenu(null);
    try {
      const res = await fetch(url); const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      flashCopied("png");
    } catch {
      // Clipboard blocked — show in-app modal so user can right-click → Copy Image
      const padded = await getPngDataUrl();
      if (padded) setPreviewModal({ type: "png", content: padded });
    }
  };

  const downloadSvg = () => {
    const result = getSvgString(); if (!result) return;
    const a = document.createElement("a"); a.download = "chart.svg"; a.href = URL.createObjectURL(new Blob([result.svg], { type: "image/svg+xml;charset=utf-8" })); a.click();
    setOpenMenu(null);
    if (result.truncated) flashSvgNotice(`대용량 차트라 SVG는 ${SVG_POINT_LIMIT.toLocaleString()}개로 축약했어요 (원본 ${result.originalCount.toLocaleString()}개, PNG는 전체 유지)`);
  };

  const copySvg = async () => {
    const result = getSvgString(); if (!result) return;
    setOpenMenu(null);
    if (result.truncated) flashSvgNotice(`대용량 차트라 SVG는 ${SVG_POINT_LIMIT.toLocaleString()}개로 축약했어요 (원본 ${result.originalCount.toLocaleString()}개, PNG는 전체 유지)`);
    try {
      await navigator.clipboard.writeText(result.svg);
      flashCopied("svg");
    } catch {
      // Clipboard blocked — show in-app modal so user can copy the text
      setPreviewModal({ type: "svg", content: result.svg });
    }
  };

  const isDark = theme === "dark";
  const panelBg = isDark ? "#16162A" : "#FFFFFF";
  const panelBorder = isDark ? "#2D2D4E" : "#E5E7EB";
  const canvasBg = isDark ? "#0F0F1A" : "#F3F4F6";
  const sectionText = isDark ? "#F9FAFB" : "#111827";
  const subText = isDark ? "#9CA3AF" : "#4B5563";
  const inputBg = isDark ? "#1E1E35" : "#FFFFFF";
  const inputBorder = isDark ? "#3D3D5C" : "#E5E7EB";

  const echartsOption = useMemo(
    () => buildEChartsOption(chartType, labels, datasets, effectivePalette, theme, chartTitle, chartSize, autoResponsive, smoothLine),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chartType, labels, datasets, effectivePalette, theme, chartTitle, chartSize.w, chartSize.h, autoResponsive, smoothLine]
  );

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: canvasBg, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      {/* Top Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", background: panelBg, borderBottom: `1px solid ${panelBorder}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "#6366F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M2 14V8M6 14V4M10 14V9M14 14V6" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: sectionText }}>ChartPro</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {editingTitle ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input value={chartTitle} onChange={e => setChartTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && setEditingTitle(false)} autoFocus
                style={{ fontSize: 15, fontWeight: 600, background: "transparent", border: "none", borderBottom: "2px solid #6366F1", outline: "none", color: sectionText, minWidth: 200, fontFamily: "Inter" }} />
              <button onClick={() => setEditingTitle(false)} style={{ color: "#6366F1", background: "none", border: "none", cursor: "pointer", display: "flex" }}><Check size={14} /></button>
            </div>
          ) : (
            <button onClick={() => setEditingTitle(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: sectionText }}>{chartTitle}</span>
              <Edit2 size={13} color={subText} style={{ opacity: 0.5 }} />
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {/* PNG button */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setOpenMenu(m => m === "png" ? null : "png")}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6, border: `1px solid ${inputBorder}`, background: copiedKey === "png" ? (isDark ? "#1a2e1a" : "#f0fdf4") : inputBg, color: copiedKey === "png" ? "#22c55e" : subText, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", transition: "all .15s" }}>
              <Download size={12} />PNG<ChevronDown size={10} />
            </button>
            {openMenu === "png" && (
              <div onMouseDown={e => e.stopPropagation()} style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: panelBg, border: `1px solid ${panelBorder}`, borderRadius: 8, overflow: "hidden", zIndex: 50, minWidth: 148, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                <button onClick={downloadPng} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: sectionText, fontFamily: "Inter", textAlign: "left" }}>
                  <Download size={13} />다운로드 (.png)
                </button>
                <div style={{ height: 1, background: panelBorder }} />
                <button onClick={copyPng} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: sectionText, fontFamily: "Inter", textAlign: "left" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/></svg>
                  클립보드에 복사
                </button>
              </div>
            )}
          </div>
          {/* SVG button */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setOpenMenu(m => m === "svg" ? null : "svg")}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6, border: `1px solid ${inputBorder}`, background: copiedKey === "svg" ? (isDark ? "#1a2e1a" : "#f0fdf4") : inputBg, color: copiedKey === "svg" ? "#22c55e" : subText, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", transition: "all .15s" }}>
              <Download size={12} />SVG<ChevronDown size={10} />
            </button>
            {openMenu === "svg" && (
              <div onMouseDown={e => e.stopPropagation()} style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: panelBg, border: `1px solid ${panelBorder}`, borderRadius: 8, overflow: "hidden", zIndex: 50, minWidth: 180, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                <button onClick={downloadSvg} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: sectionText, fontFamily: "Inter", textAlign: "left" }}>
                  <Download size={13} />다운로드 (.svg)
                </button>
                <div style={{ height: 1, background: panelBorder }} />
                <button onClick={copySvg} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: sectionText, fontFamily: "Inter", textAlign: "left" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/></svg>
                  SVG 코드 복사 (벡터)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left Panel */}
        <div style={{ width: 320, flexShrink: 0, overflowY: "auto", background: panelBg, borderRight: `1px solid ${panelBorder}` }}>
          <div style={{ padding: "0 20px" }}>

            {/* Library */}
            {/* Chart Type */}
            <Section title="Chart Type" id="chartType" collapsed={collapsed.has("chartType")} onToggle={toggleSection} isDark={isDark}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {ECHARTS_CATALOGUE.map(cat => (
                  <div key={cat.cat}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: subText, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, paddingLeft: 2 }}>{cat.cat}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                      {cat.items.map(t => {
                        const active = chartType === t.id;
                        return (
                          <button key={t.id} onClick={() => setChartType(t.id)} title={t.label}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 4px", borderRadius: 8, border: `1px solid ${active ? "#6366F1" : inputBorder}`, background: active ? (isDark ? "#2D2B5C" : "#EEF2FF") : inputBg, color: active ? "#6366F1" : subText, fontSize: 9, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", lineHeight: 1.3, textAlign: "center" }}>
                            <ChartIcon type={t.id} color={active ? "#6366F1" : subText} />
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Data Input */}
            <Section title="Data Input" id="data" collapsed={collapsed.has("data")} onToggle={toggleSection} isDark={isDark}>
              {STATIC_DEMO_CHARTS.has(chartType) ? (
                <div style={{ display: "flex", gap: 8, padding: 10, borderRadius: 8, background: isDark ? "#1a1a2e" : "#F3F4F6", color: subText, fontSize: 11.5, lineHeight: 1.5 }}>
                  <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>이 차트는 프리셋 데모 데이터를 사용해요. Data Input을 수정해도 차트에는 반영되지 않아요.</span>
                </div>
              ) : SINGLE_VALUE_CHARTS.has(chartType) ? (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: subText, marginBottom: 8 }}>Value</div>
                  <input type="number" value={datasets[0]?.data[0] ?? ""} onChange={e => { const n = parseFloat(e.target.value); setDatasets(p => p.map((d, i) => i !== 0 ? d : { ...d, data: d.data.length ? d.data.map((v, j) => j === 0 ? (isNaN(n) ? v : n) : v) : [isNaN(n) ? 0 : n] })); }}
                    style={{ width: "100%", height: 32, padding: "0 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, outline: "none", background: inputBg, color: sectionText, fontFamily: "Inter" }} />
                </div>
              ) : MULTI_SINGLE_VALUE_CHARTS.has(chartType) ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {datasets.map((ds, di) => (
                    <div key={ds.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: effectivePalette[di % effectivePalette.length], flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: subText, flex: 1 }}>{ds.name}</span>
                      <input type="number" value={ds.data[0] ?? ""} onChange={e => { const n = parseFloat(e.target.value); setDatasets(p => p.map(d => d.id !== ds.id ? d : { ...d, data: d.data.length ? d.data.map((v, j) => j === 0 ? (isNaN(n) ? v : n) : v) : [isNaN(n) ? 0 : n] })); }}
                        style={{ width: 72, height: 30, padding: "0 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, outline: "none", background: inputBg, color: sectionText, fontFamily: "Inter" }} />
                      {di > 0 && <button onClick={() => setDatasets(p => p.filter(d => d.id !== ds.id))} style={{ background: "none", border: "none", cursor: "pointer", color: subText, display: "flex", flexShrink: 0 }}><X size={12} /></button>}
                    </div>
                  ))}
                  <button onClick={addDataset} style={{ height: 32, borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: inputBg, color: subText }}>
                    <Plus size={12} />+ Dataset
                  </button>
                </div>
              ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: subText, marginBottom: 8 }}>{Y_AXIS_CATEGORY_CHARTS.has(chartType) ? "Y-Axis Labels" : "X-Axis Labels"}</div>
                  <div style={{ borderRadius: 8, border: `1px solid ${inputBorder}`, padding: 8, display: "flex", flexWrap: "wrap", gap: 6, background: inputBg }}>
                    {labels.map((l, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 11, color: sectionText, background: isDark ? "#0F0F1A" : "#fff" }}>
                        {l}
                        <button onClick={() => setLabels(p => p.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: subText, display: "flex", padding: 0 }}><X size={9} /></button>
                      </div>
                    ))}
                    <input value={newLabel} onChange={e => setNewLabel(e.target.value)}
                      onKeyDown={e => (e.key === "Enter" || e.key === ",") && (e.preventDefault(), (() => { const v = newLabel.trim(); if (v) { setLabels(p => [...p, v]); setNewLabel(""); } })())}
                      placeholder="Add..." style={{ background: "transparent", border: "none", outline: "none", fontSize: 11, color: sectionText, width: 50, fontFamily: "Inter" }} />
                  </div>
                </div>
                {(FIRST_DATASET_ONLY_CHARTS.has(chartType) ? datasets.slice(0, 1) : datasets).map((ds, di) => (
                  <div key={ds.id}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: effectivePalette[di % effectivePalette.length] }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: subText, flex: 1 }}>{di === 0 ? (Y_AXIS_CATEGORY_CHARTS.has(chartType) ? "X-Axis Values" : "Y-Axis Values") : ds.name}</span>
                      {di > 0 && <button onClick={() => setDatasets(p => p.filter(d => d.id !== ds.id))} style={{ background: "none", border: "none", cursor: "pointer", color: subText, display: "flex" }}><X size={12} /></button>}
                    </div>
                    {labels.map((l, li) => (
                      <div key={li} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 52, padding: "3px 6px", borderRadius: 4, fontSize: 11, fontWeight: 600, textAlign: "center", flexShrink: 0, background: isDark ? "#0F0F1A" : "#F3F4F6", color: subText }}>{l}</div>
                        <input type="number" value={ds.data[li] ?? ""} onChange={e => { const n = parseFloat(e.target.value); setDatasets(p => p.map(d => d.id !== ds.id ? d : { ...d, data: d.data.map((v, i) => i === li ? (isNaN(n) ? v : n) : v) })); }}
                          style={{ flex: 1, height: 30, padding: "0 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, outline: "none", background: inputBg, color: sectionText, fontFamily: "Inter" }} />
                        <button onClick={() => setLabels(p => p.filter((_, i) => i !== li))} style={{ background: "none", border: "none", cursor: "pointer", color: subText, display: "flex", flexShrink: 0 }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={randomizeData} style={{ flex: 1, height: 32, borderRadius: 6, border: "none", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: isDark ? "#2D2B5C" : "#EEF2FF", color: "#6366F1" }}>
                    <Shuffle size={12} />Random Data
                  </button>
                  {!FIRST_DATASET_ONLY_CHARTS.has(chartType) && (
                    <button onClick={addDataset} style={{ flex: 1, height: 32, borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: inputBg, color: subText }}>
                      <Plus size={12} />+ Dataset
                    </button>
                  )}
                </div>
              </div>
              )}
            </Section>

            {/* Style Settings */}
            <Section title="Style Settings" id="style" collapsed={collapsed.has("style")} onToggle={toggleSection} isDark={isDark}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: sectionText }}>Line Curve</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {([true, false] as const).map(v => (
                      <button key={String(v)} onClick={() => setSmoothLine(v)} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", border: `1px solid ${smoothLine === v ? "#6366F1" : inputBorder}`, background: smoothLine === v ? (isDark ? "#2D2B5C" : "#EEF2FF") : inputBg, color: smoothLine === v ? "#6366F1" : subText }}>
                        {v ? "Smooth" : "Sharp"}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: sectionText }}>Theme</span>
                  <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter" }}>
                    {isDark ? <Moon size={13} /> : <Sun size={13} />}{isDark ? "Dark" : "Light"}
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: sectionText }}>Primary Color</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ position: "relative", width: 20, height: 20 }}>
                      <input type="color" value={primaryColor} onChange={e => handlePrimaryColor(e.target.value)} style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer" }} />
                      <div style={{ width: 20, height: 20, borderRadius: 4, background: primaryColor, border: `1px solid ${inputBorder}`, pointerEvents: "none" }} />
                    </div>
                    <input value={hexInput} onChange={e => handlePrimaryColor(e.target.value)} maxLength={7} style={{ width: 76, height: 28, padding: "0 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, fontFamily: "monospace", outline: "none", background: inputBg, color: sectionText }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: sectionText, marginBottom: 8 }}>Auto Palette</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    {effectivePalette.map((color, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        <input type="color" value={color} onChange={e => { if (!isValidHex(e.target.value)) return; setManualPalette(prev => { const n = [...prev]; while (n.length <= i) n.push(""); n[i] = e.target.value; return n; }); }} style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer" }} />
                        <div style={{ width: 32, height: 32, borderRadius: 6, background: color, border: `2px solid ${manualPalette[i] ? "#6366F1" : "transparent"}`, pointerEvents: "none" }} />
                      </div>
                    ))}
                    <button onClick={() => { setPalette(generatePalette(primaryColor)); setManualPalette([]); }} style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><RefreshCw size={12} /></button>
                  </div>
                </div>
              </div>
            </Section>

            {/* Size Settings */}
            <Section title="Size Settings" id="size" collapsed={collapsed.has("size")} onToggle={toggleSection} isDark={isDark}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["S", "M", "L", "Custom"] as SizePreset[]).map(p => (
                    <button key={p} onClick={() => setSizePreset(p)} style={{ flex: 1, height: 32, borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", border: `1px solid ${sizePreset === p ? "#6366F1" : inputBorder}`, background: sizePreset === p ? (isDark ? "#2D2B5C" : "#EEF2FF") : inputBg, color: sizePreset === p ? "#6366F1" : subText }}>{p}</button>
                  ))}
                </div>
                {sizePreset === "Custom" ? (
                  <div style={{ display: "flex", gap: 12 }}>
                    {[["Width", customWidth, setCustomWidth], ["Height", customHeight, setCustomHeight]].map(([label, val, setter]) => (
                      <div key={label as string} style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: subText, marginBottom: 4 }}>{label as string}</div>
                        <input type="number" value={val as number} onChange={e => (setter as (v: number) => void)(parseInt(e.target.value) || 800)} style={{ width: "100%", height: 32, padding: "0 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, outline: "none", background: inputBg, color: sectionText, fontFamily: "Inter", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                ) : <span style={{ fontSize: 11, color: subText }}>{SIZE_PRESETS[sizePreset].w} × {SIZE_PRESETS[sizePreset].h} px</span>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: sectionText }}>Auto-responsive</span>
                  <button onClick={() => setAutoResponsive(p => !p)} style={{ position: "relative", width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: autoResponsive ? "#6366F1" : (isDark ? "#3D3D5C" : "#D1D5DB"), transition: "background .2s" }}>
                    <div style={{ position: "absolute", top: 4, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "transform .2s", transform: autoResponsive ? "translateX(22px)" : "translateX(4px)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </button>
                </div>
              </div>
            </Section>

          </div>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto", padding: 40, background: canvasBg }}>
          <EChartsView option={echartsOption} size={chartSize} theme={theme} exportRef={echartsExportRef} />
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px", background: panelBg, borderTop: `1px solid ${panelBorder}`, fontSize: 11, color: subText, flexShrink: 0, fontFamily: "Inter" }}>
        <div style={{ display: "flex", gap: 20 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M2 14V8M6 14V4M10 14V9M14 14V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            {ECHARTS_CATALOGUE.flatMap(c => c.items).find(t => t.id === chartType)?.label ?? chartType} Chart
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2 6h12" stroke="currentColor" strokeWidth="1.5" /></svg>
            {chartSize.w} × {chartSize.h} px
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 600, color: "#6366F1" }}>Apache ECharts</span>
          <span style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: "#6366F1", color: "#fff" }}>SYNC LIVE</span>
        </div>
      </div>

      {/* SVG downsample notice */}
      {svgNotice && (
        <div style={{ position: "fixed", bottom: 44, left: "50%", transform: "translateX(-50%)", background: isDark ? "#1E1E2E" : "#111827", color: "#fff", fontSize: 12, fontFamily: "Inter", padding: "9px 16px", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", zIndex: 110, maxWidth: 420, textAlign: "center" }}>
          {svgNotice}
        </div>
      )}

      {/* Copy Preview Modal */}
      {previewModal && (
        <div onClick={() => setPreviewModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#1E1E2E" : "#fff", borderRadius: 12, padding: 24, maxWidth: "90vw", maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: sectionText, marginBottom: 4 }}>
                  {previewModal.type === "png" ? "이미지 복사" : "SVG 코드 복사"}
                </div>
                <div style={{ fontSize: 12, color: subText }}>
                  {previewModal.type === "png"
                    ? "이미지를 우클릭 → '이미지 복사' 후 Figma에 붙여넣기 하세요"
                    : "아래 코드를 복사 → Figma에서 Edit > Paste here 로 벡터로 붙여넣기 하세요"}
                </div>
              </div>
              <button onClick={() => setPreviewModal(null)} style={{ background: "none", border: "none", cursor: "pointer", color: subText, display: "flex", flexShrink: 0 }}>
                <X size={18} />
              </button>
            </div>
            {previewModal.type === "png" ? (
              <img src={previewModal.content} alt="chart" style={{ maxWidth: "100%", borderRadius: 8, border: `1px solid ${panelBorder}`, display: "block" }} />
            ) : (
              <textarea
                readOnly
                value={previewModal.content}
                onClick={e => (e.target as HTMLTextAreaElement).select()}
                style={{ width: "min(640px, 80vw)", height: 320, padding: 12, borderRadius: 8, border: `1px solid ${panelBorder}`, background: isDark ? "#0F0F1A" : "#F3F4F6", color: sectionText, fontSize: 11, fontFamily: "monospace", resize: "vertical", outline: "none" }}
              />
            )}
            {previewModal.type === "svg" && (
              <button
                onClick={() => {
                  const text = previewModal.content;
                  // Try modern clipboard API first
                  if (navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(text).then(() => { flashCopied("svg"); setPreviewModal(null); }).catch(() => fallbackCopy(text));
                  } else {
                    fallbackCopy(text);
                  }
                  function fallbackCopy(t: string) {
                    // execCommand fallback — works even in sandboxed iframes
                    const ta = document.createElement("textarea");
                    ta.value = t;
                    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
                    document.body.appendChild(ta);
                    ta.focus(); ta.select();
                    document.execCommand("copy");
                    document.body.removeChild(ta);
                    flashCopied("svg"); setPreviewModal(null);
                  }
                }}
                style={{ alignSelf: "flex-start", padding: "7px 16px", borderRadius: 6, border: "none", background: "#6366F1", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>
                SVG 코드 복사
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
