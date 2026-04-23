-- Configuracion base para Vecino (autenticacion y perfil de usuario)

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'tipo_cuenta') then
    create type public.tipo_cuenta as enum ('comprador', 'vendedor');
  end if;
end $$;

create table if not exists public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre_completo text not null,
  tipo_cuenta public.tipo_cuenta not null default 'comprador',
  email text,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create or replace function public.actualizar_fecha_modificacion()
returns trigger
language plpgsql
as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

drop trigger if exists perfiles_actualizacion_fecha on public.perfiles;
create trigger perfiles_actualizacion_fecha
before update on public.perfiles
for each row execute procedure public.actualizar_fecha_modificacion();

create or replace function public.crear_perfil_usuario()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  nombre text;
  tipo text;
begin
  nombre := coalesce(new.raw_user_meta_data ->> 'nombre_completo', split_part(new.email, '@', 1));
  tipo := coalesce(new.raw_user_meta_data ->> 'tipo_cuenta', 'comprador');

  insert into public.perfiles (id, nombre_completo, tipo_cuenta, email)
  values (
    new.id,
    nombre,
    case
      when tipo = 'vendedor' then 'vendedor'::public.tipo_cuenta
      else 'comprador'::public.tipo_cuenta
    end,
    new.email
  )
  on conflict (id) do update
  set
    nombre_completo = excluded.nombre_completo,
    tipo_cuenta = excluded.tipo_cuenta,
    email = excluded.email;

  return new;
end;
$$;

drop trigger if exists al_crear_usuario_auth on auth.users;
create trigger al_crear_usuario_auth
after insert on auth.users
for each row execute procedure public.crear_perfil_usuario();

alter table public.perfiles enable row level security;

drop policy if exists "Perfil visible por propietario" on public.perfiles;
create policy "Perfil visible por propietario"
on public.perfiles
for select
using (auth.uid() = id);

drop policy if exists "Perfil editable por propietario" on public.perfiles;
create policy "Perfil editable por propietario"
on public.perfiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Perfil insertable por propietario" on public.perfiles;
create policy "Perfil insertable por propietario"
on public.perfiles
for insert
with check (auth.uid() = id);
