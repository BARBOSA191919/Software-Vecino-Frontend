# Vecino — Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=white)
![Figma](https://img.shields.io/badge/Diseño-Figma-F24E1E?style=flat&logo=figma&logoColor=white)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=flat)

Interfaz web del sistema **Vecino**, una plataforma de marketplace hiperlocal orientada a conectar comerciantes, emprendedores y consumidores dentro de una misma zona geográfica en ciudades colombianas.

---

## Tabla de contenido

- [Descripción general](#descripción-general)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y configuración](#instalación-y-configuración)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Módulos de la interfaz](#módulos-de-la-interfaz)
- [Prototipos](#prototipos)
- [Equipo de desarrollo](#equipo-de-desarrollo)

---

## Descripción general

El frontend de Vecino es una Single Page Application (SPA) construida con React, diseñada para ser completamente responsiva y accesible desde dispositivos móviles y de escritorio. La interfaz consume la API RESTful del backend mediante peticiones HTTP y gestiona el estado de la aplicación de forma eficiente.

La experiencia de usuario fue diseñada en **Figma y Stitch**, garantizando una propuesta visual coherente, intuitiva y validada antes de su implementación.

---

## Tecnologías

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 18.x | Librería principal de interfaz |
| Vite | — | Bundler y entorno de desarrollo |
| React Router | — | Navegación entre vistas |
| Axios | — | Consumo de la API REST |
| Context API / Redux | — | Gestión de estado global |
| CSS Modules / Tailwind | — | Estilos y diseño responsivo |
| Figma + Stitch | — | Prototipado de alta y baja fidelidad |

---

## Estructura del proyecto

```
vecino-frontend/
│
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/             # Imágenes, íconos y fuentes
│   ├── components/         # Componentes reutilizables
│   │   ├── common/         # Botones, inputs, modales, etc.
│   │   ├── layout/         # Header, Footer, Navbar
│   │   └── ui/             # Tarjetas, tablas, badges
│   ├── pages/              # Vistas principales por módulo
│   │   ├── Auth/           # Registro, login, recuperar contraseña
│   │   ├── Negocios/       # Gestión de negocios
│   │   ├── Productos/      # Catálogo y publicación
│   │   ├── Pedidos/        # Carrito, pedidos, historial
│   │   ├── Pagos/          # Pasarela de pagos
│   │   ├── Resenas/        # Calificaciones y reseñas
│   │   ├── Mapa/           # Módulo de geolocalización
│   │   └── Admin/          # Panel de administración
│   ├── services/           # Llamadas a la API (axios)
│   ├── context/            # Contextos globales (AuthContext, etc.)
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Funciones utilitarias
│   ├── App.jsx             # Componente raíz y rutas
│   └── main.jsx            # Punto de entrada
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Requisitos previos

- Node.js v18 o superior
- npm v9 o superior
- Backend de Vecino corriendo localmente o en servidor

---

## Instalación y configuración

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/vecino-frontend.git
cd vecino-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar el archivo .env con los valores correspondientes
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# URL del backend
VITE_API_URL=http://localhost:3000/api

# Clave pública de pasarela de pagos (si aplica)
VITE_PAYMENT_PUBLIC_KEY=tu_clave_publica
```

---

## Ejecución

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

La aplicación quedará disponible en: `http://localhost:5173`

---

## Módulos de la interfaz

| Módulo | Descripción |
|---|---|
| Autenticación | Registro, inicio de sesión y recuperación de contraseña |
| Gestión de negocios | Crear, editar y administrar perfil del negocio |
| Catálogo de productos | Publicar, editar y organizar productos por categoría |
| Motor de búsqueda | Buscar y filtrar productos y negocios |
| Carrito de compras | Gestión dinámica del carrito y confirmación de pedido |
| Procesamiento de pedidos | Registro, seguimiento y estados del pedido |
| Pasarela de pagos | Flujo de pago seguro en línea |
| Calificaciones y reseñas | Valorar negocios y productos |
| Geolocalización | Mapa interactivo de negocios cercanos |
| Panel del comerciante | Dashboard con métricas y estadísticas |
| Administración del sistema | Gestión de usuarios, negocios y contenido |

---

## Prototipos

Los prototipos de alta fidelidad del sistema fueron desarrollados en **Stitch (Google)** y están disponibles en los siguientes enlaces:

| Módulo | Enlace |
|---|---|
| Registro | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=5029de78e95a4fff9cc618a5de60b19b |
| Recuperación de contraseña | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=9a1d9805b4694778b56b23ee7779143a |
| Inicio de sesión | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=3b6d59f5ce58437c9a610d6a59edf7fb |
| Gestión de negocios | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=3351b102dcc142ce93e0ac6e34a9cefa |
| Catálogo de productos | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=ca2eb6c7b003427fa7705572356d0e49 |
| Motor de búsqueda | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=1c0a2fed1ee1474981b21275b5b48c2d |
| Carrito de compras | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=cd1a3b7b159943b18f4c323d8d3d2c49 |
| Registro de pedido | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=3665016fef804928a75840ad5d3d0b53 |
| Confirmación de pedido | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=5d899728aff246e295c46157fba15713 |
| Seguimiento de pedido | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=eeb3668d48244b848803284c7de30dc4 |
| Pasarela de pagos | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=5d450a639b744aa19eae459a9c39afa2 |
| Calificaciones | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=38abc243643d41a792f4f6d5b03daaf4 |
| Reseñas | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=6933fa9772394162a9e77a37cc323dc9 |
| Geolocalización | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=9426e73b54b34f6d9b9c9fca2d70ca16 |
| Panel del comerciante | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=0673c7375ac04ca993a7ddad950d3931 |
| Administración del sistema | https://stitch.withgoogle.com/preview/6944331621580144500?node-id=e3a17e63318543fd91220235a8d9fc8e |

---

## Equipo de desarrollo

| Nombre | ID | Rol |
|---|---|---|
| Santiago José Barbosa Rivas | 100198965 | Product Owner |
| Jerson Javier Ramírez Ricardo | 100123048 | Scrum Master |
| Mario Alexander Avellaneda Buitrago | 100180605 | Desarrollador Backend |
| José Luis Arias | 100143942 | Desarrollador Frontend y Testing |

---

**Corporación Universitaria Iberoamericana**
Facultad de Ingeniería — Programa de Ingeniería de Software
Proyecto de Software — 2025
