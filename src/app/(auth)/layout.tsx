import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1240px] flex-col px-5 py-6 sm:px-8">
      <header className="flex items-center justify-between">
        <Link href="/iniciar-sesion" className="font-display text-4xl font-bold text-vecino-brand">
          Vecino
        </Link>
        <a
          href="#"
          className="rounded-xl border border-vecino-border bg-vecino-surface-soft px-4 py-2 text-base font-semibold text-vecino-brand"
        >
          Centro de ayuda
        </a>
      </header>
      <div className="flex flex-1 items-center justify-center py-10">{children}</div>
    </main>
  );
}
