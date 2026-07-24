# Chart Data & Color System Plan

## 목적

ChartPro의 74개 ECharts 예제를 다음 원칙으로 통일한다.

1. 차트 선택 시 공식 예제의 구조와 샘플 데이터가 제공된다.
2. 샘플 데이터는 잠금 상태가 아니라 사용자가 수정 가능한 초기값이다.
3. 차트의 데이터 구조에 맞는 전용 편집기를 제공한다.
4. 시리즈 색상은 Primary Color와 Auto Palette를 기본으로 사용한다.
5. 의미가 고정된 색상과 일반 시리즈 색상을 구분한다.
6. 화면, PNG, SVG, Figma 붙여넣기 결과가 동일해야 한다.

## 현재 감사 결과

- 카탈로그 차트: 74개
- 옵션 구현: 74개
- 프리셋으로 잠긴 차트: 35개
- 편집 UI가 표시되는 차트: 39개
- 실제로 공통 입력값을 사용하는 차트: 36개
- 편집 UI가 보이지만 값을 무시하는 차트: 3개
  - Bump Chart
  - Rainfall
  - Scrollable Legend Pie

현재 `STATIC_DEMO_CHARTS`는 아래 두 책임을 동시에 가진다.

- 랜덤 데이터를 고정 시드로 생성
- Data Input UI를 차단

두 책임은 분리해야 한다. 데이터 재현성 때문에 시드가 필요한 차트가 반드시 편집 불가능한 것은 아니다.

## 데이터 편집 스키마

### 1. Category Series

대상:

- Line
- Bar
- Pie
- Radar
- World Population
- Funnel
- Pictorial Bar

편집 형태:

| Category | Series 1 | Series 2 |
|---|---:|---:|
| Jan | 65 | 40 |
| Feb | 59 | 75 |

기능:

- Data Point 행 추가/삭제
- Series 열 추가/삭제
- Category 직접 수정
- Series 이름 직접 수정
- 셀 값 직접 수정
- CSV 붙여넣기 확장 가능

### 2. XY / XYZ Points

대상:

- Scatter: X, Y
- Bubble: X, Y, Size
- Jitter: Category, Value, Jitter

### 3. Range

대상:

- Confidence Band: Date, Lower, Value, Upper
- Error/interval 계열 확장

### 4. OHLC

대상:

- Candlestick: Date, Open, Close, Low, High

### 5. Matrix

대상:

- Cartesian Heatmap
- Large Heatmap
- Covariance Matrix

행/열 헤더와 셀 값을 편집한다. 대용량 차트는 개별 셀 편집 외에 CSV 가져오기와 생성기 설정을 제공한다.

### 6. Hierarchy / Network

대상:

- Tree/Treemap: Node, Parent, Value
- Graph/Sankey: Source, Target, Value

### 7. Geo Values

대상:

- Map: Region, Value
- Geo Graph/Lines: Source coordinate, Target coordinate, Value

### 8. Single Value / Multi Value

대상:

- Simple Gauge
- Speed Gauge
- Progress Gauge

### 9. Generator Demo

대상:

- Animation Delay
- Dynamic Line
- Large-scale rendering examples
- Synthetic Streets

대용량 원본 전체를 폼에 노출하지 않고 Count, Seed, Range, Density 같은 생성 파라미터를 편집한다.

## 프리셋 정책

`Preset`은 편집 불가를 뜻하지 않는다.

- 차트 선택 시 공식 구조의 샘플 데이터를 초기화한다.
- 사용자는 샘플 데이터를 자유롭게 변경한다.
- `Reset to Sample Data`로 언제든 초기값을 복원한다.
- 차트별 데이터는 `chartDataById`에 저장해 차트를 전환해도 유지한다.
- 진짜 데모 전용 차트만 Generator Editor를 사용한다.

## 컬러 정책

각 차트는 `colorPolicy`를 가진다.

### Series Palette

Primary Color에서 생성한 Auto Palette를 시리즈 순서대로 사용한다.

대상 예:

- Line
- Bar
- Pie
- Confidence Band
- World Population

### Semantic Colors

색상이 의미를 가지므로 기본 색상을 유지한다.

대상 예:

