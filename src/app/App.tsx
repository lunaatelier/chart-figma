import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import * as echarts from "echarts";
import { ChevronDown, ChevronUp, Plus, X, Trash2, Download, RefreshCw, Shuffle, Edit2, Check, Sun, Moon } from "lucide-react";

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
const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

// ─── Size Presets ─────────────────────────────────────────────────────────────
const SIZE_PRESETS: Record<SizePreset, { w: number; h: number }> = {
  S: { w: 300, h: 200 }, M: { w: 800, h: 500 }, L: { w: 1200, h: 700 }, Custom: { w: 800, h: 500 },
};

// ─── ECharts Chart Catalogue ──────────────────────────────────────────────────
export const ECHARTS_CATALOGUE = [
  {
    cat: "Line", items: [
      { id: "line-basic", label: "Basic Line" },
      { id: "line-stacked", label: "Stacked Line" },
      { id: "line-area-stacked", label: "Stacked Area" },
      { id: "line-bump", label: "Bump Chart" },
      { id: "line-confidence", label: "Confidence Band" },
      { id: "line-step", label: "Step Line" },
      { id: "line-area-time", label: "Area + Time" },
      { id: "line-multiple-x", label: "Multiple X Axes" },
      { id: "line-rainfall", label: "Rainfall" },
      { id: "line-datazoom", label: "DataZoom" },
      { id: "line-dynamic", label: "Dynamic Data" },
      { id: "line-aqi", label: "Beijing AQI" },
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
    ],
  },
  {
    cat: "Heatmap", items: [
      { id: "heat-cartesian", label: "Cartesian" },
      { id: "heat-calendar", label: "Calendar" },
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
    ],
  },
  {
    cat: "Special", items: [
      { id: "pictorial-bar", label: "Pictorial Bar" },
      { id: "share-dataset", label: "Share Dataset" },
    ],
  },
];


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

function genOHLC(count: number) {
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

    case "line-stacked": {
      const vals = datasets.map(ds => ds.data);
      return {
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip, grid,
        xAxis: { type: "category", data: userLabels, ...axisTick },
        yAxis: { type: "value", ...axisTick },
        series: datasets.map((ds, i) => ({
          name: ds.name, type: "line", stack: "total", data: ds.data,
          lineStyle: { width: 2 }, itemStyle: { color: palette[i % palette.length] },
        })),
      };
    }

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
          { name: "Upper", type: "line", data: upper, lineStyle: { opacity: 0 }, stack: "confidence", symbol: "none", color: "transparent" },
          { name: "Band", type: "line", data: lower.map((v, i) => upper[i] - v), lineStyle: { opacity: 0 }, areaStyle: { color: palette[0] + "40" }, stack: "confidence", symbol: "none", color: "transparent" },
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
        legend: { ...legend, data: ["Evaporation", "Precipitation"] },
        grid,
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
        backgroundColor: bg, color: palette, title: titleCfg, legend, tooltip: { ...tooltip, trigger: "axis", axisPointer: { type: "cross" } }, grid,
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
      const countries = ["🇺🇸 USA", "🇨🇳 China", "🇯🇵 Japan", "🇩🇪 Germany", "🇬🇧 UK", "🇫🇷 France", "🇮🇳 India"];
      const vals = countries.map(() => rand(20, 100)).sort((a, b) => a - b);
      return {
        backgroundColor: bg, color: palette, title: { ...titleCfg, text: title || "Bar Race Snapshot" },
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { ...grid, left: 110, right: 60 },
        xAxis: { max: "dataMax", ...axisTick },
        yAxis: { type: "category", data: countries, animationDuration: 300, animationDurationUpdate: 1500, ...axisTick },
        series: [{ realtimeSort: true, type: "bar", data: vals, label: { show: true, position: "right", color: fg, fontFamily: "Inter", fontSize: 11 }, itemStyle: { color: (p: any) => palette[p.dataIndex % palette.length] }, barMaxWidth: 36 }],
        animationDuration: 0, animationDurationUpdate: 2000, animationEasing: "linear", animationEasingUpdate: "linear",
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
        xAxis: { type: "value", ...axisTick },
        yAxis: { type: "value", ...axisTick },
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
        grid: { ...gridFull, top: title ? 60 : 40, bottom: 60, left: yAxisLabelWidth(days) },
        xAxis: { type: "category", data: hours, ...axisTick, splitLine: { show: true, lineStyle: { color: axisC } } },
        yAxis: { type: "category", data: days, ...axisTick, splitLine: { show: true, lineStyle: { color: axisC } } },
        series: [{ type: "scatter", data: data.map(([h, d, s]) => ({ value: [h, d], symbolSize: s * 4, itemStyle: { color: palette[d % palette.length], opacity: 0.7 } })) }],
        legend: { show: false },
      };
    }

    // ── CANDLESTICK ───────────────────────────────────────────────────────
    case "candle-basic":
    case "candle-large": {
      const count = chartId === "candle-large" ? 120 : 40;
      const ohlc = genOHLC(count);
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
      return {
        backgroundColor: bg, color: palette, title: titleCfg,
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        legend,
        dataset: { source: [["product", ...datasets.map(d => d.name)], ...userLabels.map((l, i) => [l, ...datasets.map(d => d.data[i] ?? 0)])] },
        grid: [
          { left: 48, right: legendBottom ? 12 : 96, top: title ? 52 : 20, bottom: "55%", containLabel: true },
          { left: 48, right: legendBottom ? 12 : 96, top: "55%", bottom: 28, containLabel: true },
        ],
        xAxis: [
          { type: "category", gridIndex: 0, ...axisTick },
          { type: "category", gridIndex: 1, ...axisTick },
        ],
        yAxis: [{ gridIndex: 0, ...axisTick }, { gridIndex: 1, ...axisTick }],
        series: [
          ...datasets.map((ds, i) => ({ type: "bar" as const, seriesLayoutBy: "column", xAxisIndex: 0, yAxisIndex: 0, barMaxWidth: 30, itemStyle: { color: palette[i % palette.length], borderRadius: [4, 4, 0, 0] } })),
          ...datasets.map((ds, i) => ({ type: "line" as const, seriesLayoutBy: "column", xAxisIndex: 1, yAxisIndex: 1, smooth: smoothLine, lineStyle: { color: palette[i % palette.length], width: 2 }, itemStyle: { color: palette[i % palette.length] } })),
        ],
      };
    }

    default:
      return { backgroundColor: bg, title: titleCfg, series: [] };
  }
}

