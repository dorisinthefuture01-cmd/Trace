import Link from "next/link";

/** 首页顶栏：底部分割线 + 右侧「新建记录」 */
export function Navbar() {
  return (
    <header className="w-full border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex w-full max-w-4xl justify-end px-6 py-4 md:px-8">
        <Link
          href="/new"
          className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-900"
        >
          新建记录
        </Link>
      </div>
    </header>
  );
}
