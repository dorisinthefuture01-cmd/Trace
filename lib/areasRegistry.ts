import areasData from "@/lib/data/areas.json";

export type AreaProvince = (typeof areasData.provinces)[number];
export type AreaCity = AreaProvince["cities"][number];

export const areas = areasData;

export function getProvinceBySlug(slug: string): AreaProvince | undefined {
  return areasData.provinces.find((p) => p.slug === slug);
}

export function getCitiesForProvinceSlug(slug: string): AreaCity[] {
  return getProvinceBySlug(slug)?.cities ?? [];
}

export function findProvinceSlugForCitySlug(citySlug: string): string | undefined {
  const c = decodeURIComponent(citySlug);
  for (const p of areasData.provinces) {
    if (p.cities.some((x) => x.slug === c)) return p.slug;
  }
  return undefined;
}

export function getCityBySlug(citySlug: string): AreaCity | undefined {
  const c = decodeURIComponent(citySlug);
  for (const p of areasData.provinces) {
    const found = p.cities.find((x) => x.slug === c);
    if (found) return found;
  }
  return undefined;
}

export function isValidCitySlug(param: string): boolean {
  return getCityBySlug(param) !== undefined;
}

export function getCityLabelZh(slug: string): string | undefined {
  return getCityBySlug(slug)?.label;
}

export function getProvinceLabelZh(slug: string): string | undefined {
  return getProvinceBySlug(slug)?.label;
}

export function filterProvinces(query: string): AreaProvince[] {
  const q = query.trim().toLowerCase();
  if (!q) return areasData.provinces;
  return areasData.provinces.filter(
    (p) => p.label.includes(query.trim()) || p.search.includes(q) || p.slug.includes(q)
  );
}

export function filterCities(provinceSlug: string, query: string): AreaCity[] {
  let cities: AreaCity[] = [];
  if (provinceSlug) {
    cities = getCitiesForProvinceSlug(provinceSlug);
  } else {
    // 如果没有选择省份，返回所有城市
    cities = areasData.provinces.flatMap(p => p.cities);
  }
  const q = query.trim().toLowerCase();
  if (!q) return cities;
  return cities.filter(
    (c) => c.label.includes(query.trim()) || c.search.includes(q) || c.slug.includes(q)
  );
}
