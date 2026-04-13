import Image from "next/image";
import Link from "next/link";
import type { TravelRecord } from "@/types/record";
import { formatRecordDate } from "@/lib/dateFormat";

type Props = {
  record: TravelRecord;
};

function coverImage(record: TravelRecord) {
  return record.media.find((m) => m.type === "image");
}

export function RecordCard({ record }: Props) {
  const img = coverImage(record);

  return (
    <Link
      href={`/record/${record.id}`}
      className="block overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-sm transition hover:border-neutral-400"
    >
      <div className="relative aspect-square w-full bg-neutral-100">
        {img ? (
          <Image
            src={img.url}
            alt={img.alt ?? record.title}
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 480px"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-neutral-400">
            <svg
              className="size-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              aria-hidden
            >
              <path d="M4 16l4-4 4 4 4-8 4 8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="2" />
              <circle cx="18" cy="5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-xs">图片</span>
          </div>
        )}
      </div>
      <div className="space-y-2 px-4 py-3">
        <h2 className="text-[16px] font-semibold leading-snug text-neutral-900">
          {record.title}
        </h2>
        <p className="text-[13px] text-neutral-500">{formatRecordDate(record.date)}</p>
        <p className="line-clamp-2 text-[14px] leading-relaxed text-neutral-600">
          {record.description}
        </p>
        {record.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {record.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
