import type { TravelRecord } from "@/types/record";
import {
  mockRecords,
  getRecordsByCity,
  getCitiesWithCounts,
} from "@/lib/mockData";

export async function fetchAllRecords(): Promise<TravelRecord[]> {
  return mockRecords;
}

export async function fetchRecordsByCity(cityName: string): Promise<TravelRecord[]> {
  return getRecordsByCity(cityName);
}

export async function fetchRecordById(id: string): Promise<TravelRecord | undefined> {
  return mockRecords.find((r) => r.id === id);
}

export async function fetchCitiesForProvince(
  provinceParam: string
): Promise<{ slug: string; label: string; count: number }[]> {
  return getCitiesWithCounts(provinceParam);
}
