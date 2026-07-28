import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MAP_DIR = path.join(ROOT, "public", "maps");
const DATA_DIR = path.join(ROOT, "public", "data", "korea-roads");
const COUNTRY_URL = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
const ROAD_QUERY_URL = "https://services-ap1.arcgis.com/iA7fZQOnjY9D67Zx/arcgis/rest/services/OSM_AS_Highways/FeatureServer/0/query";
const PAGE_SIZE = 2000;
const CONCURRENCY = 12;

const MAINLAND_AND_JEJU_BBOX = "125.7,33,130,38.7";
const ROAD_GROUPS = [
  {
    id: "major",
    where: "highway in ('motorway','motorway_link','trunk','trunk_link','primary','primary_link')",
    boxes: [MAINLAND_AND_JEJU_BBOX],
    tolerance: 0.00005,
  },
  {
    id: "arterial",
    where: "highway in ('secondary','secondary_link')",
    boxes: [MAINLAND_AND_JEJU_BBOX],
    tolerance: 0.00012,
  },
  {
    id: "local",
    where: "highway in ('tertiary','tertiary_link')",
    boxes: [MAINLAND_AND_JEJU_BBOX],
    tolerance: 0.00022,
  },
  {
    id: "urban",
    where: "highway in ('residential','living_street')",
    boxes: [
      "126.55,37.2,127.5,37.9",
      "128.75,35,129.45,35.75",
      "128.35,35.65,129,36.1",
      "127.1,36.1,127.8,36.9",
      "126.65,35,127.05,35.35",
      "126.1,33.1,126.95,33.65",
    ],
    tolerance: 0.0001,
  },
];

async function fetchJson(url, request = {}, attempt = 1) {
  const response = await fetch(url, {
    ...request,
    headers: {
      "user-agent": "ChartPro Korea Streets data builder",
      ...(request.headers ?? {}),
    },
  });
  if (!response.ok) {
    if (attempt < 4) {
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      return fetchJson(url, request, attempt + 1);
    }
    throw new Error(`Request failed (${response.status}): ${url}`);
  }
  const result = await response.json();
  if (result.error) throw new Error(JSON.stringify(result.error));
  return result;
}

function makeQuery(params) {
  const url = new URL(ROAD_QUERY_URL);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
  return url.toString();
}

function pointInRing([x, y], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function pointInPolygon(point, polygon) {
  if (!polygon.length || !pointInRing(point, polygon[0])) return false;
  return !polygon.slice(1).some(hole => pointInRing(point, hole));
}

function pointInMultiPolygon(point, multiPolygon) {
  return multiPolygon.some(polygon => pointInPolygon(point, polygon));
}

function perpendicularDistance(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const t = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(point[0] - (start[0] + t * dx), point[1] - (start[1] + t * dy));
}

function simplifyLine(points, tolerance) {
  if (points.length <= 2) return points;
  let maxDistance = 0;
  let splitIndex = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const distance = perpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (distance > maxDistance) {
      maxDistance = distance;
      splitIndex = i;
    }
  }
  if (maxDistance <= tolerance) return [points[0], points[points.length - 1]];
  const left = simplifyLine(points.slice(0, splitIndex + 1), tolerance);
  const right = simplifyLine(points.slice(splitIndex), tolerance);
  return [...left.slice(0, -1), ...right];
}

function featureLines(feature) {
  if (feature.geometry?.type === "LineString") return [feature.geometry.coordinates];
  if (feature.geometry?.type === "MultiLineString") return feature.geometry.coordinates;
  return [];
}

async function mapConcurrent(items, limit, task) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await task(items[index], index);
    }
  });
  await Promise.all(workers);
}

async function fetchObjectIds(where, box) {
  const data = await fetchJson(makeQuery({
    where,
    geometry: box,
    geometryType: "esriGeometryEnvelope",
    inSR: 4326,
    spatialRel: "esriSpatialRelIntersects",
    returnIdsOnly: true,
    f: "json",
  }));
  return data.objectIds ?? [];
}

