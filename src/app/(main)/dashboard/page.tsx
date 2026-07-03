const stats = [
  { label: "总访问量", value: "12,847", delta: "+12.5%", trend: "up" },
  { label: "活跃用户", value: "3,291", delta: "+4.2%", trend: "up" },
  { label: "转化率", value: "2.7%", delta: "-0.3%", trend: "down" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-zinc-50">仪表盘</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          (main) 路由组的业务功能页面示例，后续可在此扩展项目、设置等模块。
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-black/8 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-zinc-950"
          >
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black dark:text-zinc-50">{stat.value}</span>
              <span
                className={
                  stat.trend === "up"
                    ? "text-xs font-medium text-emerald-600 dark:text-emerald-400"
                    : "text-xs font-medium text-red-600 dark:text-red-400"
                }
              >
                {stat.delta}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
