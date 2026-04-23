"use client";

import { Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthSurface } from "@/components/auth/auth-surface";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      setError("No fue posible iniciar sesion. Verifica tus credenciales.");
      return;
    }

    router.replace("/panel");
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <AuthSurface
        title="Bienvenido de nuevo"
        description="Ingresa tus credenciales para acceder a tu plaza vecinal."
        icon={<ShieldCheck className="h-8 w-8" />}
        footer={
          <p className="text-center text-base text-vecino-text-muted">
            Eres nuevo en Vecino?{" "}
            <Link href="/registro" className="font-bold text-vecino-brand">
              Crea una cuenta
            </Link>
          </p>
        }
      >
        <form className="space-y-5" onSubmit={handleLogin}>
          <AuthInput
            label="Correo electronico"
            type="email"
            placeholder="nombre@vecino.com"
            icon={<Mail size={20} />}
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <AuthInput
            label="Contrasena"
            type="password"
            placeholder="********"
            icon={<Lock size={20} />}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <div className="flex items-center justify-between text-base text-vecino-text-muted">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-vecino-border" />
              Recordarme
            </label>
            <Link href="/recuperar-contrasena" className="font-bold text-vecino-brand">
              Olvide mi contrasena
            </Link>
          </div>

          {error ? <p className="text-sm font-semibold text-vecino-error">{error}</p> : null}

          <AuthPrimaryButton type="submit" loading={loading}>
            Iniciar sesion
          </AuthPrimaryButton>
        </form>

      </AuthSurface>

      <div className="flex justify-center gap-8 text-base font-semibold tracking-wide text-vecino-text-muted">
        <span className="flex items-center gap-2">Cifrado de extremo a extremo</span>
        <span className="flex items-center gap-2">Confiado por +10k vecinos</span>
      </div>
    </div>
  );
}
