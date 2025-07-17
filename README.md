
# SoundRoom Web

SoundRoom Web es una aplicación para la gestión y alquiler de salas de ensayo musical, teatral. Permite a diferentes tipos de usuarios interactuar según su rol: Propietario, Artista y Administrador.

## Características principales

- **Propietario**: Puede crear y administrar salas de ensayo, gestionar reservas, cancelar reservas, buscar salas y ver reportes de uso.
- **Artista**: Puede buscar salas disponibles, reservar horarios, cancelar reservas y dejar opiniones sobre las salas.
- **Administrador**: Gestiona usuarios, permisos, comisiones, puede buscar salas, ver reportes avanzados y cancelar reservas.

## Estructura del proyecto

- `src/components/`: Componentes reutilizables de la interfaz.
- `src/pages/`: Vistas principales y layouts por rol (Admin, Artista, Propietario).
- `src/services/`: Lógica de acceso a datos y comunicación con la API.
- `src/contexts/`: Contextos de React para manejo de autenticación y estado global.
- `src/routes/`: Rutas protegidas y públicas según el tipo de usuario.
- `src/entities/`: Modelos de datos principales.
- `src/assets/`: Imágenes y recursos gráficos.
- `src/styles/`: Archivos de estilos.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- CSS/SCSS

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## Licencia

Este proyecto está bajo la licencia MIT.
