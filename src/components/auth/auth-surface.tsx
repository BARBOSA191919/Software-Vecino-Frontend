import type { ReactNode } from "react";

type AuthSurfaceProps = {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthSurface({ title, description, icon, children, footer }: AuthSurfaceProps) {
  return (
    <section className="vecino-card w-full max-w-[440px] overflow-hidden">
      <div className="space-y-8 p-7 sm:p-10">
        <header className="space-y-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-vecino-surface-soft text-vecino-brand">
            {icon}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-vecino-text">{title}</h1>
            <p className="mx-auto max-w-[320px] text-lg leading-7 text-vecino-text-muted">{description}</p>
          </div>
        </header>

        {children}
      </div>

      {footer ? <footer className="border-t border-vecino-border bg-vecino-surface-soft px-7 py-6 sm:px-10">{footer}</footer> : null}
    </section>
  );
}
