import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth/usuario";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    const usuario = await obtenerUsuarioActual(supabase, data.user.id, data.user.user_metadata);
    redirect(usuario.rol === "vendedor" ? "/vendedor" : "/perfil");
  }

  redirect("/iniciar-sesion");
}
