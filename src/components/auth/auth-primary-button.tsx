import type { ButtonHTMLAttributes } from "react";

type AuthPrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function AuthPrimaryButton({ loading, children, className, ...props }: AuthPrimaryButtonProps) {
  return (
    <button
      className={`vecino-gradient h-13 w-full rounded-xl text-lg font-bold text-white shadow-[0_10px_24px_rgba(175,74,16,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 ${
        className ?? ""
      }`}
      {...props}
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}
