# Map Data Attributions

## USA.json

- **Source repo**: https://github.com/apache/echarts-examples (branch: `gh-pages`)
- **Source path**: `public/data/asset/geo/USA.json`
- **Commit SHA**: `5a85bfb6bb5511b91fde1d70f94fe04b79532a89` (2016-11-23)
- **Fetched**: 2026-07-23
- **License**: Apache License 2.0 (full text vendored at `../licenses/Apache-2.0.txt`)
- **Modifications**: none — file copied verbatim from the pinned commit
- **Usage**: registered with `echarts.registerMap("USA", ...)` for USA-map-based chart examples (Population Estimates, Geo Graph, Mini Bars + Geo Matrix). Alaska/Hawaii/Puerto Rico inset positioning (`specialAreas`) is supplied at registration time in application code, not stored in this file — see `USA_SPECIAL_AREAS` in `src/app/App.tsx`.
