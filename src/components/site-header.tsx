import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/8 dark:border-white/[.145]">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-bold tracking-tight text-black dark:text-zinc-50">
          NextPage 3
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            首页
          </Link>
          <Link
            href="/dashboard"
            className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            仪表盘
          </Link>
        </nav>
      </div>
    </header>
  );
}
