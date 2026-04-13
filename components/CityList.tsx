import Link from "next/link";

export type CityRow = {
  slug: string;
  label: string;
  count: number;
};

type Props = {
  cities: CityRow[];
};

export function CityList({ cities }: Props) {
  return (
    <ul className="divide-y divide-neutral-300 border-y border-neutral-300">
      {cities.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/city/${encodeURIComponent(c.slug)}`}
            className="flex items-center justify-between gap-3 py-4 pr-1 transition hover:bg-neutral-50/80"
          >
            <div className="min-w-0">
              <span className="text-[16px] font-medium text-neutral-900">{c.label}</span>
              <span className="ml-2 text-[14px] text-neutral-500">{c.count}条记录</span>
            </div>
            <span className="shrink-0 text-neutral-400" aria-hidden>
              ›
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
