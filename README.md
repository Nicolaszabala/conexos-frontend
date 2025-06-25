# Conexos Frontend

Frontend de la aplicación Conexos Digital, construido con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **Radix UI** - Componentes accesibles
- **Framer Motion** - Animaciones
- **Wouter** - Router ligero
- **React Query** - Gestión de estado del servidor

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🎯 Despliegue

Este proyecto está configurado para desplegarse en Vercel. El archivo `vercel.json` contiene la configuración necesaria.

### Variables de Entorno

Configura las siguientes variables de entorno en Vercel:

- `VITE_DRUPAL_API_URL` - URL de la API de Drupal

## 📁 Estructura

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── services/      # Servicios de API
├── hooks/         # Custom hooks
├── lib/           # Utilidades y configuraciones
└── index.css      # Estilos globales
```

## 🔗 Conexión con Backend

Este frontend se conecta a un backend Drupal configurado como headless CMS mediante JSON:API. 