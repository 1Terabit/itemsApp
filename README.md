
**Frontend (Ionic) - README.md**
```markdown
# Frontend Ionic - Gestión de Items

Aplicación móvil/web desarrollada con Ionic/Angular para la gestión de items.

## Requisitos Previos
- Node.js >= 14.x
- npm >= 6.x
- Ionic CLI

## Instalación

1. Instalar Ionic CLI globalmente
```bash
npm install -g @ionic/cli

Clonar el repositorio
git clone <url-del-repositorio>
cd itemsApp

Instalar dependencias
npm install

Iniciar la aplicación
ionic serve

La aplicación estará disponible en http://localhost:8100

Estructura del Proyecto
src/app/pages - Páginas de la aplicación
home - Página principal
edit - Página de edición
detail - Página de detalles
src/app/services - Servicios
items.service.ts - Servicio de items
src/app/interfaces - Interfaces y tipos
src/app/components - Componentes reutilizables

Configuración

Conexión con Backend
Configura la URL del backend en el archivo de entorno:

// src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};

Características
Lista de items
Creación de nuevos items
Edición de items existentes
Eliminación de items
Diseño responsive
Validación de formularios

Comandos Útiles

# Iniciar servidor de desarrollo
ionic serve

# Generar nueva página
ionic generate page nombre-pagina

# Generar nuevo servicio
ionic generate service nombre-servicio

# Construir para producción
ionic build --prod

Solución de Problemas Comunes
Error de CORS: Verificar configuración del backend
Error de conexión: Comprobar URL del backend en environment.ts
Errores de TypeScript: Ejecutar npm install @types/node --save-dev

Navegación
/items - Lista de items
/items/new - Crear nuevo item
/items/:id - Ver detalles de item
/items/:id/edit - Editar item

Licencia
MIT