async function fetchRoadGroup(group, countryPolygons) {
  const ids = new Set();
  for (const box of group.boxes) {
    const boxIds = await fetchObjectIds(group.where, box);
    boxIds.forEach(id => ids.add(id));
  }
  const pages = [];
  const allIds = [...ids];
  for (let i = 0; i < allIds.length; i += PAGE_SIZE) pages.push(allIds.slice(i, i + PAGE_SIZE));

  const lines = [];
  let completed = 0;
  console.log(`${group.id}: ${allIds.length.toLocaleString()} source features in ${pages.length} pages`);
  await mapConcurrent(pages, CONCURRENCY, async pageIds => {
    const body = new URLSearchParams({
      objectIds: pageIds.join(","),
      outFields: "highway",
      returnGeometry: "true",
      outSR: "4326",
      f: "geojson",
    });
    const data = await fetchJson(ROAD_QUERY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
    });
    for (const feature of data.features ?? []) {
      for (const coordinates of featureLines(feature)) {
        if (coordinates.length < 2 || !coordinates.some(point => pointInMultiPolygon(point, countryPolygons))) continue;
        const simplified = simplifyLine(coordinates, group.tolerance)
          .map(([lon, lat]) => [Math.round(lon * 100000), Math.round(lat * 100000)]);
        const deduped = simplified.filter((point, index) =>
          index === 0 || point[0] !== simplified[index - 1][0] || point[1] !== simplified[index - 1][1]
        );
        if (deduped.length >= 2) lines.push(deduped);
      }
    }
    completed++;
    if (completed % 10 === 0 || completed === pages.length) {
      console.log(`${group.id}: ${completed}/${pages.length} pages`);
    }
  });
  return lines;
}

function encodeRoadLines(lines) {
  const pointCount = lines.reduce((total, line) => total + line.length, 0);
  const buffer = Buffer.allocUnsafe(12 + lines.length * 4 + pointCount * 8);
  buffer.write("KRD1", 0, "ascii");
  buffer.writeUInt32LE(lines.length, 4);
  buffer.writeUInt32LE(pointCount, 8);
  let offset = 12;
  for (const line of lines) {
    buffer.writeUInt32LE(line.length, offset);
    offset += 4;
    for (const [lon, lat] of line) {
      buffer.writeInt32LE(lon, offset);
      buffer.writeInt32LE(lat, offset + 4);
      offset += 8;
    }
  }
  return { buffer, pointCount };
}

async function main() {
  await fs.mkdir(MAP_DIR, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });

  console.log("Downloading public-domain South Korea boundary…");
  const countries = await fetchJson(COUNTRY_URL);
  const korea = countries.features.find(feature => feature.properties?.["ISO3166-1-Alpha-3"] === "KOR");
  if (!korea || korea.geometry.type !== "MultiPolygon") throw new Error("South Korea boundary not found");
  const koreaMap = {
    type: "FeatureCollection",
    features: [{
      ...korea,
      properties: { name: "대한민국", source: "Natural Earth" },
    }],
  };
  await fs.writeFile(path.join(MAP_DIR, "KOR.json"), `${JSON.stringify(koreaMap)}\n`);

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    coordinateScale: 100000,
    source: "OpenStreetMap via Esri OSM Highways feature service",
    attribution: "© OpenStreetMap contributors",
    license: "ODbL 1.0",
    groups: [],
  };

  for (const group of ROAD_GROUPS) {
    const lines = await fetchRoadGroup(group, korea.geometry.coordinates);
    const { buffer, pointCount } = encodeRoadLines(lines);
    const file = `${group.id}.bin`;
    await fs.writeFile(path.join(DATA_DIR, file), buffer);
    manifest.groups.push({
      id: group.id,
      file,
      lines: lines.length,
      points: pointCount,
      bytes: buffer.byteLength,
    });
    console.log(`${group.id}: wrote ${lines.length.toLocaleString()} lines, ${pointCount.toLocaleString()} points, ${(buffer.byteLength / 1024 / 1024).toFixed(1)} MiB`);
  }

  await fs.writeFile(path.join(DATA_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log("Korea road assets complete.");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
