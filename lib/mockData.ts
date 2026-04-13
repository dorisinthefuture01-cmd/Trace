import type { TravelRecord } from "@/types/record";
import {
  findProvinceSlugForCitySlug,
  getCitiesForProvinceSlug,
  isValidCitySlug,
} from "@/lib/areasRegistry";

/** 可选：覆盖展示名（slug 为拼音） */
export const PROVINCE_LABEL: Record<string, string> = {};

export const mockRecords: TravelRecord[] = [
  {
    id: "qd-001",
    province: "shandong",
    city: "qingdao",
    title: "石老人海水浴场日落",
    description: "傍晚的海风很温柔，天空呈现粉橙色渐变，沙滩上的人渐渐散去，只剩浪声与路灯。",
    date: "2026-03-12",
    tags: ["日落", "海边"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "海边日落",
      },
    ],
  },
  {
    id: "qd-002",
    province: "shandong",
    city: "qingdao",
    title: "栈桥与海鸥",
    description: "清晨在栈桥散步，海风里全是面包屑与海鸥的叫声，远处小青岛的轮廓很干净。",
    date: "2026-03-10",
    tags: ["栈桥", "海鸥"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=80",
        alt: "栈桥",
      },
    ],
  },
  {
    id: "qd-003",
    province: "shandong",
    city: "qingdao",
    title: "八大关的梧桐",
    description: "老建筑藏在树荫里，随便一条小路都像电影取景。下午在海边咖啡馆坐了很久。",
    date: "2026-03-08",
    tags: ["建筑", "咖啡"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
        alt: "街道",
      },
    ],
  },
  {
    id: "jn-001",
    province: "shandong",
    city: "jinan",
    title: "趵突泉晨雾",
    description: "泉水清澈，柳影倒映。早春还有一点凉意，园里已有不少晨练的人。",
    date: "2026-02-20",
    tags: ["泉水", "公园"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
        alt: "泉水",
      },
    ],
  },
  {
    id: "jn-002",
    province: "shandong",
    city: "jinan",
    title: "护城河夜游",
    description: "灯光沿着河岸铺开，游船缓缓经过拱桥，城市忽然安静下来。",
    date: "2026-02-21",
    tags: ["夜景"],
    media: [
      {
        type: "video",
        url: "",
        poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        alt: "夜景",
      },
    ],
  },
];

export function getVisitedProvinceSlugsFromMock(): string[] {
  return [...new Set(mockRecords.map((r) => r.province))];
}

export function getRecordsByCity(citySlug: string): TravelRecord[] {
  const decoded = decodeURIComponent(citySlug);
  return mockRecords.filter((r) => r.city === decoded);
}

export function getRecordCountForCity(citySlug: string): number {
  return mockRecords.filter((r) => r.city === citySlug).length;
}

export function isCityInApp(cityName: string): boolean {
  return isValidCitySlug(cityName);
}

export function getProvinceParamForCity(cityName: string): string | undefined {
  return findProvinceSlugForCitySlug(cityName);
}

export function getCitiesWithCounts(provinceSlug: string): {
  slug: string;
  label: string;
  count: number;
}[] {
  const key = decodeURIComponent(provinceSlug);
  const cities = getCitiesForProvinceSlug(key);
  return cities.map((c) => ({
    slug: c.slug,
    label: c.label,
    count: getRecordCountForCity(c.slug),
  }));
}
