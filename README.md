# Libroteca

Trabajo Práctico Final — Seminario Angular 2026

## Datos del alumno

- Nombre y Apellido: Gian Franco Laplace
- DNI: 46561631
- Email: laplacegian@gmail.com
- Sede: Tandil

## Temática

Libroteca es un catálogo de libros: permite buscar libros en una base de datos real, marcarlos
como favoritos y escribir reseñas propias con calificación. Tiene tres secciones:

- **Buscar** (`/`): búsqueda en vivo de libros por título o autor contra la API pública de
  [Open Library](https://openlibrary.org/dev/docs/api/search).
- **Favoritos** (`/favoritos`): libros marcados como favoritos durante la sesión.
- **Reseñas** (`/resenas`): alta, baja, modificación y listado de reseñas propias, contra la API
  de prueba [JSONPlaceholder](https://jsonplaceholder.typicode.com/), con un formulario reactivo
  con validaciones.

## Cómo correr el proyecto localmente

```bash
npm install
ng serve
```

Luego abrir `http://localhost:4200/`.

## StackBlitz

Proyecto editable en StackBlitz: _[completar con el enlace `/edit/angular-ivy-nn` al importar este
repositorio en StackBlitz]_
