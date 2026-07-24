import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import * as echarts from "echarts";
import { ChevronDown, ChevronUp, Plus, X, Trash2, Download, RefreshCw, Shuffle, Edit2, Check, Sun, Moon, Info } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type SizePreset = "S" | "M" | "L" | "Custom";
interface Dataset { id: string; name: string; data: number[]; color: string; }
interface CategoryChartInput { labels: string[]; datasets: Dataset[]; title: string; }
interface XYPoint { x: number; y: number; }
interface XYZPoint extends XYPoint { size: number; }
interface XYSeries { id: string; name: string; points: XYPoint[]; }
interface XYZSeries { id: string; name: string; points: XYZPoint[]; }
interface RangePoint { label: string; value: number; lower: number; upper: number; }
interface OHLCPoint { date: string; open: number; close: number; low: number; high: number; }
interface MatrixCell { x: string; y: string; value: number; }
interface DateValuePoint { date: string; value: number; }
interface HierarchyRow { id: string; name: string; parentId: string; value: number; }
interface NetworkNode { id: string; name: string; category: string; }
interface NetworkLink { id: string; source: string; target: string; value: number; }
interface GeoRegionRow { name: string; value: number; secondary: number; }
interface GeoRoutePoint { name: string; longitude: number; latitude: number; }
interface GeneratorSettings {
  seed: number;
  heatWidth: number;
  heatHeight: number;
  lineGrid: number;
  lineSpan: number;
  areaPoints: number;
  areaVolatility: number;
}
interface SpecialChartData {
  scatter: XYSeries[];
  bubble: XYZSeries[];
  confidence: RangePoint[];
  candleBasic: OHLCPoint[];
  candleLarge: OHLCPoint[];
  cartesianHeatmap: MatrixCell[];
  covarianceMatrix: MatrixCell[];
  singleAxisScatter: MatrixCell[];
  jitterScatter: MatrixCell[];
  calendarHeatmap: DateValuePoint[];
  hierarchy: HierarchyRow[];
  sankeyNodes: NetworkNode[];
  sankeyLinks: NetworkLink[];
  graphNodes: NetworkNode[];
  graphLinks: NetworkLink[];
  geoRegions: GeoRegionRow[];
  geoRoute: GeoRoutePoint[];
  generator: GeneratorSettings;
}
type ChartDataEditorKind = "preset" | "category-series" | "single-value" | "multi-value" | "xy" | "xyz" | "range" | "ohlc" | "matrix" | "calendar" | "hierarchy" | "network" | "geo" | "geo-route" | "generator";
type ChartColorPolicy = "series" | "semantic" | "gradient" | "official-fixed";
interface ChartPolicy {
  dataEditor: ChartDataEditorKind;
  colorPolicy: ChartColorPolicy;
  presetReason?: string;
}

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

// ─── USA Map Loader ────────────────────────────────────────────────────────────
// Alaska/Hawaii/Puerto Rico are geographically distant from the mainland — echarts
// insets them at these fixed offsets (registerMap's 3rd arg) rather than plotting
// true coordinates, matching the official ECharts "USA Population" example.
const USA_SPECIAL_AREAS: Record<string, { left: number; top: number; width: number }> = {
  Alaska: { left: -131, top: 25, width: 15 },
  Hawaii: { left: -110, top: 28, width: 5 },
  "Puerto Rico": { left: -76, top: 26, width: 2 },
};

let usaMapPromise: Promise<void> | null = null;

// Lazy-fetches public/maps/USA.json and registers it with echarts exactly once, caching
// the in-flight promise so concurrent mounts/StrictMode double-effects share one fetch.
// A failed load clears the cache so the next call (e.g. a retry button) fetches again.
function loadUSAMap(): Promise<void> {
  if (echarts.getMap("USA")) return Promise.resolve();
  if (usaMapPromise) return usaMapPromise;

  usaMapPromise = fetch(`${import.meta.env.BASE_URL}maps/USA.json`)
    .then(async (response) => {
      if (!response.ok) throw new Error(`USA map load failed: ${response.status}`);
      const geoJson = await response.json();
      if (geoJson?.type !== "FeatureCollection" || !Array.isArray(geoJson.features)) {
        throw new Error("Invalid USA GeoJSON");
      }
      echarts.registerMap("USA", geoJson, USA_SPECIAL_AREAS);
    })
    .catch((error) => {
      usaMapPromise = null;
      throw error;
    });

  return usaMapPromise;
}

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

function createDefaultCategoryInput(): CategoryChartInput {
  return {
    title: "Monthly Revenue Growth 2024",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      { id: "1", name: "Dataset 1", data: [65, 59, 80, 81, 56, 72, 68], color: "#6366F1" },
      { id: "2", name: "Dataset 2", data: [40, 75, 55, 62, 88, 48, 77], color: "#f59e0b" },
    ],
  };
}

function createAQIInput(): CategoryChartInput {
  const { rand } = createSeededRand("line-aqi-input");
  const start = new Date(Date.UTC(2014, 5, 1));
  const labels = Array.from({ length: 180 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + index);
    return date.toISOString().slice(0, 10);
  });
  const values = labels.map((_, index) => {
    const seasonal = 42 * Math.sin(index / 11) + 24 * Math.sin(index / 3.7);
    const spike = index % 29 === 8 ? rand(150, 250) : index % 41 === 19 ? rand(90, 170) : 0;
    return Math.max(12, Math.round(92 + seasonal + rand(-38, 48) + spike));
  });
  return {
    title: "Beijing AQI",
    labels,
    datasets: [{ id: "aqi-1", name: "Beijing AQI", data: values, color: "#FC7D02" }],
  };
}

