"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import chinaMap from "@/lib/data/chinaProvincePaths.json";
import { getVisitedProvinceSlugsFromMock } from "@/lib/mockData";

const FILL_DEFAULT = "#fafafa";
const FILL_VISITED = "#d8d8dc";
const STROKE = "#d4d4d8";
const STROKE_WIDTH = 0.65;
const FILL_HOVER_UNVISITED = "#f0f0f2";
const FILL_HOVER_VISITED = "#c8c8ce";

type ProvincePath = (typeof chinaMap.provinces)[number];

export function ChinaMap() {
  const router = useRouter();
  const visited = useMemo(() => new Set(getVisitedProvinceSlugsFromMock()), []);

  const navigate = (slug: string) => {
    router.push(`/province/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="flex w-full max-w-4xl flex-col">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm md:p-8">
        <svg
          viewBox={chinaMap.viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full max-h-full"
          role="img"
          aria-label="中国省级行政区划示意图"
        >
          {chinaMap.provinces.map((p: ProvincePath) => {
            const isVisited = visited.has(p.slug);
            return (
              <g key={p.slug}>
                <path
                  d={p.d}
                  fill={isVisited ? FILL_VISITED : FILL_DEFAULT}
                  stroke={STROKE}
                  strokeWidth={STROKE_WIDTH}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="cursor-pointer outline-none transition-[fill] duration-200 ease-out focus-visible:fill-zinc-400"
                  data-visited={isVisited ? "1" : "0"}
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.label}${isVisited ? "，已访问" : ""}`}
                  onClick={() => navigate(p.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(p.slug);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.setAttribute(
                      "fill",
                      isVisited ? FILL_HOVER_VISITED : FILL_HOVER_UNVISITED
                    );
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.setAttribute(
                      "fill",
                      isVisited ? FILL_VISITED : FILL_DEFAULT
                    );
                  }}
                />
                <title>{p.label}</title>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-6 flex w-full flex-col gap-3 text-left text-sm text-zinc-600">
        <div className="flex items-center gap-2">
          <span
            className="size-3 shrink-0 rounded-full bg-[#d8d8dc] ring-1 ring-zinc-300"
            aria-hidden
          />
          <span>已访问省份</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="size-3 shrink-0 rounded-full border border-zinc-300 bg-[#fafafa]"
            aria-hidden
          />
          <span>未访问省份</span>
        </div>
      </div>
    </div>
  );
}
