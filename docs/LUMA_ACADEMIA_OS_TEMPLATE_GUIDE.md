# Luma Academia OS - template guide

Fecha: 2026-06-19

## Decision de arquitectura

SuVoGa Academia queda preparada como primera implementacion aislada de una
plantilla clonable: Luma Academia OS.

La decision actual no es SaaS multiempresa. Cada cliente futuro debe tener:

- repositorio o despliegue aislado;
- dominio propio;
- spreadsheet o base de datos propios;
- credenciales propias;
- remitente de correo propio;
- WhatsApp propio;
- configuracion de marca propia;
- recursos externos propios.

No se implemento `/:academySlug/...` porque agregaria complejidad innecesaria
para esta etapa.

## Configuracion central

Los valores reutilizables principales viven en:

- `src/config/academy.config.ts`
- `src/config/branding.config.ts`
- `src/config/contact.config.ts`
- `src/config/features.config.ts`
- `src/config/navigation.config.ts`
- `src/config/seo.config.ts`

Estas configs cubren nombre publico, nombre legal, locale, timezone, moneda,
contacto, WhatsApp, SEO base, feature flags, navegacion, marca, creditos y URL
temporal de produccion.

## Componentes que ya leen configuracion

- Header: marca y tagline de navegacion.
- Footer: marca, contacto, navegacion y credito profesional.
- WhatsApp global: aria-label con nombre de academia.
- CourseCover: fallback editorial con nombre de academia.
- Formularios y mensajes de reserva: nombre publico de academia.
- Email transaccional: asunto, nombre visible y copys de academia.
- Middleware de Basic Auth: realm con nombre publico de academia.
- Metadata principal de cursos, contacto, comunidad, historias, facilitadores y
  cursos individuales.
- Sitemap y `metadataBase`: `NEXT_PUBLIC_SITE_URL` con fallback a Vercel.

## Elementos cliente-especificos que permanecen

No se extrajeron ni se reescribieron masivamente:

- JSON originales de cursos.
- Slugs oficiales.
- rutas `/api/suvoga/*`;
- nombres historicos de tipos como `SuvogaServicio`;
- carpeta local `data/suvoga_os`;
- textos editoriales propios de SuVoGa en paginas publicas;
- mensajes de error que mencionan `SuVoGa_OS_DB` en endpoints ya existentes.

Esos elementos pueden migrarse en una fase posterior con mayor cobertura de
pruebas. Cambiarlos ahora tendria mas riesgo que valor.

## Recursos externos

La plantilla espera consumir por URL:

- portadas;
- miniaturas;
- PDFs;
- videos de YouTube.

No deben guardarse PDFs pesados ni imagenes definitivas dentro del repositorio.
La app ya tiene utilidades para resolver portadas y fallback editorial.

## Correo

La arquitectura de correo esta desacoplada en `src/lib/email/`.

El proveedor actual por defecto es `disabled` hasta configurar credenciales y
remitente verificado. No se debe declarar produccion lista sin probar:

- `EMAIL_PROVIDER`;
- `EMAIL_API_KEY`;
- `EMAIL_FROM`;
- `EMAIL_REPLY_TO`;
- `EMAIL_NOTIFICATION_TO`.

## Limites de esta etapa

Esta preparacion hace que clonar sea claro y trazable, pero no elimina todos los
nombres internos de SuVoGa. Para una plantilla 100% neutral haria falta una fase
dedicada de renombrado con pruebas de regresion de admin, Sheets, rutas legacy y
formularios.
