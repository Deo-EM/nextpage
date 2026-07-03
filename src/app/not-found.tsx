import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-6xl font-bold text-black dark:text-zinc-50">404</span>
      <p className="text-zinc-600 dark:text-zinc-400">页面未找到</p>
      <Link
        href="/"
        className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
      >
        返回首页
      </Link>
    </div>
  );
}