// ─── Chart Type Icon ──────────────────────────────────────────────────────────
function ChartIcon({ type, color = "currentColor" }: { type: string; color?: string }) {
  const map: Record<string, React.ReactNode> = {
    bar: <path d="M3 20h18M5 20V10M9 20V6M13 20V13M17 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" />,
    line: <><path d="M3 17l4-8 4 4 4-6 4 4" stroke={color} strokeWidth="2" strokeLinecap="round" /><path d="M3 20h18" stroke={color} strokeWidth="2" /></>,
    doughnut: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" /></>,
    pie: <><path d="M12 2a10 10 0 1 0 10 10H12V2z" stroke={color} strokeWidth="2" /><path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="2" /></>,
    radar: <><polygon points="12,3 21,8.5 21,15.5 12,21 3,15.5 3,8.5" stroke={color} strokeWidth="2" /><polygon points="12,7 17,10 17,14 12,17 7,14 7,10" stroke={color} strokeWidth="1.5" /></>,
    area: <><path d="M3 17l4-6 4 3 4-5 4 3v5H3z" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
    scatter: <><circle cx="5" cy="17" r="2" fill={color} /><circle cx="9" cy="11" r="2" fill={color} /><circle cx="15" cy="7" r="2" fill={color} /><circle cx="18" cy="14" r="2" fill={color} /></>,
    polarArea: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" /><line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.5" /><line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.5" /></>,
    bubble: <><circle cx="7" cy="15" r="3" stroke={color} strokeWidth="2" /><circle cx="16" cy="8" r="4" stroke={color} strokeWidth="2" /><circle cx="14" cy="17" r="2" stroke={color} strokeWidth="2" /></>,
  };
  const getFallback = (id: string) => {
    if (id.startsWith("line")) return map.line;
    if (id.startsWith("bar")) return map.bar;
    if (id.startsWith("pie")) return map.pie;
    if (id.startsWith("scatter")) return map.scatter;
    if (id.startsWith("radar")) return map.radar;
    if (id.startsWith("candle")) return <><rect x="4" y="6" width="4" height="10" stroke={color} strokeWidth="1.5" /><line x1="6" y1="3" x2="6" y2="6" stroke={color} strokeWidth="1.5" /><line x1="6" y1="16" x2="6" y2="20" stroke={color} strokeWidth="1.5" /><rect x="14" y="9" width="4" height="8" stroke={color} strokeWidth="1.5" /><line x1="16" y1="4" x2="16" y2="9" stroke={color} strokeWidth="1.5" /><line x1="16" y1="17" x2="16" y2="21" stroke={color} strokeWidth="1.5" /></>;
    if (id.startsWith("heat")) return <><rect x="3" y="3" width="4" height="4" rx="0.5" fill={color} opacity="0.4" /><rect x="10" y="3" width="4" height="4" rx="0.5" fill={color} opacity="0.7" /><rect x="17" y="3" width="4" height="4" rx="0.5" fill={color} opacity="1" /><rect x="3" y="10" width="4" height="4" rx="0.5" fill={color} opacity="0.6" /><rect x="10" y="10" width="4" height="4" rx="0.5" fill={color} opacity="0.9" /><rect x="17" y="10" width="4" height="4" rx="0.5" fill={color} opacity="0.3" /></>;
    if (id.startsWith("gauge")) return <><path d="M4 15a8 8 0 1 1 16 0" stroke={color} strokeWidth="2" strokeLinecap="round" /><path d="M12 15l-3-5" stroke={color} strokeWidth="2" strokeLinecap="round" /></>;
    if (id.startsWith("tree") || id.startsWith("sankey")) return <><rect x="10" y="3" width="4" height="4" rx="1" fill={color} opacity="0.8" /><rect x="3" y="14" width="4" height="4" rx="1" fill={color} opacity="0.8" /><rect x="17" y="14" width="4" height="4" rx="1" fill={color} opacity="0.8" /><line x1="12" y1="7" x2="5" y2="14" stroke={color} strokeWidth="1.5" /><line x1="12" y1="7" x2="19" y2="14" stroke={color} strokeWidth="1.5" /></>;
    if (id.startsWith("funnel")) return <path d="M4 4h16M6 9h12M8 14h8M10 19h4" stroke={color} strokeWidth="2" strokeLinecap="round" />;
    return map.bar;
  };
  return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">{map[type] ?? getFallback(type)}</svg>;
}

