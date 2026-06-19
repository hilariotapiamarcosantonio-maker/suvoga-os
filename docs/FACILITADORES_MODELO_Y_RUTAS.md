# Facilitadores - modelo y rutas

Fecha: 2026-06-19

## Modelo implementado

Archivo principal:

`src/data/facilitators.ts`

Tipo:

```ts
type Facilitator = {
  id: string;
  slug: string;
  name: string;
  role?: string;
  shortBio?: string;
  fullBio?: string;
  photoUrl?: string;
  photoAlt?: string;
  specialties?: string[];
  credentials?: string[];
  institution?: string;
  signatureUrl?: string;
  verified: boolean;
  provisionalPhoto: boolean;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
};
```

## Datos confirmados

- Nombre encontrado en los 38 cursos publicados: `Sugeidy Vólquez García`.
- Rol mostrado: `Facilitadora`.

## Datos no publicados por falta de confirmacion

- Biografia.
- Credenciales.
- Institucion.
- Redes sociales.
- Foto real.
- Firma.
- Años de experiencia.
- Titulos profesionales.

No se invento informacion academica ni biografica.

## Foto

No se agrego imagen de stock para evitar licencias dudosas o una asociacion
visual falsa con la propietaria real. La UI usa un fallback editorial y marca
la foto como pendiente.

## Rutas

- `/facilitadores`
- `/facilitadores/sugeidy-volquez-garcia`

Las rutas son publicas, responsive y tienen metadata/canonical propia.

## Enlace desde cursos

La ficha de curso enlaza al perfil cuando el texto `publicCopy.facilitator`
coincide con una entidad del modelo global.

## Estado de verificacion

El perfil queda con:

```ts
verified: false
provisionalPhoto: true
```

La interfaz muestra "Datos por confirmar" hasta recibir validacion de la
propietaria.
