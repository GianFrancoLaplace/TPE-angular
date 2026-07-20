# 📚 Libroteca

Trabajo Práctico Final — **Seminario Angular 2026**

## Datos del alumno

- **Nombre y Apellido:** Gian Franco Laplace
- **DNI:** 46561631
- **Email:** laplacegian@gmail.com
- **Sede:** Tandil

## Temática

**Libroteca** es un catálogo de libros que combina búsqueda en una base de datos bibliográfica real
con funcionalidades propias del usuario: marcar favoritos y escribir reseñas propias con
calificación. La app tiene tres secciones:

- **Buscar** (`/`): búsqueda de libros en vivo contra la API pública y gratuita de
  [Open Library](https://openlibrary.org/dev/docs/api/search), mostrando portada, título, autor/es
  y año de primera publicación. Cada resultado se puede marcar como favorito.
- **Favoritos** (`/favoritos`): lista de los libros marcados como favoritos durante la sesión. El
  estado se comparte entre esta página y la de búsqueda a través de un servicio (`FavoritesService`),
  sin pasar por rutas ni query params.
- **Reseñas** (`/resenas`): un CRUD completo (alta, baja, modificación y listado) de reseñas propias
  de libros, contra la API pública de prueba [JSONPlaceholder](https://jsonplaceholder.typicode.com/),
  con un formulario reactivo (Reactive Forms) con validaciones.

> **Nota sobre JSONPlaceholder:** es una API de prueba que no persiste datos realmente (todo POST
> devuelve el mismo id de forma fija); por eso el servicio de reseñas genera un id local único al
> crear una reseña nueva, para poder editarla/eliminarla correctamente durante la sesión. Las
> llamadas HTTP (GET, POST, PUT, DELETE) son reales y se pueden ver en la pestaña Network del
> navegador.

## Requisitos del TP cubiertos

**Mínimos:**

- ✅ Ruteo: 3 rutas (`/`, `/favoritos`, `/resenas`) — ver `src/app/app.routes.ts`.
- ✅ Componentes: la página de Búsqueda (`HomeComponent`) combina `SearchBarComponent` y
  `BookListComponent` (que a su vez usa `BookCardComponent`).
- ✅ Interfaces: `Book`, `OpenLibraryDoc`, `Review`, `ReviewDraft`, `JsonPlaceholderPost` en
  `src/app/models/`.
- ✅ Control de flujo: `@for` y `@if` en todos los templates (ver `book-list`, `review-list`,
  `review-form`, `home`, etc.).
- ✅ Comunicación entre componentes: `@Input`/`@Output` (p. ej. `BookCardComponent`,
  `ReviewFormComponent`) **y** servicio compartido (`FavoritesService`) para sincronizar estado
  entre las páginas de Búsqueda y Favoritos.

**Opcionales:**

- ✅ **GET**: `BookApiService` (Open Library) y `ReviewsService.getAll()` (JSONPlaceholder).
- ✅ **POST/PUT/DELETE**: `ReviewsService` implementa las cuatro operaciones contra
  JSONPlaceholder, conectadas a acciones reales de la UI (crear, editar y eliminar reseñas).
- ✅ **Reactive Form con validaciones**: `ReviewFormComponent` (`src/app/components/review-form`)
  usa `FormBuilder`/`Validators` (required, minLength, maxLength, min, max) para crear y editar
  reseñas.

## Estructura del proyecto

```
src/app/
├── models/            # Interfaces (Book, Review, ...)
├── services/           # BookApiService, FavoritesService, ReviewsService
├── components/         # search-bar, book-card, book-list, review-form, review-list
└── pages/               # home, favorites, reviews (una por ruta)
```

## Cómo correr el proyecto localmente

```bash
npm install
ng serve
```

Luego abrir `http://localhost:4200/`.

## StackBlitz

Proyecto editable en StackBlitz: _[completar con el enlace `/edit/angular-ivy-nn` al importar este
repositorio en StackBlitz]_
