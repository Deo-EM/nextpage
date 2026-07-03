import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="border-t border-black/[.08] py-6 text-center text-xs text-zinc-500 dark:border-white/[.145] dark:text-zinc-400">
        NextPage Demo · 部署于 Cloudflare
      </footer>
    </>
  );
}