// ─── ECharts Mount Hook ───────────────────────────────────────────────────────
function EChartsView({ option, size, theme, exportRef }: {
  option: echarts.EChartsOption; size: { w: number; h: number };
  theme: "light" | "dark"; exportRef: React.MutableRefObject<echarts.ECharts | null>;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const el = divRef.current; if (!el) return;
    instanceRef.current?.dispose();
    instanceRef.current = echarts.init(el, theme === "dark" ? "dark" : undefined);
    exportRef.current = instanceRef.current;
    return () => { instanceRef.current?.dispose(); instanceRef.current = null; exportRef.current = null; };
  }, [theme]);

  const optionKey = useMemo(() => JSON.stringify(option), [option]);
  useEffect(() => {
    if (!instanceRef.current) {
      const el = divRef.current; if (!el) return;
      instanceRef.current = echarts.init(el, theme === "dark" ? "dark" : undefined);
      exportRef.current = instanceRef.current;
    }
    instanceRef.current.resize({ width: size.w, height: size.h });
    instanceRef.current.setOption(option, { notMerge: true, lazyUpdate: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionKey, size.w, size.h]);

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
    setDatasets(prev => prev.map(ds => ({ ...ds, data: labels.map((_, i) => ds.data[i] ?? rand(20, 100)) })));
  }, [labels.length]);

  useEffect(() => {
    if (isValidHex(primaryColor)) { setPalette(generatePalette(primaryColor)); setManualPalette([]); }
  }, [primaryColor]);

  const toggleSection = useCallback((id: string) => {
    setCollapsed(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const randomizeData = () => setDatasets(prev => prev.map(ds => ({ ...ds, data: labels.map(() => rand(10, 100)) })));
  const addDataset = () => setDatasets(prev => [...prev, { id: Date.now().toString(), name: `Dataset ${prev.length + 1}`, data: labels.map(() => rand(20, 100)), color: effectivePalette[prev.length % effectivePalette.length] }]);
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

  const getSvgString = (): string | null => {
    const option = buildEChartsOption(chartType, labels, datasets, effectivePalette, theme, chartTitle, chartSize, autoResponsive, smoothLine);
    const exportOption = { ...option, animation: false, animationDuration: 0 };
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
    return wrapped;
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
    const s = getSvgString(); if (!s) return;
    const a = document.createElement("a"); a.download = "chart.svg"; a.href = URL.createObjectURL(new Blob([s], { type: "image/svg+xml;charset=utf-8" })); a.click();
    setOpenMenu(null);
  };

  const copySvg = async () => {
    const s = getSvgString(); if (!s) return;
    setOpenMenu(null);
    try {
      await navigator.clipboard.writeText(s);
      flashCopied("svg");
    } catch {
      // Clipboard blocked — show in-app modal so user can copy the text
      setPreviewModal({ type: "svg", content: s });
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
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: subText, marginBottom: 8 }}>X-Axis Labels</div>
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
                {datasets.map((ds, di) => (
                  <div key={ds.id}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: effectivePalette[di % effectivePalette.length] }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: subText, flex: 1 }}>{di === 0 ? "Y-Axis Values" : ds.name}</span>
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
                  <button onClick={addDataset} style={{ flex: 1, height: 32, borderRadius: 6, border: `1px solid ${inputBorder}`, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: inputBg, color: subText }}>
                    <Plus size={12} />+ Dataset
                  </button>
                </div>
              </div>
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
