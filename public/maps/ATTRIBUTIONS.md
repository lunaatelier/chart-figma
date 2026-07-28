# Map Data Attributions

## USA.json

- **Source repo**: https://github.com/apache/echarts-examples (branch: `gh-pages`)
- **Source path**: `public/data/asset/geo/USA.json`
- **Commit SHA**: `5a85bfb6bb5511b91fde1d70f94fe04b79532a89` (2016-11-23)
- **Fetched**: 2026-07-23
- **License**: Apache License 2.0 (full text vendored at `../licenses/Apache-2.0.txt`)
- **Modifications**: none — file copied verbatim from the pinned commit
- **Usage**: registered with `echarts.registerMap("USA", ...)` for USA-map-based chart examples (Population Estimates, Geo Graph, Mini Bars + Geo Matrix). Alaska/Hawaii/Puerto Rico inset positioning (`specialAreas`) is supplied at registration time in application code, not stored in this file — see `USA_SPECIAL_AREAS` in `src/app/App.tsx`.

## KOR.json

- **Source**: Natural Earth Admin 0 countries, distributed through `datasets/geo-countries`
- **Source URL**: https://github.com/datasets/geo-countries
- **Fetched**: 2026-07-28
- **License**: Public Domain / ODC-PDDL-1.0
- **Modifications**: extracted the Republic of Korea feature and renamed it `대한민국`
- **Usage**: registered with `echarts.registerMap("KOR", ...)` as the geographic coordinate system for Korea Streets.

## korea-roads/*.bin

- **Source**: OpenStreetMap highways via the Esri OSM Highways feature service
- **Source URL**: https://services-ap1.arcgis.com/iA7fZQOnjY9D67Zx/arcgis/rest/services/OSM_AS_Highways/FeatureServer/0
- **Generated**: 2026-07-28
- **License**: Open Data Commons Open Database License 1.0
- **Attribution**: © OpenStreetMap contributors
- **Modifications**: clipped to the Republic of Korea, grouped by road class, simplified, quantized to 5 decimal places, and encoded in the local `KRD1` binary format.
- **Usage**: loaded locally for the Korea Streets large-lines chart. The attribution is rendered inside the chart so it remains present in PNG and SVG exports.
