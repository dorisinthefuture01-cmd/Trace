import Link from "next/link";
import { notFound } from "next/navigation";
import { RecordList } from "@/components/RecordList";
import { getCityLabelZh } from "@/lib/areasRegistry";
import { getRecordsByCity, getProvinceParamForCity, mockRecords } from "@/lib/mockData";

type Props = {
  params: Promise<{ name: string }>;
};

const btnSecondary =
  "rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-[14px] font-medium text-neutral-800 transition hover:bg-neutral-50";
const btnPrimary =
  "rounded-lg bg-neutral-700 px-4 py-2.5 text-[14px] font-medium text-white transition hover:bg-neutral-800";

export async function generateStaticParams() {
  // 从 mockRecords 中获取所有城市的 slug
  const citySlugs = [...new Set(mockRecords.map(record => record.city))];
  return citySlugs.map(slug => ({ name: slug }));
}

// 强制设置为静态页面
export const dynamic = 'force-static';

export default async function CityPage({ params }: Props) {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const provinceParam = getProvinceParamForCity(name);

  if (!provinceParam) {
    notFound();
  }

  const records = getRecordsByCity(name);
  const displayName = getCityLabelZh(slug) ?? slug;
  const backHref = `/province/${encodeURIComponent(provinceParam)}`;

  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className="mx-auto max-w-lg px-5 pb-28 pt-8">
        <header className="pb-8 text-center">
          <h1 className="text-[20px] font-semibold text-neutral-900">{displayName}</h1>
        </header>
        <RecordList records={records} />
        <footer className="fixed bottom-0 left-0 right-0 border-t border-neutral-300 bg-neutral-100/95 py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-lg justify-end gap-3 px-5">
            <Link href={backHref} className={btnSecondary}>
              返回
            </Link>
            <Link href="/new" className={btnPrimary}>
              新增记录
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
