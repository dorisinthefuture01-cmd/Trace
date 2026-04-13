import chinaMap from "@/lib/data/chinaProvincePaths.json";
import { getProvinceLabelZh } from "@/lib/areasRegistry";
import { PROVINCE_LABEL } from "@/lib/mockData";

const slugSet = new Set(chinaMap.provinces.map((p) => p.slug));

const slugToLabel = Object.fromEntries(
  chinaMap.provinces.map((p) => [p.slug, p.label] as const)
);

export function isValidProvinceSlug(param: string): boolean {
  return slugSet.has(decodeURIComponent(param));
}

export function getProvinceLabel(param: string): string {
  const key = decodeURIComponent(param);
  if (PROVINCE_LABEL[key]) return PROVINCE_LABEL[key];
  const fromAreas = getProvinceLabelZh(key);
  if (fromAreas) return fromAreas;
  return slugToLabel[key] ?? key;
}