- AQI 등급
- 상승/하락 Candlestick
- 위험도 임계값

사용자 override는 가능하지만 의미 색상임을 UI에 표시한다.

### Gradient Palette

연속값 또는 발산값을 색상 단계로 표현한다.

대상 예:

- Heatmap
- Matrix
- VisualMap 기반 차트

일반 Auto Palette와 별도로 Gradient Stops 편집기를 제공한다.

### Official Fixed

공식 예제의 컬러 자체가 학습 목적일 때 사용한다. 가능하면 사용자가 `Use Auto Palette`로 전환할 수 있게 한다.

## Confidence Band 컬러 기준

Confidence Band는 `Series Palette` 정책을 사용한다.

- 중앙선: `effectivePalette[0]`
- 밴드: `effectivePalette[0]` + 테마별 opacity
- 툴팁 마커: 중앙선과 동일
- 하한/밴드 계산용 숨김 시리즈는 시각 색상을 사용하지 않음
- PNG/SVG 내보내기에도 동일한 옵션 객체를 사용

## Auto Palette Picker

각 팔레트 색상칩을 클릭하면 다음 UI를 표시한다.

- 현재 색상 미리보기
- Native color picker
- HEX 직접 입력
- Generated/Custom 상태
- 개별 색상 Reset
- 전체 팔레트 Reset

동작 규칙:

- Primary Color 변경 시 Auto Palette 전체 재생성
- 개별 수정은 `manualPalette[index]` override로 저장
- 개별 Reset은 해당 override만 제거
- 전체 Reset은 모든 override 제거
- 차트는 항상 `effectivePalette`를 사용

## Chart Registry

장기적으로 카탈로그, 데이터 정책, 컬러 정책, 샘플 데이터를 하나의 Registry에서 관리한다.

```ts
type ChartPolicy = {
  dataEditor:
    | "category-series"
    | "xy"
    | "xyz"
    | "range"
    | "ohlc"
    | "matrix"
    | "hierarchy"
    | "network"
    | "geo-values"
    | "single-value"
    | "multi-value"
    | "generator";
  colorPolicy:
    | "series"
    | "semantic"
    | "gradient"
    | "official-fixed";
  sampleData: unknown;
  presetReason?: string;
};
```

## 구현 단계

### Phase 1 — 공통 기반

- [x] 차트 정책 Registry 기반 추가
- [x] 시드 고정과 입력 차단 책임 분리
- [x] Category Series 표 편집기 구현
- [x] Series 이름 편집
- [x] Data Point/Series 추가·삭제
- [x] Confidence Band Primary/Auto Palette 적용
- [x] Auto Palette 개별 picker 구현
- [x] 입력값을 무시하던 프리셋 차트를 명시적으로 분류

### Phase 2 — 표준 특수 스키마

- [x] Scatter XY 편집기
- [x] Bubble XYZ 편집기
- [x] Confidence Range 편집기
- [x] Candlestick OHLC 편집기
- [x] Phase 2 대상 프리셋을 Reset 가능한 샘플 데이터로 전환

Phase 2 결과:

- Basic Scatter는 임의로 만든 X 좌표가 아니라 사용자가 입력한 X/Y 좌표를 그대로 사용한다.
- Bubble은 X/Y/Size를 각각 편집하며 Size가 심볼 크기에 직접 반영된다.
- Confidence Band는 Label/Value/Lower/Upper를 편집하고 Primary/Auto Palette 색상을 유지한다.
- Basic/Large Candlestick은 Date/Open/Close/Low/High를 편집한다.
- 각 전용 편집기에서 `Reset sample`로 초기 샘플을 복원할 수 있다.

### Phase 3 — 복합 데이터

- [x] Heatmap/Matrix 편집기
- [x] Tree/Treemap 편집기
- [x] Graph/Sankey 편집기
- [x] Map/Geo 편집기

Phase 3 결과:

- Cartesian Heatmap과 Covariance Matrix는 X/Y/Value 셀을 편집한다.
- Calendar Heatmap은 Date/Value 행을 편집한다.
- Tree와 Sunburst는 ID/Parent ID 기반의 공통 계층 데이터를 사용한다.
- Sankey와 Force Graph는 Node/Link 데이터를 분리해 편집하며 노드 이름 변경을 링크에 연동한다.
- USA Population과 Mini Bars + Geo Matrix는 GeoJSON 지역명/Value/Secondary 데이터를 공유한다.
- Geo Graph는 경로 순서와 Longitude/Latitude를 편집한다.
- 대용량 Heatmap은 일반 셀 편집 대신 Phase 4 Generator Editor 대상으로 유지한다.

### Phase 4 — 대용량 및 가져오기

- [x] Generator Editor
- [x] CSV 붙여넣기/가져오기
- [x] JSON 고급 편집
- [x] 대용량 SVG/PNG 내보내기 검증

Phase 4 결과:

- Large Heatmap은 Width/Height/Seed로 셀 수와 패턴을 생성한다.
- New York Streets는 Street Density/Canvas Span/Seed로 맨해튼형 선분을 생성한다.
- Large-Scale Area는 Point Count/Volatility/Seed로 시계열을 생성한다.
- Data Input을 지원하는 차트는 현재 스키마에 맞는 CSV 템플릿을 열어 편집·적용할 수 있다.
- 로컬 CSV 파일을 읽어 같은 편집기에 불러올 수 있다.
- JSON 편집기는 현재 차트 데이터를 먼저 채우고 스키마 검증 후 적용한다.
- 잘못된 CSV/JSON은 기존 데이터를 유지하고 편집기 안에 오류를 표시한다.
- PNG는 화면의 전체 대용량 데이터를 래스터로 유지한다.
- SVG는 3,000 포인트 제한으로 축약하고 원본 개수와 축약 안내를 표시한다.

### Phase 5 — 잔여 프리셋 최종 정리

- [x] Line/Area 잔여 7종을 Category Series 입력에 연결
- [x] Bar 잔여 4종을 Category Series 입력에 연결
- [x] Pie 잔여 3종을 Category Series 입력에 연결
- [x] Radar 잔여 2종을 Category Series 입력에 연결
- [x] Distribution을 XY 입력에 연결
- [x] Single Axis/Jitter를 Matrix 행 입력에 연결
- [x] Dynamic/Race의 애니메이션 동작과 편집 데이터를 분리
- [x] Animation Delay의 고정 색상을 제거하고 Auto Palette를 적용

Phase 5 결과:

- Area Pieces, Bump, Rainfall, Dynamic Data, Beijing AQI, Rainfall Area, Line Race가 표/CSV/JSON 데이터를 직접 사용한다.
- Waterfall, Bar Race, World Population, Animation Delay가 표의 Category와 Series를 직접 사용한다.
- Scrollable Legend, Referer, Proportion of Browsers가 표의 Category/Value를 직접 사용한다.
- Browsers Radar와 AQI Radar가 Category를 지표로, Series를 비교 대상 데이터로 사용한다.
- Distribution은 X/Y Series를, Single Axis는 X/Y/Size 행을, Jitter는 Category/Point/Value 행을 편집한다.
- Bar Race는 Category를 프레임으로, Series를 경주 항목으로 해석해 편집 후에도 자동 재생과 정렬 애니메이션을 유지한다.
- 모든 ECharts 카탈로그 차트는 표준 편집기, 전용 편집기, Generator Editor 중 하나를 제공한다.
- `PRESET_DATA_CHARTS`에 남은 차트는 0개이며, 입력 UI가 보이면서 입력값을 무시하는 차트는 없다.
- 모든 편집기는 현재 데이터를 CSV/JSON으로 내보내 다시 적용할 수 있다. 전용 편집기는 `Reset sample`로 초기 샘플을 복원한다.

### Phase 6 — Series 수·범례·곡선 설정 일관성

- [x] Bump Chart를 공식 Ranking 구조로 수정
- [x] 단일 Series 차트에서 불필요한 `+ Y Series` 제거
- [x] 역할이 고정된 2-Series 차트에서 세 번째 Series 입력 차단
- [x] 가변 Series 차트는 추가한 모든 Series를 실제 옵션에 전달
- [x] Series 이름 길이와 개수에 따라 우측/하단 범례 공간 자동 계산
- [x] Pie/Funnel은 X Category 범례가 늘어나면 본문 중심과 크기를 자동 조정
- [x] Smooth/Sharp를 실제 지원하는 차트에서만 노출
- [x] X/Y 추가 버튼을 `X Category`, `Y Category`, `X Series`, `Y Series`로 명확화

