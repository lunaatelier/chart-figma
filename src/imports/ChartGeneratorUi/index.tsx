import svgPaths from "./svg-hxh52ee8a1";
import imgLine from "./57c82cd53d0ab965ef6f8afb7c98eb3395b7c4e4.png";

function ChartBar() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chart-bar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chart-bar">
          <path d={svgPaths.p2d783e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#6366f1] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name="icon">
      <ChartBar />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pb-[24px] relative shrink-0" data-name="logo">
      <Icon />
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">ChartPro</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chevron-down">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="section-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Library</p>
      <ChevronDown />
    </div>
  );
}

function TabChartJs() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-[1_0_0] h-full items-center justify-center min-w-px relative rounded-[6px]" data-name="tab-Chart.js">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">Chart.js</p>
    </div>
  );
}

function TabECharts() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex flex-[1_0_0] h-full items-center justify-center min-w-px relative rounded-[6px]" data-name="tab-ECharts">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">ECharts</p>
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="plus">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="plus">
          <path d={svgPaths.p133cc000} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function AddTab() {
  return (
    <div className="content-stretch flex h-full items-center justify-center relative shrink-0 w-[28px]" data-name="add-tab">
      <Plus />
    </div>
  );
}

function TabSwitcher() {
  return (
    <div className="bg-[#f3f4f6] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="tab-switcher">
      <div className="content-stretch flex gap-[4px] items-start p-[4px] relative size-full">
        <TabChartJs />
        <TabECharts />
        <AddTab />
      </div>
    </div>
  );
}

function SectionContent() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="section-content">
      <TabSwitcher />
    </div>
  );
}

function SectionLibrary() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full" data-name="section-library">
      <SectionHeader />
      <SectionContent />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Line" stroke="var(--stroke-0, #E5E7EB)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chevron-down">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SectionHeader1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="section-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Chart Type</p>
      <ChevronDown1 />
    </div>
  );
}

function ChartBar1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-bar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-bar">
          <path d={svgPaths.p42f5380} id="Vector" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TypeBar() {
  return (
    <div className="bg-[#eef2ff] col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="type-bar">
      <div aria-hidden className="absolute border border-[#6366f1] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartBar1 />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#6366f1] text-[10px] whitespace-nowrap">Bar</p>
        </div>
      </div>
    </div>
  );
}

function ChartLine() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-line">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-line">
          <path d={svgPaths.p24e5f700} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TypeLine() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="type-line">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartLine />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Line</p>
        </div>
      </div>
    </div>
  );
}

function ChartPie() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-pie">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-pie">
          <path d={svgPaths.p3c0ac600} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TypeDoughnut() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="type-doughnut">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartPie />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Doughnut</p>
        </div>
      </div>
    </div>
  );
}

function ChartPie1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-pie">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-pie">
          <path d={svgPaths.p3c0ac600} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TypePie() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="type-pie">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartPie1 />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Pie</p>
        </div>
      </div>
    </div>
  );
}

function ChartNetwork() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-network">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-network">
          <path d={svgPaths.p881fc60} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TypeRadar() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="type-radar">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartNetwork />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Radar</p>
        </div>
      </div>
    </div>
  );
}

function ChartArea() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-area">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-area">
          <path d={svgPaths.pbd48300} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TypeArea() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="type-area">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartArea />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Area</p>
        </div>
      </div>
    </div>
  );
}

function ChartScatter() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-scatter">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-scatter">
          <g id="Vector">
            <path d={svgPaths.p37a50100} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p142c9100} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p37a9ef80} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p2458d600} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p2a48ab80} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p224c9400} stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TypeScatter() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[8px] row-3 self-start shrink-0" data-name="type-scatter">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartScatter />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Scatter</p>
        </div>
      </div>
    </div>
  );
}

function ChartNetwork1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-network">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-network">
          <path d={svgPaths.p881fc60} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TypePolar() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[8px] row-3 self-start shrink-0" data-name="type-polar">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartNetwork1 />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Polar</p>
        </div>
      </div>
    </div>
  );
}

