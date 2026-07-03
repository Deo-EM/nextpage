import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/dashboard", label: "项目" },
  { href: "/dashboard", label: "设置" },
];

export function AppSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-black/[.08] p-4 dark:border-white/[.145] md:block">
      <nav className="flex flex-col gap-1">
        <span className="mb-2 px-3 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
          业务功能
        </span>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
