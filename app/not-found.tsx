import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-neutral-100 px-5">
      <h1 className="text-lg font-semibold text-neutral-900">未找到</h1>
      <p className="mt-2 text-center text-sm text-neutral-500">该页面或记录不存在。</p>
      <Link
        href="/"
        className="mt-8 rounded-lg border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
      >
        返回首页
      </Link>
    </div>
  );
}
