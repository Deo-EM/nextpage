"use client";

import { useCounterStore } from "@/stores/counter-store";

export default function HomePage() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center gap-10">
        <header className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            Next.js Demo
          </h1>
        </header>

        <section className="flex w-full flex-col items-center gap-6 rounded-2xl border border-black/8 bg-white p-8 shadow-sm dark:border-white/[.145] dark:bg-zinc-950">
          <span className="text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Zustand Counter
          </span>
          <span className="text-6xl font-bold text-black tabular-nums dark:text-zinc-50">
            {count}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={decrement}
              aria-label="decrement"
              className="h-11 w-11 rounded-full bg-zinc-100 text-xl font-semibold text-black transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
            >
              −
            </button>
            <button
              type="button"
              onClick={reset}
              className="h-11 rounded-full border border-black/8 px-4 text-sm font-medium text-black transition-colors hover:bg-black/4 dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={increment}
              aria-label="increment"
              className="h-11 w-11 rounded-full bg-black text-xl font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
            >
              +
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