Phase 6 결과:

- Bump Chart는 각 X 시점의 입력값을 오름차순으로 정렬해 연속된 `#1...#N` 순위를 만든다.
- Bump Chart 왼쪽에는 동일 간격의 순위 축을, 오른쪽에는 Series 이름과 마지막 순위를 표시한다.
- Bump Chart의 Smooth/Sharp 설정은 실제 선 곡률에 반영된다.
- 1-Series 차트는 X Category만 추가하며, 2-Series 비교 차트는 정확히 두 입력 열만 표시한다.
- Basic Line, Stacked Bar, Radar처럼 가변 Series를 지원하는 차트는 추가된 모든 Series를 렌더링한다.
- 긴 범례 또는 많은 범례가 차트와 겹치지 않도록 Cartesian 차트는 Plot 영역을 줄이고, 원형 차트는 중심/반지름을 조정한다.
- Line Curve가 의미 없는 Pie, Gauge, Bar 전용 차트에서는 Smooth/Sharp 컨트롤을 표시하지 않는다.

### Phase 7 — 공식 예제 구조 회귀 복구

- [x] `Rainfall vs Evaporation`, `DataZoom`, `Dynamic Data`를 Line 카탈로그에서 제거
- [x] 차트별 Category Data를 캐시해 다른 차트의 입력값이 유입되지 않도록 분리
- [x] Beijing AQI를 일별 단일 Series + 6단계 `visualMap` 구조로 복원
- [x] Rainfall을 Flow/Rainfall 2-Series + 이중 Y축 + Area + DataZoom 구조로 복원
- [x] Negative Values를 단일 가로 Bar + 상단 값축 + 부호별 라벨 위치 구조로 복원
- [x] 공식형 Category 차트에 `Reset sample` 제공
- [x] 전체 카탈로그 선택 회귀 테스트 수행

Phase 7 기준:

- Beijing AQI의 6개 색상 항목은 Series 범례가 아니라 값 범위를 설명하는 `visualMap`이다.
- 공식 예제의 시리즈 수가 고정된 차트에서는 Data Input의 Y Series 추가·삭제 가능 여부도 같은 수로 제한한다.
- 차트를 전환해도 각 차트에서 편집한 Category/Series/Title 상태를 별도로 보존한다.
- 공식 예제를 그대로 쓰기 어려운 외부 데이터는 동일한 축·시리즈 구조를 유지하는 결정적 로컬 샘플로 대체한다.

### Phase 8 — Single Axis·Large Lines·Treemap·Primary 회귀

- [x] Scatter on Single Axis를 요일별 7개 `singleAxis`와 7개 Scatter Series 구조로 변경
- [x] 시간축을 공식 예제와 같은 24시간 범주로 확장
- [x] `Synthetic Large Lines`를 `New York Streets` 카탈로그 항목으로 교체
- [x] 공식 `lines-ny`의 검은 배경·대용량 Lines·lighter blend 구조를 로컬 맨해튼형 도로망으로 재현
- [x] Treemap의 Branch A/B/C 중간 계층을 제거하고 단일 영역을 직접 항목별로 분할
- [x] Treemap·Large Heatmap·Covariance Matrix의 Gradient에 Primary/Auto Palette 반영
- [x] 공식 고정색 차트는 Palette를 잠그고 고정색 정책 안내 표시

## 전체 완료 조건

- Basic Line에서 행과 Y Series를 명확히 추가할 수 있다.
- Series 이름을 직접 변경할 수 있다.
- 삭제 시 Category와 모든 연결 값이 함께 제거된다.
- Confidence Band가 Primary/Auto Palette를 반영한다.
- 모든 Auto Palette 색상을 개별 picker로 변경·복원할 수 있다.
- Data Input이 보이는 차트는 실제 입력값을 사용한다.
- 화면, PNG, SVG가 같은 색상과 데이터를 사용한다.
- 프로덕션 빌드가 통과한다.
