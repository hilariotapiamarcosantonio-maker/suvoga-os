# Contenido Real Pendiente - SuVoGa Academia

Este documento centraliza los activos de contenido y credenciales reales que se deben recolectar del cliente (SuVoGa Academia) para reemplazar los placeholders visuales y datos de demostración de alta gama implementados en la plataforma.

---

## 1. Datos y Enlaces Oficiales de Contacto
*Ubicación en el código:* [src/data/contact.ts](file:///g:/suvoga-os/CRM%20En%20Sheets%20-%20copia/crm-admin/src/data/contact.ts)

- [ ] **WhatsApp Oficial**:
  - Número de teléfono con código de país (ej. `+1809...`).
  - Enlace API de chat directo (ej. `https://wa.me/1809...`).
- [ ] **Instagram Oficial**:
  - Nombre de usuario oficial (ej. `@suvoga.academia`).
  - Enlace directo al perfil.
- [ ] **TikTok Oficial**:
  - Nombre de usuario y enlace.
- [ ] **Facebook Oficial**:
  - URL del fanpage de la academia.
- [ ] **Correo Electrónico de Soporte**:
  - Dirección de correo corporativa (ej. `info@suvoga.com` o `admisiones@suvoga.com`).
- [ ] **Ubicación Física Exacta**:
  - Dirección física para el pie de página y la sección de información (ej. Sector, Calle, Número, Ciudad).
- [ ] **Horarios de Atención al Cliente**:
  - Detalle de horas de respuesta en WhatsApp e información presencial.
- [ ] **Dominio Web de Producción**:
  - Dominio personalizado configurado en Vercel (ej. `suvoga.com` o `suvoga.edu.do`).

---

## 2. Archivos Multimedia y Soporte Visual
*Ubicación en el código:* `/public/images/` y `/public/videos/`

- [ ] **Fotos de Clases Reales**:
  - Imágenes en alta resolución (preferiblemente 4:3 o 16:9) que capturen la ambientación del spa, camillas, aceites, y alumnas practicando.
  - Reemplazar las fotos de perfil genéricas de Unsplash de la biblioteca de graduadas.
- [ ] **Videos de Talleres y Prácticas**:
  - Video de presentación general de la academia (para la página de inicio, reemplazando el placeholder de video).
  - Enlaces de inserción (embed) de YouTube o Vimeo de 3-5 minutos para cada curso individual, explicando la técnica, requisitos de ingreso y el proceso de inscripción.
- [ ] **Fotos de Certificados de Egresadas**:
  - Copias digitales de alta calidad o mockups de los diplomas que se otorgan al culminar los cursos para utilizarlos en las secciones de certificación.

---

## 3. Prueba Social y Opiniones
*Ubicación en el código:* [src/data/testimonials.ts](file:///g:/suvoga-os/CRM%20En%20Sheets%20-%20copia/crm-admin/src/data/testimonials.ts) y [src/data/graduates.ts](file:///g:/suvoga-os/CRM%20En%20Sheets%20-%20copia/crm-admin/src/data/graduates.ts)

- [ ] **Testimonios Reales de Alumnas**:
  - Comentarios cortos de graduadas reales con su respectiva foto de perfil, curso completado, y fecha de egreso.
- [ ] **Reseñas de Google Business Profile**:
  - Extraer manualmente o conectar vía API las opiniones de 5 estrellas reales de la ficha de Google Maps de SuVoGa.
- [ ] **Perfiles de Egresadas Destacadas**:
  - Listado de alumnas que han abierto su propio spa o trabajan en centros de prestigio para agregarlas a la sección de egresadas destacadas en cada landing de curso.

---

## Instrucciones de Reemplazo
Una vez se obtenga esta información del cliente, simplemente edite los campos correspondientes dentro de:
1. `src/data/contact.ts` para canales de comunicación.
2. `src/data/testimonials.ts` para testimonios y reseñas de Google.
3. `src/data/graduates.ts` para actualizar perfiles reales.
4. Las imágenes y PDFs correspondientes en la carpeta `/public/`.
