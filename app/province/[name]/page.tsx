import Link from "next/link";
import { notFound } from "next/navigation";
import { CityList } from "@/components/CityList";
import { fetchCitiesForProvince } from "@/lib/api";
import { getProvinceLabel, isValidProvinceSlug } from "@/lib/provinceMeta";
import { getVisitedProvinceSlugsFromMock } from "@/lib/mockData";

type Props = {
  params: Promise<{ name: string }>;
};

const btnGhost =
  "inline-flex rounded-lg border border-neutral-300 bg-white px-8 py-2.5 text-[14px] font-medium text-neutral-800 transition hover:bg-neutral-50";

export async function generateStaticParams() {
  // 从 mockData 中获取所有已访问省份的 slug
  const provinceSlugs = getVisitedProvinceSlugsFromMock();
  return provinceSlugs.map(slug => ({ name: slug }));
}

// 强制设置为静态页面
export const dynamic = 'force-static';

export default async function ProvincePage({ params }: Props) {
  const { name } = await params;
  if (!isValidProvinceSlug(name)) {
    notFound();
  }
  const label = getProvinceLabel(name);
  const cities = await fetchCitiesForProvince(name);

  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className="mx-auto max-w-lg px-5 pb-16 pt-8">
        <header className="pb-8 text-center">
          <h1 className="text-[20px] font-semibold text-neutral-900">{label}</h1>
        </header>
        {cities.length === 0 ? (
          <p className="rounded-lg border border-dashed border-neutral-300 bg-white py-12 text-center text-[14px] text-neutral-500">
            暂无城市数据
          </p>
        ) : (
          <CityList cities={cities} />
        )}
        <footer className="mt-12 flex justify-center">
          <Link href="/" className={btnGhost}>
            返回
          </Link>
        </footer>
      </div>
    </div>
  );
}
