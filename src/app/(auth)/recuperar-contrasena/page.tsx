"use client";

import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthSurface } from "@/components/auth/auth-surface";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function RecuperarContrasenaPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleRecovery = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setExito("");
    setLoading(true);

    const { error: recoveryError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?next=/actualizar-contrasena`,
    });

    setLoading(false);

    if (recoveryError) {
      setError("No pudimos enviar el correo de recuperacion.");
      return;
    }

    setExito("Enviamos un enlace de recuperacion a tu correo.");
  };

  return (
    <AuthSurface
      title="Recuperar contrasena"
      description="Ingresa tu correo y enviaremos un enlace para restablecer tu acceso."
      icon={<KeyRound className="h-8 w-8" />}
    >
      <form className="space-y-5" onSubmit={handleRecovery}>
        <AuthInput
          label="Correo electronico"
          type="email"
          placeholder="vecino@ejemplo.com"
          icon={<Mail size={20} />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {error ? <p className="text-sm font-semibold text-vecino-error">{error}</p> : null}
        {exito ? <p className="text-sm font-semibold text-emerald-700">{exito}</p> : null}

        <AuthPrimaryButton type="submit" loading={loading}>
          Enviar enlace
        </AuthPrimaryButton>
      </form>

      <div className="mt-8 border-t border-vecino-border pt-7 text-center">
        <Link href="/iniciar-sesion" className="text-lg font-bold text-vecino-brand">
          Volver al inicio de sesion
        </Link>
      </div>
    </AuthSurface>
  );
}
