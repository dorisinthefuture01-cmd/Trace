import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchRecordById } from "@/lib/api";
import { formatRecordDate } from "@/lib/dateFormat";
import { getCityLabelZh } from "@/lib/areasRegistry";
import { getProvinceLabel } from "@/lib/provinceMeta";
import { mockRecords } from "@/lib/mockData";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  // 从 mockRecords 中获取所有记录的 id
  return mockRecords.map(record => ({ id: record.id }));
}

// 强制设置为静态页面
export const dynamic = 'force-static';

export default async function RecordPage({ params }: Props) {
  const { id } = await params;
  const record = await fetchRecordById(id);

  if (!record) {
    notFound();
  }

  const images = record.media.filter((m) => m.type === "image");
  const videos = record.media.filter((m) => m.type === "video");
  const provinceLabel = getProvinceLabel(record.province);
  const cityLabel = getCityLabelZh(record.city) ?? record.city;

  return (
    <article className="min-h-dvh bg-neutral-100 pb-12">
      <div className="mx-auto max-w-lg px-5 pt-8">
        <Link
          href={`/city/${encodeURIComponent(record.city)}`}
          className="text-[13px] font-medium text-neutral-500 transition hover:text-neutral-800"
        >
          ← {cityLabel}
        </Link>

        <h1 className="mt-6 text-center text-[22px] font-semibold leading-snug text-neutral-900">
          {record.title}
        </h1>
        <p className="mt-2 text-center text-[14px] text-neutral-500">
          {formatRecordDate(record.date)}
        </p>
        <p className="mt-1 text-center text-[14px] text-neutral-500">
          {provinceLabel} · {cityLabel}
        </p>

        {images.length > 0 && (
          <div className="mt-8 space-y-3">
            {images.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-neutral-300 bg-white"
              >
                <img
                  src={img.url}
                  alt={img.alt ?? `${record.title} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {videos.map((vid, i) => (
          <div
            key={`video-${i}`}
            className="mt-6 overflow-hidden rounded-lg border border-neutral-300 bg-black"
          >
            {vid.url ? (
              <video
                controls
                className="aspect-video w-full"
                poster={vid.poster}
                preload="metadata"
              >
                <source src={vid.url} />
              </video>
            ) : (
              <div
                className="relative aspect-video w-full bg-neutral-800"
                style={
                  vid.poster
                    ? { backgroundImage: `url(${vid.poster})`, backgroundSize: "cover" }
                    : undefined
                }
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[14px] text-white">
                  视频（演示占位）
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="mt-8 rounded-lg border border-neutral-300 bg-white px-4 py-4">
          <p className="text-[15px] leading-relaxed text-neutral-800">{record.description}</p>
        </div>

        {record.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {record.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-neutral-300 bg-white px-2.5 py-1 text-[12px] text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
