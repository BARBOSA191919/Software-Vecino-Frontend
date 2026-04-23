"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthSurface } from "@/components/auth/auth-surface";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ActualizarContrasenaPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setExito("");

    if (password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Las contrasenas no coinciden.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (updateError) {
      setError("No fue posible actualizar la contrasena.");
      return;
    }

    setExito("Contrasena actualizada con exito. Redirigiendo...");

    setTimeout(() => {
      router.replace("/panel");
      router.refresh();
    }, 1200);
  };

  return (
    <AuthSurface
      title="Actualiza tu contrasena"
      description="Crea una nueva contrasena segura para proteger tu cuenta."
      icon={<Lock className="h-8 w-8" />}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthInput
          label="Nueva contrasena"
          type="password"
          placeholder="Minimo 8 caracteres"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <AuthInput
          label="Repite la contrasena"
          type="password"
          placeholder="Confirma tu contrasena"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          required
        />

        {error ? <p className="text-sm font-semibold text-vecino-error">{error}</p> : null}
        {exito ? <p className="text-sm font-semibold text-emerald-700">{exito}</p> : null}

        <AuthPrimaryButton type="submit" loading={loading}>
          Guardar nueva contrasena
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
