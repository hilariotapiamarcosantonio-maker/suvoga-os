# Recursos externos Google Drive y YouTube

Fecha: 2026-06-19

## Principio

El repositorio debe mantenerse liviano. Portadas, miniaturas, PDFs y videos se
consumen por URL externa y no se guardan como archivos pesados dentro de
`public/`.

## Campos soportados

Portadas:

- `coverImageUrl`
- `coverThumbnailUrl`
- `coverStatus`
- `coverAlt`
- `focalPosition`

PDF y video:

- `publicCopy.pdfUrl`
- `publicCopy.videoUrl`

Los cursos publicados exponen esos campos como `pdf_drive_url` y `youtube_url`
cuando se transforman al modelo de UI.

## Portadas

Archivo de configuracion:

- `src/data/course-visual-identities.ts`

Reglas:

1. Subir portada full a Google Drive.
2. Subir miniatura liviana o usar una version optimizada.
3. Configurar `coverImageUrl` para ficha.
4. Configurar `coverThumbnailUrl` para tarjeta.
5. Cambiar `coverStatus` a `definitive` solo cuando el enlace este probado.
6. Mantener `coverAlt` descriptivo y real.
7. Usar `focalPosition` si el encuadre necesita ajuste.

Si la URL no es valida o la imagen falla, `CourseCover` cae en fallback
editorial premium.

## PDFs

El boton aparece solo cuando existe una URL valida.

Componente:

- `src/components/suvoga/CoursePdfResource.tsx`

Utilidades:

- `toDrivePreviewUrl`
- `isClearlyPrivateOrAdminResourceUrl`

El texto publico es:

```text
Ver programa en PDF
```

El enlace abre en una nueva pestana con `target="_blank"` y
`rel="noopener noreferrer"`. No se descarga automaticamente y no se embebe un
visor pesado en tarjetas.

## Videos

Componente:

- `src/components/suvoga/YouTubeLiteEmbed.tsx`

Reglas:

1. Aceptar URLs de YouTube, `youtu.be`, `youtube.com`, `youtube-nocookie.com` o
   ID valido de 11 caracteres.
2. Mostrar miniatura primero.
3. Cargar iframe solo tras clic.
4. Usar `youtube-nocookie.com`.
5. Mantener 16:9 responsive.
6. Omitir el bloque si la URL es invalida.

## Rechazo de enlaces inseguros o no renderizables

`src/lib/course-resource-utils.ts` rechaza:

- URLs vacias o no HTTP(S);
- localhost, IPs locales y `.local`;
- placeholders conocidos;
- carpetas de Drive;
- superficies administrativas de Drive;
- Google Forms.

Esto no prueba permisos publicos. Antes de marcar un recurso como listo, Marcos
debe abrir el enlace en ventana privada o navegador sin sesion.

## Estado actual

No se agregaron portadas definitivas, PDFs ni videos reales en esta fase. La
infraestructura queda lista para consumirlos cuando la propietaria entregue
recursos confirmados.
