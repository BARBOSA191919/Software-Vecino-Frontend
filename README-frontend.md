# Vecino - Frontend

Interfaz web del sistema **Vecino**, una plataforma de marketplace hiperlocal para conectar comerciantes, emprendedores y compradores dentro de una misma zona geografica.

## Tabla de contenido

- [Descripcion general](#descripcion-general)
- [Stack tecnico](#stack-tecnico)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Instalacion](#instalacion)
- [Variables de entorno](#variables-de-entorno)
- [Ejecucion](#ejecucion)
- [Autenticacion con Supabase](#autenticacion-con-supabase)
- [Base de datos y esquema](#base-de-datos-y-esquema)
- [Guia de diseno visual](#guia-de-diseno-visual)
- [Referencias de mockups](#referencias-de-mockups)

## Descripcion general

Este frontend esta construido con **Next.js 16** (App Router) y **Tailwind CSS v4**. El modulo inicial desarrollado es autenticacion:

- Inicio de sesion
- Registro de usuario
- Recuperacion de contrasena
- Actualizacion de contrasena por enlace de recuperacion

El sistema usa **Supabase Auth** para manejar cuentas y sesiones, y una tabla `public.usuarios` para almacenar el registro de usuarios y su rol.

## Stack tecnico

| Tecnologia | Version | Uso |
|---|---|---|
| Next.js | 16.x | Framework principal |
| React | 19.x | Capa de UI |
| Tailwind CSS | 4.x | Sistema de estilos |
| Supabase | SDK v2 | Auth + acceso a Postgres |
| TypeScript | 5.x | Tipado estatico |
| PostgreSQL | Supabase | Base de datos |

## Arquitectura del proyecto

```txt
Software-Vecino-Frontend/
|
|- mockups/                         # Referencias visuales del proyecto
|- scripts/
|  |- supabase-setup.mjs            # Script para aplicar schema SQL
|- src/
|  |- app/
|  |  |- (auth)/
|  |  |  |- iniciar-sesion/page.tsx
|  |  |  |- registro/page.tsx
|  |  |  |- recuperar-contrasena/page.tsx
|  |  |  |- actualizar-contrasena/page.tsx
|  |  |- (app)/
|  |  |  |- perfil/page.tsx
|  |  |  |- vendedor/page.tsx
|  |  |  |- panel/page.tsx             # Redireccion por rol
|  |  |- auth/confirm/route.ts      # Confirmacion y recuperacion de email
|  |  |- layout.tsx
|  |  |- page.tsx
|  |  |- globals.css
|  |- components/auth/              # Componentes reutilizables de auth
|  |- lib/supabase/                 # Clientes browser/server/proxy
|  |- proxy.ts                      # Proxy global (antes middleware)
|- supabase/
|  |- schema.sql                    # Tablas, trigger, RLS y politicas
|- .env.example
|- README-frontend.md
```

## Instalacion

```bash
npm install
```

## Variables de entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
DATABASE_URL=postgresql://postgres:TU_CLAVE@db.TU-PROYECTO.supabase.co:5432/postgres
```

## Ejecucion

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Produccion local
npm run start
```

## Autenticacion con Supabase

Flujos implementados:

1. **Registro** (`/registro`)
   - Crea usuario en Supabase Auth.
   - Guarda metadatos `nombre_completo` y `rol`.
   - Soporta confirmacion por correo si esta habilitada.

2. **Login** (`/iniciar-sesion`)
   - Inicio de sesion por email/contrasena.
   - Redireccion automatica por rol (`/perfil` o `/vendedor`).

3. **Recuperacion de contrasena** (`/recuperar-contrasena`)
   - Envia correo de recuperacion.
   - Redirige a `/auth/confirm` y luego a `/actualizar-contrasena`.

4. **Actualizacion de contrasena** (`/actualizar-contrasena`)
   - Permite definir nueva contrasena tras validar token de recovery.

5. **Rutas protegidas** (`/perfil` y `/vendedor`)
   - Exigen sesion activa.
   - Aplican control de acceso por rol.
   - Incluyen cierre de sesion.

## Base de datos y esquema

El proyecto incluye `supabase/schema.sql` con:

- Tipo enum `public.rol_usuario` (`usuario`, `vendedor`)
- Tabla `public.usuarios`
- Triggers `al_crear_usuario_auth` y `al_actualizar_usuario_auth` sobre `auth.users`
- Funcion `public.sincronizar_usuario_auth()` para sincronizar usuarios
- Politicas RLS para acceso por propietario

Aplicar esquema:

```bash
npm run db:setup
```

> Requiere `DATABASE_URL` valida con acceso al Postgres de Supabase.

## Guia de diseno visual

Esta seccion define el sistema visual base para mantener consistencia en toda la plataforma.

### 1) Direccion visual

- Estilo: calido, cercano, comunitario.
- Look and feel: superficies suaves, fondos crema y acento naranja tierra.
- Interfaz: tarjetas redondeadas, formularios claros, CTA prominente con gradiente.

### 2) Paleta de color (tokens)

Definidos en `src/app/globals.css`:

- `--vecino-bg`: `#f6f2ee` (fondo base)
- `--vecino-bg-accent`: `#eaf3ea` (acento suave de fondo)
- `--vecino-surface`: `#f4f4f4` (tarjetas)
- `--vecino-surface-soft`: `#f0ede9` (inputs y bloques secundarios)
- `--vecino-text`: `#2f2f2f` (texto principal)
- `--vecino-text-muted`: `#6f6b67` (texto secundario)
- `--vecino-brand`: `#af4a10` (marca)
- `--vecino-brand-strong`: `#9c3f0c` (inicio de gradiente CTA)
- `--vecino-brand-soft`: `#e29a70` (fin de gradiente CTA)
- `--vecino-border`: `#ddd8d3` (bordes)
- `--vecino-success`: `#b8e8c6` (estado positivo)
- `--vecino-error`: `#ba2d2d` (estado de error)

### 3) Tipografia

- Display / titulos: `Sora`
- Texto UI / formularios: `Nunito Sans`

Reglas:

- Titulo principal (auth): 48px aprox en desktop, 32px en mobile.
- Subtitulo: 18px con color muted.
- Labels de formulario: 16px semibold.
- Inputs y botones: 18px.

### 4) Componentes base

- `AuthSurface`: contenedor principal de formularios (tarjeta central).
- `AuthInput`: input con label, icono y estado de error.
- `AuthPrimaryButton`: CTA principal con gradiente y estado loading.

### 5) Interaccion y estados

- Focus visible en inputs (borde brand).
- Hover de botones con `brightness` suave.
- Estados de error con color `vecino-error`.
- Disabled con opacidad reducida y cursor bloqueado.

### 6) Responsive

- Mobile first.
- Formularios centrados y legibles en ancho reducido.
- Grids de registro colapsan de 2 columnas a 1 columna en pantallas pequenas.

## Referencias de mockups

- `mockups/login.png`
- `mockups/registro.png`
- `mockups/recuperacion-contraseña.png`

Estas referencias se usan como base para color, estructura y tono visual del modulo de autenticacion.