function ChartScatter1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chart-scatter">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-scatter">
          <g id="Vector">
            <path d={svgPaths.p37a50100} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p142c9100} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p37a9ef80} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p2458d600} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p2a48ab80} fill="var(--fill-0, #4B5563)" />
            <path d={svgPaths.p224c9400} stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TypeBubble() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[8px] row-3 self-start shrink-0" data-name="type-bubble">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center p-[8px] relative size-full">
          <ChartScatter1 />
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">Bubble</p>
        </div>
      </div>
    </div>
  );
}

function TypeGrid() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] h-[187px] relative shrink-0 w-full" data-name="type-grid">
      <TypeBar />
      <TypeLine />
      <TypeDoughnut />
      <TypePie />
      <TypeRadar />
      <TypeArea />
      <TypeScatter />
      <TypePolar />
      <TypeBubble />
    </div>
  );
}

function SectionContent1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="section-content">
      <TypeGrid />
    </div>
  );
}

function SectionChartType() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full" data-name="section-chart type">
      <SectionHeader1 />
      <SectionContent1 />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Line" stroke="var(--stroke-0, #E5E7EB)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chevron-down">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SectionHeader2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="section-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Data Input</p>
      <ChevronDown2 />
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="x">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="x">
          <path d={svgPaths.p2caf70a0} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Chip() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="chip">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Jan</p>
      <X />
    </div>
  );
}

function X1() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="x">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="x">
          <path d={svgPaths.p2caf70a0} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Chip1() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="chip">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Feb</p>
      <X1 />
    </div>
  );
}

function X2() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="x">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="x">
          <path d={svgPaths.p2caf70a0} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Chip2() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="chip">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Mar</p>
      <X2 />
    </div>
  );
}

function X3() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="x">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="x">
          <path d={svgPaths.p2caf70a0} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Chip3() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="chip">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Apr</p>
      <X3 />
    </div>
  );
}

function X4() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="x">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="x">
          <path d={svgPaths.p2caf70a0} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Chip4() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="chip">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">May</p>
      <X4 />
    </div>
  );
}

function LabelsContainer() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="labels-container">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-start flex flex-wrap gap-[6px] items-start p-[8px] relative size-full">
        <Chip />
        <Chip1 />
        <Chip2 />
        <Chip3 />
        <Chip4 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[11px] whitespace-nowrap">Add...</p>
      </div>
    </div>
  );
}

function XAxisLabels() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="x-axis-labels">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">X-Axis Labels</p>
      <LabelsContainer />
    </div>
  );
}

function LabelTag() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex items-start justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 w-[60px]" data-name="label-tag">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[11px] whitespace-nowrap">Jan</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-w-px relative rounded-[6px]" data-name="input">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">65</p>
        </div>
      </div>
    </div>
  );
}

function Trash() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="trash">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1817)" id="trash">
          <path d={svgPaths.p1dfbc500} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1817">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DataRow() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="data-row">
      <LabelTag />
      <Input />
      <Trash />
    </div>
  );
}

function LabelTag1() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex items-start justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 w-[60px]" data-name="label-tag">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[11px] whitespace-nowrap">Feb</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-w-px relative rounded-[6px]" data-name="input">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">59</p>
        </div>
      </div>
    </div>
  );
}

function Trash1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="trash">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1817)" id="trash">
          <path d={svgPaths.p1dfbc500} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1817">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DataRow1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="data-row">
      <LabelTag1 />
      <Input1 />
      <Trash1 />
    </div>
  );
}

function LabelTag2() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex items-start justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 w-[60px]" data-name="label-tag">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[11px] whitespace-nowrap">Mar</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-w-px relative rounded-[6px]" data-name="input">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">80</p>
        </div>
      </div>
    </div>
  );
}

function Trash2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="trash">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1817)" id="trash">
          <path d={svgPaths.p1dfbc500} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1817">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DataRow2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="data-row">
      <LabelTag2 />
      <Input2 />
      <Trash2 />
    </div>
  );
}