function createRainfallInput(): CategoryChartInput {
  const { random } = createSeededRand("area-rainfall-input");
  const start = new Date(Date.UTC(2009, 7, 29));
  const labels = Array.from({ length: 144 }, (_, index) => {
    const date = new Date(start);
    date.setUTCHours(date.getUTCHours() + index * 4);
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}\n${date.getUTCHours()}:00`;
  });
  let flow = 0.42;
  const rainfall = labels.map((_, index) => {
    const storm = index % 37 >= 25 && index % 37 <= 29;
    return +(storm ? (0.35 + random() * 4.8) : random() < 0.12 ? random() * 0.24 : 0).toFixed(3);
  });
  const flowData = rainfall.map((rain, index) => {
    const priorRain = rainfall[Math.max(0, index - 1)] + rainfall[Math.max(0, index - 2)] * 0.5;
    flow = Math.max(0.18, flow * 0.94 + 0.035 + priorRain * 0.12 + Math.sin(index / 13) * 0.018);
    return +flow.toFixed(3);
  });
  return {
    title: "Rainfall and Flow Relationship",
    labels,
    datasets: [
      { id: "rain-flow", name: "Flow", data: flowData, color: "#5470C6" },
      { id: "rain-rainfall", name: "Rainfall", data: rainfall, color: "#91CC75" },
    ],
  };
}

function createNegativeBarInput(): CategoryChartInput {
  return {
    title: "Bar Chart with Negative Value",
    labels: ["ten", "nine", "eight", "seven", "six", "five", "four", "three", "two", "one"],
    datasets: [{
      id: "negative-cost",
      name: "Cost",
      data: [-0.07, -0.09, 0.2, 0.44, -0.23, 0.08, -0.17, 0.47, -0.36, 0.18],
      color: "#5470C6",
    }],
  };
}

function createCategoryInputForChart(chartId: string): CategoryChartInput {
  if (chartId === "line-aqi") return createAQIInput();
  if (chartId === "area-rainfall") return createRainfallInput();
  if (chartId === "bar-negative") return createNegativeBarInput();
  const input = createDefaultCategoryInput();
  if (chartId === "scatter-single") return { ...input, title: "Scatter on Single Axis" };
  if (chartId === "lines-ny") return { ...input, title: "New York Streets — Large Lines" };
  if (chartId === "treemap-basic") return { ...input, title: "Gradient Mapping" };
  return input;
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
      { id: "area-pieces", label: "Area Pieces" },
      { id: "line-bump", label: "Bump Chart" },
      { id: "line-confidence", label: "Confidence Band" },
      { id: "line-step", label: "Step Line" },
      { id: "line-area-time", label: "Area + Time" },
      { id: "line-multiple-x", label: "Multiple X Axes" },
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
      { id: "pie-browser-proportion", label: "Proportion of Browsers" },
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
    cat: "Matrix", items: [
      { id: "matrix-covariance", label: "Covariance Matrix" },
    ],
  },
  {
    cat: "Geo / Map", items: [
      { id: "map-usa-population", label: "USA Population" },
      { id: "geo-graph", label: "Geo Graph" },
      { id: "matrix-mini-bar-geo", label: "Mini Bars + Geo Matrix" },
    ],
  },
  {
    cat: "Gauge", items: [
      { id: "gauge-simple", label: "Simple" },
      { id: "gauge-speed", label: "Stage Speed" },
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
      { id: "lines-ny", label: "New York Streets" },
    ],
  },
];

// Charts whose option builders need a deterministic random source. This is intentionally
// separate from PRESET_DATA_CHARTS: reproducible generated data and editability are
// different concerns, even though the two sets still overlap during the migration.
const SEEDED_DEMO_CHARTS = new Set([
  "line-aqi", "line-confidence", "area-pieces", "line-bump",
  "bar-waterfall", "bar-race", "bar-world-pop", "bar-animation",
  "pie-referer", "pie-browser-proportion", "pie-scrollable",
  "candle-basic", "candle-large",
  "heat-cartesian", "heat-calendar",
  "radar-browsers",
  "tree-lr", "treemap-sunburst", "sankey-basic", "sankey-gradient",
  "scatter-distribution", "scatter-single", "scatter-jitter",
  "large-scale-area", "area-rainfall", "line-race",
  "radar-aqi", "heat-large", "graph-les-mis", "graph-hide-overlap", "graph-gradient-edge",
  "matrix-covariance", "map-usa-population", "geo-graph", "matrix-mini-bar-geo",
  "lines-ny",
]);
// Phase 1: charts that still use a preset/generator instead of one of the implemented
// editors. Later phases replace entries here with range/OHLC/matrix/network editors.
const PHASE_TWO_EDITABLE_CHARTS = new Set(["line-confidence", "candle-basic", "candle-large"]);
const PHASE_THREE_EDITABLE_CHARTS = new Set([
  "heat-cartesian", "heat-calendar", "matrix-covariance",
  "tree-lr", "treemap-sunburst",
  "sankey-basic", "sankey-gradient",
  "graph-les-mis", "graph-hide-overlap", "graph-gradient-edge",
  "map-usa-population", "geo-graph", "matrix-mini-bar-geo",
]);
const PHASE_FOUR_EDITABLE_CHARTS = new Set(["heat-large", "lines-ny", "large-scale-area"]);
const PHASE_FIVE_EDITABLE_CHARTS = new Set([
  "line-aqi", "area-pieces", "line-bump", "area-rainfall", "line-race",
  "bar-waterfall", "bar-race", "bar-world-pop", "bar-animation",
  "pie-referer", "pie-browser-proportion", "pie-scrollable",
  "radar-browsers", "radar-aqi",
  "scatter-distribution", "scatter-single", "scatter-jitter",
]);
const PRESET_DATA_CHARTS = new Set([...SEEDED_DEMO_CHARTS].filter(id =>
  !PHASE_TWO_EDITABLE_CHARTS.has(id) &&
  !PHASE_THREE_EDITABLE_CHARTS.has(id) &&
  !PHASE_FOUR_EDITABLE_CHARTS.has(id) &&
  !PHASE_FIVE_EDITABLE_CHARTS.has(id)
));
// Chart types that need an async-loaded map registered via echarts.registerMap() before
// buildEChartsOption() can safely reference it (App gates rendering on load status)
const MAP_CHART_IDS = new Set(["map-usa-population", "geo-graph", "matrix-mini-bar-geo"]);
// Chart types that only ever read datasets[0] — extra datasets are silently ignored
const FIRST_DATASET_ONLY_CHARTS = new Set([
  "area-pieces", "line-area-time", "line-aqi",
  "bar-background", "bar-negative", "bar-waterfall",
  "pie-basic", "pie-doughnut", "pie-half", "pie-rose", "pie-label-adjust",
  "pie-scrollable", "pie-referer", "pie-browser-proportion",
  "funnel-basic", "pictorial-bar",
  "bar-encode", "bar-polar-round",
]);
// These comparison charts intentionally render exactly two differently encoded series.
// Capping the editor prevents extra inputs from appearing only in the legend.
const TWO_DATASET_CHARTS = new Set([
  "line-multiple-x", "area-rainfall", "bar-mixed", "bar-animation",
]);
const SMOOTHABLE_CHARTS = new Set([
  "line-basic", "line-area-stacked", "area-pieces", "line-bump", "line-confidence",
  "line-area-time", "line-multiple-x", "line-race", "bar-mixed", "bar-multi-y", "share-dataset",
]);
// Gauge charts read a single number (data[0]), not the full label/value grid
const SINGLE_VALUE_CHARTS = new Set(["gauge-simple", "gauge-speed"]);
const MULTI_SINGLE_VALUE_CHARTS = new Set(["gauge-progress"]);
// Charts where the shared `labels` state feeds the Y axis (category) instead of X — panel copy should flip
const Y_AXIS_CATEGORY_CHARTS = new Set(["bar-negative", "bar-horizontal", "pictorial-bar"]);
const OFFICIAL_CATEGORY_SAMPLE_CHARTS = new Set(["line-aqi", "area-rainfall", "bar-negative"]);

const CHART_POLICY_OVERRIDES: Partial<Record<string, Partial<ChartPolicy>>> = {
  "line-confidence": { dataEditor: "range", colorPolicy: "series" },
  "scatter-basic": { dataEditor: "xy", colorPolicy: "series" },
  "scatter-bubble": { dataEditor: "xyz", colorPolicy: "series" },
  "scatter-distribution": { dataEditor: "xy", colorPolicy: "series" },
  "scatter-single": { dataEditor: "matrix", colorPolicy: "series" },
  "scatter-jitter": { dataEditor: "matrix", colorPolicy: "series" },
  "line-aqi": { colorPolicy: "official-fixed" },
  "radar-aqi": { colorPolicy: "semantic" },
  "candle-basic": { dataEditor: "ohlc", colorPolicy: "semantic" },
  "candle-large": { dataEditor: "ohlc", colorPolicy: "semantic" },
  "heat-cartesian": { dataEditor: "matrix", colorPolicy: "gradient" },
  "heat-calendar": { dataEditor: "calendar", colorPolicy: "gradient" },
  "heat-large": { dataEditor: "generator", colorPolicy: "gradient" },
  "large-scale-area": { dataEditor: "generator", colorPolicy: "series" },
  "lines-ny": { dataEditor: "generator", colorPolicy: "series" },
  "matrix-covariance": { dataEditor: "matrix", colorPolicy: "gradient" },
  "tree-lr": { dataEditor: "hierarchy", colorPolicy: "series" },
  "treemap-basic": { dataEditor: "hierarchy", colorPolicy: "gradient" },
  "treemap-sunburst": { dataEditor: "hierarchy", colorPolicy: "series" },
  "sankey-basic": { dataEditor: "network", colorPolicy: "series" },
  "sankey-gradient": { dataEditor: "network", colorPolicy: "series" },
  "graph-les-mis": { dataEditor: "network", colorPolicy: "series" },
  "graph-hide-overlap": { dataEditor: "network", colorPolicy: "series" },
  "graph-gradient-edge": { dataEditor: "network", colorPolicy: "series" },
  "map-usa-population": { dataEditor: "geo", colorPolicy: "gradient" },
  "matrix-mini-bar-geo": { dataEditor: "geo", colorPolicy: "series" },
  "geo-graph": { dataEditor: "geo-route", colorPolicy: "series" },
  "bar-animation": { colorPolicy: "series" },
  "gauge-speed": { colorPolicy: "official-fixed" },
};

function getChartPolicy(chartId: string): ChartPolicy {
  const dataEditor: ChartDataEditorKind = PRESET_DATA_CHARTS.has(chartId)
    ? "preset"
    : SINGLE_VALUE_CHARTS.has(chartId)
      ? "single-value"
      : MULTI_SINGLE_VALUE_CHARTS.has(chartId)
        ? "multi-value"
        : "category-series";
  return {
    dataEditor,
    colorPolicy: "series",
    presetReason: dataEditor === "preset" ? "현재 단계에서는 공식 샘플 또는 생성기 데이터를 사용합니다." : undefined,
    ...CHART_POLICY_OVERRIDES[chartId],
  };
}

// ─── Sample Data Generators ───────────────────────────────────────────────────
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

function createDefaultScatterSeries(): XYSeries[] {
  return [
    { id: "scatter-1", name: "Group A", points: [[10, 18], [18, 32], [25, 27], [34, 52], [43, 45], [52, 68]].map(([x, y]) => ({ x, y })) },
    { id: "scatter-2", name: "Group B", points: [[12, 42], [21, 25], [30, 48], [38, 36], [47, 72], [58, 57]].map(([x, y]) => ({ x, y })) },
  ];
}

function createDefaultBubbleSeries(): XYZSeries[] {
  return [
    { id: "bubble-1", name: "Market A", points: [[10, 35, 18], [22, 52, 26], [34, 46, 14], [48, 70, 34], [62, 58, 22]].map(([x, y, size]) => ({ x, y, size })) },
    { id: "bubble-2", name: "Market B", points: [[14, 62, 22], [28, 38, 16], [40, 60, 30], [55, 42, 20], [68, 76, 28]].map(([x, y, size]) => ({ x, y, size })) },
  ];
}

function createDefaultConfidencePoints(): RangePoint[] {
  const values = [-1.15, -0.42, -0.18, -0.07, -0.02, 0.01, -0.04, 0.16, -0.06, -0.03, -0.12, 0.18, -0.08, -0.14, -0.05, -0.01, -0.03, 0.02, -0.04, 0, -0.06, -0.02, -0.01, 0.32];
  const start = new Date(Date.UTC(2012, 7, 28));
  return values.map((value, index) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + index * 5);
    const spread = 0.07 + 1.2 * Math.exp(-index / 2.4) + Math.abs(Math.sin(index)) * 0.025;
    return {
      label: date.toISOString().slice(0, 10),
      value,
      lower: +(value - spread).toFixed(3),
      upper: +(value + Math.max(0.05, spread * 0.4)).toFixed(3),
    };
  });
}

function createDefaultOHLCPoints(count: number, key: string): OHLCPoint[] {
  const seeded = createSeededRand(key);
  return genOHLC(count, seeded.rand).map(([date, open, close, low, high]) => ({ date, open, close, low, high }));
}

const USA_REGION_NAMES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming", "Puerto Rico",
];

function createDefaultCartesianHeatmap(): MatrixCell[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const seeded = createSeededRand("heat-cartesian");
  return days.flatMap((day, dayIndex) =>
    Array.from({ length: 24 }, (_, hour) => ({ x: `${hour}:00`, y: day, value: seeded.rand(0, 100) + dayIndex }))
  );
}

function createDefaultCovarianceMatrix(): MatrixCell[] {
  const variables = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "NVDA", "META", "JPM"];
  const seeded = createSeededRand("matrix-covariance");
  const values: MatrixCell[] = [];
  const lookup = new Map<string, number>();
  variables.forEach((row, rowIndex) => variables.forEach((column, columnIndex) => {
    const mirrorKey = `${columnIndex}:${rowIndex}`;
    const value = rowIndex === columnIndex ? 1 : lookup.get(mirrorKey) ?? +(seeded.rand(-100, 100) / 100).toFixed(2);
    lookup.set(`${rowIndex}:${columnIndex}`, value);
    values.push({ x: column, y: row, value });
  }));
  return values;
}

function createDefaultSingleAxisScatter(): MatrixCell[] {
  const hours = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];
  const days = ["Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday", "Sunday"];
  const seeded = createSeededRand("scatter-single");
  return days.flatMap((day, dayIndex) => hours.map((hour, hourIndex) => {
    const activeHour = hourIndex >= 10 && hourIndex <= 22;
    const weekendBoost = dayIndex === 0 || dayIndex === 6 ? 2 : 0;
    const value = activeHour ? seeded.rand(1, 10 + weekendBoost) : seeded.rand(0, 3);
    return { x: hour, y: day, value };
  }));
}

function createDefaultJitterScatter(): MatrixCell[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const seeded = createSeededRand("scatter-jitter");
  return days.flatMap(day => Array.from({ length: 24 }, (_, index) => ({ x: day, y: `P${index + 1}`, value: +(seeded.rand(0, 100) / 10).toFixed(1) })));
}

function createDefaultCalendarHeatmap(): DateValuePoint[] {
  const seeded = createSeededRand("heat-calendar");
  const start = new Date(Date.UTC(2024, 0, 1));
  return Array.from({ length: 366 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + index);
    return { date: date.toISOString().slice(0, 10), value: seeded.rand(0, 1000) };
  });
}

function createDefaultHierarchy(): HierarchyRow[] {
  return [
    { id: "root", name: "Health & Human Services", parentId: "", value: 1100 },
    { id: "cms", name: "Centers for Medicare and Medicaid Services", parentId: "root", value: 720 },
    { id: "nih", name: "National Institutes of Health", parentId: "root", value: 120 },
    { id: "acf", name: "Administration for Children and Families", parentId: "root", value: 88 },
    { id: "cdc", name: "Centers for Disease Control and Prevention", parentId: "root", value: 62 },
    { id: "fda", name: "Food and Drug Administration", parentId: "root", value: 42 },
    { id: "hrsa", name: "Health Resources and Services Administration", parentId: "root", value: 30 },
    { id: "sam", name: "Substance Abuse and Mental Health Services", parentId: "root", value: 18 },
    { id: "other", name: "Other Programs", parentId: "root", value: 20 },
  ];
}

function createDefaultSankeyData(): { nodes: NetworkNode[]; links: NetworkLink[] } {
  const names = ["Coal", "Natural Gas", "Oil", "Electricity", "Heat", "Industry", "Buildings", "Transport"];
  const nodes = names.map((name, index) => ({ id: `s${index}`, name, category: index < 3 ? "Source" : index < 5 ? "Conversion" : "Use" }));
  const rawLinks: [string, string, number][] = [
    ["Coal", "Electricity", 50], ["Natural Gas", "Electricity", 30], ["Natural Gas", "Heat", 20],
    ["Oil", "Transport", 80], ["Oil", "Industry", 30], ["Electricity", "Industry", 40],
    ["Electricity", "Buildings", 35], ["Heat", "Buildings", 20],
  ];
  return { nodes, links: rawLinks.map(([source, target, value], index) => ({ id: `sl${index}`, source, target, value })) };
}

function createDefaultGraphData(): { nodes: NetworkNode[]; links: NetworkLink[] } {
  const nodes = Array.from({ length: 15 }, (_, index) => ({ id: `n${index}`, name: index < 3 ? `Hub ${index + 1}` : `Node ${index + 1}`, category: index < 3 ? "Core" : index < 9 ? "Support" : "Fringe" }));
  const links: NetworkLink[] = nodes.slice(3).map((node, index) => ({ id: `gl${index}`, source: node.name, target: nodes[index % 3].name, value: 1 }));
  links.push({ id: "gl-extra-1", source: "Hub 1", target: "Hub 2", value: 2 }, { id: "gl-extra-2", source: "Hub 2", target: "Hub 3", value: 2 });
  return { nodes, links };
}

function createDefaultGeoRegions(): GeoRegionRow[] {
  const seeded = createSeededRand("geo-regions");
  return USA_REGION_NAMES.map(name => ({ name, value: seeded.rand(6, 390), secondary: seeded.rand(20, 200) }));
}

function createDefaultGeoRoute(): GeoRoutePoint[] {
  return [
    { name: "New York", longitude: -74.006, latitude: 40.7128 },
    { name: "Boston", longitude: -71.0589, latitude: 42.3601 },
    { name: "Chicago", longitude: -87.6298, latitude: 41.8781 },
    { name: "Denver", longitude: -104.9903, latitude: 39.7392 },
    { name: "Salt Lake City", longitude: -111.891, latitude: 40.7608 },
    { name: "Seattle", longitude: -122.3321, latitude: 47.6062 },
    { name: "San Francisco", longitude: -122.4194, latitude: 37.7749 },
    { name: "Los Angeles", longitude: -118.2437, latitude: 34.0522 },
    { name: "Phoenix", longitude: -112.074, latitude: 33.4484 },
    { name: "Dallas", longitude: -96.797, latitude: 32.7767 },
    { name: "Miami", longitude: -80.1918, latitude: 25.7617 },
    { name: "Washington DC", longitude: -77.0369, latitude: 38.9072 },
  ];
}

function hierarchyRowsToTree(rows: HierarchyRow[]) {
  const nodeMap = new Map(rows.map(row => [row.id, { name: row.name, value: row.value, children: [] as any[] }]));
  const roots: any[] = [];
  rows.forEach(row => {
    const node = nodeMap.get(row.id);
    const parent = row.parentId ? nodeMap.get(row.parentId) : undefined;
    if (node && parent && row.parentId !== row.id) parent.children.push(node);
    else if (node) roots.push(node);
  });
  const stripEmpty = (node: any): any => node.children.length ? { ...node, children: node.children.map(stripEmpty) } : { name: node.name, value: node.value };
  return roots.map(stripEmpty);
}

function hierarchyRowsToGradientTree(rows: HierarchyRow[]) {
  const roots = hierarchyRowsToTree(rows);
  const mapSiblingValues = (nodes: any[]): any[] => {
    const numericValues = nodes.map(node => Number(node.value) || 0);
    const average = numericValues.reduce((sum, value) => sum + value, 0) / Math.max(1, numericValues.length);
    const maxDeviation = Math.max(1, ...numericValues.map(value => Math.abs(value - average)));

    return nodes.map((node, index) => {
      const rawValue = numericValues[index];
      const visualValue = Math.max(-100, Math.min(100, ((rawValue - average) / maxDeviation) * 100));
      return {
        name: node.name,
        value: [Math.max(0.01, Math.abs(rawValue)), +visualValue.toFixed(2)],
        ...(node.children?.length ? { children: mapSiblingValues(node.children) } : {}),
      };
    });
  };
  return mapSiblingValues(roots);
}

function csvEscape(value: unknown): string {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, "\"\"")}"` : text;
}

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (quoted) {
      if (char === "\"" && text[index + 1] === "\"") { cell += "\""; index++; }
      else if (char === "\"") quoted = false;
      else cell += char;
    } else if (char === "\"") quoted = true;
    else if (char === ",") { row.push(cell.trim()); cell = ""; }
    else if (char === "\n") { row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; }
    else if (char !== "\r") cell += char;
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function createDefaultSpecialChartData(): SpecialChartData {
  const sankey = createDefaultSankeyData();
  const graph = createDefaultGraphData();
  return {
    scatter: createDefaultScatterSeries(),
    bubble: createDefaultBubbleSeries(),
    confidence: createDefaultConfidencePoints(),
    candleBasic: createDefaultOHLCPoints(40, "candle-basic"),
    candleLarge: createDefaultOHLCPoints(120, "candle-large"),
    cartesianHeatmap: createDefaultCartesianHeatmap(),
    covarianceMatrix: createDefaultCovarianceMatrix(),
    singleAxisScatter: createDefaultSingleAxisScatter(),
    jitterScatter: createDefaultJitterScatter(),
    calendarHeatmap: createDefaultCalendarHeatmap(),
    hierarchy: createDefaultHierarchy(),
    sankeyNodes: sankey.nodes,
    sankeyLinks: sankey.links,
    graphNodes: graph.nodes,
    graphLinks: graph.links,
    geoRegions: createDefaultGeoRegions(),
    geoRoute: createDefaultGeoRoute(),
    generator: {
      seed: 42,
      heatWidth: 100,
      heatHeight: 100,
      lineGrid: 110,
      lineSpan: 1000,
      areaPoints: 1500,
      areaVolatility: 12,
    },
  };
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
  specialData: SpecialChartData,
): echarts.EChartsOption {
  // Static-demo charts ignore Data Input and fabricate their own numbers — but this
  // function gets re-invoked on every theme toggle, resize, and SVG export, so without a
  // fixed seed those charts would silently reshuffle on unrelated interactions and could
  // render different data on screen vs. in an exported SVG (which rebuilds the option).
  const isStaticDemo = SEEDED_DEMO_CHARTS.has(chartId);
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
  const topPad = title ? (isSmall ? 36 : 52) : (isSmall ? 12 : 20);
  const legendFontSize = isSmall ? 10 : 12;
  const legendNames = datasets.map(dataset => dataset.name);
  const legendEntryWidths = legendNames.map(name => Math.max(54, name.length * legendFontSize * 0.62 + 44));
  const legendAvailableWidth = Math.max(160, w - 48);
  let legendRows = 1;
  let legendRowWidth = 0;
  legendEntryWidths.forEach(entryWidth => {
    if (legendRowWidth > 0 && legendRowWidth + entryWidth > legendAvailableWidth) {
      legendRows++;
      legendRowWidth = entryWidth;
    } else {
      legendRowWidth += entryWidth;
    }
  });
  const legendBottomSpace = !isSmall && legendBottom ? Math.max(56, legendRows * 24 + 24) : 28;
  const legendAxisBottomSpace = !isSmall ? Math.max(56, legendRows * 24 + 24) : 28;
  const legendRightSpace = Math.max(
    96,
    Math.min(Math.max(96, w * 0.36), (Math.max(0, ...legendNames.map(name => name.length)) * legendFontSize * 0.62) + 62),
  );
  const categoryLegendNames = labels.length ? labels : ["Item"];
  const categoryLegendEntryWidths = categoryLegendNames.map(name => Math.max(54, name.length * legendFontSize * 0.62 + 44));
  let categoryLegendRows = 1;
  let categoryLegendRowWidth = 0;
  categoryLegendEntryWidths.forEach(entryWidth => {
    if (categoryLegendRowWidth > 0 && categoryLegendRowWidth + entryWidth > legendAvailableWidth) {
      categoryLegendRows++;
      categoryLegendRowWidth = entryWidth;
    } else {
      categoryLegendRowWidth += entryWidth;
    }
  });
  const categoryLegendRightSpace = Math.max(
    96,
    Math.min(Math.max(96, w * 0.36), (Math.max(0, ...categoryLegendNames.map(name => name.length)) * legendFontSize * 0.62) + 62),
  );
  const categoryLegendBottomSpace = !isSmall && legendBottom ? Math.max(56, categoryLegendRows * 24 + 24) : 28;
  const categoryChartCenterX = legendBottom ? "50%" : `${Math.max(34, 50 - (categoryLegendRightSpace / Math.max(1, w)) * 50)}%`;
  const categoryPieOuterRadius = `${Math.max(42, 62 - Math.max(0, categoryLegendRows - 1) * 5)}%`;
  const seriesChartCenterX = legendBottom ? "50%" : `${Math.max(34, 50 - (legendRightSpace / Math.max(1, w)) * 50)}%`;
  const seriesRadialRadius = `${Math.max(44, 70 - Math.max(0, legendRows - 1) * 5)}%`;

  const axisTick = { axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz }, axisLine: { lineStyle: { color: axisC } }, splitLine: { lineStyle: { color: axisC } } };
  const titleCfg: echarts.TitleComponentOption | undefined = title
    ? { text: title, left: "center", top: 6, textStyle: { color: fg, fontSize: titleSz, fontFamily: "Inter", fontWeight: "bold" } } : undefined;
  const legend: echarts.LegendComponentOption = {
    show: !isSmall,
    type: datasets.length > 8 ? "scroll" : "plain",
    ...(legendBottom
      ? { bottom: 4, left: "center" }
      : { right: 8, top: topPad, bottom: 16, orient: "vertical" as const }),
    itemGap: 16,
    textStyle: { color: fg, fontFamily: "Inter", fontSize: legendFontSize },
    pageTextStyle: { color: fg, fontFamily: "Inter", fontSize: 10 },
  };
  const categoryLegend: echarts.LegendComponentOption = {
    show: !isSmall,
    type: categoryLegendNames.length > 8 ? "scroll" : "plain",
    ...(legendBottom
      ? { bottom: 4, left: "center" }
      : { right: 8, top: topPad, bottom: 16, orient: "vertical" as const }),
    itemGap: 16,
    textStyle: { color: fg, fontFamily: "Inter", fontSize: legendFontSize },
    pageTextStyle: { color: fg, fontFamily: "Inter", fontSize: 10 },
  };
  const gridL = isSmall ? 8 : 48;
  // When the legend is at the bottom (no vertical legend competing for right-side room),
  // mirror the left margin instead of a much tighter hardcoded value — a lone left-side
  // Y axis otherwise made the plot area look lopsided (left ~48px vs right ~8px at M/L size).
  const grid = { left: gridL, right: legendBottom ? gridL : legendRightSpace, top: topPad, bottom: legendBottomSpace, containLabel: true };
  // Same left/right mirroring as `grid` above — these charts have no legend or right-side
  // content either, so a bare 8-12px right margin looked just as lopsided against gridL.
  const gridFull = { left: gridL, right: gridL, top: topPad, bottom: 28, containLabel: true };
  const tooltip: echarts.TooltipComponentOption = { trigger: "axis", backgroundColor: theme === "dark" ? "#1f2937" : "#fff", borderColor: axisC, textStyle: { color: fg, fontFamily: "Inter", fontSize: 12 } };
  // A second/opposite value yAxis needs room reserved on the right regardless of legend width —
  // "named" (has its own name label) needs more than a bare tick-only axis.
  const dualAxisNameRight = isSmall ? 46 : 64;
  const dualAxisTickRight = isSmall ? 28 : 40;
  const withMinRight = (g: { right: number } & Record<string, unknown>, min: number) => ({ ...g, right: Math.max(g.right, min) });
  // Charts with a right-side value axis put the legend at the bottom regardless of width,
  // since a vertical right-aligned legend would collide with that axis's name/ticks.
  const legendAxisSafe: echarts.LegendComponentOption = {
    show: !isSmall,
    type: datasets.length > 8 ? "scroll" : "plain",
    bottom: 4,
    left: "center",
    itemGap: 16,
    textStyle: { color: fg, fontFamily: "Inter", fontSize: legendFontSize },
    pageTextStyle: { color: fg, fontFamily: "Inter", fontSize: 10 },
  };
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

    case "area-pieces": {
      const pieceData = userVals(0);
      const pieceSeriesData: [string, number][] = userLabels.map((label, index) => [label, pieceData[index] ?? 0]);
      const pieceName = datasets[0]?.name ?? "Area";
      const pieceCount = userLabels.length;
      const pieceBounds = [
        Math.max(0, Math.floor(pieceCount * 0.15)),
        Math.max(1, Math.floor(pieceCount * 0.4)),
        Math.max(2, Math.floor(pieceCount * 0.6)),
        Math.max(3, Math.floor(pieceCount * 0.85)),
      ].map(index => Math.min(Math.max(0, pieceCount - 1), index));
      const pieceColor = "rgba(0, 0, 180, 0.4)";

      return {
        backgroundColor: bg,
        title: titleCfg,
        tooltip: { ...tooltip, trigger: "axis" },
        grid: gridFull,
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: userLabels,
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "30%"],
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: axisC } },
        },
        visualMap: {
          type: "piecewise",
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            { gt: pieceBounds[0], lt: pieceBounds[1], color: pieceColor },
            { gt: pieceBounds[2], lt: pieceBounds[3], color: pieceColor },
          ],
        },
        series: [{
          name: pieceName,
          type: "line",
          smooth: smoothLine ? 0.6 : false,
          symbol: "none",
          lineStyle: { color: palette[0], width: 5 },
          markLine: {
            symbol: ["none", "none"],
            label: { show: false },
            lineStyle: { color: palette[0], type: "dashed", width: 1.5, opacity: 0.9 },
            data: pieceBounds.map(xAxis => ({ xAxis })),
          },
          areaStyle: {},
          data: pieceSeriesData,
        }],
        legend: { show: false },
      };
    }

    case "line-bump": {
      const rankCount = Math.max(1, datasets.length);
      const ranksBySeries = datasets.map(() => Array<number>(userLabels.length).fill(1));
      userLabels.forEach((_, pointIndex) => {
        const ordered = datasets
          .map((dataset, datasetIndex) => ({ datasetIndex, value: dataset.data[pointIndex] ?? Number.POSITIVE_INFINITY }))
          .sort((a, b) => a.value - b.value || a.datasetIndex - b.datasetIndex);
        ordered.forEach((entry, rankIndex) => {
          ranksBySeries[entry.datasetIndex][pointIndex] = rankIndex + 1;
        });
      });
      const bumData = datasets.map((dataset, i) => ({
        name: dataset.name,
        type: "line" as const,
        data: ranksBySeries[i],
        smooth: smoothLine,
        symbolSize: isSmall ? 8 : 12,
        emphasis: { focus: "series" as const },
        endLabel: {
          show: true,
          formatter: (params: any) => `${params.seriesName}  #${params.value}`,
          distance: 16,
          color: fg,
          fontFamily: "Inter",
          fontSize: isSmall ? 9 : 11,
          fontWeight: 600,
        },
        labelLayout: { moveOverlap: "shiftY" as const },
        lineStyle: { width: isSmall ? 2.5 : 4 },
        itemStyle: { color: palette[i % palette.length] },
      }));
      return {
        backgroundColor: bg,
        color: palette,
        title: titleCfg,
        legend: { show: false },
        tooltip: {
          ...tooltip,
          trigger: "item",
          formatter: (params: any) => `${params.seriesName}<br/>${params.name}: #${params.value}`,
        },
        grid: {
          ...gridFull,
          left: isSmall ? 28 : 46,
          right: Math.max(isSmall ? 76 : 118, endLabelRight(datasets.map(dataset => `${dataset.name} #${rankCount}`), isSmall ? 9 : 11)),
          bottom: isSmall ? 32 : 44,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: userLabels,
          ...axisTick,
          splitLine: { show: true, lineStyle: { color: axisC } },
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz, margin: isSmall ? 12 : 22 },
        },
        yAxis: {
          type: "value",
          inverse: true,
          min: 1,
          max: rankCount,
          interval: 1,
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz, formatter: "#{value}", margin: isSmall ? 10 : 18 },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: axisC } },
        },
        series: bumData,
      };
    }

    case "line-confidence": {
      const confidencePoints = specialData.confidence.length ? specialData.confidence : createDefaultConfidencePoints();
      const confidenceDates = confidencePoints.map(point => point.label);
      const confidenceValues = confidencePoints.map(point => point.value);
      const confidenceLower = confidencePoints.map(point => Math.min(point.lower, point.value, point.upper));
      const confidenceUpper = confidencePoints.map(point => Math.max(point.lower, point.value, point.upper));
      const confidenceMin = Math.floor(Math.min(...confidenceLower) * 10) / 10;
      const confidenceMax = Math.ceil(Math.max(...confidenceUpper) * 10) / 10;
      const confidenceOffset = confidenceMin < 0 ? -confidenceMin : 0;
      const adjustedLower = confidenceLower.map(value => +(value + confidenceOffset).toFixed(4));
      const bandWidth = confidenceUpper.map((value, i) => +(value - confidenceLower[i]).toFixed(4));
      const adjustedValues = confidenceValues.map(value => +(value + confidenceOffset).toFixed(4));
      const confidenceTitle: echarts.TitleComponentOption = titleCfg
        ? {
            ...titleCfg,
            subtext: "Example in MetricsGraphics.js",
            subtextStyle: { color: theme === "dark" ? "#9ca3af" : "#888", fontFamily: "Inter", fontSize: isSmall ? 10 : 12 },
          }
        : {
            text: "Confidence Band",
            subtext: "Example in MetricsGraphics.js",
            left: "center",
            top: 6,
            textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" },
            subtextStyle: { color: theme === "dark" ? "#9ca3af" : "#888", fontFamily: "Inter", fontSize: isSmall ? 10 : 12 },
          };

      return {
        backgroundColor: bg,
        title: confidenceTitle,
        tooltip: {
          ...tooltip,
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: theme === "dark" ? "#374151" : "#e5e7eb",
              borderColor: axisC,
              borderWidth: 1,
              color: fg,
            },
          },
          formatter: (params: any) => {
            const items = Array.isArray(params) ? params : [params];
            const point = items.find((item: any) => item.seriesName === "Value") ?? items[2] ?? items[0];
            const dataIndex = point?.dataIndex ?? 0;
            return `${confidenceDates[dataIndex]}<br/>${(confidenceValues[dataIndex] * 100).toFixed(1)}%`;
          },
        },
        grid: {
          ...gridFull,
          top: title ? (isSmall ? 58 : 76) : (isSmall ? 48 : 66),
        },
        xAxis: {
          type: "category",
          data: confidenceDates,
          boundaryGap: false,
          axisLabel: {
            color: fg,
            fontFamily: "Inter",
            fontSize: axisFontSz,
            hideOverlap: true,
            formatter: (value: string, index: number) => {
              if (index === 0) return value;
              const date = new Date(`${value}T00:00:00Z`);
              return `${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
            },
          },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: "value",
          min: confidenceMin + confidenceOffset,
          max: confidenceMax + confidenceOffset,
          splitNumber: 4,
          axisLabel: {
            color: fg,
            fontFamily: "Inter",
            fontSize: axisFontSz,
            formatter: (value: number) => `${Math.round((value - confidenceOffset) * 100)}%`,
          },
          axisPointer: {
            label: {
              formatter: (params: any) => `${((Number(params.value) - confidenceOffset) * 100).toFixed(1)}%`,
            },
          },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "Lower",
            type: "line",
            smooth: smoothLine,
            data: adjustedLower,
            lineStyle: { opacity: 0 },
            stack: "confidence-band",
            symbol: "none",
          },
          {
            name: "U",
            type: "line",
            smooth: smoothLine,
            data: bandWidth,
            lineStyle: { opacity: 0 },
            areaStyle: { color: palette[0], opacity: theme === "dark" ? 0.28 : 0.2 },
            stack: "confidence-band",
            symbol: "none",
          },
          {
            name: "Value",
            type: "line",
            smooth: smoothLine,
            data: adjustedValues,
            showSymbol: false,
            symbolSize: 6,
            lineStyle: { color: palette[0], width: 2.5 },
            itemStyle: { color: palette[0] },
          },
        ],
        legend: { show: false },
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
      const vals = userVals(0);
      const hasTimeLabels = userLabels.every(label => Number.isFinite(Date.parse(label)));
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip: { ...tooltip, trigger: "axis" }, grid,
        xAxis: hasTimeLabels ? { type: "time", ...axisTick } : { type: "category", data: userLabels, boundaryGap: false, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: [{
          name: datasets[0]?.name ?? "Value", type: "line", smooth: smoothLine,
          data: hasTimeLabels ? userLabels.map((label, index) => [label, vals[index] ?? 0]) : vals,
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

    case "line-aqi": {
      const xData = userLabels;
      const aqiData = userVals(0);
      const aqiName = datasets[0]?.name ?? "Beijing AQI";
      const aqiPieces = [
        { gt: 0, lte: 50, color: "#93CE07", label: "0 - 50" },
        { gt: 50, lte: 100, color: "#FBDB0F", label: "50 - 100" },
        { gt: 100, lte: 150, color: "#FC7D02", label: "100 - 150" },
        { gt: 150, lte: 200, color: "#FD0100", label: "150 - 200" },
        { gt: 200, lte: 300, color: "#AA069F", label: "200 - 300" },
        { gt: 300, color: "#AC3B2A", label: "> 300" },
      ];
      const aqiLegendTextWidth = Math.max(...aqiPieces.map(piece => piece.label.length)) * 10 * 0.62;
      const aqiRightReserve = Math.ceil(aqiLegendTextWidth + 104);

      return {
        backgroundColor: bg,
        title: titleCfg,
        tooltip: { ...tooltip, trigger: "axis" },
        grid: {
          left: isSmall ? 8 : "5%",
          right: isSmall ? 12 : aqiRightReserve,
          top: topPad,
          bottom: isSmall ? 52 : 62,
          containLabel: true,
        },
        dataZoom: [
          {
            type: "slider",
            start: xData.length > 20 ? 45 : 0,
            height: 18,
            bottom: 8,
            borderColor: axisC,
            textStyle: { color: fg, fontFamily: "Inter", fontSize: 10 },
          },
          { type: "inside", start: xData.length > 20 ? 45 : 0 },
        ],
        visualMap: {
          show: !isSmall,
          type: "piecewise",
          top: title ? 76 : 50,
          right: 8,
          itemWidth: 24,
          itemHeight: 14,
          itemGap: 10,
          pieces: aqiPieces,
          outOfRange: { color: "#999" },
          textStyle: { color: fg, fontFamily: "Inter", fontSize: 10 },
          seriesIndex: 0,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData,
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz, hideOverlap: true },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
        },
        yAxis: { type: "value", ...axisTick },
        series: [{
          name: aqiName,
          type: "line",
          smooth: false,
          data: aqiData,
          showSymbol: false,
          lineStyle: { width: 2 },
          markLine: {
            silent: true,
            symbol: ["none", "none"],
            lineStyle: { color: theme === "dark" ? "rgba(255,255,255,0.4)" : "#333", width: 1 },
            label: { color: fg, fontFamily: "Inter", fontSize: 10 },
            data: [{ yAxis: 50 }, { yAxis: 100 }, { yAxis: 150 }, { yAxis: 200 }, { yAxis: 300 }],
          },
        }],
        legend: { show: false },
      };
    }

    case "large-scale-area": {
      const n = Math.max(100, Math.min(20000, Math.round(specialData.generator.areaPoints)));
      const volatility = Math.max(1, Math.min(100, Math.round(specialData.generator.areaVolatility)));
      const areaRand = createSeededRand(`large-scale-area-${specialData.generator.seed}`).rand;
      const oneDay = 24 * 3600 * 1000;
      let t = +new Date(2020, 0, 1);
      const ldata: [number, number][] = [[t, areaRand(80, 160)]];
      for (let i = 1; i < n; i++) { t += oneDay; ldata.push([t, Math.max(0, ldata[i - 1][1] + areaRand(-volatility, volatility))]); }
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
      const rdates = userLabels;
      const flowData = userVals(0);
      const rainData = userVals(1);
      const flowName = datasets[0]?.name ?? "Flow";
      const rainName = datasets[1]?.name ?? "Rainfall";
      const rainAreaStart = rdates[Math.floor(rdates.length * 0.4)];
      const rainAreaEnd = rdates[Math.min(rdates.length - 1, Math.floor(rdates.length * 0.62))];
      return {
        backgroundColor: bg, title: titleCfg || { text: "Rainfall and Flow Relationship", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        grid: { ...gridFull, top: topPad + 22, bottom: 80 },
        tooltip: { trigger: "axis", axisPointer: { type: "cross", animation: false, label: { backgroundColor: "#505765" } } },
        legend: { ...legendAxisSafe, left: 10, top: title ? 38 : 10, data: [flowName, rainName] },
        dataZoom: [
          { show: true, realtime: true, start: 0, end: rdates.length > 40 ? 35 : 100, bottom: 8, height: 18 },
          { type: "inside", realtime: true, start: 0, end: rdates.length > 40 ? 35 : 100 },
        ],
        xAxis: { type: "category", boundaryGap: false, data: rdates, axisLine: { onZero: false, lineStyle: { color: axisC } }, axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz } },
        yAxis: [
          { type: "value", name: "Flow", nameLocation: "middle", nameGap: isSmall ? 30 : 42, nameTextStyle: { color: fg, fontFamily: "Inter" }, ...axisTick },
          { type: "value", name: "Rainfall", nameLocation: "middle", nameGap: isSmall ? 30 : 42, inverse: true, ...axisTick },
        ],
        series: [
          {
            name: flowName, type: "line", smooth: false, areaStyle: {}, lineStyle: { width: 1, color: palette[0] },
            itemStyle: { color: palette[0] }, symbol: "none", emphasis: { focus: "series" }, data: flowData,
          },
          {
            name: rainName, type: "line", smooth: false, yAxisIndex: 1, areaStyle: {}, lineStyle: { width: 1, color: palette[1] },
            itemStyle: { color: palette[1] }, symbol: "none", emphasis: { focus: "series" },
            markArea: rainAreaStart && rainAreaEnd ? {
              silent: true,
              itemStyle: { opacity: 0.3 },
              data: [[{ xAxis: rainAreaStart }, { xAxis: rainAreaEnd }]],
            } : undefined,
            data: rainData,
          },
        ],
      };
    }

    case "line-race": {
      const countries = datasets.map(dataset => dataset.name);
      const years = userLabels;
      const raceSeries = datasets.map((dataset, ci) => {
        return {
          type: "line" as const, name: dataset.name, showSymbol: false, smooth: smoothLine, data: dataset.data,
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
      const neg = userVals(0);
      return {
        backgroundColor: bg,
        color: palette,
        title: titleCfg,
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { ...gridFull, top: topPad + 20, bottom: 30 },
        xAxis: {
          type: "value",
          position: "top",
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: axisC, type: "dashed" } },
        },
        yAxis: {
          type: "category",
          data: userLabels,
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [{
          name: datasets[0]?.name ?? "Cost",
          type: "bar",
          stack: "Total",
          data: neg.map(value => value < 0 ? { value, label: { position: "right" } } : value),
          barMaxWidth: 30,
          itemStyle: { color: palette[0] },
          label: { show: true, formatter: "{b}", color: fg, fontFamily: "Inter", fontSize: axisFontSz },
        }],
        legend: { show: false },
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
      const items = userLabels;
      const raw = userVals(0);
      let running = 0;
      const placeholder: number[] = [];
      const increases: number[] = [];
      const decreases: number[] = [];
      raw.forEach((v, i) => {
        if (i === 0 || i === raw.length - 1) {
          placeholder.push(0);
          increases.push(Math.max(0, v));
          decreases.push(Math.max(0, -v));
          if (i === 0) running = v;
          return;
        }
        if (v >= 0) {
          placeholder.push(running);
          increases.push(v);
          decreases.push(0);
          running += v;
        } else {
          running += v;
          placeholder.push(running);
          increases.push(0);
          decreases.push(-v);
        }
      });
      return {
        backgroundColor: bg,
        color: palette,
        title: titleCfg,
        tooltip: {
          ...tooltip,
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            const index = (Array.isArray(params) ? params[0] : params)?.dataIndex ?? 0;
            const value = raw[index] ?? 0;
            return `${items[index] ?? ""}: ${value > 0 ? "+" : ""}${value}`;
          },
        },
        grid: gridFull,
        xAxis: { type: "category", data: items, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: [
          { type: "bar", stack: "total", data: placeholder, itemStyle: { borderColor: "transparent", color: "transparent" }, emphasis: { itemStyle: { borderColor: "transparent", color: "transparent" } }, silent: true },
          { name: datasets[0]?.name ?? "Increase", type: "bar", stack: "total", data: increases, itemStyle: { color: palette[2] ?? "#10b981", borderRadius: [4, 4, 0, 0] }, barMaxWidth: 40 },
          { name: "Decrease", type: "bar", stack: "total", data: decreases, itemStyle: { color: palette[3] ?? "#ef4444", borderRadius: [0, 0, 4, 4] }, barMaxWidth: 40 },
        ],
        legend: { show: false },
      };
    }

    case "bar-race": {
      // A real race needs values that change over time, not one static snapshot — ECharts'
      // timeline feature drives that: each timeline entry is a frame, autoPlay steps through
      // them, and realtimeSort animates the bars reordering as values change between frames.
      const countries = datasets.map(dataset => dataset.name);
      const years = userLabels;
      const frames = years.map((_, frameIndex) => datasets.map(dataset => dataset.data[frameIndex] ?? 0));
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
      const countries = userLabels;
      const populationSeries = datasets;

      return {
        backgroundColor: bg,
        color: palette,
        title: titleCfg,
        tooltip: { ...tooltip, trigger: "axis", axisPointer: { type: "shadow" } },
        legend: {
          ...legendAxisSafe,
          data: populationSeries.map(series => series.name),
        },
        grid: {
          ...gridFull,
          left: isSmall ? 66 : 84,
          right: isSmall ? 10 : 28,
          bottom: isSmall ? 42 : legendAxisBottomSpace,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            color: fg,
            fontFamily: "Inter",
            fontSize: axisFontSz,
            formatter: (value: number) => value >= 1000 ? `${value / 1000}K` : String(value),
          },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: axisC } },
        },
        yAxis: {
          type: "category",
          data: countries,
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz },
          axisLine: { lineStyle: { color: axisC } },
          axisTick: { show: false },
        },
        series: populationSeries.map((series, i) => ({
          name: series.name,
          type: "bar" as const,
          data: series.data,
          barMaxWidth: isSmall ? 14 : 20,
          itemStyle: { color: palette[i % palette.length] },
          emphasis: { focus: "series" as const },
        })),
      };
    }

    case "bar-animation": {
      // The official Animation Delay example uses 100 formula-generated categories. The
      // two oscillating series make the staggered entrance readable while their baseline
      // rises from roughly -50 to 120 across A0–A99.
      const animationLabels = userLabels;
      const animationData1 = userVals(0);
      const animationData2 = userVals(1);
      const animationName1 = datasets[0]?.name ?? "bar";
      const animationName2 = datasets[1]?.name ?? "bar2";
      const animationValues = [...animationData1, ...animationData2];
      const rawMin = Math.min(0, ...animationValues);
      const rawMax = Math.max(0, ...animationValues);
      const animationPadding = Math.max(1, (rawMax - rawMin) * 0.12);
      const animationMin = Math.floor((rawMin - animationPadding) / 10) * 10;
      const animationMax = Math.ceil((rawMax + animationPadding) / 10) * 10;

      return {
        backgroundColor: bg,
        color: palette,
        title: titleCfg,
        legend: { ...legendAxisSafe, data: [animationName1, animationName2] },
        tooltip: { ...tooltip, axisPointer: { type: "shadow" } },
        grid: { ...gridFull, bottom: isSmall ? 40 : legendAxisBottomSpace },
        xAxis: {
          type: "category",
          data: animationLabels,
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz, interval: isSmall ? 9 : 3 },
          axisLine: { lineStyle: { color: fg } },
        },
        yAxis: {
          type: "value",
          min: animationMin,
          max: animationMax,
          axisLabel: { color: fg, fontFamily: "Inter", fontSize: axisFontSz },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: axisC } },
        },
        series: [
          {
            name: animationName1,
            type: "bar",
            data: animationData1,
            itemStyle: { color: palette[0] },
            emphasis: { focus: "series" as const },
            animationDelay: (idx: number) => idx * 10,
          },
          {
            name: animationName2,
            type: "bar",
            data: animationData2,
            itemStyle: { color: palette[1 % palette.length] },
            emphasis: { focus: "series" as const },
            animationDelay: (idx: number) => idx * 10 + 100,
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    }

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
        grid: withMinRight({ ...grid, bottom: legendAxisBottomSpace }, multiYRight),
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
        polar: { radius: isSmall ? "58%" : seriesRadialRadius, center: ["50%", title ? "52%" : "50%"] },
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
        polar: { radius: isSmall ? "58%" : seriesRadialRadius, center: ["50%", "50%"] },
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
        polar: { radius: isSmall ? "58%" : seriesRadialRadius, center: ["50%", title ? "52%" : "50%"] },
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
        polar: { radius: isSmall ? "58%" : seriesRadialRadius, center: ["50%", title ? "52%" : "50%"] },
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
        backgroundColor: bg, color: palette, title: titleCfg, legend: categoryLegend,
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [{ type: "pie", radius: categoryPieOuterRadius, center: [categoryChartCenterX, "52%"], data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), itemStyle: { borderRadius: 6, borderColor: bg, borderWidth: 2 }, label: { color: fg, fontFamily: "Inter", fontSize: 11 }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.3)" } } }],
      };
    }

    case "pie-doughnut": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend: categoryLegend,
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [{ type: "pie", radius: ["36%", categoryPieOuterRadius], center: [categoryChartCenterX, "52%"], data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), itemStyle: { borderRadius: 8, borderColor: bg, borderWidth: 3 }, label: { color: fg, fontFamily: "Inter", fontSize: 11 }, emphasis: { itemStyle: { shadowBlur: 12, shadowColor: "rgba(0,0,0,0.3)" } } }],
      };
    }

    case "pie-half": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend: { ...categoryLegend, bottom: 0 },
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [{ type: "pie", radius: ["40%", categoryPieOuterRadius], center: [categoryChartCenterX, "65%"], startAngle: 180, endAngle: 360, data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 }, label: { color: fg, fontFamily: "Inter", fontSize: 11 } }],
      };
    }

    case "pie-rose": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend: categoryLegend,
        tooltip: { trigger: "item", formatter: "{b}: {c}" },
        series: [{ type: "pie", radius: ["15%", categoryPieOuterRadius], center: [categoryChartCenterX, "52%"], roseType: "area" as any, data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0 })), label: { color: fg, fontFamily: "Inter", fontSize: 10 }, itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 } }],
      };
    }

    case "pie-scrollable": {
      const items = userLabels;
      const v = userVals(0);
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
      const refValues = userVals(0);
      const refs = userLabels.map((name, index) => ({ name, value: refValues[index] ?? 0 }));
      const groupA = refs.filter((_, index) => index % 2 === 0).reduce((sum, item) => sum + item.value, 0);
      const groupB = refs.filter((_, index) => index % 2 === 1).reduce((sum, item) => sum + item.value, 0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Referer of Website", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        legend: { show: false },
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        series: [
          { type: "pie", radius: ["0%", "30%"], label: { position: "inner", color: "#fff", fontSize: 10, fontFamily: "Inter" }, data: [{ name: "Group A", value: groupA, itemStyle: { color: palette[0] } }, { name: "Group B", value: groupB, itemStyle: { color: palette[1 % palette.length] } }], itemStyle: { borderColor: bg, borderWidth: 2 } },
          { type: "pie", radius: ["35%", "60%"], label: { color: fg, fontFamily: "Inter", fontSize: 11 }, data: refs.map((r, i) => ({ ...r, itemStyle: { color: palette[i % palette.length] } })), itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 2 } },
        ],
      };
    }

    case "pie-browser-proportion": {
      // roseType:'radius' encodes value as slice length (not just angle) — a second
      // Nightingale variant alongside pie-rose's roseType:'area', with fixed reference
      // data instead of the official example's live-fetched browser stats.
      const browserValues = userVals(0);
      const browserData = userLabels.map((name, index) => ({ name, value: browserValues[index] ?? 0 }));
      return {
        backgroundColor: bg, color: palette,
        title: titleCfg || { text: "Proportion of Browsers", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        legend: { type: "scroll", orient: "vertical", right: 12, top: title ? 52 : 16, bottom: 20, textStyle: { color: fg, fontFamily: "Inter", fontSize: 11 } },
        tooltip: { trigger: "item", formatter: "{b}: {c}%" },
        series: [{
          type: "pie", radius: [10, "72%"], center: ["38%", "55%"], roseType: "radius" as any,
          data: browserData.map((d, i) => ({ ...d, itemStyle: { color: palette[i % palette.length] } })),
          label: { show: false },
          itemStyle: { borderRadius: 3, borderColor: bg, borderWidth: 1.5 },
        }],
      };
    }

    // ── SCATTER ───────────────────────────────────────────────────────────
    case "scatter-basic":
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { trigger: "item" }, grid,
        xAxis: { type: "value", ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: specialData.scatter.map((series, i) => ({
          name: series.name, type: "scatter",
          data: series.points.map(point => [point.x, point.y]),
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
        series: specialData.bubble.map((series, i) => ({
          name: series.name, type: "scatter",
          data: series.points.map(point => [point.x, point.y, point.size]),
          symbolSize: (d: number[]) => d[2],
          itemStyle: { color: palette[i % palette.length], opacity: 0.7 },
        })),
      };

    case "scatter-distribution": {
      const distributionSeries = specialData.scatter.length ? specialData.scatter : createDefaultScatterSeries();
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Height vs Weight", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "item", formatter: (p: any) => `Height: ${p.data[0]}cm<br/>Weight: ${p.data[1]}kg` }, grid: gridFull,
        xAxis: { type: "value", name: "Height (cm)", nameTextStyle: { color: fg, fontFamily: "Inter" }, scale: true, ...axisTick },
        yAxis: { type: "value", name: "Weight (kg)", nameTextStyle: { color: fg, fontFamily: "Inter" }, ...axisTick },
        series: distributionSeries.map((series, index) => ({
          name: series.name,
          type: "scatter" as const,
          data: series.points.map(point => [point.x, point.y]),
          symbolSize: 8,
          itemStyle: { color: palette[index % palette.length], opacity: 0.7 },
        })),
        legend,
      };
    }

    case "scatter-single": {
      const singleCells = specialData.singleAxisScatter.length ? specialData.singleAxisScatter : createDefaultSingleAxisScatter();
      const hours = [...new Set(singleCells.map(cell => cell.x))];
      const days = [...new Set(singleCells.map(cell => cell.y))];
      const hourIndex = new Map(hours.map((hour, index) => [hour, index]));
      const chartTop = title ? 12 : 2;
      const chartHeight = title ? 84 : 96;
      const axisLeft = isSmall ? 72 : 126;
      const dayTitles = days.map((day, index) => ({
        text: day,
        left: isSmall ? 4 : 12,
        top: `${chartTop + ((index + 0.5) * chartHeight) / Math.max(1, days.length)}%`,
        textBaseline: "middle",
        textStyle: { color: fg, fontFamily: "Inter", fontSize: isSmall ? 9 : 11, fontWeight: 500 },
      }));
      const singleAxes = days.map((_, index) => ({
        left: axisLeft,
        right: isSmall ? 6 : 18,
        type: "category" as const,
        boundaryGap: false,
        data: hours,
        top: `${chartTop + (index * chartHeight) / Math.max(1, days.length) + 1}%`,
        height: `${chartHeight / Math.max(1, days.length) - 2}%`,
        axisLabel: {
          interval: isSmall ? 5 : 2,
          color: fg,
          fontFamily: "Inter",
          fontSize: isSmall ? 8 : 10,
          hideOverlap: true,
        },
        axisLine: { lineStyle: { color: axisC } },
        axisTick: { show: false },
        splitLine: { show: false },
      }));
      const singleSeries = days.map((day, index) => ({
        name: day,
        singleAxisIndex: index,
        coordinateSystem: "singleAxis" as const,
        type: "scatter" as const,
        data: singleCells
          .filter(cell => cell.y === day)
          .map(cell => [hourIndex.get(cell.x) ?? 0, cell.value]),
        symbolSize: (dataItem: number[]) => Math.max(2, dataItem[1] * (isSmall ? 2.4 : 4)),
        itemStyle: { color: palette[index % palette.length], opacity: 0.78 },
      }));
      return {
        backgroundColor: bg,
        color: palette,
        title: [...(titleCfg ? [titleCfg] : []), ...dayTitles],
        tooltip: {
          position: "top",
          formatter: (params: any) => `${params.seriesName}<br/>${hours[params.value[0]]}: ${params.value[1]}`,
        },
        singleAxis: singleAxes,
        series: singleSeries,
        legend: { show: false },
      };
    }

    case "scatter-jitter": {
      // category-axis `jitter` (ECharts 6.0+) spreads overlapping points sideways within
      // their category band instead of letting them stack on the exact same x position.
      const jitterCells = specialData.jitterScatter.length ? specialData.jitterScatter : createDefaultJitterScatter();
      const days = [...new Set(jitterCells.map(cell => cell.x))];
      const dayIndex = new Map(days.map((day, index) => [day, index]));
      const data = jitterCells.map(cell => [dayIndex.get(cell.x) ?? 0, cell.value]);
      const jitterValues = jitterCells.map(cell => cell.value);
      const jitterMin = Math.min(0, ...jitterValues);
      const jitterMax = Math.max(1, ...jitterValues);
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Scatter with Jittering", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { trigger: "item" },
        grid: gridFull,
        xAxis: { type: "category", data: days, jitter: isSmall ? 12 : 24, ...axisTick },
        yAxis: { type: "value", min: jitterMin, max: jitterMax, ...axisTick },
        series: [{ name: "Sample", type: "scatter", data, colorBy: "data", symbolSize: 6, itemStyle: { opacity: 0.45 } }],
        legend: { show: false },
      };
    }

    // ── CANDLESTICK ───────────────────────────────────────────────────────
    case "candle-basic":
    case "candle-large": {
      const ohlc = chartId === "candle-large" ? specialData.candleLarge : specialData.candleBasic;
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        grid: { ...gridFull, bottom: 60 },
        xAxis: { type: "category", data: ohlc.map(d => d.date), ...axisTick, min: "dataMin", max: "dataMax" },
        yAxis: { type: "value", scale: true, ...axisTick },
        dataZoom: [{ type: "inside", start: 70, end: 100 }, { type: "slider", bottom: 16, height: 20 }],
        series: [{
          type: "candlestick",
          data: ohlc.map(d => [d.open, d.close, Math.min(d.low, d.open, d.close), Math.max(d.high, d.open, d.close)]),
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
        radar: { center: [seriesChartCenterX, "52%"], radius: isSmall ? "56%" : seriesRadialRadius, indicator: userLabels.map(l => ({ name: l, max: maxV })), axisName: { color: fg, fontFamily: "Inter", fontSize: 11 }, splitLine: { lineStyle: { color: axisC } }, splitArea: { areaStyle: { color: ["transparent"] } }, axisLine: { lineStyle: { color: axisC } } },
        series: [{ type: "radar", data: datasets.map((ds, i) => ({ name: ds.name, value: ds.data, itemStyle: { color: palette[i % palette.length] }, areaStyle: { opacity: 0.2 }, lineStyle: { width: 2 } })) }],
      };
    }

    case "radar-browsers": {
      const maxShare = Math.max(1, ...datasets.flatMap(dataset => dataset.data)) * 1.1;
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "Browser Market Share", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        radar: { center: [seriesChartCenterX, "52%"], radius: isSmall ? "56%" : seriesRadialRadius, indicator: userLabels.map(label => ({ name: label, max: maxShare })), axisName: { color: fg, fontFamily: "Inter", fontSize: 11 }, splitLine: { lineStyle: { color: axisC } }, splitArea: { areaStyle: { color: ["transparent"] } } },
        series: [{ type: "radar", data: datasets.map((dataset, index) => ({ name: dataset.name, value: dataset.data, itemStyle: { color: palette[index % palette.length] }, areaStyle: { opacity: 0.25 }, lineStyle: { width: 2.5 } })) }],
        legend,
      };
    }

    case "radar-aqi": {
      // Each city's series holds many daily readings (one radar polygon per day) instead
      // of a single shape — the overlapping translucent polygons show a month's variation
      // at a glance, matching the official "AQI - Radar" technique.
      const indicatorMax = userLabels.map((_, indicatorIndex) =>
        Math.max(1, ...datasets.map(dataset => dataset.data[indicatorIndex] ?? 0)) * 1.15
      );
      const cities = datasets.map(dataset => dataset.name);
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: "AQI by City", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: {},
        legend: { ...legendAxisSafe, data: cities, selectedMode: "single" },
        radar: {
          center: ["50%", "48%"], radius: isSmall ? "54%" : seriesRadialRadius,
          indicator: userLabels.map((name, index) => ({ name, max: indicatorMax[index] })), shape: "circle", splitNumber: 5,
          axisName: { color: fg, fontFamily: "Inter", fontSize: 11 },
          splitLine: { lineStyle: { color: axisC } }, splitArea: { show: false }, axisLine: { lineStyle: { color: axisC } },
        },
        series: datasets.map((dataset, i) => ({
          name: dataset.name, type: "radar" as const, symbol: "none",
          lineStyle: { width: 1, opacity: 0.5, color: palette[i % palette.length] },
          itemStyle: { color: palette[i % palette.length] },
          areaStyle: { opacity: 0.06 },
          data: [{ name: dataset.name, value: dataset.data }],
        })),
      };
    }

    // ── HEATMAP ───────────────────────────────────────────────────────────
    case "heat-cartesian": {
      const heatCells = specialData.cartesianHeatmap.length ? specialData.cartesianHeatmap : createDefaultCartesianHeatmap();
      const hrs = [...new Set(heatCells.map(cell => cell.x))];
      const days2 = [...new Set(heatCells.map(cell => cell.y))];
      const xIndex = new Map(hrs.map((label, index) => [label, index]));
      const yIndex = new Map(days2.map((label, index) => [label, index]));
      const hData = heatCells.map(cell => [xIndex.get(cell.x) ?? 0, yIndex.get(cell.y) ?? 0, cell.value]);
      const heatMin = Math.min(...heatCells.map(cell => cell.value));
      const heatMax = Math.max(...heatCells.map(cell => cell.value));
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { position: "top" },
        grid: { ...gridFull, left: 60, bottom: 40 },
        xAxis: { type: "category", data: hrs, splitArea: { show: true }, ...axisTick },
        yAxis: { type: "category", data: days2, splitArea: { show: true }, ...axisTick },
        visualMap: { min: heatMin, max: heatMax === heatMin ? heatMin + 1 : heatMax, calculable: true, orient: "horizontal", left: "center", bottom: 0, inRange: { color: [palette[0] + "20", palette[0]] }, textStyle: { color: fg } },
        series: [{ type: "heatmap", data: hData, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } } }],
        legend: { show: false },
      };
    }

    case "heat-calendar": {
      const calendarPoints = specialData.calendarHeatmap.length ? specialData.calendarHeatmap : createDefaultCalendarHeatmap();
      const calData: [string, number][] = calendarPoints.map(point => [point.date, point.value]);
      const calendarMin = Math.min(...calendarPoints.map(point => point.value));
      const calendarMax = Math.max(...calendarPoints.map(point => point.value));
      const calendarRange = [calendarPoints[0].date, calendarPoints[calendarPoints.length - 1].date];
      const year = calendarPoints[0].date.slice(0, 4);
      return {
        backgroundColor: bg, color: palette, title: titleCfg || { text: `Activity ${year}`, left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz } },
        tooltip: { formatter: (p: any) => `${p.data[0]}: ${p.data[1]}` },
        visualMap: { show: true, min: calendarMin, max: calendarMax === calendarMin ? calendarMin + 1 : calendarMax, calculable: true, orient: "horizontal", left: "center", bottom: 16, inRange: { color: [palette[0] + "20", palette[0]] }, textStyle: { color: fg } },
        calendar: { top: title ? 64 : 48, left: 32, right: 16, cellSize: ["auto", 14], range: calendarRange, itemStyle: { borderWidth: 1, borderColor: bg }, yearLabel: { show: false }, monthLabel: { color: fg, fontFamily: "Inter", fontSize: 11 }, dayLabel: { color: fg, fontFamily: "Inter", fontSize: 10 } },
        series: [{ type: "heatmap", coordinateSystem: "calendar", data: calData }],
        legend: { show: false },
      };
    }

    case "heat-large": {
      // ~10,000 cells generated from a few summed sine waves (a cheap stand-in for the
      // official example's Perlin noise) so the field reads as organic blobs rather than
      // pure static, while staying within this app's plain rand()-based generator style.
      const W = Math.max(10, Math.min(200, Math.round(specialData.generator.heatWidth)));
      const H = Math.max(10, Math.min(200, Math.round(specialData.generator.heatHeight)));
      const heatRand = createSeededRand(`heat-large-${specialData.generator.seed}`).rand;
      const hlData: number[][] = [];
      for (let i = 0; i <= W; i++) {
        for (let j = 0; j <= H; j++) {
          const v = Math.sin(i / 14) * Math.cos(j / 11) + Math.sin(i / 7 + j / 9) * 0.4 + heatRand(-8, 8) / 100;
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
          inRange: {
            color: [
              palette[2 % palette.length],
              palette[0],
              theme === "dark" ? "#26263f" : "#f8fafc",
              palette[1 % palette.length],
              palette[3 % palette.length],
            ],
          },
        },
        series: [{ name: "Field", type: "heatmap", data: hlData, progressive: 1000, animation: false }],
        legend: { show: false },
      };
    }

    // ── MATRIX ────────────────────────────────────────────────────────────
    case "matrix-covariance": {
      // Symmetric correlation matrix (diagonal = 1) rendered on ECharts 6's `matrix`
      // coordinate system — a heatmap series plotted against matrix row/col headers
      // instead of a category cartesian grid.
      const matrixCells = specialData.covarianceMatrix.length ? specialData.covarianceMatrix : createDefaultCovarianceMatrix();
      const xVars = [...new Set(matrixCells.map(cell => cell.x))];
      const yVars = [...new Set(matrixCells.map(cell => cell.y))];
      const xVarIndex = new Map(xVars.map((label, index) => [label, index]));
      const yVarIndex = new Map(yVars.map((label, index) => [label, index]));
      const cellData: [number, number, number][] = matrixCells.map(cell => [xVarIndex.get(cell.x) ?? 0, yVarIndex.get(cell.y) ?? 0, cell.value]);
      const headerFontSz = isSmall ? 8 : 10;
      return {
        backgroundColor: bg,
        title: titleCfg || { text: "Covariance Matrix", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        tooltip: { formatter: (p: any) => `${xVars[p.value[0]]} × ${yVars[p.value[1]]}: ${p.value[2]}` },
        visualMap: {
          min: -1, max: 1, calculable: true, orient: "horizontal", left: "center", bottom: 4,
          inRange: { color: [palette[2 % palette.length], bg, palette[0]] },
          textStyle: { color: fg, fontFamily: "Inter", fontSize: 11 },
        },
        matrix: {
          top: title ? 56 : 36, left: isSmall ? 56 : 76, right: isSmall ? 8 : 16, bottom: 40,
          x: { data: xVars, label: { color: fg, fontFamily: "Inter", fontSize: headerFontSz } },
          y: { data: yVars, label: { color: fg, fontFamily: "Inter", fontSize: headerFontSz } },
          body: { itemStyle: { borderColor: axisC, borderWidth: 1 } },
        } as any,
        series: [{
          type: "heatmap", coordinateSystem: "matrix" as any,
          data: cellData,
          label: { show: !isSmall, color: fg, fontFamily: "Inter", fontSize: 9, formatter: (p: any) => Number(p.value[2]).toFixed(2) },
          itemStyle: { borderColor: bg, borderWidth: 1 },
        } as any],
        legend: { show: false },
      } as any;
    }

    // ── GEO / MAP ─────────────────────────────────────────────────────────
    case "map-usa-population": {
      // Choropleth over the `USA` map registered by loadUSAMap() (App gates rendering
      // until that registration resolves). Synthetic per-state values (not real 2012
      // census figures) generated with the chart's seeded rand, matching this app's
      // established pattern for static-demo charts.
      const mapData = specialData.geoRegions.map(region => ({ name: region.name, value: region.value }));
      const mapMax = Math.max(1, ...specialData.geoRegions.map(region => region.value));
      return {
        backgroundColor: bg,
        title: titleCfg || { text: "USA Population", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        tooltip: { trigger: "item", formatter: (p: any) => `${p.name}: ${p.value ?? "—"}` },
        visualMap: {
          min: 0, max: mapMax, left: 12, top: title ? topPad + 8 : 12, bottom: 12, calculable: !isSmall,
          itemWidth: isSmall ? 8 : 14, itemHeight: isSmall ? 60 : 120,
          inRange: { color: ["#e0e7ff", palette[0] ?? "#6366f1"] },
          textStyle: { color: fg, fontFamily: "Inter", fontSize: isSmall ? 9 : 11 },
        },
        series: [{
          type: "map", map: "USA", roam: true,
          data: mapData,
          label: { show: false },
          emphasis: { label: { show: true, color: fg, fontFamily: "Inter", fontSize: 10 }, itemStyle: { areaColor: palette[3] ?? "#f59e0b" } },
          itemStyle: { borderColor: axisC, borderWidth: 0.5 },
        } as any],
        legend: { show: false },
      } as any;
    }

    case "geo-graph": {
      // Official example ("Travel Routes") plots a graph series in real lon/lat over a
      // `geo` component (map: 'ch', Switzerland). Reinterpreted here over the already
      // -registered `USA` map so it shares loadUSAMap() with map-usa-population instead
      // of needing a second GeoJSON asset — a cross-country road-trip route between real
      // US city coordinates.
      const cities = specialData.geoRoute.length ? specialData.geoRoute : createDefaultGeoRoute();
      const nodes = cities.map(city => ({ name: city.name, value: [city.longitude, city.latitude], symbolSize: isSmall ? 6 : 9 }));
      const edges = cities.slice(0, -1).map((city, i) => ({ source: city.name, target: cities[i + 1].name }));
      if (cities.length > 2) edges.push({ source: cities[cities.length - 1].name, target: cities[0].name });
      return {
        backgroundColor: bg,
        title: titleCfg || { text: "Geo Graph", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        tooltip: {},
        geo: {
          map: "USA", roam: true,
          itemStyle: { areaColor: theme === "dark" ? "#2a2a45" : "#f3f4f6", borderColor: axisC },
          label: { show: false },
        } as any,
        series: [{
          type: "graph", coordinateSystem: "geo",
          data: nodes,
          edges,
          edgeSymbol: ["none", "arrow"], edgeSymbolSize: isSmall ? 4 : 6,
          itemStyle: { color: palette[0] ?? "#6366f1" },
          lineStyle: { color: palette[0] ?? "#6366f1", opacity: 0.75, curveness: 0.15 },
          label: { show: !isSmall, position: "right", color: fg, fontFamily: "Inter", fontSize: 10, formatter: "{b}" },
        } as any],
        legend: { show: false },
      } as any;
    }

    case "matrix-mini-bar-geo": {
      // Official example ("Mini Bars and Geo in Matrix") highlights Swiss cantons in a
      // per-row mini geo cell; reinterpreted over the shared `USA` map instead of a second
      // GeoJSON asset. Each row = one US state, with per-metric mini bar-chart cells (this
      // year vs. last year, laid out via grid/xAxis/yAxis with coordinateSystem:'matrix')
      // and a mini geo cell highlighting that state. `matrix`+per-cell `grid`/`geo` with
      // coord:[col,row] is an ECharts 6.0 feature — types only expose matrixIndex/matrixId,
      // but the runtime API matches the official example (confirmed via echarts 6.1.0 docs).
      const regionRows = specialData.geoRegions.slice(0, 8);
      const regions = regionRows.map(region => region.name);
      const metrics = ["Revenue", "Growth"];
      const years = ["2024", "2023"];
      const colHeaders = ["State", ...metrics, "Location"];
      const regionColIdx = 0;
      const geoColIdx = colHeaders.length - 1;
      const barColors = [palette[0] ?? "#6366f1", palette[1] ?? "#f59e0b"];

      const dataByYear: Record<string, number[][]> = {
        "2024": [regionRows.map(region => region.value), regionRows.map(region => region.secondary)],
        "2023": [regionRows.map(region => Math.round(region.value * 0.82)), regionRows.map(region => Math.round(region.secondary * 0.88))],
      };

      const matrixBody: any[] = regions.map((name, r) => ({ value: name, coord: [regionColIdx, r] }));
      const gridArr: any[] = [], xAxisArr: any[] = [], yAxisArr: any[] = [], seriesArr: any[] = [];

      metrics.forEach((_, mi) => {
        const colIdx = 1 + mi;
        const maxVal = Math.max(...years.flatMap(y => dataByYear[y][mi]));
        regions.forEach((_r, r) => {
          const id = `mini-bar-${colIdx}-${r}`;
          gridArr.push({ id, coordinateSystem: "matrix", coord: [colIdx, r], top: "20%", bottom: "20%" });
          xAxisArr.push({ id, gridId: id, type: "value", min: 0, max: maxVal, scale: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false } });
          yAxisArr.push({ id, gridId: id, type: "category", boundaryGap: false, inverse: true, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false } });
          years.forEach((y, yi) => {
            seriesArr.push({
              type: "bar", name: y, xAxisId: id, yAxisId: id,
              barMinHeight: 2, barGap: "40%", barWidth: "35%",
              itemStyle: { color: barColors[yi % barColors.length] },
              label: !isSmall ? { show: true, fontSize: 8, color: fg, position: "insideLeft" } : { show: false },
              data: [[dataByYear[y][mi][r], ""]],
            });
          });
        });
      });

      const geoArr: any[] = regions.map((name, r) => ({
        id: `mini-geo-${r}`, map: "USA", animation: false,
        coordinateSystem: "matrix", coord: [geoColIdx, r],
        roam: false, selectedMode: false, tooltip: { show: false },
        itemStyle: { areaColor: theme === "dark" ? "#2a2a45" : "#e5e7eb", borderColor: axisC },
        regions: [{ name, itemStyle: { areaColor: palette[0] ?? "#6366f1" } }],
      }));

      return {
        backgroundColor: bg,
        title: titleCfg || { text: "Mini Bars and Geo in Matrix", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        tooltip: {},
        legend: { data: years, top: title ? topPad - 8 : 8, right: 12, textStyle: { color: fg, fontFamily: "Inter", fontSize: isSmall ? 10 : 12 } },
        matrix: {
          top: title ? topPad + 16 : 36, left: isSmall ? 4 : 12, right: isSmall ? 4 : 12, bottom: 12,
          x: {
            levelSize: isSmall ? 20 : 28,
            data: colHeaders.map((h, i) => ({ value: h, size: i === geoColIdx ? "20%" : i === regionColIdx ? (isSmall ? 64 : 96) : undefined })),
            itemStyle: { color: theme === "dark" ? "#26263f" : "#f0f4ff" },
            label: { color: fg, fontFamily: "Inter", fontSize: isSmall ? 9 : 11, fontWeight: "bold" },
          },
          y: { data: regions.map(() => "_"), show: false },
          body: { data: matrixBody, itemStyle: { borderColor: axisC, borderWidth: 1 }, label: { color: fg, fontFamily: "Inter", fontSize: isSmall ? 9 : 11 } },
        } as any,
        grid: gridArr, xAxis: xAxisArr, yAxis: yAxisArr, geo: geoArr, series: seriesArr,
      } as any;
    }

    case "lines-ny": {
      // Official example streams ~1M real NYC street segments from 32 binary chunk files
      // fetched over XHR. Reinterpreted as a self-contained rendering-technique demo (no
      // external asset, no geo map) — a synthetic street-grid of 2-point `lines` series
      // entries, deterministic per the chart's seeded rand so the "randomness" (jitter) is
      // stable across renders while segment count stays exact (no probabilistic skipping).
      const gridN = Math.max(10, Math.min(180, Math.round(specialData.generator.lineGrid)));
      const span = Math.max(100, Math.min(10000, Math.round(specialData.generator.lineSpan)));
      const lineRand = createSeededRand(`lines-ny-${specialData.generator.seed}`).rand;
      const step = span / gridN;
      const jitter = () => (lineRand(-30, 30) / 100) * step;
      const lineData: { coords: [number, number][] }[] = [];
      const insideStreetShape = (x: number, y: number) => {
        const normalizedY = Math.max(0, Math.min(1, y / span));
        const normalizedX = x / span;
        const center = 0.5 + Math.sin(normalizedY * Math.PI * 1.35) * 0.055;
        const halfWidth = 0.055 + Math.sin(Math.PI * Math.pow(normalizedY, 0.85)) * 0.19;
        return Math.abs(normalizedX - center) <= halfWidth;
      };
      for (let r = 0; r <= gridN; r++) {
        const y = r * step + jitter();
        for (let cSeg = 0; cSeg < gridN; cSeg++) {
          const x1 = cSeg * step;
          const x2 = (cSeg + 1) * step;
          if (insideStreetShape((x1 + x2) / 2, y)) {
            lineData.push({ coords: [[x1, y], [x2, y + jitter()]] });
          }
        }
      }
      for (let cIdx = 0; cIdx <= gridN; cIdx++) {
        const x = cIdx * step + jitter();
        for (let rSeg = 0; rSeg < gridN; rSeg++) {
          const y1 = rSeg * step;
          const y2 = (rSeg + 1) * step;
          if (insideStreetShape(x, (y1 + y2) / 2)) {
            lineData.push({ coords: [[x, y1], [x + jitter(), y2]] });
          }
        }
      }
      for (let index = 0; index < gridN * 2; index++) {
        const y1 = (index / (gridN * 2)) * span;
        const y2 = ((index + 1) / (gridN * 2)) * span;
        const x1 = span * (0.34 + 0.28 * (y1 / span) + Math.sin(y1 / span * Math.PI * 2) * 0.025);
        const x2 = span * (0.34 + 0.28 * (y2 / span) + Math.sin(y2 / span * Math.PI * 2) * 0.025);
        if (insideStreetShape(x1, y1) || insideStreetShape(x2, y2)) lineData.push({ coords: [[x1, y1], [x2, y2]] });
      }
      const nyTitle = titleCfg
        ? { ...titleCfg, textStyle: { ...(titleCfg.textStyle as object), color: "#fff" } }
        : { text: "New York Streets — Large Lines", left: "center", top: 8, textStyle: { color: "#fff", fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } };
      return {
        backgroundColor: "#111",
        title: nyTitle,
        tooltip: { show: false },
        xAxis: { type: "value", min: 0, max: span, show: false },
        yAxis: { type: "value", min: 0, max: span, show: false, inverse: true },
        grid: { left: 4, right: 4, top: title ? topPad : 8, bottom: 4 },
        series: [{
          type: "lines", coordinateSystem: "cartesian2d",
          xAxisIndex: 0, yAxisIndex: 0,
          polyline: false,
          // progressive:0 disables ECharts' default chunked-over-frames rendering for
          // series above ~3000 points — without a running animation loop (animation:false
          // below) nothing ever ticks the later chunks, so only the first ~3000 lines were
          // drawn and the rest of the canvas stayed blank.
          progressive: 0,
          large: true,
          largeThreshold: 2000,
          silent: true,
          animation: false,
          blendMode: "lighter",
          lineStyle: { color: palette[0] ?? "#6366f1", width: 0.55, opacity: 0.42 },
          data: lineData,
        } as any],
        legend: { show: false },
      } as any;
    }

    // ── GAUGE ─────────────────────────────────────────────────────────────
    case "gauge-simple": {
      const val = datasets[0]?.data[0] ?? 50;
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { formatter: "{a} <br/>{b} : {c}%" },
        series: [{
          name: "Pressure",
          type: "gauge",
          progress: { show: true },
          itemStyle: { color: palette[0] },
          axisLabel: { color: fg, fontSize: isSmall ? 9 : 11, fontFamily: "Inter" },
          title: { color: fg, fontSize: isSmall ? 11 : 14, fontFamily: "Inter" },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
            color: fg,
            fontSize: isSmall ? 20 : 28,
            fontFamily: "Inter",
          },
          data: [{ value: val, name: "SCORE" }],
        }],
        legend: { show: false },
      };
    }

    case "gauge-speed": {
      const val = Math.max(0, Math.min(100, datasets[0]?.data[0] ?? 70));
      const gaugeWidth = isSmall ? 18 : isMid ? 24 : 30;
      const gaugeColors: [number, string][] = [
        [0.3, "#67e0e3"],
        [0.7, "#37a2da"],
        [1, "#fd666d"],
      ];
      return {
        backgroundColor: bg,
        color: palette,
        title: titleCfg,
        tooltip: { formatter: (params: any) => `${params.value} km/h` },
        series: [{
          type: "gauge",
          min: 0,
          max: 100,
          splitNumber: 10,
          center: ["50%", title ? "56%" : "52%"],
          radius: isSmall ? "68%" : isMid ? "72%" : "76%",
          axisLine: { lineStyle: { width: gaugeWidth, color: gaugeColors } },
          pointer: {
            length: "60%",
            width: isSmall ? 4 : 6,
            itemStyle: { color: "auto" },
          },
          axisTick: {
            distance: -gaugeWidth,
            length: isSmall ? 5 : 8,
            lineStyle: { color: "#fff", width: isSmall ? 1.5 : 2 },
          },
          splitLine: {
            distance: -gaugeWidth,
            length: gaugeWidth,
            lineStyle: { color: "#fff", width: isSmall ? 2 : 4 },
          },
          axisLabel: {
            color: "inherit",
            distance: isSmall ? 24 : isMid ? 32 : 40,
            fontSize: isSmall ? 10 : isMid ? 14 : 20,
            fontFamily: "Inter",
          },
          title: { show: false },
          detail: {
            valueAnimation: true,
            formatter: "{value} km/h",
            color: "inherit",
            fontSize: isSmall ? 16 : isMid ? 22 : 28,
            fontWeight: 600,
            fontFamily: "Inter",
            offsetCenter: [0, "40%"],
          },
          data: [{ value: val }],
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
      const hierarchyRoots = hierarchyRowsToTree(specialData.hierarchy);
      const treeData = hierarchyRoots.length === 1 ? hierarchyRoots[0] : { name: "Root", children: hierarchyRoots };
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
      const gradientRoots = hierarchyRowsToGradientTree(specialData.hierarchy);
      const gradientData = gradientRoots.length === 1 && gradientRoots[0].children?.length
        ? gradientRoots[0].children
        : gradientRoots;
      const gradientColors = [
        palette[2 % palette.length] ?? "#269f3c",
        palette[0] ?? "#6366f1",
        palette[1 % palette.length] ?? "#942e38",
      ];
      return {
        backgroundColor: bg,
        title: titleCfg || { text: "Gradient Mapping", left: "center", top: 8, textStyle: { color: fg, fontFamily: "Inter", fontSize: titleSz, fontWeight: "bold" } },
        tooltip: {
          formatter: (params: any) => {
            const value = Array.isArray(params.value) ? params.value : [params.value, 0];
            return `${params.name}<br/>Size: ${value[0]}<br/>Gradient: ${Number(value[1] ?? 0).toFixed(1)}`;
          },
        },
        series: [{
          type: "treemap",
          data: gradientData,
          visualDimension: 1,
          visualMin: -100,
          visualMax: 100,
          visualMinBound: -40,
          visualMaxBound: 40,
          color: gradientColors,
          colorMappingBy: "value",
          width: "96%",
          height: title ? "76%" : "84%",
          top: title ? 58 : 18,
          left: "2%",
          label: {
            show: true,
            color: "#fff",
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: "bold",
            formatter: "{b}",
            textShadowColor: "rgba(0,0,0,.35)",
            textShadowBlur: 3,
          },
          upperLabel: {
            show: false,
          },
          itemStyle: { borderColor: bg, borderWidth: 1, gapWidth: 1 },
          levels: [
            { itemStyle: { borderColor: bg, borderWidth: 0, gapWidth: 5 } },
            {
              color: gradientColors,
              colorMappingBy: "value",
              upperLabel: { show: true, height: 24, color: "#fff", fontFamily: "Inter", fontSize: 11, fontWeight: "bold" },
              itemStyle: { borderColor: bg, borderWidth: 2, gapWidth: 3 },
            },
            {
              color: gradientColors,
              colorMappingBy: "value",
              colorSaturation: [0.35, 0.65],
              itemStyle: { borderColor: bg, borderWidth: 1, gapWidth: 1, borderColorSaturation: 0.6 },
            },
          ],
          breadcrumb: {
            show: true,
            bottom: 4,
            height: 20,
            itemStyle: { color: theme === "dark" ? "#374151" : "#e5e7eb", borderColor: axisC },
            textStyle: { color: fg, fontFamily: "Inter", fontSize: 10 },
          },
          roam: false,
          nodeClick: "zoomToNode",
        }],
        legend: { show: false },
      };
    }

    case "treemap-sunburst": {
      const sunData = hierarchyRowsToTree(specialData.hierarchy);
      const colorHierarchy = (node: any, index: number): any => ({
        ...node,
        itemStyle: { color: palette[index % palette.length] },
        ...(node.children ? { children: node.children.map((child: any, childIndex: number) => colorHierarchy(child, index + childIndex + 1)) } : {}),
      });
      const coloredData = sunData.map((node, index) => colorHierarchy(node, index));
      return {
        backgroundColor: bg, color: palette, title: titleCfg, tooltip: { formatter: (p: any) => `${p.name}: ${p.value}` },
        series: [{ type: "sunburst", data: coloredData, radius: ["15%", "70%"], center: ["50%", "55%"], label: { color: "#fff", fontFamily: "Inter", fontSize: 11 }, itemStyle: { borderColor: bg, borderWidth: 2 }, levels: [{ r0: "15%", r: "30%" }, { r0: "32%", r: "68%", label: { rotate: "tangential" } }] }],
        legend: { show: false },
      };
    }

    case "sankey-basic": {
      const snNodes = specialData.sankeyNodes.map((node, index) => ({ name: node.name, itemStyle: { color: palette[index % palette.length] } }));
      const snLinks = specialData.sankeyLinks.map(link => ({ source: link.source, target: link.target, value: link.value }));
      const snLabelPad = (chars: number, fs = 12) => Math.ceil(chars * fs * 0.7) + 16;
      const snMaxChars = Math.max(1, ...specialData.sankeyNodes.map(node => node.name.length));
      return {
        backgroundColor: bg, title: titleCfg, tooltip: { trigger: "item", triggerOn: "mousemove" },
        series: [{ type: "sankey", data: snNodes, links: snLinks, left: snLabelPad(snMaxChars), right: snLabelPad(snMaxChars), top: title ? 52 : 20, bottom: 20, nodeWidth: 16, nodeGap: 12, emphasis: { focus: "adjacency" }, lineStyle: { color: "gradient", opacity: 0.4 }, label: { color: fg, fontFamily: "Inter", fontSize: 12 } }],
        legend: { show: false },
      };
    }

    case "sankey-gradient": {
      const sgNodes = specialData.sankeyNodes.map((node, index) => ({ name: node.name, itemStyle: { color: palette[index % palette.length] } }));
      const sgLinks = specialData.sankeyLinks.map(link => ({ source: link.source, target: link.target, value: link.value }));
      const sgLabelPad = (names: string[], fs = 11) => Math.ceil(Math.max(...names.map(n => n.length)) * fs * 0.7) + 16;
      const sgLeft = sgLabelPad(specialData.sankeyNodes.map(node => node.name));
      const sgRight = sgLeft;
      return {
        backgroundColor: bg, title: titleCfg, tooltip: { trigger: "item" },
        series: [{ type: "sankey", data: sgNodes, links: sgLinks, left: sgLeft, right: sgRight, top: title ? 52 : 24, bottom: 16, nodeWidth: 18, nodeGap: 10, label: { color: fg, fontFamily: "Inter", fontSize: 11 }, lineStyle: { color: "gradient", opacity: 0.5 }, emphasis: { focus: "adjacency" } }],
        legend: { show: false },
      };
    }

    case "funnel-basic": {
      const v = userVals(0);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend: categoryLegend, tooltip: { trigger: "item" },
        series: [{
          type: "funnel", left: "8%", right: legendBottom ? "8%" : categoryLegendRightSpace, top: title ? 52 : 20, bottom: categoryLegendBottomSpace,
          minSize: "0%", maxSize: "100%", sort: "descending", gap: 2,
          data: userLabels.map((l, i) => ({ name: l, value: v[i] ?? 0, itemStyle: { color: palette[i % palette.length] } })),
          label: { show: true, position: "inside", color: "#fff", fontFamily: "Inter", fontSize: 12, fontWeight: "bold" },
        }],
      };
    }

    case "graph-les-mis": {
      const categoryNames = [...new Set(specialData.graphNodes.map(node => node.category || "Default"))];
      const categories = categoryNames.map(name => ({ name }));
      const styledNodes = specialData.graphNodes.map((node, index) => ({
        id: node.name, name: node.name, category: Math.max(0, categoryNames.indexOf(node.category || "Default")),
        symbolSize: index < 3 ? 34 : 16, value: index < 3 ? 8 : 2, label: { show: index < 3 },
      }));
      const links = specialData.graphLinks.map(link => ({ source: link.source, target: link.target, value: link.value }));
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
      const categoryNames = [...new Set(specialData.graphNodes.map(node => node.category || "Default"))];
      const categories = categoryNames.map(name => ({ name }));
      const nodes = specialData.graphNodes.map((node, index) => ({
        id: node.name, name: node.name, category: Math.max(0, categoryNames.indexOf(node.category || "Default")),
        symbolSize: index < 3 ? 32 : 14, value: index < 3 ? 8 : 2,
      }));
      const links = specialData.graphLinks.map(link => ({ source: link.source, target: link.target, value: link.value }));
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
      const categoryNames = [...new Set(specialData.graphNodes.map(node => node.category || "Default"))];
      const categories = categoryNames.map(name => ({ name }));
      const nodes = specialData.graphNodes.map((node, index) => ({
        id: node.name, name: node.name, category: Math.max(0, categoryNames.indexOf(node.category || "Default")),
        symbolSize: index < 3 ? 32 : 14, value: index < 3 ? 8 : 2,
      }));
      const links = specialData.graphLinks.map(link => ({ source: link.source, target: link.target, value: link.value }));
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
    "area-pieces": <><path d="M3 17l4-9 4 4 4-7 6 8v7H3z" fill={c} opacity="0.18" /><path d="M7 8l4 4v8H7zM15 5l4 5v10h-4z" fill={c} opacity="0.5" /><path d="M3 17l4-9 4 4 4-7 6 8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M7 4v17M11 4v17M15 4v17M19 4v17" stroke={c} strokeWidth="0.8" opacity="0.35" /></>,
    "line-bump": <><path d="M4 5c4 3 4 9 16 14" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M20 5c-4 3-4 9-16 14" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55" /></>,
    "line-confidence": <><path d="M3 14c5-8 13-8 18 0" stroke={c} strokeWidth="6" strokeLinecap="round" opacity="0.22" fill="none" /><path d="M3 14c5-8 13-8 18 0" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "line-step": <path d="M3 18h4v-4h4v-3h4v-5h4v3h2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    "line-area-time": <><path d="M3 15c3-6 6-6 9-2s6-4 9 1v6H3z" fill={c} opacity="0.3" /><path d="M3 15c3-6 6-6 9-2s6-4 9 1" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
    "line-multiple-x": <><path d="M3 4h18M3 20h18" stroke={c} strokeWidth="1.4" opacity="0.5" /><path d="M3 15l4-7 4 5 4-8 4 6" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
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
    "pie-browser-proportion": <polygon points="12,3 17.2,9 18.9,16 12,17 5.9,15.5 6.8,9" fill={c} opacity="0.55" stroke={c} strokeWidth="1.2" strokeLinejoin="round" />,
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
    // ── MATRIX ──
    "matrix-covariance": <>
      <rect x="3" y="3" width="18" height="18" rx="1" stroke={c} strokeWidth="1.2" opacity="0.4" fill="none" />
      <line x1="3" y1="8" x2="21" y2="8" stroke={c} strokeWidth="1" opacity="0.3" /><line x1="3" y1="13" x2="21" y2="13" stroke={c} strokeWidth="1" opacity="0.3" /><line x1="3" y1="18" x2="21" y2="18" stroke={c} strokeWidth="1" opacity="0.3" />
      <line x1="8" y1="3" x2="8" y2="21" stroke={c} strokeWidth="1" opacity="0.3" /><line x1="13" y1="3" x2="13" y2="21" stroke={c} strokeWidth="1" opacity="0.3" /><line x1="18" y1="3" x2="18" y2="21" stroke={c} strokeWidth="1" opacity="0.3" />
      <rect x="3" y="3" width="5" height="5" fill={c} opacity="1" /><rect x="8" y="8" width="5" height="5" fill={c} opacity="1" /><rect x="13" y="13" width="5" height="5" fill={c} opacity="1" /><rect x="18" y="18" width="3" height="3" fill={c} opacity="1" />
      <rect x="8" y="3" width="5" height="5" fill={c} opacity="0.4" /><rect x="13" y="3" width="5" height="5" fill={c} opacity="0.2" /><rect x="3" y="8" width="5" height="5" fill={c} opacity="0.4" />
    </>,
    // ── GEO / MAP ──
    "map-usa-population": <>
      <path d="M3 6l4-2 4 2 4-2 6 3v13l-6-3-4 2-4-2-4 2V6z" stroke={c} strokeWidth="1.2" fill="none" opacity="0.55" />
      <path d="M7 4v15M11 6v13" stroke={c} strokeWidth="0.9" opacity="0.3" />
      <circle cx="14" cy="11" r="1.6" fill={c} /><circle cx="9" cy="15" r="1.1" fill={c} opacity="0.7" /><circle cx="18" cy="9" r="1.1" fill={c} opacity="0.5" />
    </>,
    "geo-graph": <>
      <path d="M3 6l4-2 4 2 4-2 6 3v13l-6-3-4 2-4-2-4 2V6z" stroke={c} strokeWidth="1.2" fill="none" opacity="0.3" />
      <path d="M5 13l4-6 5 3 4-5 4 4" stroke={c} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="13" r="1.3" fill={c} /><circle cx="9" cy="7" r="1.3" fill={c} /><circle cx="14" cy="10" r="1.3" fill={c} /><circle cx="18" cy="5" r="1.3" fill={c} /><circle cx="22" cy="9" r="1.3" fill={c} opacity="0.7" />
    </>,
    "matrix-mini-bar-geo": <>
      <rect x="2" y="3" width="20" height="18" rx="1" stroke={c} strokeWidth="1.1" opacity="0.35" fill="none" />
      <line x1="2" y1="8" x2="22" y2="8" stroke={c} strokeWidth="0.9" opacity="0.3" />
      <line x1="9" y1="3" x2="9" y2="21" stroke={c} strokeWidth="0.9" opacity="0.3" /><line x1="15" y1="3" x2="15" y2="21" stroke={c} strokeWidth="0.9" opacity="0.3" />
      <rect x="10.5" y="10.5" width="3" height="2.5" fill={c} opacity="0.9" /><rect x="10.5" y="14" width="4.5" height="2.5" fill={c} opacity="0.6" />
      <circle cx="18" cy="14" r="3" stroke={c} strokeWidth="1" fill="none" opacity="0.6" /><circle cx="18" cy="14" r="1.1" fill={c} />
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
    "lines-ny": <>
      {[3, 8, 13, 18].map(y => <line key={"h" + y} x1="2" y1={y} x2="22" y2={y + (y % 2 ? 1 : -1) * 0.6} stroke={c} strokeWidth="0.8" opacity="0.55" />)}
      {[4, 9, 14, 19].map(x => <line key={"v" + x} x1={x} y1="2" x2={x + (x % 2 ? 1 : -1) * 0.6} y2="22" stroke={c} strokeWidth="0.8" opacity="0.55" />)}
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
  let nextXAxis = option.xAxis;
  let nextYAxis = option.yAxis;
  const seriesArr = Array.isArray(option.series) ? option.series : option.series ? [option.series] : [];
  const newSeries = seriesArr.map((s: any) => {
    if (Array.isArray(s.data) && s.data.length > SVG_POINT_LIMIT) {
      truncated = true;
      originalCount = Math.max(originalCount, s.data.length);

      // A heatmap is a 2D grid, so linear "every Nth point" sampling creates diagonal
      // stripes whenever the row length is not divisible by N. Sample both axes instead
      // and replace their category lists so the remaining cells still form a solid grid.
      if (
        s.type === "heatmap" &&
        !Array.isArray(option.xAxis) &&
        !Array.isArray(option.yAxis) &&
        Array.isArray((option.xAxis as any)?.data) &&
        Array.isArray((option.yAxis as any)?.data) &&
        s.data.every((point: unknown) => Array.isArray(point) && point.length >= 3)
      ) {
        const xData = (option.xAxis as any).data as unknown[];
        const yData = (option.yAxis as any).data as unknown[];
        const axisStep = Math.max(1, Math.ceil(Math.sqrt(s.data.length / SVG_POINT_LIMIT)));
        const sampledX = xData.filter((_: unknown, i: number) => i % axisStep === 0);
        const sampledY = yData.filter((_: unknown, i: number) => i % axisStep === 0);
        const xIndex = new Map(sampledX.map((value, i) => [String(value), i]));
        const yIndex = new Map(sampledY.map((value, i) => [String(value), i]));
        const sampledData = s.data
          .filter((point: unknown[]) =>
            xIndex.has(String(point[0])) && yIndex.has(String(point[1]))
          )
          // Numeric category coordinates are interpreted as ordinal indices by ECharts.
          // Remap the retained source coordinates to the compact sampled axes so every
          // row and column is filled instead of leaving alternating gaps.
          .map((point: unknown[]) => [
            xIndex.get(String(point[0])),
            yIndex.get(String(point[1])),
            ...point.slice(2),
          ]);

        nextXAxis = { ...(option.xAxis as any), data: sampledX };
        nextYAxis = { ...(option.yAxis as any), data: sampledY };
        return {
          ...s,
          data: sampledData,
          progressive: 0,
          animation: false,
        };
      }

      const step = Math.ceil(s.data.length / SVG_POINT_LIMIT);
      return {
        ...s,
        data: s.data.filter((_: unknown, i: number) => i % step === 0),
        progressive: 0,
        animation: false,
      };
    }
    return s;
  });
  return {
    option: truncated ? { ...option, xAxis: nextXAxis, yAxis: nextYAxis, series: newSeries } : option,
    truncated,
    originalCount,
  };
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
  const [datasets, setDatasets] = useState<Dataset[]>([
    { id: "1", name: "Dataset 1", data: [65, 59, 80, 81, 56, 72, 68], color: "#6366F1" },
    { id: "2", name: "Dataset 2", data: [40, 75, 55, 62, 88, 48, 77], color: "#f59e0b" },
  ]);
  const [specialData, setSpecialData] = useState<SpecialChartData>(() => createDefaultSpecialChartData());
  const [dataToolMode, setDataToolMode] = useState<"closed" | "csv" | "json">("closed");
  const [dataToolText, setDataToolText] = useState("");
  const [dataToolError, setDataToolError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [hexInput, setHexInput] = useState("#6366F1");
  const [palette, setPalette] = useState(() => generatePalette("#6366F1"));
  const [manualPalette, setManualPalette] = useState<string[]>([]);
  const [activePaletteIndex, setActivePaletteIndex] = useState<number | null>(null);
  const [paletteHexInput, setPaletteHexInput] = useState("");
  const [sizePreset, setSizePreset] = useState<SizePreset>("M");
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(500);
  const [autoResponsive, setAutoResponsive] = useState(true);
  const [smoothLine, setSmoothLine] = useState(true);
  const [chartTitle, setChartTitle] = useState("Monthly Revenue Growth 2024");
  const [editingTitle, setEditingTitle] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [mapStatus, setMapStatus] = useState<"idle" | "loading" | "ready" | "error">(
    echarts.getMap("USA") ? "ready" : MAP_CHART_IDS.has(chartType) ? "loading" : "idle"
  );
  const [mapRetryToken, setMapRetryToken] = useState(0);

  const echartsExportRef = useRef<echarts.ECharts | null>(null);
  const csvFileInputRef = useRef<HTMLInputElement | null>(null);
  const chartInputCacheRef = useRef<Record<string, CategoryChartInput>>({});

  const effectivePalette = palette.map((c, i) => manualPalette[i] || c);
  const activeChartPolicy = getChartPolicy(chartType);
  const isPaletteLocked = activeChartPolicy.colorPolicy === "official-fixed";
  const datasetLimit = FIRST_DATASET_ONLY_CHARTS.has(chartType) ? 1 : TWO_DATASET_CHARTS.has(chartType) ? 2 : Number.POSITIVE_INFINITY;
  const datasetMinimum = TWO_DATASET_CHARTS.has(chartType) ? 2 : 1;
  const editableDatasets = Number.isFinite(datasetLimit) ? datasets.slice(0, datasetLimit) : datasets;
  const canAddDataset = !Number.isFinite(datasetLimit) || datasets.length < datasetLimit;
  const chartDatasets = editableDatasets;
  const chartSize = sizePreset === "Custom" ? { w: customWidth, h: customHeight } : SIZE_PRESETS[sizePreset];

  useEffect(() => {
    setDatasets(prev => prev.map(ds => ({ ...ds, data: labels.map((_, i) => ds.data[i] ?? baseRand(20, 100)) })));
  }, [labels.length]);

  useEffect(() => {
    if (isValidHex(primaryColor)) {
      setPalette(generatePalette(primaryColor));
      setManualPalette([]);
      setActivePaletteIndex(null);
    }
  }, [primaryColor]);

  // Fetches/registers the USA map only when a map-based chart is actually selected.
  useEffect(() => {
    if (!MAP_CHART_IDS.has(chartType)) return;
    if (echarts.getMap("USA")) { setMapStatus("ready"); return; }
    let cancelled = false;
    setMapStatus("loading");
    loadUSAMap()
      .then(() => { if (!cancelled) setMapStatus("ready"); })
      .catch(() => { if (!cancelled) setMapStatus("error"); });
    return () => { cancelled = true; };
  }, [chartType, mapRetryToken]);

  useEffect(() => {
    setDataToolMode("closed");
    setDataToolError(null);
  }, [chartType]);

  const toggleSection = useCallback((id: string) => {
    setCollapsed(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const selectChartType = (nextChartType: string) => {
    if (nextChartType === chartType) return;
    chartInputCacheRef.current[chartType] = {
      title: chartTitle,
      labels: [...labels],
      datasets: datasets.map(dataset => ({ ...dataset, data: [...dataset.data] })),
    };
    const nextInput = chartInputCacheRef.current[nextChartType] ?? createCategoryInputForChart(nextChartType);
    setLabels([...nextInput.labels]);
    setDatasets(nextInput.datasets.map(dataset => ({ ...dataset, data: [...dataset.data] })));
    setChartTitle(nextInput.title);
    setChartType(nextChartType);
  };
  const resetCategorySample = () => {
    const nextInput = createCategoryInputForChart(chartType);
    setLabels([...nextInput.labels]);
    setDatasets(nextInput.datasets.map(dataset => ({ ...dataset, data: [...dataset.data] })));
    setChartTitle(nextInput.title);
  };
  const randomizeData = () => setDatasets(prev => prev.map((ds, datasetIndex) => ({
    ...ds,
    data: labels.map(() => {
      if (chartType === "line-aqi") return baseRand(10, 380);
      if (chartType === "area-rainfall") return datasetIndex === 0 ? +(Math.random() * 2.4).toFixed(3) : +(Math.random() * 6).toFixed(3);
      if (chartType === "bar-negative") return +(Math.random() * 1.2 - 0.6).toFixed(2);
      return baseRand(10, 100);
    }),
  })));
  const addDataset = () => setDatasets(prev => [...prev, { id: Date.now().toString(), name: `Dataset ${prev.length + 1}`, data: labels.map(() => baseRand(20, 100)), color: effectivePalette[prev.length % effectivePalette.length] }]);
  const addDataPoint = () => {
    setLabels(prev => [...prev, `Item ${prev.length + 1}`]);
    setDatasets(prev => prev.map(ds => ({ ...ds, data: [...ds.data, 0] })));
  };
  const removeDataPoint = (index: number) => {
    setLabels(prev => prev.filter((_, i) => i !== index));
    setDatasets(prev => prev.map(ds => ({ ...ds, data: ds.data.filter((_, i) => i !== index) })));
  };
  const updateDataPointLabel = (index: number, value: string) =>
    setLabels(prev => prev.map((label, i) => i === index ? value : label));
  const updateDatasetName = (id: string, value: string) =>
    setDatasets(prev => prev.map(ds => ds.id === id ? { ...ds, name: value } : ds));
  const updateDatasetValue = (id: string, index: number, rawValue: string) => {
    const value = Number(rawValue);
    setDatasets(prev => prev.map(ds => ds.id !== id ? ds : {
      ...ds,
      data: ds.data.map((current, i) => i === index ? (Number.isFinite(value) ? value : current) : current),
    }));
  };
  const setPaletteOverride = (index: number, hex: string) => {
    if (!isValidHex(hex)) return;
    setManualPalette(prev => {
      const next = [...prev];
      while (next.length <= index) next.push("");
      next[index] = hex;
      return next;
    });
  };
  const openPalettePicker = (index: number) => {
    setActivePaletteIndex(current => current === index ? null : index);
    setPaletteHexInput(effectivePalette[index]);
  };
  const resetPaletteColor = (index: number) => {
    setManualPalette(prev => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
    setPaletteHexInput(palette[index]);
  };
  const resetSpecialSample = () => {
    setSpecialData(prev => {
      if (chartType === "scatter-basic") return { ...prev, scatter: createDefaultScatterSeries() };
      if (chartType === "scatter-bubble") return { ...prev, bubble: createDefaultBubbleSeries() };
      if (chartType === "line-confidence") return { ...prev, confidence: createDefaultConfidencePoints() };
      if (chartType === "candle-basic") return { ...prev, candleBasic: createDefaultOHLCPoints(40, "candle-basic") };
      if (chartType === "candle-large") return { ...prev, candleLarge: createDefaultOHLCPoints(120, "candle-large") };
      if (chartType === "heat-cartesian") return { ...prev, cartesianHeatmap: createDefaultCartesianHeatmap() };
      if (chartType === "matrix-covariance") return { ...prev, covarianceMatrix: createDefaultCovarianceMatrix() };
      if (chartType === "scatter-single") return { ...prev, singleAxisScatter: createDefaultSingleAxisScatter() };
      if (chartType === "scatter-jitter") return { ...prev, jitterScatter: createDefaultJitterScatter() };
      if (chartType === "heat-calendar") return { ...prev, calendarHeatmap: createDefaultCalendarHeatmap() };
      if (chartType === "tree-lr" || chartType === "treemap-basic" || chartType === "treemap-sunburst") return { ...prev, hierarchy: createDefaultHierarchy() };
      if (chartType === "sankey-basic" || chartType === "sankey-gradient") {
        const sankey = createDefaultSankeyData();
        return { ...prev, sankeyNodes: sankey.nodes, sankeyLinks: sankey.links };
      }
      if (chartType === "graph-les-mis" || chartType === "graph-hide-overlap" || chartType === "graph-gradient-edge") {
        const graph = createDefaultGraphData();
        return { ...prev, graphNodes: graph.nodes, graphLinks: graph.links };
      }
      if (chartType === "map-usa-population" || chartType === "matrix-mini-bar-geo") return { ...prev, geoRegions: createDefaultGeoRegions() };
      if (chartType === "geo-graph") return { ...prev, geoRoute: createDefaultGeoRoute() };
      if (chartType === "heat-large" || chartType === "lines-ny" || chartType === "large-scale-area") {
        return { ...prev, generator: createDefaultSpecialChartData().generator };
      }
      return prev;
    });
  };
  const updateXYSeriesName = (kind: "scatter" | "bubble", id: string, name: string) => {
    setSpecialData(prev => kind === "scatter"
      ? { ...prev, scatter: prev.scatter.map(series => series.id === id ? { ...series, name } : series) }
      : { ...prev, bubble: prev.bubble.map(series => series.id === id ? { ...series, name } : series) });
  };
  const updateXYPoint = (kind: "scatter" | "bubble", seriesId: string, pointIndex: number, field: "x" | "y" | "size", rawValue: string) => {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) return;
    setSpecialData(prev => {
      if (kind === "scatter") {
        return {
          ...prev,
          scatter: prev.scatter.map(series => series.id !== seriesId ? series : {
            ...series,
            points: series.points.map((point, index) => index === pointIndex ? { ...point, [field]: value } : point),
          }),
        };
      }
      return {
        ...prev,
        bubble: prev.bubble.map(series => series.id !== seriesId ? series : {
          ...series,
          points: series.points.map((point, index) => index === pointIndex ? { ...point, [field]: value } : point),
        }),
      };
    });
  };
  const addXYPoint = (kind: "scatter" | "bubble", seriesId: string) => {
    setSpecialData(prev => {
      if (kind === "scatter") {
        return {
          ...prev,
          scatter: prev.scatter.map(series => {
            if (series.id !== seriesId) return series;
            const last = series.points[series.points.length - 1] ?? { x: 0, y: 0 };
            return { ...series, points: [...series.points, { x: last.x + 10, y: last.y }] };
          }),
        };
      }
      return {
        ...prev,
        bubble: prev.bubble.map(series => {
          if (series.id !== seriesId) return series;
          const last = series.points[series.points.length - 1] ?? { x: 0, y: 0, size: 20 };
          return { ...series, points: [...series.points, { x: last.x + 10, y: last.y, size: last.size }] };
        }),
      };
    });
  };
  const removeXYPoint = (kind: "scatter" | "bubble", seriesId: string, pointIndex: number) => {
    setSpecialData(prev => kind === "scatter"
      ? {
          ...prev,
          scatter: prev.scatter.map(series => series.id !== seriesId || series.points.length <= 1 ? series : {
            ...series,
            points: series.points.filter((_, index) => index !== pointIndex),
          }),
        }
      : {
          ...prev,
          bubble: prev.bubble.map(series => series.id !== seriesId || series.points.length <= 1 ? series : {
            ...series,
            points: series.points.filter((_, index) => index !== pointIndex),
          }),
        });
  };
  const addXYSeries = (kind: "scatter" | "bubble") => {
    const id = `${kind}-${Date.now()}`;
    setSpecialData(prev => kind === "scatter"
      ? { ...prev, scatter: [...prev.scatter, { id, name: `Group ${prev.scatter.length + 1}`, points: [{ x: 10, y: 20 }] }] }
      : { ...prev, bubble: [...prev.bubble, { id, name: `Market ${prev.bubble.length + 1}`, points: [{ x: 10, y: 20, size: 20 }] }] });
  };
  const removeXYSeries = (kind: "scatter" | "bubble", id: string) => {
    setSpecialData(prev => kind === "scatter"
      ? { ...prev, scatter: prev.scatter.length <= 1 ? prev.scatter : prev.scatter.filter(series => series.id !== id) }
      : { ...prev, bubble: prev.bubble.length <= 1 ? prev.bubble : prev.bubble.filter(series => series.id !== id) });
  };
  const updateRangePoint = (index: number, field: keyof RangePoint, rawValue: string) => {
    setSpecialData(prev => ({
      ...prev,
      confidence: prev.confidence.map((point, pointIndex) => {
        if (pointIndex !== index) return point;
        if (field === "label") return { ...point, label: rawValue };
        const value = Number(rawValue);
        return Number.isFinite(value) ? { ...point, [field]: value } : point;
      }),
    }));
  };
  const addRangePoint = () => {
    setSpecialData(prev => {
      const last = prev.confidence[prev.confidence.length - 1] ?? { label: "2024-01-01", value: 0, lower: -0.1, upper: 0.1 };
      const date = new Date(`${last.label}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() + 1);
      return { ...prev, confidence: [...prev.confidence, { ...last, label: Number.isNaN(date.getTime()) ? `Point ${prev.confidence.length + 1}` : date.toISOString().slice(0, 10) }] };
    });
  };
  const removeRangePoint = (index: number) =>
    setSpecialData(prev => ({ ...prev, confidence: prev.confidence.length <= 1 ? prev.confidence : prev.confidence.filter((_, i) => i !== index) }));
  const activeCandleKey: "candleBasic" | "candleLarge" = chartType === "candle-large" ? "candleLarge" : "candleBasic";
  const updateOHLCPoint = (index: number, field: keyof OHLCPoint, rawValue: string) => {
    setSpecialData(prev => ({
      ...prev,
      [activeCandleKey]: prev[activeCandleKey].map((point, pointIndex) => {
        if (pointIndex !== index) return point;
        if (field === "date") return { ...point, date: rawValue };
        const value = Number(rawValue);
        return Number.isFinite(value) ? { ...point, [field]: value } : point;
      }),
    }));
  };
  const addOHLCPoint = () => {
    setSpecialData(prev => {
      const points = prev[activeCandleKey];
      const last = points[points.length - 1] ?? { date: "2024-01-01", open: 100, close: 100, low: 95, high: 105 };
      const date = new Date(`${last.date}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() + 1);
      const next = { ...last, date: Number.isNaN(date.getTime()) ? `Day ${points.length + 1}` : date.toISOString().slice(0, 10) };
      return { ...prev, [activeCandleKey]: [...points, next] };
    });
  };
  const removeOHLCPoint = (index: number) =>
    setSpecialData(prev => ({ ...prev, [activeCandleKey]: prev[activeCandleKey].length <= 1 ? prev[activeCandleKey] : prev[activeCandleKey].filter((_, i) => i !== index) }));
  const activeMatrixKey: "cartesianHeatmap" | "covarianceMatrix" | "singleAxisScatter" | "jitterScatter" =
    chartType === "matrix-covariance" ? "covarianceMatrix"
      : chartType === "scatter-single" ? "singleAxisScatter"
        : chartType === "scatter-jitter" ? "jitterScatter"
          : "cartesianHeatmap";
  const updateMatrixCell = (index: number, field: keyof MatrixCell, rawValue: string) => {
    setSpecialData(prev => ({
      ...prev,
      [activeMatrixKey]: prev[activeMatrixKey].map((cell, cellIndex) => {
        if (cellIndex !== index) return cell;
        if (field === "x" || field === "y") return { ...cell, [field]: rawValue };
        const value = Number(rawValue);
        return Number.isFinite(value) ? { ...cell, value } : cell;
      }),
    }));
  };
  const addMatrixCell = () =>
    setSpecialData(prev => ({ ...prev, [activeMatrixKey]: [...prev[activeMatrixKey], { x: "New X", y: "New Y", value: 0 }] }));
  const removeMatrixCell = (index: number) =>
    setSpecialData(prev => ({ ...prev, [activeMatrixKey]: prev[activeMatrixKey].length <= 1 ? prev[activeMatrixKey] : prev[activeMatrixKey].filter((_, i) => i !== index) }));
  const updateCalendarPoint = (index: number, field: keyof DateValuePoint, rawValue: string) => {
    setSpecialData(prev => ({
      ...prev,
      calendarHeatmap: prev.calendarHeatmap.map((point, pointIndex) => {
        if (pointIndex !== index) return point;
        if (field === "date") return { ...point, date: rawValue };
        const value = Number(rawValue);
        return Number.isFinite(value) ? { ...point, value } : point;
      }),
    }));
  };
  const addCalendarPoint = () => {
    setSpecialData(prev => {
      const last = prev.calendarHeatmap[prev.calendarHeatmap.length - 1] ?? { date: "2024-01-01", value: 0 };
      const date = new Date(`${last.date}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() + 1);
      return { ...prev, calendarHeatmap: [...prev.calendarHeatmap, { date: Number.isNaN(date.getTime()) ? "2024-01-01" : date.toISOString().slice(0, 10), value: last.value }] };
    });
  };
  const removeCalendarPoint = (index: number) =>
    setSpecialData(prev => ({ ...prev, calendarHeatmap: prev.calendarHeatmap.length <= 1 ? prev.calendarHeatmap : prev.calendarHeatmap.filter((_, i) => i !== index) }));
  const updateHierarchyRow = (index: number, field: keyof HierarchyRow, rawValue: string) => {
    setSpecialData(prev => {
      const oldId = prev.hierarchy[index]?.id;
      return {
        ...prev,
        hierarchy: prev.hierarchy.map((row, rowIndex) => {
          if (rowIndex === index) {
            if (field !== "value") return { ...row, [field]: rawValue };
            const value = Number(rawValue);
            return Number.isFinite(value) ? { ...row, value } : row;
          }
          return field === "id" && row.parentId === oldId ? { ...row, parentId: rawValue } : row;
        }),
      };
    });
  };
  const addHierarchyRow = () =>
    setSpecialData(prev => ({ ...prev, hierarchy: [...prev.hierarchy, { id: `node-${Date.now()}`, name: `Node ${prev.hierarchy.length + 1}`, parentId: prev.hierarchy[0]?.id ?? "", value: 10 }] }));
  const removeHierarchyRow = (index: number) => {
    setSpecialData(prev => {
      if (prev.hierarchy.length <= 1) return prev;
      const removedId = prev.hierarchy[index]?.id;
      return { ...prev, hierarchy: prev.hierarchy.filter((_, i) => i !== index).map(row => row.parentId === removedId ? { ...row, parentId: "" } : row) };
    });
  };
  const usesSankeyData = chartType === "sankey-basic" || chartType === "sankey-gradient";
  const activeNetworkNodes = usesSankeyData ? specialData.sankeyNodes : specialData.graphNodes;
  const activeNetworkLinks = usesSankeyData ? specialData.sankeyLinks : specialData.graphLinks;
  const updateNetworkNode = (index: number, field: "name" | "category", value: string) => {
    setSpecialData(prev => {
      const nodesKey = usesSankeyData ? "sankeyNodes" : "graphNodes";
      const linksKey = usesSankeyData ? "sankeyLinks" : "graphLinks";
      const oldName = prev[nodesKey][index]?.name;
      return {
        ...prev,
        [nodesKey]: prev[nodesKey].map((node, nodeIndex) => nodeIndex === index ? { ...node, [field]: value } : node),
        ...(field === "name" ? {
          [linksKey]: prev[linksKey].map(link => ({
            ...link,
            source: link.source === oldName ? value : link.source,
            target: link.target === oldName ? value : link.target,
          })),
        } : {}),
      };
    });
  };
  const addNetworkNode = () => {
    const nodesKey = usesSankeyData ? "sankeyNodes" : "graphNodes";
    setSpecialData(prev => ({ ...prev, [nodesKey]: [...prev[nodesKey], { id: `node-${Date.now()}`, name: `Node ${prev[nodesKey].length + 1}`, category: "Default" }] }));
  };
  const removeNetworkNode = (index: number) => {
    const nodesKey = usesSankeyData ? "sankeyNodes" : "graphNodes";
    const linksKey = usesSankeyData ? "sankeyLinks" : "graphLinks";
    setSpecialData(prev => {
      if (prev[nodesKey].length <= 1) return prev;
      const name = prev[nodesKey][index]?.name;
      return { ...prev, [nodesKey]: prev[nodesKey].filter((_, i) => i !== index), [linksKey]: prev[linksKey].filter(link => link.source !== name && link.target !== name) };
    });
  };
  const updateNetworkLink = (index: number, field: "source" | "target" | "value", rawValue: string) => {
    const linksKey = usesSankeyData ? "sankeyLinks" : "graphLinks";
    setSpecialData(prev => ({
      ...prev,
      [linksKey]: prev[linksKey].map((link, linkIndex) => {
        if (linkIndex !== index) return link;
        if (field === "source" || field === "target") return { ...link, [field]: rawValue };
        const value = Number(rawValue);
        return Number.isFinite(value) ? { ...link, value } : link;
      }),
    }));
  };
  const addNetworkLink = () => {
    const linksKey = usesSankeyData ? "sankeyLinks" : "graphLinks";
    const source = activeNetworkNodes[0]?.name ?? "";
    const target = activeNetworkNodes[1]?.name ?? source;
    setSpecialData(prev => ({ ...prev, [linksKey]: [...prev[linksKey], { id: `link-${Date.now()}`, source, target, value: 1 }] }));
  };
  const removeNetworkLink = (index: number) => {
    const linksKey = usesSankeyData ? "sankeyLinks" : "graphLinks";
    setSpecialData(prev => ({ ...prev, [linksKey]: prev[linksKey].filter((_, i) => i !== index) }));
  };
  const updateGeoRegion = (index: number, field: keyof GeoRegionRow, rawValue: string) => {
    setSpecialData(prev => ({
      ...prev,
      geoRegions: prev.geoRegions.map((region, regionIndex) => {
        if (regionIndex !== index) return region;
        if (field === "name") return { ...region, name: rawValue };
        const value = Number(rawValue);
        return Number.isFinite(value) ? { ...region, [field]: value } : region;
      }),
    }));
  };
  const addGeoRegion = () =>
    setSpecialData(prev => ({ ...prev, geoRegions: [...prev.geoRegions, { name: `Region ${prev.geoRegions.length + 1}`, value: 0, secondary: 0 }] }));
  const removeGeoRegion = (index: number) =>
    setSpecialData(prev => ({ ...prev, geoRegions: prev.geoRegions.length <= 1 ? prev.geoRegions : prev.geoRegions.filter((_, i) => i !== index) }));
  const updateGeoRoutePoint = (index: number, field: keyof GeoRoutePoint, rawValue: string) => {
    setSpecialData(prev => ({
      ...prev,
      geoRoute: prev.geoRoute.map((point, pointIndex) => {
        if (pointIndex !== index) return point;
        if (field === "name") return { ...point, name: rawValue };
        const value = Number(rawValue);
        return Number.isFinite(value) ? { ...point, [field]: value } : point;
      }),
    }));
  };
  const addGeoRoutePoint = () =>
    setSpecialData(prev => ({ ...prev, geoRoute: [...prev.geoRoute, { name: `Point ${prev.geoRoute.length + 1}`, longitude: -98, latitude: 39 }] }));
  const removeGeoRoutePoint = (index: number) =>
    setSpecialData(prev => ({ ...prev, geoRoute: prev.geoRoute.length <= 2 ? prev.geoRoute : prev.geoRoute.filter((_, i) => i !== index) }));
  const updateGeneratorSetting = (field: keyof GeneratorSettings, rawValue: string) => {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) return;
    setSpecialData(prev => ({ ...prev, generator: { ...prev.generator, [field]: value } }));
  };
  const getActiveDataPayload = (): unknown => {
    switch (activeChartPolicy.dataEditor) {
      case "category-series": return { labels, datasets };
      case "single-value":
      case "multi-value": return { datasets };
      case "xy": return specialData.scatter;
      case "xyz": return specialData.bubble;
      case "range": return specialData.confidence;
      case "ohlc": return specialData[activeCandleKey];
      case "matrix": return specialData[activeMatrixKey];
      case "calendar": return specialData.calendarHeatmap;
      case "hierarchy": return specialData.hierarchy;
      case "network": return { nodes: activeNetworkNodes, links: activeNetworkLinks };
      case "geo": return specialData.geoRegions;
      case "geo-route": return specialData.geoRoute;
      case "generator": return specialData.generator;
      default: return null;
    }
  };
  const activeDataToCsv = (): string => {
    const rows: unknown[][] = [];
    switch (activeChartPolicy.dataEditor) {
      case "category-series": {
        const visible = editableDatasets;
        rows.push(["label", ...visible.map(dataset => dataset.name)]);
        labels.forEach((label, index) => rows.push([label, ...visible.map(dataset => dataset.data[index] ?? 0)]));
        break;
      }
      case "single-value":
      case "multi-value":
        rows.push(["name", "value"]);
        datasets.forEach(dataset => rows.push([dataset.name, dataset.data[0] ?? 0]));
        break;
      case "xy":
        rows.push(["series", "x", "y"]);
        specialData.scatter.forEach(series => series.points.forEach(point => rows.push([series.name, point.x, point.y])));
        break;
      case "xyz":
        rows.push(["series", "x", "y", "size"]);
        specialData.bubble.forEach(series => series.points.forEach(point => rows.push([series.name, point.x, point.y, point.size])));
        break;
      case "range":
        rows.push(["label", "value", "lower", "upper"]);
        specialData.confidence.forEach(point => rows.push([point.label, point.value, point.lower, point.upper]));
        break;
      case "ohlc":
        rows.push(["date", "open", "close", "low", "high"]);
        specialData[activeCandleKey].forEach(point => rows.push([point.date, point.open, point.close, point.low, point.high]));
        break;
      case "matrix":
        rows.push(["x", "y", "value"]);
        specialData[activeMatrixKey].forEach(cell => rows.push([cell.x, cell.y, cell.value]));
        break;
      case "calendar":
        rows.push(["date", "value"]);
        specialData.calendarHeatmap.forEach(point => rows.push([point.date, point.value]));
        break;
      case "hierarchy":
        rows.push(["id", "name", "parentId", "value"]);
        specialData.hierarchy.forEach(row => rows.push([row.id, row.name, row.parentId, row.value]));
        break;
      case "network":
        rows.push(["record", "id", "name", "category", "source", "target", "value"]);
        activeNetworkNodes.forEach(node => rows.push(["node", node.id, node.name, node.category, "", "", ""]));
        activeNetworkLinks.forEach(link => rows.push(["link", link.id, "", "", link.source, link.target, link.value]));
        break;
      case "geo":
        rows.push(["name", "value", "secondary"]);
        specialData.geoRegions.forEach(region => rows.push([region.name, region.value, region.secondary]));
        break;
      case "geo-route":
        rows.push(["name", "longitude", "latitude"]);
        specialData.geoRoute.forEach(point => rows.push([point.name, point.longitude, point.latitude]));
        break;
      case "generator":
        rows.push(["key", "value"]);
        Object.entries(specialData.generator).forEach(([key, value]) => rows.push([key, value]));
        break;
    }
    return rows.map(row => row.map(csvEscape).join(",")).join("\n");
  };
  const openDataTool = (mode: "csv" | "json") => {
    setDataToolMode(mode);
    setDataToolError(null);
    setDataToolText(mode === "json" ? JSON.stringify(getActiveDataPayload(), null, 2) : activeDataToCsv());
  };
  const applyJsonData = () => {
    try {
      const parsed = JSON.parse(dataToolText);
      const requireArray = (value: unknown, label: string) => {
        if (!Array.isArray(value) || !value.length) throw new Error(`${label} 배열이 비어 있거나 올바르지 않습니다.`);
        return value;
      };
      const jsonNumber = (value: unknown, label: string) => {
        if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${label}은 숫자여야 합니다.`);
        return value;
      };
      switch (activeChartPolicy.dataEditor) {
        case "category-series": {
          if (!parsed || !Array.isArray(parsed.labels) || !Array.isArray(parsed.datasets)) throw new Error("labels와 datasets가 필요합니다.");
          const nextLabels = parsed.labels.map(String);
          const nextDatasets = parsed.datasets.map((dataset: any, index: number) => ({
            id: String(dataset.id ?? `dataset-${Date.now()}-${index}`),
            name: String(dataset.name ?? `Dataset ${index + 1}`),
            data: nextLabels.map((_: string, valueIndex: number) => jsonNumber(dataset.data?.[valueIndex] ?? 0, `${dataset.name ?? `Dataset ${index + 1}`} data`)),
            color: String(dataset.color ?? effectivePalette[index % effectivePalette.length]),
          }));
          if (!nextLabels.length || !nextDatasets.length) throw new Error("최소 1개의 label과 dataset이 필요합니다.");
          setLabels(nextLabels); setDatasets(nextDatasets);
          break;
        }
        case "single-value":
        case "multi-value": {
          const source = requireArray(parsed?.datasets, "datasets");
          setDatasets(source.map((dataset: any, index: number) => ({ id: String(dataset.id ?? `dataset-${Date.now()}-${index}`), name: String(dataset.name ?? `Dataset ${index + 1}`), data: [jsonNumber(dataset.data?.[0] ?? 0, `Dataset ${index + 1} value`)], color: String(dataset.color ?? effectivePalette[index % effectivePalette.length]) })));
          break;
        }
        case "xy":
          setSpecialData(prev => ({ ...prev, scatter: requireArray(parsed, "XY series").map((series: any, index: number) => ({ id: String(series.id ?? `xy-${index}`), name: String(series.name ?? `Series ${index + 1}`), points: requireArray(series.points, "points").map((point: any, pointIndex: number) => ({ x: jsonNumber(point.x, `Point ${pointIndex + 1} X`), y: jsonNumber(point.y, `Point ${pointIndex + 1} Y`) })) })) }));
          break;
        case "xyz":
          setSpecialData(prev => ({ ...prev, bubble: requireArray(parsed, "XYZ series").map((series: any, index: number) => ({ id: String(series.id ?? `xyz-${index}`), name: String(series.name ?? `Series ${index + 1}`), points: requireArray(series.points, "points").map((point: any, pointIndex: number) => ({ x: jsonNumber(point.x, `Point ${pointIndex + 1} X`), y: jsonNumber(point.y, `Point ${pointIndex + 1} Y`), size: jsonNumber(point.size, `Point ${pointIndex + 1} Size`) })) })) }));
          break;
        case "range":
          setSpecialData(prev => ({ ...prev, confidence: requireArray(parsed, "Range").map((point: any, index: number) => ({ label: String(point.label), value: jsonNumber(point.value, `Range ${index + 1} value`), lower: jsonNumber(point.lower, `Range ${index + 1} lower`), upper: jsonNumber(point.upper, `Range ${index + 1} upper`) })) }));
          break;
        case "ohlc":
          setSpecialData(prev => ({ ...prev, [activeCandleKey]: requireArray(parsed, "OHLC").map((point: any, index: number) => ({ date: String(point.date), open: jsonNumber(point.open, `OHLC ${index + 1} open`), close: jsonNumber(point.close, `OHLC ${index + 1} close`), low: jsonNumber(point.low, `OHLC ${index + 1} low`), high: jsonNumber(point.high, `OHLC ${index + 1} high`) })) }));
          break;
        case "matrix":
          setSpecialData(prev => ({ ...prev, [activeMatrixKey]: requireArray(parsed, "Matrix").map((cell: any, index: number) => ({ x: String(cell.x), y: String(cell.y), value: jsonNumber(cell.value, `Matrix ${index + 1} value`) })) }));
          break;
        case "calendar":
          setSpecialData(prev => ({ ...prev, calendarHeatmap: requireArray(parsed, "Calendar").map((point: any, index: number) => ({ date: String(point.date), value: jsonNumber(point.value, `Calendar ${index + 1} value`) })) }));
          break;
        case "hierarchy":
          setSpecialData(prev => ({ ...prev, hierarchy: requireArray(parsed, "Hierarchy").map((row: any, index: number) => ({ id: String(row.id ?? `node-${index}`), name: String(row.name ?? `Node ${index + 1}`), parentId: String(row.parentId ?? ""), value: jsonNumber(row.value ?? 0, `Hierarchy ${index + 1} value`) })) }));
          break;
        case "network": {
          const nodes = requireArray(parsed?.nodes, "nodes").map((node: any, index: number) => ({ id: String(node.id ?? `node-${index}`), name: String(node.name ?? `Node ${index + 1}`), category: String(node.category ?? "Default") }));
          const links = requireArray(parsed?.links, "links").map((link: any, index: number) => ({ id: String(link.id ?? `link-${index}`), source: String(link.source), target: String(link.target), value: jsonNumber(link.value ?? 1, `Link ${index + 1} value`) }));
          setSpecialData(prev => usesSankeyData ? { ...prev, sankeyNodes: nodes, sankeyLinks: links } : { ...prev, graphNodes: nodes, graphLinks: links });
          break;
        }
        case "geo":
          setSpecialData(prev => ({ ...prev, geoRegions: requireArray(parsed, "Geo regions").map((region: any, index: number) => ({ name: String(region.name), value: jsonNumber(region.value, `Region ${index + 1} value`), secondary: jsonNumber(region.secondary ?? 0, `Region ${index + 1} secondary`) })) }));
          break;
        case "geo-route":
          setSpecialData(prev => ({ ...prev, geoRoute: requireArray(parsed, "Geo route").map((point: any, index: number) => ({ name: String(point.name), longitude: jsonNumber(point.longitude, `Route ${index + 1} longitude`), latitude: jsonNumber(point.latitude, `Route ${index + 1} latitude`) })) }));
          break;
        case "generator": {
          if (!parsed || typeof parsed !== "object") throw new Error("Generator 객체가 필요합니다.");
          const current = specialData.generator;
          const next = Object.fromEntries(Object.keys(current).map(key => [key, Number(parsed[key] ?? current[key as keyof GeneratorSettings])])) as unknown as GeneratorSettings;
          if (Object.values(next).some(value => !Number.isFinite(value))) throw new Error("Generator 값은 숫자여야 합니다.");
          setSpecialData(prev => ({ ...prev, generator: next }));
          break;
        }
        default: throw new Error("이 차트는 JSON 편집을 지원하지 않습니다.");
      }
      setDataToolError(null);
    } catch (error) {
      setDataToolError(error instanceof Error ? error.message : "JSON을 적용하지 못했습니다.");
    }
  };
  const applyCsvData = () => {
    try {
      const rows = parseCsvRows(dataToolText);
      if (rows.length < 2) throw new Error("헤더와 최소 1개의 데이터 행이 필요합니다.");
      const rawHeaders = rows[0].map(header => header.trim());
      const headers = rawHeaders.map(header => header.toLowerCase());
      const records = rows.slice(1);
      const col = (name: string, fallback = -1) => {
        const index = headers.indexOf(name.toLowerCase());
        return index >= 0 ? index : fallback;
      };
      const num = (value: string, label: string) => {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) throw new Error(`${label} 값 "${value}"이 숫자가 아닙니다.`);
        return parsed;
      };
      switch (activeChartPolicy.dataEditor) {
        case "category-series": {
          if (headers.length < 2) throw new Error("label과 최소 1개의 series 열이 필요합니다.");
          const nextLabels = records.map(record => record[0] ?? "");
          const nextDatasets = rawHeaders.slice(1).map((name, seriesIndex) => ({ id: `csv-${Date.now()}-${seriesIndex}`, name: name || `Series ${seriesIndex + 1}`, data: records.map((record, rowIndex) => num(record[seriesIndex + 1], `행 ${rowIndex + 2}`)), color: effectivePalette[seriesIndex % effectivePalette.length] }));
          setLabels(nextLabels); setDatasets(nextDatasets);
          break;
        }
        case "single-value":
        case "multi-value":
          setDatasets(records.map((record, index) => ({ id: `csv-${Date.now()}-${index}`, name: record[col("name", 0)] || `Dataset ${index + 1}`, data: [num(record[col("value", 1)], `행 ${index + 2}`)], color: effectivePalette[index % effectivePalette.length] })));
          break;
        case "xy":
        case "xyz": {
          const grouped = new Map<string, any[]>();
          records.forEach((record, index) => {
            const name = record[col("series", 0)] || "Series 1";
            const point = { x: num(record[col("x", 1)], `행 ${index + 2} X`), y: num(record[col("y", 2)], `행 ${index + 2} Y`), ...(activeChartPolicy.dataEditor === "xyz" ? { size: num(record[col("size", 3)], `행 ${index + 2} Size`) } : {}) };
            grouped.set(name, [...(grouped.get(name) ?? []), point]);
          });
          if (activeChartPolicy.dataEditor === "xy") setSpecialData(prev => ({ ...prev, scatter: [...grouped].map(([name, points], index) => ({ id: `csv-xy-${index}`, name, points })) }));
          else setSpecialData(prev => ({ ...prev, bubble: [...grouped].map(([name, points], index) => ({ id: `csv-xyz-${index}`, name, points })) }));
          break;
        }
        case "range":
          setSpecialData(prev => ({ ...prev, confidence: records.map((record, index) => ({ label: record[col("label", 0)], value: num(record[col("value", 1)], `행 ${index + 2}`), lower: num(record[col("lower", 2)], `행 ${index + 2}`), upper: num(record[col("upper", 3)], `행 ${index + 2}`) })) }));
          break;
        case "ohlc":
          setSpecialData(prev => ({ ...prev, [activeCandleKey]: records.map((record, index) => ({ date: record[col("date", 0)], open: num(record[col("open", 1)], `행 ${index + 2}`), close: num(record[col("close", 2)], `행 ${index + 2}`), low: num(record[col("low", 3)], `행 ${index + 2}`), high: num(record[col("high", 4)], `행 ${index + 2}`) })) }));
          break;
        case "matrix":
          setSpecialData(prev => ({ ...prev, [activeMatrixKey]: records.map((record, index) => ({ x: record[col("x", 0)], y: record[col("y", 1)], value: num(record[col("value", 2)], `행 ${index + 2}`) })) }));
          break;
        case "calendar":
          setSpecialData(prev => ({ ...prev, calendarHeatmap: records.map((record, index) => ({ date: record[col("date", 0)], value: num(record[col("value", 1)], `행 ${index + 2}`) })) }));
          break;
        case "hierarchy":
          setSpecialData(prev => ({ ...prev, hierarchy: records.map((record, index) => ({ id: record[col("id", 0)] || `node-${index}`, name: record[col("name", 1)] || `Node ${index + 1}`, parentId: record[col("parentid", 2)] ?? "", value: num(record[col("value", 3)], `행 ${index + 2}`) })) }));
          break;
        case "network": {
          const nodes: NetworkNode[] = [], links: NetworkLink[] = [];
          records.forEach((record, index) => {
            if ((record[col("record", 0)] ?? "").toLowerCase() === "node") nodes.push({ id: record[col("id", 1)] || `node-${index}`, name: record[col("name", 2)] || `Node ${index + 1}`, category: record[col("category", 3)] || "Default" });
            else links.push({ id: record[col("id", 1)] || `link-${index}`, source: record[col("source", 4)], target: record[col("target", 5)], value: num(record[col("value", 6)], `행 ${index + 2}`) });
          });
          if (!nodes.length || !links.length) throw new Error("node와 link 레코드가 모두 필요합니다.");
          setSpecialData(prev => usesSankeyData ? { ...prev, sankeyNodes: nodes, sankeyLinks: links } : { ...prev, graphNodes: nodes, graphLinks: links });
          break;
        }
        case "geo":
          setSpecialData(prev => ({ ...prev, geoRegions: records.map((record, index) => ({ name: record[col("name", 0)], value: num(record[col("value", 1)], `행 ${index + 2}`), secondary: num(record[col("secondary", 2)] ?? "0", `행 ${index + 2}`) })) }));
          break;
        case "geo-route":
          setSpecialData(prev => ({ ...prev, geoRoute: records.map((record, index) => ({ name: record[col("name", 0)], longitude: num(record[col("longitude", 1)], `행 ${index + 2}`), latitude: num(record[col("latitude", 2)], `행 ${index + 2}`) })) }));
          break;
        case "generator": {
          const next = { ...specialData.generator };
          records.forEach((record, index) => {
            const key = record[col("key", 0)] as keyof GeneratorSettings;
            if (!(key in next)) throw new Error(`행 ${index + 2}의 Generator key가 올바르지 않습니다.`);
            next[key] = num(record[col("value", 1)], `행 ${index + 2}`);
          });
          setSpecialData(prev => ({ ...prev, generator: next }));
          break;
        }
        default: throw new Error("이 차트는 CSV 가져오기를 지원하지 않습니다.");
      }
      setDataToolError(null);
    } catch (error) {
      setDataToolError(error instanceof Error ? error.message : "CSV를 적용하지 못했습니다.");
    }
  };
  const handleCsvFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDataToolMode("csv");
      setDataToolError(null);
      setDataToolText(String(reader.result ?? ""));
    };
    reader.onerror = () => setDataToolError("CSV 파일을 읽지 못했습니다.");
    reader.readAsText(file);
  };
  const handlePrimaryColor = (hex: string) => { setHexInput(hex); if (isValidHex(hex)) setPrimaryColor(hex); };

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<"png" | "svg" | null>(null);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openMenu]);

  useEffect(() => {
    if (activePaletteIndex === null) return;
    const close = () => setActivePaletteIndex(null);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [activePaletteIndex]);

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
    if (MAP_CHART_IDS.has(chartType) && mapStatus !== "ready") return null;
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
    () => buildEChartsOption(chartType, labels, chartDatasets, effectivePalette, theme, chartTitle, chartSize, autoResponsive, smoothLine, specialData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chartType, labels, datasets, effectivePalette, theme, chartTitle, chartSize.w, chartSize.h, autoResponsive, smoothLine, specialData]
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
                          <button key={t.id} onClick={() => selectChartType(t.id)} title={t.label}
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
              {activeChartPolicy.dataEditor === "preset" ? (
                <div style={{ display: "flex", gap: 8, padding: 10, borderRadius: 8, background: isDark ? "#1a1a2e" : "#F3F4F6", color: subText, fontSize: 11.5, lineHeight: 1.5 }}>
                  <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>{activeChartPolicy.presetReason ?? "이 차트는 현재 샘플 데이터로 제공됩니다. 차트별 데이터 편집 스키마를 순차적으로 연결할 예정입니다."}</span>
                </div>
              ) : activeChartPolicy.dataEditor === "xy" || activeChartPolicy.dataEditor === "xyz" ? (() => {
                const kind = activeChartPolicy.dataEditor === "xyz" ? "bubble" : "scatter";
                const seriesList = kind === "bubble" ? specialData.bubble : specialData.scatter;
                const hasSize = kind === "bubble";
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11.5, color: subText }}>{hasSize ? "X, Y, Size를 점 단위로 편집합니다." : "X와 Y 좌표를 점 단위로 편집합니다."}</span>
                      <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                    </div>
                    {seriesList.map((series, seriesIndex) => (
                      <div key={series.id} style={{ border: `1px solid ${inputBorder}`, borderRadius: 8, overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: effectivePalette[seriesIndex % effectivePalette.length], flexShrink: 0 }} />
                          <input aria-label={`Special series ${seriesIndex + 1} name`} value={series.name} onChange={e => updateXYSeriesName(kind, series.id, e.target.value)}
                            style={{ flex: 1, minWidth: 0, height: 24, border: "none", background: "transparent", outline: "none", color: sectionText, fontSize: 11.5, fontWeight: 600, fontFamily: "Inter" }} />
                          {seriesList.length > 1 && (
                            <button aria-label={`Remove ${series.name}`} onClick={() => removeXYSeries(kind, series.id)} style={{ border: "none", background: "none", color: subText, cursor: "pointer", display: "flex", padding: 0 }}><X size={12} /></button>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: hasSize ? "1fr 1fr 1fr 30px" : "1fr 1fr 30px", padding: "5px 6px", gap: 5, background: isDark ? "#11111D" : "#fff" }}>
                          {["X", "Y", ...(hasSize ? ["Size"] : []), ""].map((heading, index) => <span key={index} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                          {series.points.map((point, pointIndex) => (
                            <div key={pointIndex} style={{ display: "contents" }}>
                              <input aria-label={`${series.name} point ${pointIndex + 1} X`} type="number" value={point.x} onChange={e => updateXYPoint(kind, series.id, pointIndex, "x", e.target.value)}
                                style={{ width: "100%", minWidth: 0, height: 29, padding: "0 6px", boxSizing: "border-box", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5, outline: "none" }} />
                              <input aria-label={`${series.name} point ${pointIndex + 1} Y`} type="number" value={point.y} onChange={e => updateXYPoint(kind, series.id, pointIndex, "y", e.target.value)}
                                style={{ width: "100%", minWidth: 0, height: 29, padding: "0 6px", boxSizing: "border-box", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5, outline: "none" }} />
                              {hasSize && (
                                <input aria-label={`${series.name} point ${pointIndex + 1} Size`} type="number" min={1} value={(point as XYZPoint).size} onChange={e => updateXYPoint(kind, series.id, pointIndex, "size", e.target.value)}
                                  style={{ width: "100%", minWidth: 0, height: 29, padding: "0 6px", boxSizing: "border-box", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5, outline: "none" }} />
                              )}
                              <button aria-label={`Remove ${series.name} point ${pointIndex + 1}`} disabled={series.points.length <= 1} onClick={() => removeXYPoint(kind, series.id, pointIndex)}
                                style={{ height: 29, border: "none", background: "transparent", color: series.points.length <= 1 ? inputBorder : subText, cursor: series.points.length <= 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={11} /></button>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => addXYPoint(kind, series.id)} style={{ width: "100%", height: 28, border: "none", borderTop: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 10.5, cursor: "pointer" }}><Plus size={10} style={{ verticalAlign: -1 }} /> Add point</button>
                      </div>
                    ))}
                    <button onClick={() => addXYSeries(kind)} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add series</button>
                  </div>
                );
              })() : activeChartPolicy.dataEditor === "range" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>Label, Value, Lower, Upper 범위를 편집합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ maxHeight: 310, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ minWidth: 430 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "130px repeat(3, 88px) 30px", padding: "6px", gap: 5, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                        {["Label", "Value", "Lower", "Upper", ""].map(heading => <span key={heading} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                      </div>
                      {specialData.confidence.map((point, index) => (
                        <div key={index} style={{ display: "grid", gridTemplateColumns: "130px repeat(3, 88px) 30px", padding: "5px 6px", gap: 5, borderBottom: index < specialData.confidence.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                          <input aria-label={`Range point ${index + 1} label`} value={point.label} onChange={e => updateRangePoint(index, "label", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          {(["value", "lower", "upper"] as const).map(field => (
                            <input key={field} aria-label={`Range point ${index + 1} ${field}`} type="number" step="0.01" value={point[field]} onChange={e => updateRangePoint(index, field, e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          ))}
                          <button aria-label={`Remove range point ${index + 1}`} disabled={specialData.confidence.length <= 1} onClick={() => removeRangePoint(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={addRangePoint} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add range point</button>
                </div>
              ) : activeChartPolicy.dataEditor === "ohlc" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>Date와 Open/Close/Low/High 값을 편집합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ maxHeight: 310, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ minWidth: 560 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "128px repeat(4, 92px) 30px", padding: "6px", gap: 5, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                        {["Date", "Open", "Close", "Low", "High", ""].map(heading => <span key={heading} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                      </div>
                      {specialData[activeCandleKey].map((point, index) => (
                        <div key={index} style={{ display: "grid", gridTemplateColumns: "128px repeat(4, 92px) 30px", padding: "5px 6px", gap: 5, borderBottom: index < specialData[activeCandleKey].length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                          <input aria-label={`OHLC point ${index + 1} date`} value={point.date} onChange={e => updateOHLCPoint(index, "date", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          {(["open", "close", "low", "high"] as const).map(field => (
                            <input key={field} aria-label={`OHLC point ${index + 1} ${field}`} type="number" value={point[field]} onChange={e => updateOHLCPoint(index, field, e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          ))}
                          <button aria-label={`Remove OHLC point ${index + 1}`} disabled={specialData[activeCandleKey].length <= 1} onClick={() => removeOHLCPoint(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={addOHLCPoint} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add OHLC row</button>
                </div>
              ) : activeChartPolicy.dataEditor === "matrix" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>X, Y와 셀 값을 직접 편집합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ maxHeight: 310, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ minWidth: 330 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 90px 30px", padding: 6, gap: 5, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                        {["X", "Y", "Value", ""].map((heading, index) => <span key={index} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                      </div>
                      {specialData[activeMatrixKey].map((cell, index) => (
                        <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 90px 30px", padding: "5px 6px", gap: 5, borderBottom: index < specialData[activeMatrixKey].length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                          <input aria-label={`Matrix cell ${index + 1} X`} value={cell.x} onChange={e => updateMatrixCell(index, "x", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          <input aria-label={`Matrix cell ${index + 1} Y`} value={cell.y} onChange={e => updateMatrixCell(index, "y", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          <input aria-label={`Matrix cell ${index + 1} value`} type="number" step="0.01" value={cell.value} onChange={e => updateMatrixCell(index, "value", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          <button aria-label={`Remove matrix cell ${index + 1}`} disabled={specialData[activeMatrixKey].length <= 1} onClick={() => removeMatrixCell(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={addMatrixCell} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add matrix cell</button>
                </div>
              ) : activeChartPolicy.dataEditor === "calendar" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>날짜별 값을 편집합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ maxHeight: 310, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 30px", padding: 6, gap: 5, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                      {["Date", "Value", ""].map((heading, index) => <span key={index} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                    </div>
                    {specialData.calendarHeatmap.map((point, index) => (
                      <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 100px 30px", padding: "5px 6px", gap: 5, borderBottom: index < specialData.calendarHeatmap.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                        <input aria-label={`Calendar point ${index + 1} date`} value={point.date} onChange={e => updateCalendarPoint(index, "date", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                        <input aria-label={`Calendar point ${index + 1} value`} type="number" value={point.value} onChange={e => updateCalendarPoint(index, "value", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                        <button aria-label={`Remove calendar point ${index + 1}`} disabled={specialData.calendarHeatmap.length <= 1} onClick={() => removeCalendarPoint(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addCalendarPoint} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add date</button>
                </div>
              ) : activeChartPolicy.dataEditor === "hierarchy" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>ID와 Parent ID로 계층을 구성합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ maxHeight: 310, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ minWidth: 480 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "110px 120px 110px 80px 30px", padding: 6, gap: 5, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                        {["ID", "Name", "Parent ID", "Value", ""].map((heading, index) => <span key={index} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                      </div>
                      {specialData.hierarchy.map((row, index) => (
                        <div key={row.id + index} style={{ display: "grid", gridTemplateColumns: "110px 120px 110px 80px 30px", padding: "5px 6px", gap: 5, borderBottom: index < specialData.hierarchy.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                          {(["id", "name", "parentId"] as const).map(field => (
                            <input key={field} aria-label={`Hierarchy row ${index + 1} ${field}`} value={row[field]} onChange={e => updateHierarchyRow(index, field, e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          ))}
                          <input aria-label={`Hierarchy row ${index + 1} value`} type="number" value={row.value} onChange={e => updateHierarchyRow(index, "value", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                          <button aria-label={`Remove hierarchy row ${index + 1}`} disabled={specialData.hierarchy.length <= 1} onClick={() => removeHierarchyRow(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={addHierarchyRow} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add hierarchy node</button>
                </div>
              ) : activeChartPolicy.dataEditor === "network" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>노드와 연결을 함께 편집합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: subText }}>Nodes</div>
                  <div style={{ maxHeight: 170, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    {activeNetworkNodes.map((node, index) => (
                      <div key={node.id} style={{ display: "grid", gridTemplateColumns: "1fr 95px 30px", padding: "5px 6px", gap: 5, borderBottom: index < activeNetworkNodes.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                        <input aria-label={`Network node ${index + 1} name`} value={node.name} onChange={e => updateNetworkNode(index, "name", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                        <input aria-label={`Network node ${index + 1} category`} value={node.category} onChange={e => updateNetworkNode(index, "category", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                        <button aria-label={`Remove network node ${index + 1}`} disabled={activeNetworkNodes.length <= 1} onClick={() => removeNetworkNode(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addNetworkNode} style={{ height: 29, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 10.5, cursor: "pointer" }}><Plus size={10} style={{ verticalAlign: -1 }} /> Add node</button>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: subText }}>Links</div>
                  <div style={{ maxHeight: 190, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    {activeNetworkLinks.map((link, index) => (
                      <div key={link.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 70px 30px", padding: "5px 6px", gap: 5, borderBottom: index < activeNetworkLinks.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                        {(["source", "target"] as const).map(field => (
                          <select key={field} aria-label={`Network link ${index + 1} ${field}`} value={link[field]} onChange={e => updateNetworkLink(index, field, e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 4px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10 }}>
                            {activeNetworkNodes.map(node => <option key={node.id} value={node.name}>{node.name}</option>)}
                          </select>
                        ))}
                        <input aria-label={`Network link ${index + 1} value`} type="number" value={link.value} onChange={e => updateNetworkLink(index, "value", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                        <button aria-label={`Remove network link ${index + 1}`} onClick={() => removeNetworkLink(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addNetworkLink} disabled={activeNetworkNodes.length < 2} style={{ height: 29, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 10.5, cursor: "pointer" }}><Plus size={10} style={{ verticalAlign: -1 }} /> Add link</button>
                </div>
              ) : activeChartPolicy.dataEditor === "geo" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>GeoJSON 지역명과 지표 값을 편집합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ maxHeight: 310, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px 30px", padding: 6, gap: 5, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                      {["Region", "Value", "Secondary", ""].map((heading, index) => <span key={index} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                    </div>
                    {specialData.geoRegions.map((region, index) => (
                      <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px 30px", padding: "5px 6px", gap: 5, borderBottom: index < specialData.geoRegions.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                        <input aria-label={`Geo region ${index + 1} name`} value={region.name} onChange={e => updateGeoRegion(index, "name", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                        {(["value", "secondary"] as const).map(field => <input key={field} aria-label={`Geo region ${index + 1} ${field}`} type="number" value={region[field]} onChange={e => updateGeoRegion(index, field, e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />)}
                        <button aria-label={`Remove geo region ${index + 1}`} disabled={specialData.geoRegions.length <= 1} onClick={() => removeGeoRegion(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addGeoRegion} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add region</button>
                </div>
              ) : activeChartPolicy.dataEditor === "geo-route" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>경로 순서와 경도·위도를 편집합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  <div style={{ maxHeight: 310, overflow: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 92px 92px 30px", padding: 6, gap: 5, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                      {["Point", "Longitude", "Latitude", ""].map((heading, index) => <span key={index} style={{ fontSize: 9.5, color: subText, textAlign: "center" }}>{heading}</span>)}
                    </div>
                    {specialData.geoRoute.map((point, index) => (
                      <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 92px 92px 30px", padding: "5px 6px", gap: 5, borderBottom: index < specialData.geoRoute.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                        <input aria-label={`Geo route point ${index + 1} name`} value={point.name} onChange={e => updateGeoRoutePoint(index, "name", e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />
                        {(["longitude", "latitude"] as const).map(field => <input key={field} aria-label={`Geo route point ${index + 1} ${field}`} type="number" step="0.0001" value={point[field]} onChange={e => updateGeoRoutePoint(index, field, e.target.value)} style={{ minWidth: 0, height: 29, padding: "0 6px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 10.5 }} />)}
                        <button aria-label={`Remove geo route point ${index + 1}`} disabled={specialData.geoRoute.length <= 2} onClick={() => removeGeoRoutePoint(index)} style={{ border: "none", background: "transparent", color: subText, cursor: "pointer" }}><Trash2 size={11} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addGeoRoutePoint} style={{ height: 31, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}><Plus size={11} style={{ verticalAlign: -1 }} /> Add route point</button>
                </div>
              ) : activeChartPolicy.dataEditor === "generator" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: subText }}>대용량 데이터의 크기와 패턴을 생성합니다.</span>
                    <button onClick={resetSpecialSample} style={{ border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>Reset sample</button>
                  </div>
                  {([
                    ["Seed", "seed", 1, 999999],
                    ...(chartType === "heat-large" ? [["Width", "heatWidth", 10, 200], ["Height", "heatHeight", 10, 200]] : []),
                    ...(chartType === "lines-ny" ? [["Street density", "lineGrid", 10, 180], ["Canvas span", "lineSpan", 100, 10000]] : []),
                    ...(chartType === "large-scale-area" ? [["Point count", "areaPoints", 100, 20000], ["Volatility", "areaVolatility", 1, 100]] : []),
                  ] as [string, keyof GeneratorSettings, number, number][]).map(([label, field, min, max]) => (
                    <label key={field} style={{ display: "grid", gridTemplateColumns: "1fr 100px", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11.5, color: sectionText }}>{label}</span>
                      <input aria-label={`Generator ${label}`} type="number" min={min} max={max} value={specialData.generator[field]} onChange={e => updateGeneratorSetting(field, e.target.value)}
                        style={{ width: "100%", height: 31, padding: "0 8px", boxSizing: "border-box", borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontSize: 11.5, outline: "none" }} />
                    </label>
                  ))}
                  <div style={{ padding: "8px 10px", borderRadius: 7, background: isDark ? "#171725" : "#F8FAFC", color: subText, fontSize: 10.5 }}>
                    {chartType === "heat-large" && `${(Math.round(specialData.generator.heatWidth) + 1) * (Math.round(specialData.generator.heatHeight) + 1)} cells`}
                    {chartType === "lines-ny" && `~${Math.round(2 * (Math.round(specialData.generator.lineGrid) + 1) * Math.round(specialData.generator.lineGrid) * 0.36)} street segments`}
                    {chartType === "large-scale-area" && `${Math.round(specialData.generator.areaPoints)} time-series points`}
                  </div>
                  <div style={{ fontSize: 10.5, lineHeight: 1.45, color: subText }}>같은 Seed는 화면·PNG·SVG에서 같은 데이터를 생성합니다.</div>
                  {chartType === "lines-ny" && (
                    <div style={{ fontSize: 10.5, lineHeight: 1.45, color: subText }}>
                      공식 예제의 대용량 `lines` 렌더링 방식을 유지하되, 외부 32개 바이너리 파일 대신 로컬에서 맨해튼형 도로망을 생성합니다.
                    </div>
                  )}
                </div>
              ) : activeChartPolicy.dataEditor === "single-value" ? (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: subText, marginBottom: 8 }}>Value</div>
                  <input type="number" value={datasets[0]?.data[0] ?? ""} onChange={e => { const n = parseFloat(e.target.value); setDatasets(p => p.map((d, i) => i !== 0 ? d : { ...d, data: d.data.length ? d.data.map((v, j) => j === 0 ? (isNaN(n) ? v : n) : v) : [isNaN(n) ? 0 : n] })); }}
                    style={{ width: "100%", height: 32, padding: "0 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, outline: "none", background: inputBg, color: sectionText, fontFamily: "Inter" }} />
                </div>
              ) : activeChartPolicy.dataEditor === "multi-value" ? (
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
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ fontSize: 11.5, color: subText, lineHeight: 1.45 }}>
                      {chartType === "line-aqi"
                        ? "공식 예제처럼 AQI 라인 1개를 사용합니다. 오른쪽 6개 색상은 시리즈 범례가 아니라 값 구간 기준입니다."
                        : Y_AXIS_CATEGORY_CHARTS.has(chartType)
                          ? "행마다 Y 범주와 X 값을 함께 편집합니다."
                          : chartType === "line-bump"
                            ? "각 X 시점의 값을 오름차순으로 #1부터 다시 계산합니다. Y Series는 비교 대상입니다."
                            : TWO_DATASET_CHARTS.has(chartType)
                              ? "이 차트는 서로 다른 역할의 Y Series 2개를 사용합니다."
                              : FIRST_DATASET_ONLY_CHARTS.has(chartType)
                                ? "이 차트는 X 범주와 Y Series 1개를 사용합니다."
                                : "행마다 X 범주와 각 Y 시리즈 값을 함께 편집합니다."}
                    </div>
                    {OFFICIAL_CATEGORY_SAMPLE_CHARTS.has(chartType) && (
                      <button onClick={resetCategorySample} style={{ flexShrink: 0, border: "none", background: "none", color: "#6366F1", fontSize: 10.5, cursor: "pointer" }}>
                        Reset sample
                      </button>
                    )}
                  </div>
                  <div style={{ overflowX: "auto", border: `1px solid ${inputBorder}`, borderRadius: 8 }}>
                    <div style={{ minWidth: 128 + editableDatasets.length * 112 }}>
                      <div style={{ display: "grid", gridTemplateColumns: `112px repeat(${editableDatasets.length}, 112px) 34px`, gap: 0, background: isDark ? "#171725" : "#F8FAFC", borderBottom: `1px solid ${inputBorder}` }}>
                        <div style={{ padding: "8px", fontSize: 11, fontWeight: 600, color: subText }}>
                          {Y_AXIS_CATEGORY_CHARTS.has(chartType) ? "Y Category" : "X Category"}
                        </div>
                        {editableDatasets.map((ds, di) => (
                          <div key={ds.id} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 6px", borderLeft: `1px solid ${inputBorder}` }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: effectivePalette[di % effectivePalette.length], flexShrink: 0 }} />
                            <input
                              aria-label={`Series ${di + 1} name`}
                              value={ds.name}
                              onChange={e => updateDatasetName(ds.id, e.target.value)}
                              style={{ width: "100%", minWidth: 0, height: 25, border: "none", background: "transparent", outline: "none", color: sectionText, fontSize: 11, fontWeight: 600, fontFamily: "Inter" }}
                            />
                            {di > 0 && editableDatasets.length > datasetMinimum && (
                              <button aria-label={`Remove ${ds.name}`} onClick={() => setDatasets(p => p.filter(d => d.id !== ds.id))} style={{ display: "flex", padding: 0, border: "none", background: "none", color: subText, cursor: "pointer" }}>
                                <X size={11} />
                              </button>
                            )}
                          </div>
                        ))}
                        <div />
                      </div>
                      {labels.map((label, rowIndex) => (
                        <div key={rowIndex} style={{ display: "grid", gridTemplateColumns: `112px repeat(${editableDatasets.length}, 112px) 34px`, borderBottom: rowIndex < labels.length - 1 ? `1px solid ${inputBorder}` : "none" }}>
                          <input
                            aria-label={`Category ${rowIndex + 1}`}
                            value={label}
                            onChange={e => updateDataPointLabel(rowIndex, e.target.value)}
                            style={{ height: 34, minWidth: 0, padding: "0 8px", border: "none", outline: "none", background: inputBg, color: sectionText, fontSize: 11, fontFamily: "Inter" }}
                          />
                          {editableDatasets.map(ds => (
                            <input
                              key={ds.id}
                              aria-label={`${ds.name} value for ${label}`}
                              type="number"
                              value={ds.data[rowIndex] ?? ""}
                              onChange={e => updateDatasetValue(ds.id, rowIndex, e.target.value)}
                              style={{ height: 34, minWidth: 0, padding: "0 8px", borderTop: "none", borderRight: "none", borderBottom: "none", borderLeft: `1px solid ${inputBorder}`, outline: "none", background: inputBg, color: sectionText, fontSize: 11, fontFamily: "Inter" }}
                            />
                          ))}
                          <button aria-label={`Remove ${label}`} onClick={() => removeDataPoint(rowIndex)} style={{ display: "flex", alignItems: "center", justifyContent: "center", borderTop: "none", borderRight: "none", borderBottom: "none", borderLeft: `1px solid ${inputBorder}`, background: inputBg, color: subText, cursor: "pointer" }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    <button onClick={addDataPoint} style={{ flex: "1 1 110px", height: 32, borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: inputBg, color: subText }}>
                      <Plus size={12} />+ {Y_AXIS_CATEGORY_CHARTS.has(chartType) ? "Y Category" : "X Category"}
                    </button>
                    {canAddDataset && (
                      <button onClick={addDataset} style={{ flex: "1 1 110px", height: 32, borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: inputBg, color: subText }}>
                        <Plus size={12} />+ {Y_AXIS_CATEGORY_CHARTS.has(chartType) ? "X" : "Y"} Series
                      </button>
                    )}
                    <button onClick={randomizeData} style={{ flex: "1 1 110px", height: 32, borderRadius: 6, border: "none", fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: isDark ? "#2D2B5C" : "#EEF2FF", color: "#6366F1" }}>
                      <Shuffle size={12} />Random Data
                    </button>
                  </div>
                </div>
              )}
              {activeChartPolicy.dataEditor !== "preset" && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${inputBorder}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: dataToolMode === "closed" ? 0 : 9 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: sectionText }}>Data tools</span>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button onClick={() => openDataTool("csv")} style={{ height: 27, padding: "0 8px", borderRadius: 5, border: `1px solid ${dataToolMode === "csv" ? "#6366F1" : inputBorder}`, background: dataToolMode === "csv" ? (isDark ? "#2D2B5C" : "#EEF2FF") : inputBg, color: dataToolMode === "csv" ? "#6366F1" : subText, fontSize: 10.5, cursor: "pointer" }}>CSV</button>
                      <button onClick={() => openDataTool("json")} style={{ height: 27, padding: "0 8px", borderRadius: 5, border: `1px solid ${dataToolMode === "json" ? "#6366F1" : inputBorder}`, background: dataToolMode === "json" ? (isDark ? "#2D2B5C" : "#EEF2FF") : inputBg, color: dataToolMode === "json" ? "#6366F1" : subText, fontSize: 10.5, cursor: "pointer" }}>JSON</button>
                      <button onClick={() => csvFileInputRef.current?.click()} style={{ height: 27, padding: "0 8px", borderRadius: 5, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 10.5, cursor: "pointer" }}>Upload CSV</button>
                      <input ref={csvFileInputRef} type="file" accept=".csv,text/csv" onChange={e => { handleCsvFile(e.target.files?.[0]); e.currentTarget.value = ""; }} style={{ display: "none" }} />
                    </div>
                  </div>
                  {dataToolMode !== "closed" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      <div style={{ fontSize: 10.5, color: subText }}>
                        {dataToolMode === "csv" ? "현재 차트 스키마의 CSV를 편집하거나 파일 내용을 붙여넣으세요." : "현재 차트 데이터를 JSON으로 직접 편집합니다."}
                      </div>
                      <textarea
                        aria-label={`${dataToolMode.toUpperCase()} data editor`}
                        value={dataToolText}
                        onChange={e => { setDataToolText(e.target.value); setDataToolError(null); }}
                        spellCheck={false}
                        style={{ width: "100%", minHeight: 180, maxHeight: 320, resize: "vertical", boxSizing: "border-box", padding: 9, borderRadius: 7, border: `1px solid ${dataToolError ? "#ef4444" : inputBorder}`, outline: "none", background: isDark ? "#11111D" : "#F8FAFC", color: sectionText, fontSize: 10.5, lineHeight: 1.45, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      />
                      {dataToolError && <div style={{ padding: "6px 8px", borderRadius: 6, background: isDark ? "rgba(239,68,68,.12)" : "#FEF2F2", color: "#ef4444", fontSize: 10.5, lineHeight: 1.4 }}>{dataToolError}</div>}
                      <div style={{ display: "flex", gap: 7 }}>
                        <button onClick={dataToolMode === "csv" ? applyCsvData : applyJsonData} style={{ flex: 1, height: 31, border: "none", borderRadius: 6, background: "#6366F1", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Apply {dataToolMode.toUpperCase()}</button>
                        <button onClick={() => { setDataToolMode("closed"); setDataToolError(null); }} style={{ height: 31, padding: "0 10px", borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, fontSize: 11, cursor: "pointer" }}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Section>

            {/* Style Settings */}
            <Section title="Style Settings" id="style" collapsed={collapsed.has("style")} onToggle={toggleSection} isDark={isDark}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {SMOOTHABLE_CHARTS.has(chartType) && (
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
                )}
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
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: sectionText }}>Auto Palette</span>
                    <span style={{ fontSize: 10, color: subText }}>{activeChartPolicy.colorPolicy}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    {effectivePalette.map((color, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        <button
                          type="button"
                          aria-label={`Edit palette color ${i + 1}`}
                          title={`${manualPalette[i] ? "Custom" : "Generated"} color ${i + 1}: ${color}`}
                          disabled={isPaletteLocked}
                          onClick={() => openPalettePicker(i)}
                          style={{ position: "relative", width: 32, height: 32, padding: 0, borderRadius: 7, background: color, border: `2px solid ${activePaletteIndex === i || manualPalette[i] ? "#6366F1" : inputBorder}`, cursor: isPaletteLocked ? "not-allowed" : "pointer", opacity: isPaletteLocked ? 0.42 : 1, boxShadow: activePaletteIndex === i ? "0 0 0 2px rgba(99,102,241,.18)" : "none" }}
                        >
                          {manualPalette[i] && <span style={{ position: "absolute", right: 2, top: 2, width: 6, height: 6, borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 1px rgba(0,0,0,.25)" }} />}
                        </button>
                        {activePaletteIndex === i && (
                          <div
                            onMouseDown={e => e.stopPropagation()}
                            style={{ position: "absolute", zIndex: 30, top: 38, ...(i >= 4 ? { right: 0 } : { left: 0 }), width: 210, padding: 10, borderRadius: 9, border: `1px solid ${inputBorder}`, background: isDark ? "#181827" : "#fff", boxShadow: "0 10px 30px rgba(15,23,42,.18)" }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
                              <span style={{ fontSize: 11.5, fontWeight: 600, color: sectionText }}>Palette color {i + 1}</span>
                              <span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 9.5, background: manualPalette[i] ? (isDark ? "#2D2B5C" : "#EEF2FF") : (isDark ? "#272736" : "#F3F4F6"), color: manualPalette[i] ? "#818CF8" : subText }}>
                                {manualPalette[i] ? "Custom" : "Generated"}
                              </span>
                            </div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                              <input
                                aria-label={`Choose palette color ${i + 1}`}
                                type="color"
                                value={color}
                                onChange={e => {
                                  setPaletteHexInput(e.target.value);
                                  setPaletteOverride(i, e.target.value);
                                }}
                                style={{ width: 36, height: 32, padding: 2, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, cursor: "pointer" }}
                              />
                              <input
                                aria-label={`Palette color ${i + 1} hex value`}
                                value={paletteHexInput}
                                maxLength={7}
                                onChange={e => {
                                  setPaletteHexInput(e.target.value);
                                  setPaletteOverride(i, e.target.value);
                                }}
                                style={{ flex: 1, minWidth: 0, height: 32, padding: "0 8px", borderRadius: 6, border: `1px solid ${inputBorder}`, outline: "none", background: inputBg, color: sectionText, fontSize: 12, fontFamily: "monospace" }}
                              />
                            </div>
                            <button
                              type="button"
                              disabled={!manualPalette[i]}
                              onClick={() => resetPaletteColor(i)}
                              style={{ width: "100%", height: 28, marginTop: 8, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: manualPalette[i] ? subText : (isDark ? "#4B4B5D" : "#CBD5E1"), fontSize: 10.5, cursor: manualPalette[i] ? "pointer" : "default" }}
                            >
                              Reset this color
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      title="Reset all palette colors"
                      disabled={isPaletteLocked}
                      onClick={() => { setPalette(generatePalette(primaryColor)); setManualPalette([]); setActivePaletteIndex(null); }}
                      style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${inputBorder}`, background: inputBg, color: subText, cursor: isPaletteLocked ? "not-allowed" : "pointer", opacity: isPaletteLocked ? 0.42 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <RefreshCw size={12} />
                    </button>
                  </div>
                  {isPaletteLocked && (
                    <div style={{ marginTop: 7, fontSize: 10.5, lineHeight: 1.45, color: subText }}>
                      이 차트는 공식 예제의 의미 색상을 고정해서 사용합니다. Primary/Palette는 다른 차트에 전환하면 적용됩니다.
                    </div>
                  )}
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
          {MAP_CHART_IDS.has(chartType) && mapStatus !== "ready" ? (
            mapStatus === "error" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: subText, fontFamily: "Inter", fontSize: 13 }}>
                <span>지도 데이터를 불러오지 못했어요.</span>
                <button onClick={() => setMapRetryToken(t => t + 1)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: `1px solid ${inputBorder}`, background: inputBg, color: sectionText, fontFamily: "Inter", fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={13} /> 다시 시도
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: subText, fontFamily: "Inter", fontSize: 13 }}>
                <RefreshCw size={15} className="animate-spin" /> 지도 불러오는 중...
              </div>
            )
          ) : (
            <EChartsView option={echartsOption} size={chartSize} theme={theme} exportRef={echartsExportRef} />
          )}
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
