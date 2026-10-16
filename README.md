<<<<<<< HEAD
# Guía API GitHub

Aplicación web que consume la API de GitHub para listar repositorios de un usuario.

## Características
- Búsqueda de repositorios por usuario.
- Ordenamiento por actualizado, creado y nombre.
- Resumen de lenguajes utilizados.
- Paginación con botón "Cargar más".
- Visualización de peticiones restantes (`x-ratelimit-remaining`).

## Tecnologías
- HTML5
- CSS3
- JavaScript (Fetch API)
- GitHub API

## Actividad 1: Exploración de la API
Se consultaron los siguientes endpoints:
- `/users/jhonkevin7`
- `/users/jhonkevin7/repos`
- `/repos/jhonkevin7/guia-api-github`

## Actividad 2: Ordenamiento y resumen de lenguajes
Se agregó un selector para ordenar repositorios y un resumen de lenguajes utilizados.

## Actividad 3: Paginación y rate limit
Se implementó el botón "Cargar más" y se muestra el encabezado `x-ratelimit-remaining`.

## Actividad 4: Publicación
El proyecto está publicado en GitHub Pages.

## Demo
[https://jhonkevin7.github.io/guia-api-github/](https://jhonkevin7.github.io/guia-api-github/)

## Reflexión sobre seguridad
No se debe incluir un token de acceso en el código de un repositorio público porque expone credenciales sensibles. Si un atacante obtiene el token, podría acceder y modificar los repositorios del usuario. La forma correcta es usar variables de entorno o archivos `.env` que estén en el `.gitignore`.
<!-- Commit 3: Paginación implementada -->
<!-- Commit 4: Proyecto finalizado -->
=======
# guia-api-github
Guía de desarrollo web con la API de GitHub