function YValues() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pt-[8px] relative shrink-0 w-full" data-name="y-values">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Y-Axis Values</p>
      <DataRow />
      <DataRow1 />
      <DataRow2 />
    </div>
  );
}

function BtnRandom() {
  return (
    <div className="bg-[#eef2ff] content-stretch flex flex-[1_0_0] h-[32px] items-center justify-center min-w-px relative rounded-[6px]" data-name="btn-random">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6366f1] text-[11px] whitespace-nowrap">Random Data</p>
    </div>
  );
}

function BtnAdd() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-[1_0_0] h-[32px] items-center justify-center min-w-px relative rounded-[6px]" data-name="btn-add">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[11px] whitespace-nowrap">+ Dataset</p>
    </div>
  );
}

function DataActions() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pt-[4px] relative shrink-0 w-full" data-name="data-actions">
      <BtnRandom />
      <BtnAdd />
    </div>
  );
}

function SectionContent2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-content">
      <XAxisLabels />
      <YValues />
      <DataActions />
    </div>
  );
}

function SectionDataInput() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full" data-name="section-data input">
      <SectionHeader2 />
      <SectionContent2 />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Line" stroke="var(--stroke-0, #E5E7EB)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chevron-down">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SectionHeader3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="section-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Style Settings</p>
      <ChevronDown3 />
    </div>
  );
}

function Toggle() {
  return (
    <div className="h-[18px] relative shrink-0 w-[32px]" data-name="toggle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 18">
        <g id="toggle">
          <rect fill="var(--fill-0, #D1D5DB)" height="18" rx="9" width="32" />
          <circle cx="9" cy="9" fill="var(--fill-0, white)" id="Ellipse" r="7" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[11px] whitespace-nowrap">Light</p>
      <Toggle />
    </div>
  );
}

function ThemeRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="theme-row">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Theme</p>
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center p-[4px] relative rounded-[6px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-[#6366f1] relative rounded-[3px] shrink-0 size-[14px]" data-name="Rectangle" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">#6366F1</p>
    </div>
  );
}

function ColorRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="color-row">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Primary Color</p>
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Frame">
      <div className="bg-[#6366f1] relative rounded-[4px] shrink-0 size-[24px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] relative rounded-[4px] shrink-0 size-[24px]" data-name="Rectangle" />
      <div className="bg-[#10b981] relative rounded-[4px] shrink-0 size-[24px]" data-name="Rectangle" />
      <div className="bg-[#ec4899] relative rounded-[4px] shrink-0 size-[24px]" data-name="Rectangle" />
      <div className="bg-[#06b6d4] relative rounded-[4px] shrink-0 size-[24px]" data-name="Rectangle" />
    </div>
  );
}

function PaletteRow() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="palette-row">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Auto Palette</p>
      <Frame2 />
    </div>
  );
}

function SectionContent3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-content">
      <ThemeRow />
      <ColorRow />
      <PaletteRow />
    </div>
  );
}

function SectionStyleSettings() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full" data-name="section-style settings">
      <SectionHeader3 />
      <SectionContent3 />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Line" stroke="var(--stroke-0, #E5E7EB)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chevron-down">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SectionHeader4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="section-header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Size Settings</p>
      <ChevronDown4 />
    </div>
  );
}

function SizeS() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] h-[32px] items-center justify-center min-w-px relative rounded-[999px]" data-name="size-s">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">S</p>
    </div>
  );
}

function SizeM() {
  return (
    <div className="bg-[#eef2ff] content-stretch flex flex-[1_0_0] h-[32px] items-center justify-center min-w-px relative rounded-[999px]" data-name="size-m">
      <div aria-hidden className="absolute border border-[#6366f1] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6366f1] text-[12px] whitespace-nowrap">M</p>
    </div>
  );
}

function SizeL() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] h-[32px] items-center justify-center min-w-px relative rounded-[999px]" data-name="size-l">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">L</p>
    </div>
  );
}

function SizeCustom() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] h-[32px] items-center justify-center min-w-px relative rounded-[999px]" data-name="size-custom">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Custom</p>
    </div>
  );
}

