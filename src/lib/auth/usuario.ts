import type { SupabaseClient } from "@supabase/supabase-js";

export type RolUsuario = "usuario" | "vendedor";

type MetadatosUsuario = {
  nombre_completo?: string;
  rol?: string;
  tipo_cuenta?: string;
};

export function normalizarRol(rol?: string | null): RolUsuario {
  if (rol === "vendedor") {
    return "vendedor";
  }

  return "usuario";
}

export function resolverRolDesdeMetadata(metadata?: MetadatosUsuario | null): RolUsuario {
  const crudo = (metadata?.rol ?? metadata?.tipo_cuenta ?? "usuario").toLowerCase();

  if (crudo === "vendedor") {
    return "vendedor";
  }

  if (crudo === "comprador") {
    return "usuario";
  }

  return normalizarRol(crudo);
}

export async function obtenerUsuarioActual(
  supabase: SupabaseClient,
  userId: string,
  metadata?: MetadatosUsuario | null,
) {
  const { data } = await supabase
    .from("usuarios")
    .select("id, nombre_completo, email, rol")
    .eq("id", userId)
    .maybeSingle();

  const nombreFallback = metadata?.nombre_completo ?? "Vecino";

  if (!data) {
    return {
      id: userId,
      nombre_completo: nombreFallback,
      email: null,
      rol: resolverRolDesdeMetadata(metadata),
    };
  }

  return {
    id: data.id as string,
    nombre_completo: (data.nombre_completo as string) ?? nombreFallback,
    email: (data.email as string | null) ?? null,
    rol: normalizarRol(data.rol as string),
  };
}
