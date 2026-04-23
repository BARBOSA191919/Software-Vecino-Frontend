import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function PanelPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/iniciar-sesion");
  }

  const cerrarSesion = async () => {
    "use server";

    const serverClient = await createSupabaseServerClient();
    await serverClient.auth.signOut();
    redirect("/iniciar-sesion");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-5 py-8 sm:px-8">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-vecino-brand">Vecino</h1>
        <form action={cerrarSesion}>
          <button
            type="submit"
            className="rounded-xl border border-vecino-border bg-vecino-surface px-4 py-2 font-semibold text-vecino-text"
          >
            Cerrar sesion
          </button>
        </form>
      </header>

      <section className="vecino-card p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-vecino-brand">Panel del comerciante</p>
        <h2 className="mt-2 text-4xl font-semibold">Bienvenido, {user.user_metadata.nombre_completo ?? user.email}</h2>
        <p className="mt-4 max-w-2xl text-lg text-vecino-text-muted">
          El modulo de autenticacion ya esta activo con Supabase. Desde aqui podemos continuar con la construccion de negocio,
          productos, pedidos y demas vistas.
        </p>
      </section>
    </main>
  );
}