function PresetSizes() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="preset-sizes">
      <SizeS />
      <SizeM />
      <SizeL />
      <SizeCustom />
    </div>
  );
}

function WidthInput() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-w-px relative rounded-[6px]" data-name="width-input">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center leading-[normal] not-italic px-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#9ca3af] text-[11px] whitespace-nowrap">Width</p>
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-px relative text-[#111827] text-[12px] text-right">800</p>
        </div>
      </div>
    </div>
  );
}

function HeightInput() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-w-px relative rounded-[6px]" data-name="height-input">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center leading-[normal] not-italic px-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#9ca3af] text-[11px] whitespace-nowrap">Height</p>
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold min-w-px relative text-[#111827] text-[12px] text-right">500</p>
        </div>
      </div>
    </div>
  );
}

function Dimensions() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="dimensions">
      <WidthInput />
      <HeightInput />
    </div>
  );
}

function Toggle1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[32px]" data-name="toggle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 18">
        <g id="toggle">
          <rect fill="var(--fill-0, #6366F1)" height="18" rx="9" width="32" />
          <circle cx="9" cy="9" fill="var(--fill-0, white)" id="Ellipse" r="7" />
        </g>
      </svg>
    </div>
  );
}

function AutoResponsiveRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="auto-responsive-row">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Auto-responsive</p>
      <Toggle1 />
    </div>
  );
}

function SectionContent4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-content">
      <PresetSizes />
      <Dimensions />
      <AutoResponsiveRow />
    </div>
  );
}

function SectionSizeSettings() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full" data-name="section-size settings">
      <SectionHeader4 />
      <SectionContent4 />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Line" stroke="var(--stroke-0, #E5E7EB)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronDown5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="chevron-down">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-full items-center justify-center relative shrink-0 w-[24px]" data-name="Frame">
      <ChevronDown5 />
    </div>
  );
}

function ExportBtn() {
  return (
    <div className="bg-[#6366f1] content-stretch drop-shadow-[0px_4px_4px_rgba(99,102,241,0.25)] flex h-[40px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="export-btn">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Export PNG</p>
      <Frame3 />
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="sidebar-footer">
      <ExportBtn />
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="bg-[#f9fafb] h-full relative shrink-0 w-[320px]" data-name="left-panel">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Logo />
          <SectionLibrary />
          <SectionChartType />
          <SectionDataInput />
          <SectionStyleSettings />
          <SectionSizeSettings />
          <SidebarFooter />
        </div>
      </div>
      <div aria-hidden className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Pencil() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="pencil">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1844)" id="pencil">
          <path d={svgPaths.p13c81200} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1844">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function EditableTitle() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="editable-title">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Monthly Revenue Growth 2024</p>
      <Pencil />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start px-[12px] py-[6px] relative rounded-[6px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Reset</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#111827] content-stretch flex items-start px-[12px] py-[6px] relative rounded-[6px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Save to Library</p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="actions">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function TopBar() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="top-bar">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[40px] relative size-full">
          <EditableTitle />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[2px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <circle cx="1" cy="1" fill="var(--fill-0, #D1D5DB)" id="Ellipse" r="1" />
        </svg>
      </div>
    </div>
  );
}

function DotBg() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-between opacity-40" data-name="dot-bg">
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <Frame23 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
      <Frame32 />
      <Frame33 />
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function YLabels() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal h-full items-start justify-between leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[11px] text-right" data-name="y-labels">
      <p className="relative shrink-0 w-[24px]">100</p>
      <p className="relative shrink-0 w-[24px]">75</p>
      <p className="relative shrink-0 w-[24px]">50</p>
      <p className="relative shrink-0 w-[24px]">25</p>
      <p className="relative shrink-0 w-[24px]">0</p>
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-between" data-name="grid-lines">
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine} width="680" />
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine} width="680" />
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine} width="680" />
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine} width="680" />
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine} width="680" />
        </div>
      </div>
    </div>
  );
}

function GroupJan() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="group-Jan">
      <div className="bg-[#6366f1] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
    </div>
  );
}

