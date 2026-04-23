"use client";

import { CircleUserRound, Lock, Mail, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type TipoCuenta = "comprador" | "vendedor";

export default function RegistroPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [tipoCuenta, setTipoCuenta] = useState<TipoCuenta>("comprador");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setExito("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/panel`,
        data: {
          nombre_completo: nombre,
          tipo_cuenta: tipoCuenta,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError("No fue posible crear la cuenta. Intenta nuevamente.");
      return;
    }

    if (data.user && !data.session) {
      setExito("Cuenta creada. Revisa tu correo para confirmar y activar tu acceso.");
      return;
    }

    router.replace("/panel");
    router.refresh();
  };

  return (
    <section className="w-full max-w-[840px] space-y-8">
      <header className="space-y-2 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-vecino-brand">Paso 1 de 2</p>
        <h1 className="text-5xl font-semibold text-vecino-text">Unete a la plaza digital</h1>
        <p className="text-lg text-vecino-text-muted">Selecciona como participar en Vecino. Puedes cambiarlo mas adelante.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setTipoCuenta("comprador")}
          className={`vecino-card p-7 text-left transition ${
            tipoCuenta === "comprador" ? "border-vecino-brand" : "hover:border-vecino-brand-soft"
          }`}
        >
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-vecino-success text-vecino-text">
            <CircleUserRound size={22} />
          </span>
          <h2 className="text-3xl font-semibold">Quiero comprar</h2>
          <p className="mt-2 text-base text-vecino-text-muted">Explora tesoros locales y apoya a tus vecinos.</p>
        </button>

        <button
          type="button"
          onClick={() => setTipoCuenta("vendedor")}
          className={`vecino-card p-7 text-left transition ${
            tipoCuenta === "vendedor" ? "border-vecino-brand" : "hover:border-vecino-brand-soft"
          }`}
        >
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-200 text-vecino-text">
            <Store size={22} />
          </span>
          <h2 className="text-3xl font-semibold">Quiero vender</h2>
          <p className="mt-2 text-base text-vecino-text-muted">Comparte tus productos y haz crecer tu negocio local.</p>
        </button>
      </div>

      <section className="vecino-card p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold text-vecino-brand">Informacion basica</h2>
        <form className="space-y-5" onSubmit={handleRegistro}>
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthInput
              label="Nombre completo"
              type="text"
              placeholder="Ej. Ana Garcia"
              icon={<CircleUserRound size={20} />}
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
            />
            <AuthInput
              label="Correo electronico"
              type="email"
              placeholder="ana@vecino.com"
              icon={<Mail size={20} />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <AuthInput
            label="Contrasena"
            type="password"
            placeholder="Minimo 8 caracteres"
            icon={<Lock size={20} />}
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error ? <p className="text-sm font-semibold text-vecino-error">{error}</p> : null}
          {exito ? <p className="text-sm font-semibold text-emerald-700">{exito}</p> : null}

          <AuthPrimaryButton type="submit" loading={loading}>
            Continuar registro
          </AuthPrimaryButton>

          <p className="text-center text-xs text-vecino-text-muted">
            Al continuar aceptas nuestros terminos de servicio y politica de privacidad.
          </p>
        </form>
      </section>

      <p className="text-center text-base text-vecino-text-muted">
        Ya tienes cuenta?{" "}
        <Link href="/iniciar-sesion" className="font-bold text-vecino-brand">
          Inicia sesion
        </Link>
      </p>
    </section>
  );
}
