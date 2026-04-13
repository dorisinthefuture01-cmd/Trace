export type MediaItem =
  | { type: "image"; url: string; alt?: string }
  | { type: "video"; url: string; poster?: string };

export interface TravelRecord {
  id: string;
  /** 省级拼音 slug，与地图 /province/[name] 一致，如 shandong、shanghai */
  province: string;
  /** 城市拼音 slug，与 areas.json、/city/[name] 一致，如 qingdao */
  city: string;
  title: string;
  description: string;
  media: MediaItem[];
  date: string;
  tags: string[];
}