function GroupFeb() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="group-Feb">
      <div className="bg-[#6366f1] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
    </div>
  );
}

function GroupMar() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="group-Mar">
      <div className="bg-[#6366f1] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
    </div>
  );
}

function GroupApr() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="group-Apr">
      <div className="bg-[#6366f1] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
    </div>
  );
}

function GroupMay() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="group-May">
      <div className="bg-[#6366f1] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
    </div>
  );
}

function GroupJun() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="group-Jun">
      <div className="bg-[#6366f1] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
    </div>
  );
}

function GroupJul() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="group-Jul">
      <div className="bg-[#6366f1] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
      <div className="bg-[#f59e0b] h-[100px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[16px]" data-name="Rectangle" />
    </div>
  );
}

function BarsContainer() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="bars-container">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end justify-between px-[20px] relative size-full">
          <GroupJan />
          <GroupFeb />
          <GroupMar />
          <GroupApr />
          <GroupMay />
          <GroupJun />
          <GroupJul />
        </div>
      </div>
    </div>
  );
}

function PlotArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px relative" data-name="plot-area">
      <GridLines />
      <BarsContainer />
    </div>
  );
}

function YAxisContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px relative w-full" data-name="y-axis-container">
      <YLabels />
      <PlotArea />
    </div>
  );
}

function XAxis() {
  return (
    <div className="relative shrink-0 w-full" data-name="x-axis">
      <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[normal] not-italic pl-[40px] pr-[20px] relative size-full text-[#9ca3af] text-[11px] text-center whitespace-nowrap">
        <p className="relative shrink-0">Jan</p>
        <p className="relative shrink-0">Feb</p>
        <p className="relative shrink-0">Mar</p>
        <p className="relative shrink-0">Apr</p>
        <p className="relative shrink-0">May</p>
        <p className="relative shrink-0">Jun</p>
        <p className="relative shrink-0">Jul</p>
      </div>
    </div>
  );
}

function ChartVisualization() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px relative w-full" data-name="chart-visualization">
      <YAxisContainer />
      <XAxis />
    </div>
  );
}

function ChartCard() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_20px_20px_rgba(0,0,0,0.1)] flex flex-col h-[500px] items-start p-[40px] relative rounded-[12px] shrink-0 w-[800px]" data-name="chart-card">
      <ChartVisualization />
    </div>
  );
}

function CanvasArea() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px relative w-full" data-name="canvas-area">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[60px] relative size-full">
          <DotBg />
          <ChartCard />
        </div>
      </div>
    </div>
  );
}

function ChartBar2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chart-bar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1811)" id="chart-bar">
          <path d={svgPaths.p3a492900} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1811">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Frame">
      <ChartBar2 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">Bar Chart</p>
    </div>
  );
}

function Maximize() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="maximize">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1808)" id="maximize">
          <path d={svgPaths.p25da2ce0} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1808">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Frame">
      <Maximize />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[12px] whitespace-nowrap">800 × 500 px</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[6px] items-center leading-[normal] not-italic relative shrink-0 text-[12px] whitespace-nowrap" data-name="Frame">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4b5563]">Library:</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#6366f1]">Chart.js</p>
    </div>
  );
}

function InfoLeft() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="info-left">
      <Frame36 />
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#10b981] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[10px] text-white uppercase whitespace-nowrap">Sync Live</p>
    </div>
  );
}

function InfoRight() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="info-right">
      <Frame39 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[12px] whitespace-nowrap">Last edited 2m ago</p>
    </div>
  );
}

function InfoBar() {
  return (
    <div className="bg-[#f9fafb] h-[48px] relative shrink-0 w-full" data-name="info-bar">
      <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <InfoLeft />
          <InfoRight />
        </div>
      </div>
    </div>
  );
}

function MainPanel() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px relative" data-name="main-panel">
      <TopBar />
      <CanvasArea />
      <InfoBar />
    </div>
  );
}

export default function ChartGeneratorUi() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="chart-generator-ui">
      <LeftPanel />
      <MainPanel />
    </div>
  );
}