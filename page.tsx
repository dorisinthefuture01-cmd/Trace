import { ChinaMap } from "@/components/ChinaMap";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-50">
      <Navbar />
      <div className="flex flex-1 flex-col items-center px-6 py-8 md:px-8">
        <h1 className="sr-only">心迹 Trace — 中国地图</h1>
        <ChinaMap />
      </div>
    </div>
  );
}
