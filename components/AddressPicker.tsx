"use client";

import { useEffect, useRef, useState } from "react";
import type { AreaCity, AreaProvince } from "@/lib/areasRegistry";
import { filterCities, filterProvinces, findProvinceSlugForCitySlug, getCityBySlug, getProvinceBySlug } from "@/lib/areasRegistry";

const inputClass =
  "w-full rounded-xl border border-zinc-200/90 bg-white py-3 pl-3.5 pr-10 text-[15px] leading-snug text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200/50";

const listClass =
  "absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-56 overflow-y-auto rounded-xl border border-zinc-200/80 bg-white py-1 shadow-xl shadow-zinc-900/10";

const itemClass =
  "flex w-full cursor-pointer items-center px-3.5 py-2.5 text-left text-[15px] text-zinc-800 transition hover:bg-zinc-100/80";

type Props = {
  provinceSlug: string;
  citySlug: string;
  onProvinceChange: (slug: string) => void;
  onCityChange: (slug: string) => void;
};

export function AddressPicker({
  provinceSlug,
  citySlug,
  onProvinceChange,
  onCityChange,
}: Props) {
  const [pOpen, setPOpen] = useState(false);
  const [cOpen, setCOpen] = useState(false);
  const [pQuery, setPQuery] = useState("");
  const [cQuery, setCQuery] = useState("");

  const pWrap = useRef<HTMLDivElement>(null);
  const cWrap = useRef<HTMLDivElement>(null);

  const selectedP = getProvinceBySlug(provinceSlug);
  const selectedC = getCityBySlug(citySlug);

  useEffect(() => {
    function close(e: MouseEvent) {
      const t = e.target as Node;
      if (pWrap.current && !pWrap.current.contains(t)) setPOpen(false);
      if (cWrap.current && !cWrap.current.contains(t)) setCOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const pList = filterProvinces(pOpen ? pQuery : "");
  const cList = cOpen ? filterCities(provinceSlug, cQuery) : [];

  const pInputDisplay = pOpen ? pQuery : selectedP?.label ?? "";
  const cInputDisplay = cOpen ? cQuery : selectedC?.label ?? "";

  function pickProvince(p: AreaProvince) {
    onProvinceChange(p.slug);
    onCityChange("");
    setPQuery("");
    setCQuery("");
    setPOpen(false);
  }

  function pickCity(c: AreaCity) {
    // 找到城市对应的省份
    const provinceSlug = findProvinceSlugForCitySlug(c.slug);
    if (provinceSlug) {
      onProvinceChange(provinceSlug);
    }
    onCityChange(c.slug);
    setCQuery("");
    setCOpen(false);
  }

  return (
    <div className="space-y-5">
      <div ref={pWrap} className="relative">
        <label className="mb-2 block text-[13px] font-medium text-zinc-500">选择省份</label>
        <div className="relative">
          <input
            type="text"
            role="combobox"
            aria-expanded={pOpen}
            aria-controls="province-suggest"
            aria-autocomplete="list"
            autoComplete="off"
            placeholder="搜索省份，如 shan 或 山东"
            className={inputClass}
            value={pInputDisplay}
            onChange={(e) => {
              setPQuery(e.target.value);
              setPOpen(true);
            }}
            onFocus={() => {
              setPOpen(true);
              setPQuery(selectedP ? "" : pQuery);
            }}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            ⌄
          </span>
        </div>
        {pOpen && pList.length > 0 && (
          <ul id="province-suggest" className={listClass} role="listbox">
            {pList.map((p) => (
              <li key={p.slug} role="option" aria-selected={p.slug === provinceSlug}>
                <button type="button" className={itemClass} onMouseDown={(e) => e.preventDefault()} onClick={() => pickProvince(p)}>
                  <span className="font-medium">{p.label}</span>
                  <span className="ml-auto pl-2 text-[12px] text-zinc-400">{p.slug}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div ref={cWrap} className="relative">
        <label className="mb-2 block text-[13px] font-medium text-zinc-500">选择城市</label>
        <div className="relative">
          <input
            type="text"
            role="combobox"
            aria-expanded={cOpen}
            aria-controls="city-suggest"
            aria-autocomplete="list"
            autoComplete="off"
            placeholder="搜索城市，如 青 或 qing"
            className={inputClass}
            value={cInputDisplay}
            onChange={(e) => {
              setCQuery(e.target.value);
              setCOpen(true);
            }}
            onFocus={() => {
              setCOpen(true);
              setCQuery(selectedC ? "" : cQuery);
            }}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            ⌄
          </span>
        </div>
        {cOpen && cList.length > 0 && (
          <ul id="city-suggest" className={listClass} role="listbox">
            {cList.map((c) => (
              <li key={c.slug} role="option" aria-selected={c.slug === citySlug}>
                <button type="button" className={itemClass} onMouseDown={(e) => e.preventDefault()} onClick={() => pickCity(c)}>
                  <span className="font-medium">{c.label}</span>
                  <span className="ml-auto pl-2 text-[12px] text-zinc-400">{c.slug}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
