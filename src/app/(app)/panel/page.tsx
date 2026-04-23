import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth/usuario";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function PanelPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/iniciar-sesion");
  }

  const usuario = await obtenerUsuarioActual(supabase, user.id, user.user_metadata);
  redirect(usuario.rol === "vendedor" ? "/vendedor" : "/perfil");
}
